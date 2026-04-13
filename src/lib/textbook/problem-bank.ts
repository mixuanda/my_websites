import type { LocalizedText, ProblemSchema } from "./types";

function text(en: string, zhHk: string, zhCn: string): LocalizedText {
  return {
    en,
    "zh-cn": zhCn,
    "zh-hk": zhHk,
  };
}

const unlimited = null;

export const textbookProblemBank: Record<string, ProblemSchema> = {
  "demo.math1030.rref-pivot-column": {
    accessTier: "FREE",
    id: "demo.math1030.rref-pivot-column",
    type: "MCQ",
    courseId: "math1030",
    chapterId: "matrices",
    unitId: "math1030.matrices.gaussian-elimination-rref",
    inputMode: "text",
    maxAttempts: unlimited,
    points: 1,
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
    previewExamples: [
      text(
        "Preview shows which choice label you are about to submit.",
        "Preview 會顯示你即將提交的選項。",
        "Preview 会显示你即将提交的选项。"
      ),
    ],
    showCorrectAnswerPolicy: "after-submit",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "FREE",
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
    id: "demo.math1090.quantifier-negation",
    type: "FILL_IN_BLANK",
    courseId: "math1090",
    chapterId: "logic",
    unitId: "math1090.logic.quantifiers-negation",
    inputMode: "math-expression",
    maxAttempts: unlimited,
    points: 1,
    prompt: text(
      "Fill in the blank: The negation of \"for all x, P(x)\" is \"there exists x such that ____\".",
      "填空：\"對所有 x，P(x)\" 的否定是 \"存在某個 x，使得 ____\"。",
      "填空：\"对所有 x，P(x)\" 的否定是 \"存在某个 x，使得 ____\"。"
    ),
    correctAnswer: {
      value: "not P(x)",
      equivalentValues: ["¬P(x)", "~P(x)", "!P(x)"],
      equivalence: [
        { type: "trimmed" },
        { type: "symbolic" },
        { type: "case-insensitive" },
      ],
    },
    hints: [
      text(
        "When negating a universal quantifier, switch ∀ to ∃ and negate the predicate.",
        "否定全稱量詞時，要把 ∀ 變成 ∃，並同時否定述詞。",
        "否定全称量词时，要把 ∀ 变成 ∃，并同时否定谓词。"
      ),
    ],
    previewExamples: [
      text(
        "Try `not P(x)` or `¬P(x)`.",
        "可輸入 `not P(x)` 或 `¬P(x)`。",
        "可输入 `not P(x)` 或 `¬P(x)`。"
      ),
    ],
    showCorrectAnswerPolicy: "after-submit",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "FREE",
    syntaxGuidance: text(
      "You can enter a short symbolic answer such as `¬P(x)` or an equivalent phrase.",
      "可以輸入簡短符號答案，例如 `¬P(x)`，或者語義等價的短句。",
      "可以输入简短符号答案，例如 `¬P(x)`，或者语义等价的短句。"
    ),
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
    accessTier: "MEMBER",
    id: "checkpoint.math1030.invertible-rank",
    type: "MCQ",
    courseId: "math1030",
    chapterId: "invertibility",
    unitId: "math1030.invertibility.invertible-matrices",
    inputMode: "text",
    maxAttempts: 5,
    points: 1,
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
        text: text("det(A)=0.", "det(A)=0。", "det(A)=0。"),
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
    previewExamples: [
      text(
        "Preview should confirm which option you selected before the attempt is consumed.",
        "Preview 會先確認你選了哪一個選項，才消耗正式提交次數。",
        "Preview 会先确认你选了哪一个选项，才消耗正式提交次数。"
      ),
    ],
    showCorrectAnswerPolicy: "after-max-attempts",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "MEMBER",
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
    accessTier: "MEMBER",
    id: "checkpoint.math1030.null-space-dimension",
    type: "FILL_IN_BLANK",
    courseId: "math1030",
    chapterId: "vector-spaces",
    unitId: "math1030.vector-spaces.column-space-row-space-rank",
    inputMode: "math-expression",
    maxAttempts: 5,
    points: 1,
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
    previewExamples: [
      text(
        "Preview can normalize a short answer like `n` before you submit.",
        "Preview 可以先把像 `n` 這種簡短答案整理好，再正式提交。",
        "Preview 可以先把像 `n` 这样的简短答案整理好，再正式提交。"
      ),
    ],
    showCorrectAnswerPolicy: "after-max-attempts",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "MEMBER",
    syntaxGuidance: text(
      "Enter a scalar symbol or a short phrase only if the question explicitly asks for words.",
      "如果題目要求符號，就輸入簡短符號；只有在題目明示時才輸入短句。",
      "如果题目要求符号，就输入简短符号；只有在题目明示时才输入短句。"
    ),
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
  "checkpoint.math1030.matrix-product-size": {
    accessTier: "FREE",
    id: "checkpoint.math1030.matrix-product-size",
    type: "MCQ",
    courseId: "math1030",
    chapterId: "matrix-algebra",
    unitId: "math1030.matrix-algebra.matrix-multiplication-and-identity",
    inputMode: "text",
    maxAttempts: unlimited,
    points: 1,
    prompt: text(
      "If A is 2×3 and B is 3×4, what is the size of AB?",
      "若 A 是 2×3 而 B 是 3×4，AB 的大小是甚麼？",
      "若 A 是 2×3 而 B 是 3×4，AB 的大小是什么？"
    ),
    choices: [
      { id: "a", text: text("2×4", "2×4", "2×4") },
      { id: "b", text: text("3×3", "3×3", "3×3") },
      { id: "c", text: text("4×2", "4×2", "4×2") },
      { id: "d", text: text("Undefined", "未定義", "未定义") },
    ],
    correctAnswer: { choiceId: "a" },
    hints: [
      text(
        "Check the inner dimensions first, then read the outer dimensions.",
        "先檢查內側大小是否相容，再讀外側大小。",
        "先检查内侧大小是否相容，再读外侧大小。"
      ),
    ],
    showCorrectAnswerPolicy: "after-submit",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "FREE",
    solutionSteps: [
      text(
        "The inner dimensions 3 and 3 match, so AB is defined.",
        "內側大小 3 與 3 相同，所以 AB 有定義。",
        "内侧大小 3 与 3 相同，所以 AB 有定义。"
      ),
      text(
        "The outer dimensions are 2 and 4, so the result is 2×4.",
        "外側大小分別是 2 與 4，所以結果是 2×4。",
        "外侧大小分别是 2 与 4，所以结果是 2×4。"
      ),
    ],
    skillTags: ["matrix-multiplication", "dimensions"],
  },
  "checkpoint.math1030.matrix-product-entry": {
    accessTier: "FREE",
    id: "checkpoint.math1030.matrix-product-entry",
    type: "FILL_IN_BLANK",
    courseId: "math1030",
    chapterId: "matrix-algebra",
    unitId: "math1030.matrix-algebra.matrix-multiplication-and-identity",
    inputMode: "math-expression",
    maxAttempts: 4,
    points: 1,
    prompt: text(
      "Let A = [[1,2],[3,4]] and B = [[0,5],[1,-1]]. Fill in the blank: the (1,2)-entry of AB is ____.",
      "設 A = [[1,2],[3,4]]、B = [[0,5],[1,-1]]。填空：AB 的 (1,2) 元素是 ____。",
      "设 A = [[1,2],[3,4]]、B = [[0,5],[1,-1]]。填空：AB 的 (1,2) 元素是 ____。"
    ),
    correctAnswer: {
      value: "3",
      equivalentValues: ["3.0"],
      equivalence: [{ type: "trimmed" }],
    },
    hints: [
      text(
        "Use row 1 of A and column 2 of B only.",
        "只使用 A 的第 1 行與 B 的第 2 列。",
        "只使用 A 的第 1 行与 B 的第 2 列。"
      ),
    ],
    showCorrectAnswerPolicy: "after-max-attempts",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "FREE",
    syntaxGuidance: text(
      "Enter a single scalar.",
      "請輸入一個純量。",
      "请输入一个纯量。"
    ),
    solutionSteps: [
      text(
        "Take row 1 of A: [1, 2].",
        "取 A 的第 1 行：[1, 2]。",
        "取 A 的第 1 行：[1, 2]。"
      ),
      text(
        "Take column 2 of B: [5, -1]^T.",
        "取 B 的第 2 列：[5, -1]^T。",
        "取 B 的第 2 列：[5, -1]^T。"
      ),
      text(
        "Compute 1·5 + 2·(-1) = 3.",
        "計算 1·5 + 2·(-1) = 3。",
        "计算 1·5 + 2·(-1) = 3。"
      ),
    ],
    skillTags: ["matrix-multiplication", "row-by-column"],
  },
  "checkpoint.math1030.identity-matrix-role": {
    accessTier: "FREE",
    id: "checkpoint.math1030.identity-matrix-role",
    type: "MCQ",
    courseId: "math1030",
    chapterId: "matrix-algebra",
    unitId: "math1030.matrix-algebra.matrix-multiplication-and-identity",
    inputMode: "text",
    maxAttempts: unlimited,
    points: 1,
    prompt: text(
      "Which statement best describes the role of the identity matrix?",
      "哪一項最能描述單位矩陣的作用？",
      "哪一项最能描述单位矩阵的作用？"
    ),
    choices: [
      {
        id: "a",
        text: text(
          "It leaves every compatible matrix unchanged under multiplication.",
          "它在乘法下會保留任何大小相容矩陣不變。",
          "它在乘法下会保留任何大小相容矩阵不变。"
        ),
      },
      {
        id: "b",
        text: text(
          "It turns every matrix into the zero matrix.",
          "它會把所有矩陣都變成零矩陣。",
          "它会把所有矩阵都变成零矩阵。"
        ),
      },
      {
        id: "c",
        text: text(
          "It makes matrix multiplication commutative.",
          "它會令矩陣乘法變成可交換。",
          "它会令矩阵乘法变成可交换。"
        ),
      },
      {
        id: "d",
        text: text(
          "It exists only for 2×2 matrices.",
          "它只會在 2×2 矩陣中出現。",
          "它只会在 2×2 矩阵中出现。"
        ),
      },
    ],
    correctAnswer: { choiceId: "a" },
    hints: [
      text(
        "Think about why inverse matrices are defined using I.",
        "想想為甚麼逆矩陣的定義要用 I。",
        "想想为什么逆矩阵的定义要用 I。"
      ),
    ],
    showCorrectAnswerPolicy: "after-submit",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "FREE",
    solutionSteps: [
      text(
        "By definition, I has ones on the main diagonal and zeros elsewhere.",
        "按定義，I 的主對角線是 1，其餘位置是 0。",
        "按定义，I 的主对角线是 1，其余位置是 0。"
      ),
      text(
        "Those zeros and ones copy each row or column without changing it.",
        "呢啲 0 同 1 會原樣抽出每一行或每一列。",
        "这些 0 与 1 会原样抽出每一行或每一列。"
      ),
      text(
        "So multiplication by the identity preserves the compatible matrix.",
        "因此乘上單位矩陣會保留原來的矩陣。",
        "因此乘上单位矩阵会保留原来的矩阵。"
      ),
    ],
    skillTags: ["identity-matrix", "matrix-multiplication"],
  },
  "checkpoint.math1030.transpose-size": {
    accessTier: "FREE",
    id: "checkpoint.math1030.transpose-size",
    type: "MCQ",
    courseId: "math1030",
    chapterId: "matrix-algebra",
    unitId: "math1030.matrix-algebra.transpose-and-special-matrices",
    inputMode: "text",
    maxAttempts: unlimited,
    points: 1,
    prompt: text(
      "If A is 2×5, what is the size of A^T?",
      "若 A 是 2×5，A^T 的大小是甚麼？",
      "若 A 是 2×5，A^T 的大小是什么？"
    ),
    choices: [
      { id: "a", text: text("2×5", "2×5", "2×5") },
      { id: "b", text: text("5×2", "5×2", "5×2") },
      { id: "c", text: text("5×5", "5×5", "5×5") },
      { id: "d", text: text("Undefined", "未定義", "未定义") },
    ],
    correctAnswer: { choiceId: "b" },
    hints: [
      text(
        "Transpose swaps rows and columns.",
        "轉置會交換行與列。",
        "转置会交换行与列。"
      ),
    ],
    showCorrectAnswerPolicy: "after-submit",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "FREE",
    solutionSteps: [
      text(
        "A transpose turns each row into a column.",
        "轉置會把每一行變成一列。",
        "转置会把每一行变成一列。"
      ),
      text(
        "So a 2×5 matrix becomes a 5×2 matrix.",
        "所以 2×5 矩陣會變成 5×2 矩陣。",
        "所以 2×5 矩阵会变成 5×2 矩阵。"
      ),
    ],
    skillTags: ["transpose", "matrix-dimensions"],
  },
  "checkpoint.math1030.transpose-twice": {
    accessTier: "FREE",
    id: "checkpoint.math1030.transpose-twice",
    type: "FILL_IN_BLANK",
    courseId: "math1030",
    chapterId: "matrix-algebra",
    unitId: "math1030.matrix-algebra.transpose-and-special-matrices",
    inputMode: "math-expression",
    maxAttempts: 4,
    points: 1,
    prompt: text(
      "Fill in the blank: for every matrix A, (A^T)^T = ____.",
      "填空：對每個矩陣 A，都有 (A^T)^T = ____。",
      "填空：对每个矩阵 A，都有 (A^T)^T = ____。"
    ),
    correctAnswer: {
      value: "A",
      equivalentValues: ["the original matrix"],
      equivalence: [{ type: "trimmed" }, { type: "case-insensitive" }],
    },
    hints: [
      text(
        "Transposing once swaps rows and columns; transposing again undoes that swap.",
        "轉置一次會交換行列；再轉置一次就會把交換還原。",
        "转置一次会交换行列；再转置一次就会把交换还原。"
      ),
    ],
    showCorrectAnswerPolicy: "after-max-attempts",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "FREE",
    syntaxGuidance: text(
      "A short symbolic answer such as `A` is enough.",
      "輸入像 `A` 這樣的簡短符號答案即可。",
      "输入像 `A` 这样的简短符号答案即可。"
    ),
    solutionSteps: [
      text(
        "The first transpose swaps rows and columns.",
        "第一次轉置會交換行列。",
        "第一次转置会交换行列。"
      ),
      text(
        "The second transpose swaps them back.",
        "第二次轉置會把行列交換回來。",
        "第二次转置会把行列交换回来。"
      ),
      text(
        "So the original matrix is recovered.",
        "所以最後取回的就是原來的矩陣。",
        "所以最后取回的就是原来的矩阵。"
      ),
    ],
    skillTags: ["transpose", "matrix-identities"],
  },
  "checkpoint.math1030.symmetric-matrix-definition": {
    accessTier: "MEMBER",
    id: "checkpoint.math1030.symmetric-matrix-definition",
    type: "MCQ",
    courseId: "math1030",
    chapterId: "matrix-algebra",
    unitId: "math1030.matrix-algebra.transpose-and-special-matrices",
    inputMode: "text",
    maxAttempts: 5,
    points: 1,
    prompt: text(
      "Which condition is required for A to be a symmetric matrix?",
      "若 A 是對稱矩陣，必須滿足哪個條件？",
      "若 A 是对称矩阵，必须满足哪个条件？"
    ),
    choices: [
      {
        id: "a",
        text: text("A = A^T and A is square.", "A = A^T，而且 A 是方陣。", "A = A^T，而且 A 是方阵。"),
      },
      {
        id: "b",
        text: text("Every entry of A is 1.", "A 的每個元素都等於 1。", "A 的每个元素都等于 1。"),
      },
      {
        id: "c",
        text: text("A^2 = I for every size.", "對所有大小都滿足 A^2 = I。", "对所有大小都满足 A^2 = I。"),
      },
      {
        id: "d",
        text: text("A has more rows than columns.", "A 的行數多過列數。", "A 的行数多过列数。"),
      },
    ],
    correctAnswer: { choiceId: "a" },
    hints: [
      text(
        "A matrix cannot equal its own transpose unless the sizes already match.",
        "如果大小本身都唔匹配，就唔可能等於自己嘅轉置。",
        "如果大小本身都不匹配，就不可能等于自己的转置。"
      ),
    ],
    showCorrectAnswerPolicy: "after-max-attempts",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "MEMBER",
    solutionSteps: [
      text(
        "Symmetric means the transpose does not change the matrix.",
        "對稱矩陣嘅意思係轉置唔會改變矩陣。",
        "对称矩阵的意思是转置不会改变矩阵。"
      ),
      text(
        "For A and A^T to be comparable, A must already be square.",
        "要比較 A 同 A^T，A 必須先係方陣。",
        "要比较 A 与 A^T，A 必须先是方阵。"
      ),
    ],
    skillTags: ["transpose", "special-matrices", "symmetric-matrix"],
  },
  "checkpoint.math1030.homogeneous-trivial-solution": {
    accessTier: "FREE",
    id: "checkpoint.math1030.homogeneous-trivial-solution",
    type: "MCQ",
    courseId: "math1030",
    chapterId: "solution-structure",
    unitId: "math1030.solution-structure.homogeneous-systems-and-null-space",
    inputMode: "text",
    maxAttempts: unlimited,
    points: 1,
    prompt: text(
      "Why does every homogeneous system Ax = 0 have at least one solution?",
      "為甚麼每個齊次系統 Ax = 0 至少都有一個解？",
      "为什么每个齐次系统 Ax = 0 至少都有一个解？"
    ),
    choices: [
      {
        id: "a",
        text: text(
          "Because x = 0 always satisfies Ax = 0.",
          "因為 x = 0 永遠滿足 Ax = 0。",
          "因为 x = 0 永远满足 Ax = 0。"
        ),
      },
      {
        id: "b",
        text: text(
          "Because every coefficient matrix is invertible.",
          "因為每個係數矩陣都可逆。",
          "因为每个系数矩阵都可逆。"
        ),
      },
      {
        id: "c",
        text: text(
          "Because every homogeneous system has infinitely many solutions.",
          "因為每個齊次系統都有無限多解。",
          "因为每个齐次系统都有无限多解。"
        ),
      },
      {
        id: "d",
        text: text(
          "Because the right-hand side can never be zero.",
          "因為右邊永遠唔會係零。",
          "因为右边永远不会是零。"
        ),
      },
    ],
    correctAnswer: { choiceId: "a" },
    hints: [
      text(
        "Test the zero vector directly.",
        "直接將零向量代入。",
        "直接把零向量代入。"
      ),
    ],
    showCorrectAnswerPolicy: "after-submit",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "FREE",
    solutionSteps: [
      text(
        "Multiplying any matrix by the zero vector gives the zero vector.",
        "任何矩陣乘上零向量都會得到零向量。",
        "任何矩阵乘上零向量都会得到零向量。"
      ),
      text(
        "So x = 0 is always a valid solution of Ax = 0.",
        "所以 x = 0 永遠係 Ax = 0 的合法解。",
        "所以 x = 0 永远是 Ax = 0 的合法解。"
      ),
    ],
    skillTags: ["homogeneous-system", "trivial-solution"],
  },
  "checkpoint.math1030.null-space-definition": {
    accessTier: "FREE",
    id: "checkpoint.math1030.null-space-definition",
    type: "FILL_IN_BLANK",
    courseId: "math1030",
    chapterId: "solution-structure",
    unitId: "math1030.solution-structure.homogeneous-systems-and-null-space",
    inputMode: "math-expression",
    maxAttempts: 4,
    points: 1,
    prompt: text(
      "Fill in the blank: the null space of A is the set of all x such that ____.",
      "填空：A 的零空間，就是所有滿足 ____ 的 x 所組成的集合。",
      "填空：A 的零空间，就是所有满足 ____ 的 x 所组成的集合。"
    ),
    correctAnswer: {
      value: "Ax=0",
      equivalentValues: ["A x = 0", "Ax = 0"],
      equivalence: [{ type: "trimmed" }, { type: "symbolic" }],
    },
    hints: [
      text(
        "Use the matrix form of a homogeneous system.",
        "用齊次系統嘅矩陣寫法。",
        "用齐次系统的矩阵写法。"
      ),
    ],
    showCorrectAnswerPolicy: "after-max-attempts",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "FREE",
    syntaxGuidance: text(
      "A short symbolic answer such as `Ax=0` is enough.",
      "像 `Ax=0` 呢種簡短符號答案已經足夠。",
      "像 `Ax=0` 这种简短符号答案已经足够。"
    ),
    solutionSteps: [
      text(
        "By definition, the null space collects every vector that solves the homogeneous system.",
        "按定義，零空間會收集所有解齊次系統的向量。",
        "按定义，零空间会收集所有解齐次系统的向量。"
      ),
      text(
        "A homogeneous system has matrix form Ax = 0.",
        "齊次系統嘅矩陣形式就係 Ax = 0。",
        "齐次系统的矩阵形式就是 Ax = 0。"
      ),
    ],
    skillTags: ["null-space", "homogeneous-system"],
  },
  "checkpoint.math1030.particular-plus-null": {
    accessTier: "MEMBER",
    id: "checkpoint.math1030.particular-plus-null",
    type: "MCQ",
    courseId: "math1030",
    chapterId: "solution-structure",
    unitId: "math1030.solution-structure.homogeneous-systems-and-null-space",
    inputMode: "text",
    maxAttempts: 5,
    points: 1,
    prompt: text(
      "Suppose xp is one solution of Ax = b and v is in N(A). Which vector must also solve Ax = b?",
      "若 xp 是 Ax = b 的一個解，而 v 屬於 N(A)，以下哪個向量也一定是 Ax = b 的解？",
      "若 xp 是 Ax = b 的一个解，而 v 属于 N(A)，以下哪个向量也一定是 Ax = b 的解？"
    ),
    choices: [
      { id: "a", text: text("xp + v", "xp + v", "xp + v") },
      { id: "b", text: text("b + v", "b + v", "b + v") },
      { id: "c", text: text("A + v", "A + v", "A + v") },
      { id: "d", text: text("v only", "只係 v", "只有 v") },
    ],
    correctAnswer: { choiceId: "a" },
    hints: [
      text(
        "Use A(xp + v) = Axp + Av.",
        "用 A(xp + v) = Axp + Av 去拆開。",
        "用 A(xp + v) = Axp + Av 去拆开。"
      ),
    ],
    showCorrectAnswerPolicy: "after-max-attempts",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "MEMBER",
    solutionSteps: [
      text(
        "Since xp solves Ax = b, we have Axp = b.",
        "因為 xp 係 Ax = b 的解，所以 Axp = b。",
        "因为 xp 是 Ax = b 的解，所以 Axp = b。"
      ),
      text(
        "Since v is in N(A), we have Av = 0.",
        "因為 v 屬於 N(A)，所以 Av = 0。",
        "因为 v 属于 N(A)，所以 Av = 0。"
      ),
      text(
        "Therefore A(xp + v) = Axp + Av = b + 0 = b.",
        "因此 A(xp + v) = Axp + Av = b + 0 = b。",
        "因此 A(xp + v) = Axp + Av = b + 0 = b。"
      ),
    ],
    skillTags: ["null-space", "solution-structure", "particular-solution"],
  },
  "checkpoint.math1030.dependence-zero-vector": {
    accessTier: "FREE",
    id: "checkpoint.math1030.dependence-zero-vector",
    type: "MCQ",
    courseId: "math1030",
    chapterId: "vector-spaces",
    unitId: "math1030.vector-spaces.linear-dependence-and-independence",
    inputMode: "text",
    maxAttempts: unlimited,
    points: 1,
    prompt: text(
      "What can you conclude immediately if a set of vectors contains the zero vector?",
      "如果一組向量包含零向量，可以立刻得出甚麼結論？",
      "如果一组向量包含零向量，可以立刻得出什么结论？"
    ),
    choices: [
      {
        id: "a",
        text: text("The set is linearly dependent.", "這組向量線性相關。", "这组向量线性相关。"),
      },
      {
        id: "b",
        text: text("The set is automatically a basis.", "這組向量必定是一組基。", "这组向量必定是一组基。"),
      },
      {
        id: "c",
        text: text("The set spans every vector space.", "這組向量會張成所有向量空間。", "这组向量会张成所有向量空间。"),
      },
      {
        id: "d",
        text: text("Nothing can be concluded.", "無法得出任何結論。", "无法得出任何结论。"),
      },
    ],
    correctAnswer: { choiceId: "a" },
    hints: [
      text(
        "Try writing a nontrivial linear combination that equals zero.",
        "試寫一個非平凡線性組合等於零。",
        "试写一个非平凡线性组合等于零。"
      ),
    ],
    showCorrectAnswerPolicy: "after-submit",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "FREE",
    solutionSteps: [
      text(
        "If one vector is 0, then 1·0 + 0·(others) = 0 is already a nontrivial relation.",
        "如果其中一個向量是 0，則 1·0 加上其餘向量的零倍已經是一個非平凡關係。",
        "如果其中一个向量是 0，则 1·0 加上其余向量的零倍已经是一个非平凡关系。"
      ),
      text(
        "A nontrivial relation means the set is linearly dependent.",
        "存在非平凡關係，就表示這組向量線性相關。",
        "存在非平凡关系，就表示这组向量线性相关。"
      ),
    ],
    skillTags: ["linear-dependence", "zero-vector"],
  },
  "checkpoint.math1030.dependence-definition": {
    accessTier: "MEMBER",
    id: "checkpoint.math1030.dependence-definition",
    type: "FILL_IN_BLANK",
    courseId: "math1030",
    chapterId: "vector-spaces",
    unitId: "math1030.vector-spaces.linear-dependence-and-independence",
    inputMode: "text",
    maxAttempts: 5,
    points: 1,
    prompt: text(
      "Fill in the blank: a set is linearly dependent if one vector can be written as a linear combination of the ____.",
      "填空：若一組向量中有一個向量可以寫成其 ____ 的線性組合，這組向量便線性相關。",
      "填空：若一组向量中有一个向量可以写成其 ____ 的线性组合，这组向量便线性相关。"
    ),
    correctAnswer: {
      value: "others",
      equivalentValues: ["other vectors", "remaining vectors"],
      equivalence: [{ type: "trimmed" }, { type: "case-insensitive" }],
    },
    hints: [
      text(
        "The usual test says one vector is redundant because the rest already generate it.",
        "常見測試係：其中一個向量其實由其餘向量生成，所以它是冗餘的。",
        "常见测试是：其中一个向量其实由其余向量生成，所以它是冗余的。"
      ),
    ],
    showCorrectAnswerPolicy: "after-max-attempts",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "MEMBER",
    syntaxGuidance: text(
      "A short word or phrase is enough.",
      "輸入一個簡短詞語即可。",
      "输入一个简短词语即可。"
    ),
    solutionSteps: [
      text(
        "Linear dependence means there is a nontrivial relation among the vectors.",
        "線性相關表示向量之間存在非平凡線性關係。",
        "线性相关表示向量之间存在非平凡线性关系。"
      ),
      text(
        "Rearranging that relation shows one vector is a combination of the others.",
        "把關係式移項後，就可把其中一個向量寫成其餘向量的線性組合。",
        "把关系式移项后，就可把其中一个向量写成其余向量的线性组合。"
      ),
    ],
    skillTags: ["linear-dependence", "linear-combination"],
  },
  "checkpoint.math1030.scalar-multiple-dependence": {
    accessTier: "FREE",
    id: "checkpoint.math1030.scalar-multiple-dependence",
    type: "MCQ",
    courseId: "math1030",
    chapterId: "vector-spaces",
    unitId: "math1030.vector-spaces.linear-dependence-and-independence",
    inputMode: "text",
    maxAttempts: unlimited,
    points: 1,
    prompt: text(
      "If v2 = 3v1 and both vectors are nonzero, what is true about {v1, v2}?",
      "若 v2 = 3v1，而且兩個向量都非零，{v1, v2} 有甚麼性質？",
      "若 v2 = 3v1，而且两个向量都非零，{v1, v2} 有什么性质？"
    ),
    choices: [
      {
        id: "a",
        text: text("The set is linearly independent.", "這組向量線性獨立。", "这组向量线性独立。"),
      },
      {
        id: "b",
        text: text("The set is linearly dependent.", "這組向量線性相關。", "这组向量线性相关。"),
      },
      {
        id: "c",
        text: text("The set has exactly three vectors.", "這組向量剛好有三個向量。", "这组向量刚好有三个向量。"),
      },
      {
        id: "d",
        text: text("Nothing can be concluded.", "無法得出結論。", "无法得出结论。"),
      },
    ],
    correctAnswer: { choiceId: "b" },
    hints: [
      text(
        "One vector is already generated by the other.",
        "其中一個向量已經由另一個向量生成。",
        "其中一个向量已经由另一个向量生成。"
      ),
    ],
    showCorrectAnswerPolicy: "after-submit",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "FREE",
    solutionSteps: [
      text(
        "If v2 = 3v1, then v2 adds no new direction beyond v1.",
        "如果 v2 = 3v1，則 v2 沒有提供任何新方向。",
        "如果 v2 = 3v1，则 v2 没有提供任何新方向。"
      ),
      text(
        "That redundancy gives a nontrivial linear relation, so the set is dependent.",
        "呢種冗餘會產生非平凡線性關係，所以這組向量線性相關。",
        "这种冗余会产生非平凡线性关系，所以这组向量线性相关。"
      ),
    ],
    skillTags: ["linear-dependence", "scalar-multiple"],
  },
};

export function getProblemById(problemId: string) {
  return textbookProblemBank[problemId] ?? null;
}

export function getProblemsForUnit(unitId: string) {
  return Object.values(textbookProblemBank).filter((problem) => problem.unitId === unitId);
}
