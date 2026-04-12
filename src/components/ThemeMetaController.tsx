"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";
import { siteThemeColors } from "@/lib/site-theme";

export function ThemeMetaController() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    const themeMeta = document.querySelector('meta[name="theme-color"]:not([media])');
    const theme = resolvedTheme === "dark" ? "dark" : "light";

    themeMeta?.setAttribute("content", siteThemeColors[theme]);
    document.documentElement.style.colorScheme = theme;
  }, [resolvedTheme]);

  return null;
}
