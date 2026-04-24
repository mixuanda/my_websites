const HASH_PREFIX = "pbkdf2";
const HASH_VERSION = "v1";
const HASH_ALGORITHM = "sha256";
const DEFAULT_ITERATIONS = 310000;
const DEFAULT_KEY_LENGTH = 32;

export interface PasswordAuthUser {
  email: string;
  id?: string;
  image?: string;
  name?: string;
  passwordHash: string;
  role?: "admin" | "member" | "user";
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
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

export function isPasswordAuthConfigured() {
  return getPasswordAuthUsers().length > 0;
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

export async function createPasswordHash(password: string) {
  if (!password || password.length < 12) {
    throw new Error("Password must be at least 12 characters long.");
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
  if (!user) return null;

  const passwordValid = await verifyPassword(password, user.passwordHash);
  if (!passwordValid) return null;

  return {
    email: user.email,
    id: user.id,
    image: user.image,
    name: user.name ?? user.email,
    role: user.role ?? "user",
  };
}
