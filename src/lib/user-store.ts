import type { Account, Session, User } from "next-auth";
import { firestore } from "@/lib/firebase-admin";
import { isAdminEmail } from "@/lib/membership/config";
import {
  getPasswordAuthUser,
  hasPasswordAuthUser,
  hasRegisteredPasswordAuthUser,
} from "@/lib/password-auth";

export type SiteUserRole = "admin" | "member" | "user";
export type SiteUserTheme = "system" | "light" | "dark";
export type SiteUserLocale = "en" | "zh-hk" | "zh-cn";

export interface SiteUserProfile {
  createdAt: string;
  email: string;
  id: string;
  image?: string | null;
  lastLoginAt?: string;
  loginCount: number;
  name?: string | null;
  preferredLocale: SiteUserLocale;
  role: SiteUserRole;
  theme: SiteUserTheme;
  updatedAt: string;
}

export interface LinkedAccount {
  id: string;
  provider: string;
  providerAccountId: string;
  type: string;
}

export interface UserProfilePatch {
  name?: string | null;
  preferredLocale?: SiteUserLocale;
  theme?: SiteUserTheme;
}

const memoryUsersById = new Map<string, SiteUserProfile>();
const memoryUsersByEmail = new Map<string, string>();

function normalizeEmail(email?: string | null) {
  return email?.trim().toLowerCase() || null;
}

function hashString(value: string) {
  let hash = 5381;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 33) ^ value.charCodeAt(index);
  }

  return Math.abs(hash).toString(36);
}

export function getStableUserId(email: string) {
  return `user_${hashString(normalizeEmail(email) ?? email)}`;
}

function resolveUserId(id?: string | null, email?: string | null) {
  if (id && !id.includes("/")) return id;
  if (email) return getStableUserId(email);
  return null;
}

function resolveRole(email?: string | null, role?: SiteUserRole | null): SiteUserRole {
  if (isAdminEmail(email)) return "admin";
  return role ?? "user";
}

function isLocale(value: unknown): value is SiteUserLocale {
  return value === "en" || value === "zh-hk" || value === "zh-cn";
}

function isTheme(value: unknown): value is SiteUserTheme {
  return value === "system" || value === "light" || value === "dark";
}

function normalizeProfile(
  id: string,
  data: Partial<SiteUserProfile> & { email?: string | null }
): SiteUserProfile | null {
  const email = normalizeEmail(data.email);
  if (!email) return null;

  const now = new Date().toISOString();

  return {
    createdAt: data.createdAt ?? now,
    email,
    id,
    image: data.image ?? null,
    lastLoginAt: data.lastLoginAt,
    loginCount: typeof data.loginCount === "number" ? data.loginCount : 0,
    name: data.name ?? email,
    preferredLocale: isLocale(data.preferredLocale) ? data.preferredLocale : "en",
    role: resolveRole(email, data.role),
    theme: isTheme(data.theme) ? data.theme : "system",
    updatedAt: data.updatedAt ?? now,
  };
}

async function getFirestoreUserProfile(userId: string) {
  if (!firestore) return null;

  const doc = await firestore.collection("users").doc(userId).get();
  if (!doc.exists) return null;

  return normalizeProfile(doc.id, doc.data() as Partial<SiteUserProfile>);
}

async function findFirestoreUserProfileByEmail(email: string) {
  if (!firestore) return null;

  const snapshot = await firestore
    .collection("users")
    .where("email", "==", normalizeEmail(email))
    .limit(1)
    .get();

  if (snapshot.empty) return null;

  return normalizeProfile(
    snapshot.docs[0].id,
    snapshot.docs[0].data() as Partial<SiteUserProfile>
  );
}

function rememberProfile(profile: SiteUserProfile) {
  memoryUsersById.set(profile.id, profile);
  memoryUsersByEmail.set(profile.email, profile.id);
}

export async function getUserProfile(userId?: string | null, email?: string | null) {
  const normalizedEmail = normalizeEmail(email);
  const resolvedId =
    resolveUserId(userId, normalizedEmail) ??
    (normalizedEmail ? memoryUsersByEmail.get(normalizedEmail) : null);

  if (resolvedId) {
    const memoryProfile = memoryUsersById.get(resolvedId);
    if (memoryProfile) return memoryProfile;

    const firestoreProfile = await getFirestoreUserProfile(resolvedId);
    if (firestoreProfile) {
      rememberProfile(firestoreProfile);
      return firestoreProfile;
    }
  }

  if (normalizedEmail) {
    const byEmail = await findFirestoreUserProfileByEmail(normalizedEmail);
    if (byEmail) {
      rememberProfile(byEmail);
      return byEmail;
    }
  }

  return null;
}

