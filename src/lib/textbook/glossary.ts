import type { GlossaryEntry } from "./types";

export const glossaryEntries: GlossaryEntry[] = [
  {
    definition: {
      en: "A proposition is a statement that is either true or false.",
      "zh-cn": "命题是一个非真即假的陈述句。",
      "zh-hk": "命題是一個非真即假的陳述句。",
    },
    id: "proposition",
    sourceRefs: [
      { file: "reference/MATH1090/MATH1090_Lecture_Notes_Feb27.pdf", pages: "§1.2-§1.3" },
      { file: "reference/MATH1090/MATH1090_Worksheet1.pdf", note: "Part A" },
    ],
    termEn: "proposition",
    termZhCn: "命题",
    termZhHk: "命題",
  },
  {
    definition: {
      en: "A truth table lists every possible truth-value assignment and the resulting truth value of a formula.",
      "zh-cn": "真值表列出所有可能的真假组合，以及公式在每种组合下的真假。",
      "zh-hk": "真值表列出所有可能的真假組合，以及公式在每種組合下的真假。",
    },
    id: "truth-table",
    sourceRefs: [
      { file: "reference/MATH1090/MATH1090_Lecture_Notes_Feb27.pdf", pages: "§1.4" },
      { file: "reference/MATH1090/MATH1090_HW1.pdf", note: "Question 2" },
    ],
    termEn: "truth table",
    termZhCn: "真值表",
    termZhHk: "真值表",
  },
  {
    definition: {
      en: "A quantifier tells you how many objects a statement talks about, such as all objects or at least one object.",
      "zh-cn": "量词说明一个陈述谈论多少个对象，例如所有对象或至少一个对象。",
      "zh-hk": "量詞說明一個陳述談論多少個對象，例如所有對象或至少一個對象。",
    },
    id: "quantifier",
    sourceRefs: [
      { file: "reference/MATH1090/MATH1090_Lecture_Notes_Feb27.pdf", pages: "§1.9-§1.10" },
      { file: "reference/MATH1090/MATH1090_Worksheet2.pdf" },
    ],
    termEn: "quantifier",
    termZhCn: "量词",
    termZhHk: "量詞",
  },
  {
    cantoneseNote: "讀作「集」；講解時常會補充『一堆元素組成的對象』。",
    definition: {
      en: "A set is a collection of objects, called elements.",
      "zh-cn": "集合是一组对象，这些对象称为元素。",
      "zh-hk": "集合是一組對象，這些對象稱為元素。",
    },
    id: "set",
    sourceRefs: [
      { file: "reference/MATH1090/MATH1090_Lecture_Notes_Feb27.pdf", pages: "§2.1-§2.3" },
      { file: "reference/MATH1090/MATH1090_Worksheet3.pdf" },
    ],
    termEn: "set",
    termZhCn: "集合",
    termZhHk: "集合",
  },
  {
    definition: {
      en: "A function matches each input in the domain with exactly one output in the codomain.",
      "zh-cn": "函数把定义域中的每个输入配对到陪域中的唯一输出。",
      "zh-hk": "函數把定義域中的每個輸入配對到陪域中的唯一輸出。",
    },
    id: "function",
    sourceRefs: [
      { file: "reference/MATH1090/MATH1090_Lecture_Notes_Feb27.pdf", pages: "§2.4" },
      { file: "reference/MATH1090/MATH1090_Worksheet3.pdf" },
    ],
    termEn: "function",
    termZhCn: "函数",
    termZhHk: "函數",
  },
  {
    definition: {
      en: "A relation records which ordered pairs are considered connected.",
      "zh-cn": "关系记录哪些有序对被视为有关联。",
      "zh-hk": "關係記錄哪些有序對被視為有關聯。",
    },
    id: "relation",
    sourceRefs: [
      { file: "reference/MATH1090/MATH1090_Lecture_Notes_Feb27.pdf", pages: "§2.7-§2.10" },
      { file: "reference/MATH1090/MATH1090_Worksheet3.pdf" },
    ],
    termEn: "relation",
    termZhCn: "关系",
    termZhHk: "關係",
  },
  {
    cantoneseNote: "「矩陣」在香港課堂中最常用。",
    definition: {
      en: "A matrix is a rectangular array of numbers arranged in rows and columns.",
      "zh-cn": "矩阵是按行和列排成的长方形数字表。",
      "zh-hk": "矩陣是按行和列排成的長方形數字表。",
    },
    id: "matrix",
    sourceRefs: [
      { file: "reference/MATH1030/MATH1030-Notes.pdf", pages: "§2.1, §3.1" },
      { file: "reference/MATH1030/1030gi-n01-01.pdf" },
    ],
    termEn: "matrix",
    termZhCn: "矩阵",
    termZhHk: "矩陣",
  },
  {
    definition: {
      en: "An augmented matrix places the coefficient matrix and constant column in one table so you can row-reduce the whole system at once.",
      "zh-cn": "增广矩阵把系数矩阵和常数列放在同一张表里，方便一起做行变换。",
      "zh-hk": "增廣矩陣把係數矩陣和常數列放在同一張表裡，方便一起做行變換。",
    },
    id: "augmented-matrix",
    sourceRefs: [
      { file: "reference/MATH1030/MATH1030-Notes.pdf", pages: "§2.1-§2.2" },
      { file: "reference/MATH1030/Practice Set 1_Set review and Solving Linear system.pdf" },
    ],
    termEn: "augmented matrix",
    termZhCn: "增广矩阵",
    termZhHk: "增廣矩陣",
  },
  {
    definition: {
      en: "A row operation changes a system into an equivalent one by swapping rows, scaling a row, or adding a multiple of one row to another row.",
      "zh-cn": "行变换通过交换两行、缩放一行，或用一行的倍数加到另一行，把方程组改写成等价形式。",
      "zh-hk": "行變換透過交換兩行、縮放一行，或用一行的倍數加到另一行，把方程組改寫成等價形式。",
    },
    id: "row-operation",
    sourceRefs: [
      { file: "reference/MATH1030/MATH1030-Notes.pdf", pages: "§2.2" },
      { file: "reference/MATH1030/Practice Set 1_Set review and Solving Linear system.pdf", note: "Questions 6-8" },
    ],
    termEn: "row operation",
    termZhCn: "行变换",
    termZhHk: "行變換",
  },
  {
    definition: {
      en: "Reduced row-echelon form, or RREF, is the simplified matrix form that makes pivots and free variables easy to read.",
      "zh-cn": "最简行阶梯形矩阵（RREF）是方便读出主元和自由变量的标准化矩阵形式。",
      "zh-hk": "最簡行階梯形矩陣（RREF）是方便讀出主元和自由變量的標準化矩陣形式。",
    },
    id: "rref",
    sourceRefs: [
      { file: "reference/MATH1030/MATH1030-Notes.pdf", pages: "§2.2-§2.3" },
      { file: "reference/MATH1030/1030gi-n02-03.pdf" },
    ],
    termEn: "RREF",
    termZhCn: "最简行阶梯形",
    termZhHk: "最簡行階梯形",
  },
  {
    definition: {
      en: "A solution set is the collection of every vector or number that satisfies the whole system.",
      "zh-cn": "解集是满足整个方程组的所有向量或数字组成的集合。",
      "zh-hk": "解集是滿足整個方程組的所有向量或數字組成的集合。",
    },
    id: "solution-set",
    sourceRefs: [
      { file: "reference/MATH1030/MATH1030-Notes.pdf", pages: "§1.1-§1.2, §2.3" },
      { file: "reference/MATH1030/1030efghi-tutorial-week02.pdf" },
    ],
    termEn: "solution set",
    termZhCn: "解集",
    termZhHk: "解集",
  },
  {
    definition: {
      en: "An invertible matrix has a matrix inverse, so multiplying by that inverse recovers the identity matrix.",
      "zh-cn": "可逆矩阵拥有逆矩阵，与它的逆相乘会得到单位矩阵。",
      "zh-hk": "可逆矩陣擁有逆矩陣，與它的逆相乘會得到單位矩陣。",
    },
    id: "invertible-matrix",
    sourceRefs: [
      { file: "reference/MATH1030/MATH1030-Notes.pdf", pages: "§5.1-§5.3" },
      { file: "reference/MATH1030/Practice Set 4_Invertible Matrix.pdf" },
    ],
    termEn: "invertible matrix",
    termZhCn: "可逆矩阵",
    termZhHk: "可逆矩陣",
  },
];

export function getGlossaryEntry(id: string) {
  return glossaryEntries.find((entry) => entry.id === id) ?? null;
}
