import { allPosts, allProjects } from "contentlayer/generated";
import { PostCard } from "@/components/PostCard";
import { GlassCard, GlassPanel } from "@/components/glass";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight, Sparkles, BookOpen, FolderKanban } from "lucide-react";

export default function Home() {
  const recentPosts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  const featuredProjects = allProjects
    .filter((p) => p.featured)
    .slice(0, 2);

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <GlassCard variant="elevated" className="p-8 md:p-12">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-primary" />
            <Badge variant="secondary">欢迎访问</Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            你好，我是{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Evanalysis
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mb-6">
            一名热爱技术和数学的开发者。在这里，我分享我的项目、博客文章和学习笔记。
            欢迎探索这个用玻璃拟态风格打造的个人空间。
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-opacity"
            >
              <BookOpen className="w-4 h-4" />
              浏览博客
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
            >
              <FolderKanban className="w-4 h-4" />
              查看项目
            </Link>
          </div>
        </GlassCard>
      </section>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">精选项目</h2>
            <Link
              href="/projects"
              className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1"
            >
              查看全部 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {featuredProjects.map((project) => (
              <PostCard
                key={project.slug}
                title={project.title}
                description={project.description}
                date={project.date}
                slug={project.slug}
                tags={project.tags}
                image={project.image}
                type="project"
              />
            ))}
          </div>
        </section>
      )}

      {/* Recent Posts */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">最新文章</h2>
          <Link
            href="/blog"
            className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1"
          >
            查看全部 <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentPosts.map((post) => (
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
      </section>

      {/* Stats Section */}
      <section>
        <GlassPanel className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-primary">
                {allPosts.length}
              </div>
              <div className="text-sm text-muted-foreground">篇文章</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">
                {allProjects.length}
              </div>
              <div className="text-sm text-muted-foreground">个项目</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">
                {Array.from(new Set(allPosts.flatMap((p) => p.tags))).length}
              </div>
              <div className="text-sm text-muted-foreground">个标签</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">∞</div>
              <div className="text-sm text-muted-foreground">热情</div>
            </div>
          </div>
        </GlassPanel>
      </section>
    </div>
  );
}
