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
    "No billing change was made. You can return to Notes or try the membership flow again later.",
    "這次沒有任何帳單變更。你可以先返回 Notes，或稍後再重新開始會員流程。",
    "这次没有任何账单变更。你可以先返回 Notes，或稍后再重新开始会员流程。"
  ),
  return: text("Return to membership center", "返回會員中心", "返回会员中心"),
  title: text("Checkout canceled", "付款已取消", "付款已取消"),
};

interface CancelPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: CancelPageProps): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = isLocale(locale) ? locale : "zh-hk";

  return {
    title: getLocalizedText(copy.title, safeLocale),
    description: getLocalizedText(copy.body, safeLocale),
  };
}

export default async function LocalizedMembershipCancelPage({
  params,
}: CancelPageProps) {
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
