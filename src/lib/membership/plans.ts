import type { AccessTier, LocalizedText } from "@/lib/textbook/types";

export type MembershipTierId = AccessTier | "ADMIN";
export type PaidMembershipTierId = Exclude<AccessTier, "FREE">;
export type BillingPlanId =
  | "member_monthly"
  | "member_yearly"
  | "pro_monthly"
  | "pro_yearly";

export interface MembershipTierDefinition {
  id: MembershipTierId;
  description: LocalizedText;
  features: LocalizedText[];
  label: LocalizedText;
  paid: boolean;
}

export interface BillingPlanConfig {
  id: BillingPlanId;
  interval: "month" | "year";
  ctaLabel: LocalizedText;
  description: LocalizedText;
  envName: string;
  features: LocalizedText[];
  highlighted?: boolean;
  label: LocalizedText;
  priceLabel: LocalizedText;
  priceId?: string;
  savingsLabel?: LocalizedText;
  tier: PaidMembershipTierId;
}

function text(en: string, zhHk: string, zhCn: string): LocalizedText {
  return {
    en,
    "zh-cn": zhCn,
    "zh-hk": zhHk,
  };
}

export const DEFAULT_FREE_DAILY_ATTEMPT_LIMIT = 8;
export const donationAmountsHkd = [30, 100, 300] as const;

export function getFreeDailyAttemptLimit() {
  const raw =
    process.env.NOTES_FREE_DAILY_ATTEMPT_LIMIT ??
    process.env.NEXT_PUBLIC_NOTES_FREE_DAILY_ATTEMPT_LIMIT;
  const parsed = raw ? Number.parseInt(raw, 10) : DEFAULT_FREE_DAILY_ATTEMPT_LIMIT;

  return Number.isFinite(parsed) && parsed > 0
    ? parsed
    : DEFAULT_FREE_DAILY_ATTEMPT_LIMIT;
}

export const membershipTiers: MembershipTierDefinition[] = [
  {
    description: text(
      "Core public notes, selected examples, and a daily quota of graded practice attempts.",
      "公開核心筆記、部分例題，以及每日限額的可評分練習。",
      "公开核心笔记、部分例题，以及每日限额的可评分练习。"
    ),
    features: [
      text(
        "Public course-note pages stay readable without payment.",
        "公開 course-note 頁面不需付款也可閱讀。",
        "公开 course-note 页面不需付款也可阅读。"
      ),
      text(
        "Daily graded-practice quota keeps the free tier useful without opening unlimited server-side grading.",
        "每日可評分練習限額，讓免費層仍然可用，同時避免無限制伺服器批改。",
        "每日可评分练习限额，让免费层仍然可用，同时避免无限制服务器批改。"
      ),
    ],
    id: "FREE",
    label: text("Free", "免費", "免费"),
    paid: false,
  },
  {
    description: text(
      "Premium note units, advanced checkpoints, guided solutions, exports, and unlimited graded practice.",
      "進階筆記單元、會員 checkpoint、引導解答、匯出，以及不限量可評分練習。",
      "进阶笔记单元、会员 checkpoint、引导解答、导出，以及不限量可评分练习。"
    ),
    features: [
      text(
        "Unlock MEMBER-level notes and checkpoint questions.",
        "解鎖 MEMBER 等級筆記與 checkpoint 題目。",
        "解锁 MEMBER 等级笔记与 checkpoint 题目。"
      ),
      text(
        "TXT/PDF study exports remain available for supported notes.",
        "支援的筆記仍可匯出 TXT/PDF 溫習材料。",
        "支持的笔记仍可导出 TXT/PDF 复习材料。"
      ),
      text(
        "Unlimited graded attempts for checkpoint practice.",
        "Checkpoint 練習不限可評分嘗試次數。",
        "Checkpoint 练习不限可评分尝试次数。"
      ),
    ],
    id: "MEMBER",
    label: text("Notes Plus", "Notes Plus 會員", "Notes Plus 会员"),
    paid: true,
  },
  {
    description: text(
      "Everything in Notes Plus, plus the highest access tier for advanced tools, richer export packs, and future premium study surfaces.",
      "包含 Notes Plus 全部內容，並提供最高權限，用於進階工具、更完整的匯出套裝，以及未來 premium 溫習功能。",
      "包含 Notes Plus 全部内容，并提供最高权限，用于进阶工具、更完整的导出套装，以及未来 premium 复习功能。"
    ),
    features: [
      text(
        "Includes all MEMBER-level access.",
        "包含所有 MEMBER 等級權限。",
        "包含所有 MEMBER 等级权限。"
      ),
      text(
        "Prepared for PRO-only interactive tools and richer static study exports.",
        "已預留給 PRO-only 互動工具與更完整的靜態溫習匯出。",
        "已预留给 PRO-only 互动工具与更完整的静态复习导出。"
      ),
      text(
        "Best suited for users who want the full experimental learning surface on the development domain.",
        "適合希望在 development domain 使用完整實驗性學習功能的用戶。",
        "适合希望在 development domain 使用完整实验性学习功能的用户。"
      ),
    ],
    id: "PRO",
    label: text("Notes Pro", "Notes Pro 會員", "Notes Pro 会员"),
    paid: true,
  },
  {
    description: text(
      "Server-side administrator bypass with full access and no payment requirement.",
      "伺服器端管理員白名單，擁有完整權限，不需要付款。",
      "服务器端管理员白名单，拥有完整权限，不需要付款。"
    ),
    features: [
      text(
        "Controlled only by ADMIN_EMAILS on the server.",
        "只由伺服器端 ADMIN_EMAILS 控制。",
        "只由服务器端 ADMIN_EMAILS 控制。"
      ),
    ],
    id: "ADMIN",
    label: text("Admin", "管理員", "管理员"),
    paid: false,
  },
];

