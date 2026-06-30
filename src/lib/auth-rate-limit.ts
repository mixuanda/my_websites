import { createHash } from "node:crypto";
import { firestore } from "@/lib/firebase-admin";

const AUTH_RATE_LIMIT_COLLECTION = "authRateLimits";

type MemoryRateLimitEntry = {
  count: number;
  resetAt: number;
};

export type AuthRateLimitScope =
  | "credentials-login-email"
  | "registration-email"
  | "registration-ip";

export interface AuthRateLimitOptions {
  identifier: string;
  limit: number;
  scope: AuthRateLimitScope;
  windowMs: number;
}

export interface AuthRateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds?: number;
}

export class AuthRateLimitError extends Error {
  retryAfterSeconds?: number;

  constructor(result: AuthRateLimitResult) {
    super("rate_limited");
    this.name = "AuthRateLimitError";
    this.retryAfterSeconds = result.retryAfterSeconds;
  }
}

const memoryRateLimits = new Map<string, MemoryRateLimitEntry>();

function rateLimitKey(scope: AuthRateLimitScope, identifier: string) {
  return `${scope}:${identifier.trim().toLowerCase()}`;
}

function rateLimitDocumentId(scope: AuthRateLimitScope, identifier: string) {
  return createHash("sha256").update(rateLimitKey(scope, identifier)).digest("hex");
}

function checkMemoryRateLimit(options: AuthRateLimitOptions): AuthRateLimitResult {
  const now = Date.now();
  const key = rateLimitKey(options.scope, options.identifier);
  const existing = memoryRateLimits.get(key);

  if (!existing || existing.resetAt <= now) {
    memoryRateLimits.set(key, {
      count: 1,
      resetAt: now + options.windowMs,
    });
    return {
      allowed: true,
      remaining: Math.max(options.limit - 1, 0),
    };
  }

  if (existing.count >= options.limit) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.ceil((existing.resetAt - now) / 1000),
    };
  }

  existing.count += 1;
  memoryRateLimits.set(key, existing);

  return {
    allowed: true,
    remaining: Math.max(options.limit - existing.count, 0),
  };
}

export async function checkAuthRateLimit(
  options: AuthRateLimitOptions
): Promise<AuthRateLimitResult> {
  if (!options.identifier.trim()) {
    return {
      allowed: true,
      remaining: options.limit,
    };
  }

  if (!firestore) {
    return checkMemoryRateLimit(options);
  }

  const now = Date.now();
  const resetAt = now + options.windowMs;
  const docRef = firestore
    .collection(AUTH_RATE_LIMIT_COLLECTION)
    .doc(rateLimitDocumentId(options.scope, options.identifier));

  return firestore.runTransaction(async (transaction) => {
    const snapshot = await transaction.get(docRef);
    const data = snapshot.exists
      ? (snapshot.data() as Partial<MemoryRateLimitEntry>)
      : null;
    const existingCount =
      typeof data?.count === "number" && Number.isFinite(data.count) ? data.count : 0;
    const existingResetAt =
      typeof data?.resetAt === "number" && Number.isFinite(data.resetAt)
        ? data.resetAt
        : 0;

    if (!snapshot.exists || existingResetAt <= now) {
      transaction.set(docRef, {
        count: 1,
        resetAt,
        scope: options.scope,
        updatedAt: new Date(now).toISOString(),
      });

      return {
        allowed: true,
        remaining: Math.max(options.limit - 1, 0),
      };
    }

    if (existingCount >= options.limit) {
      return {
        allowed: false,
        remaining: 0,
        retryAfterSeconds: Math.ceil((existingResetAt - now) / 1000),
      };
    }

    const nextCount = existingCount + 1;
    transaction.set(
      docRef,
      {
        count: nextCount,
        resetAt: existingResetAt,
        scope: options.scope,
        updatedAt: new Date(now).toISOString(),
      },
      { merge: true }
    );

    return {
      allowed: true,
      remaining: Math.max(options.limit - nextCount, 0),
    };
  });
}

export async function assertAuthRateLimit(options: AuthRateLimitOptions) {
  const result = await checkAuthRateLimit(options);
  if (!result.allowed) {
    throw new AuthRateLimitError(result);
  }
  return result;
}
