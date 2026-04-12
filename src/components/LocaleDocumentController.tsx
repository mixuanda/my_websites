"use client";

import { useEffect } from "react";
import { toHtmlLang } from "@/lib/textbook/i18n";
import type { Locale } from "@/lib/textbook/types";

export function LocaleDocumentController({ locale }: { locale: Locale }) {
  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    document.documentElement.lang = toHtmlLang(locale);
  }, [locale]);

  return null;
}
