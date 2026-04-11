import { glossaryEntries } from "./glossary";
import type {
  CourseId,
  Locale,
  LocalizedGlossaryEntry,
  LocalizedText,
  TextbookChapterMeta,
  TextbookCourseMeta,
  TextbookUnitMeta,
} from "./types";
import { getLocalizedText } from "./i18n";

function text(
  en: string,
  zhHk: string,
  zhCn: string
): LocalizedText {
  return {
    en,
    "zh-cn": zhCn,
    "zh-hk": zhHk,
  };
}

const math1090LogicUnits: TextbookUnitMeta[] = [
  {
    chapterId: "logic",
    chapterNumber: "1",
    course: "math1090",
    coverageStatus: "SOURCE_BACKED",
    description: text(
      "Learn how mathematicians treat statements, connectives, and validity.",
      "學習數學家如何處理陳述、連接詞與推理有效性。",
      "学习数学家如何处理陈述、连接词与推理有效性。"
    ),
    glossaryRefs: ["proposition"],
    interactiveIds: ["truth-table-builder"],
    order: 1,
    prerequisites: [],
    slug: "propositional-logic",
    sourceRefs: [
      {
        file: "reference/MATH1090/MATH1090_Lecture_Notes_Feb27.pdf",
        pages: "§1.1-§1.3",
      },
      {
        file: "reference/MATH1090/MATH1090_Worksheet1.pdf",
        note: "Part A and Part B",
      },
      {
        file: "reference/MATH1090/MATH1090_HW1.pdf",
        note: "Question 1",
      },
    ],
    title: text(
      "1.1 Propositional logic",
      "1.1 命題邏輯",
      "1.1 命题逻辑"
    ),
    unitId: "math1090.logic.propositional-logic",
    unitNumber: "1.1",
  },
  {
    chapterId: "logic",
    chapterNumber: "1",
    course: "math1090",
    coverageStatus: "SOURCE_BACKED",
    description: text(
      "Build truth tables and use them to test equivalence, tautologies, and contradictions.",
      "建立真值表，並用它檢查等價式、重言式與矛盾式。",
      "建立真值表，并用它检查等价式、重言式与矛盾式。"
    ),
    glossaryRefs: ["truth-table"],
    interactiveIds: ["truth-table-builder"],
    order: 2,
    prerequisites: ["math1090.logic.propositional-logic"],
    slug: "truth-tables-equivalence",
    sourceRefs: [
      {
        file: "reference/MATH1090/MATH1090_Lecture_Notes_Feb27.pdf",
        pages: "§1.4-§1.6",
      },
      {
        file: "reference/MATH1090/MATH1090_Worksheet1.pdf",
        note: "Part C to Part E",
      },
      {
        file: "reference/MATH1090/MATH1090_HW1.pdf",
        note: "Questions 2 to 5",
      },
    ],
    title: text(
      "1.2 Truth tables and equivalence",
      "1.2 真值表與邏輯等價",
      "1.2 真值表与逻辑等价"
    ),
    unitId: "math1090.logic.truth-tables-equivalence",
    unitNumber: "1.2",
  },
  {
    chapterId: "logic",
    chapterNumber: "1",
    course: "math1090",
    coverageStatus: "SOURCE_BACKED",
    description: text(
      "Translate quantifiers carefully and negate them without losing meaning.",
      "細心翻譯量詞，並在不改變意思的前提下做否定。",
      "细心翻译量词，并在不改变意思的前提下做否定。"
    ),
    glossaryRefs: ["quantifier"],
    interactiveIds: ["quantifier-negation-stepper"],
    order: 3,
    prerequisites: ["math1090.logic.propositional-logic"],
    slug: "quantifiers-negation",
    sourceRefs: [
      {
        file: "reference/MATH1090/MATH1090_Lecture_Notes_Feb27.pdf",
        pages: "§1.9-§1.10",
      },
      {
        file: "reference/MATH1090/MATH1090_Worksheet2.pdf",
      },
    ],
    title: text(
      "1.3 Quantifiers and negation",
      "1.3 量詞與否定",
      "1.3 量词与否定"
    ),
    unitId: "math1090.logic.quantifiers-negation",
    unitNumber: "1.3",
  },
];

