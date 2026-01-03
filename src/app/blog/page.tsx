import { allPosts } from "contentlayer/generated";
import { PostCard } from "@/components/PostCard";
import { GlassPanel } from "@/components/glass";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export const metadata = {
  title: "博客",
  description: "我的博客文章列表",
};

export default function BlogPage() {
  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags)));
  const allCategories = Array.from(
    new Set(posts.map((p) => p.category).filter(Boolean))
  ) as string[];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">博客</h1>
        <p className="text-muted-foreground">
          共 {posts.length} 篇文章
        </p>
      </div>

      {/* Filters */}
      <GlassPanel className="p-4">
        <div className="space-y-4">
          {allCategories.length > 0 && (
            <div>
              <h3 className="text-sm font-medium mb-2">分类</h3>
              <div className="flex flex-wrap gap-2">
                {allCategories.map((cat) => (
                  <Link key={cat} href={`/categories/${encodeURIComponent(cat)}`}>
                    <Badge variant="secondary" className="hover:bg-primary hover:text-primary-foreground cursor-pointer">
                      {cat}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>
          )}
          {allTags.length > 0 && (
            <div>
              <h3 className="text-sm font-medium mb-2">标签</h3>
              <div className="flex flex-wrap gap-2">
                {allTags.slice(0, 10).map((tag) => (
                  <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`}>
                    <Badge variant="outline" className="hover:bg-primary hover:text-primary-foreground cursor-pointer">
                      {tag}
                    </Badge>
                  </Link>
                ))}
                {allTags.length > 10 && (
                  <Badge variant="outline">+{allTags.length - 10}</Badge>
                )}
              </div>
            </div>
          )}
        </div>
      </GlassPanel>

      {/* Posts Grid */}
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
            image={post.image}
            type="blog"
          />
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          暂无文章
        </div>
      )}
    </div>
  );
}
