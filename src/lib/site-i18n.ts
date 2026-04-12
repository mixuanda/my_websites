import { defaultLocale, getLocalizedText, isLocale } from "@/lib/textbook/i18n";
import { TEXTBOOK_PREFERRED_LOCALE_STORAGE_KEY } from "@/lib/textbook/storage";
import type { Locale, LocalizedText } from "@/lib/textbook/types";

export const siteUiText = {
  about: {
    en: "About",
    "zh-cn": "关于",
    "zh-hk": "關於",
  },
  blog: {
    en: "Blog",
    "zh-cn": "博客",
    "zh-hk": "博客",
  },
  appearance: {
    en: "Appearance",
    "zh-cn": "外观",
    "zh-hk": "外觀",
  },
  contents: {
    en: "Contents",
    "zh-cn": "目录",
    "zh-hk": "目錄",
  },
  darkMode: {
    en: "Dark",
    "zh-cn": "暗色",
    "zh-hk": "暗色",
  },
  footerNote: {
    en: "Interactive mathematics notes are still expanding.",
    "zh-cn": "互动数学笔记仍在持续扩写。",
    "zh-hk": "互動數學筆記仍在持續擴寫。",
  },
  highContrast: {
    en: "High contrast",
    "zh-cn": "高对比度",
    "zh-hk": "高對比度",
  },
  home: {
    en: "Home",
    "zh-cn": "首页",
    "zh-hk": "首頁",
  },
  lightMode: {
    en: "Light",
    "zh-cn": "亮色",
    "zh-hk": "亮色",
  },
  notes: {
    en: "Notes",
    "zh-cn": "笔记",
    "zh-hk": "筆記",
  },
  projects: {
    en: "Projects",
    "zh-cn": "项目",
    "zh-hk": "項目",
  },
  shellSubtitle: {
    en: "Developer / interactive math notes in progress",
    "zh-cn": "开发者 / 互动数学笔记建设中",
    "zh-hk": "開發者 / 互動數學筆記建設中",
  },
  systemTheme: {
    en: "System",
    "zh-cn": "跟随系统",
    "zh-hk": "跟隨系統",
  },
  themeMode: {
    en: "Theme mode",
    "zh-cn": "主题模式",
    "zh-hk": "主題模式",
  },
  textbooks: {
    en: "Notes",
    "zh-cn": "笔记",
    "zh-hk": "筆記",
  },
} as const satisfies Record<string, LocalizedText>;

export function getRouteLocale(pathname?: string | null): Locale | null {
  const [segment] = pathname?.split("/").filter(Boolean) ?? [];

  return segment && isLocale(segment) ? segment : null;
}

export function getStoredLocale(): Locale | null {
  if (typeof window === "undefined") {
    return null;
  }

  const storedLocale = window.localStorage.getItem(
    TEXTBOOK_PREFERRED_LOCALE_STORAGE_KEY
  );

  return storedLocale && isLocale(storedLocale) ? storedLocale : null;
}

export function resolveSiteLocale(pathname?: string | null): Locale {
  return getRouteLocale(pathname) ?? getStoredLocale() ?? defaultLocale;
}

export function getSiteText(text: LocalizedText, locale: Locale) {
  return getLocalizedText(text, locale);
}
