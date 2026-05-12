import { createHash } from "node:crypto";
import { firestore } from "@/lib/firebase-admin";
import { getFreeDailyAttemptLimit } from "./plans";

export interface FreeAttemptQuota {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetsAt: string;
  used: number;
}

const memoryQuotaByKey = new Map<string, number>();

function hashValue(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

function getHongKongDay(now = new Date()) {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    day: "2-digit",
    month: "2-digit",
    timeZone: "Asia/Hong_Kong",
    year: "numeric",
  });

  return formatter.format(now);
}

function getNextHongKongMidnight(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    hour: "2-digit",
    hour12: false,
    minute: "2-digit",
    month: "2-digit",
    second: "2-digit",
    timeZone: "Asia/Hong_Kong",
    year: "numeric",
  })
    .formatToParts(now)
    .reduce<Record<string, string>>((acc, part) => {
      if (part.type !== "literal") {
        acc[part.type] = part.value;
      }
      return acc;
    }, {});

  const utcMillisForLocalMidnight = Date.UTC(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day) + 1,
    -8,
    0,
    0
  );

  return new Date(utcMillisForLocalMidnight).toISOString();
}

export function getFreeAttemptSubject(userId: string | undefined, request: Request) {
  if (userId) {
    return `user:${userId}`;
  }

  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const userAgent = request.headers.get("user-agent") ?? "unknown-agent";
  const fallbackHost = request.headers.get("host") ?? "unknown-host";

  return `anonymous:${hashValue(`${forwardedFor ?? fallbackHost}|${userAgent}`).slice(0, 32)}`;
}

function quotaKey(subject: string, day = getHongKongDay()) {
  return `${day}:${hashValue(subject).slice(0, 40)}`;
}

function buildQuota(
  used: number,
  limit = getFreeDailyAttemptLimit(),
  allowed = used < limit
): FreeAttemptQuota {
  return {
    allowed,
    limit,
    remaining: Math.max(limit - used, 0),
    resetsAt: getNextHongKongMidnight(),
    used,
  };
}

export async function consumeFreeAttemptQuota(subject: string): Promise<FreeAttemptQuota> {
  const key = quotaKey(subject);
  const limit = getFreeDailyAttemptLimit();

  if (!firestore) {
    const current = memoryQuotaByKey.get(key) ?? 0;
    const currentQuota = buildQuota(current, limit);

    if (!currentQuota.allowed) {
      return currentQuota;
    }

    const next = current + 1;
    memoryQuotaByKey.set(key, next);
    return buildQuota(next, limit, true);
  }

  const docRef = firestore.collection("notes_free_attempt_quotas").doc(key);

  return firestore.runTransaction(async (transaction) => {
    const snapshot = await transaction.get(docRef);
    const data = snapshot.exists
      ? (snapshot.data() as { used?: number; day?: string; updatedAt?: string })
      : null;
    const current = data?.used ?? 0;
    const currentQuota = buildQuota(current, limit);

    if (!currentQuota.allowed) {
      return currentQuota;
    }

    const next = current + 1;
    transaction.set(
      docRef,
      {
        day: getHongKongDay(),
        resetsAt: getNextHongKongMidnight(),
        updatedAt: new Date().toISOString(),
        used: next,
      },
      { merge: true }
    );

    return buildQuota(next, limit, true);
  });
}
