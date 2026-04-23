import type { BillingCycle, BillingPlan, ProductScope } from "./types";

export interface PlanDefinition {
  key: BillingPlan;
  label: string;
  description: string;
  scopes: ProductScope[];
  checkoutAllowed: boolean;
  stripeProductEnv?: string;
  stripePriceMonthlyEnv?: string;
  stripePriceOneTimeEnv?: string;
}

export const billingPlans: Record<BillingPlan, PlanDefinition> = {
  free: {
    key: "free",
    label: "Free",
    description: "Core course notes remain open and accessible.",
    scopes: ["core.notes"],
    checkoutAllowed: false,
  },
  premium_notes: {
    key: "premium_notes",
    label: "Premium Notes",
    description:
      "Unlock advanced exercises and premium-quality exports while keeping core notes public.",
    scopes: ["core.notes", "premium.notes", "premium.advanced_exercises", "premium.exports"],
    checkoutAllowed: true,
    stripeProductEnv: "STRIPE_PRODUCT_PREMIUM_NOTES",
    stripePriceMonthlyEnv: "STRIPE_PRICE_PREMIUM_NOTES_MONTHLY",
    stripePriceOneTimeEnv: "STRIPE_PRICE_PREMIUM_NOTES_ONE_TIME",
  },
  premium_video_tools: {
    key: "premium_video_tools",
    label: "Premium Video/Tools",
    description:
      "Unlock video explanations and interactive premium tools with all Premium Notes access.",
    scopes: [
      "core.notes",
      "premium.notes",
      "premium.advanced_exercises",
      "premium.exports",
      "premium.video_tools",
    ],
    checkoutAllowed: true,
    stripeProductEnv: "STRIPE_PRODUCT_PREMIUM_VIDEO_TOOLS",
    stripePriceMonthlyEnv: "STRIPE_PRICE_PREMIUM_VIDEO_TOOLS_MONTHLY",
    stripePriceOneTimeEnv: "STRIPE_PRICE_PREMIUM_VIDEO_TOOLS_ONE_TIME",
  },
};

export function resolvePriceId(plan: BillingPlan, cycle: BillingCycle): string | null {
  const item = billingPlans[plan];
  if (!item?.checkoutAllowed) return null;

  const envName = cycle === "monthly" ? item.stripePriceMonthlyEnv : item.stripePriceOneTimeEnv;
  if (!envName) return null;

  return process.env[envName] ?? null;
}

export function resolvePlanByPriceId(priceId: string): { plan: BillingPlan; cycle: BillingCycle } | null {
  for (const [key, value] of Object.entries(billingPlans) as Array<[BillingPlan, PlanDefinition]>) {
    if (!value.checkoutAllowed) continue;

    const monthlyId = value.stripePriceMonthlyEnv ? process.env[value.stripePriceMonthlyEnv] : null;
    if (monthlyId && monthlyId === priceId) {
      return { plan: key, cycle: "monthly" };
    }

    const oneTimeId = value.stripePriceOneTimeEnv ? process.env[value.stripePriceOneTimeEnv] : null;
    if (oneTimeId && oneTimeId === priceId) {
      return { plan: key, cycle: "one_time" };
    }
  }

  return null;
}
