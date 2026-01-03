import { allNotes } from "contentlayer/generated";
import { PostCard } from "@/components/PostCard";
import { GlassPanel } from "@/components/glass";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export const metadata = {
  title: "笔记",
  description: "我的学习笔记",
};

export default function NotesPage() {
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