export function getBillingPlanConfigs(): BillingPlanConfig[] {
  return [
    {
      ctaLabel: text("Start monthly Plus", "開始月費 Plus", "开始月费 Plus"),
      description: text(
        "Best for trying the full premium notes flow without a long commitment.",
        "適合先試用完整 premium notes 流程，而不需要長期承諾。",
        "适合先试用完整 premium notes 流程，而不需要长期承诺。"
      ),
      envName: "STRIPE_PRICE_ID_MEMBER_MONTHLY",
      features: [
        text("MEMBER note access", "MEMBER 筆記權限", "MEMBER 笔记权限"),
        text("Unlimited graded practice", "不限量可評分練習", "不限量可评分练习"),
        text("Standard exports", "標準匯出", "标准导出"),
      ],
      highlighted: true,
      id: "member_monthly",
      interval: "month",
      label: text("Notes Plus monthly", "Notes Plus 月費", "Notes Plus 月费"),
      priceLabel: text("HK$20 / month", "HK$20 / 月", "HK$20 / 月"),
      priceId: process.env.STRIPE_PRICE_ID_MEMBER_MONTHLY || undefined,
      tier: "MEMBER",
    },
    {
      ctaLabel: text("Start yearly Plus", "開始年費 Plus", "开始年费 Plus"),
      description: text(
        "Annual billing for users who expect to keep using the notes through the term.",
        "適合預計整個學期持續使用筆記的用戶。",
        "适合预计整个学期持续使用笔记的用户。"
      ),
      envName: "STRIPE_PRICE_ID_MEMBER_YEARLY",
      features: [
        text("Everything in monthly Plus", "包含月費 Plus 全部內容", "包含月费 Plus 全部内容"),
        text("Lower effective monthly price", "較低等效月費", "较低等效月费"),
      ],
      id: "member_yearly",
      interval: "year",
      label: text("Notes Plus yearly", "Notes Plus 年費", "Notes Plus 年费"),
      priceLabel: text("HK$200 / year", "HK$200 / 年", "HK$200 / 年"),
      priceId: process.env.STRIPE_PRICE_ID_MEMBER_YEARLY || undefined,
      savingsLabel: text(
        "Save about 17% versus monthly",
        "較逐月付款約省 17%",
        "较逐月付款约省 17%"
      ),
      tier: "MEMBER",
    },
    {
      ctaLabel: text("Start monthly Pro", "開始月費 Pro", "开始月费 Pro"),
      description: text(
        "Highest access tier for users who want advanced tools and future premium study surfaces.",
        "最高權限，適合需要進階工具與未來 premium 溫習功能的用戶。",
        "最高权限，适合需要进阶工具与未来 premium 复习功能的用户。"
      ),
      envName: "STRIPE_PRICE_ID_PRO_MONTHLY",
      features: [
        text("Everything in Notes Plus", "包含 Notes Plus 全部內容", "包含 Notes Plus 全部内容"),
        text("Prepared PRO-only tools", "預留 PRO-only 工具", "预留 PRO-only 工具"),
        text("Richer premium export packs", "更完整的 premium 匯出套裝", "更完整的 premium 导出套装"),
      ],
      id: "pro_monthly",
      interval: "month",
      label: text("Notes Pro monthly", "Notes Pro 月費", "Notes Pro 月费"),
      priceLabel: text("Suggested HK$60 / month", "建議 HK$60 / 月", "建议 HK$60 / 月"),
      priceId: process.env.STRIPE_PRICE_ID_PRO_MONTHLY || undefined,
      tier: "PRO",
    },
    {
      ctaLabel: text("Start yearly Pro", "開始年費 Pro", "开始年费 Pro"),
      description: text(
        "Annual Pro access with a lower effective monthly price.",
        "年費 Pro，以較低等效月費取得最高權限。",
        "年费 Pro，以较低等效月费取得最高权限。"
      ),
      envName: "STRIPE_PRICE_ID_PRO_YEARLY",
      features: [
        text("Everything in monthly Pro", "包含月費 Pro 全部內容", "包含月费 Pro 全部内容"),
        text("Lower effective monthly price", "較低等效月費", "较低等效月费"),
      ],
      id: "pro_yearly",
      interval: "year",
      label: text("Notes Pro yearly", "Notes Pro 年費", "Notes Pro 年费"),
      priceLabel: text("Suggested HK$600 / year", "建議 HK$600 / 年", "建议 HK$600 / 年"),
      priceId: process.env.STRIPE_PRICE_ID_PRO_YEARLY || undefined,
      savingsLabel: text(
        "Save about 17% versus monthly",
        "較逐月付款約省 17%",
        "较逐月付款约省 17%"
      ),
      tier: "PRO",
    },
  ];
}

export function normalizeBillingPlanId(value?: string | null): BillingPlanId | null {
  if (!value) return null;

  if (value === "monthly") return "member_monthly";
  if (value === "yearly") return "member_yearly";

  return getBillingPlanConfigs().some((plan) => plan.id === value)
    ? (value as BillingPlanId)
    : null;
}

export function getBillingPlan(id: string | null | undefined) {
  const normalizedId = normalizeBillingPlanId(id);
  if (!normalizedId) return null;

  return getBillingPlanConfigs().find((plan) => plan.id === normalizedId) ?? null;
}

export function getBillingPlanByPriceId(priceId?: string | null) {
  if (!priceId) return null;

  return getBillingPlanConfigs().find((plan) => plan.priceId === priceId) ?? null;
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
    donationCheckoutConfigured: Boolean(process.env.STRIPE_SECRET_KEY),
    publishableKeyConfigured: Boolean(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY),
    secretKeyConfigured: Boolean(process.env.STRIPE_SECRET_KEY),
    webhookSecretConfigured: Boolean(process.env.STRIPE_WEBHOOK_SECRET),
  };
}
