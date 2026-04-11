import Link from "next/link";
import type { Metadata } from "next";
import { ChevronLeft, ChevronRight, CircleDashed, Waypoints } from "lucide-react";
import { notFound } from "next/navigation";
import { GlassCard, GlassPanel } from "@/components/glass";
import { Badge } from "@/components/ui/badge";
import { Toc } from "@/components/Toc";
import { GlossaryPopover } from "@/components/textbook/GlossaryPopover";
import { PrerequisiteLink } from "@/components/textbook/PrerequisiteLink";
import { TextbookCourseSidebar } from "@/components/textbook/TextbookCourseSidebar";
import { TextbookMdx } from "@/components/textbook/TextbookMdx";
import { TextbookSessionSync } from "@/components/textbook/TextbookSessionSync";
import { UnitExportMenu } from "@/components/textbook/UnitExportMenu";
import { UnitProgressToggle } from "@/components/textbook/UnitProgressToggle";
import {
  getCourseMeta,
  getLocalizedGlossaryEntries,
  getPreviousAndNextUnits,
  getUnitMetaByRoute,
  textbookCatalog,
} from "@/lib/textbook/catalog";
import { getTextbookUnit, getStaticTextbookParams } from "@/lib/textbook/content";
import { getCoverageLabel, getLocalizedText, isLocale, uiText } from "@/lib/textbook/i18n";
import { getCoursesHref, getCourseHref, getUnitHref } from "@/lib/textbook/routes";
import type { CourseId } from "@/lib/textbook/types";

interface UnitPageProps {
  params: Promise<{
    chapter: string;
    course: string;
    locale: string;
    unit: string;
  }>;
}

export function generateStaticParams() {
  return getStaticTextbookParams();
}

export async function generateMetadata({
  params,
}: UnitPageProps): Promise<Metadata> {
  const { chapter, course, locale, unit } = await params;

  if (!isLocale(locale) || !(course in textbookCatalog)) {
    return {};
  }

  const bundle = getTextbookUnit(locale, course as CourseId, chapter, unit);

  if (!bundle) {
    return {};
  }

  return {
    title: bundle.doc.title,
    description: bundle.doc.description,
  };
}

