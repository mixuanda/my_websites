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
    en: "The Notes section continues to expand course by course.",
    "zh-cn": "笔记栏目仍在按课程持续扩写。",
    "zh-hk": "筆記欄目仍在按課程持續擴寫。",
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
  mainMenu: {
    en: "Main menu",
    "zh-cn": "主菜单",
    "zh-hk": "主選單",
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
    en: "Mathematics notes, projects, and technical writing",
    "zh-cn": "数学笔记、项目与技术写作",
    "zh-hk": "數學筆記、項目與技術寫作",
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