const math1090SetsUnits: TextbookUnitMeta[] = [
  {
    chapterId: "sets",
    chapterNumber: "2",
    course: "math1090",
    coverageStatus: "SOURCE_BACKED",
    description: text(
      "Understand membership, subsets, and the main set operations by working with concrete examples.",
      "透過具體例子理解屬於、子集，以及主要的集合運算。",
      "通过具体例子理解属于、子集，以及主要的集合运算。"
    ),
    glossaryRefs: ["set"],
    interactiveIds: ["set-operation-explorer"],
    order: 4,
    prerequisites: [],
    slug: "set-operations",
    sourceRefs: [
      {
        file: "reference/MATH1090/MATH1090_Lecture_Notes_Feb27.pdf",
        pages: "§2.1-§2.3",
      },
      {
        file: "reference/MATH1090/MATH1090_Worksheet3.pdf",
        note: "Sets and functions practice",
      },
    ],
    title: text(
      "2.1 Sets and set operations",
      "2.1 集合與集合運算",
      "2.1 集合与集合运算"
    ),
    unitId: "math1090.sets.set-operations",
    unitNumber: "2.1",
  },
  {
    chapterId: "sets",
    chapterNumber: "2",
    course: "math1090",
    coverageStatus: "SOURCE_BACKED",
    description: text(
      "Connect sets to functions and relations, then read injective, surjective, and relational language with confidence.",
      "把集合連到函數與關係，並有信心解讀單射、滿射及關係語言。",
      "把集合连到函数与关系，并有信心解读单射、满射及关系语言。"
    ),
    glossaryRefs: ["function", "relation", "set"],
    interactiveIds: ["set-operation-explorer"],
    order: 5,
    prerequisites: ["math1090.sets.set-operations"],
    slug: "functions-relations",
    sourceRefs: [
      {
        file: "reference/MATH1090/MATH1090_Lecture_Notes_Feb27.pdf",
        pages: "§2.4-§2.10",
      },
      {
        file: "reference/MATH1090/MATH1090_Worksheet3.pdf",
      },
    ],
    title: text(
      "2.2 Functions and relations",
      "2.2 函數與關係",
      "2.2 函数与关系"
    ),
    unitId: "math1090.sets.functions-relations",
    unitNumber: "2.2",
  },
];

const math1030SystemsUnits: TextbookUnitMeta[] = [
  {
    chapterId: "systems",
    chapterNumber: "1",
    course: "math1030",
    coverageStatus: "SOURCE_BACKED",
    description: text(
      "Read a linear system as a collection of conditions and describe its full solution set carefully.",
      "把線性方程組看成一組條件，並小心描述它的完整解集。",
      "把线性方程组看成一组条件，并小心描述它的完整解集。"
    ),
    glossaryRefs: ["solution-set"],
    interactiveIds: ["system-augmented-matrix-explorer"],
    order: 1,
    prerequisites: [],
    slug: "equations-solution-sets",
    sourceRefs: [
      {
        file: "reference/MATH1030/MATH1030-Notes.pdf",
        pages: "§1.1-§1.2",
      },
      {
        file: "reference/MATH1030/1030efghi-tutorial-week02.pdf",
      },
      {
        file: "reference/MATH1030/Practice Set 1_Set review and Solving Linear system.pdf",
        note: "Questions 4 to 7",
      },
    ],
    title: text(
      "1.1 Equations and solution sets",
      "1.1 方程與解集",
      "1.1 方程与解集"
    ),
    unitId: "math1030.systems.equations-solution-sets",
    unitNumber: "1.1",
  },
];

