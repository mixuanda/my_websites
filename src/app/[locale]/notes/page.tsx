import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, BookOpen, Languages, SquareLibrary, Waypoints } from "lucide-react";
import { GlassCard, GlassPanel } from "@/components/glass";
import { Badge } from "@/components/ui/badge";
import { getCourseList } from "@/lib/textbook/content";
import { getLocalizedText, isLocale, uiText } from "@/lib/textbook/i18n";
import { getCourseHref, getPublicNoteArchiveHref } from "@/lib/textbook/routes";
import type { LocalizedText } from "@/lib/textbook/types";
import { notFound } from "next/navigation";

function text(en: string, zhHk: string, zhCn: string): LocalizedText {
  return {
    en,
    "zh-cn": zhCn,
    "zh-hk": zhHk,
  };
}

const heroCopy = {
  archive: text(
    "Open the general note archive",
    "打開一般筆記檔案",
    "打开一般笔记档案"
  ),
  body: text(
    "Browse rigorous mathematics notes one section at a time. Each page is written as a serious course-note article, with interaction used only where it clarifies a definition, computation, or proof idea, and each section exports as TXT or PDF.",
    "逐節閱讀嚴謹的數學筆記。每頁都按正式課程筆記文章撰寫，只在能幫助理解定義、計算或證明思路時加入互動，並可把當前一節匯出成 TXT 或 PDF 溫習版本。",
    "逐节阅读严谨的数学笔记。每页都按正式课程笔记文章撰写，只在能帮助理解定义、计算或证明思路时加入互动，并可把当前一节导出成 TXT 或 PDF 复习版本。"
  ),
  export: text(
    "Export the current section",
    "匯出目前一節",
    "导出当前一节"
  ),
  languages: text(
    "English · 繁體中文 · 简体中文",
    "English · 繁體中文 · 简体中文",
    "English · 繁體中文 · 简体中文"
  ),
  route: text(
    "Read by linked sections with prerequisites",
    "按帶有先備關係的連結小節閱讀",
    "按带有先备关系的链接小节阅读"
  ),
} as const;

interface NotesIndexPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({
  params,
}: NotesIndexPageProps): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = isLocale(locale) ? locale : "zh-hk";

  return {
    title: getLocalizedText(uiText.textbook, safeLocale),
    description: getLocalizedText(heroCopy.body, safeLocale),
  };
}

export default async function NotesIndexPage({
  params,
}: NotesIndexPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const courses = getCourseList();

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <GlassCard className="p-6 md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="max-w-3xl">
            <Badge variant="secondary">
              {getLocalizedText(uiText.noteCollections, locale)}
            </Badge>
            <h1 className="mt-4 text-3xl font-bold md:text-4xl">
              {getLocalizedText(uiText.textbook, locale)}
            </h1>
            <p className="mt-4 text-base leading-8 text-muted-foreground md:text-lg">
              {getLocalizedText(heroCopy.body, locale)}
            </p>
          </div>
          <div className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
            <GlassPanel className="min-w-52 p-4">
              <div className="flex items-center gap-2 text-foreground">
                <Waypoints className="h-4 w-4 text-primary" />
                {getLocalizedText(heroCopy.route, locale)}
              </div>
            </GlassPanel>
            <GlassPanel className="min-w-52 p-4">
              <div className="flex items-center gap-2 text-foreground">
                <SquareLibrary className="h-4 w-4 text-primary" />
                {getLocalizedText(heroCopy.export, locale)}
              </div>
            </GlassPanel>
            <GlassPanel className="min-w-52 p-4">
              <div className="flex items-center gap-2 text-foreground">
                <Languages className="h-4 w-4 text-primary" />
                {getLocalizedText(heroCopy.languages, locale)}
              </div>
            </GlassPanel>
            <GlassPanel className="min-w-52 p-4">
              <Link
                href={getPublicNoteArchiveHref()}
                className="flex items-center gap-2 text-foreground transition-colors hover:text-primary"
              >
                <BookOpen className="h-4 w-4 text-primary" />
                {getLocalizedText(heroCopy.archive, locale)}
              </Link>
            </GlassPanel>
          </div>
        </div>
      </GlassCard>

      <div className="grid gap-6 xl:grid-cols-2">
        {courses.map((course) => {
          const unitCount = course.chapters.reduce(
            (total, chapter) => total + chapter.units.length,
            0
          );

          return (
            <GlassCard key={course.id} className="p-6">
              <div className="flex h-full flex-col">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                    {course.id.toUpperCase()}
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold">
                    {course.title[locale]}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {course.description[locale]}
                  </p>
                </div>
                <div className="mt-5 grid gap-3 md:grid-cols-2">
                  {course.chapters.map((chapter) => (
                    <GlassPanel key={chapter.id} className="p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        {getLocalizedText(uiText.chapter, locale)} {chapter.number}
                      </p>
                      <h3 className="mt-2 font-medium">{chapter.title[locale]}</h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {chapter.summary[locale]}
                      </p>
                    </GlassPanel>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                  <p className="text-sm text-muted-foreground">
                    {course.chapters.length} {getLocalizedText(uiText.chapter, locale)} · {unitCount}{" "}
                    {getLocalizedText(uiText.unit, locale)}
                  </p>
                  <Link
                    href={getCourseHref(locale, course.id)}
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    {getLocalizedText(uiText.courseOverview, locale)}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}
