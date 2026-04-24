import { firestore } from "@/lib/firebase-admin";
import { isAdminEmail } from "@/lib/membership/config";

const HASH_PREFIX = "pbkdf2";
const HASH_VERSION = "v1";
const HASH_ALGORITHM = "sha256";
const DEFAULT_ITERATIONS = 310000;
const DEFAULT_KEY_LENGTH = 32;
const MIN_PASSWORD_LENGTH = 8;
const REGISTERED_CREDENTIAL_COLLECTION = "credentialUsers";

export interface PasswordAuthUser {
  email: string;
  id?: string;
  image?: string;
  name?: string;
  passwordHash: string;
  role?: "admin" | "member" | "user";
}

export interface RegisteredCredentialUser extends PasswordAuthUser {
  createdAt: string;
  id: string;
  updatedAt: string;
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function hashString(value: string) {
  let hash = 5381;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 33) ^ value.charCodeAt(index);
  }

  return Math.abs(hash).toString(36);
}

function getRegisteredCredentialId(email: string) {
  return `credential_${hashString(normalizeEmail(email))}`;
}

function isValidRegistrationEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getCrypto() {
  const cryptoApi = globalThis.crypto;
  if (!cryptoApi?.subtle) {
    throw new Error("Web Crypto API is required for password authentication.");
  }
  return cryptoApi;
}

function base64UrlToBytes(value: string) {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes;
}

