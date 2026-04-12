"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

const themeColors = {
  dark: "#11101a",
  light: "#f7f3ef",
} as const;

export function ThemeMetaController() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    const themeMeta = document.querySelector('meta[name="theme-color"]:not([media])');
    const theme = resolvedTheme === "dark" ? "dark" : "light";

    themeMeta?.setAttribute("content", themeColors[theme]);
    document.documentElement.style.colorScheme = theme;
  }, [resolvedTheme]);

  return null;
}
