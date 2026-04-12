import { redirect } from "next/navigation";
import { defaultLocale, isLocale } from "@/lib/textbook/i18n";

interface LegacyUnitPageProps {
  params: Promise<{
    chapter: string;
    course: string;
    locale: string;
    unit: string;
  }>;
}

export default async function LegacyUnitPage({
  params,
}: LegacyUnitPageProps) {
  const { chapter, course, locale, unit } = await params;
  redirect(`/${isLocale(locale) ? locale : defaultLocale}/notes/${course}/${chapter}/${unit}`);
}
