import { allNotes } from "contentlayer/generated";
import { PostCard } from "@/components/PostCard";
import { GlassCard, GlassPanel } from "@/components/glass";
import { Badge } from "@/components/ui/badge";
import { isProductionSurface } from "@/lib/site-surface";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight, Languages, SquareLibrary } from "lucide-react";

export const metadata = {
  title: "笔记",
  description: "可以反复回来看的一组课程笔记。",
};

export default function NotesPage() {
  if (isProductionSurface()) {
    redirect("/zh-hk/notes");
  }

  const notes = allNotes.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const allTags = Array.from(new Set(notes.flatMap((n) => n.tags)));
  const allSeries = Array.from(
    new Set(notes.map((n) => n.series).filter(Boolean))
  ) as string[];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">笔记</h1>
        <p className="text-muted-foreground">
          共 {notes.length} 篇笔记
        </p>
      </div>

      <GlassCard className="p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
              <div className="flex items-center gap-2">
                <SquareLibrary className="h-5 w-5 text-primary" />
                <Badge variant="secondary">课程笔记</Badge>
              </div>
              <h2 className="mt-4 text-2xl font-semibold">
                从需要的一节开始读
              </h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                有些定义、例题和计算细节需要不止看一次。这里把可以继续读下去的笔记放在一起，
                方便上课、做题或复习时直接回到对应的一节。
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

      {/* Filters */}
      <GlassPanel className="p-4">
        <div className="space-y-4">
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

      {/* Notes Grid */}
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
          暂无笔记
        </div>
      )}
    </div>
  );
}
