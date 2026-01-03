import { allPosts, allNotes, allProjects } from "contentlayer/generated";
import { PostCard } from "@/components/PostCard";
import { GlassPanel } from "@/components/glass";
import Link from "next/link";
import { ArrowLeft, Tag } from "lucide-react";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const allTags = new Set<string>();
  allPosts.forEach((p) => p.tags.forEach((t) => allTags.add(t)));
  allNotes.forEach((n) => n.tags.forEach((t) => allTags.add(t)));
  allProjects.forEach((p) => p.tags.forEach((t) => allTags.add(t)));
  
  return Array.from(allTags).map((tag) => ({
    tag: encodeURIComponent(tag),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  return {
    title: `标签: ${decodedTag}`,
    description: `所有标记为 "${decodedTag}" 的内容`,
  };
}

export default async function TagPage({ params }: PageProps) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);

  const posts = allPosts.filter((p) => p.published && p.tags.includes(decodedTag));
  const notes = allNotes.filter((n) => n.tags.includes(decodedTag));
  const projects = allProjects.filter((p) => p.tags.includes(decodedTag));

  const totalCount = posts.length + notes.length + projects.length;

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
          <Tag className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-2xl font-bold">{decodedTag}</h1>
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

      {/* Projects */}
      {projects.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-4">项目</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <PostCard
                key={project.slug}
                title={project.title}
                description={project.description}
                date={project.date}
                slug={project.slug}
                tags={project.tags}
                type="project"
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
