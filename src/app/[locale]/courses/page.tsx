import { redirect } from "next/navigation";
import { defaultLocale, isLocale } from "@/lib/textbook/i18n";

interface LegacyCoursesIndexPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function LegacyCoursesIndexPage({
  params,
}: LegacyCoursesIndexPageProps) {
  const { locale } = await params;
  redirect(`/${isLocale(locale) ? locale : defaultLocale}/notes`);
}