const math1030MatricesUnits: TextbookUnitMeta[] = [
  {
    chapterId: "matrices",
    chapterNumber: "2",
    course: "math1030",
    coverageStatus: "SOURCE_BACKED",
    description: text(
      "Build matrix intuition before you row-reduce: size, entries, rows, columns, and arithmetic meaning.",
      "在做行化簡前先建立矩陣直覺：大小、元素、行、列，以及運算意義。",
      "在做行化简前先建立矩阵直觉：大小、元素、行、列，以及运算意义。"
    ),
    glossaryRefs: ["matrix"],
    interactiveIds: ["matrix-multiplication-visualizer"],
    order: 2,
    prerequisites: [],
    slug: "matrix-basics",
    sourceRefs: [
      {
        file: "reference/MATH1030/MATH1030-Notes.pdf",
        pages: "§2.1, §3.1-§3.2",
      },
      {
        file: "reference/MATH1030/1030gi-n01-01.pdf",
      },
    ],
    title: text(
      "2.1 Matrix basics",
      "2.1 矩陣基礎",
      "2.1 矩阵基础"
    ),
    unitId: "math1030.matrices.matrix-basics",
    unitNumber: "2.1",
  },
  {
    chapterId: "matrices",
    chapterNumber: "2",
    course: "math1030",
    coverageStatus: "SOURCE_BACKED",
    description: text(
      "Translate a system into an augmented matrix and understand what each row operation preserves.",
      "把方程組翻譯成增廣矩陣，並理解每種行變換保留了甚麼。",
      "把方程组翻译成增广矩阵，并理解每种行变换保留了什么。"
    ),
    glossaryRefs: ["augmented-matrix", "row-operation"],
    interactiveIds: ["system-augmented-matrix-explorer", "row-reduction-stepper"],
    order: 3,
    prerequisites: ["math1030.systems.equations-solution-sets", "math1030.matrices.matrix-basics"],
    slug: "augmented-matrices-row-operations",
    sourceRefs: [
      {
        file: "reference/MATH1030/MATH1030-Notes.pdf",
        pages: "§2.1-§2.2",
      },
      {
        file: "reference/MATH1030/1030gi-n02-01.pdf",
      },
      {
        file: "reference/MATH1030/Practice Set 1_Set review and Solving Linear system.pdf",
        note: "Questions 6 to 8",
      },
    ],
    title: text(
      "2.2 Augmented matrices and row operations",
      "2.2 增廣矩陣與行變換",
      "2.2 增广矩阵与行变换"
    ),
    unitId: "math1030.matrices.augmented-matrices-row-operations",
    unitNumber: "2.2",
  },
  {
    chapterId: "matrices",
    chapterNumber: "2",
    course: "math1030",
    coverageStatus: "SOURCE_BACKED",
    description: text(
      "See Gaussian elimination as a sequence of purposeful moves, not just memorized mechanics.",
      "把高斯消元看成一連串有目的的操作，而不只是死記步驟。",
      "把高斯消元看成一连串有目的的操作，而不只是死记步骤。"
    ),
    glossaryRefs: ["row-operation", "rref"],
    interactiveIds: ["row-reduction-stepper"],
    order: 4,
    prerequisites: ["math1030.matrices.augmented-matrices-row-operations"],
    slug: "gaussian-elimination-rref",
    sourceRefs: [
      {
        file: "reference/MATH1030/MATH1030-Notes.pdf",
        pages: "§2.2",
      },
      {
        file: "reference/MATH1030/1030gi-n02-03.pdf",
      },
      {
        file: "reference/MATH1030/1030efghi-tutorial-week03.pdf",
      },
    ],
    title: text(
      "2.3 Gaussian elimination and RREF",
      "2.3 高斯消元與最簡行階梯形",
      "2.3 高斯消元与最简行阶梯形"
    ),
    unitId: "math1030.matrices.gaussian-elimination-rref",
    unitNumber: "2.3",
  },
  {
    chapterId: "matrices",
    chapterNumber: "2",
    course: "math1030",
    coverageStatus: "SOURCE_BACKED",
    description: text(
      "Classify whether a system has one solution, infinitely many solutions, or no solution by reading its reduced form.",
      "透過最簡形式判斷方程組有唯一解、無限多解，還是無解。",
      "通过最简形式判断方程组有唯一解、无限多解，还是无解。"
    ),
    glossaryRefs: ["solution-set", "rref"],
    interactiveIds: ["solution-set-classifier"],
    order: 5,
    prerequisites: ["math1030.matrices.gaussian-elimination-rref"],
    slug: "solution-set-types",
    sourceRefs: [
      {
        file: "reference/MATH1030/MATH1030-Notes.pdf",
        pages: "§2.3",
      },
      {
        file: "reference/MATH1030/Practice Set 1_Set review and Solving Linear system.pdf",
        note: "Questions 5 to 9",
      },
    ],
    title: text(
      "2.4 Solution-set types",
      "2.4 解集的種類",
      "2.4 解集的种类"
    ),
    unitId: "math1030.matrices.solution-set-types",
    unitNumber: "2.4",
  },
];

