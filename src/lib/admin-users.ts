import { firestore } from "@/lib/firebase-admin";
import { getAdminEmails, isAdminEmail } from "@/lib/membership/config";
import type { MembershipRecord } from "@/lib/membership/entitlements";
import {
  getPasswordAuthUsers,
  listRegisteredPasswordAuthUsers,
} from "@/lib/password-auth";
import { listUserProfiles, type SiteUserProfile } from "@/lib/user-store";

export interface AdminUserRow {
  createdAt?: string;
  credentialLogin: boolean;
  email: string;
  id: string;
  isAdmin: boolean;
  lastLoginAt?: string;
  loginCount: number;
  membership?: MembershipRecord | null;
  name?: string | null;
  preferredLocale?: string;
  providers: string[];
  role: string;
  theme?: string;
  updatedAt?: string;
}

async function getAccountProvidersByUserId() {
  const providers = new Map<string, string[]>();
  if (!firestore) return providers;

  const snapshot = await firestore.collection("accounts").limit(500).get();
  for (const doc of snapshot.docs) {
    const data = doc.data() as { provider?: string; userId?: string };
    if (!data.userId || !data.provider) continue;
    const current = providers.get(data.userId) ?? [];
    if (!current.includes(data.provider)) {
      current.push(data.provider);
    }
    providers.set(data.userId, current);
  }

  return providers;
}

async function getMembershipByUserId() {
  const memberships = new Map<string, MembershipRecord>();
  if (!firestore) return memberships;

  const snapshot = await firestore.collection("users").limit(500).get();
  for (const doc of snapshot.docs) {
    const data = doc.data() as { membership?: MembershipRecord };
    if (data.membership) {
      memberships.set(doc.id, data.membership);
    }
  }

  return memberships;
}

function rowFromProfile(
  profile: SiteUserProfile,
  options: {
    credentialEmails: Set<string>;
    memberships: Map<string, MembershipRecord>;
    providersByUserId: Map<string, string[]>;
  }
): AdminUserRow {
  return {
    createdAt: profile.createdAt,
    credentialLogin: options.credentialEmails.has(profile.email),
    email: profile.email,
    id: profile.id,
    isAdmin: isAdminEmail(profile.email),
    lastLoginAt: profile.lastLoginAt,
    loginCount: profile.loginCount,
    membership: options.memberships.get(profile.id) ?? null,
    name: profile.name,
    preferredLocale: profile.preferredLocale,
    providers: options.providersByUserId.get(profile.id) ?? [],
    role: profile.role,
    theme: profile.theme,
    updatedAt: profile.updatedAt,
  };
}

export async function listAdminUserRows(limit = 200) {
  const profiles = await listUserProfiles(limit);
  const registeredCredentialUsers = await listRegisteredPasswordAuthUsers(limit);
  const envCredentialUsers = getPasswordAuthUsers();
  const providersByUserId = await getAccountProvidersByUserId();
  const memberships = await getMembershipByUserId();
  const credentialEmails = new Set(
    [...envCredentialUsers, ...registeredCredentialUsers].map((user) => user.email)
  );

  const rows = new Map<string, AdminUserRow>();

  for (const profile of profiles) {
    rows.set(
      profile.email,
      rowFromProfile(profile, { credentialEmails, memberships, providersByUserId })
    );
  }

  for (const credentialUser of [...envCredentialUsers, ...registeredCredentialUsers]) {
    if (rows.has(credentialUser.email)) continue;
    rows.set(credentialUser.email, {
      credentialLogin: true,
      email: credentialUser.email,
      id: credentialUser.id ?? credentialUser.email,
      isAdmin: isAdminEmail(credentialUser.email),
      loginCount: 0,
      name: credentialUser.name ?? credentialUser.email,
      providers: [],
      role: isAdminEmail(credentialUser.email) ? "admin" : credentialUser.role ?? "user",
    });
  }

  for (const adminEmail of getAdminEmails()) {
    if (rows.has(adminEmail)) continue;
    rows.set(adminEmail, {
      credentialLogin: credentialEmails.has(adminEmail),
      email: adminEmail,
      id: adminEmail,
      isAdmin: true,
      loginCount: 0,
      name: adminEmail,
      providers: [],
      role: "admin",
    });
  }

  return Array.from(rows.values()).sort((left, right) => {
    if (left.isAdmin !== right.isAdmin) return left.isAdmin ? -1 : 1;
    return (right.updatedAt ?? "").localeCompare(left.updatedAt ?? "");
  });
}
