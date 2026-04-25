"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { GlassPanel } from "@/components/glass";
import { getRouteLocale, getSiteText, resolveSiteLocale, siteUiText } from "@/lib/site-i18n";
import { defaultLocale } from "@/lib/textbook/i18n";
import type { Locale } from "@/lib/textbook/types";

const headingLevels = [2, 3, 4] as const;

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TocProps {
  highContrast?: boolean;
  maxDepth?: 2 | 3 | 4;
  title?: string;
}

function getHeadingSelector(maxDepth: 2 | 3 | 4) {
  return headingLevels
    .filter((level) => level <= maxDepth)
    .map((level) => `article h${level}`)
    .join(", ");
}

function collectHeadings(maxDepth: 2 | 3 | 4): TocItem[] {
  if (typeof document === "undefined") {
    return [];
  }

  return Array.from(document.querySelectorAll<HTMLElement>(getHeadingSelector(maxDepth)))
    .filter((el) => Boolean(el.id))
    .map((el) => ({
      id: el.id,
      text: el.textContent || "",
      level: Number.parseInt(el.tagName.charAt(1), 10),
    }));
}

export function Toc({ highContrast = false, maxDepth = 3, title }: TocProps) {
  const pathname = usePathname();
  const [locale, setLocale] = useState<Locale>(
    getRouteLocale(pathname) ?? defaultLocale
  );
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setHeadings(collectHeadings(maxDepth));
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [maxDepth]);

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(getHeadingSelector(maxDepth))
    );

    if (elements.length === 0) {
      return;
    }

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

    return () => {
      observer.disconnect();
    };
  }, [headings, maxDepth]);

  useEffect(() => {
    setLocale(resolveSiteLocale(pathname));
  }, [pathname]);

  if (headings.length === 0) return null;

  return (
    <GlassPanel highContrast={highContrast} className="sticky top-24">
      <h4 className="font-semibold mb-3 text-sm">
        {title ?? getSiteText(siteUiText.contents, locale)}
      </h4>
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
