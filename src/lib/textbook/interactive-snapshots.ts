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
  "matrix-arithmetic-lab": {
    sampleStates: [
      {
        label: text("Addition view", "加法畫面", "加法画面"),
        value: text(
          "A + B adds matching entries, so two 2 x 2 matrices stay 2 x 2 after addition.",
          "A + B 會把對應位置逐格相加，所以兩個 2 x 2 矩陣相加後仍是 2 x 2。",
          "A + B 会把对应位置逐格相加，所以两个 2 x 2 矩阵相加后仍是 2 x 2。"
        ),
      },
      {
        label: text("Scalar view", "數乘畫面", "数乘画面"),
        value: text(
          "cA keeps the same matrix shape but multiplies every entry by the scalar c.",
          "cA 會保留原來的矩陣大小，只是把每個元素都乘上純量 c。",
          "cA 会保留原来的矩阵大小，只是把每个元素都乘上标量 c。"
        ),
      },
    ],
    summary: text(
      "The live lab switches among A + B, A - B, and cA so students can see that these operations are entrywise and size-preserving.",
      "互動工具可在 A + B、A - B 與 cA 之間切換，讓學生看見這些運算都是逐格進行，而且會保留矩陣大小。",
      "互动工具可在 A + B、A - B 与 cA 之间切换，让学生看见这些运算都是逐格进行，而且会保留矩阵大小。"
    ),
    steps: [
      text("Choose whether you want addition, subtraction, or scalar multiplication.", "先選擇你想看加法、減法，還是數乘。", "先选择你想看加法、减法，还是数乘。"),
      text("Change one matrix entry at a time and watch the matching result entry update.", "逐個改變矩陣元素，觀察對應的結果位置如何改變。", "逐个改变矩阵元素，观察对应的结果位置如何改变。"),
      text("For scalar multiplication, keep the matrix fixed and change only the scalar to see every entry scale together.", "做數乘時，固定矩陣，只改變純量，就會看到全部元素一起縮放。", "做数乘时，固定矩阵，只改变标量，就会看到全部元素一起缩放。"),
    ],
    title: text(
      "Compare entrywise matrix operations",
      "比較逐格矩陣運算",
      "比较逐格矩阵运算"
    ),
  },
  "matrix-family-checker": {
    sampleStates: [
      {
        label: text("Symmetric example", "對稱例子", "对称例子"),
        value: text(
          "A = [[2, -1], [-1, 5]] matches its transpose exactly, so it is symmetric.",
          "A = [[2, -1], [-1, 5]] 與自己的轉置完全相同，所以它是對稱矩陣。",
          "A = [[2, -1], [-1, 5]] 与自己的转置完全相同，所以它是对称矩阵。"
        ),
      },
      {
        label: text("Skew-symmetric example", "反對稱例子", "反对称例子"),
        value: text(
          "A = [[0, 4], [-4, 0]] changes sign under transpose, so A^T = -A.",
          "A = [[0, 4], [-4, 0]] 在轉置後會改變符號，所以 A^T = -A。",
          "A = [[0, 4], [-4, 0]] 在转置后会改变符号，所以 A^T = -A。"
        ),
      },
      {
        label: text("Identity example", "單位矩陣例子", "单位矩阵例子"),
        value: text(
          "The identity matrix is also diagonal and symmetric, so one matrix can belong to several useful families at once.",
          "單位矩陣同時也是對角矩陣與對稱矩陣，所以同一個矩陣可以同時屬於多個有用的類型。",
          "单位矩阵同时也是对角矩阵与对称矩阵，所以同一个矩阵可以同时属于多个有用的类型。"
        ),
      },
    ],
    summary: text(
      "The live checker compares A with A^T and highlights whether the example is symmetric, skew-symmetric, diagonal, or identity.",
      "互動檢查器會把 A 與 A^T 並排比較，並標示例子是否屬於對稱、反對稱、對角或單位矩陣。",
      "互动检查器会把 A 与 A^T 并排比较，并标示例子是否属于对称、反对称、对角或单位矩阵。"
    ),
    steps: [
      text("Pick one matrix family to inspect.", "先選擇一種矩陣類型來看。", "先选择一种矩阵类型来看。"),
      text("Compare A with A^T entry by entry instead of guessing from the shape alone.", "逐格比較 A 與 A^T，而不是只靠外觀猜測。", "逐格比较 A 与 A^T，而不是只靠外观猜测。"),
      text("Notice that diagonal and identity matrices also satisfy stronger properties such as symmetry.", "留意對角矩陣與單位矩陣往往還會同時滿足更強的性質，例如對稱。", "留意对角矩阵与单位矩阵往往还会同时满足更强的性质，例如对称。"),
    ],
    title: text(
      "Classify one matrix by its transpose",
      "用轉置分類一個矩陣",
      "用转置分类一个矩阵"
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
  "transpose-symmetry-lab": {
    sampleStates: [
      {
        label: text("Symmetric example", "對稱例子", "对称例子"),
        value: text(
          "A = [[2, -1], [-1, 3]] has matching off-diagonal entries, so A^T = A.",
          "A = [[2, -1], [-1, 3]] 的對角線兩側元素互相對應，所以 A^T = A。",
          "A = [[2, -1], [-1, 3]] 的对角线两侧元素互相对应，所以 A^T = A。"
        ),
      },
      {
        label: text("Neither example", "既非對稱亦非反對稱的例子", "既非对称也非反对称的例子"),
        value: text(
          "A = [[2, 4], [0, 6]] is neither symmetric nor skew-symmetric, but it splits into a symmetric part and a skew-symmetric part.",
          "A = [[2, 4], [0, 6]] 既不是對稱矩陣，也不是反對稱矩陣，但它可以拆成一個對稱部分和一個反對稱部分。",
          "A = [[2, 4], [0, 6]] 既不是对称矩阵，也不是反对称矩阵，但它可以拆成一个对称部分和一个反对称部分。"
        ),
      },
    ],
    summary: text(
      "The live widget compares a matrix with its transpose and shows how the symmetric and skew-symmetric parts are built.",
      "互動工具會把矩陣和它的轉置並排比較，並顯示對稱部分與反對稱部分如何組成。",
      "互动工具会把矩阵和它的转置并排比较，并显示对称部分与反对称部分如何组成。"
    ),
    steps: [
      text("Pick one example matrix.", "先選擇一個例子矩陣。", "先选择一个例子矩阵。"),
      text("Compare A with A^T by checking the entries across the main diagonal.", "沿主對角線兩側比較 A 和 A^T 的元素。", "沿主对角线两侧比较 A 和 A^T 的元素。"),
      text("Use 1/2(A + A^T) and 1/2(A - A^T) to separate the symmetric and skew-symmetric parts.", "用 1/2(A + A^T) 與 1/2(A - A^T) 分開對稱部分和反對稱部分。", "用 1/2(A + A^T) 与 1/2(A - A^T) 分开对称部分和反对称部分。"),
    ],
    title: text(
      "Compare a matrix with its transpose",
      "比較一個矩陣與它的轉置",
      "比较一个矩阵与它的转置"
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
        label: text("Start with the augmented matrix", "由增廣矩陣開始", "由增广矩阵开始"),
        value: text(
          "Column 1 already has a useful pivot 1, so the first job is to clear the entries underneath it.",
          "第 1 列已經有可用的主元 1，所以第一個任務是清掉它下面的元素。",
          "第 1 列已经有可用的主元 1，所以第一个任务是清掉它下面的元素。"
        ),
      },
      {
        label: text("Build the echelon shape", "建立階梯形", "建立阶梯形"),
        value: text(
          "After clearing below the first two pivots, the matrix becomes triangular enough that the final cleanup is predictable.",
          "清掉前兩個主元下方的元素後，矩陣已經足夠接近三角形，最後整理的方向就很清楚。",
          "清掉前两个主元下方的元素后，矩阵已经足够接近三角形，最后整理的方向就很清楚。"
        ),
      },
      {
        label: text("Read the finished RREF", "讀出完成後的 RREF", "读出完成后的 RREF"),
        value: text(
          "The final matrix gives x = 2, y = -3, z = 4 directly from the last column.",
          "最後的矩陣可以直接從最後一列讀出 x = 2、y = -3、z = 4。",
          "最后的矩阵可以直接从最后一列读出 x = 2、y = -3、z = 4。"
        ),
      },
    ],
    summary: text(
      "The live stepper walks through one complete elimination path, showing the row operation, the pivot you are focusing on, and the matrix produced at each step.",
      "互動步驟器會帶你走完一條完整的消元路徑，逐步顯示行變換、正在處理的主元，以及每一步得到的矩陣。",
      "互动步骤器会带你走完一条完整的消元路径，逐步显示行变换、正在处理的主元，以及每一步得到的矩阵。"
    ),
    steps: [
      text("Use the first pivot to clear column 1 below it.", "用第一個主元把第 1 列下面的元素清掉。", "用第一个主元把第 1 列下面的元素清掉。"),
      text("Repeat inside the smaller bottom-right submatrix.", "再到右下角較小的子矩陣重複同樣過程。", "再到右下角较小的子矩阵重复同样过程。"),
      text("Normalize the last pivot and clear the entries above it.", "把最後一個主元標準化，並清掉它上方的元素。", "把最后一个主元标准化，并清掉它上方的元素。"),
      text("Finish by clearing above the second pivot so the matrix reaches RREF.", "最後清掉第二個主元上方的元素，令矩陣到達 RREF。", "最后清掉第二个主元上方的元素，让矩阵到达 RREF。"),
    ],
    title: text(
      "Trace one full row-reduction path",
      "跟著走完一條行化簡路徑",
      "跟着走完一条行化简路径"
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
