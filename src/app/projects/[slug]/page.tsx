import { allProjects } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { Mdx } from "@/components/Mdx";
import { GlassCard } from "@/components/glass";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github, Calendar } from "lucide-react";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return allProjects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = allProjects.find((p) => p.slug === slug);
  if (!project) return {};
  
  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = allProjects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Link */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        返回项目列表
      </Link>

      {/* Project Header */}
      <GlassCard className="p-6 md:p-8 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{project.title}</h1>
        <p className="text-lg text-muted-foreground mb-6">{project.description}</p>
        
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {format(new Date(project.date), "yyyy年MM月dd日", { locale: zhCN })}
          </span>
        </div>

        {project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          {project.link && (
            <Button asChild>
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                访问项目
              </a>
            </Button>
          )}
          {project.github && (
            <Button variant="outline" asChild>
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                源代码
              </a>
            </Button>
          )}
        </div>
      </GlassCard>

      {/* Project Content */}
      <GlassCard className="p-6 md:p-8">
        <Mdx code={project.body.code} />
      </GlassCard>
    </div>
  );
}
