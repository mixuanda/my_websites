export type Locale = "en" | "zh-hk" | "zh-cn";

export type CourseId = "math1090" | "math1030";

export type CoverageStatus = "SOURCE_BACKED" | "MISSING_SOURCE";

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
