"use client";

import Link from "next/link";
import Image from "next/image";
import { GlassCard } from "@/components/glass";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";

interface PostCardProps {
  title: string;
  description: string;
  date: string;
  slug: string;
  tags?: string[];
  category?: string;
  image?: string;
  highContrast?: boolean;
  type?: "blog" | "note" | "project";
}

export function PostCard({
  title,
  description,
  date,
  slug,
  tags = [],
  category,
  image,
  highContrast = false,
  type = "blog",
}: PostCardProps) {
  const href = type === "project" ? `/projects/${slug}` : type === "note" ? `/notes/${slug}` : `/blog/${slug}`;
  
  return (
    <Link href={href}>
      <GlassCard
        highContrast={highContrast}
        className="group overflow-hidden hover:scale-[1.02] hover:shadow-xl transition-all duration-300 h-full flex flex-col"
      >
        {image && (
          <div className="relative h-48 overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <time>{format(new Date(date), "yyyy年MM月dd日", { locale: zhCN })}</time>
            {category && (
              <>
                <span>•</span>
                <span>{category}</span>
              </>
            )}
          </div>
          <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
            {description}
          </p>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-auto">
              {tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{tags.length - 3}
                </Badge>
              )}
            </div>
          )}
        </div>
      </GlassCard>
    </Link>
  );
}
