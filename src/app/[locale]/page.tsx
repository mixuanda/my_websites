import { redirect } from "next/navigation";
import { defaultLocale, isLocale } from "@/lib/textbook/i18n";

interface LocaleIndexPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function LocaleIndexPage({
  params,
}: LocaleIndexPageProps) {
  const { locale } = await params;
  redirect(`/${isLocale(locale) ? locale : defaultLocale}/notes`);
}
