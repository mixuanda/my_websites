import { allPosts, allNotes } from "contentlayer/generated";
import { PostCard } from "@/components/PostCard";
import { GlassPanel } from "@/components/glass";
import Link from "next/link";
import { ArrowLeft, Folder } from "lucide-react";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ cat: string }>;
}

export async function generateStaticParams() {
  const allCategories = new Set<string>();
  allPosts.forEach((p) => p.category && allCategories.add(p.category));
  allNotes.forEach((n) => n.category && allCategories.add(n.category));
  
  return Array.from(allCategories).map((cat) => ({
    cat: encodeURIComponent(cat),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { cat } = await params;
  const decodedCat = decodeURIComponent(cat);
  return {
    title: `分类: ${decodedCat}`,
    description: `所有 "${decodedCat}" 分类的内容`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { cat } = await params;
  const decodedCat = decodeURIComponent(cat);

  const posts = allPosts.filter((p) => p.published && p.category === decodedCat);
  const notes = allNotes.filter((n) => n.category === decodedCat);

  const totalCount = posts.length + notes.length;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Back Link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="w-4 h-4" />
        返回
      </Link>

      {/* Header */}
      <GlassPanel className="p-6">
        <div className="flex items-center gap-3">
          <Folder className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-2xl font-bold">{decodedCat}</h1>
            <p className="text-muted-foreground">
              共 {totalCount} 篇内容
            </p>
          </div>
        </div>
      </GlassPanel>

      {/* Posts */}
      {posts.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-4">博客文章</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard
                key={post.slug}
                title={post.title}
                description={post.description}
                date={post.date}
                slug={post.slug}
                tags={post.tags}
                category={post.category}
                type="blog"
              />
            ))}
          </div>
        </section>
      )}

      {/* Notes */}
      {notes.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-4">笔记</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <PostCard
                key={note.slug}
                title={note.title}
                description={note.description}
                date={note.date}
                slug={note.slug}
                tags={note.tags}
                type="note"
              />
            ))}
          </div>
        </section>
      )}

      {totalCount === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          没有找到相关内容
        </div>
      )}
    </div>
  );
}
