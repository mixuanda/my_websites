import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { notFoundInProduction } from "@/lib/production-route-guard";
import { getLocalizedText, isLocale } from "@/lib/textbook/i18n";
import { getMembershipHref } from "@/lib/textbook/routes";
import type { LocalizedText } from "@/lib/textbook/types";

function text(en: string, zhHk: string, zhCn: string): LocalizedText {
  return {
    en,
    "zh-cn": zhCn,
    "zh-hk": zhHk,
  };
}

const copy = {
  body: text(
    "Membership checkout completed. Webhook sync can take a short moment before every entitlement surface updates.",
    "會員付款已完成。Webhook 同步可能需要一小段時間，所有權限頁面才會完全更新。",
    "会员付款已完成。Webhook 同步可能需要一小段时间，所有权限页面才会完全更新。"
  ),
  return: text("Back to membership center", "返回會員中心", "返回会员中心"),
  title: text("Membership activated", "會員已啟用", "会员已启用"),
};

interface SuccessPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: SuccessPageProps): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = isLocale(locale) ? locale : "zh-hk";

  return {
    title: getLocalizedText(copy.title, safeLocale),
    description: getLocalizedText(copy.body, safeLocale),
  };
}

export default async function LocalizedMembershipSuccessPage({
  params,
}: SuccessPageProps) {
  notFoundInProduction();

  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl space-y-4 px-4 py-10">
      <h1 className="text-3xl font-bold">{getLocalizedText(copy.title, locale)}</h1>
      <p className="text-muted-foreground">{getLocalizedText(copy.body, locale)}</p>
      <Link className="underline" href={getMembershipHref(locale)}>
        {getLocalizedText(copy.return, locale)}
      </Link>
    </main>
  );
}
