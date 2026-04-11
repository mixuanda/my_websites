import type { CoverageStatus, Locale, LocalizedText } from "./types";

export const locales = ["en", "zh-hk", "zh-cn"] as const satisfies readonly Locale[];

export const defaultLocale: Locale = "zh-hk";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function toHtmlLang(locale: Locale) {
  if (locale === "zh-hk") {
    return "zh-HK";
  }

  if (locale === "zh-cn") {
    return "zh-CN";
  }

  return "en";
}

export function getLocalizedText(text: LocalizedText, locale: Locale) {
  return text[locale];
}

export function getCoverageLabel(status: CoverageStatus, locale: Locale) {
  return status === "SOURCE_BACKED"
    ? getLocalizedText(uiText.sourceBacked, locale)
    : getLocalizedText(uiText.missingSource, locale);
}

export const localeLabels: Record<Locale, string> = {
  en: "EN",
  "zh-cn": "简",
  "zh-hk": "繁",
};

export const localeNames: Record<Locale, LocalizedText> = {
  en: {
    en: "English",
    "zh-cn": "英语",
    "zh-hk": "英語",
  },
  "zh-cn": {
    en: "Simplified Chinese",
    "zh-cn": "简体中文",
    "zh-hk": "簡體中文",
  },
  "zh-hk": {
    en: "Traditional Chinese",
    "zh-cn": "繁体中文",
    "zh-hk": "繁體中文",
  },
};

export const uiText = {
  allCourses: {
    en: "All courses",
    "zh-cn": "全部课程",
    "zh-hk": "全部課程",
  },
  cantoneseNote: {
    en: "Cantonese note",
    "zh-cn": "粤语提示",
    "zh-hk": "廣東話提示",
  },
  chapter: {
    en: "Chapter",
    "zh-cn": "章节",
    "zh-hk": "章節",
  },
  courseOverview: {
    en: "Course overview",
    "zh-cn": "课程概览",
    "zh-hk": "課程概覽",
  },
  diagramNote: {
    en: "Diagram note",
    "zh-cn": "图示说明",
    "zh-hk": "圖示說明",
  },
  englishPronunciation: {
    en: "English pronunciation",
    "zh-cn": "英语读法",
    "zh-hk": "英語讀法",
  },
  glossary: {
    en: "Glossary and notation",
    "zh-cn": "词汇与记号",
    "zh-hk": "詞彙與記號",
  },
  interactiveStudio: {
    en: "Interactive studio",
    "zh-cn": "互动学习区",
    "zh-hk": "互動學習區",
  },
  interactiveSnapshot: {
    en: "Static study snapshot",
    "zh-cn": "静态学习快照",
    "zh-hk": "靜態學習快照",
  },
  interactiveUnits: {
    en: "Interactive checkpoints",
    "zh-cn": "互动检查点",
    "zh-hk": "互動檢查點",
  },
  output: {
    en: "Output",
    "zh-cn": "输出",
    "zh-hk": "輸出",
  },
  input: {
    en: "Input",
    "zh-cn": "输入",
    "zh-hk": "輸入",
  },
  language: {
    en: "Language",
    "zh-cn": "语言",
    "zh-hk": "語言",
  },
  markComplete: {
    en: "Mark complete",
    "zh-cn": "标记完成",
    "zh-hk": "標記完成",
  },
  markedComplete: {
    en: "Completed",
    "zh-cn": "已完成",
    "zh-hk": "已完成",
  },
  missingSource: {
    en: "Missing source support",
    "zh-cn": "缺少来源支持",
    "zh-hk": "缺少來源支持",
  },
  nextUnit: {
    en: "Next unit",
    "zh-cn": "下一单元",
    "zh-hk": "下一單元",
  },
  noPrerequisites: {
    en: "This unit can be read on its own.",
    "zh-cn": "这个单元可以独立阅读。",
    "zh-hk": "這個單元可以獨立閱讀。",
  },
  pageToc: {
    en: "On this page",
    "zh-cn": "本页目录",
    "zh-hk": "本頁目錄",
  },
  notationNote: {
    en: "Notation note",
    "zh-cn": "记号说明",
    "zh-hk": "記號說明",
  },
  prerequisites: {
    en: "Prerequisites",
    "zh-cn": "先备知识",
    "zh-hk": "先備知識",
  },
  previousUnit: {
    en: "Previous unit",
    "zh-cn": "上一单元",
    "zh-hk": "上一單元",
  },
  progress: {
    en: "Progress",
    "zh-cn": "进度",
    "zh-hk": "進度",
  },
  relatedTerms: {
    en: "Key terms in this unit",
    "zh-cn": "本单元重点词汇",
    "zh-hk": "本單元重點詞彙",
  },
  putonghuaNote: {
    en: "Putonghua note",
    "zh-cn": "普通话提示",
    "zh-hk": "普通話提示",
  },
  sourceBacked: {
    en: "Source-backed",
    "zh-cn": "有来源支持",
    "zh-hk": "有來源支持",
  },
  sourceTrail: {
    en: "Source trail",
    "zh-cn": "来源追踪",
    "zh-hk": "來源追蹤",
  },
  studyExport: {
    en: "Export study copy",
    "zh-cn": "导出学习版",
    "zh-hk": "匯出學習版",
  },
  studyExportPdf: {
    en: "PDF (.pdf)",
    "zh-cn": "PDF (.pdf)",
    "zh-hk": "PDF (.pdf)",
  },
  studyExportTxt: {
    en: "Text (.txt)",
    "zh-cn": "文本 (.txt)",
    "zh-hk": "文字 (.txt)",
  },
  textbook: {
    en: "Interactive textbooks",
    "zh-cn": "互动教材",
    "zh-hk": "互動教材",
  },
  unitList: {
    en: "Units in this chapter",
    "zh-cn": "本章节单元",
    "zh-hk": "本章節單元",
  },
  visitUnit: {
    en: "Open unit",
    "zh-cn": "打开单元",
    "zh-hk": "打開單元",
  },
  unit: {
    en: "Unit",
    "zh-cn": "单元",
    "zh-hk": "單元",
  },
} as const satisfies Record<string, LocalizedText>;
