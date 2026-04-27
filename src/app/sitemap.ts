import { allTextbookUnits } from "contentlayer/generated";
import { MetadataRoute } from "next";
import { getVisibleCourseList } from "@/lib/textbook/catalog";
import { locales } from "@/lib/textbook/i18n";
import { getSiteSurface } from "@/lib/site-surface";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.evanalysis.top";
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

  const staticPages = [
    { url: baseUrl, lastModified: now },
    ...locales.map((locale) => ({
      url: `${baseUrl}/${locale}/notes`,
      lastModified: now,
    })),
  ];

  const coursePages = locales.flatMap((locale) =>
    courses.map((course) => ({
      url: `${baseUrl}/${locale}/notes/${course.id}`,
      lastModified: now,
    }))
  );

  const unitPages = allTextbookUnits
    .filter((unit) =>
      visibleUnitKeys.has(`${unit.course}/${unit.chapterId}/${unit.unitSlug}`)
    )
    .map((unit) => ({
      url: `${baseUrl}${unit.url}`,
      lastModified: now,
    }));

  return [...staticPages, ...coursePages, ...unitPages];
}
