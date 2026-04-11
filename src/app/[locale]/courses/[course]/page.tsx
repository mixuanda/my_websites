import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, ChevronRight, Download, Sparkles } from "lucide-react";
import { GlassCard, GlassPanel } from "@/components/glass";
import { Badge } from "@/components/ui/badge";
import { TextbookCourseSidebar } from "@/components/textbook/TextbookCourseSidebar";
import { getCourseMeta, textbookCatalog } from "@/lib/textbook/catalog";
import { getCoverageLabel, getLocalizedText, isLocale, uiText } from "@/lib/textbook/i18n";
import { getCoursesHref, getUnitHref } from "@/lib/textbook/routes";
import type { CourseId, LocalizedText } from "@/lib/textbook/types";
import { notFound } from "next/navigation";

function text(en: string, zhHk: string, zhCn: string): LocalizedText {
  return {
    en,
    "zh-cn": zhCn,
    "zh-hk": zhHk,
  };
}

const courseCopy = {
  export: text(
    "Every unit on this course page can be opened as a live learning page and exported as a static study copy.",
    "這個課程頁面的每個單元都可以打開成互動學習頁，並匯出成靜態溫習版本。",
    "这个课程页面的每个单元都可以打开成互动学习页，并导出成静态复习版本。"
  ),
  units: text(
    "Use the course sidebar to move chapter by chapter, or jump directly into a unit below.",
    "你可以用課程側欄逐章前進，或直接從下方進入某個單元。",
    "你可以用课程侧栏逐章前进，或直接从下方进入某个单元。"
  ),
} as const;

interface CoursePageProps {
  params: Promise<{
    course: string;
    locale: string;
  }>;
}

export function generateStaticParams() {
  return Object.keys(textbookCatalog).flatMap((course) =>
    ["en", "zh-hk", "zh-cn"].map((locale) => ({
      course,
      locale,
    }))
  );
}

export async function generateMetadata({
  params,
}: CoursePageProps): Promise<Metadata> {
  const { course, locale } = await params;

  if (!isLocale(locale) || !(course in textbookCatalog)) {
    return {};
  }

  const courseMeta = getCourseMeta(course as CourseId);

  return {
    title: courseMeta.title[locale],
    description: courseMeta.description[locale],
  };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { course, locale } = await params;

  if (!isLocale(locale) || !(course in textbookCatalog)) {
    notFound();
  }

  const safeCourse = course as CourseId;
  const courseMeta = getCourseMeta(safeCourse);

  return (
    <div className="mx-auto max-w-7xl">
      <div className="grid gap-8 xl:grid-cols-[300px_minmax(0,1fr)]">
        <aside className="hidden xl:block">
          <TextbookCourseSidebar courseMeta={courseMeta} locale={locale} />
        </aside>

        <div className="space-y-8">
          <nav className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <Link href={getCoursesHref(locale)} className="hover:text-primary">
              {getLocalizedText(uiText.textbook, locale)}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span>{courseMeta.shortTitle[locale]}</span>
          </nav>

          <GlassCard className="p-6 md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div className="max-w-3xl">
                <Badge variant="secondary">{safeCourse.toUpperCase()}</Badge>
                <h1 className="mt-4 text-3xl font-bold md:text-4xl">
                  {courseMeta.title[locale]}
                </h1>
                <p className="mt-4 text-base leading-8 text-muted-foreground md:text-lg">
                  {courseMeta.description[locale]}
                </p>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  {getLocalizedText(courseCopy.units, locale)}
                </p>
              </div>
              <div className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
                <GlassPanel className="p-4">
                  <div className="flex items-center gap-2 text-foreground">
                    <Sparkles className="h-4 w-4 text-primary" />
                    {courseMeta.chapters.length} {getLocalizedText(uiText.chapter, locale)}
                  </div>
                </GlassPanel>
                <GlassPanel className="p-4">
                  <div className="flex items-center gap-2 text-foreground">
                    <Download className="h-4 w-4 text-primary" />
                    {getLocalizedText(courseCopy.export, locale)}
                  </div>
                </GlassPanel>
              </div>
            </div>
          </GlassCard>

          <div className="space-y-6">
            {courseMeta.chapters.map((chapter) => (
              <GlassCard key={chapter.id} className="p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="max-w-3xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                      {getLocalizedText(uiText.chapter, locale)} {chapter.number}
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold">{chapter.title[locale]}</h2>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      {chapter.summary[locale]}
                    </p>
                  </div>
                </div>
                <div className="mt-6 grid gap-4 lg:grid-cols-2">
                  {chapter.units.map((unit) => (
                    <GlassPanel key={unit.unitId} className="flex h-full flex-col p-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant="secondary">{unit.unitNumber}</Badge>
                          <Badge variant="outline">
                            {getCoverageLabel(unit.coverageStatus, locale)}
                          </Badge>
                          {unit.interactiveIds.length > 0 ? (
                            <Badge variant="outline">
                              {unit.interactiveIds.length}{" "}
                              {getLocalizedText(uiText.interactiveUnits, locale)}
                            </Badge>
                          ) : null}
                        </div>
                        <h3 className="mt-4 text-lg font-semibold">{unit.title[locale]}</h3>
                        <p className="mt-3 text-sm leading-7 text-muted-foreground">
                          {unit.description[locale]}
                        </p>
                      </div>
                      <div className="mt-5 flex-1 space-y-2 text-xs text-muted-foreground">
                        {unit.sourceRefs.map((source) => (
                          <p key={`${source.file}-${source.pages ?? ""}`}>
                            {source.file}
                            {source.pages ? ` (${source.pages})` : ""}
                          </p>
                        ))}
                      </div>
                      <div className="mt-5">
                        <Link
                          href={getUnitHref(locale, unit)}
                          className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                        >
                          {getLocalizedText(uiText.visitUnit, locale)}
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </GlassPanel>
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>

          <div className="xl:hidden">
            <TextbookCourseSidebar courseMeta={courseMeta} locale={locale} />
          </div>
        </div>
      </div>
    </div>
  );
}
