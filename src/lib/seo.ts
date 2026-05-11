import type { Metadata } from "next";
import { defaultLocale, locales } from "@/lib/textbook/i18n";
import type { Locale } from "@/lib/textbook/types";

export const SITE_NAME = "Evanalysis";
export const SITE_DESCRIPTION =
  "Rigorous course notes in mathematics and related technical subjects.";

function normalizeSiteUrl(value?: string | null) {
  const fallback = "https://www.evanalysis.top";
  const raw = value?.trim() || fallback;
  return raw.replace(/\/+$/, "");
}

function normalizePath(path: string) {
  if (!path || path === "/") {
    return "";
  }

  return path.startsWith("/") ? path : `/${path}`;
}

export const SITE_URL = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);

export const googleSiteVerification =
  process.env.GOOGLE_SITE_VERIFICATION?.trim() ||
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim() ||
  undefined;

export const metadataBase = new URL(SITE_URL);

export const hreflangByLocale: Record<Locale, string> = {
  en: "en",
  "zh-cn": "zh-CN",
  "zh-hk": "zh-HK",
};

export const openGraphLocaleByLocale: Record<Locale, string> = {
  en: "en_US",
  "zh-cn": "zh_CN",
  "zh-hk": "zh_HK",
};

export function absoluteUrl(path: string) {
  return `${SITE_URL}${normalizePath(path)}`;
}

export function getLanguageAlternates(
  buildPath: (locale: Locale) => string,
  availableLocales: readonly Locale[] = locales
) {
  const languages: Record<string, string> = {};

  availableLocales.forEach((locale) => {
    languages[hreflangByLocale[locale]] = absoluteUrl(buildPath(locale));
  });

  languages["x-default"] = absoluteUrl(buildPath(defaultLocale));
  return languages;
}

export function getLocalizedAlternates(
  locale: Locale,
  buildPath: (locale: Locale) => string,
  availableLocales: readonly Locale[] = locales
): Metadata["alternates"] {
  return {
    canonical: absoluteUrl(buildPath(locale)),
    languages: getLanguageAlternates(buildPath, availableLocales),
  };
}

export function getOpenGraphLocale(locale: Locale) {
  return openGraphLocaleByLocale[locale];
}

export function getAlternateOpenGraphLocales(locale: Locale) {
  return locales
    .filter((candidate) => candidate !== locale)
    .map((candidate) => openGraphLocaleByLocale[candidate]);
}
