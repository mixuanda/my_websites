import Link from "next/link";
import { ArrowRight, BookOpen, Download, Languages, SquareLibrary } from "lucide-react";
import { GlassCard, GlassPanel } from "@/components/glass";
import { Badge } from "@/components/ui/badge";
import { getVisibleCourseList } from "@/lib/textbook/catalog";
import { getLocalizedText } from "@/lib/textbook/i18n";

export default function Home() {
  const courses = getVisibleCourseList();

  return (
    <div className="mx-auto max-w-6xl space-y-10">
      <section className="py-10 md:py-16">
        <GlassCard variant="elevated" className="p-7 md:p-10">
          <div className="flex items-center gap-2">
            <SquareLibrary className="h-5 w-5 text-primary" />
            <Badge variant="secondary">Evanalysis Notes</Badge>
          </div>
          <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
            Evanalysis Notes
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground md:text-lg">
            數學、計算機和課程筆記。
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/zh-hk/notes"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              繁體中文
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/en/notes"
              className="inline-flex items-center gap-2 rounded-xl border border-border/60 bg-background/40 px-4 py-2 text-sm transition-colors hover:bg-background/60"
            >
              English
            </Link>
            <Link
              href="/zh-cn/notes"
              className="inline-flex items-center gap-2 rounded-xl border border-border/60 bg-background/40 px-4 py-2 text-sm transition-colors hover:bg-background/60"
            >
              简体中文
            </Link>
          </div>
        </GlassCard>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <GlassPanel className="p-5">
          <div className="flex items-center gap-2 font-medium">
            <BookOpen className="h-4 w-4 text-primary" />
            課程筆記
          </div>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            按課程閱讀。
          </p>
        </GlassPanel>
        <GlassPanel className="p-5">
          <div className="flex items-center gap-2 font-medium">
            <Languages className="h-4 w-4 text-primary" />
            三種語言
          </div>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            English / 繁體中文 / 简体中文
          </p>
        </GlassPanel>
        <GlassPanel className="p-5">
          <div className="flex items-center gap-2 font-medium">
            <Download className="h-4 w-4 text-primary" />
            TXT / PDF
          </div>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            單元頁可匯出。
          </p>
        </GlassPanel>
      </section>

      <section className="space-y-5">
        <div>
          <h2 className="text-2xl font-semibold">筆記系列</h2>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            選一個課程開始。
          </p>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {courses.map((course) => (
            <GlassCard key={course.id} className="p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                {course.id}
              </p>
              <h3 className="mt-2 text-xl font-semibold">
                {getLocalizedText(course.title, "zh-hk")}
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {getLocalizedText(course.description, "zh-hk")}
              </p>
              <Link
                href={`/zh-hk/notes/${course.id}`}
                className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary"
              >
                閱讀系列
                <ArrowRight className="h-4 w-4" />
              </Link>
            </GlassCard>
          ))}
        </div>
      </section>
    </div>
  );
}
