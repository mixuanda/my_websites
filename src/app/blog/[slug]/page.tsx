import { allPosts } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { Mdx } from "@/components/Mdx";
import { Toc } from "@/components/Toc";
import { GlassCard, GlassPanel } from "@/components/glass";
import { Badge } from "@/components/ui/badge";
import { Giscus } from "@/components/Giscus";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import Link from "next/link";
import { ArrowLeft, Calendar, Folder, Tag } from "lucide-react";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = allPosts.find((p) => p.slug === slug);
  if (!post) return {};
  
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: ["Evanalysis"],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = allPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex gap-8">
        {/* Main Content */}
        <article className="flex-1 min-w-0">
          {/* Back Link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            返回博客列表
          </Link>

          {/* Post Header */}
          <GlassCard className="p-6 md:p-8 mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
            <p className="text-lg text-muted-foreground mb-6">{post.description}</p>
            
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {format(new Date(post.date), "yyyy年MM月dd日", { locale: zhCN })}
              </span>
              {post.category && (
                <Link
                  href={`/categories/${encodeURIComponent(post.category)}`}
                  className="flex items-center gap-1 hover:text-primary"
                >
                  <Folder className="w-4 h-4" />
                  {post.category}
                </Link>
              )}
            </div>

            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {post.tags.map((tag) => (
                  <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`}>
                    <Badge variant="secondary" className="hover:bg-primary hover:text-primary-foreground">
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </Badge>
                  </Link>
                ))}
              </div>
            )}
          </GlassCard>

          {/* Post Content */}
          <GlassCard className="p-6 md:p-8">
            <Mdx code={post.body.code} />
          </GlassCard>

          {/* Comments Section */}
          <GlassPanel className="p-6 mt-8">
            <h3 className="text-lg font-semibold mb-4">评论</h3>
            <Giscus />
          </GlassPanel>
        </article>

        {/* Sidebar with TOC */}
        {post.toc && (
          <aside className="hidden xl:block w-64 flex-shrink-0">
            <Toc />
          </aside>
        )}
      </div>
    </div>
  );
}
