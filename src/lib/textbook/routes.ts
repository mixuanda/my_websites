import type { CourseId, Locale, TextbookUnitMeta } from "./types";

export function getNotesHref(locale: Locale) {
  return `/${locale}/notes`;
}

export function getPublicNoteArchiveHref() {
  return "/notes";
}

export function getLegacyCoursesHref(locale: Locale) {
  return `/${locale}/courses`;
}

export function getCoursesHref(locale: Locale) {
  return getNotesHref(locale);
}

export function getCourseHref(locale: Locale, course: CourseId) {
  return `${getNotesHref(locale)}/${course}`;
}

export function getMembershipHref(locale: Locale) {
  return `${getNotesHref(locale)}/membership`;
}

export function getMembershipSuccessHref(locale: Locale) {
  return `${getMembershipHref(locale)}/success`;
}

export function getMembershipCancelHref(locale: Locale) {
  return `${getMembershipHref(locale)}/cancel`;
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
