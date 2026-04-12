import { redirect } from "next/navigation";
import { defaultLocale, isLocale } from "@/lib/textbook/i18n";

interface LegacyCoursePageProps {
  params: Promise<{
    course: string;
    locale: string;
  }>;
}

export default async function LegacyCoursePage({
  params,
}: LegacyCoursePageProps) {
  const { course, locale } = await params;
  redirect(`/${isLocale(locale) ? locale : defaultLocale}/notes/${course}`);
}
