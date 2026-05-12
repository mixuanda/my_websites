import { firebaseEnabled, firestore } from "@/lib/firebase-admin";
import { billingPlans } from "./catalog";
import type { BillingPlan, EntitlementRecord, ProductScope } from "./types";

const memoryEntitlements = new Map<string, EntitlementRecord>();
const stripeCustomerToUser = new Map<string, string>();

function buildFreeEntitlement(userId: string): EntitlementRecord {
  return {
    userId,
    plan: "free",
    scopes: billingPlans.free.scopes,
    active: true,
    source: "free",
    updatedAt: new Date().toISOString(),
  };
}

function normalizeScopes(scopes: ProductScope[]): ProductScope[] {
  return Array.from(new Set(scopes));
}

export async function getEntitlementsByUserId(userId: string): Promise<EntitlementRecord> {
  if (!userId) {
    throw new Error("userId is required");
  }

  if (firebaseEnabled && firestore) {
    const doc = await firestore.collection("user_entitlements").doc(userId).get();
    if (doc.exists) {
      const data = doc.data() as EntitlementRecord;
      return {
        ...buildFreeEntitlement(userId),
        ...data,
        scopes: normalizeScopes(data.scopes ?? billingPlans.free.scopes),
      };
    }
    return buildFreeEntitlement(userId);
  }

  return memoryEntitlements.get(userId) ?? buildFreeEntitlement(userId);
}

export async function upsertEntitlements(
  userId: string,
  updates: Partial<EntitlementRecord> & { plan: BillingPlan }
): Promise<EntitlementRecord> {
  const existing = await getEntitlementsByUserId(userId);

  const resolvedScopes = normalizeScopes(
    updates.scopes ?? billingPlans[updates.plan].scopes ?? existing.scopes
  );

  const next: EntitlementRecord = {
    ...existing,
    ...updates,
    userId,
    scopes: resolvedScopes,
    updatedAt: new Date().toISOString(),
  };

  if (firebaseEnabled && firestore) {
    await firestore.collection("user_entitlements").doc(userId).set(next, { merge: true });
  } else {
    memoryEntitlements.set(userId, next);
  }

  if (next.stripeCustomerId) {
    await linkCustomerToUser(next.stripeCustomerId, userId);
  }

  return next;
}

export async function linkCustomerToUser(stripeCustomerId: string, userId: string) {
  if (!stripeCustomerId || !userId) {
    return;
  }

  if (firebaseEnabled && firestore) {
    await firestore.collection("stripe_customers").doc(stripeCustomerId).set({ userId }, { merge: true });
    return;
  }

  stripeCustomerToUser.set(stripeCustomerId, userId);
}

export async function resolveUserIdByCustomerId(stripeCustomerId: string): Promise<string | null> {
  if (!stripeCustomerId) {
    return null;
  }

  if (firebaseEnabled && firestore) {
    const doc = await firestore.collection("stripe_customers").doc(stripeCustomerId).get();
    if (!doc.exists) {
      return null;
    }
    const data = doc.data() as { userId?: string };
    return data.userId ?? null;
  }

  return stripeCustomerToUser.get(stripeCustomerId) ?? null;
}
