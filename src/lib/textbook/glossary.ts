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
    cantoneseNote: "香港課堂通常直接講「自然數」。",
    definition: {
      en: "The natural numbers are the counting numbers that start from 0 and continue by successor.",
      "zh-cn": "自然数是从 0 开始，并通过后继不断延伸的计数数。",
      "zh-hk": "自然數是從 0 開始，並透過後繼不斷延伸的計數數。",
    },
    id: "natural-number",
    sourceRefs: [
      { file: "reference/MATH1090/MATH1090_Lecture_Notes_Mar26.pdf", pages: "§3.1-§3.2" },
      { file: "reference/MATH1090/MATH1090_Worksheet4.pdf" },
    ],
    termEn: "natural number",
    termZhCn: "自然数",
    termZhHk: "自然數",
  },
  {
    notationNote: "The successor map is written `S(x)`.",
    definition: {
      en: "Peano's axioms describe a model of the natural numbers using 0, successor, and induction.",
      "zh-cn": "皮亚诺公理用 0、后继和归纳法来描述自然数模型。",
      "zh-hk": "皮亞諾公理用 0、後繼和歸納法來描述自然數模型。",
    },
    id: "peano-axiom",
    sourceRefs: [
      { file: "reference/MATH1090/MATH1090_Lecture_Notes_Mar26.pdf", pages: "§3.2" },
      { file: "reference/MATH1090/MATH1090_Worksheet4.pdf", note: "Exercise 3" },
    ],
    termEn: "Peano axiom",
    termZhCn: "皮亚诺公理",
    termZhHk: "皮亞諾公理",
  },
  {
    definition: {
      en: "Mathematical induction is a proof method that starts from a base case and then proves the successor step.",
      "zh-cn": "数学归纳法是一种证明方法：先证基本情况，再证后继步骤。",
      "zh-hk": "數學歸納法是一種證明方法：先證基本情況，再證後繼步驟。",
    },
    id: "induction",
    sourceRefs: [
      { file: "reference/MATH1090/MATH1090_Lecture_Notes_Mar26.pdf", pages: "§3.2-§3.4" },
      { file: "reference/MATH1090/MATH1090_Worksheet4.pdf", note: "Exercises 1-3" },
    ],
    termEn: "mathematical induction",
    termZhCn: "数学归纳法",
    termZhHk: "數學歸納法",
  },
  {
    definition: {
      en: "A recursive definition gives a base case and then defines later values from earlier ones.",
      "zh-cn": "递归定义先给出基本情况，再用较早的值定义后面的值。",
      "zh-hk": "遞歸定義先給出基本情況，再用較早的值定義後面的值。",
    },
    id: "recursive-definition",
    sourceRefs: [
      { file: "reference/MATH1090/MATH1090_Lecture_Notes_Mar26.pdf", pages: "§3.3" },
      { file: "reference/MATH1090/MATH1090_Worksheet4.pdf", note: "Exercise 1" },
    ],
    termEn: "recursive definition",
    termZhCn: "递归定义",
    termZhHk: "遞歸定義",
  },
  {
    definition: {
      en: "An integer is one of the whole numbers ..., -2, -1, 0, 1, 2, ...",
      "zh-cn": "整数是 ..., -2, -1, 0, 1, 2, ... 这些整数。",
      "zh-hk": "整數是 ..., -2, -1, 0, 1, 2, ... 這些整數。",
    },
    id: "integer",
    sourceRefs: [
      { file: "reference/MATH1090/MATH1090_Lecture_Notes_Mar26.pdf", pages: "§3.5" },
      { file: "reference/MATH1090/MATH1090_midterm_review_notes_final.tex", note: "Chapter 3 review" },
    ],
    termEn: "integer",
    termZhCn: "整数",
    termZhHk: "整數",
  },
  {
    definition: {
      en: "An equivalence relation is a relation that is reflexive, symmetric, and transitive.",
      "zh-cn": "等价关系同时满足自反、对称和传递。",
      "zh-hk": "等價關係同時滿足自反、對稱和傳遞。",
    },
    id: "equivalence-relation",
    sourceRefs: [
      { file: "reference/MATH1090/MATH1090_Lecture_Notes_Mar26.pdf", pages: "§2.10, §3.5-§3.6" },
      { file: "reference/MATH1090/MATH1090_Worksheet5.pdf", note: "Exercise 1" },
    ],
    termEn: "equivalence relation",
    termZhCn: "等价关系",
    termZhHk: "等價關係",
  },
  {
    definition: {
      en: "An equivalence class is the collection of all elements that are equivalent to a chosen element.",
      "zh-cn": "等价类是与某个选定元素等价的所有元素组成的集合。",
      "zh-hk": "等價類是與某個選定元素等價的所有元素組成的集合。",
    },
    id: "equivalence-class",
    sourceRefs: [
      { file: "reference/MATH1090/MATH1090_Lecture_Notes_Mar26.pdf", pages: "§2.10, §3.5-§3.6" },
      { file: "reference/MATH1090/MATH1090_Worksheet4.pdf", note: "Exercise 3" },
    ],
    termEn: "equivalence class",
    termZhCn: "等价类",
    termZhHk: "等價類",
  },
  {
    definition: {
      en: "A rational number is an equivalence class of pairs that behaves like a fraction.",
      "zh-cn": "有理数是按分数方式运作的一类等价类。",
      "zh-hk": "有理數是按分數方式運作的一類等價類。",
    },
    id: "rational-number",
    sourceRefs: [
      { file: "reference/MATH1090/MATH1090_Lecture_Notes_Mar26.pdf", pages: "§3.6" },
      { file: "reference/MATH1090/MATH1090_Worksheet5.pdf" },
    ],
    termEn: "rational number",
    termZhCn: "有理数",
    termZhHk: "有理數",
  },
  {
    notationNote: "A formula is well-defined only if it gives the same output for every equivalent representative.",
    definition: {
      en: "A well-defined operation gives the same result no matter which representative you choose.",
      "zh-cn": "良定运算无论选哪个代表元，结果都一样。",
      "zh-hk": "良定運算無論選哪個代表元，結果都一樣。",
    },
    id: "well-defined-operation",
    sourceRefs: [
      { file: "reference/MATH1090/MATH1090_Lecture_Notes_Mar26.pdf", pages: "§3.5-§3.6" },
      { file: "reference/MATH1090/MATH1090_Worksheet5.pdf", note: "Exercise 1" },
    ],
    termEn: "well-defined operation",
    termZhCn: "良定运算",
    termZhHk: "良定運算",
  },
  {
    definition: {
      en: "An irrational number is a real number that is not rational.",
      "zh-cn": "无理数是不能写成有理数的实数。",
      "zh-hk": "無理數是不能寫成有理數的實數。",
    },
    id: "irrational-number",
    sourceRefs: [
      { file: "reference/MATH1090/MATH1090_Lecture_Notes_Mar26.pdf", pages: "§4.11" },
      { file: "reference/MATH1090/MATH1090_Worksheet5.pdf", note: "Exercises 3-4" },
    ],
    termEn: "irrational number",
    termZhCn: "无理数",
    termZhHk: "無理數",
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
      en: "An identity matrix is a square matrix with 1s on the main diagonal and 0s elsewhere, so multiplying by it leaves vectors or matrices unchanged.",
      "zh-cn": "单位矩阵是在主对角线放 1、其余位置放 0 的方阵；与它相乘不会改变向量或矩阵。",
      "zh-hk": "單位矩陣是在主對角線放 1、其餘位置放 0 的方陣；與它相乘不會改變向量或矩陣。",
    },
    id: "identity-matrix",
    sourceRefs: [
      { file: "reference/MATH1030/MATH1030-Notes.pdf", pages: "§3.2-§3.4" },
      { file: "reference/MATH1030/1030gi-n01-02.pdf" },
    ],
    termEn: "identity matrix",
    termZhCn: "单位矩阵",
    termZhHk: "單位矩陣",
  },
  {
    definition: {
      en: "The transpose of a matrix is formed by swapping its rows and columns.",
      "zh-cn": "矩阵的转置是通过交换它的行和列得到的新矩阵。",
      "zh-hk": "矩陣的轉置是透過交換它的行和列得到的新矩陣。",
    },
    id: "transpose",
    sourceRefs: [
      { file: "reference/MATH1030/MATH1030-Notes.pdf", pages: "§3.3" },
      { file: "reference/MATH1030/1030gi-n01-03.pdf" },
    ],
    termEn: "transpose",
    termZhCn: "转置",
    termZhHk: "轉置",
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
  {
    definition: {
      en: "The determinant of a square matrix is the scalar that records how the matrix changes signed area, signed volume, and invertibility.",
      "zh-cn": "方阵的行列式是一个标量，用来记录这个矩阵怎样改变带符号面积、带符号体积，以及是否可逆。",
      "zh-hk": "方陣的行列式是一個純量，用來記錄這個矩陣怎樣改變帶符號面積、帶符號體積，以及是否可逆。",
    },
    id: "determinant",
    sourceRefs: [
      { file: "reference/MATH1030/MATH1030-Notes.pdf", pages: "§7.1-§7.2" },
      { file: "reference/MATH1030/1030gi-n06-01.pdf" },
    ],
    termEn: "determinant",
    termZhCn: "行列式",
    termZhHk: "行列式",
  },
  {
    definition: {
      en: "The minor M_ij is the determinant of the smaller matrix obtained by deleting row i and column j.",
      "zh-cn": "子式 M_ij 是删去第 i 行和第 j 列以后所得到较小方阵的行列式。",
      "zh-hk": "子式 M_ij 是刪去第 i 行和第 j 列以後所得到較小方陣的行列式。",
    },
    id: "minor",
    notationNote: "`M_{ij}` denotes the minor attached to entry `a_{ij}`.",
    sourceRefs: [
      { file: "reference/MATH1030/MATH1030-Notes.pdf", pages: "§7.1" },
      { file: "reference/MATH1030/1030gi-n06-01.pdf", note: "Sub-matrix and determinant expansion definitions" },
    ],
    termEn: "minor",
    termZhCn: "子式",
    termZhHk: "子式",
  },
  {
    definition: {
      en: "The cofactor A_ij is the signed minor (-1)^(i+j) M_ij used in determinant expansion and adjoint formulas.",
      "zh-cn": "余因子 A_ij 是带符号的子式 (-1)^(i+j) M_ij，用在行列式展开与伴随矩阵公式里。",
      "zh-hk": "餘因子 A_ij 是帶符號的子式 (-1)^(i+j) M_ij，用在行列式展開與伴隨矩陣公式裡。",
    },
    id: "cofactor",
    notationNote: "`A_{ij}=(-1)^{i+j}M_{ij}` is the cofactor of entry `a_{ij}`.",
    sourceRefs: [
      { file: "reference/MATH1030/MATH1030-Notes.pdf", pages: "§7.1, §7.4" },
      { file: "reference/MATH1030/1030gi-n06-01.pdf", note: "Expansion along rows" },
      { file: "reference/MATH1030/1030gi-n06-03.pdf", note: "Appendix on cofactors and adjoint" },
    ],
    termEn: "cofactor",
    termZhCn: "余因子",
    termZhHk: "餘因子",
  },
  {
    definition: {
      en: "The adjoint matrix adj(A) is the transpose of the cofactor matrix, and for det(A) ≠ 0 it gives the inverse formula A^(-1) = (1/det(A)) adj(A).",
      "zh-cn": "伴随矩阵 adj(A) 是余因子矩阵的转置；当 det(A) ≠ 0 时，它给出逆矩阵公式 A^(-1) = (1/det(A)) adj(A)。",
      "zh-hk": "伴隨矩陣 adj(A) 是餘因子矩陣的轉置；當 det(A) ≠ 0 時，它給出逆矩陣公式 A^(-1) = (1/det(A)) adj(A)。",
    },
    id: "adjoint-matrix",
    notationNote: "Many textbooks now say 'adjugate'; this note set keeps the source's `adj(A)` notation and 'adjoint matrix' wording.",
    sourceRefs: [
      { file: "reference/MATH1030/MATH1030-Notes.pdf", pages: "§7.4.1" },
      { file: "reference/MATH1030/1030gi-n06-03.pdf", note: "Appendix on adjoint and inverse" },
    ],
    termEn: "adjoint matrix",
    termZhCn: "伴随矩阵",
    termZhHk: "伴隨矩陣",
  },
  {
    definition: {
      en: "Cramer's rule solves an invertible square system Ax=b by replacing one column at a time with b and dividing determinants.",
      "zh-cn": "克拉默法则通过把可逆方阵系统 Ax=b 的某一列依次换成 b，再比较行列式来求各坐标。",
      "zh-hk": "克拉默法則透過把可逆方陣系統 Ax=b 的某一列依次換成 b，再比較行列式來求各座標。",
    },
    id: "cramers-rule",
    notationNote: "For an invertible matrix A, the rule reads `x_j = det(M_j)/det(A)`.",
    sourceRefs: [
      { file: "reference/MATH1030/MATH1030-Notes.pdf", pages: "§7.4.2" },
      { file: "reference/MATH1030/1030gi-n06-03.pdf", note: "Appendix deriving Cramer's rule" },
    ],
    termEn: "Cramer's rule",
    termZhCn: "克拉默法则",
    termZhHk: "克拉默法則",
  },
  {
    definition: {
      en: "A null space is the set of all vectors sent to 0 by a given matrix.",
      "zh-cn": "零空间是被某个矩阵送到 0 的所有向量组成的集合。",
      "zh-hk": "零空間是被某個矩陣送到 0 的所有向量組成的集合。",
    },
    id: "null-space",
    sourceRefs: [
      { file: "reference/MATH1030/MATH1030-Notes.pdf", pages: "§4.1, §6.6" },
      { file: "reference/MATH1030/1030gi-n04-03.pdf" },
    ],
    termEn: "null space",
    termZhCn: "零空间",
    termZhHk: "零空間",
  },
  {
    definition: {
      en: "The column space of a matrix is the span of its columns; equivalently, it is the set of all outputs Ax.",
      "zh-cn": "矩阵的列空间是它所有列向量的张成；等价地，它是所有输出 Ax 组成的集合。",
      "zh-hk": "矩陣的列空間是它所有列向量的張成；等價地，它是所有輸出 Ax 組成的集合。",
    },
    id: "column-space",
    sourceRefs: [
      { file: "reference/MATH1030/MATH1030-Notes.pdf", pages: "§6.6" },
      { file: "reference/MATH1030/1030gi-n05-04.pdf" },
    ],
    termEn: "column space",
    termZhCn: "列空间",
    termZhHk: "列空間",
  },
  {
    definition: {
      en: "The row space of a matrix is the span of its rows; equivalently, it is the column space of the transpose.",
      "zh-cn": "矩阵的行空间是它所有行向量的张成；等价地，它就是转置矩阵的列空间。",
      "zh-hk": "矩陣的行空間是它所有行向量的張成；等價地，它就是轉置矩陣的列空間。",
    },
    id: "row-space",
    sourceRefs: [
      { file: "reference/MATH1030/MATH1030-Notes.pdf", pages: "§6.6" },
      { file: "reference/MATH1030/1030gi-n05-04.pdf" },
    ],
    termEn: "row space",
    termZhCn: "行空间",
    termZhHk: "行空間",
  },
  {
    definition: {
      en: "A nonsingular matrix is a square matrix whose homogeneous system has only the trivial solution and is therefore invertible.",
      "zh-cn": "非奇异矩阵是齐次方程组只有平凡解、因此也可逆的方阵。",
      "zh-hk": "非奇異矩陣是齊次方程組只有平凡解、因此亦可逆的方陣。",
    },
    id: "nonsingular-matrix",
    sourceRefs: [
      { file: "reference/MATH1030/MATH1030-Notes.pdf", pages: "§4.3, §5.2" },
      { file: "reference/MATH1030/1030gi-n03-03.pdf" },
    ],
    termEn: "nonsingular matrix",
    termZhCn: "非奇异矩阵",
    termZhHk: "非奇異矩陣",
  },
  {
    cantoneseNote: "老師常會講「要先證明定義良好」，意思是不可以依賴代表元。",
    definition: {
      en: "A definition is well defined if the final object or value does not depend on which representative you chose to describe it.",
      "zh-cn": "若最后得到的对象或数值不依赖你选了哪个代表元，这个定义就是良定义的。",
      "zh-hk": "若最後得到的對象或數值不依賴你選了哪個代表元，這個定義就是良定義的。",
    },
    id: "well-defined",
    sourceRefs: [
      { file: "reference/MATH1090/MATH1090_midterm_review_notes_final.tex", pages: "§3.1, Exercises 34 and 37" },
      { file: "reference/MATH1090/MATH1090_Worksheet5.pdf", note: "Exercise 1" },
    ],
    termEn: "well defined",
    termZhCn: "良定义",
    termZhHk: "良定義",
  },
  {
    definition: {
      en: "The supremum of a set is its least upper bound: it is an upper bound, and no smaller upper bound exists.",
      "zh-cn": "上确界是一个集合的最小上界：它本身是上界，而且没有更小的上界。",
      "zh-hk": "上確界是一個集合的最小上界：它本身是上界，而且沒有更小的上界。",
    },
    id: "supremum",
    notationNote: "`sup(X)` denotes the supremum of the set X.",
    sourceRefs: [
      { file: "reference/MATH1090/MATH1090_midterm_review_notes_final.tex", pages: "Worksheet 5 Exercise 3 and §3.7" },
      { file: "reference/MATH1090/MATH1090_Worksheet5.pdf", note: "Exercises 3 and 4" },
    ],
    termEn: "supremum",
    termZhCn: "上确界",
    termZhHk: "上確界",
  },
  {
    cantoneseNote: "香港多數直接讀作「向量空間」。",
    definition: {
      en: "A vector space is a set of vectors with addition and scalar multiplication that satisfy the vector-space axioms.",
      "zh-cn": "向量空间是一个带有向量加法和数乘，并满足向量空间公理的集合。",
      "zh-hk": "向量空間是一個帶有向量加法和數乘，並滿足向量空間公理的集合。",
    },
    id: "vector-space",
    sourceRefs: [
      { file: "reference/MATH1030/MATH1030-Notes.pdf", pages: "§6.1" },
      { file: "reference/MATH1030/1030efghi-tutorial-week08.pdf", note: "Advice section (VsA1-VsD2)" },
    ],
    termEn: "vector space",
    termZhCn: "向量空间",
    termZhHk: "向量空間",
  },
  {
    definition: {
      en: "A subspace is a subset of a vector space that contains the zero vector and is closed under addition and scalar multiplication.",
      "zh-cn": "子空间是向量空间的一个子集，它包含零向量，并且对加法和数乘封闭。",
      "zh-hk": "子空間是向量空間的一個子集，它包含零向量，並且對加法和數乘封閉。",
    },
    id: "subspace",
    sourceRefs: [
      { file: "reference/MATH1030/MATH1030-Notes.pdf", pages: "§6.2" },
      { file: "reference/MATH1030/1030efghi-tutorial-week08.pdf", note: "Advice section (Ssp1-Ssp2b) and Question 1" },
    ],
    termEn: "subspace",
    termZhCn: "子空间",
    termZhHk: "子空間",
  },
  {
    definition: {
      en: "A linear combination is an expression of the form a1u1 + a2u2 + ... + anun, where the coefficients are scalars.",
      "zh-cn": "线性组合是形如 a1u1 + a2u2 + ... + anun 的表达式，其中系数都是标量。",
      "zh-hk": "線性組合是形如 a1u1 + a2u2 + ... + anun 的表達式，其中係數都是標量。",
    },
    id: "linear-combination",
    sourceRefs: [
      { file: "reference/MATH1030/MATH1030-Notes.pdf", pages: "§6.3" },
    ],
    termEn: "linear combination",
    termZhCn: "线性组合",
    termZhHk: "線性組合",
  },
  {
    definition: {
      en: "The span of a collection of vectors is the set of all linear combinations of those vectors.",
      "zh-cn": "一个向量组的张成是由这些向量所有线性组合组成的集合。",
      "zh-hk": "一組向量的張成是由這些向量所有線性組合組成的集合。",
    },
    id: "span",
    sourceRefs: [
      { file: "reference/MATH1030/MATH1030-Notes.pdf", pages: "§6.3" },
    ],
    termEn: "span",
    termZhCn: "张成",
    termZhHk: "張成",
  },
  {
    definition: {
      en: "Vectors are linearly independent when the only way to combine them to get 0 is to use all-zero coefficients.",
      "zh-cn": "如果把这些向量线性组合成 0 的唯一办法是所有系数都等于 0，那么它们线性无关。",
      "zh-hk": "如果把這些向量線性組合成 0 的唯一方法是所有係數都等於 0，那麼它們線性無關。",
    },
    id: "linear-independence",
    sourceRefs: [
      { file: "reference/MATH1030/MATH1030-Notes.pdf", pages: "§6.4" },
    ],
    termEn: "linear independence",
    termZhCn: "线性无关",
    termZhHk: "線性無關",
  },
  {
    definition: {
      en: "A basis is a set of vectors that is linearly independent and still spans the whole space.",
      "zh-cn": "一组基底既线性无关，又能张成整个空间。",
      "zh-hk": "一組基底既線性無關，又能張成整個空間。",
    },
    id: "basis",
    sourceRefs: [
      { file: "reference/MATH1030/MATH1030-Notes.pdf", pages: "§6.5" },
    ],
    termEn: "basis",
    termZhCn: "基底",
    termZhHk: "基底",
  },
  {
    definition: {
      en: "The dimension of a vector space is the number of vectors in any basis of that space.",
      "zh-cn": "向量空间的维数是它任意一组基底所含向量的个数。",
      "zh-hk": "向量空間的維數是它任意一組基底所含向量的個數。",
    },
    id: "dimension",
    sourceRefs: [
      { file: "reference/MATH1030/MATH1030-Notes.pdf", pages: "§6.5" },
    ],
    termEn: "dimension",
    termZhCn: "维数",
    termZhHk: "維數",
  },
  {
    definition: {
      en: "The rank of a matrix is the common dimension of its column space and row space.",
      "zh-cn": "矩阵的秩是它的列空间和行空间共同的维数。",
      "zh-hk": "矩陣的秩是它的列空間和行空間共同的維數。",
    },
    id: "rank",
    sourceRefs: [
      { file: "reference/MATH1030/MATH1030-Notes.pdf", pages: "§6.6" },
      { file: "reference/MATH1030/1030gi-n05-04.pdf" },
    ],
    termEn: "rank",
    termZhCn: "秩",
    termZhHk: "秩",
  },
];

export function getGlossaryEntry(id: string) {
  return glossaryEntries.find((entry) => entry.id === id) ?? null;
}
