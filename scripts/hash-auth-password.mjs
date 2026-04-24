const HASH_PREFIX = "pbkdf2";
const HASH_VERSION = "v1";
const HASH_ALGORITHM = "sha256";
const DEFAULT_ITERATIONS = 310000;
const DEFAULT_KEY_LENGTH = 32;

function bytesToBase64Url(bytes) {
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

async function derivePasswordKey(password, salt, iterations, keyLength) {
  const encoder = new TextEncoder();
  const keyMaterial = await globalThis.crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    "PBKDF2",
    false,
    ["deriveBits"]
  );
  const derivedBits = await globalThis.crypto.subtle.deriveBits(
    {
      hash: "SHA-256",
      iterations,
      name: "PBKDF2",
      salt,
    },
    keyMaterial,
    keyLength * 8
  );

  return new Uint8Array(derivedBits);
}

const password = process.argv[2];

if (!password || password.length < 12) {
  console.error("Usage: node scripts/hash-auth-password.mjs '<password of at least 12 chars>'");
  process.exit(1);
}

const salt = globalThis.crypto.getRandomValues(new Uint8Array(16));
const key = await derivePasswordKey(
  password,
  salt,
  DEFAULT_ITERATIONS,
  DEFAULT_KEY_LENGTH
);

console.log(
  [
    HASH_PREFIX,
    HASH_VERSION,
    HASH_ALGORITHM,
    String(DEFAULT_ITERATIONS),
    bytesToBase64Url(salt),
    bytesToBase64Url(key),
  ].join("$")
);
