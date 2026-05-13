import { notFound } from "next/navigation";
import { PremiumRouteGate } from "@/components/billing/PremiumRouteGate";
import { getLocalizedText, isLocale } from "@/lib/textbook/i18n";
import type { LocalizedText } from "@/lib/textbook/types";

export const metadata = {
  title: "Advanced Exercises",
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
    "These challenge sets are included with Notes Plus and Notes Pro membership.",
    "這些 challenge set 包含在 Notes Plus 與 Notes Pro 會員權限內。",
    "这些 challenge set 包含在 Notes Plus 与 Notes Pro 会员权限内。"
  ),
  title: text("Advanced Exercises", "進階練習", "进阶练习"),
};

interface PremiumExercisesPageProps {
  params: Promise<{ locale: string }>;
}

export default async function PremiumExercisesPage({
  params,
}: PremiumExercisesPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  return (
    <PremiumRouteGate locale={locale} requiredFeature="premium.advanced_exercises">
      <section className="mx-auto max-w-4xl space-y-4">
        <h1 className="text-3xl font-semibold">{getLocalizedText(copy.title, locale)}</h1>
        <p className="text-muted-foreground">
          {getLocalizedText(copy.body, locale)}
        </p>
      </section>
    </PremiumRouteGate>
  );
}
