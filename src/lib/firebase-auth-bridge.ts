import type { User as NextAuthUser } from "next-auth";
import { firebaseAuth } from "@/lib/firebase-admin";
import { isAdminEmail } from "@/lib/membership/config";
import { hasPasswordAuthUser } from "@/lib/password-auth";
import { upsertLinkedAccount, upsertUserProfile } from "@/lib/user-store";

const MIN_PASSWORD_LENGTH = 8;

type FirebaseDecodedTokenProfile = {
  name?: string;
  picture?: string;
};

function normalizeEmail(email?: string | null) {
  return email?.trim().toLowerCase() || null;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function getFirebaseUserProfileId(uid: string) {
  return `firebase_${uid}`;
}

export function isFirebaseAuthBridgeConfigured() {
  return Boolean(firebaseAuth);
}

export function mapFirebaseProvider(provider?: string | null) {
  switch (provider) {
    case "password":
      return "firebase-password";
    case "github.com":
      return "firebase-github";
    case "google.com":
      return "firebase-google";
    default:
      return "firebase";
  }
}

async function upsertFirebaseSessionUser(input: {
  displayName?: string | null;
  email: string;
  photoURL?: string | null;
  provider: string;
  uid: string;
}) {
  const profile = await upsertUserProfile({
    email: input.email,
    id: getFirebaseUserProfileId(input.uid),
    image: input.photoURL,
    name: input.displayName,
    role: isAdminEmail(input.email) ? "admin" : "user",
  });

  if (profile) {
    await upsertLinkedAccount({
      provider: input.provider,
      providerAccountId: input.uid,
      type: "firebase",
      userId: profile.id,
    });
  }

  return profile;
}

export async function authorizeFirebaseIdToken(idToken: unknown): Promise<NextAuthUser | null> {
  if (typeof idToken !== "string" || !idToken.trim() || !firebaseAuth) {
    return null;
  }

  try {
    const decoded = await firebaseAuth.verifyIdToken(idToken.trim(), true);
    const email = normalizeEmail(decoded.email);
    if (!email) return null;

    const firebaseUser = await firebaseAuth.getUser(decoded.uid);
    const tokenProfile = decoded as typeof decoded & FirebaseDecodedTokenProfile;
    const provider = mapFirebaseProvider(decoded.firebase?.sign_in_provider);
    const profile = await upsertFirebaseSessionUser({
      displayName: firebaseUser.displayName ?? tokenProfile.name ?? email,
      email,
      photoURL: firebaseUser.photoURL ?? tokenProfile.picture ?? null,
      provider,
      uid: decoded.uid,
    });

    if (!profile) return null;

    return {
      email: profile.email,
      id: profile.id,
      image: profile.image,
      name: profile.name ?? profile.email,
    };
  } catch (error) {
    console.error("Firebase ID token verification failed:", error);
    return null;
  }
}

export async function registerFirebaseAuthUser(input: {
  email: string;
  name?: string | null;
  password: string;
}) {
  if (!firebaseAuth) {
    throw new Error("firebase_auth_not_configured");
  }

  const email = normalizeEmail(input.email);
  const name = input.name?.trim().slice(0, 120) || email;

  if (!email || !isValidEmail(email)) {
    throw new Error("invalid_email");
  }

  if (input.password.length < MIN_PASSWORD_LENGTH) {
    throw new Error("weak_password");
  }

  if (isAdminEmail(email)) {
    throw new Error("admin_email_reserved");
  }

  if (hasPasswordAuthUser(email)) {
    throw new Error("email_already_registered");
  }

  try {
    const firebaseUser = await firebaseAuth.createUser({
      disabled: false,
      displayName: name,
      email,
      emailVerified: false,
      password: input.password,
    });

    const profile = await upsertFirebaseSessionUser({
      displayName: firebaseUser.displayName ?? name,
      email,
      photoURL: firebaseUser.photoURL ?? null,
      provider: "firebase-password",
      uid: firebaseUser.uid,
    });

    return {
      firebaseUser,
      profile,
    };
  } catch (error) {
    const code = (error as { code?: string }).code;
    if (code === "auth/email-already-exists") {
      throw new Error("email_already_registered");
    }
    if (code === "auth/invalid-email") {
      throw new Error("invalid_email");
    }
    if (code === "auth/invalid-password" || code === "auth/weak-password") {
      throw new Error("weak_password");
    }

    throw error;
  }
}
