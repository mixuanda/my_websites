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
            我把一些課上反覆用到、又容易在第一次讀時卡住的數學與計算機內容整理在這裡。
            每個系列都可以按自己的節奏慢慢讀；需要回頭查定義、例子或計算細節時，也有一個固定入口。
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
            慢慢讀
          </div>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            有些概念不是看一眼就會懂。這裡盡量把符號、例子和常見卡點放在同一頁，方便回頭重讀。
          </p>
        </GlassPanel>
        <GlassPanel className="p-5">
          <div className="flex items-center gap-2 font-medium">
            <Languages className="h-4 w-4 text-primary" />
            三種文字入口
          </div>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            同一個系列可以切換英文、繁體中文和簡體中文；目前以繁體中文入口作為首頁預設。
          </p>
        </GlassPanel>
        <GlassPanel className="p-5">
          <div className="flex items-center gap-2 font-medium">
            <Download className="h-4 w-4 text-primary" />
            留一份離線版本
          </div>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            單元頁可以匯出 TXT 或 PDF，做功課或複習時不用一直留在瀏覽器裡。
          </p>
        </GlassPanel>
      </section>

      <section className="space-y-5">
        <div>
          <h2 className="text-2xl font-semibold">可以開始讀的系列</h2>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            先從一個熟悉的課程進去即可；每個系列下面都有章節和單元入口。
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
