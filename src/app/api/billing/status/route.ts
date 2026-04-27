import { NextResponse } from "next/server";
import { isMembershipGatingEnabled } from "@/lib/membership/entitlements";
import { notFoundApiResponseInProduction } from "@/lib/production-api-guard";
import {
  getBillingConfigStatus,
  getBillingPlanConfigs,
} from "@/lib/membership/plans";

export const dynamic = "force-dynamic";

export async function GET() {
  const hiddenResponse = notFoundApiResponseInProduction();
  if (hiddenResponse) return hiddenResponse;

  const billingConfig = getBillingConfigStatus();
  const configuredPlans = getBillingPlanConfigs().filter((plan) => Boolean(plan.priceId));
  const ready =
    configuredPlans.length > 0 &&
    billingConfig.secretKeyConfigured &&
    billingConfig.webhookSecretConfigured;

  return NextResponse.json({
    billingReady: ready,
    configuredPlanCount: configuredPlans.length,
    membershipGatingEnabled: isMembershipGatingEnabled(),
    plans: getBillingPlanConfigs().map((plan) => ({
      configured: Boolean(plan.priceId),
      id: plan.id,
      interval: plan.interval,
      tier: plan.tier,
    })),
    stripe: {
      appUrlConfigured: billingConfig.appUrlConfigured,
      publishableKeyConfigured: billingConfig.publishableKeyConfigured,
      secretKeyConfigured: billingConfig.secretKeyConfigured,
      webhookSecretConfigured: billingConfig.webhookSecretConfigured,
    },
  });
}
