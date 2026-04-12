import { glossaryEntries } from "./glossary";
import type {
  CourseId,
  Locale,
  LocalizedGlossaryEntry,
  LocalizedText,
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

const math1090NumbersUnits: TextbookUnitMeta[] = [
  {
    chapterId: "numbers",
    chapterNumber: "3",
    course: "math1090",
    coverageStatus: "SOURCE_BACKED",
    description: text(
      "Meet natural numbers through the Peano viewpoint and learn what the successor operation is really doing.",
      "從 Peano 觀點認識自然數，並理解後繼運算真正代表甚麼。",
      "从 Peano 观点认识自然数，并理解后继运算真正代表什么。"
    ),
    glossaryRefs: ["natural-number", "induction"],
    interactiveIds: [],
    order: 6,
    prerequisites: [],
    slug: "natural-numbers-peano",
    sourceRefs: [
      {
        file: "reference/MATH1090/MATH1090_Lecture_Notes_Mar26.pdf",
        pages: "§3.1-§3.2",
      },
      {
        file: "reference/MATH1090/MATH1090_Worksheet4.pdf",
        note: "Exercises 1-3",
      },
      {
        file: "reference/MATH1090/MATH1090_midterm_review_notes_final.tex",
        pages: "§3.1-§3.2 and Exercise 25",
      },
    ],
    title: text(
      "3.1 Natural numbers and Peano axioms",
      "3.1 自然數與 Peano 公理",
      "3.1 自然数与 Peano 公理"
    ),
    unitId: "math1090.numbers.natural-numbers-peano",
    unitNumber: "3.1",
  },
  {
    chapterId: "numbers",
    chapterNumber: "3",
    course: "math1090",
    coverageStatus: "SOURCE_BACKED",
    description: text(
      "Use induction as a proof pattern and read recursive formulas for + and · without losing the base case.",
      "把歸納法當作證明模式，並能讀懂 + 和 · 的遞歸公式而不丟失基本情況。",
      "把归纳法当作证明模式，并能读懂 + 和 · 的递归公式而不丢失基本情况。"
    ),
    glossaryRefs: ["induction", "natural-number"],
    interactiveIds: ["induction-stepper"],
    order: 7,
    prerequisites: ["math1090.numbers.natural-numbers-peano"],
    slug: "induction-and-recursive-arithmetic",
    sourceRefs: [
      {
        file: "reference/MATH1090/MATH1090_Lecture_Notes_Mar26.pdf",
        pages: "§3.3-§3.4",
      },
      {
        file: "reference/MATH1090/MATH1090_midterm_review_notes_final.tex",
        pages: "§3.3 and Exercises 26-30",
      },
      {
        file: "reference/MATH1090/MATH1090_Worksheet4.pdf",
        note: "Exercises 1-2",
      },
    ],
    title: text(
      "3.2 Induction and recursive arithmetic",
      "3.2 歸納法與遞歸算術",
      "3.2 归纳法与递归算术"
    ),
    unitId: "math1090.numbers.induction-and-recursive-arithmetic",
    unitNumber: "3.2",
  },
  {
    chapterId: "numbers",
    chapterNumber: "3",
    course: "math1090",
    coverageStatus: "SOURCE_BACKED",
    description: text(
      "Build the integers from pairs of natural numbers and read each equivalence class as one signed number.",
      "用自然數對的等價類構造整數，並把每個等價類讀成一個有符號數。",
      "用自然数对的等价类构造整数，并把每个等价类读成一个有符号数。"
    ),
    glossaryRefs: ["integer", "equivalence-class"],
    interactiveIds: [],
    order: 8,
    prerequisites: ["math1090.numbers.induction-and-recursive-arithmetic"],
    slug: "integers-from-equivalence-classes",
    sourceRefs: [
      {
        file: "reference/MATH1090/MATH1090_Lecture_Notes_Mar26.pdf",
        pages: "§3.5",
      },
      {
        file: "reference/MATH1090/MATH1090_midterm_review_notes_final.tex",
        pages: "Exercises 32-35",
      },
      {
        file: "reference/MATH1090/MATH1090_Worksheet4.pdf",
        note: "Exercise 3",
      },
    ],
    title: text(
      "3.3 Integers from equivalence classes",
      "3.3 由等價類構造整數",
      "3.3 由等价类构造整数"
    ),
    unitId: "math1090.numbers.integers-from-equivalence-classes",
    unitNumber: "3.3",
  },
  {
    chapterId: "numbers",
    chapterNumber: "3",
    course: "math1090",
    coverageStatus: "SOURCE_BACKED",
    description: text(
      "Define rational numbers as equivalence classes and check that the usual formulas do not depend on the representative you pick.",
      "把有理數定義成等價類，並檢查常用公式不會依賴你選哪個代表元。",
      "把有理数定义成等价类，并检查常用公式不会依赖你选哪个代表元。"
    ),
    glossaryRefs: ["rational-number", "well-defined-operation", "equivalence-class"],
    interactiveIds: [],
    order: 9,
    prerequisites: ["math1090.numbers.integers-from-equivalence-classes"],
    slug: "rationals-and-well-defined-operations",
    sourceRefs: [
      {
        file: "reference/MATH1090/MATH1090_Lecture_Notes_Mar26.pdf",
        pages: "§3.6",
      },
      {
        file: "reference/MATH1090/MATH1090_Worksheet5.pdf",
        note: "Exercises 1-2",
      },
      {
        file: "reference/MATH1090/MATH1090_midterm_review_notes_final.tex",
        pages: "Exercises 36-38 and Worksheet 5 Exercise 1",
      },
    ],
    title: text(
      "3.4 Rationals and well-defined operations",
      "3.4 有理數與良定運算",
      "3.4 有理数与良定运算"
    ),
    unitId: "math1090.numbers.rationals-and-well-defined-operations",
    unitNumber: "3.4",
  },
  {
    chapterId: "numbers",
    chapterNumber: "3",
    course: "math1090",
    coverageStatus: "SOURCE_BACKED",
    description: text(
      "See why Q still has holes by looking at the irrational number sqrt(2) and the set of rationals below it.",
      "透過無理數 sqrt(2) 與其下方的有理數集合，看見 Q 為甚麼仍然有缺口。",
      "透过无理数 sqrt(2) 与其下方的有理数集合，看见 Q 为什么仍然有缺口。"
    ),
    glossaryRefs: ["irrational-number", "rational-number", "supremum"],
    interactiveIds: [],
    order: 10,
    prerequisites: ["math1090.numbers.rationals-and-well-defined-operations"],
    slug: "gaps-in-q-and-sqrt2",
    sourceRefs: [
      {
        file: "reference/MATH1090/MATH1090_Lecture_Notes_Mar26.pdf",
        pages: "§4.1-§4.7",
      },
      {
        file: "reference/MATH1090/MATH1090_Worksheet5.pdf",
        note: "Exercises 3-4",
      },
      {
        file: "reference/MATH1090/MATH1090_midterm_review_notes_final.tex",
        pages: "Worksheet 5 Exercises 3-4 and §3.7-§4.7",
      },
    ],
    title: text(
      "3.5 Gaps in Q and why sqrt(2) is not rational",
      "3.5 Q 的缺口與 sqrt(2)",
      "3.5 Q 的缺口与 sqrt(2)"
    ),
    unitId: "math1090.numbers.gaps-in-q-and-sqrt2",
    unitNumber: "3.5",
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

const math1030MatrixAlgebraUnits: TextbookUnitMeta[] = [
  {
    chapterId: "matrix-algebra",
    chapterNumber: "3",
    course: "math1030",
    coverageStatus: "SOURCE_BACKED",
    description: text(
      "Learn which matrix operations are entrywise, why matching sizes matter, and how the zero matrix behaves like the additive identity.",
      "學會哪些矩陣運算是逐格進行、為何大小必須配合，以及零矩陣如何充當加法單位元。",
      "学会哪些矩阵运算是逐格进行、为何大小必须配合，以及零矩阵如何充当加法单位元。"
    ),
    glossaryRefs: ["matrix", "zero-matrix"],
    interactiveIds: ["matrix-arithmetic-lab"],
    order: 6,
    prerequisites: ["math1030.matrices.matrix-basics"],
    slug: "matrix-addition-scalar-multiplication",
    sourceRefs: [
      {
        file: "reference/MATH1030/MATH1030-Notes.pdf",
        pages: "§3.1",
      },
      {
        file: "reference/MATH1030/1030gi-n01-se0102.pdf",
        note: "Questions 4 to 7",
      },
      {
        file: "reference/MATH1030/Practice Set 2_Matrix Algebra.pdf",
        note: "Questions 1 to 2",
      },
    ],
    title: text(
      "3.1 Matrix addition, subtraction, and scalar multiplication",
      "3.1 矩陣加法、減法與純量乘法",
      "3.1 矩阵加法、减法与数乘"
    ),
    unitId: "math1030.matrix-algebra.matrix-addition-scalar-multiplication",
    unitNumber: "3.1",
  },
  {
    chapterId: "matrix-algebra",
    chapterNumber: "3",
    course: "math1030",
    coverageStatus: "SOURCE_BACKED",
    description: text(
      "Understand matrix multiplication as a row-by-column rule and as a compact way to encode several linear combinations or systems at once.",
      "把矩陣乘法理解成行乘列的規則，也理解成把多個線性組合或方程組一起打包的方式。",
      "把矩阵乘法理解成行乘列的规则，也理解成把多个线性组合或方程组一起打包的方式。"
    ),
    glossaryRefs: ["matrix", "matrix-product", "identity-matrix"],
    interactiveIds: ["matrix-multiplication-visualizer"],
    order: 7,
    prerequisites: [
      "math1030.matrices.matrix-basics",
      "math1030.matrix-algebra.matrix-addition-scalar-multiplication",
    ],
    slug: "matrix-multiplication-and-linear-systems",
    sourceRefs: [
      {
        file: "reference/MATH1030/MATH1030-Notes.pdf",
        pages: "§3.2",
      },
      {
        file: "reference/MATH1030/1030gi-n01-se0102.pdf",
        note: "Questions 8 to 11",
      },
      {
        file: "reference/MATH1030/Practice Set 2_Matrix Algebra.pdf",
        note: "Questions 2 to 4",
      },
      {
        file: "reference/MATH1030/Practice Set 3_Matrix Algebra and Linear Equation System.pdf",
        note: "Questions 1 to 3",
      },
    ],
    title: text(
      "3.2 Matrix multiplication and linear systems",
      "3.2 矩陣乘法與線性方程組",
      "3.2 矩阵乘法与线性方程组"
    ),
    unitId: "math1030.matrix-algebra.matrix-multiplication-and-linear-systems",
    unitNumber: "3.2",
  },
  {
    chapterId: "matrix-algebra",
    chapterNumber: "3",
    course: "math1030",
    coverageStatus: "SOURCE_BACKED",
    description: text(
      "Transpose swaps rows and columns, while symmetry records what stays unchanged across the main diagonal.",
      "轉置會交換行與列，而對稱性則記錄主對角線兩側哪些部分保持不變。",
      "转置会交换行与列，而对称性则记录主对角线两侧哪些部分保持不变。"
    ),
    glossaryRefs: ["transpose", "symmetric-matrix", "skew-symmetric-matrix"],
    interactiveIds: ["transpose-symmetry-lab"],
    order: 8,
    prerequisites: ["math1030.matrix-algebra.matrix-multiplication-and-linear-systems"],
    slug: "transposes-and-symmetric-matrices",
    sourceRefs: [
      {
        file: "reference/MATH1030/MATH1030-Notes.pdf",
        pages: "§3.3",
      },
      {
        file: "reference/MATH1030/1030efghi-tutorial-week04.pdf",
        note: "Questions 1 to 2",
      },
      {
        file: "reference/MATH1030/Practice Set 3_Matrix Algebra and Linear Equation System.pdf",
        note: "Questions 2, 4 to 6",
      },
    ],
    title: text(
      "3.3 Transposes, symmetric matrices, and skew-symmetric matrices",
      "3.3 轉置、對稱矩陣與反對稱矩陣",
      "3.3 转置、对称矩阵与反对称矩阵"
    ),
    unitId: "math1030.matrix-algebra.transposes-and-symmetric-matrices",
    unitNumber: "3.3",
  },
  {
    chapterId: "matrix-algebra",
    chapterNumber: "3",
    course: "math1030",
    coverageStatus: "SOURCE_BACKED",
    description: text(
      "Meet diagonal, triangular, identity, and elementary matrices, and see why their special shapes make later arguments shorter.",
      "認識對角矩陣、三角矩陣、單位矩陣與初等矩陣，並理解它們的特殊形狀為何能令後面的論證更短。",
      "认识对角矩阵、三角矩阵、单位矩阵与初等矩阵，并理解它们的特殊形状为何能令后面的论证更短。"
    ),
    glossaryRefs: [
      "identity-matrix",
      "diagonal-matrix",
      "triangular-matrix",
      "elementary-matrix",
    ],
    interactiveIds: ["matrix-family-checker", "row-reduction-stepper"],
    order: 9,
    prerequisites: [
      "math1030.matrix-algebra.matrix-multiplication-and-linear-systems",
      "math1030.matrix-algebra.transposes-and-symmetric-matrices",
    ],
    slug: "special-matrices",
    sourceRefs: [
      {
        file: "reference/MATH1030/MATH1030-Notes.pdf",
        pages: "§3.4",
      },
      {
        file: "reference/MATH1030/1030gi-n01-se0102.pdf",
        note: "Advice section on upper-triangular matrices",
      },
      {
        file: "reference/MATH1030/Practice Set 3_Matrix Algebra and Linear Equation System.pdf",
        note: "Questions 9 to 11",
      },
    ],
    title: text(
      "3.4 Special matrices",
      "3.4 特殊矩陣",
      "3.4 特殊矩阵"
    ),
    unitId: "math1030.matrix-algebra.special-matrices",
    unitNumber: "3.4",
  },
  {
    chapterId: "matrix-algebra",
    chapterNumber: "3",
    course: "math1030",
    coverageStatus: "SOURCE_BACKED",
    description: text(
      "Partition a large matrix into smaller pieces so addition and multiplication can be carried out block by block without losing meaning.",
      "把大型矩陣分成較小部分，令加法與乘法可以逐塊進行，同時保持原來的數學意思。",
      "把大型矩阵分成较小部分，让加法与乘法可以逐块进行，同时保持原来的数学意思。"
    ),
    glossaryRefs: ["block-matrix", "matrix"],
    interactiveIds: [],
    order: 10,
    prerequisites: [
      "math1030.matrix-algebra.matrix-multiplication-and-linear-systems",
      "math1030.matrix-algebra.special-matrices",
    ],
    slug: "block-matrices",
    sourceRefs: [
      {
        file: "reference/MATH1030/MATH1030-Notes.pdf",
        pages: "§3.5",
      },
      {
        file: "reference/MATH1030/1030gi-n01-se0102.pdf",
        note: "Advice section on block matrices",
      },
    ],
    title: text(
      "3.5 Block matrices",
      "3.5 分塊矩陣",
      "3.5 分块矩阵"
    ),
    unitId: "math1030.matrix-algebra.block-matrices",
    unitNumber: "3.5",
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
    order: 11,
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

const math1030VectorSpaceUnits: TextbookUnitMeta[] = [
  {
    chapterId: "vector-spaces",
    chapterNumber: "6",
    course: "math1030",
    coverageStatus: "SOURCE_BACKED",
    description: text(
      "Start from familiar examples and learn what the vector-space axioms are trying to protect.",
      "由熟悉例子開始，理解向量空間公理到底想保護甚麼結構。",
      "由熟悉例子开始，理解向量空间公理到底想保护什么结构。"
    ),
    glossaryRefs: ["vector-space"],
    interactiveIds: [],
    order: 12,
    prerequisites: [],
    slug: "vector-spaces",
    sourceRefs: [
      {
        file: "reference/MATH1030/MATH1030-Notes.pdf",
        pages: "§6.1",
      },
      {
        file: "reference/MATH1030/1030efghi-tutorial-week08.pdf",
        note: "Advice section on vector-space axioms",
      },
    ],
    title: text(
      "6.1 Vector spaces",
      "6.1 向量空間",
      "6.1 向量空间"
    ),
    unitId: "math1030.vector-spaces.vector-spaces",
    unitNumber: "6.1",
  },
  {
    chapterId: "vector-spaces",
    chapterNumber: "6",
    course: "math1030",
    coverageStatus: "SOURCE_BACKED",
    description: text(
      "Use the subspace test to separate genuine linear structure from lookalikes that fail closure or miss the zero vector.",
      "用子空間測試把真正的線性結構，和那些缺少封閉性或零向量的集合分開。",
      "用子空间测试把真正的线性结构，和那些缺少封闭性或零向量的集合分开。"
    ),
    glossaryRefs: ["vector-space", "subspace"],
    interactiveIds: ["subspace-checker"],
    order: 13,
    prerequisites: ["math1030.vector-spaces.vector-spaces"],
    slug: "subspaces",
    sourceRefs: [
      {
        file: "reference/MATH1030/MATH1030-Notes.pdf",
        pages: "§6.2",
      },
      {
        file: "reference/MATH1030/1030efghi-tutorial-week08.pdf",
        note: "Questions 1-4",
      },
      {
        file: "reference/MATH1030/1030efghi-tutorial-week08as.pdf",
      },
    ],
    title: text(
      "6.2 Subspaces",
      "6.2 子空間",
      "6.2 子空间"
    ),
    unitId: "math1030.vector-spaces.subspaces",
    unitNumber: "6.2",
  },
  {
    chapterId: "vector-spaces",
    chapterNumber: "6",
    course: "math1030",
    coverageStatus: "SOURCE_BACKED",
    description: text(
      "Treat linear combinations as controlled building instructions, then see span as every vector you can build that way.",
      "把線性組合看成有控制的搭建指令，再把張成理解成所有能這樣搭出來的向量。",
      "把线性组合看成有控制的搭建指令，再把张成理解成所有能这样搭出来的向量。"
    ),
    glossaryRefs: ["linear-combination", "span"],
    interactiveIds: ["span-explorer"],
    order: 14,
    prerequisites: ["math1030.vector-spaces.vector-spaces"],
    slug: "linear-combinations-and-span",
    sourceRefs: [
      {
        file: "reference/MATH1030/MATH1030-Notes.pdf",
        pages: "§6.3",
      },
      {
        file: "reference/MATH1030/1030gi-n05-03.pdf",
      },
      {
        file: "reference/MATH1030/math1030_assignment4_review_solutions.pdf",
        note: "Linear combination and span examples",
      },
    ],
    title: text(
      "6.3 Linear combinations and span",
      "6.3 線性組合與張成",
      "6.3 线性组合与张成"
    ),
    unitId: "math1030.vector-spaces.linear-combinations-and-span",
    unitNumber: "6.3",
  },
  {
    chapterId: "vector-spaces",
    chapterNumber: "6",
    course: "math1030",
    coverageStatus: "SOURCE_BACKED",
    description: text(
      "Read dependence as redundancy, and independence as the point where every coefficient truly matters.",
      "把相依看成冗餘，把無關看成每個係數都真正有作用的情況。",
      "把相依看成冗余，把无关看成每个系数都真正有作用的情况。"
    ),
    glossaryRefs: ["linear-independence", "linear-combination", "span"],
    interactiveIds: ["independence-checker"],
    order: 15,
    prerequisites: ["math1030.vector-spaces.linear-combinations-and-span"],
    slug: "linear-dependence-and-independence",
    sourceRefs: [
      {
        file: "reference/MATH1030/MATH1030-Notes.pdf",
        pages: "§6.4",
      },
      {
        file: "reference/MATH1030/math1030_assignment4_review_solutions.pdf",
        note: "Dependence and independence examples",
      },
      {
        file: "reference/MATH1030/1030efghi-as04-202526.pdf",
        note: "Questions on dependence and transformed sets",
      },
    ],
    title: text(
      "6.4 Linear dependence and independence",
      "6.4 線性相依與線性無關",
      "6.4 线性相依与线性无关"
    ),
    unitId: "math1030.vector-spaces.linear-dependence-and-independence",
    unitNumber: "6.4",
  },
  {
    chapterId: "vector-spaces",
    chapterNumber: "6",
    course: "math1030",
    coverageStatus: "SOURCE_BACKED",
    description: text(
      "See why a basis is the smallest complete coordinate system for a space, and why dimension counts how many directions are really needed.",
      "看清基底為何是空間最小而完整的座標系統，以及維數為何是在數真正需要多少個方向。",
      "看清基底为何是空间最小而完整的坐标系统，以及维数为何是在数真正需要多少个方向。"
    ),
    glossaryRefs: ["basis", "dimension", "linear-independence", "span"],
    interactiveIds: ["span-explorer", "independence-checker"],
    order: 16,
    prerequisites: ["math1030.vector-spaces.linear-dependence-and-independence"],
    slug: "basis-and-dimension",
    sourceRefs: [
      {
        file: "reference/MATH1030/MATH1030-Notes.pdf",
        pages: "§6.5",
      },
      {
        file: "reference/MATH1030/1030gi-n05-01.pdf",
      },
      {
        file: "reference/MATH1030/1030gi-n05-02.pdf",
      },
    ],
    title: text(
      "6.5 Basis and dimension",
      "6.5 基底與維數",
      "6.5 基底与维数"
    ),
    unitId: "math1030.vector-spaces.basis-and-dimension",
    unitNumber: "6.5",
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
    {
      course: "math1090",
      id: "numbers",
      number: "3",
      summary: text(
        "How natural numbers, integers, and rationals are built, and where Q still falls short.",
        "自然數、整數與有理數如何構造，以及 Q 還欠缺甚麼。",
        "自然数、整数与有理数如何构造，以及 Q 还欠缺什么。"
      ),
      title: text("Numbers by construction", "由構造得到的數系", "由构造得到的数系"),
      units: math1090NumbersUnits,
    },
  ],
  description: text(
    "A beginner-friendly set theory note collection with short units, careful explanations, and guided interaction.",
    "以初學者為本的集合論筆記系列，包含短單元、清晰講解與互動引導。",
    "以初学者为本的集合论笔记系列，包含短单元、清晰讲解与互动引导。"
  ),
  id: "math1090",
  shortTitle: text("Set theory", "集合論", "集合论"),
  title: text("MATH1090: Set theory", "MATH1090：集合論", "MATH1090：集合论"),
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
      id: "matrix-algebra",
      number: "3",
      summary: text(
        "Extend matrix reading into real algebra: entrywise operations, multiplication, transpose, and reusable matrix families.",
        "把矩陣閱讀推進到真正的代數運算：逐格運算、乘法、轉置，以及可重用的矩陣類型。",
        "把矩阵阅读推进到真正的代数运算：逐格运算、乘法、转置，以及可重用的矩阵类型。"
      ),
      title: text("Matrix algebra", "矩陣代數", "矩阵代数"),
      units: math1030MatrixAlgebraUnits,
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
    {
      course: "math1030",
      id: "vector-spaces",
      number: "6",
      summary: text(
        "Move from matrix procedures to the structure of spaces, span, independence, and basis.",
        "由矩陣程序走向空間結構、張成、無關與基底。",
        "由矩阵程序走向空间结构、张成、无关与基底。"
      ),
      title: text("Vector spaces", "向量空間", "向量空间"),
      units: math1030VectorSpaceUnits,
    },
  ],
  description: text(
    "An interactive-first linear algebra note collection focused on operations, structure, and interpretation.",
    "以互動為先的線性代數筆記系列，重點是運算、結構與理解。",
    "以互动为先的线性代数笔记系列，重点是运算、结构与理解。"
  ),
  id: "math1030",
  shortTitle: text("Linear algebra I", "線性代數 I", "线性代数 I"),
  title: text("MATH1030: Linear algebra I", "MATH1030：線性代數 I", "MATH1030：线性代数 I"),
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