const math1030InvertibilityUnits: TextbookUnitMeta[] = [
  {
    chapterId: "invertibility",
    chapterNumber: "5",
    course: "math1030",
    coverageStatus: "SOURCE_BACKED",
    description: text(
      "Connect inverse matrices, row reduction, and the practical meaning of nonsingularity.",
      "把逆矩陣、行化簡與非奇異矩陣的實際意義連接起來。",
      "把逆矩阵、行化简与非奇异矩阵的实际意义连接起来。"
    ),
    glossaryRefs: ["invertible-matrix", "row-operation", "matrix"],
    interactiveIds: ["invertibility-row-reduction-demo"],
    order: 6,
    prerequisites: ["math1030.matrices.gaussian-elimination-rref"],
    slug: "invertible-matrices",
    sourceRefs: [
      {
        file: "reference/MATH1030/MATH1030-Notes.pdf",
        pages: "§5.1-§5.3",
      },
      {
        file: "reference/MATH1030/Practice Set 4_Invertible Matrix.pdf",
      },
    ],
    title: text(
      "5.1 Invertible matrices",
      "5.1 可逆矩陣",
      "5.1 可逆矩阵"
    ),
    unitId: "math1030.invertibility.invertible-matrices",
    unitNumber: "5.1",
  },
];

const math1090: TextbookCourseMeta = {
  chapters: [
    {
      course: "math1090",
      id: "logic",
      number: "1",
      summary: text(
        "Reasoning tools for statements, connectives, and quantifiers.",
        "處理陳述、連接詞與量詞的推理工具。",
        "处理陈述、连接词与量词的推理工具。"
      ),
      title: text("Logic", "邏輯", "逻辑"),
      units: math1090LogicUnits,
    },
    {
      course: "math1090",
      id: "sets",
      number: "2",
      summary: text(
        "Basic set language, functions, and relations.",
        "基本的集合語言、函數與關係。",
        "基本的集合语言、函数与关系。"
      ),
      title: text("Sets and relations", "集合與關係", "集合与关系"),
      units: math1090SetsUnits,
    },
  ],
  description: text(
    "A beginner-friendly set theory path with short units, source traceability, and guided interaction.",
    "以初學者為本的集合論學習路徑，包含短單元、來源追蹤與互動引導。",
    "以初学者为本的集合论学习路径，包含短单元、来源追踪与互动引导。"
  ),
  id: "math1090",
  shortTitle: text("Set theory", "集合論", "集合论"),
  title: text("MATH1090 interactive textbook", "MATH1090 互動教材", "MATH1090 互动教材"),
};

