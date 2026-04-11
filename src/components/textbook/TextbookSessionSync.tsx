"use client";

import { useEffect } from "react";
import {
  TEXTBOOK_LAST_UNIT_STORAGE_KEY,
  TEXTBOOK_PREFERRED_LOCALE_STORAGE_KEY,
} from "@/lib/textbook/storage";
import type { Locale } from "@/lib/textbook/types";

export function TextbookSessionSync({
  href,
  locale,
  unitId,
}: {
  href: string;
  locale: Locale;
  unitId: string;
}) {
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(TEXTBOOK_PREFERRED_LOCALE_STORAGE_KEY, locale);
    window.localStorage.setItem(
      TEXTBOOK_LAST_UNIT_STORAGE_KEY,
      JSON.stringify({
        href,
        locale,
        unitId,
      })
    );
  }, [href, locale, unitId]);

  return null;
}
