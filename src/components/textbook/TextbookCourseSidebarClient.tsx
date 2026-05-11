"use client";

import { useId, useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight, Search, X } from "lucide-react";
import { GlassCard, GlassPanel } from "@/components/glass";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getLocalizedText, uiText } from "@/lib/textbook/i18n";
import { getCoursesHref, getCourseHref, getUnitHref } from "@/lib/textbook/routes";
import type { Locale, TextbookCourseMeta } from "@/lib/textbook/types";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./LanguageSwitcher";

interface TextbookCourseSidebarClientProps {
  courseMeta: TextbookCourseMeta;
  currentUnitId?: string;
  locale: Locale;
  membershipGatingEnabled: boolean;
}

type ChapterFilter = "all" | "current";

function normalizeSearchText(value: string) {
  return value.trim().toLocaleLowerCase();
}

export function TextbookCourseSidebarClient({
  courseMeta,
  currentUnitId,
  locale,
  membershipGatingEnabled,
}: TextbookCourseSidebarClientProps) {
  const sidebarInstanceId = useId();
  const currentChapterId = courseMeta.chapters.find((chapter) =>
    chapter.units.some((unit) => unit.unitId === currentUnitId)
  )?.id;
  const [query, setQuery] = useState("");
  const [chapterFilter, setChapterFilter] = useState<ChapterFilter>("all");
  const [expandedChapterIds, setExpandedChapterIds] = useState<Set<string>>(
    () => new Set(currentChapterId ? [currentChapterId] : [])
  );

  const normalizedQuery = normalizeSearchText(query);
  const hasSearch = normalizedQuery.length > 0;

  const visibleChapters = useMemo(() => {
    const chapters =
      chapterFilter === "current" && currentChapterId
        ? courseMeta.chapters.filter((chapter) => chapter.id === currentChapterId)
        : courseMeta.chapters;

    if (!hasSearch) {
      return chapters;
    }

    return chapters
      .map((chapter) => {
        const chapterSearchText = normalizeSearchText(
          [
            chapter.number,
            chapter.title[locale],
            chapter.summary[locale],
          ].join(" ")
        );
        const chapterMatches = chapterSearchText.includes(normalizedQuery);
        const units = chapterMatches
          ? chapter.units
          : chapter.units.filter((unit) =>
              normalizeSearchText(
                [
                  unit.unitNumber,
                  unit.title[locale],
                  unit.description[locale],
                ].join(" ")
              ).includes(normalizedQuery)
            );

        return {
          ...chapter,
          units,
        };
      })
      .filter((chapter) => chapter.units.length > 0);
  }, [chapterFilter, courseMeta.chapters, currentChapterId, hasSearch, locale, normalizedQuery]);

  const visibleUnitCount = visibleChapters.reduce(
    (total, chapter) => total + chapter.units.length,
    0
  );
  const totalUnitCount = courseMeta.chapters.reduce(
    (total, chapter) => total + chapter.units.length,
    0
  );
  const searchInputId = `${sidebarInstanceId}-course-note-search`;
  const searchStatusId = `${sidebarInstanceId}-course-note-search-status`;
  const chapterListId = `${sidebarInstanceId}-course-note-chapters`;

  function toggleChapter(chapterId: string) {
    setExpandedChapterIds((previous) => {
      const next = new Set(previous);
      if (next.has(chapterId)) {
        next.delete(chapterId);
      } else {
        next.add(chapterId);
      }
      return next;
    });
  }

  return (
    <div className="space-y-4 xl:sticky xl:top-24 xl:max-h-[calc(100vh-7rem)] xl:overflow-y-auto xl:pr-2">
      <GlassCard className="p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
          {getLocalizedText(uiText.courseContents, locale)}
        </p>
        <h2 className="mt-2 text-xl font-semibold">{courseMeta.title[locale]}</h2>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          {courseMeta.description[locale]}
        </p>
        <div className="mt-4 space-y-3">
          <LanguageSwitcher locale={locale} />
          <div className="flex flex-wrap gap-2">
            <Link
              href={getCoursesHref(locale)}
              className="rounded-full border border-border/60 px-3 py-1 text-xs text-muted-foreground transition-colors hover:bg-background/50 hover:text-foreground"
            >
              {getLocalizedText(uiText.allCourses, locale)}
            </Link>
            <Link
              href={getCourseHref(locale, courseMeta.id)}
              className="rounded-full border border-border/60 px-3 py-1 text-xs text-muted-foreground transition-colors hover:bg-background/50 hover:text-foreground"
            >
              {getLocalizedText(uiText.courseOverview, locale)}
            </Link>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {courseMeta.chapters.map((chapter) => {
              const firstUnit = chapter.units[0];
              const chapterHref = currentUnitId
                ? firstUnit
                  ? getUnitHref(locale, firstUnit)
                  : getCourseHref(locale, courseMeta.id)
                : `${getCourseHref(locale, courseMeta.id)}#${chapter.id}`;
              const isCurrentChapter = chapter.id === currentChapterId;

              return (
                <Link
                  key={chapter.id}
                  aria-current={isCurrentChapter ? "location" : undefined}
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs transition-colors",
                    isCurrentChapter
                      ? "border-primary/70 bg-primary/15 text-foreground"
                      : "border-border/60 text-muted-foreground hover:bg-background/50 hover:text-foreground"
                  )}
                  href={chapterHref}
                >
                  {chapter.number}
                </Link>
              );
            })}
          </div>

          <div className="space-y-3 border-t border-border/60 pt-4">
            <label className="sr-only" htmlFor={searchInputId}>
              {getLocalizedText(uiText.courseSearchLabel, locale)}
            </label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                aria-controls={chapterListId}
                aria-describedby={searchStatusId}
                id={searchInputId}
                className="h-10 rounded-lg pl-9 pr-10 text-sm"
                onChange={(event) => setQuery(event.target.value)}
                placeholder={getLocalizedText(uiText.courseSearchPlaceholder, locale)}
                value={query}
              />
              {query ? (
                <Button
                  aria-label={getLocalizedText(uiText.clearCourseSearch, locale)}
                  className="absolute right-1.5 top-1/2 size-7 -translate-y-1/2"
                  onClick={() => setQuery("")}
                  size="icon-sm"
                  type="button"
                  variant="ghost"
                >
                  <X className="h-4 w-4" />
                </Button>
              ) : null}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button
                aria-controls={chapterListId}
                aria-pressed={chapterFilter === "all"}
                onClick={() => setChapterFilter("all")}
                size="sm"
                type="button"
                variant={chapterFilter === "all" ? "secondary" : "outline"}
              >
                {getLocalizedText(uiText.allChapters, locale)}
              </Button>
              <Button
                aria-controls={chapterListId}
                aria-pressed={chapterFilter === "current"}
                disabled={!currentChapterId}
                onClick={() => setChapterFilter("current")}
                size="sm"
                type="button"
                variant={chapterFilter === "current" ? "secondary" : "outline"}
              >
                {getLocalizedText(uiText.currentChapterOnly, locale)}
              </Button>
            </div>
            {hasSearch ? (
              <p
                aria-live="polite"
                className="text-xs text-muted-foreground"
                id={searchStatusId}
                role="status"
              >
                {visibleUnitCount} {getLocalizedText(uiText.sectionCountUnit, locale)}
              </p>
            ) : (
              <p className="sr-only" id={searchStatusId}>
                {totalUnitCount} {getLocalizedText(uiText.sectionCountUnit, locale)}
              </p>
            )}
          </div>
        </div>
      </GlassCard>

      <div id={chapterListId} className="space-y-4">
        {visibleChapters.length > 0 ? (
          visibleChapters.map((chapter) => {
            const isExpanded = hasSearch || expandedChapterIds.has(chapter.id);
            const chapterPanelId = `${sidebarInstanceId}-chapter-${chapter.id}`;

            return (
              <GlassPanel key={chapter.id} className="p-0">
                <div>
                  <button
                    aria-controls={chapterPanelId}
                    aria-expanded={isExpanded}
                    className="flex w-full cursor-pointer list-none items-start justify-between gap-3 rounded-xl px-4 py-4 text-left transition-colors hover:bg-background/35 disabled:cursor-default disabled:hover:bg-transparent"
                    disabled={hasSearch}
                    onClick={() => toggleChapter(chapter.id)}
                    type="button"
                  >
                    <span className="min-w-0">
                      <span className="block text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                        {getLocalizedText(uiText.chapter, locale)} {chapter.number}
                      </span>
                      <span className="mt-1 block text-sm font-semibold leading-6">
                        {chapter.title[locale]}
                      </span>
                      <span className="mt-1 block text-xs text-muted-foreground">
                        {chapter.units.length} {getLocalizedText(uiText.sectionCountUnit, locale)}
                      </span>
                    </span>
                    <ChevronDown
                      className={cn(
                        "mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform",
                        isExpanded ? "rotate-180" : ""
                      )}
                    />
                  </button>

                  <div
                    className="space-y-2 border-t border-border/60 px-3 py-3"
                    hidden={!isExpanded}
                    id={chapterPanelId}
                  >
                    {chapter.units.map((unit) => {
                      const isActive = unit.unitId === currentUnitId;

                      return (
                        <Link
                          key={unit.unitId}
                          aria-current={isActive ? "page" : undefined}
                          href={getUnitHref(locale, unit)}
                          className={cn(
                            "group/unit flex items-start justify-between gap-3 rounded-lg border px-3 py-2.5 transition-colors",
                            isActive
                              ? "border-primary/70 bg-primary/15"
                              : "border-transparent bg-background/20 hover:border-border/60 hover:bg-background/45"
                          )}
                        >
                          <span className="min-w-0">
                            <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                              {unit.unitNumber}
                            </span>
                            <span className="mt-1 block text-sm leading-6">
                              {unit.title[locale]}
                            </span>
                            {isActive ? (
                              <span className="mt-1 block text-xs font-medium text-primary">
                                {getLocalizedText(uiText.currentSection, locale)}
                              </span>
                            ) : null}
                            {membershipGatingEnabled && unit.accessTier === "MEMBER" ? (
                              <span className="mt-1 block text-xs text-muted-foreground">
                                {getLocalizedText(uiText.premium, locale)}
                              </span>
                            ) : null}
                          </span>
                          <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover/unit:translate-x-0.5" />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </GlassPanel>
            );
          })
        ) : (
          <GlassPanel
            aria-live="polite"
            className="p-4 text-sm leading-6 text-muted-foreground"
            role="status"
          >
            {getLocalizedText(uiText.noMatchingSections, locale)}
          </GlassPanel>
        )}
      </div>
    </div>
  );
}
