import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";
import { GlassCard, GlassPanel } from "@/components/glass";
import { isMembershipGatingEnabled } from "@/lib/membership/entitlements";
import { getLocalizedText, uiText } from "@/lib/textbook/i18n";
import { getCoursesHref, getCourseHref, getUnitHref } from "@/lib/textbook/routes";
import type { Locale, TextbookCourseMeta } from "@/lib/textbook/types";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./LanguageSwitcher";

interface TextbookCourseSidebarProps {
  courseMeta: TextbookCourseMeta;
  currentUnitId?: string;
  locale: Locale;
}

export function TextbookCourseSidebar({
  courseMeta,
  currentUnitId,
  locale,
}: TextbookCourseSidebarProps) {
  const membershipGatingEnabled = isMembershipGatingEnabled();
  const currentChapterId = courseMeta.chapters.find((chapter) =>
    chapter.units.some((unit) => unit.unitId === currentUnitId)
  )?.id;

  return (
    <div className="space-y-4 xl:sticky xl:top-24">
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
        </div>
      </GlassCard>

      {courseMeta.chapters.map((chapter) => (
        <GlassPanel key={chapter.id} className="p-0">
          <details
            className="group"
            open={currentChapterId ? chapter.id === currentChapterId : false}
          >
            <summary className="flex cursor-pointer list-none items-start justify-between gap-3 rounded-xl px-4 py-4 transition-colors hover:bg-background/35 [&::-webkit-details-marker]:hidden">
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
              <ChevronDown className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
            </summary>

            <div className="space-y-2 border-t border-border/60 px-3 py-3">
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
          </details>
        </GlassPanel>
      ))}
    </div>
  );
}
