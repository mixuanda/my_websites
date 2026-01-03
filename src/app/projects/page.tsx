import { allProjects } from "contentlayer/generated";
import { PostCard } from "@/components/PostCard";
import { GlassPanel } from "@/components/glass";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export const metadata = {
  title: "项目",
  description: "我的项目展示",
};

export default function ProjectsPage() {
  const projects = allProjects.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const allTags = Array.from(new Set(projects.flatMap((p) => p.tags)));

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">项目</h1>
        <p className="text-muted-foreground">
          共 {projects.length} 个项目
        </p>
      </div>

      {/* Filters */}
      {allTags.length > 0 && (
        <GlassPanel className="p-4">
          <h3 className="text-sm font-medium mb-2">标签筛选</h3>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`}>
                <Badge variant="outline" className="hover:bg-primary hover:text-primary-foreground cursor-pointer">
                  {tag}
                </Badge>
              </Link>
            ))}
          </div>
        </GlassPanel>
      )}

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project) => (
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

      {projects.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          暂无项目
        </div>
      )}
    </div>
  );
}
