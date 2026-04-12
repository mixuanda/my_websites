"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
import {
  TEXTBOOK_PREFERRED_LOCALE_STORAGE_KEY,
} from "@/lib/textbook/storage";
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
  locale: Locale;
}) {
  const pathname = usePathname() ?? `/${defaultLocale}/notes`;

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(TEXTBOOK_PREFERRED_LOCALE_STORAGE_KEY, locale);
    }
  }, [locale]);

  return (
    <div className={cn("space-y-2", className)}>
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
        {getLocalizedText(uiText.language, locale)}
      </p>
      <div className="flex flex-wrap gap-2">
        {locales.map((targetLocale) => (
          <Button
            key={targetLocale}
            asChild
            className="min-w-14"
            size="sm"
            variant={targetLocale === locale ? "default" : "outline"}
          >
            <Link
              href={getLocaleHref(pathname, targetLocale)}
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.localStorage.setItem(
                    TEXTBOOK_PREFERRED_LOCALE_STORAGE_KEY,
                    targetLocale
                  );
                }
              }}
            >
              {localeLabels[targetLocale]}
              <span className="sr-only">
                {getLocalizedText(localeNames[targetLocale], locale)}
              </span>
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
}
