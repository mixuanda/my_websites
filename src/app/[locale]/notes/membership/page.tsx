import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BillingActions } from "@/components/membership/BillingActions";
import { auth } from "@/lib/auth";
import { notFoundInProduction } from "@/lib/production-route-guard";
import {
  getMembershipRecordByEmail,
  getMembershipRecordByUserId,
  getUserEntitlements,
} from "@/lib/membership/entitlements";
import {
  donationAmountsHkd,
  getBillingConfigStatus,
  getBillingPlanConfigs,
  getFreeDailyAttemptLimit,
  hasConfiguredBillingPlan,
  membershipTiers,
} from "@/lib/membership/plans";
import { getLocalizedText, isLocale, uiText } from "@/lib/textbook/i18n";
import { getMembershipHref, getNotesHref } from "@/lib/textbook/routes";
import type { LocalizedText } from "@/lib/textbook/types";

function text(en: string, zhHk: string, zhCn: string): LocalizedText {
  return {
    en,
    "zh-cn": zhCn,
    "zh-hk": zhHk,
  };
}

const membershipCopy = {
  accessModel: text("Access model", "存取模型", "访问模型"),
  adminBullet: text(
    "Admin: server-side whitelist bypass via ADMIN_EMAILS, with full access and no payment requirement.",
    "Admin：透過 ADMIN_EMAILS 的伺服器白名單直接取得完整權限，不需要付款。",
    "Admin：通过 ADMIN_EMAILS 的服务器白名单直接取得完整权限，不需要付款。"
  ),
  adminStatus: text(
    "Admin accounts already have full access across notes, premium checkpoints, guided solutions, and server-side APIs.",
    "Admin 帳號已經在筆記、進階 checkpoint、引導解答，以及伺服器 API 上擁有完整權限。",
    "Admin 账号已经在笔记、进阶 checkpoint、引导解答，以及服务器 API 上拥有完整权限。"
  ),
  body: text(
    "The Notes section stays public-first. Paid tiers unlock deeper checkpoints, fuller guided solutions, richer exports, and the highest tier of experimental study tools.",
    "Notes 仍以公開閱讀為先。付費層會解鎖更深入的 checkpoint、更完整的引導解答、更完整的匯出，以及最高層級的實驗性溫習工具。",
    "Notes 仍以公开阅读为先。付费层会解锁更深入的 checkpoint、更完整的引导解答、更完整的导出，以及最高层级的实验性复习工具。"
  ),
  currentAccess: text("Current access", "目前權限", "当前权限"),
  freeBullet: text(
    "Free: core notes, selected examples, and selected quick checks stay public.",
    "Free：公開核心筆記、部分例題，以及部分 quick checks。",
    "Free：公开核心笔记、部分例题，以及部分 quick checks。"
  ),
  freeQuota: text(
    "Free graded-practice quota",
    "免費可評分練習限額",
    "免费可评分练习限额"
  ),
  freeQuotaBody: text(
    "Free accounts can use a daily quota of checkpoint submissions. Plus and Pro members get unlimited graded checkpoint attempts.",
    "免費帳號每日可提交限額內的 checkpoint 批改。Plus 與 Pro 會員可不限量使用可評分 checkpoint。",
    "免费账号每日可提交限额内的 checkpoint 批改。Plus 与 Pro 会员可不限量使用可评分 checkpoint。"
  ),
  memberBullet: text(
    "Member: advanced note units, premium checkpoints, deeper guided solutions, and fuller study support.",
    "Member：解鎖進階筆記單元、會員 checkpoint、更深入的引導解答，以及更完整的溫習支援。",
    "Member：解锁进阶笔记单元、会员 checkpoint、更深入的引导解答，以及更完整的复习支援。"
  ),
  memberStatus: text(
    "Your membership is active. Use the billing portal if you need to update payment details or manage the subscription.",
    "你的會員已啟用。如需更新付款資料或管理訂閱，可前往 Stripe billing portal。",
    "你的会员已启用。如需更新付款资料或管理订阅，可前往 Stripe billing portal。"
  ),
  plansTitle: text("Plans and support", "方案與支持", "方案与支持"),
  signIn: text("Sign in", "登入", "登录"),
  signInPrompt: text(
    "Sign in first to start or manage membership on this account.",
    "請先登入，才可以在這個帳號上開始或管理會員訂閱。",
    "请先登录，才可以在这个账号上开始或管理会员订阅。"
  ),
  title: text("Notes membership", "筆記會員", "笔记会员"),
};

interface MembershipPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: MembershipPageProps): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = isLocale(locale) ? locale : "zh-hk";

  return {
    title: getLocalizedText(membershipCopy.title, safeLocale),
    description: getLocalizedText(membershipCopy.body, safeLocale),
  };
}

