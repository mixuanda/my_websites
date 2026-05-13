import Link from "next/link";
import { GlassCard } from "@/components/glass";
import { auth } from "@/lib/auth";
import {
  canAccessPremiumFeature,
  getPremiumFeatureRequiredTier,
  type PremiumFeatureId,
} from "@/lib/membership/feature-access";
import { getUserEntitlements } from "@/lib/membership/entitlements";
import { getLocalizedText } from "@/lib/textbook/i18n";
import { getMembershipHref } from "@/lib/textbook/routes";
import type { Locale, LocalizedText } from "@/lib/textbook/types";

interface PremiumRouteGateProps {
  children: React.ReactNode;
  locale: Locale;
  requiredFeature: PremiumFeatureId;
}

function text(en: string, zhHk: string, zhCn: string): LocalizedText {
  return {
    en,
    "zh-cn": zhCn,
    "zh-hk": zhHk,
  };
}

const gateCopy = {
  body: text(
    "This route is part of the paid Notes surface. Upgrade or manage membership to continue.",
    "這個頁面屬於付費 Notes 範圍。請升級或管理會員後繼續。",
    "这个页面属于付费 Notes 范围。请升级或管理会员后继续。"
  ),
  title: text(
    "Premium access required",
    "需要會員權限",
    "需要会员权限"
  ),
  viewPlans: text("View membership plans", "查看會員方案", "查看会员方案"),
};

export async function PremiumRouteGate({
  children,
  locale,
  requiredFeature,
}: PremiumRouteGateProps) {
  const session = await auth();
  const entitlements = await getUserEntitlements(session);

  if (!canAccessPremiumFeature(entitlements, requiredFeature)) {
    const requiredTier = getPremiumFeatureRequiredTier(requiredFeature);
    return (
      <GlassCard className="p-6">
        <h1 className="text-2xl font-semibold">
          {getLocalizedText(gateCopy.title, locale)}
        </h1>
        <p className="mt-3 text-muted-foreground">
          {getLocalizedText(gateCopy.body, locale)}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Required tier: {requiredTier}
        </p>
        <Link className="mt-4 inline-block text-primary underline" href={getMembershipHref(locale)}>
          {getLocalizedText(gateCopy.viewPlans, locale)}
        </Link>
      </GlassCard>
    );
  }

  return <>{children}</>;
}
