import type { Session } from "next-auth";
import { firestore } from "@/lib/firebase-admin";
import { isAdminEmail } from "./config";
import type { AccessTier } from "@/lib/textbook/types";
import { getBillingPlanByPriceId } from "./plans";

export type MembershipStatus =
  | "inactive"
  | "active"
  | "trialing"
  | "past_due"
  | "canceled"
  | "unpaid";

export interface MembershipRecord {
  customerId?: string;
  email?: string;
  priceId?: string;
  status: MembershipStatus;
  subscriptionId?: string;
  tier?: AccessTier;
  updatedAt: string;
}

export interface UserEntitlements {
  isAdmin: boolean;
  isMember: boolean;
  tier: AccessTier;
}

const memoryMembershipByUser = new Map<string, MembershipRecord>();

export function isMembershipGatingEnabled() {
  return (
    process.env.NOTES_MEMBERSHIP_GATING === "true" ||
    process.env.NEXT_PUBLIC_NOTES_MEMBERSHIP_GATING === "true"
  );
}

function getSessionUser(session: Session | null) {
  const user = session?.user as { email?: string | null; id?: string } | undefined;
  return {
    email: user?.email?.toLowerCase() ?? null,
    id: user?.id,
  };
}

function activeFromStatus(status: MembershipStatus) {
  return status === "active" || status === "trialing";
}

const tierRank: Record<AccessTier, number> = {
  FREE: 0,
  MEMBER: 1,
  PRO: 2,
};

function getMembershipTier(membership: MembershipRecord | null): AccessTier {
  if (!membership || !activeFromStatus(membership.status)) {
    return "FREE";
  }

  if (membership.tier) {
    return membership.tier;
  }

  return getBillingPlanByPriceId(membership.priceId)?.tier ?? "MEMBER";
}

export async function getMembershipRecordByUserId(userId?: string) {
  if (!userId) return null;

  const memoryRecord = memoryMembershipByUser.get(userId) ?? null;
  if (!firestore) return memoryRecord;

  const snapshot = await firestore.collection("users").doc(userId).get();
  const data = snapshot.data() as { membership?: MembershipRecord } | undefined;

  return data?.membership ?? memoryRecord;
}

export async function getMembershipRecordByEmail(email?: string | null) {
  if (!email) return null;

  if (!firestore) {
    for (const record of memoryMembershipByUser.values()) {
      if (record.email?.toLowerCase() === email.toLowerCase()) {
        return record;
      }
    }
    return null;
  }

  const usersSnapshot = await firestore
    .collection("users")
    .where("email", "==", email)
    .limit(1)
    .get();

  if (usersSnapshot.empty) {
    return null;
  }

  const data = usersSnapshot.docs[0].data() as { membership?: MembershipRecord };
  return data.membership ?? null;
}

export async function setMembershipByUserId(userId: string, membership: MembershipRecord) {
  memoryMembershipByUser.set(userId, membership);

  if (!firestore) return;

  await firestore
    .collection("users")
    .doc(userId)
    .set(
      {
        membership,
      },
      { merge: true }
    );
}

export async function setMembershipByEmail(email: string, membership: MembershipRecord) {
  if (!firestore) {
    return;
  }

  const usersSnapshot = await firestore
    .collection("users")
    .where("email", "==", email)
    .limit(1)
    .get();

  if (usersSnapshot.empty) {
    return;
  }

  await usersSnapshot.docs[0].ref.set(
    {
      membership,
    },
    { merge: true }
  );
}

export async function getUserEntitlements(session: Session | null): Promise<UserEntitlements> {
  const { email, id } = getSessionUser(session);

  if (isAdminEmail(email)) {
    return {
      isAdmin: true,
      isMember: true,
      tier: "PRO",
    };
  }

  const membership = (await getMembershipRecordByUserId(id)) ?? (await getMembershipRecordByEmail(email));
  const tier = getMembershipTier(membership);

  return {
    isAdmin: false,
    isMember: tierRank[tier] >= tierRank.MEMBER,
    tier,
  };
}

export function canAccessTier(entitlements: UserEntitlements, requiredTier?: AccessTier) {
  if (!isMembershipGatingEnabled()) {
    return true;
  }

  if (!requiredTier || requiredTier === "FREE") {
    return true;
  }

  return entitlements.isAdmin || tierRank[entitlements.tier] >= tierRank[requiredTier];
}