export async function upsertUserProfile(input: {
  email?: string | null;
  id?: string | null;
  image?: string | null;
  name?: string | null;
  role?: SiteUserRole | null;
}) {
  const email = normalizeEmail(input.email);
  if (!email) return null;

  const userId = resolveUserId(input.id, email) ?? getStableUserId(email);
  const existing = await getUserProfile(userId, email);
  const now = new Date().toISOString();
  const profile: SiteUserProfile = {
    createdAt: existing?.createdAt ?? now,
    email,
    id: userId,
    image: input.image ?? existing?.image ?? null,
    lastLoginAt: existing?.lastLoginAt,
    loginCount: existing?.loginCount ?? 0,
    name: input.name ?? existing?.name ?? email,
    preferredLocale: existing?.preferredLocale ?? "en",
    role: resolveRole(email, input.role ?? existing?.role),
    theme: existing?.theme ?? "system",
    updatedAt: now,
  };

  rememberProfile(profile);

  if (firestore) {
    await firestore.collection("users").doc(userId).set(profile, { merge: true });
  }

  return profile;
}

export async function recordUserLogin(user: User, account?: Account | null) {
  const passwordUser = getPasswordAuthUser(user.email);
  const credentialRole = (user as { role?: SiteUserRole }).role ?? passwordUser?.role;
  const profile = await upsertUserProfile({
    email: user.email,
    id: user.id ?? passwordUser?.id,
    image: user.image ?? passwordUser?.image,
    name: user.name ?? passwordUser?.name,
    role: credentialRole,
  });

  if (!profile) return null;

  const now = new Date().toISOString();
  const updated: SiteUserProfile = {
    ...profile,
    lastLoginAt: now,
    loginCount: profile.loginCount + 1,
    updatedAt: now,
  };

  rememberProfile(updated);

  if (firestore) {
    await firestore
      .collection("users")
      .doc(updated.id)
      .set(
        {
          ...updated,
          lastProvider: account?.provider ?? "credentials",
        },
        { merge: true }
      );
  }

  return updated;
}

export async function getSessionProfile(session: Session | null) {
  const user = session?.user as
    | {
        email?: string | null;
        id?: string;
        image?: string | null;
        name?: string | null;
      }
    | undefined;

  if (!user?.email) return null;

  return (
    (await getUserProfile(user.id, user.email)) ??
    (await upsertUserProfile({
      email: user.email,
      id: user.id,
      image: user.image,
      name: user.name,
    }))
  );
}

export async function updateUserProfile(
  session: Session | null,
  patch: UserProfilePatch
) {
  const profile = await getSessionProfile(session);
  if (!profile) return null;

  const now = new Date().toISOString();
  const nextProfile: SiteUserProfile = {
    ...profile,
    name:
      typeof patch.name === "string"
        ? patch.name.trim().slice(0, 120) || profile.name
        : profile.name,
    preferredLocale: isLocale(patch.preferredLocale)
      ? patch.preferredLocale
      : profile.preferredLocale,
    theme: isTheme(patch.theme) ? patch.theme : profile.theme,
    updatedAt: now,
  };

  rememberProfile(nextProfile);

  if (firestore) {
    await firestore.collection("users").doc(nextProfile.id).set(nextProfile, { merge: true });
  }

  return nextProfile;
}

export async function getLinkedAccounts(session: Session | null): Promise<LinkedAccount[]> {
  const profile = await getSessionProfile(session);
  if (!profile) return [];

  const accounts: LinkedAccount[] = [];

  if (firestore) {
    const snapshot = await firestore
      .collection("accounts")
      .where("userId", "==", profile.id)
      .get();

    for (const doc of snapshot.docs) {
      const data = doc.data() as {
        provider?: string;
        providerAccountId?: string;
        type?: string;
      };

      if (data.provider && data.providerAccountId && data.type) {
        accounts.push({
          id: doc.id,
          provider: data.provider,
          providerAccountId: data.providerAccountId,
          type: data.type,
        });
      }
    }
  }

  if (hasPasswordAuthUser(profile.email)) {
    accounts.unshift({
      id: "credentials",
      provider: "credentials",
      providerAccountId: profile.email,
      type: "credentials",
    });
  }

  if (!hasPasswordAuthUser(profile.email) && (await hasRegisteredPasswordAuthUser(profile.email))) {
    accounts.unshift({
      id: "credentials",
      provider: "credentials",
      providerAccountId: profile.email,
      type: "credentials",
    });
  }

  return accounts;
}

export async function listUserProfiles(limit = 200) {
  if (!firestore) {
    return Array.from(memoryUsersById.values()).slice(0, limit);
  }

  const snapshot = await firestore
    .collection("users")
    .orderBy("updatedAt", "desc")
    .limit(limit)
    .get();

  return snapshot.docs
    .map((doc) => normalizeProfile(doc.id, doc.data() as Partial<SiteUserProfile>))
    .filter((profile): profile is SiteUserProfile => Boolean(profile));
}
