import { allNotes } from "contentlayer/generated";
import { PostCard } from "@/components/PostCard";
import { GlassCard, GlassPanel } from "@/components/glass";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight, Languages, SquareLibrary } from "lucide-react";
import { getCourseList } from "@/lib/textbook/content";

export const metadata = {
  title: "Notes",
  description: "Interactive math note collections and the general note archive.",
};

export default function NotesPage() {
  const notes = allNotes.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const courses = getCourseList();

  const allTags = Array.from(new Set(notes.flatMap((n) => n.tags)));
  const allSeries = Array.from(
    new Set(notes.map((n) => n.series).filter(Boolean))
  ) as string[];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Notes</h1>
        <p className="text-muted-foreground">
          互动数学笔记与一般笔记归档都在这里继续整理。
        </p>
      </div>

      <GlassCard className="p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2">
              <SquareLibrary className="h-5 w-5 text-primary" />
              <Badge variant="secondary">Notes hub</Badge>
            </div>
            <h2 className="mt-4 text-2xl font-semibold">
              math1090 / math1030 互动数学笔记
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              数学内容现在作为 Notes 里的结构化学习系列继续扩写。你可以先选择语言，再进入按章节和小节拆开的互动笔记；一般笔记归档则保留在同一页下方。
            </p>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Languages className="h-4 w-4 text-primary" />
              English / 繁體中文 / 简体中文
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/en/notes"
                className="inline-flex items-center gap-2 rounded-xl border border-border/60 bg-background/40 px-4 py-2 text-sm transition-colors hover:bg-background/60"
              >
                EN
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/zh-hk/notes"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                繁體
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/zh-cn/notes"
                className="inline-flex items-center gap-2 rounded-xl border border-border/60 bg-background/40 px-4 py-2 text-sm transition-colors hover:bg-background/60"
              >
                简体
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </GlassCard>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold">数学笔记系列</h2>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              目前的课程入口已经统一放在 Notes 之下，后续新课程也会沿用同一套结构继续加入。
            </p>
          </div>
          <div className="text-sm text-muted-foreground">{courses.length} 个课程系列</div>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {courses.map((course) => (
            <GlassCard key={course.id} className="p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                {course.id.toUpperCase()}
              </p>
              <h3 className="mt-2 text-xl font-semibold">{course.title["zh-hk"]}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{course.title.en}</p>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {course.description["zh-hk"]}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Link
                  href={`/en/notes/${course.id}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-border/60 bg-background/40 px-4 py-2 text-sm transition-colors hover:bg-background/60"
                >
                  EN
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href={`/zh-hk/notes/${course.id}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  繁體
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href={`/zh-cn/notes/${course.id}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-border/60 bg-background/40 px-4 py-2 text-sm transition-colors hover:bg-background/60"
                >
                  简体
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      <GlassPanel className="p-4">
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">一般笔记归档</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              共 {notes.length} 篇一般笔记，可按系列与标签继续浏览。
            </p>
          </div>
          {allSeries.length > 0 && (
            <div>
              <h3 className="text-sm font-medium mb-2">系列</h3>
              <div className="flex flex-wrap gap-2">
                {allSeries.map((series) => (
                  <Badge key={series} variant="secondary">
                    {series}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          {allTags.length > 0 && (
            <div>
              <h3 className="text-sm font-medium mb-2">标签</h3>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`}>
                    <Badge variant="outline" className="hover:bg-primary hover:text-primary-foreground cursor-pointer">
                      {tag}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </GlassPanel>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <PostCard
            key={note.slug}
            title={note.title}
            description={note.description}
            date={note.date}
            slug={note.slug}
            tags={note.tags}
            category={note.category}
            type="note"
          />
        ))}
      </div>

      {notes.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          暂无一般笔记
        </div>
      )}
    </div>
  );
}
