import { allTextbookUnits } from "contentlayer/generated";
import { MetadataRoute } from "next";
import { getVisibleCourseList } from "@/lib/textbook/catalog";
import { isLocale, locales } from "@/lib/textbook/i18n";
import { getCourseHref, getNotesHref, getUnitHrefFromParts } from "@/lib/textbook/routes";
import type { Locale } from "@/lib/textbook/types";
import { absoluteUrl, getLanguageAlternates } from "@/lib/seo";
import { getSiteSurface } from "@/lib/site-surface";

export default function sitemap(): MetadataRoute.Sitemap {
  const surface = getSiteSurface();
  const courses = getVisibleCourseList(surface);
  const now = new Date();

  const visibleUnitKeys = new Set(
    courses.flatMap((course) =>
      course.chapters.flatMap((chapter) =>
        chapter.units.map((unit) => `${course.id}/${chapter.id}/${unit.slug}`)
      )
    )
  );

  const unitLocales = new Map<string, Set<Locale>>();

  allTextbookUnits.forEach((unit) => {
    const key = `${unit.course}/${unit.chapterId}/${unit.unitSlug}`;

    if (!visibleUnitKeys.has(key) || !isLocale(unit.locale)) {
      return;
    }

    const localeSet = unitLocales.get(key) ?? new Set<Locale>();
    localeSet.add(unit.locale);
    unitLocales.set(key, localeSet);
  });

  const staticPages = [
    {
      url: absoluteUrl("/"),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    ...locales.map((locale) => ({
      url: absoluteUrl(getNotesHref(locale)),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
      alternates: {
        languages: getLanguageAlternates(getNotesHref),
      },
    })),
  ];

  const coursePages = locales.flatMap((locale) =>
    courses.map((course) => ({
      url: absoluteUrl(getCourseHref(locale, course.id)),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
      alternates: {
        languages: getLanguageAlternates((candidateLocale) =>
          getCourseHref(candidateLocale, course.id)
        ),
      },
    }))
  );

  const unitPages = allTextbookUnits
    .filter((unit) =>
      visibleUnitKeys.has(`${unit.course}/${unit.chapterId}/${unit.unitSlug}`)
    )
    .map((unit) => ({
      url: absoluteUrl(unit.url),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: {
        languages: getLanguageAlternates(
          (candidateLocale) =>
            getUnitHrefFromParts(
              candidateLocale,
              unit.course,
              unit.chapterId,
              unit.unitSlug
            ),
          Array.from(
            unitLocales.get(`${unit.course}/${unit.chapterId}/${unit.unitSlug}`) ??
              locales
          )
        ),
      },
    }));

  return [...staticPages, ...coursePages, ...unitPages];
}
