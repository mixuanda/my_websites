"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  defaultLocale,
  getLocalizedText,
  isLocale,
  localeLabels,
  localeNames,
  locales,
  uiText,
} from "@/lib/textbook/i18n";
import { TEXTBOOK_PREFERRED_LOCALE_STORAGE_KEY } from "@/lib/textbook/storage";
import type { Locale } from "@/lib/textbook/types";

function getLocaleHref(pathname: string, nextLocale: Locale) {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length > 0 && isLocale(segments[0])) {
    segments[0] = nextLocale;
    return `/${segments.join("/")}`;
  }

  if (pathname === "/") {
    return `/${nextLocale}/notes`;
  }

  return null;
}

export function SiteLanguageSwitcher({
  className,
  locale,
  onLocaleChange,
}: {
  className?: string;
  locale: Locale;
  onLocaleChange?: (locale: Locale) => void;
}) {
  const pathname = usePathname() ?? `/${defaultLocale}/notes`;
  const router = useRouter();

  return (
    <div className={cn("space-y-2", className)}>
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
        {getLocalizedText(uiText.language, locale)}
      </p>
      <div className="flex flex-wrap gap-2">
        {locales.map((targetLocale) => (
          <Button
            key={targetLocale}
            className="min-w-14"
            onClick={() => {
              if (typeof window !== "undefined") {
                window.localStorage.setItem(
                  TEXTBOOK_PREFERRED_LOCALE_STORAGE_KEY,
                  targetLocale
                );
              }

              onLocaleChange?.(targetLocale);

              const href = getLocaleHref(pathname, targetLocale);

              if (href && href !== pathname) {
                router.push(href);
                return;
              }

              router.refresh();
            }}
            size="sm"
            type="button"
            variant={targetLocale === locale ? "default" : "outline"}
          >
            {localeLabels[targetLocale]}
            <span className="sr-only">
              {getLocalizedText(localeNames[targetLocale], locale)}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
}
