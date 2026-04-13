import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { GlassCard, GlassPanel } from "@/components/glass";
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
  return (
    <div className="space-y-4 xl:sticky xl:top-24">
      <GlassCard className="p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
          {getLocalizedText(uiText.noteCollections, locale)}
        </p>
        <h2 className="mt-2 text-xl font-semibold">{courseMeta.title[locale]}</h2>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
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
        </div>
      </GlassCard>

      {courseMeta.chapters.map((chapter) => (
        <GlassPanel key={chapter.id} className="p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            {getLocalizedText(uiText.chapter, locale)} {chapter.number}
          </p>
          <h3 className="mt-2 text-base font-semibold">{chapter.title[locale]}</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {chapter.summary[locale]}
          </p>
          <div className="mt-4 space-y-2">
            {chapter.units.map((unit) => {
              const isActive = unit.unitId === currentUnitId;

              return (
                <Link
                  key={unit.unitId}
                  href={getUnitHref(locale, unit)}
                  className={cn(
                    "group flex items-start justify-between gap-3 rounded-xl border px-3 py-3 transition-colors",
                    isActive
                      ? "border-primary/70 bg-primary/15"
                      : "border-border/60 bg-background/25 hover:bg-background/45"
                  )}
                >
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      {unit.unitNumber}
                    </p>
                    <p className="mt-1 text-sm leading-6">{unit.title[locale]}</p>
                    {unit.accessTier === "MEMBER" ? (
                      <p className="mt-1 text-xs text-muted-foreground">
                        {getLocalizedText(uiText.premium, locale)}
                      </p>
                    ) : null}
                  </div>
                  <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                </Link>
              );
            })}
          </div>
        </GlassPanel>
      ))}
    </div>
  );
}
