import type { LocalizedText, ProblemSchema } from "./types";

function text(en: string, zhHk: string, zhCn: string): LocalizedText {
  return {
    en,
    "zh-cn": zhCn,
    "zh-hk": zhHk,
  };
}

export const textbookProblemBank: Record<string, ProblemSchema> = {
  "demo.math1030.rref-pivot-column": {
    accessTier: "FREE",
    solutionAccessTier: "FREE",
    id: "demo.math1030.rref-pivot-column",
    type: "MCQ",
    courseId: "math1030",
    chapterId: "matrices",
    unitId: "math1030.matrices.gaussian-elimination-rref",
    prompt: text(
      "In RREF, which statement is always true about pivot columns of a matrix A?",
      "在 RREF 中，關於矩陣 A 的樞軸列，下列哪一項必定正確？",
      "在 RREF 中，关于矩阵 A 的主元列，下列哪一项必定正确？"
    ),
    choices: [
      {
        id: "a",
        text: text(
          "They form a basis for the null space of A.",
          "它們構成 A 的零空間的一組基。",
          "它们构成 A 的零空间的一组基。"
        ),
      },
      {
        id: "b",
        text: text(
          "They correspond to leading 1 positions in nonzero rows.",
          "它們對應於非零列中的首 1 位置。",
          "它们对应于非零行中的首 1 位置。"
        ),
      },
      {
        id: "c",
        text: text(
          "Every column is a pivot column.",
          "每一列都是樞軸列。",
          "每一列都是主元列。"
        ),
      },
      {
        id: "d",
        text: text(
          "Pivot columns can only appear in the last two columns.",
          "樞軸列只會出現在最後兩列。",
          "主元列只会出现在最后两列。"
        ),
      },
    ],
    correctAnswer: {
      choiceId: "b",
    },
    hints: [
      text(
        "Track where each leading 1 appears after row-reduction. Pivot columns are determined by those leading entries.",
        "先追蹤化簡後每個首 1 的位置。樞軸列就是由這些首項決定的。",
        "先追踪化简后每个首 1 的位置。主元列就是由这些首项决定的。"
      ),
    ],
    solutionSteps: [
      text(
        "Compute the reduced row echelon form and identify each nonzero row.",
        "先把矩陣化成最簡行階梯形，並標出每一條非零列。",
        "先把矩阵化成最简行阶梯形，并标出每一条非零行。"
      ),
      text(
        "In each nonzero row, find its first nonzero entry: this is a leading 1 in RREF.",
        "在每條非零列中找第一個非零項；在 RREF 裡它就是首 1。",
        "在每条非零行中找第一个非零项；在 RREF 里它就是首 1。"
      ),
      text(
        "The columns containing these leading 1 entries are pivot columns.",
        "含有這些首 1 的列，就是樞軸列。",
        "含有这些首 1 的列，就是主元列。"
      ),
      text(
        "Therefore the defining property is that pivot columns correspond to leading 1 positions in nonzero rows.",
        "所以樞軸列的定義性特徵，就是它們對應於非零列中的首 1 位置。",
        "所以主元列的定义性特征，就是它们对应于非零行中的首 1 位置。"
      ),
    ],
    skillTags: ["rref", "pivot-columns", "row-reduction"],
  },
  "demo.math1090.quantifier-negation": {
    accessTier: "FREE",
    solutionAccessTier: "FREE",
    id: "demo.math1090.quantifier-negation",
    type: "FILL_IN_BLANK",
    courseId: "math1090",
    chapterId: "logic",
    unitId: "math1090.logic.quantifiers-negation",
    prompt: text(
      "Fill in the blank: The negation of \"for all x, P(x)\" is \"there exists x such that ____\".",
      "填空：\"對所有 x，P(x)\" 的否定是 \"存在某個 x，使得 ____\"。",
      "填空：\"对所有 x，P(x)\" 的否定是 \"存在某个 x，使得 ____\"。"
    ),
    correctAnswer: {
      value: "not P(x)",
      equivalentValues: ["¬P(x)", "~P(x)", "!P(x)"],
      equivalence: [{ type: "trimmed" }, { type: "symbolic" }, { type: "case-insensitive" }],
    },
    hints: [
      text(
        "When negating a universal quantifier, switch ∀ to ∃ and negate the predicate.",
        "否定全稱量詞時，要把 ∀ 變成 ∃，並同時否定述詞。",
        "否定全称量词时，要把 ∀ 变成 ∃，并同时否定谓词。"
      ),
    ],
    solutionSteps: [
      text(
        "Start with the statement ∀x P(x).",
        "先從命題 ∀x P(x) 開始。",
        "先从命题 ∀x P(x) 开始。"
      ),
      text(
        "Apply quantifier negation rule: ¬(∀x P(x)) ≡ ∃x ¬P(x).",
        "套用量詞否定法則：¬(∀x P(x)) ≡ ∃x ¬P(x)。",
        "套用量词否定法则：¬(∀x P(x)) ≡ ∃x ¬P(x)。"
      ),
      text(
        "So inside the blank, the predicate must be negated.",
        "所以空格裡必須放入被否定的述詞。",
        "所以空格里必须放入被否定的谓词。"
      ),
      text(
        "Hence the blank is \"not P(x)\" (equivalently ¬P(x)).",
        "因此答案是 \"not P(x)\"，等價寫法是 ¬P(x)。",
        "因此答案是 \"not P(x)\"，等价写法是 ¬P(x)。"
      ),
    ],
    skillTags: ["quantifiers", "negation", "logic-equivalence"],
  },
  "checkpoint.math1030.invertible-rank": {
    id: "checkpoint.math1030.invertible-rank",
    type: "MCQ",
    accessTier: "MEMBER",
    solutionAccessTier: "MEMBER",
    courseId: "math1030",
    chapterId: "invertibility",
    unitId: "math1030.invertibility.invertible-matrices",
    prompt: text(
      "If A is invertible n×n, which statement must hold?",
      "若 A 是可逆的 n×n 矩陣，哪個敘述必定成立？",
      "若 A 是可逆的 n×n 矩阵，哪个叙述必定成立？"
    ),
    choices: [
      {
        id: "a",
        text: text(
          "rank(A)=n and Ax=b has a unique solution for every b in R^n.",
          "rank(A)=n，而且對每個 b∈R^n，Ax=b 都有唯一解。",
          "rank(A)=n，而且对每个 b∈R^n，Ax=b 都有唯一解。"
        ),
      },
      {
        id: "b",
        text: text(
          "rank(A)=n-1 and Ax=b always has infinitely many solutions.",
          "rank(A)=n−1，而且 Ax=b 永遠有無限多個解。",
          "rank(A)=n−1，而且 Ax=b 永远有无限多个解。"
        ),
      },
      {
        id: "c",
        text: text(
          "A must have two identical rows.",
          "A 必定有兩條完全相同的列。",
          "A 必定有两条完全相同的行。"
        ),
      },
      {
        id: "d",
        text: text(
          "det(A)=0.",
          "det(A)=0。",
          "det(A)=0。"
        ),
      },
    ],
    correctAnswer: { choiceId: "a" },
    hints: [
      text(
        "Use the equivalent statements for invertibility: full rank, pivots in each row and column, and unique solvability.",
        "想想可逆矩陣的等價敘述：滿秩、每行每列都有樞軸，以及對每個 b 都唯一可解。",
        "想想可逆矩阵的等价叙述：满秩、每行每列都有主元，以及对每个 b 都唯一可解。"
      ),
    ],
    solutionSteps: [
      text(
        "For an n×n matrix, invertibility implies full rank n.",
        "對於 n×n 矩陣，可逆必定推出 rank(A)=n。",
        "对于 n×n 矩阵，可逆必定推出 rank(A)=n。"
      ),
      text(
        "Full rank means no free variables in Ax=b for any b, so each system is uniquely solvable.",
        "滿秩表示在 Ax=b 中沒有自由變量，所以每個系統都只有唯一解。",
        "满秩表示在 Ax=b 中没有自由变量，所以每个系统都只有唯一解。"
      ),
      text(
        "Therefore statement (a) is the only one consistent with invertibility.",
        "因此，只有選項 (a) 與可逆性相容。",
        "因此，只有选项 (a) 与可逆性相容。"
      ),
    ],
    skillTags: ["invertible-matrix", "rank", "equivalent-statements"],
  },
  "checkpoint.math1030.null-space-dimension": {
    id: "checkpoint.math1030.null-space-dimension",
    type: "FILL_IN_BLANK",
    accessTier: "MEMBER",
    solutionAccessTier: "MEMBER",
    courseId: "math1030",
    chapterId: "vector-spaces",
    unitId: "math1030.vector-spaces.column-space-row-space-rank",
    prompt: text(
      "Fill in the blank: For an m×n matrix A, rank(A) + nullity(A) = ____.",
      "填空：對一個 m×n 矩陣 A，rank(A) + nullity(A) = ____。",
      "填空：对一个 m×n 矩阵 A，rank(A) + nullity(A) = ____。"
    ),
    correctAnswer: {
      value: "n",
      equivalentValues: ["number of columns", "the number of columns of A"],
      equivalence: [{ type: "trimmed" }, { type: "case-insensitive" }],
    },
    hints: [
      text(
        "Use the rank-nullity theorem and identify which size parameter appears on the right-hand side.",
        "用秩—零度定理，留意右邊出現的是哪個尺寸參數。",
        "用秩—零度定理，留意右边出现的是哪个尺寸参数。"
      ),
    ],
    solutionSteps: [
      text(
        "Rank-nullity says dimension(column space) + dimension(null space) equals the number of variables.",
        "秩—零度定理指出：列空間的維數加上零空間的維數，等於變量的總數。",
        "秩—零度定理指出：列空间的维数加上零空间的维数，等于变量的总数。"
      ),
      text(
        "For A with n columns, there are n variables in Ax=0.",
        "若 A 有 n 列，則方程 Ax=0 中就有 n 個變量。",
        "若 A 有 n 列，则方程 Ax=0 中就有 n 个变量。"
      ),
      text(
        "So rank(A) + nullity(A) = n.",
        "所以 rank(A) + nullity(A) = n。",
        "所以 rank(A) + nullity(A) = n。"
      ),
    ],
    skillTags: ["rank-nullity", "null-space", "dimension"],
  },
};

export function getProblemById(problemId: string) {
  return textbookProblemBank[problemId] ?? null;
}

export function getProblemsForUnit(unitId: string) {
  return Object.values(textbookProblemBank).filter((problem) => problem.unitId === unitId);
}