export default async function UnitPage({ params }: UnitPageProps) {
  const { chapter, course, locale, unit } = await params;

  if (!isLocale(locale) || !(course in textbookCatalog)) {
    notFound();
  }

  const safeCourse = course as CourseId;
  const bundle = getTextbookUnit(locale, safeCourse, chapter, unit);
  const courseMeta = getCourseMeta(safeCourse);
  const unitMeta = getUnitMetaByRoute(safeCourse, chapter, unit);

  if (!bundle || !unitMeta) {
    notFound();
  }

  const chapterMeta = courseMeta.chapters.find((item) => item.id === chapter);
  const glossaryEntries = getLocalizedGlossaryEntries(locale, bundle.meta.glossaryRefs);
  const prerequisites = bundle.meta.prerequisites
    .map((unitId) =>
      courseMeta.chapters.flatMap((chapterItem) => chapterItem.units).find((item) => item.unitId === unitId)
    )
    .filter((value): value is NonNullable<typeof value> => Boolean(value));
  const navigation = getPreviousAndNextUnits(bundle.meta.unitId);
  const unitHref = getUnitHref(locale, bundle.meta);

  if (!chapterMeta) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-[1500px]">
      <TextbookSessionSync href={unitHref} locale={locale} unitId={bundle.meta.unitId} />

      <div className="grid gap-8 xl:grid-cols-[300px_minmax(0,1fr)] 2xl:grid-cols-[300px_minmax(0,1fr)_250px]">
        <aside className="hidden xl:block">
          <TextbookCourseSidebar
            courseMeta={courseMeta}
            currentUnitId={bundle.meta.unitId}
            locale={locale}
          />
        </aside>

        <div className="min-w-0 space-y-8">
          <nav className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <Link href={getCoursesHref(locale)} className="hover:text-primary">
              {getLocalizedText(uiText.textbook, locale)}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href={getCourseHref(locale, safeCourse)} className="hover:text-primary">
              {courseMeta.shortTitle[locale]}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span>{chapterMeta.title[locale]}</span>
          </nav>

          <GlassCard className="p-6 md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div className="max-w-3xl">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{bundle.meta.unitNumber}</Badge>
                  <Badge variant="outline">
                    {getCoverageLabel(bundle.meta.coverageStatus, locale)}
                  </Badge>
                  {bundle.meta.interactiveIds.length > 0 ? (
                    <Badge variant="outline">
                      {bundle.meta.interactiveIds.length}{" "}
                      {getLocalizedText(uiText.interactiveUnits, locale)}
                    </Badge>
                  ) : null}
                </div>
                <h1 className="mt-4 text-3xl font-bold md:text-4xl">{bundle.doc.title}</h1>
                <p className="mt-4 text-base leading-8 text-muted-foreground md:text-lg">
                  {bundle.doc.description}
                </p>
                {bundle.meta.coverageStatus === "MISSING_SOURCE" ? (
                  <GlassPanel className="mt-5 border border-amber-400/40 bg-amber-500/10 p-4 text-sm leading-7">
                    {getLocalizedText(uiText.missingSource, locale)}
                  </GlassPanel>
                ) : null}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <UnitProgressToggle locale={locale} unitId={bundle.meta.unitId} />
                <UnitExportMenu
                  chapter={chapter}
                  course={safeCourse}
                  locale={locale}
                  unit={unit}
                />
              </div>
            </div>
          </GlassCard>

          <div className="xl:hidden">
            <TextbookCourseSidebar
              courseMeta={courseMeta}
              currentUnitId={bundle.meta.unitId}
              locale={locale}
            />
          </div>

          <div className="2xl:hidden">
            <Toc title={getLocalizedText(uiText.pageToc, locale)} />
          </div>

          <GlassCard className="p-6 md:p-8">
            <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
              <Waypoints className="h-4 w-4 text-primary" />
              {getLocalizedText(uiText.interactiveStudio, locale)}
            </div>
            <article>
              <TextbookMdx code={bundle.doc.body.code} locale={locale} />
            </article>
          </GlassCard>

          <div className="grid gap-6 lg:grid-cols-2">
            <GlassPanel className="p-5">
              <h2 className="text-lg font-semibold">
                {getLocalizedText(uiText.prerequisites, locale)}
              </h2>
              {prerequisites.length > 0 ? (
                <div className="mt-4 space-y-3">
                  {prerequisites.map((item) => (
                    <PrerequisiteLink key={item.unitId} locale={locale} unit={item} />
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  {getLocalizedText(uiText.noPrerequisites, locale)}
                </p>
              )}
            </GlassPanel>

            <GlassPanel className="p-5">
              <h2 className="text-lg font-semibold">
                {getLocalizedText(uiText.relatedTerms, locale)}
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {glossaryEntries.map((entry) => (
                  <GlossaryPopover key={entry.id} entry={entry} locale={locale} />
                ))}
              </div>
            </GlassPanel>
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <GlassPanel className="p-5">
              <h2 className="text-lg font-semibold">
                {getLocalizedText(uiText.sourceTrail, locale)}
              </h2>
              <div className="mt-4 space-y-2 text-sm leading-7 text-muted-foreground">
                {bundle.meta.sourceRefs.map((source) => (
                  <p key={`${source.file}-${source.pages ?? ""}`}>
                    {source.file}
                    {source.pages ? ` (${source.pages})` : ""}
                    {source.note ? ` — ${source.note}` : ""}
                  </p>
                ))}
              </div>
            </GlassPanel>

            <GlassPanel className="p-5">
              <h2 className="text-lg font-semibold">
                {getLocalizedText(uiText.unit, locale)}
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {navigation.previous ? (
                  <Link
                    href={getUnitHref(locale, navigation.previous)}
                    className="rounded-xl border border-white/10 bg-background/30 px-4 py-4 transition-colors hover:bg-background/50"
                  >
                    <p className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-muted-foreground">
                      <ChevronLeft className="h-4 w-4" />
                      {getLocalizedText(uiText.previousUnit, locale)}
                    </p>
                    <p className="mt-2 text-sm font-medium leading-6">
                      {navigation.previous.title[locale]}
                    </p>
                  </Link>
                ) : (
                  <div className="rounded-xl border border-dashed border-white/10 px-4 py-4 text-sm text-muted-foreground">
                    <CircleDashed className="mb-2 h-4 w-4" />
                    {getLocalizedText(uiText.previousUnit, locale)}
                  </div>
                )}

                {navigation.next ? (
                  <Link
                    href={getUnitHref(locale, navigation.next)}
                    className="rounded-xl border border-white/10 bg-background/30 px-4 py-4 transition-colors hover:bg-background/50"
                  >
                    <p className="flex items-center justify-end gap-2 text-xs uppercase tracking-[0.24em] text-muted-foreground">
                      {getLocalizedText(uiText.nextUnit, locale)}
                      <ChevronRight className="h-4 w-4" />
                    </p>
                    <p className="mt-2 text-right text-sm font-medium leading-6">
                      {navigation.next.title[locale]}
                    </p>
                  </Link>
                ) : (
                  <div className="rounded-xl border border-dashed border-white/10 px-4 py-4 text-right text-sm text-muted-foreground">
                    <CircleDashed className="mb-2 ml-auto h-4 w-4" />
                    {getLocalizedText(uiText.nextUnit, locale)}
                  </div>
                )}
              </div>
            </GlassPanel>
          </div>
        </div>

        <aside className="hidden 2xl:block">
          <Toc title={getLocalizedText(uiText.pageToc, locale)} />
        </aside>
      </div>
    </div>
  );
}
