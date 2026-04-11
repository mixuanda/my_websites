import type { CourseId, Locale, TextbookUnitMeta } from "./types";

export function getCoursesHref(locale: Locale) {
  return `/${locale}/courses`;
}

export function getCourseHref(locale: Locale, course: CourseId) {
  return `${getCoursesHref(locale)}/${course}`;
}

export function getUnitHref(locale: Locale, unit: TextbookUnitMeta) {
  return `${getCourseHref(locale, unit.course)}/${unit.chapterId}/${unit.slug}`;
}

export function getUnitHrefFromParts(
  locale: Locale,
  course: CourseId,
  chapterId: string,
  unit: string
) {
  return `${getCourseHref(locale, course)}/${chapterId}/${unit}`;
}
