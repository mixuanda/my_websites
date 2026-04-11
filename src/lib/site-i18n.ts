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
  contents: {
    en: "Contents",
    "zh-cn": "目录",
    "zh-hk": "目錄",
  },
  footerNote: {
    en: "Interactive math textbook in progress.",
    "zh-cn": "互动数学教材持续建设中。",
    "zh-hk": "互動數學教材持續建設中。",
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
    en: "Developer / math educator",
    "zh-cn": "开发者 / 数学教育内容建设中",
    "zh-hk": "開發者 / 數學教育內容建設中",
  },
  switchToDarkMode: {
    en: "Switch to dark mode",
    "zh-cn": "切换到暗色模式",
    "zh-hk": "切換到暗色模式",
  },
  switchToLightMode: {
    en: "Switch to light mode",
    "zh-cn": "切换到亮色模式",
    "zh-hk": "切換到亮色模式",
  },
  textbooks: {
    en: "Textbooks",
    "zh-cn": "教材",
    "zh-hk": "教材",
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
