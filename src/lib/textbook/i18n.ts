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
    en: "All note collections",
    "zh-cn": "全部笔记系列",
    "zh-hk": "全部筆記系列",
  },
  attemptsExhausted: {
    en: "No graded attempts remain for this problem.",
    "zh-cn": "这题已经没有可评分的剩余尝试次数。",
    "zh-hk": "這題已經沒有可評分的剩餘嘗試次數。",
  },
  attemptsRemaining: {
    en: "Attempts remaining",
    "zh-cn": "剩余尝试次数",
    "zh-hk": "剩餘嘗試次數",
  },
  attemptsUnlimited: {
    en: "Unlimited attempts",
    "zh-cn": "不限尝试次数",
    "zh-hk": "不限嘗試次數",
  },
  attemptsUsed: {
    en: "Attempts used",
    "zh-cn": "已用尝试次数",
    "zh-hk": "已用嘗試次數",
  },
  adminHasFullAccess: {
    en: "Admin accounts already have full access and do not need a billing flow.",
    "zh-cn": "管理员账号已经拥有完整权限，不需要进入账单流程。",
    "zh-hk": "管理員帳號已經擁有完整權限，不需要進入帳單流程。",
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
  checkpointCompleted: {
    en: "Section checkpoint completed. You can now review each item and reopen the guided solutions you unlocked.",
    "zh-cn": "本节 checkpoint 已完成。你现在可以回看每一题，并重新打开你已解锁的引导解答。",
    "zh-hk": "本節 checkpoint 已完成。你現在可以重看每一題，並重新打開你已解鎖的引導解答。",
  },
  checkpointProgressLabel: {
    en: "Correct progress",
    "zh-cn": "答对进度",
    "zh-hk": "答對進度",
  },
  checkpointRequiresCorrectAnswers: {
    en: "Answer each question correctly to complete this section checkpoint.",
    "zh-cn": "要完成这一节 checkpoint，需要把每一题答对。",
    "zh-hk": "要完成這一節 checkpoint，需要把每一題答對。",
  },
  checkpointTitle: {
    en: "Section mastery checkpoint",
    "zh-cn": "本节掌握 checkpoint",
    "zh-hk": "本節掌握 checkpoint",
  },
  checkpointSummary: {
    en: "Checkpoint summary",
    "zh-cn": "Checkpoint 摘要",
    "zh-hk": "Checkpoint 摘要",
  },
  checkpointScore: {
    en: "Best-score coverage",
    "zh-cn": "最佳得分覆盖率",
    "zh-hk": "最佳得分覆蓋率",
  },
  correct: {
    en: "Correct.",
    "zh-cn": "答对了。",
    "zh-hk": "答對了。",
  },
  correctAttemptsLabel: {
    en: "correct attempts",
    "zh-cn": "次答对",
    "zh-hk": "次答對",
  },
  correctAnswer: {
    en: "Correct answer",
    "zh-cn": "正确答案",
    "zh-hk": "正確答案",
  },
  enterYourAnswer: {
    en: "Enter your answer",
    "zh-cn": "输入你的答案",
    "zh-hk": "輸入你的答案",
  },
  courseOverview: {
    en: "Series overview",
    "zh-cn": "系列总览",
    "zh-hk": "系列總覽",
  },
  courseContents: {
    en: "Course contents",
    "zh-cn": "课程目录",
    "zh-hk": "課程目錄",
  },
  currentSection: {
    en: "Current section",
    "zh-cn": "当前小节",
    "zh-hk": "目前小節",
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
  interactiveMoment: {
    en: "Read and try",
    "zh-cn": "边读边试",
    "zh-hk": "邊讀邊試",
  },
  interactiveSnapshot: {
    en: "Static study snapshot",
    "zh-cn": "静态学习快照",
    "zh-hk": "靜態學習快照",
  },
  interactiveUnits: {
    en: "Embedded interaction",
    "zh-cn": "嵌入式互动",
    "zh-hk": "嵌入式互動",
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
  hideFullSolution: {
    en: "Hide full solution",
    "zh-cn": "隐藏完整解答",
    "zh-hk": "隱藏完整解答",
  },
  hint: {
    en: "Hint",
    "zh-cn": "提示",
    "zh-hk": "提示",
  },
  language: {
    en: "Language",
    "zh-cn": "语言",
    "zh-hk": "語言",
  },
  loading: {
    en: "Loading…",
    "zh-cn": "加载中…",
    "zh-hk": "載入中…",
  },
  lockedOut: {
    en: "Locked out",
    "zh-cn": "已锁定",
    "zh-hk": "已鎖定",
  },
  markComplete: {
    en: "Mark complete",
    "zh-cn": "标记完成",
    "zh-hk": "標記完成",
  },
  membershipAlreadyActive: {
    en: "Membership is already active on this account.",
    "zh-cn": "这个账号的会员已经处于启用状态。",
    "zh-hk": "這個帳號的會員已經處於啟用狀態。",
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
  noteCollections: {
    en: "Note collections",
    "zh-cn": "笔记系列",
    "zh-hk": "筆記系列",
  },
  noBillingProfile: {
    en: "No Stripe billing profile is linked to this account yet.",
    "zh-cn": "这个账号目前还没有关联 Stripe 账单档案。",
    "zh-hk": "這個帳號目前還沒有關聯 Stripe 帳單檔案。",
  },
  billingUnavailable: {
    en: "Membership payment is not available yet because the Stripe subscription plan or webhook is not fully configured.",
    "zh-cn": "会员付款暂不可用，因为 Stripe 订阅方案或 webhook 尚未完整配置。",
    "zh-hk": "會員付款暫不可用，因為 Stripe 訂閱方案或 webhook 尚未完整配置。",
  },
  notCorrectYet: {
    en: "Not correct yet.",
    "zh-cn": "还没答对。",
    "zh-hk": "還未答對。",
  },
  notStarted: {
    en: "Not started",
    "zh-cn": "未开始",
    "zh-hk": "未開始",
  },
  openCheckout: {
    en: "Opening…",
    "zh-cn": "正在打开…",
    "zh-hk": "正在打開…",
  },
  nextUnit: {
    en: "Next section",
    "zh-cn": "下一节",
    "zh-hk": "下一節",
  },
  noPrerequisites: {
    en: "This section can be read on its own.",
    "zh-cn": "这一节可以独立阅读。",
    "zh-hk": "這一節可以獨立閱讀。",
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
    en: "Previous section",
    "zh-cn": "上一节",
    "zh-hk": "上一節",
  },
  signInToSubscribe: {
    en: "Sign in to start or manage membership.",
    "zh-cn": "请先登录，再开始或管理会员订阅。",
    "zh-hk": "請先登入，再開始或管理會員訂閱。",
  },
  progress: {
    en: "Progress",
    "zh-cn": "进度",
    "zh-hk": "進度",
  },
  previewAnswer: {
    en: "Preview answer",
    "zh-cn": "预览答案",
    "zh-hk": "預覽答案",
  },
  previewDoesNotCount: {
    en: "Preview does not consume an attempt.",
    "zh-cn": "预览不会消耗尝试次数。",
    "zh-hk": "預覽不會消耗嘗試次數。",
  },
  previewNormalizedAs: {
    en: "Your answer will be graded as",
    "zh-cn": "系统会按以下形式评分",
    "zh-hk": "系統會按以下形式評分",
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
  sectionMastery: {
    en: "Section mastery",
    "zh-cn": "本节掌握度",
    "zh-hk": "本節掌握度",
  },
  solved: {
    en: "Solved",
    "zh-cn": "已解决",
    "zh-hk": "已解決",
  },
  skillsLabel: {
    en: "Skills",
    "zh-cn": "技能点",
    "zh-hk": "技能點",
  },
  sourceBacked: {
    en: "Source-backed",
    "zh-cn": "有来源支持",
    "zh-hk": "有來源支持",
  },
  sourceTrail: {
    en: "Source notes",
    "zh-cn": "来源备注",
    "zh-hk": "來源備註",
  },
  studyExport: {
    en: "Export this note",
    "zh-cn": "导出当前笔记",
    "zh-hk": "匯出目前筆記",
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
  submitAnswer: {
    en: "Submit answer",
    "zh-cn": "提交答案",
    "zh-hk": "提交答案",
  },
  submitConsumesAttempt: {
    en: "Submit records a graded attempt.",
    "zh-cn": "提交会记录一次正式评分尝试。",
    "zh-hk": "提交會記錄一次正式評分嘗試。",
  },
  solutionLocked: {
    en: "The full guided solution for this item is available to members.",
    "zh-cn": "这一题的完整引导解答向会员开放。",
    "zh-hk": "這一題的完整引導解答向會員開放。",
  },
  syntaxGuidance: {
    en: "Syntax guidance",
    "zh-cn": "输入格式提示",
    "zh-hk": "輸入格式提示",
  },
  weakTopics: {
    en: "Weak topics to revisit",
    "zh-cn": "建议回看薄弱主题",
    "zh-hk": "建議回看薄弱主題",
  },
  inProgress: {
    en: "In progress",
    "zh-cn": "进行中",
    "zh-hk": "進行中",
  },
  solutionStepsTitle: {
    en: "Full solution steps",
    "zh-cn": "完整解答步骤",
    "zh-hk": "完整解答步驟",
  },
  showFullSolution: {
    en: "Show full step-by-step solution",
    "zh-cn": "显示完整逐步解答",
    "zh-hk": "顯示完整逐步解答",
  },
  textbook: {
    en: "Notes",
    "zh-cn": "笔记",
    "zh-hk": "筆記",
  },
  unitList: {
    en: "Notes in this chapter",
    "zh-cn": "本章节笔记",
    "zh-hk": "本章節筆記",
  },
  visitUnit: {
    en: "Read note",
    "zh-cn": "阅读笔记",
    "zh-hk": "閱讀筆記",
  },
  unit: {
    en: "Sections",
    "zh-cn": "各节",
    "zh-hk": "各節",
  },
  sectionNavigation: {
    en: "More notes in this series",
    "zh-cn": "本系列更多笔记",
    "zh-hk": "本系列更多筆記",
  },
  sectionCountUnit: {
    en: "sections",
    "zh-cn": "节",
    "zh-hk": "節",
  },
  premium: {
    en: "Member",
    "zh-cn": "会员",
    "zh-hk": "會員",
  },
  premiumLocked: {
    en: "This advanced section is available to members.",
    "zh-cn": "这一进阶小节仅向会员开放。",
    "zh-hk": "這一進階小節僅向會員開放。",
  },
  upgradeMembership: {
    en: "Upgrade membership",
    "zh-cn": "升级会员",
    "zh-hk": "升級會員",
  },
  subscribeMonthly: {
    en: "Subscribe monthly",
    "zh-cn": "订阅月费会员",
    "zh-hk": "訂閱月費會員",
  },
  subscribeYearly: {
    en: "Subscribe yearly",
    "zh-cn": "订阅年费会员",
    "zh-hk": "訂閱年費會員",
  },
  manageBilling: {
    en: "Manage billing",
    "zh-cn": "管理账单",
    "zh-hk": "管理帳單",
  },
  billingActionFailed: {
    en: "We could not open the billing flow right now. Try again in a moment.",
    "zh-cn": "目前无法打开账单流程，请稍后再试。",
    "zh-hk": "目前無法打開帳單流程，請稍後再試。",
  },
  billingPlanNotConfigured: {
    en: "This membership billing plan is not configured yet.",
    "zh-cn": "这个会员账单方案尚未配置。",
    "zh-hk": "這個會員帳單方案尚未配置。",
  },
  gradingRetry: {
    en: "We could not grade your answer right now. Try again.",
    "zh-cn": "目前无法批改你的答案，请再试一次。",
    "zh-hk": "目前無法批改你的答案，請再試一次。",
  },
  previewRetry: {
    en: "We could not preview your answer right now. Try again.",
    "zh-cn": "目前无法预览你的答案，请再试一次。",
    "zh-hk": "目前無法預覽你的答案，請再試一次。",
  },
  estimatedReadingTime: {
    en: "Estimated reading time",
    "zh-cn": "预计阅读时间",
    "zh-hk": "預計閱讀時間",
  },
  minutes: {
    en: "min",
    "zh-cn": "分钟",
    "zh-hk": "分鐘",
  },
} as const satisfies Record<string, LocalizedText>;
