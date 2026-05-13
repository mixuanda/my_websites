import { canAccessTier, type UserEntitlements } from "./entitlements";
import type { AccessTier } from "@/lib/textbook/types";

export type PremiumFeatureId =
  | "premium.advanced_exercises"
  | "premium.exports"
  | "premium.video_tools";

const requiredTierByFeature: Record<PremiumFeatureId, AccessTier> = {
  "premium.advanced_exercises": "MEMBER",
  "premium.exports": "MEMBER",
  "premium.video_tools": "PRO",
};

export function getPremiumFeatureRequiredTier(feature: PremiumFeatureId) {
  return requiredTierByFeature[feature];
}

export function canAccessPremiumFeature(
  entitlements: UserEntitlements,
  feature: PremiumFeatureId
) {
  return canAccessTier(entitlements, getPremiumFeatureRequiredTier(feature));
}