export default async function LocalizedMembershipPage({
  params,
}: MembershipPageProps) {
  notFoundInProduction();

  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const session = await auth();
  const entitlements = await getUserEntitlements(session);
  const user = session?.user as { email?: string | null; id?: string } | undefined;
  const membership =
    (await getMembershipRecordByUserId(user?.id)) ??
    (await getMembershipRecordByEmail(user?.email));
  const billingConfig = getBillingConfigStatus();
  const billingPlans = getBillingPlanConfigs();
  const billingReady =
    hasConfiguredBillingPlan() &&
    billingConfig.secretKeyConfigured &&
    billingConfig.webhookSecretConfigured;
  const callbackUrl = getMembershipHref(locale);
  const currentAccess = entitlements.isAdmin
    ? "Admin"
    : entitlements.tier;
  const freeDailyLimit = getFreeDailyAttemptLimit();

  return (
    <main className="mx-auto max-w-4xl space-y-6 px-4 py-10">
      <h1 className="text-3xl font-bold">
        {getLocalizedText(membershipCopy.title, locale)}
      </h1>
      <p className="text-muted-foreground">
        {getLocalizedText(membershipCopy.body, locale)}
      </p>

      <section className="rounded-xl border p-6">
        <h2 className="text-xl font-semibold">
          {getLocalizedText(membershipCopy.accessModel, locale)}
        </h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {membershipTiers.map((tier) => (
            <div key={tier.id} className="rounded-lg border bg-muted/20 p-4">
              <p className="font-semibold">{getLocalizedText(tier.label, locale)}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                {getLocalizedText(tier.description, locale)}
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                {tier.features.map((feature) => (
                  <li key={getLocalizedText(feature, "en")}>
                    {getLocalizedText(feature, locale)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl border p-6">
        <h2 className="text-xl font-semibold">
          {getLocalizedText(membershipCopy.freeQuota, locale)}
        </h2>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">
          {getLocalizedText(membershipCopy.freeQuotaBody, locale)}{" "}
          {getLocalizedText(uiText.freeDailyQuota, locale)}: {freeDailyLimit}.
        </p>
      </section>

      <section className="rounded-xl border p-6">
        <p className="text-sm text-muted-foreground">
          {getLocalizedText(membershipCopy.currentAccess, locale)}
        </p>
        <p className="mt-1 text-lg font-semibold">{currentAccess}</p>

        {!session?.user ? (
          <div className="mt-4 space-y-3">
            <p className="text-sm text-muted-foreground">
              {getLocalizedText(membershipCopy.signInPrompt, locale)}
            </p>
            <Link
              className="inline-flex rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
              href={`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`}
            >
              {getLocalizedText(membershipCopy.signIn, locale)}
            </Link>
            <BillingActions
              activeTier="FREE"
              canManageBilling={false}
              canSubscribe={false}
              donationAmounts={donationAmountsHkd}
              donationEnabled={billingConfig.donationCheckoutConfigured}
              locale={locale}
              plans={billingPlans}
            />
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            {entitlements.isAdmin ? (
              <p className="text-sm text-muted-foreground">
                {getLocalizedText(membershipCopy.adminStatus, locale)}
              </p>
            ) : entitlements.isMember ? (
              <p className="text-sm text-muted-foreground">
                {getLocalizedText(membershipCopy.memberStatus, locale)}
              </p>
            ) : null}
            {!entitlements.isAdmin && entitlements.isMember && !membership?.customerId ? (
              <p className="text-sm text-muted-foreground">
                {getLocalizedText(uiText.noBillingProfile, locale)}
              </p>
            ) : null}
            {!entitlements.isAdmin && !entitlements.isMember && !billingReady ? (
              <p className="rounded-lg border border-amber-300/50 bg-amber-50 px-4 py-3 text-sm text-amber-950 dark:border-amber-900/60 dark:bg-amber-950/20 dark:text-amber-100">
                {getLocalizedText(uiText.billingUnavailable, locale)}
              </p>
            ) : null}
            <h2 className="pt-2 text-xl font-semibold">
              {getLocalizedText(membershipCopy.plansTitle, locale)}
            </h2>
            <BillingActions
              activeTier={entitlements.tier}
              canManageBilling={Boolean(membership?.customerId) && !entitlements.isAdmin}
              canSubscribe={!entitlements.isAdmin}
              donationAmounts={donationAmountsHkd}
              donationEnabled={billingConfig.donationCheckoutConfigured}
              locale={locale}
              plans={billingPlans}
            />
          </div>
        )}
      </section>

      <p className="text-sm text-muted-foreground">
        <Link className="underline" href={getNotesHref(locale)}>
          {getLocalizedText(uiText.textbook, locale)}
        </Link>
      </p>
    </main>
  );
}
