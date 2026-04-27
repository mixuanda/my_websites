import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, BookOpen, Languages, SquareLibrary, Waypoints } from "lucide-react";
import { GlassCard, GlassPanel } from "@/components/glass";
import { Badge } from "@/components/ui/badge";
import { isMembershipGatingEnabled } from "@/lib/membership/entitlements";
import { getVisibleCourseList } from "@/lib/textbook/catalog";
import { getSiteSurface } from "@/lib/site-surface";
import { getLocalizedText, isLocale, uiText } from "@/lib/textbook/i18n";
import { getCourseHref, getMembershipHref } from "@/lib/textbook/routes";
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
  body: text(
    "Choose a course and start from the section you need. The notes are written for rereading: definitions stay close to examples, longer computations remain visible, and exported copies are available when you want to study offline.",
    "選一個課程，從你現在需要的一節開始讀。這些筆記適合反覆翻看：定義旁邊有例子，較長的計算會留在頁面上，需要離線溫習時也可以匯出。",
    "选一个课程，从你现在需要的一节开始读。这些笔记适合反复翻看：定义旁边有例子，较长的计算会留在页面上，需要离线复习时也可以导出。"
  ),
  export: text(
    "Keep an offline copy",
    "留一份離線版本",
    "留一份离线版本"
  ),
  languages: text(
    "English · 繁體中文 · 简体中文",
    "English · 繁體中文 · 简体中文",
    "English · 繁體中文 · 简体中文"
  ),
  route: text(
    "Start from the section you need",
    "從需要的一節開始",
    "从需要的一节开始"
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

  const surface = getSiteSurface();
  const courses = getVisibleCourseList(surface);
  const membershipGatingEnabled = isMembershipGatingEnabled();

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
            {membershipGatingEnabled ? (
              <GlassPanel className="min-w-52 p-4">
                <Link
                  href={getMembershipHref(locale)}
                  className="flex items-center gap-2 text-foreground transition-colors hover:text-primary"
                >
                  <BookOpen className="h-4 w-4 text-primary" />
                  {getLocalizedText(uiText.upgradeMembership, locale)}
                </Link>
              </GlassPanel>
            ) : null}
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
