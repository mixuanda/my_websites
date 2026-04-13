import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BillingActions } from "@/components/membership/BillingActions";
import { auth } from "@/lib/auth";
import {
  getMembershipRecordByEmail,
  getMembershipRecordByUserId,
  getUserEntitlements,
} from "@/lib/membership/entitlements";
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
    "Membership keeps the public Notes shell intact while unlocking premium note units, deeper checkpoints, and fuller guided solutions.",
    "會員制會保留公開的 Notes 外層體驗，同時解鎖進階筆記單元、更完整的 checkpoint，以及更深入的引導解答。",
    "会员制会保留公开的 Notes 外层体验，同时解锁进阶笔记单元、更完整的 checkpoint，以及更深入的引导解答。"
  ),
  currentAccess: text("Current access", "目前權限", "当前权限"),
  freeBullet: text(
    "Free: core notes, selected examples, and selected quick checks stay public.",
    "Free：公開核心筆記、部分例題，以及部分 quick checks。",
    "Free：公开核心笔记、部分例题，以及部分 quick checks。"
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
  const callbackUrl = getMembershipHref(locale);
  const currentAccess = entitlements.isAdmin
    ? "Admin"
    : entitlements.isMember
      ? "Member"
      : "Free";

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
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
          <li>{getLocalizedText(membershipCopy.freeBullet, locale)}</li>
          <li>{getLocalizedText(membershipCopy.memberBullet, locale)}</li>
          <li>{getLocalizedText(membershipCopy.adminBullet, locale)}</li>
        </ul>
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
            {!entitlements.isAdmin && !membership?.customerId ? (
              <p className="text-sm text-muted-foreground">
                {getLocalizedText(uiText.noBillingProfile, locale)}
              </p>
            ) : null}
            <BillingActions
              canManageBilling={Boolean(membership?.customerId) && !entitlements.isAdmin}
              canSubscribe={!entitlements.isAdmin && !entitlements.isMember}
              locale={locale}
              yearlyEnabled={Boolean(process.env.STRIPE_PRICE_ID_MEMBER_YEARLY)}
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