function bytesToBase64Url(bytes: Uint8Array) {
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function toArrayBuffer(bytes: Uint8Array): ArrayBuffer {
  return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;
}

function constantTimeEqual(left: Uint8Array, right: Uint8Array) {
  if (left.length !== right.length) {
    return false;
  }

  let diff = 0;
  for (let index = 0; index < left.length; index += 1) {
    diff |= left[index] ^ right[index];
  }

  return diff === 0;
}

async function derivePasswordKey(
  password: string,
  salt: Uint8Array,
  iterations: number,
  keyLength: number
) {
  const encoder = new TextEncoder();
  const keyMaterial = await getCrypto().subtle.importKey(
    "raw",
    toArrayBuffer(encoder.encode(password)),
    "PBKDF2",
    false,
    ["deriveBits"]
  );
  const derivedBits = await getCrypto().subtle.deriveBits(
    {
      hash: "SHA-256",
      iterations,
      name: "PBKDF2",
      salt: toArrayBuffer(salt),
    },
    keyMaterial,
    keyLength * 8
  );

  return new Uint8Array(derivedBits);
}

function parseHash(encodedHash: string) {
  const [prefix, version, algorithm, iterationsRaw, saltRaw, keyRaw] =
    encodedHash.split("$");

  if (
    prefix !== HASH_PREFIX ||
    version !== HASH_VERSION ||
    algorithm !== HASH_ALGORITHM ||
    !iterationsRaw ||
    !saltRaw ||
    !keyRaw
  ) {
    return null;
  }

  const iterations = Number.parseInt(iterationsRaw, 10);
  if (!Number.isFinite(iterations) || iterations < 100000) {
    return null;
  }

  const expectedKey = base64UrlToBytes(keyRaw);
  if (expectedKey.length === 0) {
    return null;
  }

  return {
    expectedKey,
    iterations,
    salt: base64UrlToBytes(saltRaw),
  };
}

export function getPasswordAuthUsers(): PasswordAuthUser[] {
  const usersJson = process.env.AUTH_PASSWORD_USERS_JSON?.trim();
  const users: PasswordAuthUser[] = [];

  if (usersJson) {
    try {
      const parsed = JSON.parse(usersJson) as PasswordAuthUser[] | Record<string, PasswordAuthUser>;
      const parsedUsers = Array.isArray(parsed) ? parsed : Object.values(parsed);

      for (const user of parsedUsers) {
        if (user?.email && user.passwordHash) {
          users.push({
            ...user,
            email: normalizeEmail(user.email),
          });
        }
      }
    } catch (error) {
      console.warn("AUTH_PASSWORD_USERS_JSON is invalid and was ignored.", error);
    }
  }

  const singleEmail = process.env.AUTH_PASSWORD_EMAIL?.trim();
  const singleHash = process.env.AUTH_PASSWORD_HASH?.trim();

  if (singleEmail && singleHash) {
    users.push({
      email: normalizeEmail(singleEmail),
      id: process.env.AUTH_PASSWORD_USER_ID?.trim() || undefined,
      image: process.env.AUTH_PASSWORD_IMAGE?.trim() || undefined,
      name: process.env.AUTH_PASSWORD_NAME?.trim() || singleEmail,
      passwordHash: singleHash,
      role:
        process.env.AUTH_PASSWORD_ROLE === "admin" ||
        process.env.AUTH_PASSWORD_ROLE === "member"
          ? process.env.AUTH_PASSWORD_ROLE
          : "user",
    });
  }

  const uniqueUsers = new Map<string, PasswordAuthUser>();
  for (const user of users) {
    uniqueUsers.set(user.email, user);
  }

  return Array.from(uniqueUsers.values());
}

const memoryRegisteredCredentialUsers = new Map<string, RegisteredCredentialUser>();

export function isRegistrationEnabled() {
  return (
    process.env.AUTH_REGISTRATION_ENABLED === "true" ||
    process.env.NEXT_PUBLIC_AUTH_REGISTRATION_ENABLED === "true"
  );
}

export function isPasswordAuthConfigured() {
  return getPasswordAuthUsers().length > 0 || isRegistrationEnabled();
}

export function hasPasswordAuthUser(email?: string | null) {
  if (!email) return false;
  const normalized = normalizeEmail(email);
  return getPasswordAuthUsers().some((user) => user.email === normalized);
}

export function getPasswordAuthUser(email?: string | null) {
  if (!email) return null;
  const normalized = normalizeEmail(email);
  return getPasswordAuthUsers().find((user) => user.email === normalized) ?? null;
}

function normalizeRegisteredCredentialUser(
  data: Partial<RegisteredCredentialUser> & { email?: string | null }
): RegisteredCredentialUser | null {
  if (!data.email || !data.passwordHash) return null;
  const email = normalizeEmail(data.email);
  const now = new Date().toISOString();

  return {
    createdAt: data.createdAt ?? now,
    email,
    id: data.id ?? getRegisteredCredentialId(email),
    image: data.image,
    name: data.name ?? email,
    passwordHash: data.passwordHash,
    role: data.role === "member" || data.role === "admin" ? data.role : "user",
    updatedAt: data.updatedAt ?? now,
  };
}

export async function getRegisteredPasswordAuthUser(email?: string | null) {
  if (!email) return null;
  const normalized = normalizeEmail(email);
  const memoryUser = memoryRegisteredCredentialUsers.get(normalized);
  if (memoryUser) return memoryUser;

  if (!firestore) return null;

  const snapshot = await firestore
    .collection(REGISTERED_CREDENTIAL_COLLECTION)
    .doc(getRegisteredCredentialId(normalized))
    .get();

  if (!snapshot.exists) return null;

  const user = normalizeRegisteredCredentialUser(
    snapshot.data() as Partial<RegisteredCredentialUser>
  );
  if (user) {
    memoryRegisteredCredentialUsers.set(user.email, user);
  }

  return user;
}

export async function hasRegisteredPasswordAuthUser(email?: string | null) {
  return Boolean(await getRegisteredPasswordAuthUser(email));
}

export async function listRegisteredPasswordAuthUsers(limit = 200) {
  if (!firestore) {
    return Array.from(memoryRegisteredCredentialUsers.values()).slice(0, limit);
  }

  const snapshot = await firestore
    .collection(REGISTERED_CREDENTIAL_COLLECTION)
    .orderBy("createdAt", "desc")
    .limit(limit)
    .get();

  return snapshot.docs
    .map((doc) =>
      normalizeRegisteredCredentialUser(doc.data() as Partial<RegisteredCredentialUser>)
    )
    .filter((user): user is RegisteredCredentialUser => Boolean(user));
}

export async function registerPasswordAuthUser(input: {
  email: string;
  name?: string | null;
  password: string;
}) {
  if (!isRegistrationEnabled()) {
    throw new Error("registration_disabled");
  }

  const email = normalizeEmail(input.email);
  const name = input.name?.trim().slice(0, 120) || email;

  if (!isValidRegistrationEmail(email)) {
    throw new Error("invalid_email");
  }

  if (input.password.length < MIN_PASSWORD_LENGTH) {
    throw new Error("weak_password");
  }

  if (isAdminEmail(email)) {
    throw new Error("admin_email_reserved");
  }

  if (hasPasswordAuthUser(email) || (await hasRegisteredPasswordAuthUser(email))) {
    throw new Error("email_already_registered");
  }

  const now = new Date().toISOString();
  const user: RegisteredCredentialUser = {
    createdAt: now,
    email,
    id: getRegisteredCredentialId(email),
    name,
    passwordHash: await createPasswordHash(input.password),
    role: "user",
    updatedAt: now,
  };

  memoryRegisteredCredentialUsers.set(email, user);

  if (firestore) {
    await firestore
      .collection(REGISTERED_CREDENTIAL_COLLECTION)
      .doc(user.id)
      .set(user, { merge: false });
  }

  return user;
}

export async function createPasswordHash(password: string) {
  if (!password || password.length < MIN_PASSWORD_LENGTH) {
    throw new Error(`Password must be at least ${MIN_PASSWORD_LENGTH} characters long.`);
  }

  const salt = getCrypto().getRandomValues(new Uint8Array(16));
  const key = await derivePasswordKey(
    password,
    salt,
    DEFAULT_ITERATIONS,
    DEFAULT_KEY_LENGTH
  );

  return [
    HASH_PREFIX,
    HASH_VERSION,
    HASH_ALGORITHM,
    String(DEFAULT_ITERATIONS),
    bytesToBase64Url(salt),
    bytesToBase64Url(key),
  ].join("$");
}

export async function verifyPassword(password: string, encodedHash: string) {
  const parsedHash = parseHash(encodedHash);
  if (!parsedHash) return false;

  const derived = await derivePasswordKey(
    password,
    parsedHash.salt,
    parsedHash.iterations,
    parsedHash.expectedKey.length
  );

  return constantTimeEqual(derived, parsedHash.expectedKey);
}

export async function authorizePasswordUser(email: unknown, password: unknown) {
  if (typeof email !== "string" || typeof password !== "string") {
    return null;
  }

  const user = getPasswordAuthUser(email);
  const registeredUser = user ? null : await getRegisteredPasswordAuthUser(email);
  const authUser = user ?? registeredUser;
  if (!authUser) return null;

  const passwordValid = await verifyPassword(password, authUser.passwordHash);
  if (!passwordValid) return null;

  return {
    email: authUser.email,
    id: authUser.id,
    image: authUser.image,
    name: authUser.name ?? authUser.email,
    role: authUser.role ?? "user",
  };
}
