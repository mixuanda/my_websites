import { getLocalizedText } from "./i18n";
import type { InteractiveExportSnapshot, Locale, LocalizedText } from "./types";

type SnapshotBuilder = {
  summary: LocalizedText;
  title: LocalizedText;
  sampleIO?: Array<{
    input: LocalizedText;
    output: LocalizedText;
  }>;
  sampleStates?: Array<{
    label: LocalizedText;
    value: LocalizedText;
  }>;
  staticDiagramNote?: LocalizedText;
  steps?: LocalizedText[];
};

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

const snapshotCatalog: Record<string, SnapshotBuilder> = {
  "invertibility-row-reduction-demo": {
    sampleStates: [
      {
        label: text("Initial block matrix", "初始分塊矩陣", "初始分块矩阵"),
        value: text(
          "[A | I] starts with pivots missing in rows 2 and 3.",
          "[A | I] 起初在第 2、3 行未看見主元。",
          "[A | I] 起初在第 2、3 行未看见主元。"
        ),
      },
      {
        label: text("Final block matrix", "最終分塊矩陣", "最终分块矩阵"),
        value: text(
          "[I | A^-1] confirms that A is invertible and reveals the inverse on the right.",
          "[I | A^-1] 表明 A 可逆，並在右邊顯示逆矩陣。",
          "[I | A^-1] 表明 A 可逆，并在右边显示逆矩阵。"
        ),
      },
    ],
    summary: text(
      "The live demo lets you step through [A | I] until the left block becomes I.",
      "互動示範讓你逐步把 [A | I] 化簡，直到左邊變成 I。",
      "互动示范让你逐步把 [A | I] 化简，直到左边变成 I。"
    ),
    steps: [
      text("Swap rows to move a nonzero entry into the pivot position.", "先交換兩行，把非零元素移到主元位置。", "先交换两行，把非零元素移到主元位置。"),
      text("Scale and eliminate until each pivot column has zeros elsewhere.", "再縮放並消元，讓每個主元列其餘位置都變成 0。", "再缩放并消元，让每个主元列其余位置都变成 0。"),
      text("Read the inverse from the right block only after the left block is I.", "只有當左邊化成 I 時，才可從右邊讀出逆矩陣。", "只有当左边化成 I 时，才可从右边读出逆矩阵。"),
    ],
    title: text(
      "Follow one inverse-by-row-reduction example",
      "跟著看一個用行化簡求逆的例子",
      "跟着看一个用行化简求逆的例子"
    ),
  },
  "matrix-multiplication-visualizer": {
    sampleIO: [
      {
        input: text(
          "A = [[1, 2], [0, 1]], B = [[2, 1], [3, 4]]",
          "A = [[1, 2], [0, 1]], B = [[2, 1], [3, 4]]",
          "A = [[1, 2], [0, 1]], B = [[2, 1], [3, 4]]"
        ),
        output: text(
          "AB = [[8, 9], [3, 4]]. The highlighted cell uses one row of A and one column of B.",
          "AB = [[8, 9], [3, 4]]。被突出的一格來自 A 的一行與 B 的一列。",
          "AB = [[8, 9], [3, 4]]。被突出的一格来自 A 的一行与 B 的一列。"
        ),
      },
    ],
    summary: text(
      "The live widget updates each entry of AB as you change the entries of A and B.",
      "互動工具會在你改變 A 與 B 的元素時，即時更新 AB 的每一格。",
      "互动工具会在你改变 A 与 B 的元素时，即时更新 AB 的每一格。"
    ),
    steps: [
      text("Choose the output cell you want to inspect.", "先選擇你想觀察的輸出位置。", "先选择你想观察的输出位置。"),
      text("Match the corresponding row of A with the corresponding column of B.", "把 A 的對應行與 B 的對應列配對。", "把 A 的对应行与 B 的对应列配对。"),
      text("Multiply entry by entry, then add the results.", "逐項相乘，再把結果加起來。", "逐项相乘，再把结果加起来。"),
    ],
    title: text(
      "Follow one matrix product entry",
      "跟著看一格矩陣乘法",
      "跟着看一格矩阵乘法"
    ),
  },
  "quantifier-negation-stepper": {
    sampleStates: [
      {
        label: text("Original statement", "原本陳述", "原本陈述"),
        value: text(
          "For every real number x, x^2 >= 0.",
          "對每個實數 x，都有 x^2 >= 0。",
          "对每个实数 x，都有 x^2 >= 0。"
        ),
      },
      {
        label: text("Negated statement", "否定後的陳述", "否定后的陈述"),
        value: text(
          "There exists a real number x such that x^2 < 0.",
          "存在一個實數 x，使得 x^2 < 0。",
          "存在一个实数 x，使得 x^2 < 0。"
        ),
      },
    ],
    summary: text(
      "The live stepper reveals one quantifier-negation move at a time.",
      "互動步驟器會逐步顯示量詞否定的每一步。",
      "互动步骤器会逐步显示量词否定的每一步。"
    ),
    steps: [
      text("Find the outermost quantifier.", "先找最外層量詞。", "先找最外层量词。"),
      text("Swap 'for every' with 'there exists' or the other way around.", "把「對所有」換成「存在」，或反過來。", "把“对所有”换成“存在”，或反过来。"),
      text("Negate the inside statement after switching the quantifier.", "完成量詞切換後，再否定內部陳述。", "完成量词切换后，再否定内部陈述。"),
    ],
    title: text(
      "Negate one quantified statement carefully",
      "仔細否定一個帶量詞的陳述",
      "仔细否定一个带量词的陈述"
    ),
  },
  "induction-stepper": {
    sampleStates: [
      {
        label: text("Base case", "基本情況", "基本情况"),
        value: text(
          "Check the claim at 0 before you try to move to the next number.",
          "先檢查命題在 0 是否成立，再嘗試走到下一個數。",
          "先检查命题在 0 是否成立，再尝试走到下一个数。"
        ),
      },
      {
        label: text("Induction step", "歸納步驟", "归纳步骤"),
        value: text(
          "Assume the claim for n, then show it for S(n).",
          "先假設命題對 n 成立，再證明它對 S(n) 也成立。",
          "先假设命题对 n 成立，再证明它对 S(n) 也成立。"
        ),
      },
      {
        label: text("Conclusion", "結論", "结论"),
        value: text(
          "Once both pieces are in place, the claim holds for every natural number.",
          "兩部分都完成後，命題就對每個自然數成立。",
          "两部分都完成后，命题就对每个自然数成立。"
        ),
      },
    ],
    summary: text(
      "The live stepper separates a proof by induction into its three moving parts.",
      "互動步驟器把歸納證明拆成三個會動的部分。",
      "互动步骤器把归纳证明拆成三个会动的部分。"
    ),
    steps: [
      text("State the claim you want for every natural number.", "先說明你想對每個自然數證明甚麼。", "先说明你想对每个自然数证明什么。"),
      text("Check the base case at 0.", "檢查 0 的基本情況。", "检查 0 的基本情况。"),
      text("Assume the claim for n and prove it for S(n).", "假設對 n 成立，再證 S(n) 的情況。", "假设对 n 成立，再证 S(n) 的情况。"),
    ],
    title: text(
      "Trace one induction proof",
      "跟著走一遍歸納證明",
      "跟着走一遍归纳证明"
    ),
  },
  "row-reduction-stepper": {
    sampleStates: [
      {
        label: text("Before elimination", "消元前", "消元前"),
        value: text(
          "Pivot candidates appear in columns 1 and 2, but lower entries still need to be cleared.",
          "第 1、2 列已見到主元候選，但下面仍有元素要消去。",
          "第 1、2 列已见到主元候选，但下面仍有元素要消去。"
        ),
      },
      {
        label: text("After elimination", "消元後", "消元后"),
        value: text(
          "The final RREF makes pivots and free variables visible at a glance.",
          "最終的 RREF 讓主元與自由變量一眼可見。",
          "最终的 RREF 让主元与自由变量一眼可见。"
        ),
      },
    ],
    summary: text(
      "The live stepper lets you compare each row operation with the matrix it produces.",
      "互動步驟器讓你把每個行變換與其產生的矩陣逐一對照。",
      "互动步骤器让你把每个行变换与其产生的矩阵逐一对照。"
    ),
    steps: [
      text("Choose a pivot column.", "先選一個主元列。", "先选一个主元列。"),
      text("Clear entries below or above that pivot with row operations.", "用行變換把主元上下的元素清掉。", "用行变换把主元上下的元素清掉。"),
      text("Normalize pivot rows only after the structure is clear.", "當結構清楚後，再把主元行標準化。", "当结构清楚后，再把主元行标准化。"),
    ],
    title: text(
      "Trace one elimination path",
      "跟著走一條消元路徑",
      "跟着走一条消元路径"
    ),
  },
  "set-operation-explorer": {
    sampleStates: [
      {
        label: text("Sample sets", "示例集合", "示例集合"),
        value: text(
          "If A = {1, 2, 4} and B = {2, 3, 4}, then A ∩ B = {2, 4}.",
          "若 A = {1, 2, 4}、B = {2, 3, 4}，則 A ∩ B = {2, 4}。",
          "若 A = {1, 2, 4}、B = {2, 3, 4}，则 A ∩ B = {2, 4}。"
        ),
      },
      {
        label: text("Difference", "差集", "差集"),
        value: text(
          "Using the same sets, A \\ B = {1}.",
          "同樣用這兩個集合，可得 A \\ B = {1}。",
          "同样用这两个集合，可得 A \\ B = {1}。"
        ),
      },
    ],
    summary: text(
      "The live explorer lets you move elements in and out of A and B and watch the resulting operations update immediately.",
      "互動探索器讓你把元素加入或移出 A 與 B，並即時看見運算結果改變。",
      "互动探索器让你把元素加入或移出 A 与 B，并即时看见运算结果改变。"
    ),
    steps: [
      text("Choose which elements belong to A.", "先決定哪些元素屬於 A。", "先决定哪些元素属于 A。"),
      text("Choose which elements belong to B.", "再決定哪些元素屬於 B。", "再决定哪些元素属于 B。"),
      text("Compare the overlap, union, and difference side by side.", "並排比較交集、聯集與差集。", "并排比较交集、并集与差集。"),
    ],
    title: text(
      "Compare one pair of sets",
      "比較一對集合",
      "比较一对集合"
    ),
  },
  "solution-set-classifier": {
    sampleStates: [
      {
        label: text("Unique solution case", "唯一解情況", "唯一解情况"),
        value: text(
          "Every variable has a pivot, so the solution is a single vector.",
          "每個變量都有主元，因此解是一個單獨向量。",
          "每个变量都有主元，因此解是一个单独向量。"
        ),
      },
      {
        label: text("Infinite-solution case", "無限多解情況", "无限多解情况"),
        value: text(
          "A free variable remains, so the solution set becomes a family of vectors.",
          "仍有自由變量，因此解集變成一族向量。",
          "仍有自由变量，因此解集变成一族向量。"
        ),
      },
      {
        label: text("No-solution case", "無解情況", "无解情况"),
        value: text(
          "A row like [0 0 0 | 1] creates a contradiction, so the system is inconsistent.",
          "像 [0 0 0 | 1] 這樣的一行會造成矛盾，因此方程組不相容。",
          "像 [0 0 0 | 1] 这样的一行会造成矛盾，因此方程组不相容。"
        ),
      },
    ],
    summary: text(
      "The live classifier compares three representative reduced matrices and explains what each structure means.",
      "互動分類器會比較三個代表性的化簡矩陣，並解釋它們各自代表甚麼。",
      "互动分类器会比较三个代表性的化简矩阵，并解释它们各自代表什么。"
    ),
    title: text(
      "Read the shape of a solution set",
      "讀出解集的形狀",
      "读出解集的形状"
    ),
  },
  "span-explorer": {
    sampleIO: [
      {
        input: text(
          "Take u = (1, 0), v = (0, 1), α = 2, β = -1.",
          "取 u = (1, 0)、v = (0, 1)、α = 2、β = -1。",
          "取 u = (1, 0)、v = (0, 1)、α = 2、β = -1。"
        ),
        output: text(
          "Then αu + βv = (2, -1), so the output lies in Span{u, v}.",
          "則 αu + βv = (2, -1)，所以輸出向量屬於 Span{u, v}。",
          "则 αu + βv = (2, -1)，所以输出向量属于 Span{u, v}。"
        ),
      },
    ],
    summary: text(
      "The live explorer lets you vary coefficients and watch the resulting vector move inside the span.",
      "互動探索讓你改變係數，並看著結果向量如何在張成裡移動。",
      "互动探索让你改变系数，并看着结果向量如何在张成里移动。"
    ),
    steps: [
      text("Choose two generators u and v.", "先選兩個生成向量 u 與 v。", "先选两个生成向量 u 与 v。"),
      text("Adjust the coefficients α and β.", "調整係數 α 與 β。", "调整系数 α 与 β。"),
      text("Read the new vector αu + βv as one point inside the span.", "把新的向量 αu + βv 看成張成中的一個點。", "把新的向量 αu + βv 看成张成中的一个点。"),
    ],
    title: text(
      "Build one vector from a span",
      "由張成組合出一個向量",
      "由张成组合出一个向量"
    ),
  },
  "subspace-checker": {
    sampleStates: [
      {
        label: text("A passing case", "一個通過的例子", "一个通过的例子"),
        value: text(
          "The line y = 2x contains 0 and stays closed under addition and scalar multiplication.",
          "直線 y = 2x 包含 0，而且對加法與數乘都封閉。",
          "直线 y = 2x 包含 0，而且对加法与数乘都封闭。"
        ),
      },
      {
        label: text("A failing case", "一個不通過的例子", "一个不通过的例子"),
        value: text(
          "The line y = 2x + 1 misses the zero vector, so it cannot be a subspace.",
          "直線 y = 2x + 1 不包含零向量，因此不可能是子空間。",
          "直线 y = 2x + 1 不包含零向量，因此不可能是子空间。"
        ),
      },
    ],
    summary: text(
      "The live checker compares common subsets and marks exactly where the subspace test passes or fails.",
      "互動檢查會比較常見子集，並指出子空間測試到底在哪一步通過或失敗。",
      "互动检查会比较常见子集，并指出子空间测试到底在哪一步通过或失败。"
    ),
    steps: [
      text("Check whether 0 is inside the set.", "先檢查 0 是否在集合內。", "先检查 0 是否在集合内。"),
      text("Check closure under vector addition.", "再檢查對向量加法是否封閉。", "再检查对向量加法是否封闭。"),
      text("Check closure under scalar multiplication.", "最後檢查對數乘是否封閉。", "最后检查对数乘是否封闭。"),
    ],
    title: text(
      "Run one subspace test",
      "做一次子空間測試",
      "做一次子空间测试"
    ),
  },
  "independence-checker": {
    sampleStates: [
      {
        label: text("Independent pair", "無關的一對向量", "无关的一对向量"),
        value: text(
          "{e1, e2} is independent because c1e1 + c2e2 = 0 forces c1 = c2 = 0.",
          "{e1, e2} 線性無關，因為 c1e1 + c2e2 = 0 只會推出 c1 = c2 = 0。",
          "{e1, e2} 线性无关，因为 c1e1 + c2e2 = 0 只会推出 c1 = c2 = 0。"
        ),
      },
      {
        label: text("Dependent triple", "相依的三個向量", "相依的三个向量"),
        value: text(
          "{u1, u2, u1 + u2} is dependent because one vector is already a combination of the other two.",
          "{u1, u2, u1 + u2} 線性相依，因為其中一個向量本身就是另外兩個的組合。",
          "{u1, u2, u1 + u2} 线性相依，因为其中一个向量本身就是另外两个的组合。"
        ),
      },
    ],
    summary: text(
      "The live checker compares small vector sets and explains whether a nontrivial linear relation exists.",
      "互動檢查會比較幾組小向量，並解釋是否存在非平凡線性關係。",
      "互动检查会比较几组小向量，并解释是否存在非平凡线性关系。"
    ),
    steps: [
      text("Look for an obvious redundancy such as one vector being a multiple or a sum of the others.", "先找明顯的冗餘，例如某個向量是其他向量的倍數或和。", "先找明显的冗余，例如某个向量是其他向量的倍数或和。"),
      text("If no redundancy appears, test whether the zero combination forces every coefficient to be zero.", "若看不出冗餘，再檢查零組合是否逼使每個係數都等於 0。", "若看不出冗余，再检查零组合是否逼使每个系数都等于 0。"),
    ],
    title: text(
      "Test one set for dependence",
      "測試一組向量是否相依",
      "测试一组向量是否相依"
    ),
  },
  "system-augmented-matrix-explorer": {
    sampleIO: [
      {
        input: text(
          "x + 2y = 5, 3x - y = 4",
          "x + 2y = 5，3x - y = 4",
          "x + 2y = 5，3x - y = 4"
        ),
        output: text(
          "The augmented matrix is [[1, 2 | 5], [3, -1 | 4]].",
          "其增廣矩陣是 [[1, 2 | 5], [3, -1 | 4]]。",
          "其增广矩阵是 [[1, 2 | 5], [3, -1 | 4]]。"
        ),
      },
    ],
    summary: text(
      "The live explorer highlights how each equation becomes one matrix row plus one constant entry.",
      "互動探索器會突顯每條方程如何變成矩陣的一行和一個常數項。",
      "互动探索器会突显每条方程如何变成矩阵的一行和一个常数项。"
    ),
    steps: [
      text("Read off the coefficients in order.", "依次讀出各個係數。", "依次读出各个系数。"),
      text("Place the constants in the augmented column.", "把常數放進增廣列。", "把常数放进增广列。"),
      text("Check that each row still represents the same equation.", "檢查每一行仍代表同一條方程。", "检查每一行仍代表同一条方程。"),
    ],
    title: text(
      "Translate one system into a matrix",
      "把一個方程組翻成矩陣",
      "把一个方程组翻成矩阵"
    ),
  },
  "truth-table-builder": {
    sampleStates: [
      {
        label: text("Implication row", "蘊含的一行", "蕴含的一行"),
        value: text(
          "When P is true and Q is false, P → Q is false.",
          "當 P 真而 Q 假時，P → Q 為假。",
          "当 P 真而 Q 假时，P → Q 为假。"
        ),
      },
      {
        label: text("Equivalent rewrite", "等價改寫", "等价改写"),
        value: text(
          "The same table shows that P → Q and ¬P ∨ Q always match.",
          "同一張表會顯示 P → Q 與 ¬P ∨ Q 永遠一致。",
          "同一张表会显示 P → Q 与 ¬P ∨ Q 永远一致。"
        ),
      },
    ],
    summary: text(
      "The live builder lets you switch formulas and inspect how each row changes the final truth value.",
      "互動工具讓你切換公式，並觀察每一列如何影響最後的真假。",
      "互动工具让你切换公式，并观察每一列如何影响最后的真假。"
    ),
    steps: [
      text("Choose a formula such as P → Q or P ↔ Q.", "先選擇一個公式，例如 P → Q 或 P ↔ Q。", "先选择一个公式，例如 P → Q 或 P ↔ Q。"),
      text("Read the truth values of P and Q row by row.", "逐行讀取 P 與 Q 的真假。", "逐行读取 P 与 Q 的真假。"),
      text("Compare the final column with a rewritten formula to test equivalence.", "把最後一列與改寫後的公式比較，以檢查邏輯等價。", "把最后一列与改写后的公式比较，以检查逻辑等价。"),
    ],
    title: text(
      "Trace one truth table",
      "跟著看一張真值表",
      "跟着看一张真值表"
    ),
  },
};

export function getInteractiveSnapshot(
  id: string,
  locale: Locale
): InteractiveExportSnapshot | null {
  const snapshot = snapshotCatalog[id];

  if (!snapshot) {
    return null;
  }

  return {
    sampleIO: snapshot.sampleIO?.map((pair) => ({
      input: getLocalizedText(pair.input, locale),
      output: getLocalizedText(pair.output, locale),
    })),
    sampleStates: snapshot.sampleStates?.map((state) => ({
      label: getLocalizedText(state.label, locale),
      value: getLocalizedText(state.value, locale),
    })),
    staticDiagramNote: snapshot.staticDiagramNote
      ? getLocalizedText(snapshot.staticDiagramNote, locale)
      : undefined,
    steps: snapshot.steps?.map((step) => getLocalizedText(step, locale)),
    summary: getLocalizedText(snapshot.summary, locale),
    title: getLocalizedText(snapshot.title, locale),
  };
}
