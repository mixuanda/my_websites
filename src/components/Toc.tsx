"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { GlassPanel } from "@/components/glass";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TocProps {
  highContrast?: boolean;
}

export function Toc({ highContrast = false }: TocProps) {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const elements = document.querySelectorAll("article h2, article h3, article h4");
    const items: TocItem[] = Array.from(elements).map((el) => ({
      id: el.id,
      text: el.textContent || "",
      level: parseInt(el.tagName.charAt(1)),
    }));
    setHeadings(items);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -80% 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <GlassPanel highContrast={highContrast} className="sticky top-24">
      <h4 className="font-semibold mb-3 text-sm">目录</h4>
      <nav className="space-y-1">
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            className={cn(
              "block text-sm py-1 transition-colors hover:text-primary",
              heading.level === 2 && "pl-0",
              heading.level === 3 && "pl-3",
              heading.level === 4 && "pl-6",
              activeId === heading.id
                ? "text-primary font-medium"
                : "text-muted-foreground"
            )}
          >
            {heading.text}
          </a>
        ))}
      </nav>
    </GlassPanel>
  );
}
