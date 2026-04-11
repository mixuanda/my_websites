import { notFound } from "next/navigation";
import { isLocale, locales, toHtmlLang } from "@/lib/textbook/i18n";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return <div lang={toHtmlLang(locale)}>{children}</div>;
}
