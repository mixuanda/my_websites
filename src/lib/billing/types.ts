export type BillingPlan = "free" | "premium_notes" | "premium_video_tools";

export type ProductScope =
  | "core.notes"
  | "premium.notes"
  | "premium.video_tools"
  | "premium.advanced_exercises"
  | "premium.exports";

export type BillingCycle = "monthly" | "one_time";

export interface EntitlementRecord {
  userId: string;
  stripeCustomerId?: string;
  plan: BillingPlan;
  scopes: ProductScope[];
  active: boolean;
  renewsAt?: string;
  cancelAtPeriodEnd?: boolean;
  source: "free" | "stripe_subscription" | "stripe_onetime";
  updatedAt: string;
}
