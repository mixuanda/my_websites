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
  "checkpoint.math1030.proof-language-contrapositive": {
    accessTier: "FREE",
    id: "checkpoint.math1030.proof-language-contrapositive",
    type: "MCQ",
    courseId: "math1030",
    chapterId: "systems",
    unitId: "math1030.systems.reading-theorems-and-proof-language",
    inputMode: "text",
    maxAttempts: 5,
    points: 1,
    prompt: text(
      "A theorem says: if P, then Q. Which statement is automatically logically equivalent to it?",
      "某定理說：若 P，則 Q。哪一個命題一定與它邏輯等價？",
      "某定理说：若 P，则 Q。哪一个命题一定与它逻辑等价？"
    ),
    choices: [
      {
        id: "a",
        text: text(
          "If Q, then P.",
          "若 Q，則 P。",
          "若 Q，则 P。"
        ),
      },
      {
        id: "b",
        text: text(
          "If not Q, then not P.",
          "若非 Q，則非 P。",
          "若非 Q，则非 P。"
        ),
      },
      {
        id: "c",
        text: text(
          "P and Q are both always true.",
          "P 與 Q 都必定為真。",
          "P 与 Q 都必定为真。"
        ),
      },
      {
        id: "d",
        text: text(
          "If not P, then not Q.",
          "若非 P，則非 Q。",
          "若非 P，则非 Q。"
        ),
      },
    ],
    correctAnswer: {
      choiceId: "b",
    },
    hints: [
      text(
        "The converse reverses the arrow. The contrapositive reverses the arrow and negates both sides.",
        "逆命題只倒轉箭嘴；逆否命題會倒轉箭嘴並同時否定兩邊。",
        "逆命题只倒转箭头；逆否命题会倒转箭头并同时否定两边。"
      ),
    ],
    previewExamples: [
      text(
        "For a statement like `invertible => zero null space`, the equivalent contrapositive is `nonzero null vector => not invertible`.",
        "例如 `可逆 => 零空間只有零向量` 的等價逆否命題是 `有非零零空間向量 => 不可逆`。",
        "例如 `可逆 => 零空间只有零向量` 的等价逆否命题是 `有非零零空间向量 => 不可逆`。"
      ),
    ],
    showCorrectAnswerPolicy: "after-submit",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "FREE",
    solutionSteps: [
      text(
        "The converse `if Q, then P` is not automatically equivalent to the original theorem.",
        "逆命題「若 Q，則 P」不會自動與原定理等價。",
        "逆命题“若 Q，则 P”不会自动与原定理等价。"
      ),
      text(
        "The contrapositive of `if P, then Q` is `if not Q, then not P`.",
        "「若 P，則 Q」的逆否命題是「若非 Q，則非 P」。",
        "“若 P，则 Q”的逆否命题是“若非 Q，则非 P”。"
      ),
      text(
        "A conditional statement and its contrapositive are logically equivalent.",
        "條件命題與其逆否命題邏輯等價。",
        "条件命题与其逆否命题逻辑等价。"
      ),
    ],
    skillTags: ["proof-language", "conditional-statements", "contrapositive"],
  },
  "checkpoint.math1030.rref-existence-pivot-columns": {
    accessTier: "FREE",
    id: "checkpoint.math1030.rref-existence-pivot-columns",
    type: "MCQ",
    courseId: "math1030",
    chapterId: "matrices",
    unitId: "math1030.matrices.existence-of-row-echelon-forms",
    inputMode: "text",
    maxAttempts: 5,
    points: 1,
    prompt: text(
      "Suppose a matrix is already in REF with pivot columns 2 and 4. During the cleanup from REF to RREF, what happens to those pivot columns?",
      "假設某矩陣已在 REF，樞軸欄是第 2 欄與第 4 欄。由 REF 清理到 RREF 時，這些樞軸欄會怎樣？",
      "假设某矩阵已在 REF，主元列是第 2 列与第 4 列。由 REF 清理到 RREF 时，这些主元列会怎样？"
    ),
    choices: [
      {
        id: "a",
        text: text(
          "They remain columns 2 and 4.",
          "它們仍是第 2 欄與第 4 欄。",
          "它们仍是第 2 列与第 4 列。"
        ),
      },
      {
        id: "b",
        text: text(
          "They must move to columns 1 and 2.",
          "它們必定移到第 1 欄與第 2 欄。",
          "它们必定移到第 1 列与第 2 列。"
        ),
      },
      {
        id: "c",
        text: text(
          "They disappear because RREF has no pivot columns.",
          "它們會消失，因為 RREF 沒有樞軸欄。",
          "它们会消失，因为 RREF 没有主元列。"
        ),
      },
      {
        id: "d",
        text: text(
          "They can become any two columns depending on the row operations.",
          "它們可視乎行變換變成任意兩欄。",
          "它们可视乎行变换变成任意两列。"
        ),
      },
    ],
    correctAnswer: {
      choiceId: "a",
    },
    hints: [
      text(
        "The REF-to-RREF lemma preserves pivot-column positions.",
        "由 REF 到 RREF 的引理會保持樞軸欄位置。",
        "由 REF 到 RREF 的引理会保持主元列位置。"
      ),
    ],
    previewExamples: [
      text(
        "Cleanup scales pivot rows and clears entries above pivots; it does not shift the leading positions to new columns.",
        "清理步驟會縮放樞軸列並清掉樞軸上方項；它不會把首項移到新欄。",
        "清理步骤会缩放主元行并清掉主元上方项；它不会把首项移到新列。"
      ),
    ],
    showCorrectAnswerPolicy: "after-submit",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "FREE",
    solutionSteps: [
      text(
        "In REF, the leading entries determine the pivot columns.",
        "在 REF 中，首項決定樞軸欄。",
        "在 REF 中，首项决定主元列。"
      ),
      text(
        "The proof that REF can be cleaned to RREF shows that the same pivot columns are preserved.",
        "REF 可被清理到 RREF 的證明同時說明這些樞軸欄會保持不變。",
        "REF 可被清理到 RREF 的证明同时说明这些主元列会保持不变。"
      ),
      text(
        "Therefore the RREF still has pivot columns 2 and 4.",
        "因此 RREF 的樞軸欄仍是第 2 欄與第 4 欄。",
        "因此 RREF 的主元列仍是第 2 列与第 4 列。"
      ),
    ],
    skillTags: ["rref", "row-echelon-form", "pivot-columns"],
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
  "checkpoint.math1090.integer-equivalence-class": {
    accessTier: "FREE",
    id: "checkpoint.math1090.integer-equivalence-class",
    type: "MCQ",
    courseId: "math1090",
    chapterId: "numbers",
    unitId: "math1090.numbers.integers-from-equivalence-classes",
    inputMode: "text",
    maxAttempts: 5,
    points: 1,
    prompt: text(
      "Which pair is equivalent to `(2,5)` under the integer relation `(a,b)~(c,d)` iff `a+d=b+c`?",
      "在整數關係 `(a,b)~(c,d)` 當且僅當 `a+d=b+c` 下，哪一個對子與 `(2,5)` 等價？",
      "在整数关系 `(a,b)~(c,d)` 当且仅当 `a+d=b+c` 下，哪一个对子与 `(2,5)` 等价？"
    ),
    choices: [
      {
        id: "a",
        text: text("`(4,7)`", "`(4,7)`", "`(4,7)`"),
      },
      {
        id: "b",
        text: text("`(5,2)`", "`(5,2)`", "`(5,2)`"),
      },
      {
        id: "c",
        text: text("`(2,4)`", "`(2,4)`", "`(2,4)`"),
      },
      {
        id: "d",
        text: text("`(0,0)`", "`(0,0)`", "`(0,0)`"),
      },
    ],
    correctAnswer: {
      choiceId: "a",
    },
    hints: [
      text(
        "Do not compare coordinates directly. Test the cross-sum condition.",
        "不要逐個坐標比較，要測試交叉和條件。",
        "不要逐个坐标比较，要测试交叉和条件。"
      ),
    ],
    previewExamples: [
      text(
        "For `(2,5)` and `(4,7)`, compare `2+7` with `5+4`.",
        "對 `(2,5)` 與 `(4,7)`，比較 `2+7` 和 `5+4`。",
        "对 `(2,5)` 与 `(4,7)`，比较 `2+7` 和 `5+4`。"
      ),
    ],
    showCorrectAnswerPolicy: "after-submit",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "FREE",
    solutionSteps: [
      text(
        "The relation says `(a,b)` and `(c,d)` are equivalent exactly when `a+d=b+c`.",
        "這條關係說 `(a,b)` 與 `(c,d)` 等價，正正就是 `a+d=b+c`。",
        "这条关系说 `(a,b)` 与 `(c,d)` 等价，正是 `a+d=b+c`。"
      ),
      text(
        "For `(2,5)` and `(4,7)`, the two cross sums are `2+7=9` and `5+4=9`.",
        "對 `(2,5)` 和 `(4,7)`，兩個交叉和是 `2+7=9` 與 `5+4=9`。",
        "对 `(2,5)` 和 `(4,7)`，两个交叉和是 `2+7=9` 与 `5+4=9`。"
      ),
      text(
        "Therefore `(4,7)` lies in the same equivalence class as `(2,5)`.",
        "因此 `(4,7)` 與 `(2,5)` 屬於同一個等價類。",
        "因此 `(4,7)` 与 `(2,5)` 属于同一个等价类。"
      ),
    ],
    skillTags: ["equivalence-classes", "integers", "quotient-construction"],
  },
  "checkpoint.math1090.rational-representatives": {
    accessTier: "FREE",
    id: "checkpoint.math1090.rational-representatives",
    type: "MCQ",
    courseId: "math1090",
    chapterId: "numbers",
    unitId: "math1090.numbers.rationals-and-well-defined-operations",
    inputMode: "text",
    maxAttempts: 5,
    points: 1,
    prompt: text(
      "For representatives `(p,q)` and `(m,n)` of two rational numbers, which proposed comparison is designed to survive sign changes in denominators?",
      "對兩個有理數的代表元 `(p,q)` 與 `(m,n)`，哪一個候選比較是為了在分母符號改變後仍保持不變而設計的？",
      "对两个有理数的代表元 `(p,q)` 与 `(m,n)`，哪一个候选比较是为了在分母符号改变后仍保持不变而设计的？"
    ),
    choices: [
      {
        id: "a",
        text: text("`p > m`", "`p > m`", "`p > m`"),
      },
      {
        id: "b",
        text: text("`pn-mq > 0` only", "只看 `pn-mq > 0`", "只看 `pn-mq > 0`"),
      },
      {
        id: "c",
        text: text("`(pn-mq)nq > 0`", "`(pn-mq)nq > 0`", "`(pn-mq)nq > 0`"),
      },
      {
        id: "d",
        text: text("`q=n`", "`q=n`", "`q=n`"),
      },
    ],
    correctAnswer: {
      choiceId: "c",
    },
    hints: [
      text(
        "A valid rule must account for the sign of the product of denominators.",
        "有效規則必須同時處理分母乘積的符號。",
        "有效规则必须同时处理分母乘积的符号。"
      ),
    ],
    previewExamples: [
      text(
        "Compare what happens when `1/2` is written as `(1,2)` and as `(-1,-2)`.",
        "比較 `1/2` 寫成 `(1,2)` 以及 `(-1,-2)` 時會發生甚麼。",
        "比较 `1/2` 写成 `(1,2)` 以及 `(-1,-2)` 时会发生什么。"
      ),
    ],
    showCorrectAnswerPolicy: "after-submit",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "FREE",
    solutionSteps: [
      text(
        "`p>m` depends only on chosen numerators, so equivalent representatives can change its truth value.",
        "`p>m` 只依賴所選分子，因此等價代表元可以改變其真假值。",
        "`p>m` 只依赖所选分子，因此等价代表元可以改变其真假值。"
      ),
      text(
        "`pn-mq>0` still ignores whether the product `nq` is positive or negative.",
        "`pn-mq>0` 仍然忽略了分母乘積 `nq` 是正還是負。",
        "`pn-mq>0` 仍然忽略了分母乘积 `nq` 是正还是负。"
      ),
      text(
        "Multiplying by `nq` gives the sign-corrected expression `(pn-mq)nq`, which is the candidate used in the note.",
        "乘上 `nq` 會得到修正分母符號的表達式 `(pn-mq)nq`，這就是本節使用的候選規則。",
        "乘上 `nq` 会得到修正分母符号的表达式 `(pn-mq)nq`，这就是本节使用的候选规则。"
      ),
    ],
    skillTags: ["well-defined", "rationals", "representatives"],
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
  "checkpoint.math1030.invertible-null-vector": {
    accessTier: "MEMBER",
    id: "checkpoint.math1030.invertible-null-vector",
    type: "MCQ",
    courseId: "math1030",
    chapterId: "invertibility",
    unitId: "math1030.invertibility.invertible-matrices",
    inputMode: "text",
    maxAttempts: 5,
    points: 1,
    prompt: text(
      "Suppose `A` is square and there is a nonzero vector `v` such that `Av=0`. What can you conclude?",
      "假設 `A` 是方陣，且存在非零向量 `v` 使得 `Av=0`。可以推出甚麼？",
      "假设 `A` 是方阵，且存在非零向量 `v` 使得 `Av=0`。可以推出什么？"
    ),
    choices: [
      {
        id: "a",
        text: text(
          "A is invertible.",
          "A 可逆。",
          "A 可逆。"
        ),
      },
      {
        id: "b",
        text: text(
          "A is not invertible.",
          "A 不可逆。",
          "A 不可逆。"
        ),
      },
      {
        id: "c",
        text: text(
          "A must be the identity matrix.",
          "A 必定是單位矩陣。",
          "A 必定是单位矩阵。"
        ),
      },
      {
        id: "d",
        text: text(
          "The equation `Ax=0` has no solution.",
          "方程 `Ax=0` 無解。",
          "方程 `Ax=0` 无解。"
        ),
      },
    ],
    correctAnswer: { choiceId: "b" },
    hints: [
      text(
        "An invertible square matrix has only the trivial solution to `Ax=0`.",
        "可逆方陣的 `Ax=0` 只有平凡解。",
        "可逆方阵的 `Ax=0` 只有平凡解。"
      ),
    ],
    showCorrectAnswerPolicy: "after-max-attempts",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "MEMBER",
    solutionSteps: [
      text(
        "If `A` were invertible, multiplying `Av=0` by `A^{-1}` would give `v=0`.",
        "若 `A` 可逆，把 `Av=0` 左乘 `A^{-1}` 會得到 `v=0`。",
        "若 `A` 可逆，把 `Av=0` 左乘 `A^{-1}` 会得到 `v=0`。"
      ),
      text(
        "This contradicts the given condition `v≠0`.",
        "這與已知條件 `v≠0` 矛盾。",
        "这与已知条件 `v≠0` 矛盾。"
      ),
      text(
        "Therefore `A` is not invertible.",
        "因此 `A` 不可逆。",
        "因此 `A` 不可逆。"
      ),
    ],
    skillTags: ["invertible-matrix", "null-space", "nontrivial-solution"],
  },
  "checkpoint.math1030.inverse-solve-system": {
    accessTier: "MEMBER",
    id: "checkpoint.math1030.inverse-solve-system",
    type: "MCQ",
    courseId: "math1030",
    chapterId: "invertibility",
    unitId: "math1030.invertibility.invertible-matrices",
    inputMode: "text",
    maxAttempts: 5,
    points: 1,
    prompt: text(
      "Let `A^{-1}=[[2,-1],[0,3]]` and `b=[5,-1]^T`. If `Ax=b`, what is `x`?",
      "設 `A^{-1}=[[2,-1],[0,3]]` 且 `b=[5,-1]^T`。若 `Ax=b`，`x` 是甚麼？",
      "设 `A^{-1}=[[2,-1],[0,3]]` 且 `b=[5,-1]^T`。若 `Ax=b`，`x` 是什么？"
    ),
    choices: [
      { id: "a", text: text("`[11,-3]^T`", "`[11,-3]^T`", "`[11,-3]^T`") },
      { id: "b", text: text("`[9,-3]^T`", "`[9,-3]^T`", "`[9,-3]^T`") },
      { id: "c", text: text("`[10,-1]^T`", "`[10,-1]^T`", "`[10,-1]^T`") },
      { id: "d", text: text("`[5,-1]^T`", "`[5,-1]^T`", "`[5,-1]^T`") },
    ],
    correctAnswer: { choiceId: "a" },
    hints: [
      text(
        "Multiply `Ax=b` on the left by `A^{-1}`; the solution is `x=A^{-1}b`.",
        "把 `Ax=b` 左乘 `A^{-1}`；解是 `x=A^{-1}b`。",
        "把 `Ax=b` 左乘 `A^{-1}`；解是 `x=A^{-1}b`。"
      ),
    ],
    showCorrectAnswerPolicy: "after-max-attempts",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "MEMBER",
    solutionSteps: [
      text(
        "Since `A` is invertible, `Ax=b` implies `x=A^{-1}b`.",
        "因為 `A` 可逆，`Ax=b` 推出 `x=A^{-1}b`。",
        "因为 `A` 可逆，`Ax=b` 推出 `x=A^{-1}b`。"
      ),
      text(
        "Compute the first entry: 2·5 + (-1)·(-1) = 11.",
        "計算第一個元素：2·5 + (-1)·(-1) = 11。",
        "计算第一个元素：2·5 + (-1)·(-1) = 11。"
      ),
      text(
        "Compute the second entry: 0·5 + 3·(-1) = -3.",
        "計算第二個元素：0·5 + 3·(-1) = -3。",
        "计算第二个元素：0·5 + 3·(-1) = -3。"
      ),
    ],
    skillTags: ["invertible-matrix", "inverse", "linear-system"],
  },
  "checkpoint.math1030.parameterized-inverse-entry": {
    accessTier: "MEMBER",
    id: "checkpoint.math1030.parameterized-inverse-entry",
    type: "FILL_IN_BLANK",
    courseId: "math1030",
    chapterId: "invertibility",
    unitId: "math1030.invertibility.invertible-matrices",
    inputMode: "text",
    maxAttempts: 5,
    points: 1,
    prompt: text(
      "In the note's `A_alpha^{-1}` formula, the `(1,4)` entry is `alpha-2`. What is that entry when `alpha=3`?",
      "在本節的 `A_alpha^{-1}` 公式中，`(1,4)` 元素是 `alpha-2`。當 `alpha=3` 時，該元素是多少？",
      "在本节的 `A_alpha^{-1}` 公式中，`(1,4)` 元素是 `alpha-2`。当 `alpha=3` 时，该元素是多少？"
    ),
    correctAnswer: {
      value: "1",
      equivalentValues: ["+1"],
      equivalence: [{ type: "trimmed" }],
    },
    hints: [
      text(
        "Substitute the parameter value into the displayed inverse matrix entry.",
        "把參數值代入顯示出的逆矩陣元素。",
        "把参数值代入显示出的逆矩阵元素。"
      ),
    ],
    showCorrectAnswerPolicy: "after-submit",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "MEMBER",
    syntaxGuidance: text(
      "Enter a single number.",
      "輸入一個數字即可。",
      "输入一个数字即可。"
    ),
    solutionSteps: [
      text(
        "The relevant entry is `alpha-2`.",
        "相關元素是 `alpha-2`。",
        "相关元素是 `alpha-2`。"
      ),
      text(
        "Substituting `alpha=3` gives `3-2=1`.",
        "代入 `alpha=3` 得到 `3-2=1`。",
        "代入 `alpha=3` 得到 `3-2=1`。"
      ),
    ],
    skillTags: ["inverse", "parameter", "row-reduction"],
  },
  "checkpoint.math1030.vector-identity-inverse": {
    accessTier: "MEMBER",
    id: "checkpoint.math1030.vector-identity-inverse",
    type: "MCQ",
    courseId: "math1030",
    chapterId: "invertibility",
    unitId: "math1030.invertibility.invertible-matrices",
    inputMode: "text",
    maxAttempts: 5,
    points: 1,
    prompt: text(
      "Suppose `A` is square and `A^2x=Ax+x` for every vector `x`. Which conclusion is forced?",
      "假設 `A` 是方陣，而且對每個向量 `x` 都有 `A^2x=Ax+x`。哪個結論必然成立？",
      "假设 `A` 是方阵，而且对每个向量 `x` 都有 `A^2x=Ax+x`。哪个结论必然成立？"
    ),
    choices: [
      {
        id: "a",
        text: text(
          "`A` is invertible with inverse `A-I`.",
          "`A` 可逆，其逆矩陣是 `A-I`。",
          "`A` 可逆，其逆矩阵是 `A-I`。"
        ),
      },
      {
        id: "b",
        text: text(
          "`A` must be the zero matrix.",
          "`A` 必定是零矩陣。",
          "`A` 必定是零矩阵。"
        ),
      },
      {
        id: "c",
        text: text(
          "`A` is not invertible.",
          "`A` 不可逆。",
          "`A` 不可逆。"
        ),
      },
      {
        id: "d",
        text: text(
          "No conclusion about invertibility is possible.",
          "不能推出任何關於可逆性的結論。",
          "不能推出任何关于可逆性的结论。"
        ),
      },
    ],
    correctAnswer: { choiceId: "a" },
    hints: [
      text(
        "Move `Ax` to the left and factor `A^2-A`.",
        "把 `Ax` 移到左邊，並分解 `A^2-A`。",
        "把 `Ax` 移到左边，并分解 `A^2-A`。"
      ),
    ],
    showCorrectAnswerPolicy: "after-max-attempts",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "MEMBER",
    solutionSteps: [
      text(
        "The identity gives `(A^2-A)x=x` for every vector `x`.",
        "該恆等式給出對每個向量 `x` 都有 `(A^2-A)x=x`。",
        "该恒等式给出对每个向量 `x` 都有 `(A^2-A)x=x`。"
      ),
      text(
        "Since `A^2-A=(A-I)A`, the matrices satisfy `(A-I)A=I`.",
        "因為 `A^2-A=(A-I)A`，矩陣滿足 `(A-I)A=I`。",
        "因为 `A^2-A=(A-I)A`，矩阵满足 `(A-I)A=I`。"
      ),
      text(
        "For a square matrix, a one-sided identity is enough to prove invertibility, so the inverse is `A-I`.",
        "對方陣而言，一側單位等式足以證明可逆，因此逆矩陣是 `A-I`。",
        "对方阵而言，一侧单位等式足以证明可逆，因此逆矩阵是 `A-I`。"
      ),
    ],
    skillTags: ["invertible-matrix", "one-sided-inverse", "matrix-polynomial"],
  },
  "checkpoint.math1030.rref-uniqueness-conclusion": {
    accessTier: "MEMBER",
    id: "checkpoint.math1030.rref-uniqueness-conclusion",
    type: "MCQ",
    courseId: "math1030",
    chapterId: "invertibility",
    unitId: "math1030.invertibility.rref-uniqueness-and-rank",
    inputMode: "text",
    maxAttempts: 5,
    points: 1,
    prompt: text(
      "Suppose `B` and `C` are reduced row-echelon forms of the same size and `B` is row-equivalent to `C`. What must be true?",
      "假設 `B` 與 `C` 是同尺寸的最簡行階梯形，而且 `B` 與 `C` 行等價。哪一項必定正確？",
      "假设 `B` 与 `C` 是同尺寸的简化行阶梯形，而且 `B` 与 `C` 行等价。哪一项必定正确？"
    ),
    choices: [
      {
        id: "a",
        text: text(
          "`B=C`.",
          "`B=C`。",
          "`B=C`。"
        ),
      },
      {
        id: "b",
        text: text(
          "`B` and `C` may have different pivot columns.",
          "`B` 與 `C` 可以有不同樞軸欄。",
          "`B` 与 `C` 可以有不同主元列。"
        ),
      },
      {
        id: "c",
        text: text(
          "Only their row spaces are equal; the matrices need not be equal.",
          "只有它們的行空間相等；矩陣本身不一定相等。",
          "只有它们的行空间相等；矩阵本身不一定相等。"
        ),
      },
      {
        id: "d",
        text: text(
          "They are ordinary REF forms, so uniqueness does not apply.",
          "它們只是普通 REF，所以唯一性不適用。",
          "它们只是普通 REF，所以唯一性不适用。"
        ),
      },
    ],
    correctAnswer: { choiceId: "a" },
    hints: [
      text(
        "The uniqueness theorem applies to reduced row-echelon forms, not arbitrary REF outputs.",
        "唯一性定理適用於最簡行階梯形，不適用於任意 REF 輸出。",
        "唯一性定理适用于简化行阶梯形，不适用于任意 REF 输出。"
      ),
    ],
    showCorrectAnswerPolicy: "after-max-attempts",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "MEMBER",
    solutionSteps: [
      text(
        "Row-equivalence places `B` and `C` in the same row-equivalence class.",
        "行等價表示 `B` 與 `C` 屬於同一個行等價類。",
        "行等价表示 `B` 与 `C` 属于同一个行等价类。"
      ),
      text(
        "The theorem says that a row-equivalence class contains at most one RREF.",
        "定理說明一個行等價類最多只有一個 RREF。",
        "定理说明一个行等价类最多只有一个 RREF。"
      ),
      text(
        "Since both matrices are RREF, they must be the same matrix.",
        "既然兩個矩陣都是 RREF，它們必須是同一個矩陣。",
        "既然两个矩阵都是 RREF，它们必须是同一个矩阵。"
      ),
    ],
    skillTags: ["rref", "row-equivalence", "uniqueness"],
  },
  "checkpoint.math1030.rref-rank-pivot-count": {
    accessTier: "MEMBER",
    id: "checkpoint.math1030.rref-rank-pivot-count",
    type: "FILL_IN_BLANK",
    courseId: "math1030",
    chapterId: "invertibility",
    unitId: "math1030.invertibility.rref-uniqueness-and-rank",
    inputMode: "text",
    maxAttempts: 5,
    points: 1,
    prompt: text(
      "Fill in the blank: if the unique RREF row-equivalent to `A` has pivot columns 1, 3, and 5, then `rank(A)=____`.",
      "填空：若與 `A` 行等價的唯一 RREF 有第 1、3、5 欄為樞軸欄，則 `rank(A)=____`。",
      "填空：若与 `A` 行等价的唯一 RREF 有第 1、3、5 列为主元列，则 `rank(A)=____`。"
    ),
    correctAnswer: {
      value: "3",
      equivalentValues: ["rank 3"],
      equivalence: [{ type: "trimmed" }, { type: "case-insensitive" }],
    },
    hints: [
      text(
        "Rank is the number of pivot columns in the unique RREF.",
        "秩就是唯一 RREF 中的樞軸欄數目。",
        "秩就是唯一 RREF 中的主元列数目。"
      ),
    ],
    showCorrectAnswerPolicy: "after-submit",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "MEMBER",
    syntaxGuidance: text(
      "Enter a single integer.",
      "輸入一個整數即可。",
      "输入一个整数即可。"
    ),
    solutionSteps: [
      text(
        "The pivot columns are listed as columns 1, 3, and 5.",
        "題目列出的樞軸欄是第 1、3、5 欄。",
        "题目列出的主元列是第 1、3、5 列。"
      ),
      text(
        "There are three pivot columns.",
        "共有三個樞軸欄。",
        "共有三个主元列。"
      ),
      text(
        "Therefore `rank(A)=3`.",
        "因此 `rank(A)=3`。",
        "因此 `rank(A)=3`。"
      ),
    ],
    skillTags: ["rank", "pivot-columns", "rref"],
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
  "checkpoint.math1030.matrix-product-parameter-recovery": {
    accessTier: "FREE",
    id: "checkpoint.math1030.matrix-product-parameter-recovery",
    type: "FILL_IN_BLANK",
    courseId: "math1030",
    chapterId: "matrix-algebra",
    unitId: "math1030.matrix-algebra.matrix-multiplication-and-identity",
    inputMode: "math-expression",
    maxAttempts: 4,
    points: 1,
    prompt: text(
      "Let A = [[1,2,1,3],[1,0,2,1]] and B = [[a,b],[1,1],[b,a],[1,2]]. If the first column of AB is [1,3]^T, fill in the blank: b = ____.",
      "設 A = [[1,2,1,3],[1,0,2,1]]，B = [[a,b],[1,1],[b,a],[1,2]]。若 AB 的第一列是 [1,3]^T，填空：b = ____。",
      "设 A = [[1,2,1,3],[1,0,2,1]]，B = [[a,b],[1,1],[b,a],[1,2]]。若 AB 的第一列是 [1,3]^T，填空：b = ____。"
    ),
    correctAnswer: {
      value: "6",
      equivalentValues: ["6.0"],
      equivalence: [{ type: "trimmed" }],
    },
    hints: [
      text(
        "The first column gives two equations: a+b+5=1 and a+2b+1=3.",
        "第一列給出兩條方程：a+b+5=1 及 a+2b+1=3。",
        "第一列给出两条方程：a+b+5=1 及 a+2b+1=3。"
      ),
    ],
    showCorrectAnswerPolicy: "after-max-attempts",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "FREE",
    syntaxGuidance: text(
      "Enter one scalar.",
      "請輸入一個純量。",
      "请输入一个纯量。"
    ),
    solutionSteps: [
      text(
        "Comparing the first entry of the first column gives a+b+5=1, so a+b=-4.",
        "比較第一列的第一個元素，得到 a+b+5=1，所以 a+b=-4。",
        "比较第一列的第一个元素，得到 a+b+5=1，所以 a+b=-4。"
      ),
      text(
        "Comparing the second entry of the first column gives a+2b+1=3, so a+2b=2.",
        "比較第一列的第二個元素，得到 a+2b+1=3，所以 a+2b=2。",
        "比较第一列的第二个元素，得到 a+2b+1=3，所以 a+2b=2。"
      ),
      text(
        "Subtract the two equations to get b=6.",
        "兩式相減得到 b=6。",
        "两式相减得到 b=6。"
      ),
    ],
    skillTags: ["matrix-multiplication", "parameter-recovery", "row-by-column"],
  },
  "checkpoint.math1030.noncommuting-product-expansion": {
    accessTier: "FREE",
    id: "checkpoint.math1030.noncommuting-product-expansion",
    type: "MCQ",
    courseId: "math1030",
    chapterId: "matrix-algebra",
    unitId: "math1030.matrix-algebra.matrix-multiplication-and-identity",
    inputMode: "text",
    maxAttempts: 5,
    points: 1,
    prompt: text(
      "For same-size square matrices A and B, which expansion is always correct?",
      "對同大小方陣 A、B，下列哪個展開式必定正確？",
      "对同大小方阵 A、B，下列哪个展开式必定正确？"
    ),
    choices: [
      {
        id: "a",
        text: text(
          "(A+B)^2 = A^2 + 2AB + B^2",
          "(A+B)^2 = A^2 + 2AB + B^2",
          "(A+B)^2 = A^2 + 2AB + B^2"
        ),
      },
      {
        id: "b",
        text: text(
          "(A+B)^2 = A^2 + AB + BA + B^2",
          "(A+B)^2 = A^2 + AB + BA + B^2",
          "(A+B)^2 = A^2 + AB + BA + B^2"
        ),
      },
      {
        id: "c",
        text: text(
          "(A+B)^2 = A^2 + B^2",
          "(A+B)^2 = A^2 + B^2",
          "(A+B)^2 = A^2 + B^2"
        ),
      },
      {
        id: "d",
        text: text(
          "(A+B)^2 = A^2 + BA + B^2",
          "(A+B)^2 = A^2 + BA + B^2",
          "(A+B)^2 = A^2 + BA + B^2"
        ),
      },
    ],
    correctAnswer: { choiceId: "b" },
    hints: [
      text(
        "Distribute first. Do not combine AB and BA unless commutativity is known.",
        "先做分配律；除非已知可交換，否則不要合併 AB 與 BA。",
        "先做分配律；除非已知可交换，否则不要合并 AB 与 BA。"
      ),
    ],
    showCorrectAnswerPolicy: "after-submit",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "FREE",
    solutionSteps: [
      text(
        "(A+B)^2 means (A+B)(A+B).",
        "(A+B)^2 的意思是 (A+B)(A+B)。",
        "(A+B)^2 的意思是 (A+B)(A+B)。"
      ),
      text(
        "Distributing gives A(A+B)+B(A+B)=A^2+AB+BA+B^2.",
        "用分配律得到 A(A+B)+B(A+B)=A^2+AB+BA+B^2。",
        "用分配律得到 A(A+B)+B(A+B)=A^2+AB+BA+B^2。"
      ),
      text(
        "The terms AB and BA are not automatically equal for matrices.",
        "對矩陣而言，AB 與 BA 不會自動相等。",
        "对矩阵而言，AB 与 BA 不会自动相等。"
      ),
    ],
    skillTags: ["matrix-multiplication", "noncommutative-algebra", "expansion"],
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
  "checkpoint.math1030.difference-of-particular-solutions": {
    accessTier: "FREE",
    id: "checkpoint.math1030.difference-of-particular-solutions",
    type: "MCQ",
    courseId: "math1030",
    chapterId: "solution-structure",
    unitId: "math1030.solution-structure.homogeneous-systems-and-null-space",
    inputMode: "text",
    maxAttempts: 5,
    points: 1,
    prompt: text(
      "Suppose u and v both solve Ax = b. Which statement must be true?",
      "假設 u 與 v 都解 Ax = b。下列哪一項必定正確？",
      "假设 u 与 v 都解 Ax = b。下列哪一项必定正确？"
    ),
    choices: [
      {
        id: "a",
        text: text(
          "v - u solves Ax = 0.",
          "v - u 解 Ax = 0。",
          "v - u 解 Ax = 0。"
        ),
      },
      {
        id: "b",
        text: text(
          "u + v solves Ax = b.",
          "u + v 解 Ax = b。",
          "u + v 解 Ax = b。"
        ),
      },
      {
        id: "c",
        text: text(
          "v - u solves Ax = b.",
          "v - u 解 Ax = b。",
          "v - u 解 Ax = b。"
        ),
      },
      {
        id: "d",
        text: text(
          "u and v must be equal.",
          "u 與 v 必須相等。",
          "u 与 v 必须相等。"
        ),
      },
    ],
    correctAnswer: { choiceId: "a" },
    hints: [
      text(
        "Subtract the two equations Au = b and Av = b.",
        "把 Au = b 與 Av = b 兩條等式相減。",
        "把 Au = b 与 Av = b 两条等式相减。"
      ),
    ],
    showCorrectAnswerPolicy: "after-submit",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "FREE",
    solutionSteps: [
      text(
        "Since u solves Ax = b, we have Au = b.",
        "因為 u 解 Ax = b，所以 Au = b。",
        "因为 u 解 Ax = b，所以 Au = b。"
      ),
      text(
        "Since v also solves Ax = b, we have Av = b.",
        "因為 v 也解 Ax = b，所以 Av = b。",
        "因为 v 也解 Ax = b，所以 Av = b。"
      ),
      text(
        "Therefore A(v - u) = Av - Au = b - b = 0.",
        "因此 A(v - u) = Av - Au = b - b = 0。",
        "因此 A(v - u) = Av - Au = b - b = 0。"
      ),
    ],
    skillTags: ["null-space", "solution-set", "particular-solution"],
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
  "checkpoint.math1030.triangular-determinant-product": {
    accessTier: "MEMBER",
    id: "checkpoint.math1030.triangular-determinant-product",
    type: "MCQ",
    courseId: "math1030",
    chapterId: "determinants",
    unitId: "math1030.determinants.determinants-and-cofactor-expansion",
    inputMode: "text",
    maxAttempts: 5,
    points: 1,
    prompt: text(
      "If A is an upper triangular 4×4 matrix with diagonal entries 2, -3, 5, and 7, what is det(A)?",
      "若 A 是一個 4×4 上三角矩陣，其對角線項為 2、-3、5、7，det(A) 是多少？",
      "若 A 是一个 4×4 上三角矩阵，其对角线项为 2、-3、5、7，det(A) 是多少？"
    ),
    choices: [
      { id: "a", text: text("11", "11", "11") },
      { id: "b", text: text("-210", "-210", "-210") },
      { id: "c", text: text("17", "17", "17") },
      { id: "d", text: text("0", "0", "0") },
    ],
    correctAnswer: { choiceId: "b" },
    hints: [
      text(
        "For a triangular matrix, you do not need a full cofactor expansion. Read the diagonal.",
        "對三角矩陣而言，唔需要完整做餘因子展開；直接睇對角線。",
        "对三角矩阵而言，不需要完整做余因子展开；直接看对角线。"
      ),
    ],
    showCorrectAnswerPolicy: "after-max-attempts",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "MEMBER",
    solutionSteps: [
      text(
        "An upper triangular matrix has determinant equal to the product of its diagonal entries.",
        "上三角矩陣嘅行列式，等於對角線各項之積。",
        "上三角矩阵的行列式，等于对角线各项之积。"
      ),
      text(
        "So det(A)=2·(-3)·5·7.",
        "所以 det(A)=2·(-3)·5·7。",
        "所以 det(A)=2·(-3)·5·7。"
      ),
      text(
        "That product is -210.",
        "計出來就是 -210。",
        "算出来就是 -210。"
      ),
    ],
    skillTags: ["determinant", "triangular-matrix", "cofactor-expansion"],
  },
  "checkpoint.math1030.row-swap-determinant-sign": {
    accessTier: "MEMBER",
    id: "checkpoint.math1030.row-swap-determinant-sign",
    type: "MCQ",
    courseId: "math1030",
    chapterId: "determinants",
    unitId: "math1030.determinants.row-operations-products-and-invertibility",
    inputMode: "text",
    maxAttempts: 5,
    points: 1,
    prompt: text(
      "A matrix B is obtained from A by swapping two rows once. Which equation must hold?",
      "若矩陣 B 由 A 交換一次兩行得到，以下哪個等式一定成立？",
      "若矩阵 B 由 A 交换一次两行得到，以下哪个等式一定成立？"
    ),
    choices: [
      { id: "a", text: text("det(B)=det(A)", "det(B)=det(A)", "det(B)=det(A)") },
      { id: "b", text: text("det(B)=-det(A)", "det(B)=-det(A)", "det(B)=-det(A)") },
      { id: "c", text: text("det(B)=2det(A)", "det(B)=2det(A)", "det(B)=2det(A)") },
      { id: "d", text: text("det(B)=det(A)^2", "det(B)=det(A)^2", "det(B)=det(A)^2") },
    ],
    correctAnswer: { choiceId: "b" },
    hints: [
      text(
        "A single row swap reverses orientation but does not change the absolute size factor.",
        "一次交換兩行會反轉方向，但唔會改變絕對伸縮量。",
        "一次交换两行会反转方向，但不会改变绝对伸缩量。"
      ),
    ],
    showCorrectAnswerPolicy: "after-max-attempts",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "MEMBER",
    solutionSteps: [
      text(
        "Swapping two rows is the determinant-changing row operation that flips the sign.",
        "交換兩行係唯一會直接翻轉符號嘅基本行變換。",
        "交换两行是唯一会直接翻转符号的基本行变换。"
      ),
      text(
        "Therefore the new determinant is the negative of the old one.",
        "因此，新行列式等於舊行列式乘上 -1。",
        "因此，新行列式等于旧行列式乘上 -1。"
      ),
    ],
    skillTags: ["determinant", "row-operation", "sign-change"],
  },
  "checkpoint.math1030.cramers-rule-coordinate": {
    accessTier: "MEMBER",
    id: "checkpoint.math1030.cramers-rule-coordinate",
    type: "FILL_IN_BLANK",
    courseId: "math1030",
    chapterId: "determinants",
    unitId: "math1030.determinants.transpose-column-operations-and-cramers-rule",
    inputMode: "math-expression",
    maxAttempts: 5,
    points: 1,
    prompt: text(
      "Fill in the blank: for an invertible square system Ax=b, Cramer's rule says x_j = ____.",
      "填空：對可逆方陣系統 Ax=b，克拉默法則指出 x_j = ____。",
      "填空：对可逆方阵系统 Ax=b，克拉默法则指出 x_j = ____。"
    ),
    correctAnswer: {
      value: "det(M_j)/det(A)",
      equivalentValues: [
        "\\frac{\\det(M_j)}{\\det(A)}",
        "det(Mj)/det(A)",
        "|M_j|/|A|",
      ],
      equivalence: [{ type: "trimmed" }, { type: "symbolic" }],
    },
    hints: [
      text(
        "Replace the j-th column of A by b, take that determinant, and divide by det(A).",
        "將 A 的第 j 列換成 b，先取該矩陣行列式，再除以 det(A)。",
        "将 A 的第 j 列换成 b，先取该矩阵行列式，再除以 det(A)。"
      ),
    ],
    showCorrectAnswerPolicy: "after-max-attempts",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "MEMBER",
    syntaxGuidance: text(
      "A compact symbolic answer such as `det(M_j)/det(A)` is enough.",
      "輸入 `det(M_j)/det(A)` 呢種簡短符號答案已經足夠。",
      "输入 `det(M_j)/det(A)` 这种简短符号答案已经足够。"
    ),
    solutionSteps: [
      text(
        "Cramer's rule applies only when A is square and invertible, so det(A)≠0.",
        "克拉默法則只適用於 A 是方陣而且可逆，所以 det(A)≠0。",
        "克拉默法则只适用于 A 是方阵而且可逆，所以 det(A)≠0。"
      ),
      text(
        "Build M_j by replacing the j-th column of A with the right-hand side vector b.",
        "先把 A 的第 j 列換成右邊向量 b，得到 M_j。",
        "先把 A 的第 j 列换成右边向量 b，得到 M_j。"
      ),
      text(
        "Then x_j is the ratio det(M_j)/det(A).",
        "之後 x_j 就係 det(M_j)/det(A)。",
        "之后 x_j 就是 det(M_j)/det(A)。"
      ),
    ],
    skillTags: ["determinant", "cramers-rule", "invertible-system"],
  },
  "checkpoint.math1030.eigenvalue-zero-invertibility": {
    accessTier: "MEMBER",
    id: "checkpoint.math1030.eigenvalue-zero-invertibility",
    type: "MCQ",
    courseId: "math1030",
    chapterId: "eigenvalues",
    unitId: "math1030.eigenvalues.eigenvalues-eigenvectors-and-eigenspaces",
    inputMode: "text",
    maxAttempts: 5,
    points: 1,
    prompt: text(
      "Which statement is equivalent to saying that 0 is an eigenvalue of a square matrix A?",
      "下列哪一項與「0 是方陣 A 的一個特徵值」等價？",
      "下列哪一项与“0 是方阵 A 的一个特征值”等价？"
    ),
    choices: [
      {
        id: "a",
        text: text("A is invertible.", "A 可逆。", "A 可逆。"),
      },
      {
        id: "b",
        text: text("A is singular.", "A 不可逆。", "A 不可逆。"),
      },
      {
        id: "c",
        text: text("Every nonzero vector is an eigenvector of A.", "A 的每個非零向量都是特徵向量。", "A 的每个非零向量都是特征向量。"),
      },
      {
        id: "d",
        text: text("det(A)=1.", "det(A)=1。", "det(A)=1。"),
      },
    ],
    correctAnswer: { choiceId: "b" },
    hints: [
      text(
        "Use the equivalence between λ being an eigenvalue and A-λI being noninvertible.",
        "利用「λ 是特徵值」與「A-λI 不可逆」之間的等價關係。",
        "利用“λ 是特征值”与“A-λI 不可逆”之间的等价关系。"
      ),
    ],
    showCorrectAnswerPolicy: "after-max-attempts",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "MEMBER",
    solutionSteps: [
      text(
        "0 is an eigenvalue exactly when det(A-0I)=det(A)=0.",
        "0 是特徵值，當且僅當 det(A-0I)=det(A)=0。",
        "0 是特征值，当且仅当 det(A-0I)=det(A)=0。"
      ),
      text(
        "A square matrix with determinant 0 is not invertible.",
        "方陣若行列式為 0，便不可逆。",
        "方阵若行列式为 0，便不可逆。"
      ),
    ],
    skillTags: ["eigenvalue", "invertibility", "determinant"],
  },
  "checkpoint.math1030.diagonalizable-basis": {
    accessTier: "MEMBER",
    id: "checkpoint.math1030.diagonalizable-basis",
    type: "MCQ",
    courseId: "math1030",
    chapterId: "eigenvalues",
    unitId: "math1030.eigenvalues.diagonalization-and-similarity",
    inputMode: "text",
    maxAttempts: 5,
    points: 1,
    prompt: text(
      "What is the correct criterion for an n×n matrix A to be diagonalizable?",
      "對一個 n×n 矩陣 A 來說，哪一項才是正確的可對角化判準？",
      "对一个 n×n 矩阵 A 来说，哪一项才是正确的可对角化判准？"
    ),
    choices: [
      {
        id: "a",
        text: text("A has n linearly independent eigenvectors.", "A 有 n 個線性無關的特徵向量。", "A 有 n 个线性无关的特征向量。"),
      },
      {
        id: "b",
        text: text("A has at least one eigenvalue.", "A 至少有一個特徵值。", "A 至少有一个特征值。"),
      },
      {
        id: "c",
        text: text("A is upper triangular.", "A 是上三角矩陣。", "A 是上三角矩阵。"),
      },
      {
        id: "d",
        text: text("det(A)=1.", "det(A)=1。", "det(A)=1。"),
      },
    ],
    correctAnswer: { choiceId: "a" },
    hints: [
      text(
        "Diagonalization is a basis change, so ask what the columns of the change-of-basis matrix must be.",
        "對角化本質上是一個基變換，所以要問換基矩陣的各列必須是甚麼。",
        "对角化本质上是一个基变换，所以要问换基矩阵的各列必须是什么。"
      ),
    ],
    showCorrectAnswerPolicy: "after-max-attempts",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "MEMBER",
    solutionSteps: [
      text(
        "If S^{-1}AS is diagonal, then the columns of S must be eigenvectors of A.",
        "若 S^{-1}AS 是對角矩陣，則 S 的各列必須是 A 的特徵向量。",
        "若 S^{-1}AS 是对角矩阵，则 S 的各列必须是 A 的特征向量。"
      ),
      text(
        "S must also be invertible, so those eigenvectors must be linearly independent and form a basis.",
        "而 S 亦必須可逆，所以這些特徵向量必須線性無關並形成一組基底。",
        "而 S 也必须可逆，所以这些特征向量必须线性无关并形成一组基底。"
      ),
    ],
    skillTags: ["diagonalization", "eigenvector", "basis"],
  },
  "checkpoint.math1030.diagonalization-order": {
    accessTier: "MEMBER",
    id: "checkpoint.math1030.diagonalization-order",
    type: "MCQ",
    courseId: "math1030",
    chapterId: "eigenvalues",
    unitId: "math1030.eigenvalues.diagonalization-and-similarity",
    inputMode: "text",
    maxAttempts: 5,
    points: 1,
    prompt: text(
      "Suppose `S=[v_1 v_2]`, `Av_1=3v_1`, and `Av_2=1v_2`. What is `S^{-1}AS`?",
      "假設 `S=[v_1 v_2]`、`Av_1=3v_1`、`Av_2=1v_2`。`S^{-1}AS` 是甚麼？",
      "假设 `S=[v_1 v_2]`、`Av_1=3v_1`、`Av_2=1v_2`。`S^{-1}AS` 是什么？"
    ),
    choices: [
      { id: "a", text: text("`diag(3,1)`", "`diag(3,1)`", "`diag(3,1)`") },
      { id: "b", text: text("`diag(1,3)`", "`diag(1,3)`", "`diag(1,3)`") },
      { id: "c", text: text("`[[0,3],[1,0]]`", "`[[0,3],[1,0]]`", "`[[0,3],[1,0]]`") },
      { id: "d", text: text("It cannot be diagonal.", "它不可能是對角矩陣。", "它不可能是对角矩阵。") },
    ],
    correctAnswer: { choiceId: "a" },
    hints: [
      text(
        "The diagonal entries must follow the same order as the eigenvector columns in `S`.",
        "對角線元素必須跟 `S` 的特徵向量列次序一致。",
        "对角线元素必须跟 `S` 的特征向量列次序一致。"
      ),
    ],
    showCorrectAnswerPolicy: "after-max-attempts",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "MEMBER",
    solutionSteps: [
      text(
        "The first column of `S` is `v_1`, whose eigenvalue is `3`.",
        "`S` 的第一列是 `v_1`，它的特徵值是 `3`。",
        "`S` 的第一列是 `v_1`，它的特征值是 `3`。"
      ),
      text(
        "The second column is `v_2`, whose eigenvalue is `1`.",
        "第二列是 `v_2`，它的特徵值是 `1`。",
        "第二列是 `v_2`，它的特征值是 `1`。"
      ),
      text(
        "Therefore the diagonal matrix is `diag(3,1)`.",
        "因此對角矩陣是 `diag(3,1)`。",
        "因此对角矩阵是 `diag(3,1)`。"
      ),
    ],
    skillTags: ["diagonalization", "eigenvector", "basis-order"],
  },
  "checkpoint.math1030.characteristic-root": {
    accessTier: "MEMBER",
    id: "checkpoint.math1030.characteristic-root",
    type: "FILL_IN_BLANK",
    courseId: "math1030",
    chapterId: "eigenvalues",
    unitId: "math1030.eigenvalues.characteristic-polynomials-and-diagonalization-tests",
    inputMode: "math-expression",
    maxAttempts: 5,
    points: 1,
    prompt: text(
      "Fill in the blank: λ is an eigenvalue of A exactly when p_A(λ)= ____.",
      "填空：λ 是 A 的特徵值，當且僅當 p_A(λ)= ____。",
      "填空：λ 是 A 的特征值，当且仅当 p_A(λ)= ____。"
    ),
    correctAnswer: {
      value: "0",
      equivalentValues: ["zero"],
      equivalence: [{ type: "trimmed" }, { type: "case-insensitive" }],
    },
    hints: [
      text(
        "The characteristic polynomial packages the determinant test det(A-λI)=0.",
        "特徵多項式其實只是把 det(A-λI)=0 的測試打包起來。",
        "特征多项式其实只是把 det(A-λI)=0 的测试打包起来。"
      ),
    ],
    showCorrectAnswerPolicy: "after-max-attempts",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "MEMBER",
    syntaxGuidance: text(
      "A one-symbol answer is enough.",
      "輸入一個符號答案就足夠。",
      "输入一个符号答案就足够。"
    ),
    solutionSteps: [
      text(
        "By definition, p_A(x)=det(A-xI).",
        "按定義，p_A(x)=det(A-xI)。",
        "按定义，p_A(x)=det(A-xI)。"
      ),
      text(
        "A scalar λ is an eigenvalue exactly when det(A-λI)=0.",
        "純量 λ 是特徵值，當且僅當 det(A-λI)=0。",
        "标量 λ 是特征值，当且仅当 det(A-λI)=0。"
      ),
      text(
        "So p_A(λ)=0 is the exact root condition.",
        "因此 p_A(λ)=0 正正就是特徵值的根條件。",
        "因此 p_A(λ)=0 正正就是特征值的根条件。"
      ),
    ],
    skillTags: ["characteristic-polynomial", "eigenvalue", "root-test"],
  },
  "checkpoint.math1030.inner-product-orthogonal": {
    accessTier: "MEMBER",
    id: "checkpoint.math1030.inner-product-orthogonal",
    type: "MCQ",
    courseId: "math1030",
    chapterId: "inner-products",
    unitId: "math1030.inner-products.inner-products-norms-and-angles",
    inputMode: "text",
    maxAttempts: 5,
    points: 1,
    prompt: text(
      "What condition is equivalent to saying that two vectors v and w are orthogonal in R^m?",
      "在 R^m 中，哪個條件與「向量 v 與 w 正交」等價？",
      "在 R^m 中，哪个条件与“向量 v 与 w 正交”等价？"
    ),
    choices: [
      { id: "a", text: text("⟨v,w⟩=0", "⟨v,w⟩=0", "⟨v,w⟩=0") },
      { id: "b", text: text("||v||=||w||", "||v||=||w||", "||v||=||w||") },
      { id: "c", text: text("v+w=0", "v+w=0", "v+w=0") },
      { id: "d", text: text("det([v w])=1", "det([v w])=1", "det([v w])=1") },
    ],
    correctAnswer: { choiceId: "a" },
    hints: [
      text(
        "Orthogonality is defined through the inner product, not through equal length.",
        "正交係以內積去定義，並不是以長度是否相同去定義。",
        "正交是以内积去定义，并不是以长度是否相同去定义。"
      ),
    ],
    showCorrectAnswerPolicy: "after-max-attempts",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "MEMBER",
    solutionSteps: [
      text(
        "By definition, two vectors are orthogonal exactly when their inner product is 0.",
        "按定義，兩個向量正交，當且僅當它們的內積等於 0。",
        "按定义，两个向量正交，当且仅当它们的内积等于 0。"
      ),
    ],
    skillTags: ["inner-product", "orthogonal"],
  },
  "checkpoint.math1030.angle-cosine": {
    accessTier: "MEMBER",
    id: "checkpoint.math1030.angle-cosine",
    type: "MCQ",
    courseId: "math1030",
    chapterId: "inner-products",
    unitId: "math1030.inner-products.inner-products-norms-and-angles",
    inputMode: "text",
    maxAttempts: 5,
    points: 1,
    prompt: text(
      "For `u=(1,2)` and `v=(3,1)`, what is `cos(theta)`, where `theta` is the angle between them?",
      "對 `u=(1,2)` 和 `v=(3,1)`，若 `theta` 是它們的夾角，`cos(theta)` 是多少？",
      "对 `u=(1,2)` 和 `v=(3,1)`，若 `theta` 是它们的夹角，`cos(theta)` 是多少？"
    ),
    choices: [
      { id: "a", text: text("`1/sqrt(2)`", "`1/sqrt(2)`", "`1/sqrt(2)`") },
      { id: "b", text: text("`0`", "`0`", "`0`") },
      { id: "c", text: text("`sqrt(2)`", "`sqrt(2)`", "`sqrt(2)`") },
      { id: "d", text: text("`-1/sqrt(2)`", "`-1/sqrt(2)`", "`-1/sqrt(2)`") },
    ],
    correctAnswer: { choiceId: "a" },
    hints: [
      text(
        "Use `cos(theta)=<u,v>/(||u|| ||v||)`.",
        "使用 `cos(theta)=<u,v>/(||u|| ||v||)`。",
        "使用 `cos(theta)=<u,v>/(||u|| ||v||)`。"
      ),
    ],
    showCorrectAnswerPolicy: "after-max-attempts",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "MEMBER",
    solutionSteps: [
      text(
        "`<u,v>=1*3+2*1=5`.",
        "`<u,v>=1*3+2*1=5`。",
        "`<u,v>=1*3+2*1=5`。"
      ),
      text(
        "`||u||=sqrt(5)` and `||v||=sqrt(10)`.",
        "`||u||=sqrt(5)` 且 `||v||=sqrt(10)`。",
        "`||u||=sqrt(5)` 且 `||v||=sqrt(10)`。"
      ),
      text(
        "Thus `cos(theta)=5/(sqrt(5)sqrt(10))=1/sqrt(2)`.",
        "因此 `cos(theta)=5/(sqrt(5)sqrt(10))=1/sqrt(2)`。",
        "因此 `cos(theta)=5/(sqrt(5)sqrt(10))=1/sqrt(2)`。"
      ),
    ],
    skillTags: ["inner-product", "angle", "norm"],
  },
  "checkpoint.math1030.orthonormal-coefficient": {
    accessTier: "MEMBER",
    id: "checkpoint.math1030.orthonormal-coefficient",
    type: "FILL_IN_BLANK",
    courseId: "math1030",
    chapterId: "inner-products",
    unitId: "math1030.inner-products.orthogonal-sets-and-orthonormal-bases",
    inputMode: "math-expression",
    maxAttempts: 5,
    points: 1,
    prompt: text(
      "Fill in the blank: if {v1,...,vk} is orthonormal and v lies in its span, then the coefficient of vi in the expansion of v is ____.",
      "填空：若 {v1,...,vk} 是標準正交集，而 v 落在它們的張成空間內，則 v 在 vi 方向上的係數是 ____。",
      "填空：若 {v1,...,vk} 是标准正交集，而 v 落在它们的张成空间内，则 v 在 vi 方向上的系数是 ____。"
    ),
    correctAnswer: {
      value: "<v,vi>",
      equivalentValues: ["⟨v,vi⟩", "inner product of v and vi", "⟨v,v_i⟩", "<v,v_i>"],
      equivalence: [{ type: "trimmed" }, { type: "symbolic" }, { type: "case-insensitive" }],
    },
    hints: [
      text(
        "In an orthonormal basis, the denominator ||vi||^2 disappears because it equals 1.",
        "在標準正交基中，分母 ||vi||^2 會消失，因為它等於 1。",
        "在标准正交基中，分母 ||vi||^2 会消失，因为它等于 1。"
      ),
    ],
    showCorrectAnswerPolicy: "after-max-attempts",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "MEMBER",
    syntaxGuidance: text(
      "A short symbolic answer such as `⟨v,v_i⟩` or `<v,vi>` is enough.",
      "輸入 `⟨v,v_i⟩` 或 `<v,vi>` 呢種簡短符號答案已足夠。",
      "输入 `⟨v,v_i⟩` 或 `<v,vi>` 这种简短符号答案已足够。"
    ),
    solutionSteps: [
      text(
        "For an orthogonal basis, the coefficient is ⟨v,vi⟩ / ||vi||^2.",
        "對正交基而言，係數公式是 ⟨v,vi⟩ / ||vi||^2。",
        "对正交基而言，系数公式是 ⟨v,vi⟩ / ||vi||^2。"
      ),
      text(
        "If the basis is orthonormal, then ||vi||=1, so ||vi||^2=1.",
        "若基底是標準正交，則 ||vi||=1，所以 ||vi||^2=1。",
        "若基底是标准正交，则 ||vi||=1，所以 ||vi||^2=1。"
      ),
      text(
        "Therefore the coefficient is just ⟨v,vi⟩.",
        "因此，係數就直接是 ⟨v,vi⟩。",
        "因此，系数就直接是 ⟨v,vi⟩。"
      ),
    ],
    skillTags: ["orthonormal-basis", "inner-product", "coordinates"],
  },
  "checkpoint.math1030.gram-schmidt-span": {
    accessTier: "MEMBER",
    id: "checkpoint.math1030.gram-schmidt-span",
    type: "MCQ",
    courseId: "math1030",
    chapterId: "inner-products",
    unitId: "math1030.inner-products.gram-schmidt-orthogonalization",
    inputMode: "text",
    maxAttempts: 5,
    points: 1,
    prompt: text(
      "Besides producing orthogonal vectors, what does Gram-Schmidt preserve at each step?",
      "除咗產生正交向量之外，Gram-Schmidt 在每一步還保留了甚麼？",
      "除了产生正交向量之外，Gram-Schmidt 在每一步还保留了什么？"
    ),
    choices: [
      {
        id: "a",
        text: text("The span of the vectors processed so far.", "到目前為止那些向量所張成的空間。", "到目前为止那些向量所张成的空间。"),
      },
      {
        id: "b",
        text: text("Every original coordinate entry exactly.", "每個原始坐標項都完全不變。", "每个原始坐标项都完全不变。"),
      },
      {
        id: "c",
        text: text("The determinant of the matrix formed by the vectors.", "由這些向量組成矩陣的行列式。", "由这些向量组成矩阵的行列式。"),
      },
      {
        id: "d",
        text: text("The norm of each original vector.", "每個原始向量的範數。", "每个原始向量的范数。"),
      },
    ],
    correctAnswer: { choiceId: "a" },
    hints: [
      text(
        "The process changes the vectors, but it keeps the same subspace available for spanning.",
        "這個過程會改變向量，但會保留同一個可張成的子空間。",
        "这个过程会改变向量，但会保留同一个可张成的子空间。"
      ),
    ],
    showCorrectAnswerPolicy: "after-max-attempts",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "MEMBER",
    solutionSteps: [
      text(
        "At step ℓ, Gram-Schmidt replaces wℓ by the part of wℓ that is orthogonal to the earlier vectors.",
        "在第 ℓ 步，Gram-Schmidt 會把 wℓ 換成與前面向量正交的那部分。",
        "在第 ℓ 步，Gram-Schmidt 会把 wℓ 换成与前面向量正交的那部分。"
      ),
      text(
        "That new vector lies in the span of w1,...,wℓ, and conversely wℓ lies in the span of the new orthogonal list.",
        "新向量仍然落在 w1,...,wℓ 的張成空間內；反過來，wℓ 也可由新正交向量組表示。",
        "新向量仍然落在 w1,...,wℓ 的张成空间内；反过来，wℓ 也可由新正交向量组表示。"
      ),
      text(
        "So the span is preserved at every stage.",
        "因此，每一步都保留相同的張成空間。",
        "因此，每一步都保留相同的张成空间。"
      ),
    ],
    skillTags: ["gram-schmidt", "span", "orthogonal-basis"],
  },
  "checkpoint.math1030.gram-schmidt-projection-coefficient": {
    accessTier: "MEMBER",
    id: "checkpoint.math1030.gram-schmidt-projection-coefficient",
    type: "FILL_IN_BLANK",
    courseId: "math1030",
    chapterId: "inner-products",
    unitId: "math1030.inner-products.gram-schmidt-orthogonalization",
    inputMode: "math-expression",
    maxAttempts: 5,
    points: 1,
    prompt: text(
      "In Gram-Schmidt, let `v_1=w_1=(1,1,0)` and `w_2=(1,0,1)`. Fill in `(<w_2,v_1>)/(||v_1||^2)=____`.",
      "在 Gram-Schmidt 中，令 `v_1=w_1=(1,1,0)` 且 `w_2=(1,0,1)`。填空：`(<w_2,v_1>)/(||v_1||^2)=____`。",
      "在 Gram-Schmidt 中，令 `v_1=w_1=(1,1,0)` 且 `w_2=(1,0,1)`。填空：`(<w_2,v_1>)/(||v_1||^2)=____`。"
    ),
    correctAnswer: {
      value: "1/2",
      equivalentValues: ["0.5", ".5"],
      equivalence: [{ type: "trimmed" }, { type: "symbolic" }],
    },
    hints: [
      text(
        "`<w_2,v_1>=1` and `||v_1||^2=2`.",
        "`<w_2,v_1>=1` 且 `||v_1||^2=2`。",
        "`<w_2,v_1>=1` 且 `||v_1||^2=2`。"
      ),
    ],
    showCorrectAnswerPolicy: "after-max-attempts",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "MEMBER",
    syntaxGuidance: text(
      "Enter a number or fraction.",
      "請輸入數字或分數。",
      "请输入数字或分数。"
    ),
    solutionSteps: [
      text(
        "Compute `<w_2,v_1>=(1,0,1) dot (1,1,0)=1`.",
        "計算 `<w_2,v_1>=(1,0,1) dot (1,1,0)=1`。",
        "计算 `<w_2,v_1>=(1,0,1) dot (1,1,0)=1`。"
      ),
      text(
        "Compute `||v_1||^2=1^2+1^2+0^2=2`.",
        "計算 `||v_1||^2=1^2+1^2+0^2=2`。",
        "计算 `||v_1||^2=1^2+1^2+0^2=2`。"
      ),
      text(
        "Therefore the projection coefficient is `1/2`.",
        "因此投影係數是 `1/2`。",
        "因此投影系数是 `1/2`。"
      ),
    ],
    skillTags: ["gram-schmidt", "projection", "inner-product"],
  },
  "checkpoint.math1030.cauchy-schwarz-bound": {
    accessTier: "MEMBER",
    id: "checkpoint.math1030.cauchy-schwarz-bound",
    type: "MCQ",
    courseId: "math1030",
    chapterId: "inner-products",
    unitId: "math1030.inner-products.cauchy-schwarz-and-triangle-inequalities",
    inputMode: "text",
    maxAttempts: 5,
    points: 1,
    prompt: text(
      "What does the Cauchy-Schwarz inequality say about the inner product of v and w?",
      "Cauchy-Schwarz 不等式對 v 與 w 的內積給出甚麼估計？",
      "Cauchy-Schwarz 不等式对 v 与 w 的内积给出什么估计？"
    ),
    choices: [
      {
        id: "a",
        text: text("|⟨v,w⟩| ≤ ||v|| ||w||", "|⟨v,w⟩| ≤ ||v|| ||w||", "|⟨v,w⟩| ≤ ||v|| ||w||"),
      },
      {
        id: "b",
        text: text("|⟨v,w⟩| ≥ ||v|| + ||w||", "|⟨v,w⟩| ≥ ||v|| + ||w||", "|⟨v,w⟩| ≥ ||v|| + ||w||"),
      },
      {
        id: "c",
        text: text("⟨v,w⟩ = ||v+w||", "⟨v,w⟩ = ||v+w||", "⟨v,w⟩ = ||v+w||"),
      },
      {
        id: "d",
        text: text("||v-w|| = ||v|| ||w||", "||v-w|| = ||v|| ||w||", "||v-w|| = ||v|| ||w||"),
      },
    ],
    correctAnswer: { choiceId: "a" },
    hints: [
      text(
        "The inequality compares the absolute value of the inner product with the product of the two lengths.",
        "這條不等式是把內積的絕對值，拿去和兩個長度的乘積比較。",
        "这条不等式是把内积的绝对值，拿去和两个长度的乘积比较。"
      ),
    ],
    showCorrectAnswerPolicy: "after-max-attempts",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "MEMBER",
    solutionSteps: [
      text(
        "Cauchy-Schwarz states that the size of the inner product cannot exceed the product of the norms.",
        "Cauchy-Schwarz 表示內積的大小，不會超過兩個範數的乘積。",
        "Cauchy-Schwarz 表示内积的大小，不会超过两个范数的乘积。"
      ),
      text(
        "So the correct inequality is |⟨v,w⟩| ≤ ||v|| ||w||.",
        "所以正確估計是 |⟨v,w⟩| ≤ ||v|| ||w||。",
        "所以正确估计是 |⟨v,w⟩| ≤ ||v|| ||w||。"
      ),
    ],
    skillTags: ["cauchy-schwarz", "inner-product", "norm"],
  },
  "checkpoint.math1030.solution-set-parametric-line": {
    accessTier: "FREE",
    id: "checkpoint.math1030.solution-set-parametric-line",
    type: "FILL_IN_BLANK",
    courseId: "math1030",
    chapterId: "systems",
    unitId: "math1030.systems.equations-solution-sets",
    inputMode: "math-expression",
    maxAttempts: unlimited,
    points: 1,
    prompt: text(
      "Fill in the blank: for the system `x_1 - 2x_2 = 3`, if `x_2=t`, then `x_1 = ____`.",
      "填空：對方程組 `x_1 - 2x_2 = 3`，若 `x_2=t`，則 `x_1 = ____`。",
      "填空：对方程组 `x_1 - 2x_2 = 3`，若 `x_2=t`，则 `x_1 = ____`。"
    ),
    correctAnswer: {
      value: "3+2t",
      equivalentValues: ["2t+3", "3 + 2t", "2 t + 3"],
      equivalence: [{ type: "trimmed" }, { type: "symbolic" }],
    },
    hints: [
      text(
        "Solve the equation for `x_1` after substituting `x_2=t`.",
        "代入 `x_2=t` 後，把方程解成 `x_1` 的形式。",
        "代入 `x_2=t` 后，把方程解成 `x_1` 的形式。"
      ),
    ],
    showCorrectAnswerPolicy: "after-submit",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "FREE",
    syntaxGuidance: text(
      "Enter a short expression in `t`, such as `3+2t`.",
      "請輸入含 `t` 的簡短式子，例如 `3+2t`。",
      "请输入含 `t` 的简短式子，例如 `3+2t`。"
    ),
    solutionSteps: [
      text(
        "Substitute `x_2=t` into `x_1 - 2x_2 = 3`.",
        "把 `x_2=t` 代入 `x_1 - 2x_2 = 3`。",
        "把 `x_2=t` 代入 `x_1 - 2x_2 = 3`。"
      ),
      text(
        "This gives `x_1 - 2t = 3`, so `x_1 = 3+2t`.",
        "得到 `x_1 - 2t = 3`，所以 `x_1 = 3+2t`。",
        "得到 `x_1 - 2t = 3`，所以 `x_1 = 3+2t`。"
      ),
    ],
    skillTags: ["solution-set", "parameter", "linear-system"],
  },
  "checkpoint.math1030.matrix-size-notation": {
    accessTier: "FREE",
    id: "checkpoint.math1030.matrix-size-notation",
    type: "FILL_IN_BLANK",
    courseId: "math1030",
    chapterId: "matrices",
    unitId: "math1030.matrices.matrix-basics",
    inputMode: "text",
    maxAttempts: unlimited,
    points: 1,
    prompt: text(
      "Fill in the blank: a matrix with 4 rows and 3 columns has size ____.",
      "填空：一個有 4 行、3 列的矩陣，其大小是 ____。",
      "填空：一个有 4 行、3 列的矩阵，其大小是 ____。"
    ),
    correctAnswer: {
      value: "4x3",
      equivalentValues: ["4×3", "4 x 3", "4 by 3", "4 rows by 3 columns"],
      equivalence: [{ type: "trimmed" }, { type: "case-insensitive" }],
    },
    hints: [
      text(
        "Matrix size is always read as rows by columns.",
        "矩陣大小永遠按「行數乘列數」讀。",
        "矩阵大小永远按“行数乘列数”读。"
      ),
    ],
    showCorrectAnswerPolicy: "after-submit",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "FREE",
    syntaxGuidance: text(
      "Use the form `m x n` or `m×n`.",
      "可用 `m x n` 或 `m×n` 形式。",
      "可用 `m x n` 或 `m×n` 形式。"
    ),
    solutionSteps: [
      text(
        "The first number records the number of rows.",
        "第一個數記錄行數。",
        "第一个数记录行数。"
      ),
      text(
        "The second number records the number of columns, so the size is `4x3`.",
        "第二個數記錄列數，所以大小是 `4x3`。",
        "第二个数记录列数，所以大小是 `4x3`。"
      ),
    ],
    skillTags: ["matrix-basics", "matrix-dimensions"],
  },
  "checkpoint.math1030.matrix-entry-a23": {
    accessTier: "FREE",
    id: "checkpoint.math1030.matrix-entry-a23",
    type: "MCQ",
    courseId: "math1030",
    chapterId: "matrices",
    unitId: "math1030.matrices.matrix-basics",
    inputMode: "text",
    maxAttempts: unlimited,
    points: 1,
    prompt: text(
      "Let `A = [[1,2,0],[3,-1,4]]`. What is `a_23`?",
      "設 `A = [[1,2,0],[3,-1,4]]`。`a_23` 是多少？",
      "设 `A = [[1,2,0],[3,-1,4]]`。`a_23` 是多少？"
    ),
    choices: [
      { id: "a", text: text("`0`", "`0`", "`0`") },
      { id: "b", text: text("`3`", "`3`", "`3`") },
      { id: "c", text: text("`4`", "`4`", "`4`") },
      { id: "d", text: text("`-1`", "`-1`", "`-1`") },
    ],
    correctAnswer: { choiceId: "c" },
    hints: [
      text(
        "The first subscript is the row number and the second subscript is the column number.",
        "第一個下標是行號，第二個下標是列號。",
        "第一个下标是行号，第二个下标是列号。"
      ),
    ],
    showCorrectAnswerPolicy: "after-submit",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "FREE",
    solutionSteps: [
      text(
        "`a_23` means the entry in row 2 and column 3.",
        "`a_23` 表示第 2 行第 3 列的元素。",
        "`a_23` 表示第 2 行第 3 列的元素。"
      ),
      text(
        "Row 2 is `[3,-1,4]`, so the column 3 entry is `4`.",
        "第 2 行是 `[3,-1,4]`，所以第 3 列的元素是 `4`。",
        "第 2 行是 `[3,-1,4]`，所以第 3 列的元素是 `4`。"
      ),
    ],
    skillTags: ["matrix-basics", "entry-notation"],
  },
  "checkpoint.math1030.matrix-missing-zero-coefficient": {
    accessTier: "FREE",
    id: "checkpoint.math1030.matrix-missing-zero-coefficient",
    type: "FILL_IN_BLANK",
    courseId: "math1030",
    chapterId: "matrices",
    unitId: "math1030.matrices.matrix-basics",
    inputMode: "math-expression",
    maxAttempts: unlimited,
    points: 1,
    prompt: text(
      "Using variable order `(x_1,x_2,x_3)`, the equation `2x_1 - x_3 = 5` has coefficient ____ in column 2.",
      "按變量次序 `(x_1,x_2,x_3)`，方程 `2x_1 - x_3 = 5` 在第 2 列的係數是 ____。",
      "按变量次序 `(x_1,x_2,x_3)`，方程 `2x_1 - x_3 = 5` 在第 2 列的系数是 ____。"
    ),
    correctAnswer: {
      value: "0",
      equivalentValues: ["0.0"],
      equivalence: [{ type: "trimmed" }],
    },
    hints: [
      text(
        "Column 2 belongs to `x_2` under the stated variable order.",
        "在指定變量次序下，第 2 列屬於 `x_2`。",
        "在指定变量次序下，第 2 列属于 `x_2`。"
      ),
    ],
    showCorrectAnswerPolicy: "after-submit",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "FREE",
    syntaxGuidance: text(
      "Enter a single number.",
      "請輸入一個數字。",
      "请输入一个数字。"
    ),
    solutionSteps: [
      text(
        "Rewrite the equation with the missing variable shown: `2x_1 + 0x_2 - x_3 = 5`.",
        "把缺失的變量寫出來：`2x_1 + 0x_2 - x_3 = 5`。",
        "把缺失的变量写出来：`2x_1 + 0x_2 - x_3 = 5`。"
      ),
      text(
        "Therefore the column 2 coefficient is `0`; the zero cannot be omitted from the coefficient matrix.",
        "因此第 2 列的係數是 `0`；在係數矩陣中不能省略這個零。",
        "因此第 2 列的系数是 `0`；在系数矩阵中不能省略这个零。"
      ),
    ],
    skillTags: ["matrix-basics", "coefficient-matrix", "linear-system"],
  },
  "checkpoint.math1030.matrix-addition-defined": {
    accessTier: "FREE",
    id: "checkpoint.math1030.matrix-addition-defined",
    type: "MCQ",
    courseId: "math1030",
    chapterId: "matrices",
    unitId: "math1030.matrices.matrix-basics",
    inputMode: "text",
    maxAttempts: unlimited,
    points: 1,
    prompt: text(
      "True or false: every `2 x 3` matrix can be added to every `3 x 2` matrix.",
      "判斷：每個 `2 x 3` 矩陣都可以和每個 `3 x 2` 矩陣相加。",
      "判断：每个 `2 x 3` 矩阵都可以和每个 `3 x 2` 矩阵相加。"
    ),
    choices: [
      { id: "a", text: text("True", "正確", "正确") },
      { id: "b", text: text("False", "錯誤", "错误") },
    ],
    correctAnswer: { choiceId: "b" },
    hints: [
      text(
        "Matrix addition is entrywise, so corresponding positions must exist in both matrices.",
        "矩陣加法是逐項相加，所以兩個矩陣都必須有相同的對應位置。",
        "矩阵加法是逐项相加，所以两个矩阵都必须有相同的对应位置。"
      ),
    ],
    showCorrectAnswerPolicy: "after-submit",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "FREE",
    solutionSteps: [
      text(
        "A `2 x 3` matrix has 2 rows and 3 columns.",
        "`2 x 3` 矩陣有 2 行 3 列。",
        "`2 x 3` 矩阵有 2 行 3 列。"
      ),
      text(
        "A `3 x 2` matrix has 3 rows and 2 columns. The sizes do not match, so addition is not defined.",
        "`3 x 2` 矩陣有 3 行 2 列。兩者大小不相同，所以加法未定義。",
        "`3 x 2` 矩阵有 3 行 2 列。两者大小不相同，所以加法未定义。"
      ),
    ],
    skillTags: ["matrix-basics", "matrix-addition", "definedness"],
  },
  "checkpoint.math1030.invalid-row-operation-zero": {
    accessTier: "FREE",
    id: "checkpoint.math1030.invalid-row-operation-zero",
    type: "MCQ",
    courseId: "math1030",
    chapterId: "matrices",
    unitId: "math1030.matrices.augmented-matrices-row-operations",
    inputMode: "text",
    maxAttempts: unlimited,
    points: 1,
    prompt: text(
      "Which proposed row operation is not an elementary row operation?",
      "以下哪一個候選行變換不是基本行變換？",
      "以下哪一个候选行变换不是基本行变换？"
    ),
    choices: [
      { id: "a", text: text("Swap two rows.", "交換兩行。", "交换两行。") },
      { id: "b", text: text("Multiply a row by `0`.", "把一行乘以 `0`。", "把一行乘以 `0`。") },
      { id: "c", text: text("Multiply a row by a nonzero scalar.", "把一行乘以非零常數。", "把一行乘以非零常数。") },
      { id: "d", text: text("Add a multiple of one row to another row.", "把某行的倍數加到另一行。", "把某行的倍数加到另一行。") },
    ],
    correctAnswer: { choiceId: "b" },
    hints: [
      text(
        "Elementary row operations must be reversible.",
        "基本行變換必須可以逆轉。",
        "基本行变换必须可以逆转。"
      ),
    ],
    showCorrectAnswerPolicy: "after-submit",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "FREE",
    solutionSteps: [
      text(
        "Multiplying a row by `0` destroys information in that row.",
        "把一行乘以 `0` 會刪去該行原本的資訊。",
        "把一行乘以 `0` 会删去该行原本的信息。"
      ),
      text(
        "Because the move cannot be reversed, it does not preserve the solution set in general.",
        "因為這一步不能逆轉，所以一般不會保留解集。",
        "因为这一步不能逆转，所以一般不会保留解集。"
      ),
    ],
    skillTags: ["row-operations", "equivalent-systems", "reversibility"],
  },
  "checkpoint.math1030.rref-contradiction-row": {
    accessTier: "FREE",
    id: "checkpoint.math1030.rref-contradiction-row",
    type: "MCQ",
    courseId: "math1030",
    chapterId: "matrices",
    unitId: "math1030.matrices.solution-set-types",
    inputMode: "text",
    maxAttempts: unlimited,
    points: 1,
    prompt: text(
      "In an augmented matrix, what does a row `[0 0 0 | 5]` mean?",
      "在增廣矩陣中，一行 `[0 0 0 | 5]` 代表甚麼？",
      "在增广矩阵中，一行 `[0 0 0 | 5]` 代表什么？"
    ),
    choices: [
      { id: "a", text: text("There is a free variable.", "存在自由變量。", "存在自由变量。") },
      { id: "b", text: text("The system has a unique solution.", "方程組有唯一解。", "方程组有唯一解。") },
      { id: "c", text: text("The system is inconsistent.", "方程組不一致。", "方程组不一致。") },
      { id: "d", text: text("The row can be ignored because it starts with zeros.", "這行可忽略，因為左邊全是零。", "这行可忽略，因为左边全是零。") },
    ],
    correctAnswer: { choiceId: "c" },
    hints: [
      text(
        "Translate the row back into an equation.",
        "把這一行翻譯回方程。",
        "把这一行翻译回方程。"
      ),
    ],
    showCorrectAnswerPolicy: "after-submit",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "FREE",
    solutionSteps: [
      text(
        "The row `[0 0 0 | 5]` says `0x_1+0x_2+0x_3=5`.",
        "這行表示 `0x_1+0x_2+0x_3=5`。",
        "这行表示 `0x_1+0x_2+0x_3=5`。"
      ),
      text(
        "That is the impossible equation `0=5`, so no vector can solve the system.",
        "這就是不可能成立的方程 `0=5`，所以沒有向量可以滿足整個系統。",
        "这就是不可能成立的方程 `0=5`，所以没有向量可以满足整个系统。"
      ),
    ],
    skillTags: ["rref", "inconsistent-system", "solution-types"],
  },
  "checkpoint.math1030.vector-space-zero-vector": {
    accessTier: "MEMBER",
    id: "checkpoint.math1030.vector-space-zero-vector",
    type: "MCQ",
    courseId: "math1030",
    chapterId: "vector-spaces",
    unitId: "math1030.vector-spaces.vector-spaces",
    inputMode: "text",
    maxAttempts: 5,
    points: 1,
    prompt: text(
      "True or false: every vector space must contain a zero vector.",
      "判斷正誤：每個向量空間都必須包含零向量。",
      "判断正误：每个向量空间都必须包含零向量。"
    ),
    choices: [
      { id: "true", text: text("True", "正確", "正确") },
      { id: "false", text: text("False", "錯誤", "错误") },
    ],
    correctAnswer: { choiceId: "true" },
    hints: [
      text(
        "One of the vector-space axioms is the existence of an additive identity.",
        "向量空間公理之一是加法單位元的存在。",
        "向量空间公理之一是加法单位元的存在。"
      ),
    ],
    showCorrectAnswerPolicy: "after-max-attempts",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "MEMBER",
    solutionSteps: [
      text(
        "A vector space has an additive identity, usually denoted `0`.",
        "向量空間有一個加法單位元，通常記作 `0`。",
        "向量空间有一个加法单位元，通常记作 `0`。"
      ),
      text(
        "Therefore every vector space contains its zero vector.",
        "因此每個向量空間都包含它自己的零向量。",
        "因此每个向量空间都包含它自己的零向量。"
      ),
    ],
    skillTags: ["vector-space", "zero-vector", "axioms", "true-false"],
  },
  "checkpoint.math1030.affine-line-not-subspace": {
    accessTier: "MEMBER",
    id: "checkpoint.math1030.affine-line-not-subspace",
    type: "MCQ",
    courseId: "math1030",
    chapterId: "vector-spaces",
    unitId: "math1030.vector-spaces.subspaces",
    inputMode: "text",
    maxAttempts: 5,
    points: 1,
    prompt: text(
      "True or false: `W={(x,y) in R^2 : x+y=1}` is a subspace of `R^2`.",
      "判斷正誤：`W={(x,y) in R^2 : x+y=1}` 是 `R^2` 的子空間。",
      "判断正误：`W={(x,y) in R^2 : x+y=1}` 是 `R^2` 的子空间。"
    ),
    choices: [
      { id: "true", text: text("True", "正確", "正确") },
      { id: "false", text: text("False", "錯誤", "错误") },
    ],
    correctAnswer: { choiceId: "false" },
    hints: [
      text(
        "First test whether the zero vector belongs to the set.",
        "先檢查零向量是否屬於這個集合。",
        "先检查零向量是否属于这个集合。"
      ),
    ],
    showCorrectAnswerPolicy: "after-max-attempts",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "MEMBER",
    solutionSteps: [
      text(
        "The zero vector `(0,0)` gives `x+y=0`, not `1`.",
        "零向量 `(0,0)` 令 `x+y=0`，不是 `1`。",
        "零向量 `(0,0)` 令 `x+y=0`，不是 `1`。"
      ),
      text(
        "A subspace must contain the zero vector, so `W` is not a subspace.",
        "子空間必須包含零向量，所以 `W` 不是子空間。",
        "子空间必须包含零向量，所以 `W` 不是子空间。"
      ),
    ],
    skillTags: ["subspace-test", "zero-vector", "true-false"],
  },
  "checkpoint.math1030.linear-combination-coordinate": {
    accessTier: "MEMBER",
    id: "checkpoint.math1030.linear-combination-coordinate",
    type: "FILL_IN_BLANK",
    courseId: "math1030",
    chapterId: "vector-spaces",
    unitId: "math1030.vector-spaces.linear-combinations-and-span",
    inputMode: "vector",
    maxAttempts: 5,
    points: 1,
    prompt: text(
      "Fill in the blank: `2(1,0)+3(0,1)=____`.",
      "填空：`2(1,0)+3(0,1)=____`。",
      "填空：`2(1,0)+3(0,1)=____`。"
    ),
    correctAnswer: {
      value: "(2,3)",
      equivalentValues: ["(2, 3)", "[2,3]", "[2, 3]", "2,3", "2, 3"],
      equivalence: [{ type: "trimmed" }],
    },
    hints: [
      text(
        "Scale each vector first, then add corresponding coordinates.",
        "先把每個向量做數乘，再逐個坐標相加。",
        "先把每个向量做数乘，再逐个坐标相加。"
      ),
    ],
    showCorrectAnswerPolicy: "after-max-attempts",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "MEMBER",
    syntaxGuidance: text(
      "Enter an ordered pair such as `(2,3)`.",
      "請輸入有序對，例如 `(2,3)`。",
      "请输入有序对，例如 `(2,3)`。"
    ),
    solutionSteps: [
      text(
        "`2(1,0)=(2,0)` and `3(0,1)=(0,3)`.",
        "`2(1,0)=(2,0)`，而 `3(0,1)=(0,3)`。",
        "`2(1,0)=(2,0)`，而 `3(0,1)=(0,3)`。"
      ),
      text(
        "Adding coordinates gives `(2,0)+(0,3)=(2,3)`.",
        "逐坐標相加得到 `(2,0)+(0,3)=(2,3)`。",
        "逐坐标相加得到 `(2,0)+(0,3)=(2,3)`。"
      ),
    ],
    skillTags: ["linear-combination", "span", "coordinates"],
  },
  "checkpoint.math1030.basis-p2-dimension": {
    accessTier: "MEMBER",
    id: "checkpoint.math1030.basis-p2-dimension",
    type: "MCQ",
    courseId: "math1030",
    chapterId: "vector-spaces",
    unitId: "math1030.vector-spaces.basis-and-dimension",
    inputMode: "text",
    maxAttempts: 5,
    points: 1,
    prompt: text(
      "How many vectors must a basis of the polynomial space `P_2` have?",
      "多項式空間 `P_2` 的一組基底必須有多少個向量？",
      "多项式空间 `P_2` 的一组基底必须有多少个向量？"
    ),
    choices: [
      { id: "a", text: text("2", "2", "2") },
      { id: "b", text: text("3", "3", "3") },
      { id: "c", text: text("4", "4", "4") },
      { id: "d", text: text("Infinitely many", "無限多個", "无限多个") },
    ],
    correctAnswer: { choiceId: "b" },
    hints: [
      text(
        "`P_2` consists of polynomials `a+bx+cx^2`.",
        "`P_2` 由形如 `a+bx+cx^2` 的多項式組成。",
        "`P_2` 由形如 `a+bx+cx^2` 的多项式组成。"
      ),
    ],
    showCorrectAnswerPolicy: "after-max-attempts",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "MEMBER",
    solutionSteps: [
      text(
        "Every polynomial in `P_2` is determined by three coefficients: constant, `x`, and `x^2`.",
        "`P_2` 中每個多項式由三個係數決定：常數項、`x` 項、`x^2` 項。",
        "`P_2` 中每个多项式由三个系数决定：常数项、`x` 项、`x^2` 项。"
      ),
      text(
        "The standard basis is `{1,x,x^2}`, which has three vectors.",
        "標準基底是 `{1,x,x^2}`，共有三個向量。",
        "标准基底是 `{1,x,x^2}`，共有三个向量。"
      ),
    ],
    skillTags: ["basis", "dimension", "polynomial-space"],
  },
  "checkpoint.math1030.solution-vector-definition": {
    accessTier: "FREE",
    id: "checkpoint.math1030.solution-vector-definition",
    type: "MCQ",
    courseId: "math1030",
    chapterId: "systems",
    unitId: "math1030.systems.equations-solution-sets",
    inputMode: "text",
    maxAttempts: unlimited,
    points: 1,
    prompt: text(
      "For a system in variables `x_1,...,x_n`, what does it mean for `(s_1,...,s_n)` to be a solution?",
      "對於變量為 `x_1,...,x_n` 的方程組，`(s_1,...,s_n)` 是一個解是甚麼意思？",
      "对于变量为 `x_1,...,x_n` 的方程组，`(s_1,...,s_n)` 是一个解是什么意思？"
    ),
    choices: [
      {
        id: "a",
        text: text(
          "The numbers make every equation true when substituted in the stated order.",
          "按指定次序代入後，這些數使每條方程都成立。",
          "按指定次序代入后，这些数使每条方程都成立。"
        ),
      },
      {
        id: "b",
        text: text(
          "The numbers only need to satisfy the first equation.",
          "這些數只需要滿足第一條方程。",
          "这些数只需要满足第一条方程。"
        ),
      },
      {
        id: "c",
        text: text(
          "The numbers may be written in any order.",
          "這些數可以用任何次序書寫。",
          "这些数可以用任何次序书写。"
        ),
      },
      {
        id: "d",
        text: text(
          "The system must have no other solution.",
          "方程組必須沒有其他解。",
          "方程组必须没有其他解。"
        ),
      },
    ],
    correctAnswer: { choiceId: "a" },
    hints: [
      text(
        "The tuple records one proposed value for each variable, and all equations in the system must be checked.",
        "這個有序組為每個變量記錄一個候選值，而且必須檢查方程組中的所有方程。",
        "这个有序组为每个变量记录一个候选值，而且必须检查方程组中的所有方程。"
      ),
    ],
    showCorrectAnswerPolicy: "after-submit",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "FREE",
    solutionSteps: [
      text(
        "A solution is not just a number; it is an ordered list matching the declared variable order.",
        "一個解不只是一個數，而是配合已聲明變量次序的有序列表。",
        "一个解不只是一个数，而是配合已声明变量顺序的有序列表。"
      ),
      text(
        "After substituting `x_i=s_i` for every variable, every equation in the system must become a true statement.",
        "把每個變量代成 `x_i=s_i` 後，方程組中的每條方程都必須變成真命題。",
        "把每个变量代成 `x_i=s_i` 后，方程组中的每条方程都必须变成真命题。"
      ),
    ],
    skillTags: ["linear-system", "solution-set", "ordered-tuples"],
  },
  "checkpoint.math1030.free-variable-parametric-solution": {
    accessTier: "FREE",
    id: "checkpoint.math1030.free-variable-parametric-solution",
    type: "FILL_IN_BLANK",
    courseId: "math1030",
    chapterId: "systems",
    unitId: "math1030.systems.equations-solution-sets",
    inputMode: "math-expression",
    maxAttempts: unlimited,
    points: 1,
    prompt: text(
      "For `x_1-5x_4=1`, if the free variable is `x_4=t`, then `x_1=____`.",
      "對方程 `x_1-5x_4=1`，若自由變量是 `x_4=t`，則 `x_1=____`。",
      "对方程 `x_1-5x_4=1`，若自由变量是 `x_4=t`，则 `x_1=____`。"
    ),
    correctAnswer: {
      value: "1+5t",
      equivalentValues: ["5t+1", "1 + 5t", "5 t + 1"],
      equivalence: [{ type: "trimmed" }, { type: "symbolic" }],
    },
    hints: [
      text(
        "Move the term involving the free variable to the right-hand side.",
        "把含自由變量的項移到右邊。",
        "把含自由变量的项移到右边。"
      ),
    ],
    showCorrectAnswerPolicy: "after-submit",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "FREE",
    syntaxGuidance: text(
      "Enter a short expression in `t`, such as `1+5t`.",
      "請輸入含 `t` 的簡短式子，例如 `1+5t`。",
      "请输入含 `t` 的简短式子，例如 `1+5t`。"
    ),
    solutionSteps: [
      text(
        "Substitute `x_4=t` into `x_1-5x_4=1`.",
        "把 `x_4=t` 代入 `x_1-5x_4=1`。",
        "把 `x_4=t` 代入 `x_1-5x_4=1`。"
      ),
      text(
        "Then `x_1-5t=1`, so `x_1=1+5t`.",
        "得到 `x_1-5t=1`，所以 `x_1=1+5t`。",
        "得到 `x_1-5t=1`，所以 `x_1=1+5t`。"
      ),
    ],
    skillTags: ["linear-system", "free-variable", "parametric-form"],
  },
  "checkpoint.math1030.row-operation-reversibility": {
    accessTier: "FREE",
    id: "checkpoint.math1030.row-operation-reversibility",
    type: "MCQ",
    courseId: "math1030",
    chapterId: "matrices",
    unitId: "math1030.matrices.augmented-matrices-row-operations",
    inputMode: "text",
    maxAttempts: unlimited,
    points: 1,
    prompt: text(
      "If a row operation replaces `R_3` by `R_3+2R_1`, which operation reverses it?",
      "若某個行變換把 `R_3` 換成 `R_3+2R_1`，哪個行變換可以把它逆轉？",
      "若某个行变换把 `R_3` 换成 `R_3+2R_1`，哪个行变换可以把它逆转？"
    ),
    choices: [
      { id: "a", text: text("Replace `R_3` by `R_3-2R_1`.", "把 `R_3` 換成 `R_3-2R_1`。", "把 `R_3` 换成 `R_3-2R_1`。") },
      { id: "b", text: text("Replace `R_1` by `R_1-2R_3`.", "把 `R_1` 換成 `R_1-2R_3`。", "把 `R_1` 换成 `R_1-2R_3`。") },
      { id: "c", text: text("Multiply `R_3` by `0`.", "把 `R_3` 乘以 `0`。", "把 `R_3` 乘以 `0`。") },
      { id: "d", text: text("Swap `R_1` and `R_3`.", "交換 `R_1` 和 `R_3`。", "交换 `R_1` 和 `R_3`。") },
    ],
    correctAnswer: { choiceId: "a" },
    hints: [
      text(
        "To undo adding a multiple of another row, add the opposite multiple of that same row.",
        "要逆轉「加上另一行的倍數」，就加上同一行的相反倍數。",
        "要逆转“加上另一行的倍数”，就加上同一行的相反倍数。"
      ),
    ],
    showCorrectAnswerPolicy: "after-submit",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "FREE",
    solutionSteps: [
      text(
        "After the first operation, the new third row is old `R_3+2R_1`.",
        "第一步之後，新的第三行是舊的 `R_3+2R_1`。",
        "第一步之后，新的第三行是旧的 `R_3+2R_1`。"
      ),
      text(
        "Subtracting `2R_1` from that row gives `(old R_3+2R_1)-2R_1=old R_3`.",
        "再從該行減去 `2R_1`，得到 `(舊 R_3+2R_1)-2R_1=舊 R_3`。",
        "再从该行减去 `2R_1`，得到 `(旧 R_3+2R_1)-2R_1=旧 R_3`。"
      ),
    ],
    skillTags: ["row-operations", "equivalent-systems", "reversibility"],
  },
  "checkpoint.math1030.rref-free-variable-column": {
    accessTier: "FREE",
    id: "checkpoint.math1030.rref-free-variable-column",
    type: "MCQ",
    courseId: "math1030",
    chapterId: "matrices",
    unitId: "math1030.matrices.gaussian-elimination-rref",
    inputMode: "text",
    maxAttempts: unlimited,
    points: 1,
    prompt: text(
      "In the RREF coefficient matrix `[[1,0,3],[0,1,-2]]`, which variable is free?",
      "在最簡行階梯係數矩陣 `[[1,0,3],[0,1,-2]]` 中，哪個變量是自由變量？",
      "在最简行阶梯系数矩阵 `[[1,0,3],[0,1,-2]]` 中，哪个变量是自由变量？"
    ),
    choices: [
      { id: "a", text: text("`x_1`", "`x_1`", "`x_1`") },
      { id: "b", text: text("`x_2`", "`x_2`", "`x_2`") },
      { id: "c", text: text("`x_3`", "`x_3`", "`x_3`") },
      { id: "d", text: text("No variable is free.", "沒有自由變量。", "没有自由变量。") },
    ],
    correctAnswer: { choiceId: "c" },
    hints: [
      text(
        "Pivot columns contain leading 1s. Non-pivot variable columns correspond to free variables.",
        "樞軸列含有首 1；非樞軸變量列對應自由變量。",
        "主元列含有首 1；非主元变量列对应自由变量。"
      ),
    ],
    showCorrectAnswerPolicy: "after-submit",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "FREE",
    solutionSteps: [
      text(
        "The leading 1s are in columns 1 and 2.",
        "首 1 位於第 1 列和第 2 列。",
        "首 1 位于第 1 列和第 2 列。"
      ),
      text(
        "Column 3 has no pivot, so `x_3` is the free variable.",
        "第 3 列沒有樞軸，所以 `x_3` 是自由變量。",
        "第 3 列没有主元，所以 `x_3` 是自由变量。"
      ),
    ],
    skillTags: ["rref", "pivot-columns", "free-variable"],
  },
  "checkpoint.math1030.rref-cleanup-operation": {
    accessTier: "FREE",
    id: "checkpoint.math1030.rref-cleanup-operation",
    type: "MCQ",
    courseId: "math1030",
    chapterId: "matrices",
    unitId: "math1030.matrices.gaussian-elimination-rref",
    inputMode: "text",
    maxAttempts: unlimited,
    points: 1,
    prompt: text(
      "A matrix has a pivot `1` in row 3, column 5, and the only other nonzero entry in that column is `2` in row 1. Which operation clears the pivot column?",
      "某矩陣在第 3 行第 5 列有主元 `1`，而同一列唯一其他非零元素是第 1 行的 `2`。哪個行變換能清掉這個主元列？",
      "某矩阵在第 3 行第 5 列有主元 `1`，而同一列唯一其他非零元素是第 1 行的 `2`。哪个行变换能清掉这个主元列？"
    ),
    choices: [
      { id: "a", text: text("`R_1 <- R_1 - 2R_3`", "`R_1 <- R_1 - 2R_3`", "`R_1 <- R_1 - 2R_3`") },
      { id: "b", text: text("`R_3 <- R_3 - 2R_1`", "`R_3 <- R_3 - 2R_1`", "`R_3 <- R_3 - 2R_1`") },
      { id: "c", text: text("`R_1 <- 2R_1`", "`R_1 <- 2R_1`", "`R_1 <- 2R_1`") },
      { id: "d", text: text("`R_1 <-> R_3`", "`R_1 <-> R_3`", "`R_1 <-> R_3`") },
    ],
    correctAnswer: { choiceId: "a" },
    hints: [
      text(
        "Use the pivot row to eliminate the unwanted entry above the pivot.",
        "用主元所在的行去消去主元上方不需要的元素。",
        "用主元所在的行去消去主元上方不需要的元素。"
      ),
    ],
    showCorrectAnswerPolicy: "after-submit",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "FREE",
    solutionSteps: [
      text(
        "The entry to remove is the `2` in row 1, column 5.",
        "要清掉的是第 1 行第 5 列的 `2`。",
        "要清掉的是第 1 行第 5 列的 `2`。"
      ),
      text(
        "Row 3 has the pivot `1` in that column, so subtract `2R_3` from `R_1`.",
        "第 3 行在同一列有主元 `1`，所以從 `R_1` 減去 `2R_3`。",
        "第 3 行在同一列有主元 `1`，所以从 `R_1` 减去 `2R_3`。"
      ),
      text(
        "The new column-5 entry in row 1 is `2-2(1)=0`.",
        "第 1 行第 5 列的新元素是 `2-2(1)=0`。",
        "第 1 行第 5 列的新元素是 `2-2(1)=0`。"
      ),
    ],
    skillTags: ["rref", "row-operations", "pivot-columns"],
  },
  "checkpoint.math1030.rref-parametric-coordinate": {
    accessTier: "FREE",
    id: "checkpoint.math1030.rref-parametric-coordinate",
    type: "FILL_IN_BLANK",
    courseId: "math1030",
    chapterId: "matrices",
    unitId: "math1030.matrices.gaussian-elimination-rref",
    inputMode: "math-expression",
    maxAttempts: 4,
    points: 1,
    prompt: text(
      "For the RREF rows `x_1+2x_2+x_4+2x_6=1`, `x_3-x_4-x_6=5`, and `x_5+x_6=-3`, set `x_2=1`, `x_4=0`, and `x_6=2`. Fill in the blank: `x_5=____`.",
      "對 RREF 行 `x_1+2x_2+x_4+2x_6=1`、`x_3-x_4-x_6=5`、`x_5+x_6=-3`，令 `x_2=1`、`x_4=0`、`x_6=2`。填空：`x_5=____`。",
      "对 RREF 行 `x_1+2x_2+x_4+2x_6=1`、`x_3-x_4-x_6=5`、`x_5+x_6=-3`，令 `x_2=1`、`x_4=0`、`x_6=2`。填空：`x_5=____`。"
    ),
    correctAnswer: {
      value: "-5",
      equivalentValues: ["-5.0"],
      equivalence: [{ type: "trimmed" }],
    },
    hints: [
      text(
        "Only the third row is needed: `x_5+x_6=-3`.",
        "只需要用第三行：`x_5+x_6=-3`。",
        "只需要用第三行：`x_5+x_6=-3`。"
      ),
    ],
    showCorrectAnswerPolicy: "after-max-attempts",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "FREE",
    syntaxGuidance: text(
      "Enter one scalar.",
      "請輸入一個純量。",
      "请输入一个纯量。"
    ),
    solutionSteps: [
      text(
        "The third RREF row is `x_5+x_6=-3`.",
        "第三條 RREF 行是 `x_5+x_6=-3`。",
        "第三条 RREF 行是 `x_5+x_6=-3`。"
      ),
      text(
        "Substitute `x_6=2` to get `x_5+2=-3`.",
        "代入 `x_6=2`，得到 `x_5+2=-3`。",
        "代入 `x_6=2`，得到 `x_5+2=-3`。"
      ),
      text(
        "Therefore `x_5=-5`.",
        "因此 `x_5=-5`。",
        "因此 `x_5=-5`。"
      ),
    ],
    skillTags: ["rref", "parametric-solution", "free-variable"],
  },
  "checkpoint.math1030.transpose-symmetric-sum": {
    accessTier: "FREE",
    id: "checkpoint.math1030.transpose-symmetric-sum",
    type: "MCQ",
    courseId: "math1030",
    chapterId: "matrix-algebra",
    unitId: "math1030.matrix-algebra.transpose-and-special-matrices",
    inputMode: "text",
    maxAttempts: unlimited,
    points: 1,
    prompt: text(
      "For any square matrix `A`, what can be said about `A + A^T`?",
      "對任意方陣 `A`，關於 `A + A^T` 可以說甚麼？",
      "对任意方阵 `A`，关于 `A + A^T` 可以说什么？"
    ),
    choices: [
      { id: "a", text: text("It is symmetric.", "它是對稱矩陣。", "它是对称矩阵。") },
      { id: "b", text: text("It is skew-symmetric.", "它是反對稱矩陣。", "它是反对称矩阵。") },
      { id: "c", text: text("It is always the zero matrix.", "它永遠是零矩陣。", "它永远是零矩阵。") },
      { id: "d", text: text("It is defined only when `A` is diagonal.", "只有當 `A` 是對角矩陣時才有定義。", "只有当 `A` 是对角矩阵时才有定义。") },
    ],
    correctAnswer: { choiceId: "a" },
    hints: [
      text(
        "Transpose the whole expression and use `(A^T)^T=A`.",
        "把整個式子轉置，並使用 `(A^T)^T=A`。",
        "把整个式子转置，并使用 `(A^T)^T=A`。"
      ),
    ],
    showCorrectAnswerPolicy: "after-submit",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "FREE",
    solutionSteps: [
      text(
        "`(A+A^T)^T=A^T+(A^T)^T`.",
        "`(A+A^T)^T=A^T+(A^T)^T`。",
        "`(A+A^T)^T=A^T+(A^T)^T`。"
      ),
      text(
        "Since `(A^T)^T=A`, the transpose equals `A^T+A=A+A^T`, so the matrix is symmetric.",
        "因為 `(A^T)^T=A`，轉置後等於 `A^T+A=A+A^T`，所以它是對稱矩陣。",
        "因为 `(A^T)^T=A`，转置后等于 `A^T+A=A+A^T`，所以它是对称矩阵。"
      ),
    ],
    skillTags: ["transpose", "symmetric-matrix", "matrix-algebra"],
  },
  "checkpoint.math1030.null-space-set-notation": {
    accessTier: "MEMBER",
    id: "checkpoint.math1030.null-space-set-notation",
    type: "MCQ",
    courseId: "math1030",
    chapterId: "solution-structure",
    unitId: "math1030.solution-structure.homogeneous-systems-and-null-space",
    inputMode: "text",
    maxAttempts: 5,
    points: 1,
    prompt: text(
      "If `A` is a `5 x 8` matrix, which expression correctly describes `N(A)`?",
      "若 `A` 是 `5 x 8` 矩陣，哪個式子正確描述 `N(A)`？",
      "若 `A` 是 `5 x 8` 矩阵，哪个式子正确描述 `N(A)`？"
    ),
    choices: [
      { id: "a", text: text("`{x in R^8 : Ax=0_5}`", "`{x in R^8 : Ax=0_5}`", "`{x in R^8 : Ax=0_5}`") },
      { id: "b", text: text("`{x in R^5 : Ax=0_8}`", "`{x in R^5 : Ax=0_8}`", "`{x in R^5 : Ax=0_8}`") },
      { id: "c", text: text("`{Ax=0_5 : x in R^8}`", "`{Ax=0_5 : x in R^8}`", "`{Ax=0_5 : x in R^8}`") },
      { id: "d", text: text("`{x in R^8 : A=0_5}`", "`{x in R^8 : A=0_5}`", "`{x in R^8 : A=0_5}`") },
    ],
    correctAnswer: { choiceId: "a" },
    hints: [
      text(
        "The vectors in the null space are input vectors for `A`, so their length is the number of columns.",
        "零空間中的向量是 `A` 的輸入向量，所以其長度等於列數。",
        "零空间中的向量是 `A` 的输入向量，所以其长度等于列数。"
      ),
    ],
    showCorrectAnswerPolicy: "after-max-attempts",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "MEMBER",
    solutionSteps: [
      text(
        "A `5 x 8` matrix maps vectors in `R^8` to vectors in `R^5`.",
        "`5 x 8` 矩陣把 `R^8` 中的向量映到 `R^5` 中的向量。",
        "`5 x 8` 矩阵把 `R^8` 中的向量映到 `R^5` 中的向量。"
      ),
      text(
        "Therefore `N(A)` consists of all `x in R^8` such that `Ax` is the zero vector `0_5`.",
        "因此 `N(A)` 由所有滿足 `Ax=0_5` 的 `x in R^8` 組成。",
        "因此 `N(A)` 由所有满足 `Ax=0_5` 的 `x in R^8` 组成。"
      ),
    ],
    skillTags: ["null-space", "set-notation", "homogeneous-system"],
  },
  "checkpoint.math1030.elementary-matrix-row-addition": {
    accessTier: "MEMBER",
    id: "checkpoint.math1030.elementary-matrix-row-addition",
    type: "MCQ",
    courseId: "math1030",
    chapterId: "matrix-algebra",
    unitId: "math1030.matrix-algebra.row-operation-matrices",
    inputMode: "text",
    maxAttempts: 5,
    points: 1,
    prompt: text(
      "For `3 x 3` matrices, which elementary matrix represents `R_2 <- R_2 + 3R_1`?",
      "對 `3 x 3` 矩陣，哪個初等矩陣表示 `R_2 <- R_2 + 3R_1`？",
      "对 `3 x 3` 矩阵，哪个初等矩阵表示 `R_2 <- R_2 + 3R_1`？"
    ),
    choices: [
      { id: "a", text: text("`[[1,0,0],[3,1,0],[0,0,1]]`", "`[[1,0,0],[3,1,0],[0,0,1]]`", "`[[1,0,0],[3,1,0],[0,0,1]]`") },
      { id: "b", text: text("`[[1,3,0],[0,1,0],[0,0,1]]`", "`[[1,3,0],[0,1,0],[0,0,1]]`", "`[[1,3,0],[0,1,0],[0,0,1]]`") },
      { id: "c", text: text("`[[1,0,0],[0,3,0],[0,0,1]]`", "`[[1,0,0],[0,3,0],[0,0,1]]`", "`[[1,0,0],[0,3,0],[0,0,1]]`") },
      { id: "d", text: text("`[[0,1,0],[1,0,0],[0,0,1]]`", "`[[0,1,0],[1,0,0],[0,0,1]]`", "`[[0,1,0],[1,0,0],[0,0,1]]`") },
    ],
    correctAnswer: { choiceId: "a" },
    hints: [
      text(
        "Apply the row operation to `I_3`; only row 2 changes.",
        "把行變換作用在 `I_3` 上；只有第 2 行改變。",
        "把行变换作用在 `I_3` 上；只有第 2 行改变。"
      ),
    ],
    showCorrectAnswerPolicy: "after-max-attempts",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "MEMBER",
    solutionSteps: [
      text(
        "Start from `I_3`.",
        "從 `I_3` 開始。",
        "从 `I_3` 开始。"
      ),
      text(
        "`R_2 <- R_2 + 3R_1` changes row 2 from `[0,1,0]` to `[3,1,0]`.",
        "`R_2 <- R_2 + 3R_1` 把第 2 行由 `[0,1,0]` 改成 `[3,1,0]`。",
        "`R_2 <- R_2 + 3R_1` 把第 2 行由 `[0,1,0]` 改成 `[3,1,0]`。"
      ),
      text(
        "Therefore the elementary matrix is `[[1,0,0],[3,1,0],[0,0,1]]`.",
        "因此初等矩陣是 `[[1,0,0],[3,1,0],[0,0,1]]`。",
        "因此初等矩阵是 `[[1,0,0],[3,1,0],[0,0,1]]`。"
      ),
    ],
    skillTags: ["elementary-matrix", "row-operation", "matrix-multiplication"],
  },
  "checkpoint.math1030.row-operation-product-inverse": {
    accessTier: "MEMBER",
    id: "checkpoint.math1030.row-operation-product-inverse",
    type: "MCQ",
    courseId: "math1030",
    chapterId: "matrix-algebra",
    unitId: "math1030.matrix-algebra.row-operation-matrices",
    inputMode: "text",
    maxAttempts: 5,
    points: 1,
    prompt: text(
      "A six-step row-operation chain sends `A_1` to `A_7`, and its combined left multiplier is `J`, so `A_7=JA_1`. If `K` is the combined multiplier for the reverse chain, which statement must hold?",
      "一串六步行變換把 `A_1` 變成 `A_7`，合併後的左乘矩陣是 `J`，所以 `A_7=JA_1`。若 `K` 是反向步驟的合併左乘矩陣，下列哪一項必定成立？",
      "一串六步行变换把 `A_1` 变成 `A_7`，合并后的左乘矩阵是 `J`，所以 `A_7=JA_1`。若 `K` 是反向步骤的合并左乘矩阵，下列哪一项必定成立？"
    ),
    choices: [
      { id: "a", text: text("`KJ=I_4` and `JK=I_4`.", "`KJ=I_4` 而且 `JK=I_4`。", "`KJ=I_4` 而且 `JK=I_4`。") },
      { id: "b", text: text("`KJ=O_4` because the reverse chain cancels all rows.", "`KJ=O_4`，因為反向步驟會抵消所有行。", "`KJ=O_4`，因为反向步骤会抵消所有行。") },
      { id: "c", text: text("`J+K=I_4` because reverse operations are additive inverses.", "`J+K=I_4`，因為反向行變換是加法逆元。", "`J+K=I_4`，因为反向行变换是加法逆元。") },
      { id: "d", text: text("`K=J` for every row-operation chain.", "對每一串行變換都有 `K=J`。", "对每一串行变换都有 `K=J`。") },
    ],
    correctAnswer: { choiceId: "a" },
    hints: [
      text(
        "The reverse chain sends `A_7` back to `A_1`, so it must undo left multiplication by `J`.",
        "反向步驟把 `A_7` 送回 `A_1`，所以它必須抵消左乘 `J` 的總作用。",
        "反向步骤把 `A_7` 送回 `A_1`，所以它必须抵消左乘 `J` 的总作用。"
      ),
    ],
    showCorrectAnswerPolicy: "after-max-attempts",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "MEMBER",
    solutionSteps: [
      text(
        "The forward chain gives `A_7=JA_1`.",
        "正向步驟給出 `A_7=JA_1`。",
        "正向步骤给出 `A_7=JA_1`。"
      ),
      text(
        "The reverse chain gives `A_1=KA_7`.",
        "反向步驟給出 `A_1=KA_7`。",
        "反向步骤给出 `A_1=KA_7`。"
      ),
      text(
        "Substitute `A_7=JA_1` into the reverse equation: `A_1=KJA_1` for every compatible `A_1`, so `KJ=I_4`. Since both are square inverse matrices, also `JK=I_4`.",
        "把 `A_7=JA_1` 代入反向等式：對每個相容的 `A_1`，都有 `A_1=KJA_1`，所以 `KJ=I_4`。由於兩者是方陣逆矩陣，也有 `JK=I_4`。",
        "把 `A_7=JA_1` 代入反向等式：对每个相容的 `A_1`，都有 `A_1=KJA_1`，所以 `KJ=I_4`。由于两者是方阵逆矩阵，也有 `JK=I_4`。"
      ),
    ],
    skillTags: ["row-operation-matrix", "inverse", "matrix-product-order"],
  },
  "checkpoint.math1030.parameter-row-operation-product": {
    accessTier: "MEMBER",
    id: "checkpoint.math1030.parameter-row-operation-product",
    type: "MCQ",
    courseId: "math1030",
    chapterId: "matrix-algebra",
    unitId: "math1030.matrix-algebra.row-operation-matrices",
    inputMode: "text",
    maxAttempts: 5,
    points: 1,
    prompt: text(
      "In a five-row chain, `R_2` is first replaced by `\\beta_1 R_2`, and later `R_3 \\leftarrow R_3 + \\alpha_2 R_2`. In the combined multiplier `G`, what is the entry in position `(3,2)`?",
      "在一串五行行變換中，先把 `R_2` 換成 `\\beta_1 R_2`，後來再做 `R_3 \\leftarrow R_3 + \\alpha_2 R_2`。在合併乘數 `G` 中，位置 `(3,2)` 的項是甚麼？",
      "在一串五行行变换中，先把 `R_2` 换成 `\\beta_1 R_2`，后来再做 `R_3 \\leftarrow R_3 + \\alpha_2 R_2`。在合并乘数 `G` 中，位置 `(3,2)` 的项是什么？"
    ),
    choices: [
      { id: "a", text: text("`\\alpha_2`", "`\\alpha_2`", "`\\alpha_2`") },
      { id: "b", text: text("`\\beta_1`", "`\\beta_1`", "`\\beta_1`") },
      { id: "c", text: text("`\\alpha_2\\beta_1`", "`\\alpha_2\\beta_1`", "`\\alpha_2\\beta_1`") },
      { id: "d", text: text("`\\alpha_1\\beta_2`", "`\\alpha_1\\beta_2`", "`\\alpha_1\\beta_2`") },
    ],
    correctAnswer: { choiceId: "c" },
    hints: [
      text(
        "The later operation uses the current row 2, after row 2 has already been scaled.",
        "後面的操作使用當時的第 2 行，而那一行已經被縮放。",
        "后面的操作使用当时的第 2 行，而那一行已经被缩放。"
      ),
    ],
    showCorrectAnswerPolicy: "after-max-attempts",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "MEMBER",
    solutionSteps: [
      text(
        "After the scaling step, row 2 is `\\beta_1 R_2` in terms of the original rows.",
        "經過縮放步驟後，用原來的行表示，第 2 行是 `\\beta_1 R_2`。",
        "经过缩放步骤后，用原来的行表示，第 2 行是 `\\beta_1 R_2`。"
      ),
      text(
        "The later operation adds `\\alpha_2` times that current row 2 to row 3.",
        "後面的操作把那條當前第 2 行的 `\\alpha_2` 倍加到第 3 行。",
        "后面的操作把那条当前第 2 行的 `\\alpha_2` 倍加到第 3 行。"
      ),
      text(
        "So the contribution from the original row 2 is `\\alpha_2\\beta_1 R_2`, and the `(3,2)` entry is `\\alpha_2\\beta_1`.",
        "所以來自原來第 2 行的貢獻是 `\\alpha_2\\beta_1 R_2`，`(3,2)` 項是 `\\alpha_2\\beta_1`。",
        "所以来自原来第 2 行的贡献是 `\\alpha_2\\beta_1 R_2`，`(3,2)` 项是 `\\alpha_2\\beta_1`。"
      ),
    ],
    skillTags: ["row-operation-matrix", "parameters", "matrix-product-order"],
  },
  "checkpoint.math1030.parameter-row-operation-inverse": {
    accessTier: "MEMBER",
    id: "checkpoint.math1030.parameter-row-operation-inverse",
    type: "MCQ",
    courseId: "math1030",
    chapterId: "matrix-algebra",
    unitId: "math1030.matrix-algebra.row-operation-matrices",
    inputMode: "text",
    maxAttempts: 5,
    points: 1,
    prompt: text(
      "A combined row-operation multiplier is `G`. If `D=GC` and `H` is chosen so that `C=HD`, what is the relationship between `H` and `G`?",
      "某個合併行變換乘數是 `G`。若 `D=GC`，而 `H` 被選成令 `C=HD` 成立，則 `H` 與 `G` 有甚麼關係？",
      "某个合并行变换乘数是 `G`。若 `D=GC`，而 `H` 被选成令 `C=HD` 成立，则 `H` 与 `G` 有什么关系？"
    ),
    choices: [
      { id: "a", text: text("`H=G`.", "`H=G`。", "`H=G`。") },
      { id: "b", text: text("`H=G^{-1}`.", "`H=G^{-1}`。", "`H=G^{-1}`。") },
      { id: "c", text: text("`H=G^T`.", "`H=G^T`。", "`H=G^T`。") },
      { id: "d", text: text("`H=O`.", "`H=O`。", "`H=O`。") },
    ],
    correctAnswer: { choiceId: "b" },
    hints: [
      text(
        "To recover `C` from `D`, undo the total left multiplication by `G`.",
        "要由 `D` 回到 `C`，要抵消左乘 `G` 的總作用。",
        "要由 `D` 回到 `C`，要抵消左乘 `G` 的总作用。"
      ),
    ],
    showCorrectAnswerPolicy: "after-max-attempts",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "MEMBER",
    solutionSteps: [
      text(
        "The equation `D=GC` says the row-operation chain acts by left multiplication with `G`.",
        "等式 `D=GC` 表示那串行變換的總作用是左乘 `G`。",
        "等式 `D=GC` 表示那串行变换的总作用是左乘 `G`。"
      ),
      text(
        "The equation `C=HD` must undo that action, so `HGC=C` for every compatible `C`.",
        "等式 `C=HD` 必須撤銷這個作用，所以對每個相容的 `C` 都有 `HGC=C`。",
        "等式 `C=HD` 必须撤销这个作用，所以对每个相容的 `C` 都有 `HGC=C`。"
      ),
      text(
        "Thus `HG=I`, and since these are square row-operation products, `H=G^{-1}`.",
        "因此 `HG=I`；由於它們是方陣行變換乘積，`H=G^{-1}`。",
        "因此 `HG=I`；由于它们是方阵行变换乘积，`H=G^{-1}`。"
      ),
    ],
    skillTags: ["row-operation-matrix", "inverse", "parameters"],
  },
  "checkpoint.math1030.span-nonmembership-inconsistent": {
    accessTier: "MEMBER",
    id: "checkpoint.math1030.span-nonmembership-inconsistent",
    type: "MCQ",
    courseId: "math1030",
    chapterId: "vector-spaces",
    unitId: "math1030.vector-spaces.linear-combinations-and-span",
    inputMode: "text",
    maxAttempts: 5,
    points: 1,
    prompt: text(
      "If the system `[u_1 u_2]c=v` is inconsistent, what can you conclude?",
      "若系統 `[u_1 u_2]c=v` 不一致，可以推出甚麼？",
      "若系统 `[u_1 u_2]c=v` 不一致，可以推出什么？"
    ),
    choices: [
      { id: "a", text: text("`v` is not in `Span{u_1,u_2}`.", "`v` 不屬於 `Span{u_1,u_2}`。", "`v` 不属于 `Span{u_1,u_2}`。") },
      { id: "b", text: text("`v` is automatically the zero vector.", "`v` 必定是零向量。", "`v` 必定是零向量。") },
      { id: "c", text: text("`u_1,u_2` must be independent.", "`u_1,u_2` 必定線性獨立。", "`u_1,u_2` 必定线性独立。") },
      { id: "d", text: text("Every vector is in the span.", "所有向量都屬於這個張成。", "所有向量都属于这个张成。") },
    ],
    correctAnswer: { choiceId: "a" },
    hints: [
      text(
        "Membership in the span means there exist coefficients solving the system.",
        "屬於張成表示存在係數能解這個系統。",
        "属于张成表示存在系数能解这个系统。"
      ),
    ],
    showCorrectAnswerPolicy: "after-max-attempts",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "MEMBER",
    solutionSteps: [
      text(
        "The equation `[u_1 u_2]c=v` asks whether `v=c_1u_1+c_2u_2`.",
        "方程 `[u_1 u_2]c=v` 正是在問是否有 `v=c_1u_1+c_2u_2`。",
        "方程 `[u_1 u_2]c=v` 正是在问是否有 `v=c_1u_1+c_2u_2`。"
      ),
      text(
        "If it is inconsistent, no such coefficients exist.",
        "若它不一致，就不存在這樣的係數。",
        "若它不一致，就不存在这样的系数。"
      ),
    ],
    skillTags: ["span", "linear-combination", "consistency"],
  },
  "checkpoint.math1030.dependence-relation-free-variable": {
    accessTier: "MEMBER",
    id: "checkpoint.math1030.dependence-relation-free-variable",
    type: "MCQ",
    courseId: "math1030",
    chapterId: "vector-spaces",
    unitId: "math1030.vector-spaces.linear-dependence-and-independence",
    inputMode: "text",
    maxAttempts: 5,
    points: 1,
    prompt: text(
      "If `A=[u_1 u_2 u_3]` and solving `Ac=0` gives `c=(-1,-1,1)^T`, which relation follows?",
      "若 `A=[u_1 u_2 u_3]` 且 `Ac=0` 有解 `c=(-1,-1,1)^T`，可推出哪條關係？",
      "若 `A=[u_1 u_2 u_3]` 且 `Ac=0` 有解 `c=(-1,-1,1)^T`，可推出哪条关系？"
    ),
    choices: [
      { id: "a", text: text("`-u_1-u_2+u_3=0`", "`-u_1-u_2+u_3=0`", "`-u_1-u_2+u_3=0`") },
      { id: "b", text: text("`u_1+u_2+u_3=0`", "`u_1+u_2+u_3=0`", "`u_1+u_2+u_3=0`") },
      { id: "c", text: text("`u_1-u_2-u_3=0`", "`u_1-u_2-u_3=0`", "`u_1-u_2-u_3=0`") },
      { id: "d", text: text("No relation follows.", "不能推出任何關係。", "不能推出任何关系。") },
    ],
    correctAnswer: { choiceId: "a" },
    hints: [
      text(
        "The entries of `c` are the coefficients of `u_1,u_2,u_3`.",
        "`c` 的各個分量就是 `u_1,u_2,u_3` 的係數。",
        "`c` 的各个分量就是 `u_1,u_2,u_3` 的系数。"
      ),
    ],
    showCorrectAnswerPolicy: "after-max-attempts",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "MEMBER",
    solutionSteps: [
      text(
        "`Ac=0` means `c_1u_1+c_2u_2+c_3u_3=0`.",
        "`Ac=0` 表示 `c_1u_1+c_2u_2+c_3u_3=0`。",
        "`Ac=0` 表示 `c_1u_1+c_2u_2+c_3u_3=0`。"
      ),
      text(
        "Substituting `c=(-1,-1,1)^T` gives `-u_1-u_2+u_3=0`.",
        "代入 `c=(-1,-1,1)^T`，得到 `-u_1-u_2+u_3=0`。",
        "代入 `c=(-1,-1,1)^T`，得到 `-u_1-u_2+u_3=0`。"
      ),
    ],
    skillTags: ["linear-dependence", "homogeneous-system", "rref"],
  },
  "checkpoint.math1030.minimal-spanning-pivot-columns": {
    accessTier: "MEMBER",
    id: "checkpoint.math1030.minimal-spanning-pivot-columns",
    type: "MCQ",
    courseId: "math1030",
    chapterId: "vector-spaces",
    unitId: "math1030.vector-spaces.basis-and-dimension",
    inputMode: "text",
    maxAttempts: 5,
    points: 1,
    prompt: text(
      "If the pivot columns of the RREF of `U=[u_1 ... u_5]` are columns 1, 3, and 4, which original vectors form the extracted basis for `Span{u_1,...,u_5}`?",
      "若 `U=[u_1 ... u_5]` 的 RREF 主元欄是第 1、3、4 欄，哪些原向量形成抽出的基底？",
      "若 `U=[u_1 ... u_5]` 的 RREF 主元列是第 1、3、4 列，哪些原向量形成抽出的基？"
    ),
    choices: [
      { id: "a", text: text("`u_1,u_3,u_4`", "`u_1,u_3,u_4`", "`u_1,u_3,u_4`") },
      { id: "b", text: text("columns 1, 3, and 4 of the RREF matrix", "RREF 矩陣的第 1、3、4 欄", "RREF 矩阵的第 1、3、4 列") },
      { id: "c", text: text("`u_2,u_5`", "`u_2,u_5`", "`u_2,u_5`") },
      { id: "d", text: text("all five original vectors", "全部五個原向量", "全部五个原向量") },
    ],
    correctAnswer: { choiceId: "a" },
    hints: [
      text(
        "Use pivot positions from RREF, but take the basis vectors from the original matrix.",
        "主元位置從 RREF 讀出，但基底向量要取自原矩陣。",
        "主元位置从 RREF 读出，但基向量要取自原矩阵。"
      ),
    ],
    showCorrectAnswerPolicy: "after-max-attempts",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "MEMBER",
    solutionSteps: [
      text(
        "Pivot positions identify which original columns are independent and span the same column space.",
        "主元位置指出哪些原始列向量線性獨立，並張成同一個列空間。",
        "主元位置指出哪些原始列向量线性独立，并张成同一个列空间。"
      ),
      text(
        "Therefore the extracted basis is `u_1,u_3,u_4`.",
        "因此抽出的基底是 `u_1,u_3,u_4`。",
        "因此抽出的基是 `u_1,u_3,u_4`。"
      ),
    ],
    skillTags: ["basis", "dimension", "minimal-spanning-set", "rref"],
  },
  "checkpoint.math1030.replacement-theorem-count": {
    accessTier: "MEMBER",
    id: "checkpoint.math1030.replacement-theorem-count",
    type: "MCQ",
    courseId: "math1030",
    chapterId: "vector-spaces",
    unitId: "math1030.vector-spaces.basis-extension-and-change-of-basis",
    inputMode: "text",
    maxAttempts: 5,
    points: 1,
    prompt: text(
      "Suppose `dim(W)=4`. Which statement is forced by the replacement theorem?",
      "假設 `dim(W)=4`。替換定理迫使哪一個陳述成立？",
      "假设 `dim(W)=4`。替换定理迫使哪一个陈述成立？"
    ),
    choices: [
      {
        id: "a",
        text: text("Every five vectors in `W` are linearly dependent.", "`W` 中任何五個向量都線性相依。", "`W` 中任何五个向量都线性相关。"),
      },
      {
        id: "b",
        text: text("Every three vectors in `W` span `W`.", "`W` 中任何三個向量都張成 `W`。", "`W` 中任何三个向量都张成 `W`。"),
      },
      {
        id: "c",
        text: text("Every four vectors in `W` form a basis.", "`W` 中任何四個向量都形成基底。", "`W` 中任何四个向量都形成基底。"),
      },
      {
        id: "d",
        text: text("No vector in `W` can be zero.", "`W` 中不能有零向量。", "`W` 中不能有零向量。"),
      },
    ],
    correctAnswer: { choiceId: "a" },
    hints: [
      text(
        "In a `q`-dimensional space, a linearly independent list cannot have more than `q` vectors.",
        "在 `q` 維空間中，線性無關列表不能有超過 `q` 個向量。",
        "在 `q` 维空间中，线性无关列表不能有超过 `q` 个向量。"
      ),
    ],
    showCorrectAnswerPolicy: "after-max-attempts",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "MEMBER",
    solutionSteps: [
      text(
        "A basis of `W` has four vectors.",
        "`W` 的基底有四個向量。",
        "`W` 的基底有四个向量。"
      ),
      text(
        "The replacement theorem implies that any linearly independent list in `W` has at most four vectors.",
        "替換定理推出：`W` 中任何線性無關列表最多只有四個向量。",
        "替换定理推出：`W` 中任何线性无关列表最多只有四个向量。"
      ),
      text(
        "Therefore any five vectors in `W` must be linearly dependent.",
        "因此 `W` 中任何五個向量都必定線性相依。",
        "因此 `W` 中任何五个向量都必定线性相关。"
      ),
    ],
    skillTags: ["basis", "dimension", "replacement-theorem"],
  },
  "checkpoint.math1030.change-of-basis-coordinate": {
    accessTier: "MEMBER",
    id: "checkpoint.math1030.change-of-basis-coordinate",
    type: "FILL_IN_BLANK",
    courseId: "math1030",
    chapterId: "vector-spaces",
    unitId: "math1030.vector-spaces.basis-extension-and-change-of-basis",
    inputMode: "math-expression",
    maxAttempts: 5,
    points: 1,
    prompt: text(
      "If `U=VS` and `[x]_U=(4,-1)^T` with `S=[[1,-1],[1,1]]`, what is the first coordinate of `[x]_V`?",
      "若 `U=VS`，且 `[x]_U=(4,-1)^T`、`S=[[1,-1],[1,1]]`，`[x]_V` 的第一個坐標是多少？",
      "若 `U=VS`，且 `[x]_U=(4,-1)^T`、`S=[[1,-1],[1,1]]`，`[x]_V` 的第一个坐标是多少？"
    ),
    correctAnswer: {
      value: "5",
      equivalentValues: ["5.0"],
      equivalence: [{ type: "trimmed" }],
    },
    hints: [
      text(
        "`U=VS` means `[x]_V=S[x]_U`, not the reverse.",
        "`U=VS` 表示 `[x]_V=S[x]_U`，不是反方向。",
        "`U=VS` 表示 `[x]_V=S[x]_U`，不是反方向。"
      ),
    ],
    showCorrectAnswerPolicy: "after-max-attempts",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "MEMBER",
    syntaxGuidance: text(
      "Enter a single number.",
      "請輸入一個數字。",
      "请输入一个数字。"
    ),
    solutionSteps: [
      text(
        "Because `U=VS`, the matrix `S` converts `U`-coordinates to `V`-coordinates.",
        "因為 `U=VS`，矩陣 `S` 把 `U` 坐標轉成 `V` 坐標。",
        "因为 `U=VS`，矩阵 `S` 把 `U` 坐标转成 `V` 坐标。"
      ),
      text(
        "Compute `S[x]_U=[[1,-1],[1,1]](4,-1)^T=(5,3)^T`.",
        "計算 `S[x]_U=[[1,-1],[1,1]](4,-1)^T=(5,3)^T`。",
        "计算 `S[x]_U=[[1,-1],[1,1]](4,-1)^T=(5,3)^T`。"
      ),
      text(
        "The first coordinate is therefore `5`.",
        "所以第一個坐標是 `5`。",
        "所以第一个坐标是 `5`。"
      ),
    ],
    skillTags: ["change-of-basis", "coordinates", "matrix-multiplication"],
  },
  "checkpoint.math1030.set-equality-two-inclusions": {
    accessTier: "MEMBER",
    id: "checkpoint.math1030.set-equality-two-inclusions",
    type: "MCQ",
    courseId: "math1030",
    chapterId: "solution-structure",
    unitId: "math1030.solution-structure.set-language-and-solution-sets",
    inputMode: "text",
    maxAttempts: 5,
    points: 1,
    prompt: text(
      "To prove two solution sets `S` and `T` are equal, which pair of statements is usually enough?",
      "要證明兩個解集 `S` 和 `T` 相等，通常證明哪一對陳述就足夠？",
      "要证明两个解集 `S` 和 `T` 相等，通常证明哪一对陈述就足够？"
    ),
    choices: [
      {
        id: "a",
        text: text("`S subset T` and `T subset S`", "`S subset T` 和 `T subset S`", "`S subset T` 和 `T subset S`"),
      },
      {
        id: "b",
        text: text("`S` and `T` have similar-looking formulas.", "`S` 和 `T` 的公式看起來相似。", "`S` 和 `T` 的公式看起来相似。"),
      },
      {
        id: "c",
        text: text("One example belongs to both sets.", "有一個例子同時屬於兩個集合。", "有一个例子同时属于两个集合。"),
      },
      {
        id: "d",
        text: text("`S` is nonempty.", "`S` 非空。", "`S` 非空。"),
      },
    ],
    correctAnswer: { choiceId: "a" },
    hints: [
      text(
        "Set equality is usually proved by proving both containments.",
        "集合相等通常要證明兩個方向的包含關係。",
        "集合相等通常要证明两个方向的包含关系。"
      ),
    ],
    showCorrectAnswerPolicy: "after-max-attempts",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "MEMBER",
    solutionSteps: [
      text(
        "If every element of `S` is in `T`, then `S subset T`.",
        "如果 `S` 的每個元素都屬於 `T`，則 `S subset T`。",
        "如果 `S` 的每个元素都属于 `T`，则 `S subset T`。"
      ),
      text(
        "If every element of `T` is in `S`, then `T subset S`.",
        "如果 `T` 的每個元素都屬於 `S`，則 `T subset S`。",
        "如果 `T` 的每个元素都属于 `S`，则 `T subset S`。"
      ),
      text(
        "Together, the two containments say the sets have exactly the same elements.",
        "兩個包含關係合起來，表示兩個集合有完全相同的元素。",
        "两个包含关系合起来，表示两个集合有完全相同的元素。"
      ),
    ],
    skillTags: ["set-equality", "solution-set", "proof"],
  },
  "checkpoint.math1030.solution-intersection-same-coefficients": {
    accessTier: "MEMBER",
    id: "checkpoint.math1030.solution-intersection-same-coefficients",
    type: "MCQ",
    courseId: "math1030",
    chapterId: "solution-structure",
    unitId: "math1030.solution-structure.set-language-and-solution-sets",
    inputMode: "text",
    maxAttempts: 5,
    points: 1,
    prompt: text(
      "Suppose `S(A,b)∩S(A,c)` contains a vector `x_0`. What must follow?",
      "假設 `S(A,b)∩S(A,c)` 包含一個向量 `x_0`。必然推出甚麼？",
      "假设 `S(A,b)∩S(A,c)` 包含一个向量 `x_0`。必然推出什么？"
    ),
    choices: [
      {
        id: "a",
        text: text(
          "`b` and `c` may be different, but the two systems share one solution.",
          "`b` 和 `c` 可以不同，只是兩個系統共享一個解。",
          "`b` 和 `c` 可以不同，只是两个系统共享一个解。"
        ),
      },
      {
        id: "b",
        text: text(
          "`b=c`, so `S(A,b)=S(A,c)`.",
          "`b=c`，所以 `S(A,b)=S(A,c)`。",
          "`b=c`，所以 `S(A,b)=S(A,c)`。"
        ),
      },
      {
        id: "c",
        text: text(
          "`A` must be invertible.",
          "`A` 必定可逆。",
          "`A` 必定可逆。"
        ),
      },
      {
        id: "d",
        text: text(
          "Both solution sets must be empty.",
          "兩個解集都必定是空集。",
          "两个解集都必定是空集。"
        ),
      },
    ],
    correctAnswer: { choiceId: "b" },
    hints: [
      text(
        "Use membership in both solution sets: `Ax_0=b` and `Ax_0=c`.",
        "使用同時屬於兩個解集的意思：`Ax_0=b` 且 `Ax_0=c`。",
        "使用同时属于两个解集的意思：`Ax_0=b` 且 `Ax_0=c`。"
      ),
    ],
    showCorrectAnswerPolicy: "after-max-attempts",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "MEMBER",
    solutionSteps: [
      text(
        "Because `x_0∈S(A,b)`, the definition of solution set gives `Ax_0=b`.",
        "因為 `x_0∈S(A,b)`，由解集定義可得 `Ax_0=b`。",
        "因为 `x_0∈S(A,b)`，由解集定义可得 `Ax_0=b`。"
      ),
      text(
        "Because `x_0∈S(A,c)`, the same definition gives `Ax_0=c`.",
        "因為 `x_0∈S(A,c)`，同一定義亦給出 `Ax_0=c`。",
        "因为 `x_0∈S(A,c)`，同一定义也给出 `Ax_0=c`。"
      ),
      text(
        "Hence `b=c`; the two systems have the same defining condition, so their solution sets are equal.",
        "因此 `b=c`；兩個系統有相同的 defining condition，所以解集相等。",
        "因此 `b=c`；两个系统有相同的 defining condition，所以解集相等。"
      ),
    ],
    skillTags: ["solution-set", "intersection", "set-equality"],
  },
  "checkpoint.math1030.span-membership-set-language": {
    accessTier: "MEMBER",
    id: "checkpoint.math1030.span-membership-set-language",
    type: "MCQ",
    courseId: "math1030",
    chapterId: "solution-structure",
    unitId: "math1030.solution-structure.set-language-and-solution-sets",
    inputMode: "text",
    maxAttempts: 5,
    points: 1,
    prompt: text(
      "Which statement correctly says that `b` lies in the span of `v_1` and `v_2`?",
      "哪一個陳述正確表示 `b` 屬於 `v_1` 和 `v_2` 的張成？",
      "哪一个陈述正确表示 `b` 属于 `v_1` 和 `v_2` 的张成？"
    ),
    choices: [
      {
        id: "a",
        text: text("There exist scalars `c_1,c_2` such that `b=c_1v_1+c_2v_2`.", "存在純量 `c_1,c_2` 使得 `b=c_1v_1+c_2v_2`。", "存在标量 `c_1,c_2` 使得 `b=c_1v_1+c_2v_2`。"),
      },
      {
        id: "b",
        text: text("`b` is one of the vectors `v_1` or `v_2`.", "`b` 必須是 `v_1` 或 `v_2` 其中之一。", "`b` 必须是 `v_1` 或 `v_2` 其中之一。"),
      },
      {
        id: "c",
        text: text("`b` must be nonzero.", "`b` 必須非零。", "`b` 必须非零。"),
      },
      {
        id: "d",
        text: text("The two vectors must be orthogonal.", "兩個向量必須正交。", "两个向量必须正交。"),
      },
    ],
    correctAnswer: { choiceId: "a" },
    hints: [
      text(
        "Membership in a span means being expressible as a linear combination.",
        "屬於一個張成，意思是可以寫成相應向量的線性組合。",
        "属于一个张成，意思是可以写成相应向量的线性组合。"
      ),
    ],
    showCorrectAnswerPolicy: "after-max-attempts",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "MEMBER",
    solutionSteps: [
      text(
        "`Span{v_1,v_2}` is the set of all vectors `c_1v_1+c_2v_2`.",
        "`Span{v_1,v_2}` 是所有形如 `c_1v_1+c_2v_2` 的向量所成的集合。",
        "`Span{v_1,v_2}` 是所有形如 `c_1v_1+c_2v_2` 的向量所成的集合。"
      ),
      text(
        "Therefore proving membership means producing, or proving the existence of, suitable coefficients.",
        "因此證明屬於該張成，就是給出或證明存在合適的係數。",
        "因此证明属于该张成，就是给出或证明存在合适的系数。"
      ),
    ],
    skillTags: ["span", "set-membership", "linear-combination"],
  },
  "checkpoint.math1030.m22-dimension": {
    accessTier: "MEMBER",
    id: "checkpoint.math1030.m22-dimension",
    type: "FILL_IN_BLANK",
    courseId: "math1030",
    chapterId: "vector-spaces",
    unitId: "math1030.vector-spaces.matrix-subspaces-basis-dimension",
    inputMode: "math-expression",
    maxAttempts: 5,
    points: 1,
    prompt: text(
      "Fill in the blank: the dimension of the full matrix space `M_{2,2}` is ____.",
      "填空：全矩陣空間 `M_{2,2}` 的維數是 ____。",
      "填空：全矩阵空间 `M_{2,2}` 的维数是 ____。"
    ),
    correctAnswer: {
      value: "4",
      equivalentValues: ["four"],
      equivalence: [{ type: "trimmed" }, { type: "case-insensitive" }],
    },
    hints: [
      text(
        "Count how many independent matrix entries a general `2 x 2` matrix has.",
        "數一數一般 `2 x 2` 矩陣有多少個可獨立選擇的元素。",
        "数一数一般 `2 x 2` 矩阵有多少个可独立选择的元素。"
      ),
    ],
    showCorrectAnswerPolicy: "after-max-attempts",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "MEMBER",
    solutionSteps: [
      text(
        "A general `2 x 2` matrix has entries `a,b,c,d`.",
        "一般 `2 x 2` 矩陣有元素 `a,b,c,d`。",
        "一般 `2 x 2` 矩阵有元素 `a,b,c,d`。"
      ),
      text(
        "The four standard matrix units `E_11,E_12,E_21,E_22` form a basis.",
        "四個標準矩陣單位 `E_11,E_12,E_21,E_22` 構成一組基底。",
        "四个标准矩阵单位 `E_11,E_12,E_21,E_22` 构成一组基。"
      ),
      text(
        "Hence `dim M_{2,2}=4`.",
        "因此 `dim M_{2,2}=4`。",
        "因此 `dim M_{2,2}=4`。"
      ),
    ],
    skillTags: ["matrix-space", "basis", "dimension"],
  },
  "checkpoint.math1030.skew-symmetric-3x3-dimension": {
    accessTier: "MEMBER",
    id: "checkpoint.math1030.skew-symmetric-3x3-dimension",
    type: "MCQ",
    courseId: "math1030",
    chapterId: "vector-spaces",
    unitId: "math1030.vector-spaces.matrix-subspaces-basis-dimension",
    inputMode: "text",
    maxAttempts: 5,
    points: 1,
    prompt: text(
      "What is the dimension of the subspace of `3 x 3` skew-symmetric matrices?",
      "`3 x 3` 反對稱矩陣所成子空間的維數是多少？",
      "`3 x 3` 反对称矩阵所成子空间的维数是多少？"
    ),
    choices: [
      { id: "a", text: text("2", "2", "2") },
      { id: "b", text: text("3", "3", "3") },
      { id: "c", text: text("6", "6", "6") },
      { id: "d", text: text("9", "9", "9") },
    ],
    correctAnswer: { choiceId: "b" },
    hints: [
      text(
        "A skew-symmetric matrix satisfies `A^T=-A`, so the diagonal is zero and entries above the diagonal determine the entries below it.",
        "反對稱矩陣滿足 `A^T=-A`，所以對角線為零，而上三角元素決定下三角元素。",
        "反对称矩阵满足 `A^T=-A`，所以对角线为零，而上三角元素决定下三角元素。"
      ),
    ],
    showCorrectAnswerPolicy: "after-max-attempts",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "MEMBER",
    solutionSteps: [
      text(
        "In a `3 x 3` skew-symmetric matrix, the diagonal entries must be zero.",
        "在 `3 x 3` 反對稱矩陣中，對角線元素必須為零。",
        "在 `3 x 3` 反对称矩阵中，对角线元素必须为零。"
      ),
      text(
        "The independent entries are the three positions above the diagonal.",
        "可獨立選擇的是對角線上方的三個位置。",
        "可独立选择的是对角线上方的三个位置。"
      ),
      text(
        "Therefore the dimension is `3`.",
        "因此維數是 `3`。",
        "因此维数是 `3`。"
      ),
    ],
    skillTags: ["skew-symmetric-matrix", "matrix-subspace", "dimension"],
  },
  "checkpoint.math1030.inverse-product-order": {
    accessTier: "MEMBER",
    id: "checkpoint.math1030.inverse-product-order",
    type: "MCQ",
    courseId: "math1030",
    chapterId: "invertibility",
    unitId: "math1030.invertibility.invertible-matrices",
    inputMode: "text",
    maxAttempts: 5,
    points: 1,
    prompt: text(
      "If `A` and `B` are invertible square matrices of the same size, what is `(AB)^{-1}`?",
      "若 `A` 和 `B` 是同大小的可逆方陣，`(AB)^{-1}` 是甚麼？",
      "若 `A` 和 `B` 是同大小的可逆方阵，`(AB)^{-1}` 是什么？"
    ),
    choices: [
      { id: "a", text: text("`A^{-1}B^{-1}`", "`A^{-1}B^{-1}`", "`A^{-1}B^{-1}`") },
      { id: "b", text: text("`B^{-1}A^{-1}`", "`B^{-1}A^{-1}`", "`B^{-1}A^{-1}`") },
      { id: "c", text: text("`AB`", "`AB`", "`AB`") },
      { id: "d", text: text("`A^{-1}+B^{-1}`", "`A^{-1}+B^{-1}`", "`A^{-1}+B^{-1}`") },
    ],
    correctAnswer: { choiceId: "b" },
    hints: [
      text(
        "The inverse must multiply with `AB` to give the identity; test the cancellation order.",
        "逆矩陣必須與 `AB` 相乘後得到單位矩陣；檢查抵消的次序。",
        "逆矩阵必须与 `AB` 相乘后得到单位矩阵；检查抵消的顺序。"
      ),
    ],
    showCorrectAnswerPolicy: "after-max-attempts",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "MEMBER",
    solutionSteps: [
      text(
        "Compute `(AB)(B^{-1}A^{-1})`.",
        "計算 `(AB)(B^{-1}A^{-1})`。",
        "计算 `(AB)(B^{-1}A^{-1})`。"
      ),
      text(
        "Associativity gives `A(BB^{-1})A^{-1}=AIA^{-1}=I`.",
        "由結合律得到 `A(BB^{-1})A^{-1}=AIA^{-1}=I`。",
        "由结合律得到 `A(BB^{-1})A^{-1}=AIA^{-1}=I`。"
      ),
      text(
        "The order reverses, so `(AB)^{-1}=B^{-1}A^{-1}`.",
        "次序會反轉，所以 `(AB)^{-1}=B^{-1}A^{-1}`。",
        "顺序会反转，所以 `(AB)^{-1}=B^{-1}A^{-1}`。"
      ),
    ],
    skillTags: ["inverse", "matrix-product", "invertible-matrix"],
  },
  "checkpoint.math1030.cyclic-identity-from-product": {
    accessTier: "MEMBER",
    id: "checkpoint.math1030.cyclic-identity-from-product",
    type: "MCQ",
    courseId: "math1030",
    chapterId: "invertibility",
    unitId: "math1030.invertibility.invertible-matrices",
    inputMode: "text",
    maxAttempts: 5,
    points: 1,
    prompt: text(
      "Suppose `A,B,C,D` are square matrices and `ABCD=I`. Which equality is definitely forced?",
      "假設 `A,B,C,D` 都是方陣，且 `ABCD=I`。哪一條等式必然成立？",
      "假设 `A,B,C,D` 都是方阵，且 `ABCD=I`。哪一条等式必然成立？"
    ),
    choices: [
      { id: "a", text: text("`DABC=I`", "`DABC=I`", "`DABC=I`") },
      { id: "b", text: text("`DCBA=I`", "`DCBA=I`", "`DCBA=I`") },
      { id: "c", text: text("`DBAC=I`", "`DBAC=I`", "`DBAC=I`") },
      { id: "d", text: text("`ACDB=I`", "`ACDB=I`", "`ACDB=I`") },
    ],
    correctAnswer: { choiceId: "a" },
    hints: [
      text(
        "Group the original product as `(ABC)D=I`, then use the square one-sided inverse theorem.",
        "把原式分組為 `(ABC)D=I`，再使用方陣的一側逆定理。",
        "把原式分组为 `(ABC)D=I`，再使用方阵的一侧逆定理。"
      ),
    ],
    showCorrectAnswerPolicy: "after-max-attempts",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "MEMBER",
    solutionSteps: [
      text(
        "From `(ABC)D=I`, the square one-sided identity theorem says `D` is the inverse of `ABC`.",
        "由 `(ABC)D=I`，方陣的一側單位等式定理說明 `D` 是 `ABC` 的逆矩陣。",
        "由 `(ABC)D=I`，方阵的一侧单位等式定理说明 `D` 是 `ABC` 的逆矩阵。"
      ),
      text(
        "Therefore the reverse grouped product is also the identity: `D(ABC)=I`.",
        "因此反向分組乘積也等於單位矩陣：`D(ABC)=I`。",
        "因此反向分组乘积也等于单位矩阵：`D(ABC)=I`。"
      ),
      text(
        "This proves `DABC=I`. It does not allow arbitrary non-cyclic reorderings such as `DCBA`.",
        "這證明 `DABC=I`。但它不容許任意非循環重排，例如 `DCBA`。",
        "这证明 `DABC=I`。但它不允许任意非循环重排，例如 `DCBA`。"
      ),
    ],
    skillTags: ["invertible-matrix", "matrix-product", "one-sided-inverse"],
  },
  "checkpoint.math1030.reduction-right-block-inverse": {
    accessTier: "MEMBER",
    id: "checkpoint.math1030.reduction-right-block-inverse",
    type: "MCQ",
    courseId: "math1030",
    chapterId: "invertibility",
    unitId: "math1030.invertibility.invertible-matrices",
    inputMode: "text",
    maxAttempts: 5,
    points: 1,
    prompt: text(
      "A row-reduction table shows `[A \\mid I_4] \\sim [I_4 \\mid D]`. What does the right block `D` represent?",
      "某個行化簡表格顯示 `[A \\mid I_4] \\sim [I_4 \\mid D]`。右邊區塊 `D` 代表甚麼？",
      "某个行化简表格显示 `[A \\mid I_4] \\sim [I_4 \\mid D]`。右边区块 `D` 代表什么？"
    ),
    choices: [
      { id: "a", text: text("`A` itself", "`A` 本身", "`A` 本身") },
      { id: "b", text: text("`A^{-1}`", "`A^{-1}`", "`A^{-1}`") },
      { id: "c", text: text("`A^t`", "`A^t`", "`A^t`") },
      {
        id: "d",
        text: text(
          "Nothing definite, because the right block is only scratch work",
          "沒有確定意思，因為右邊區塊只是草稿計算",
          "没有确定意思，因为右边区块只是草稿计算"
        ),
      },
    ],
    correctAnswer: { choiceId: "b" },
    hints: [
      text(
        "The right block becomes meaningful only after the left block has become the identity.",
        "右邊區塊要在左邊區塊已化成單位矩陣後才有這個含義。",
        "右边区块要在左边区块已化成单位矩阵后才有这个含义。"
      ),
    ],
    showCorrectAnswerPolicy: "after-max-attempts",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "MEMBER",
    solutionSteps: [
      text(
        "The row operations turn `A` into `I_4`.",
        "這些行操作把 `A` 化成 `I_4`。",
        "这些行操作把 `A` 化成 `I_4`。"
      ),
      text(
        "Applying the same operations to `I_4` produces the inverse of `A`.",
        "同一批行操作作用在 `I_4` 上，得到的就是 `A` 的逆矩陣。",
        "同一批行操作作用在 `I_4` 上，得到的就是 `A` 的逆矩阵。"
      ),
      text(
        "Therefore `D=A^{-1}`.",
        "因此 `D=A^{-1}`。",
        "因此 `D=A^{-1}`。"
      ),
    ],
    skillTags: ["inverse", "row-reduction", "augmented-matrix"],
  },
  "checkpoint.math1030.same-row-operations-polynomial": {
    accessTier: "MEMBER",
    id: "checkpoint.math1030.same-row-operations-polynomial",
    type: "MCQ",
    courseId: "math1030",
    chapterId: "invertibility",
    unitId: "math1030.invertibility.invertible-matrices",
    inputMode: "text",
    maxAttempts: 5,
    points: 1,
    prompt: text(
      "The same row-operation product that sends `[A \\mid I_5]` to `[I_5 \\mid E]` sends `F+I_5` to `A^3+3A+I_5`. Which formula for `F` follows?",
      "同一個把 `[A \\mid I_5]` 化成 `[I_5 \\mid E]` 的行操作乘積，把 `F+I_5` 化成 `A^3+3A+I_5`。可推出哪條 `F` 的公式？",
      "同一个把 `[A \\mid I_5]` 化成 `[I_5 \\mid E]` 的行操作乘积，把 `F+I_5` 化成 `A^3+3A+I_5`。可推出哪条 `F` 的公式？"
    ),
    choices: [
      { id: "a", text: text("`F=A^3+3A`", "`F=A^3+3A`", "`F=A^3+3A`") },
      { id: "b", text: text("`F=A^4+3A^2+A-I_5`", "`F=A^4+3A^2+A-I_5`", "`F=A^4+3A^2+A-I_5`") },
      { id: "c", text: text("`F=A^{-1}(A^3+3A+I_5)`", "`F=A^{-1}(A^3+3A+I_5)`", "`F=A^{-1}(A^3+3A+I_5)`") },
      { id: "d", text: text("`F=A^4+3A^2`", "`F=A^4+3A^2`", "`F=A^4+3A^2`") },
    ],
    correctAnswer: { choiceId: "b" },
    hints: [
      text(
        "Let `H` be the row-operation product. From `[A \\mid I_5] \\mapsto [I_5 \\mid E]`, read `H=A^{-1}`.",
        "令 `H` 為行操作乘積。由 `[A \\mid I_5] \\mapsto [I_5 \\mid E]` 讀出 `H=A^{-1}`。",
        "令 `H` 为行操作乘积。由 `[A \\mid I_5] \\mapsto [I_5 \\mid E]` 读出 `H=A^{-1}`。"
      ),
    ],
    showCorrectAnswerPolicy: "after-max-attempts",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "MEMBER",
    solutionSteps: [
      text(
        "The same row operations give `A^3+3A+I_5=A^{-1}(F+I_5)`.",
        "同一批行操作給出 `A^3+3A+I_5=A^{-1}(F+I_5)`。",
        "同一批行操作给出 `A^3+3A+I_5=A^{-1}(F+I_5)`。"
      ),
      text(
        "Multiply on the left by `A`: `F+I_5=A(A^3+3A+I_5)=A^4+3A^2+A`.",
        "左乘 `A`：`F+I_5=A(A^3+3A+I_5)=A^4+3A^2+A`。",
        "左乘 `A`：`F+I_5=A(A^3+3A+I_5)=A^4+3A^2+A`。"
      ),
      text(
        "Subtract `I_5` to get `F=A^4+3A^2+A-I_5`.",
        "減去 `I_5`，得到 `F=A^4+3A^2+A-I_5`。",
        "减去 `I_5`，得到 `F=A^4+3A^2+A-I_5`。"
      ),
    ],
    skillTags: ["row-operation-matrix", "inverse", "matrix-polynomial"],
  },
  "checkpoint.math1030.linear-combination-coefficients": {
    accessTier: "MEMBER",
    id: "checkpoint.math1030.linear-combination-coefficients",
    type: "FILL_IN_BLANK",
    courseId: "math1030",
    chapterId: "vector-spaces",
    unitId: "math1030.vector-spaces.linear-combinations-and-span",
    inputMode: "vector",
    maxAttempts: 5,
    points: 1,
    prompt: text(
      "Fill in the blank: if `v=4a_1+8a_2+5a_3+3a_4+2a_5`, then the coefficient vector is ____.",
      "填空：若 `v=4a_1+8a_2+5a_3+3a_4+2a_5`，則係數向量是 ____。",
      "填空：若 `v=4a_1+8a_2+5a_3+3a_4+2a_5`，则系数向量是 ____。"
    ),
    correctAnswer: {
      value: "(4,8,5,3,2)",
      equivalentValues: ["(4, 8, 5, 3, 2)", "[4,8,5,3,2]", "[4, 8, 5, 3, 2]", "4,8,5,3,2", "4, 8, 5, 3, 2"],
      equivalence: [{ type: "trimmed" }],
    },
    hints: [
      text(
        "Read off the scalar multiplying each vector in the displayed order.",
        "按顯示次序讀出每個向量前面的純量。",
        "按显示顺序读出每个向量前面的标量。"
      ),
    ],
    showCorrectAnswerPolicy: "after-max-attempts",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "MEMBER",
    syntaxGuidance: text(
      "Enter a 5-tuple such as `(4,8,5,3,2)`.",
      "請輸入一個 5 元有序組，例如 `(4,8,5,3,2)`。",
      "请输入一个 5 元有序组，例如 `(4,8,5,3,2)`。"
    ),
    solutionSteps: [
      text(
        "The coefficient of `a_1` is 4, the coefficient of `a_2` is 8, and so on.",
        "`a_1` 的係數是 4，`a_2` 的係數是 8，如此類推。",
        "`a_1` 的系数是 4，`a_2` 的系数是 8，如此类推。"
      ),
      text(
        "Keeping the order `a_1,a_2,a_3,a_4,a_5`, the coefficient vector is `(4,8,5,3,2)`.",
        "保持 `a_1,a_2,a_3,a_4,a_5` 的次序，係數向量是 `(4,8,5,3,2)`。",
        "保持 `a_1,a_2,a_3,a_4,a_5` 的顺序，系数向量是 `(4,8,5,3,2)`。"
      ),
    ],
    skillTags: ["linear-combination", "coordinates", "span"],
  },
  "checkpoint.math1030.subspace-closure-test": {
    accessTier: "MEMBER",
    id: "checkpoint.math1030.subspace-closure-test",
    type: "MCQ",
    courseId: "math1030",
    chapterId: "vector-spaces",
    unitId: "math1030.vector-spaces.subspaces",
    inputMode: "text",
    maxAttempts: 5,
    points: 1,
    prompt: text(
      "Which condition is enough, together with non-emptiness, to prove that a subset `W` of a vector space is a subspace?",
      "除了非空以外，哪個條件足以證明向量空間的子集 `W` 是子空間？",
      "除了非空以外，哪个条件足以证明向量空间的子集 `W` 是子空间？"
    ),
    choices: [
      {
        id: "a",
        text: text(
          "For all `u,v in W` and scalars `α,β`, the vector `αu+βv` is in `W`.",
          "對所有 `u,v in W` 及純量 `α,β`，向量 `αu+βv` 都在 `W` 中。",
          "对所有 `u,v in W` 及标量 `α,β`，向量 `αu+βv` 都在 `W` 中。"
        ),
      },
      {
        id: "b",
        text: text(
          "`W` contains at least two vectors.",
          "`W` 至少包含兩個向量。",
          "`W` 至少包含两个向量。"
        ),
      },
      {
        id: "c",
        text: text(
          "Every vector in `W` has positive entries.",
          "`W` 中每個向量的坐標都是正數。",
          "`W` 中每个向量的坐标都是正数。"
        ),
      },
      {
        id: "d",
        text: text(
          "`W` is described by exactly one equation.",
          "`W` 剛好由一條方程描述。",
          "`W` 正好由一条方程描述。"
        ),
      },
    ],
    correctAnswer: { choiceId: "a" },
    hints: [
      text(
        "A subspace must be stable under all linear combinations of its own vectors.",
        "子空間必須對其內部向量的一切線性組合保持封閉。",
        "子空间必须对其内部向量的一切线性组合保持封闭。"
      ),
    ],
    showCorrectAnswerPolicy: "after-max-attempts",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "MEMBER",
    solutionSteps: [
      text(
        "The one-step subspace test combines closure under addition and closure under scalar multiplication.",
        "一步子空間測試把加法封閉和數乘封閉合併起來。",
        "一步子空间测试把加法封闭和数乘封闭合并起来。"
      ),
      text(
        "If every linear combination `αu+βv` of vectors from `W` remains in `W`, then `W` is closed under the vector-space operations.",
        "若 `W` 中向量的一切線性組合 `αu+βv` 仍在 `W` 中，則 `W` 對向量空間運算封閉。",
        "若 `W` 中向量的一切线性组合 `αu+βv` 仍在 `W` 中，则 `W` 对向量空间运算封闭。"
      ),
    ],
    skillTags: ["subspace-test", "closure", "linear-combination"],
  },
  "checkpoint.csci2520.pointer-assignment-vs-dereference": {
    accessTier: "FREE",
    id: "checkpoint.csci2520.pointer-assignment-vs-dereference",
    type: "MCQ",
    courseId: "csci2520",
    chapterId: "programming-foundations",
    unitId: "csci2520.programming-foundations.pointers-memory-and-structs",
    inputMode: "text",
    maxAttempts: unlimited,
    points: 1,
    prompt: text(
      "Which statement correctly describes the difference between `p = q` and `*p = *q`?",
      "哪一項正確描述了 `p = q` 與 `*p = *q` 的差別？",
      "哪一项正确描述了 `p = q` 与 `*p = *q` 的差别？"
    ),
    choices: [
      {
        id: "a",
        text: text(
          "`p = q` copies an address, while `*p = *q` copies a pointed-to value.",
          "`p = q` 複製地址，而 `*p = *q` 複製被指向的值。",
          "`p = q` 复制地址，而 `*p = *q` 复制被指向的值。"
        ),
      },
      {
        id: "b",
        text: text(
          "Both statements do exactly the same thing.",
          "兩句做的是完全一樣的事。",
          "两句做的是完全一样的事。"
        ),
      },
      {
        id: "c",
        text: text(
          "`*p = *q` changes only the pointers, not the stored data.",
          "`*p = *q` 只會改變 pointer，不會改變資料。",
          "`*p = *q` 只会改变 pointer，不会改变数据。"
        ),
      },
      {
        id: "d",
        text: text(
          "`p = q` allocates fresh memory on the heap.",
          "`p = q` 會在 heap 上配置新記憶體。",
          "`p = q` 会在 heap 上分配新内存。"
        ),
      },
    ],
    correctAnswer: { choiceId: "a" },
    hints: [
      text(
        "Separate the address stored in the pointer from the value stored at that address.",
        "先分清楚 pointer 裡的地址與該地址中的值。",
        "先分清楚 pointer 里的地址与该地址中的值。"
      ),
    ],
    showCorrectAnswerPolicy: "after-submit",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "FREE",
    solutionSteps: [
      text(
        "`p = q` changes what address p stores.",
        "`p = q` 會改變 p 儲存的地址。",
        "`p = q` 会改变 p 保存的地址。"
      ),
      text(
        "`*p = *q` leaves the addresses alone and copies the value at q's address into p's target.",
        "`*p = *q` 不會改變地址，而是把 q 指向位置的值複製到 p 所指向的位置。",
        "`*p = *q` 不会改变地址，而是把 q 指向位置的值复制到 p 所指向的位置。"
      ),
    ],
    skillTags: ["pointers", "addresses", "dereference"],
  },
  "checkpoint.csci2520.malloc-heap": {
    accessTier: "FREE",
    id: "checkpoint.csci2520.malloc-heap",
    type: "FILL_IN_BLANK",
    courseId: "csci2520",
    chapterId: "programming-foundations",
    unitId: "csci2520.programming-foundations.pointers-memory-and-structs",
    inputMode: "text",
    maxAttempts: 4,
    points: 1,
    prompt: text(
      "Fill in the blank: `malloc` allocates storage on the ____.",
      "填空：`malloc` 會在 ____ 上配置儲存空間。",
      "填空：`malloc` 会在 ____ 上分配存储空间。"
    ),
    correctAnswer: {
      value: "heap",
      equivalentValues: ["the heap"],
      equivalence: [{ type: "trimmed" }, { type: "case-insensitive" }],
    },
    hints: [
      text(
        "This is the dynamically managed memory region, not the stack frame of one function call.",
        "呢個係動態管理的記憶體區域，不是單一函式呼叫的 stack frame。",
        "这个是动态管理的内存区域，不是单个函数调用的 stack frame。"
      ),
    ],
    showCorrectAnswerPolicy: "after-submit",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "FREE",
    syntaxGuidance: text(
      "Enter one short word only.",
      "請輸入一個簡短詞語。",
      "请输入一个简短词语。"
    ),
    solutionSteps: [
      text(
        "`malloc` asks the runtime for dynamically managed storage.",
        "`malloc` 會向 runtime 申請動態管理的記憶體。",
        "`malloc` 会向 runtime 申请动态管理的内存。"
      ),
      text(
        "That storage lives on the heap, not in the local stack frame of the current function.",
        "這段記憶體位於 heap，而不是當前函式的本地 stack frame。",
        "这段内存位于 heap，而不是当前函数的本地 stack frame。"
      ),
    ],
    skillTags: ["malloc", "heap", "memory-model"],
  },
  "checkpoint.csci2520.collision-definition": {
    accessTier: "FREE",
    id: "checkpoint.csci2520.collision-definition",
    type: "MCQ",
    courseId: "csci2520",
    chapterId: "adt-and-operations",
    unitId: "csci2520.adt-and-operations.hash-tables-and-collision-strategies",
    inputMode: "text",
    maxAttempts: unlimited,
    points: 1,
    prompt: text(
      "What is a collision in hashing?",
      "Hashing 裡的 collision 是甚麼？",
      "Hashing 里的 collision 是什么？"
    ),
    choices: [
      {
        id: "a",
        text: text(
          "Two different keys map to the same bucket index.",
          "兩個不同 key 被映射到同一個 bucket index。",
          "两个不同 key 被映射到同一个 bucket index。"
        ),
      },
      {
        id: "b",
        text: text(
          "A key maps to two different indices at the same time.",
          "同一個 key 同時映射到兩個不同 index。",
          "同一个 key 同时映射到两个不同 index。"
        ),
      },
      {
        id: "c",
        text: text(
          "The table becomes full and cannot store any more entries.",
          "整個 table 填滿，不能再插入 entry。",
          "整个 table 填满，不能再插入 entry。"
        ),
      },
      {
        id: "d",
        text: text(
          "The hash function returns a negative integer.",
          "Hash function 回傳負整數。",
          "Hash function 返回负整数。"
        ),
      },
    ],
    correctAnswer: { choiceId: "a" },
    hints: [
      text(
        "Think in terms of different keys and one shared bucket slot.",
        "用「不同 key，共用同一 bucket」去想。",
        "用“不同 key，共用同一 bucket”去想。"
      ),
    ],
    showCorrectAnswerPolicy: "after-submit",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "FREE",
    solutionSteps: [
      text(
        "A collision occurs when distinct keys are sent to the same bucket index.",
        "Collision 指不同 key 被送去同一個 bucket index。",
        "Collision 指不同 key 被送去同一个 bucket index。"
      ),
      text(
        "The implementation must then resolve that conflict without losing dictionary correctness.",
        "實作之後必須處理這個衝突，同時保持 dictionary 的正確性。",
        "实作之后必须处理这个冲突，同时保持 dictionary 的正确性。"
      ),
    ],
    skillTags: ["hashtable", "collision", "hash-function"],
  },
  "checkpoint.csci2520.chaining-lookup": {
    accessTier: "FREE",
    id: "checkpoint.csci2520.chaining-lookup",
    type: "FILL_IN_BLANK",
    courseId: "csci2520",
    chapterId: "adt-and-operations",
    unitId: "csci2520.adt-and-operations.hash-tables-and-collision-strategies",
    inputMode: "text",
    maxAttempts: 4,
    points: 1,
    prompt: text(
      "Fill in the blank: under chaining, once the bucket is chosen, lookup continues by scanning the bucket's ____.",
      "填空：在 chaining 下，選定 bucket 之後，lookup 會沿着 bucket 的 ____ 繼續掃描。",
      "填空：在 chaining 下，选定 bucket 之后，lookup 会沿着 bucket 的 ____ 继续扫描。"
    ),
    correctAnswer: {
      value: "linked list",
      equivalentValues: ["chain", "list"],
      equivalence: [{ type: "trimmed" }, { type: "case-insensitive" }],
    },
    hints: [
      text(
        "The extra entries are stored beside the bucket, not by probing new array slots.",
        "額外 entry 是掛在 bucket 旁邊，不是靠 probing 新 array slot。",
        "额外 entry 是挂在 bucket 旁边，不是靠 probing 新 array slot。"
      ),
    ],
    showCorrectAnswerPolicy: "after-submit",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "FREE",
    syntaxGuidance: text(
      "Enter a short phrase such as `linked list` or `chain`.",
      "輸入如 `linked list` 或 `chain` 這樣的短語即可。",
      "输入如 `linked list` 或 `chain` 这样的短语即可。"
    ),
    solutionSteps: [
      text(
        "Chaining stores colliding entries in a linked structure attached to the bucket.",
        "Chaining 會把 collision 的 entry 放到該 bucket 附帶的 linked structure 裡。",
        "Chaining 会把 collision 的 entry 放到该 bucket 附带的 linked structure 里。"
      ),
      text(
        "So after hashing chooses the bucket, lookup scans that chain to find the matching key.",
        "所以 hash 選定 bucket 之後，lookup 要沿着該 chain 掃描去找 matching key。",
        "所以 hash 选定 bucket 之后，lookup 要沿着该 chain 扫描去找 matching key。"
      ),
    ],
    skillTags: ["hashtable", "chaining", "lookup"],
  },
  "checkpoint.math1090.sets.inclusion-exclusion-hike": {
    accessTier: "FREE",
    id: "checkpoint.math1090.sets.inclusion-exclusion-hike",
    type: "MCQ",
    courseId: "math1090",
    chapterId: "sets",
    unitId: "math1090.sets.set-operations",
    inputMode: "text",
    maxAttempts: 5,
    points: 1,
    prompt: text(
      "Ten students go hiking. Seven use sunscreen, six wear a hat, and two use neither. How many use both sunscreen and a hat?",
      "十位學生去遠足。七位使用防曬，六位戴帽，兩位兩者皆沒有。多少位兩者皆有？",
      "十位学生去远足。七位使用防晒，六位戴帽，两位两者都没有。多少位两者都有？"
    ),
    choices: [
      {
        id: "a",
        text: text("3", "3", "3"),
      },
      {
        id: "b",
        text: text("5", "5", "5"),
      },
      {
        id: "c",
        text: text("8", "8", "8"),
      },
      {
        id: "d",
        text: text("13", "13", "13"),
      },
    ],
    correctAnswer: { choiceId: "b" },
    hints: [
      text(
        "First compute the union: if two use neither, then eight use at least one form of protection.",
        "先計聯集：若兩位兩者皆沒有，則八位至少有一種保護。",
        "先算并集：若两位两者都没有，则八位至少有一种保护。"
      ),
    ],
    previewExamples: [
      text(
        "Use `|S \\cup H| = |S| + |H| - |S \\cap H|`.",
        "使用 `|S \\cup H| = |S| + |H| - |S \\cap H|`。",
        "使用 `|S \\cup H| = |S| + |H| - |S \\cap H|`。"
      ),
    ],
    showCorrectAnswerPolicy: "after-submit",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "FREE",
    solutionSteps: [
      text(
        "Let S be the sunscreen set and H the hat set.",
        "設 S 為使用防曬的集合，H 為戴帽的集合。",
        "设 S 为使用防晒的集合，H 为戴帽的集合。"
      ),
      text(
        "Two students use neither, so `|S \\cup H| = 10 - 2 = 8`.",
        "兩位學生兩者皆沒有，所以 `|S \\cup H| = 10 - 2 = 8`。",
        "两位学生两者都没有，所以 `|S \\cup H| = 10 - 2 = 8`。"
      ),
      text(
        "Thus `|S \\cap H| = 7 + 6 - 8 = 5`.",
        "因此 `|S \\cap H| = 7 + 6 - 8 = 5`。",
        "因此 `|S \\cap H| = 7 + 6 - 8 = 5`。"
      ),
    ],
    skillTags: ["sets", "venn-diagrams", "inclusion-exclusion"],
  },
  "checkpoint.math1090.sets.function-set-count": {
    accessTier: "FREE",
    id: "checkpoint.math1090.sets.function-set-count",
    type: "FILL_IN_BLANK",
    courseId: "math1090",
    chapterId: "sets",
    unitId: "math1090.sets.functions-relations",
    inputMode: "text",
    maxAttempts: 5,
    points: 1,
    prompt: text(
      "If `A` has three elements and `B` has two elements, how many functions are in `B^A`?",
      "如果 `A` 有三個元素，而 `B` 有兩個元素，`B^A` 中有多少個函數？",
      "如果 `A` 有三个元素，而 `B` 有两个元素，`B^A` 中有多少个函数？"
    ),
    correctAnswer: {
      value: "8",
      equivalentValues: ["2^3", "2³"],
      equivalence: [{ type: "trimmed" }],
    },
    hints: [
      text(
        "Each input in A independently chooses one of the two outputs in B.",
        "`A` 的每個輸入都獨立地在 `B` 中選兩個輸出之一。",
        "`A` 的每个输入都独立地在 `B` 中选两个输出之一。"
      ),
    ],
    previewExamples: [
      text(
        "Enter a number such as `8`.",
        "輸入一個數字，例如 `8`。",
        "输入一个数字，例如 `8`。"
      ),
    ],
    showCorrectAnswerPolicy: "after-submit",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "FREE",
    syntaxGuidance: text(
      "Enter the count as a whole number.",
      "以整數輸入數量。",
      "以整数输入数量。"
    ),
    solutionSteps: [
      text(
        "A function from A to B chooses one output in B for each input in A.",
        "由 `A` 到 `B` 的函數，會為 `A` 的每個輸入選一個 `B` 中的輸出。",
        "由 `A` 到 `B` 的函数，会为 `A` 的每个输入选一个 `B` 中的输出。"
      ),
      text(
        "There are two choices for each of three inputs, so the count is `2^3 = 8`.",
        "三個輸入各有兩個選擇，所以數量是 `2^3 = 8`。",
        "三个输入各有两个选择，所以数量是 `2^3 = 8`。"
      ),
    ],
    skillTags: ["functions", "function-sets", "counting"],
  },
  "checkpoint.math1090.sets.finite-left-inverse": {
    accessTier: "FREE",
    id: "checkpoint.math1090.sets.finite-left-inverse",
    type: "MCQ",
    courseId: "math1090",
    chapterId: "sets",
    unitId: "math1090.sets.functions-relations",
    inputMode: "text",
    maxAttempts: 5,
    points: 1,
    prompt: text(
      "Let X be finite and let `g : X \\to X`. If `h \\circ g = id_X`, what is the first property of g used to prove that g is invertible?",
      "設 X 是有限集合且 `g : X \\to X`。若 `h \\circ g = id_X`，證明 g 可逆時首先得到 g 有甚麼性質？",
      "设 X 是有限集合且 `g : X \\to X`。若 `h \\circ g = id_X`，证明 g 可逆时首先得到 g 有什么性质？"
    ),
    choices: [
      {
        id: "a",
        text: text("g is injective.", "g 是單射。", "g 是单射。"),
      },
      {
        id: "b",
        text: text("g is constant.", "g 是常值函數。", "g 是常值函数。"),
      },
      {
        id: "c",
        text: text("g is undefined on one point.", "g 在某一點沒有定義。", "g 在某一点没有定义。"),
      },
      {
        id: "d",
        text: text("g has no image.", "g 沒有像。", "g 没有像。"),
      },
    ],
    correctAnswer: { choiceId: "a" },
    hints: [
      text(
        "Start with `g(x1)=g(x2)` and apply h to both sides.",
        "由 `g(x1)=g(x2)` 出發，兩邊同時作用 h。",
        "由 `g(x1)=g(x2)` 出发，两边同时作用 h。"
      ),
    ],
    showCorrectAnswerPolicy: "after-submit",
    showSolutionPolicy: "after-submit",
    solutionAccessTier: "FREE",
    solutionSteps: [
      text(
        "If `g(x1)=g(x2)`, applying h gives `h(g(x1))=h(g(x2))`.",
        "若 `g(x1)=g(x2)`，作用 h 後得 `h(g(x1))=h(g(x2))`。",
        "若 `g(x1)=g(x2)`，作用 h 后得 `h(g(x1))=h(g(x2))`。"
      ),
      text(
        "Since `h \\circ g = id_X`, this becomes `x1=x2`, so g is injective.",
        "因為 `h \\circ g = id_X`，這變成 `x1=x2`，所以 g 是單射。",
        "因为 `h \\circ g = id_X`，这变成 `x1=x2`，所以 g 是单射。"
      ),
      text(
        "A self-map of a finite set is invertible once it is injective.",
        "有限集合到自身的映射一旦是單射，就可推出可逆。",
        "有限集合到自身的映射一旦是单射，就可推出可逆。"
      ),
    ],
    skillTags: ["functions", "left-inverse", "finite-sets"],
  },
};

export function getProblemById(problemId: string) {
  return textbookProblemBank[problemId] ?? null;
}

export function getProblemsForUnit(unitId: string) {
  return Object.values(textbookProblemBank).filter((problem) => problem.unitId === unitId);
}
