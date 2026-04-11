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
      "Invertibility by row reduction",
      "用行化簡理解可逆性",
      "用行化简理解可逆性"
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
      "Matrix multiplication visualizer",
      "矩陣乘法視覺化",
      "矩阵乘法可视化"
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
      "Quantifier negation stepper",
      "量詞否定步驟器",
      "量词否定步骤器"
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
      "Row-reduction stepper",
      "行化簡步驟器",
      "行化简步骤器"
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
      "Set-operation explorer",
      "集合運算探索器",
      "集合运算探索器"
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
      "Solution-set classifier",
      "解集分類器",
      "解集分类器"
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
      "System-to-augmented-matrix explorer",
      "方程組到增廣矩陣探索器",
      "方程组到增广矩阵探索器"
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
      "Truth-table builder",
      "真值表建立器",
      "真值表建立器"
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
