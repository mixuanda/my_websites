import type { LocalizedText } from "@/lib/textbook/types";

export type MembershipTierId = "FREE" | "MEMBER" | "ADMIN";
export type BillingPlanId = "monthly" | "yearly";

export interface MembershipTierDefinition {
  id: MembershipTierId;
  description: LocalizedText;
  label: LocalizedText;
  paid: boolean;
}

export interface BillingPlanConfig {
  id: BillingPlanId;
  interval: "month" | "year";
  label: LocalizedText;
  priceId?: string;
  tier: "MEMBER";
}

function text(en: string, zhHk: string, zhCn: string): LocalizedText {
  return {
    en,
    "zh-cn": zhCn,
    "zh-hk": zhHk,
  };
}

export const membershipTiers: MembershipTierDefinition[] = [
  {
    description: text(
      "Core public notes and selected practice checks.",
      "公開核心筆記與部分練習檢查。",
      "公开核心笔记与部分练习检查。"
    ),
    id: "FREE",
    label: text("Free", "免費", "免费"),
    paid: false,
  },
  {
    description: text(
      "Premium notes, advanced checkpoints, guided solutions, and fuller study support.",
      "進階筆記、會員 checkpoint、引導解答，以及更完整的溫習支援。",
      "进阶笔记、会员 checkpoint、引导解答，以及更完整的复习支援。"
    ),
    id: "MEMBER",
    label: text("Member", "會員", "会员"),
    paid: true,
  },
  {
    description: text(
      "Server-side administrator bypass with full access and no payment requirement.",
      "伺服器端管理員白名單，擁有完整權限，不需要付款。",
      "服务器端管理员白名单，拥有完整权限，不需要付款。"
    ),
    id: "ADMIN",
    label: text("Admin", "管理員", "管理员"),
    paid: false,
  },
];

export function getBillingPlanConfigs(): BillingPlanConfig[] {
  return [
    {
      id: "monthly",
      interval: "month",
      label: text("Monthly membership", "月費會員", "月费会员"),
      priceId: process.env.STRIPE_PRICE_ID_MEMBER_MONTHLY || undefined,
      tier: "MEMBER",
    },
    {
      id: "yearly",
      interval: "year",
      label: text("Yearly membership", "年費會員", "年费会员"),
      priceId: process.env.STRIPE_PRICE_ID_MEMBER_YEARLY || undefined,
      tier: "MEMBER",
    },
  ];
}

export function getBillingPlan(id: BillingPlanId) {
  return getBillingPlanConfigs().find((plan) => plan.id === id) ?? null;
}

export function getConfiguredBillingPlans() {
  return getBillingPlanConfigs().filter((plan) => Boolean(plan.priceId));
}

export function hasConfiguredBillingPlan() {
  return getConfiguredBillingPlans().length > 0;
}

export function getBillingConfigStatus() {
  return {
    appUrlConfigured: Boolean(process.env.APP_URL || process.env.NEXT_PUBLIC_SITE_URL),
    publishableKeyConfigured: Boolean(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY),
    secretKeyConfigured: Boolean(process.env.STRIPE_SECRET_KEY),
    webhookSecretConfigured: Boolean(process.env.STRIPE_WEBHOOK_SECRET),
  };
}
