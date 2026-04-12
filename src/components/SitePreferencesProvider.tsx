"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import { getRouteLocale } from "@/lib/site-i18n";
import { defaultLocale, isLocale, toHtmlLang } from "@/lib/textbook/i18n";
import {
  TEXTBOOK_PREFERRED_LOCALE_COOKIE_NAME,
  TEXTBOOK_PREFERRED_LOCALE_STORAGE_KEY,
} from "@/lib/textbook/storage";
import type { Locale } from "@/lib/textbook/types";

const HIGH_CONTRAST_STORAGE_KEY = "site-high-contrast";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

interface SitePreferencesContextValue {
  highContrast: boolean;
  locale: Locale;
  setHighContrast: (value: boolean) => void;
  setLocale: (value: Locale) => void;
}

const SitePreferencesContext = createContext<SitePreferencesContextValue>({
  highContrast: false,
  locale: defaultLocale,
  setHighContrast: () => {},
  setLocale: () => {},
});

function readStoredLocale() {
  if (typeof window === "undefined") {
    return null;
  }

  const stored = window.localStorage.getItem(
    TEXTBOOK_PREFERRED_LOCALE_STORAGE_KEY
  );

  return stored && isLocale(stored) ? stored : null;
}

function readStoredHighContrast() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.localStorage.getItem(HIGH_CONTRAST_STORAGE_KEY) === "true";
}

export function SitePreferencesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [locale, setLocale] = useState<Locale>(() => {
    if (typeof window === "undefined") {
      return defaultLocale;
    }

    return (
      getRouteLocale(window.location.pathname) ??
      readStoredLocale() ??
      defaultLocale
    );
  });
  const [highContrast, setHighContrast] = useState(readStoredHighContrast);

  useEffect(() => {
    const routeLocale = getRouteLocale(pathname);

    if (routeLocale && routeLocale !== locale) {
      setLocale(routeLocale);
    }
  }, [locale, pathname]);

  useEffect(() => {
    if (typeof document === "undefined" || typeof window === "undefined") {
      return;
    }

    document.documentElement.dataset.contrast = highContrast ? "high" : "normal";
    window.localStorage.setItem(HIGH_CONTRAST_STORAGE_KEY, String(highContrast));
  }, [highContrast]);

  useEffect(() => {
    if (typeof document === "undefined" || typeof window === "undefined") {
      return;
    }

    const effectiveLocale = getRouteLocale(pathname) ?? locale;

    document.documentElement.lang = toHtmlLang(effectiveLocale);
    window.localStorage.setItem(
      TEXTBOOK_PREFERRED_LOCALE_STORAGE_KEY,
      effectiveLocale
    );
    document.cookie = `${TEXTBOOK_PREFERRED_LOCALE_COOKIE_NAME}=${effectiveLocale}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
  }, [locale, pathname]);

  const value = useMemo(
    () => ({
      highContrast,
      locale,
      setHighContrast,
      setLocale,
    }),
    [highContrast, locale]
  );

  return (
    <SitePreferencesContext.Provider value={value}>
      {children}
    </SitePreferencesContext.Provider>
  );
}

export function useSitePreferences() {
  return useContext(SitePreferencesContext);
}
