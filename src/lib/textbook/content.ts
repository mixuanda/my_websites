import { allTextbookUnits } from "contentlayer/generated";
import { getLocalizedGlossaryEntries, getUnitMetaByRoute, textbookCatalog } from "./catalog";
import type {
  CourseId,
  ExportableTextbookUnit,
  Locale,
  TextbookUnitMeta,
} from "./types";
import { buildUnitExportBlocks } from "./export";

export function getCourseList() {
  return Object.values(textbookCatalog);
}

export function getTextbookDoc(
  locale: Locale,
  course: CourseId,
  chapter: string,
  unit: string
) {
  return (
    allTextbookUnits.find(
      (doc) =>
        doc.locale === locale &&
        doc.course === course &&
        doc.chapterId === chapter &&
        doc.unitSlug === unit
    ) ?? null
  );
}

export function getTextbookUnit(
  locale: Locale,
  course: CourseId,
  chapter: string,
  unit: string
) {
  const meta = getUnitMetaByRoute(course, chapter, unit);
  const doc = getTextbookDoc(locale, course, chapter, unit);

  if (!meta || !doc) {
    return null;
  }

  return {
    doc,
    meta,
  };
}

export function getLocalizedTextbookUnitExport(
  locale: Locale,
  course: CourseId,
  chapter: string,
  unit: string
): ExportableTextbookUnit | null {
  const bundle = getTextbookUnit(locale, course, chapter, unit);

  if (!bundle) {
    return null;
  }

  return {
    blocks: buildUnitExportBlocks(bundle.meta, locale, bundle.doc.body.raw),
    coverageStatus: bundle.meta.coverageStatus,
    course,
    description: bundle.doc.description,
    glossaryRefs: getLocalizedGlossaryEntries(locale, bundle.meta.glossaryRefs),
    locale,
    prerequisites: bundle.meta.prerequisites
      .map((unitId) =>
        textbookCatalog[course].chapters
          .flatMap((chapterMeta) => chapterMeta.units)
          .find((unitMeta) => unitMeta.unitId === unitId)
      )
      .filter((value): value is TextbookUnitMeta => Boolean(value)),
    sourceRefs: bundle.meta.sourceRefs,
    title: bundle.doc.title,
    unitId: bundle.meta.unitId,
    unitNumber: bundle.meta.unitNumber,
  };
}

export function getCourseUnitsByLocale(locale: Locale, course: CourseId) {
  return allTextbookUnits.filter(
    (doc) => doc.locale === locale && doc.course === course
  );
}

export function getStaticTextbookParams() {
  return allTextbookUnits.map((doc) => ({
    chapter: doc.chapterId,
    course: doc.course,
    locale: doc.locale,
    unit: doc.unitSlug,
  }));
}

export function estimateReadingTimeMinutes(rawMdx: string, locale: Locale) {
  const codeBlocks = rawMdx.match(/```[\s\S]*?```/g) ?? [];
  const displayMathBlocks = rawMdx.match(/\$\$[\s\S]*?\$\$/g) ?? [];
  const inlineMath = rawMdx.match(/\$[^$\n]+\$/g) ?? [];

  const codeLines = codeBlocks.reduce(
    (total, block) => total + block.split("\n").filter((line) => line.trim().length > 0).length,
    0
  );

  const prose = rawMdx
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/\$\$[\s\S]*?\$\$/g, " ")
    .replace(/\$[^$\n]+\$/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const latinWords = prose.match(/\b[\w'-]+\b/g)?.length ?? 0;
  const cjkChars = prose.match(/[\p{Script=Han}]/gu)?.length ?? 0;

  const latinMinutes = latinWords / 180;
  const cjkMinutes = cjkChars / 260;
  const codeMinutes = codeLines / 12;
  const displayMathMinutes = displayMathBlocks.length * 0.18;
  const inlineMathMinutes = inlineMath.length * 0.03;

  const localeBias =
    locale === "en"
      ? latinMinutes + cjkMinutes
      : Math.max(cjkMinutes, latinMinutes * 0.65) + latinMinutes * 0.35;

  const totalMinutes = localeBias + codeMinutes + displayMathMinutes + inlineMathMinutes;

  return Math.max(1, Math.ceil(totalMinutes));
}