const math1030: TextbookCourseMeta = {
  chapters: [
    {
      course: "math1030",
      id: "systems",
      number: "1",
      summary: text(
        "Learn to read equations as full solution sets.",
        "學習把方程讀成完整的解集。",
        "学习把方程读成完整的解集。"
      ),
      title: text("Systems of equations", "方程組", "方程组"),
      units: math1030SystemsUnits,
    },
    {
      course: "math1030",
      id: "matrices",
      number: "2",
      summary: text(
        "Build matrix intuition and use row reduction with purpose.",
        "建立矩陣直覺，並有目的地使用行化簡。",
        "建立矩阵直觉，并有目的地使用行化简。"
      ),
      title: text("Matrices and elimination", "矩陣與消元", "矩阵与消元"),
      units: math1030MatricesUnits,
    },
    {
      course: "math1030",
      id: "invertibility",
      number: "5",
      summary: text(
        "Understand when a matrix can be undone and why that matters.",
        "理解甚麼情況下矩陣可以被反轉，以及這件事的重要性。",
        "理解什么情况下矩阵可以被反转，以及这件事的重要性。"
      ),
      title: text("Invertibility", "可逆性", "可逆性"),
      units: math1030InvertibilityUnits,
    },
  ],
  description: text(
    "An interactive-first linear algebra route focused on operations, structure, and interpretation.",
    "以互動為先的線性代數學習路徑，重點是運算、結構與理解。",
    "以互动为先的线性代数学习路径，重点是运算、结构与理解。"
  ),
  id: "math1030",
  shortTitle: text("Linear algebra I", "線性代數 I", "线性代数 I"),
  title: text("MATH1030 interactive textbook", "MATH1030 互動教材", "MATH1030 互动教材"),
};

export const textbookCatalog: Record<CourseId, TextbookCourseMeta> = {
  math1030,
  math1090,
};

export const allUnits = Object.values(textbookCatalog).flatMap((course) =>
  course.chapters.flatMap((chapter) => chapter.units)
);

export function getCourseMeta(course: CourseId) {
  return textbookCatalog[course];
}

export function getCourseTitle(course: CourseId, locale: Locale) {
  return getLocalizedText(textbookCatalog[course].title, locale);
}

export function getChapterMeta(course: CourseId, chapterId: string) {
  return textbookCatalog[course].chapters.find((chapter) => chapter.id === chapterId) ?? null;
}

export function getUnitMeta(unitId: string) {
  return allUnits.find((unit) => unit.unitId === unitId) ?? null;
}

export function getUnitMetaByRoute(
  course: CourseId,
  chapterId: string,
  slug: string
) {
  return (
    textbookCatalog[course].chapters
      .find((chapter) => chapter.id === chapterId)
      ?.units.find((unit) => unit.slug === slug) ?? null
  );
}

export function getPreviousAndNextUnits(unitId: string) {
  const current = getUnitMeta(unitId);
  const courseUnits = current
    ? textbookCatalog[current.course].chapters.flatMap((chapter) => chapter.units)
    : [];
  const index = courseUnits.findIndex((unit) => unit.unitId === unitId);

  return {
    next: index >= 0 ? courseUnits[index + 1] ?? null : null,
    previous: index >= 0 ? courseUnits[index - 1] ?? null : null,
  };
}

export function getLocalizedGlossaryEntries(
  locale: Locale,
  refs: string[]
): LocalizedGlossaryEntry[] {
  return refs
    .map((id) => glossaryEntries.find((entry) => entry.id === id))
    .filter((entry): entry is (typeof glossaryEntries)[number] => Boolean(entry))
    .map((entry) => ({
      ...entry,
      displayDefinition: getLocalizedText(entry.definition, locale),
      displayTerm:
        locale === "en"
          ? entry.termEn
          : locale === "zh-hk"
            ? entry.termZhHk
            : entry.termZhCn,
    }));
}
