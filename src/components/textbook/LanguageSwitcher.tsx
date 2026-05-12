"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSitePreferences } from "@/components/SitePreferencesProvider";
import { Button } from "@/components/ui/button";
import {
  defaultLocale,
  getLocalizedText,
  isLocale,
  localeLabels,
  localeNames,
  locales,
  uiText,
} from "@/lib/textbook/i18n";
import type { Locale } from "@/lib/textbook/types";
import { cn } from "@/lib/utils";

function getLocaleHref(pathname: string, nextLocale: Locale) {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length > 0 && isLocale(segments[0])) {
    segments[0] = nextLocale;
    return `/${segments.join("/")}`;
  }

  return `/${nextLocale}/notes`;
}

export function LanguageSwitcher({
  className,
  locale,
}: {
  className?: string;
  locale?: Locale;
}) {
  const pathname = usePathname() ?? `/${defaultLocale}/notes`;
  const { locale: siteLocale, setLocale } = useSitePreferences();
  const activeLocale = locale ?? siteLocale;

  return (
    <div className={cn("space-y-2", className)}>
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
        {getLocalizedText(uiText.language, activeLocale)}
      </p>
      <div className="flex flex-wrap gap-2">
        {locales.map((targetLocale) => (
          <Button
            key={targetLocale}
            asChild
            className="min-w-14"
            size="sm"
            variant={targetLocale === activeLocale ? "default" : "outline"}
          >
            <Link
              href={getLocaleHref(pathname, targetLocale)}
              onClick={() => setLocale(targetLocale)}
            >
              {localeLabels[targetLocale]}
              <span className="sr-only">
                {getLocalizedText(localeNames[targetLocale], activeLocale)}
              </span>
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
}
