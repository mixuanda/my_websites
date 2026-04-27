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
            以章節為單位整理的課程筆記
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground md:text-lg">
            這個網站目前保留首頁與 Notes。筆記按課程、章節與小節編排，
            以清楚的定義、推導、例題和練習為主；互動內容只在它能幫助理解概念或計算時出現。
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/zh-hk/notes"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              進入繁體中文筆記
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
            文章式閱讀
          </div>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            每節筆記都以連續的說明和例子展開，不把內容壓縮成簡短提示。
          </p>
        </GlassPanel>
        <GlassPanel className="p-5">
          <div className="flex items-center gap-2 font-medium">
            <Languages className="h-4 w-4 text-primary" />
            三語入口
          </div>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            英文、繁體中文與簡體中文共用同一套課程結構，方便切換閱讀。
          </p>
        </GlassPanel>
        <GlassPanel className="p-5">
          <div className="flex items-center gap-2 font-medium">
            <Download className="h-4 w-4 text-primary" />
            靜態匯出
          </div>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            小節頁可匯出為 TXT 或 PDF，互動區塊會轉成適合溫習的靜態材料。
          </p>
        </GlassPanel>
      </section>

      <section className="space-y-5">
        <div>
          <h2 className="text-2xl font-semibold">目前可閱讀的筆記系列</h2>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            這些系列都放在 Notes 下面，之後新增課程也會沿用同一種章節結構。
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
