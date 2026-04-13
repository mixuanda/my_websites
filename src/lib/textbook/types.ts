export type Locale = "en" | "zh-hk" | "zh-cn";

export type CourseId = string;

export type CoverageStatus = "SOURCE_BACKED" | "MISSING_SOURCE";
export type AccessTier = "FREE" | "MEMBER";

export interface SourceRef {
  file: string;
  note?: string;
  pages?: string;
}

export interface LocalizedText {
  en: string;
  "zh-cn": string;
  "zh-hk": string;
}

export interface TextbookUnitMeta {
  accessTier?: AccessTier;
  chapterId: string;
  chapterNumber: string;
  course: CourseId;
  coverageStatus: CoverageStatus;
  description: LocalizedText;
  glossaryRefs: string[];
  interactiveIds: string[];
  order: number;
  prerequisites: string[];
  slug: string;
  sourceRefs: SourceRef[];
  title: LocalizedText;
  unitId: string;
  unitNumber: string;
}

export interface TextbookChapterMeta {
  course: CourseId;
  id: string;
  number: string;
  summary: LocalizedText;
  title: LocalizedText;
  units: TextbookUnitMeta[];
}

export interface TextbookCourseMeta {
  description: LocalizedText;
  id: CourseId;
  shortTitle: LocalizedText;
  title: LocalizedText;
  chapters: TextbookChapterMeta[];
}

export interface GlossaryEntry {
  cantoneseNote?: string;
  definition: LocalizedText;
  englishPronunciationNote?: string;
  id: string;
  notationNote?: string;
  putonghuaNote?: string;
  sourceRefs: SourceRef[];
  termEn: string;
  termZhCn: string;
  termZhHk: string;
}

export interface LocalizedGlossaryEntry extends GlossaryEntry {
  displayDefinition: string;
  displayTerm: string;
}

export interface InteractiveExportSampleState {
  label: string;
  value: string;
}

export interface InteractiveExportSampleIO {
  input: string;
  output: string;
}

export interface InteractiveExportSnapshot {
  sampleIO?: InteractiveExportSampleIO[];
  sampleStates?: InteractiveExportSampleState[];
  staticDiagramNote?: string;
  steps?: string[];
  summary: string;
  title: string;
}

export type ExportBlock =
  | {
      level: number;
      text: string;
      type: "heading";
    }
  | {
      text: string;
      type: "paragraph";
    }
  | {
      display?: boolean;
      type: "math";
      value: string;
    }
  | {
      content: ExportBlock[];
      title: string;
      type: "definition" | "theorem" | "example" | "exercise" | "solution";
    }
  | {
      items: string[];
      title: string;
      type: "checklist";
    }
  | {
      rows: string[][];
      type: "table";
    }
  | {
      snapshot: InteractiveExportSnapshot;
      type: "interactiveSnapshot";
    }
  | {
      type: "separator";
    };

export interface ExportableTextbookUnit {
  blocks: ExportBlock[];
  coverageStatus: CoverageStatus;
  course: CourseId;
  description: string;
  glossaryRefs: LocalizedGlossaryEntry[];
  locale: Locale;
  prerequisites: TextbookUnitMeta[];
  sourceRefs: SourceRef[];
  title: string;
  unitId: string;
  unitNumber: string;
}

export type ProblemType = "MCQ" | "FILL_IN_BLANK";
export type ProblemInputMode =
  | "text"
  | "math-expression"
  | "vector"
  | "matrix"
  | "interval"
  | "set";
export type ProblemRevealPolicy =
  | "never"
  | "after-submit"
  | "after-correct"
  | "after-max-attempts";

export interface ProblemChoice {
  id: string;
  text: LocalizedText;
}

export interface ToleranceRule {
  absolute?: number;
  relative?: number;
}

export type EquivalenceRule =
  | { type: "exact" }
  | { type: "trimmed" }
  | { type: "case-insensitive" }
  | { type: "symbolic" };

export interface ProblemBase {
  accessTier?: AccessTier;
  inputMode?: ProblemInputMode;
  maxAttempts?: number | null;
  points?: number;
  previewExamples?: LocalizedText[];
  showCorrectAnswerPolicy?: ProblemRevealPolicy;
  showSolutionPolicy?: ProblemRevealPolicy;
  solutionAccessTier?: AccessTier;
  syntaxGuidance?: LocalizedText;
  id: string;
  courseId: CourseId;
  chapterId: string;
  unitId: string;
  prompt: LocalizedText;
  hints: LocalizedText[];
  solutionSteps: LocalizedText[];
  skillTags: string[];
}

export interface McqProblem extends ProblemBase {
  type: "MCQ";
  choices: ProblemChoice[];
  correctAnswer: {
    choiceId: string;
  };
}

export interface FillInBlankAnswer {
  value: string;
  equivalentValues?: string[];
  tolerance?: ToleranceRule;
  equivalence?: EquivalenceRule[];
}

export interface FillInBlankProblem extends ProblemBase {
  type: "FILL_IN_BLANK";
  choices?: never;
  correctAnswer: FillInBlankAnswer;
}

export type ProblemSchema = McqProblem | FillInBlankProblem;

export interface ProblemSubmission {
  answer?: string;
  choiceId?: string;
}

export interface ProblemPreviewResult {
  normalizedAnswer: string;
  parsedSuccessfully: boolean;
  previewText?: string;
  syntaxGuidance?: string;
}

export interface ProblemSubmissionResult {
  correctAnswerPreview?: string;
  correct: boolean;
  hint?: string;
  normalizedAnswer: string;
  previewText?: string;
  shouldShowSolution: boolean;
  solutionLocked?: boolean;
  showCorrectAnswer?: boolean;
}

export interface ProblemAttemptRecord {
  attemptId: string;
  attemptedAt: string;
  attemptNumber: number;
  correct: boolean;
  courseId: CourseId;
  chapterId: string;
  normalizedAnswer: string;
  score: number;
  problemId: string;
  unitId: string;
  userId?: string;
}

export interface ProblemProgress {
  attemptsRemaining: number | null;
  attemptsUsed: number;
  bestScore: number;
  lastSubmittedAt?: string;
  maxAttempts: number | null;
  problemId: string;
  solved: boolean;
  status: "not-started" | "in-progress" | "solved" | "locked-out";
  userId?: string;
}

export interface SectionMastery {
  correctAttempts: number;
  mastery: number;
  sectionId: string;
  totalAttempts: number;
  userId?: string;
}

export interface CheckpointSummary {
  attemptsUsed: number;
  averageBestScore: number;
  masteredCount: number;
  problemCount: number;
  sectionId: string;
  submittedCount: number;
  weakTags: string[];
}
