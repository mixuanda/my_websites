import { NextResponse } from "next/server";
import { auth, authBackendStatus } from "@/lib/auth";
import { firebaseEnabled } from "@/lib/firebase-admin";
import { getAdminEmails, isAdminEmail } from "@/lib/membership/config";
import { isMembershipGatingEnabled } from "@/lib/membership/entitlements";
import {
  getBillingConfigStatus,
  getBillingPlanConfigs,
  membershipTiers,
} from "@/lib/membership/plans";
import { getStripeClient } from "@/lib/membership/stripe";
import { usingFirestore } from "@/lib/db";

export const dynamic = "force-dynamic";

function maskEmail(email: string) {
  const [name, domain] = email.split("@");
  if (!name || !domain) return "***";
  return `${name.slice(0, 2)}***@${domain}`;
}

async function inspectStripePrice(priceId?: string) {
  if (!priceId) {
    return {
      configured: false,
      status: "missing",
    };
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return {
      configured: true,
      priceId,
      status: "unverified_missing_secret",
    };
  }

  try {
    const price = await getStripeClient().prices.retrieve(priceId);

    return {
      active: price.active,
      amount: price.unit_amount,
      configured: true,
      currency: price.currency,
      interval: price.recurring?.interval ?? null,
      priceId,
      product: typeof price.product === "string" ? price.product : price.product.id,
      status: price.recurring ? "ready" : "not_recurring",
      type: price.type,
    };
  } catch (error) {
    return {
      configured: true,
      error: error instanceof Error ? error.message : "Unknown Stripe error",
      priceId,
      status: "stripe_lookup_failed",
    };
  }
}

export async function GET() {
  const session = await auth();
  const email = session?.user?.email?.toLowerCase();

  if (!email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isAdminEmail(email)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const adminEmails = getAdminEmails();
  const billingConfig = getBillingConfigStatus();
  const planChecks = await Promise.all(
    getBillingPlanConfigs().map(async (plan) => ({
      id: plan.id,
      interval: plan.interval,
      price: await inspectStripePrice(plan.priceId),
      tier: plan.tier,
    }))
  );

  return NextResponse.json({
    admin: {
      configured: adminEmails.length > 0,
      count: adminEmails.length,
      emails: adminEmails.map(maskEmail),
    },
    auth: authBackendStatus,
    firebase: {
      adminConfigured: firebaseEnabled,
      persistence: usingFirestore ? "firestore" : "memory",
    },
    membership: {
      gatingEnabled: isMembershipGatingEnabled(),
      tiers: membershipTiers.map((tier) => ({
        id: tier.id,
        paid: tier.paid,
      })),
    },
    stripe: {
      ...billingConfig,
      plans: planChecks,
    },
  });
}
