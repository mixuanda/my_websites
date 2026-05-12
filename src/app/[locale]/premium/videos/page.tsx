import { notFound } from "next/navigation";
import { PremiumRouteGate } from "@/components/billing/PremiumRouteGate";
import { getLocalizedText, isLocale } from "@/lib/textbook/i18n";
import type { LocalizedText } from "@/lib/textbook/types";

export const metadata = {
  title: "Premium Video Explanations",
};

function text(en: string, zhHk: string, zhCn: string): LocalizedText {
  return {
    en,
    "zh-cn": zhCn,
    "zh-hk": zhHk,
  };
}

const copy = {
  body: text(
    "This area is reserved for Notes Pro members with the highest study-tool tier.",
    "這個區域預留給擁有最高 study-tool 權限的 Notes Pro 會員。",
    "这个区域预留给拥有最高 study-tool 权限的 Notes Pro 会员。"
  ),
  title: text(
    "Premium Video Explanations",
    "Premium 影片講解",
    "Premium 视频讲解"
  ),
};

interface PremiumVideosPageProps {
  params: Promise<{ locale: string }>;
}

export default async function PremiumVideosPage({ params }: PremiumVideosPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  return (
    <PremiumRouteGate locale={locale} requiredFeature="premium.video_tools">
      <section className="mx-auto max-w-4xl space-y-4">
        <h1 className="text-3xl font-semibold">{getLocalizedText(copy.title, locale)}</h1>
        <p className="text-muted-foreground">
          {getLocalizedText(copy.body, locale)}
        </p>
      </section>
    </PremiumRouteGate>
  );
}
