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
  "adt-stack-queue-stepper": {
    sampleStates: [
      {
        label: text("Stack code trace", "Stack 程式追蹤", "Stack 程序追踪"),
        value: text(
          "Command list: push 10, push 20, top, pop. Returned values confirm the same LIFO contract shown in the sample C push/pop functions.",
          "指令串列：push 10、push 20、top、pop。回傳結果會對應到 C 範例裡的 LIFO push/pop 契約。",
          "指令串列：push 10、push 20、top、pop。返回结果会对应到 C 示例里的 LIFO push/pop 契约。"
        ),
      },
      {
        label: text("Queue code trace", "Queue 程式追蹤", "Queue 程序追踪"),
        value: text(
          "Command list: enqueue 3, enqueue 5, front, dequeue. Returned values confirm the FIFO behavior implemented by the enqueue/dequeue sample.",
          "指令串列：enqueue 3、enqueue 5、front、dequeue。回傳結果會對應到 enqueue/dequeue 範例裡的 FIFO 行為。",
          "指令串列：enqueue 3、enqueue 5、front、dequeue。返回结果会对应到 enqueue/dequeue 示例里的 FIFO 行为。"
        ),
      },
    ],
    summary: text(
      "The widget now pairs a C-style code sample with an editable command list, so readers can test stack and queue semantics against the stated ADT contract.",
      "這個工具現在把 C 風格程式範例和可編輯指令串列放在一起，讓讀者可以直接測試 stack 與 queue 的 ADT 語義。",
      "这个工具现在把 C 风格程序示例和可编辑指令串列放在一起，让读者可以直接测试 stack 与 queue 的 ADT 语义。"
    ),
    steps: [
      text("Read the sample push/pop or enqueue/dequeue code first.", "先閱讀對應的 push/pop 或 enqueue/dequeue 程式範例。", "先阅读对应的 push/pop 或 enqueue/dequeue 程序示例。"),
      text("Edit the command list and watch the returned values and resulting state.", "改動指令串列，觀察回傳值與最後狀態。", "改动指令串列，观察返回值与最终状态。"),
      text("Check whether the observed behavior still satisfies the ADT contract.", "檢查觀察到的行為是否仍符合 ADT 契約。", "检查观察到的行为是否仍符合 ADT 契约。"),
    ],
    title: text(
      "Trace ADT operation semantics",
      "追蹤 ADT 操作語義",
      "追踪 ADT 操作语义"
    ),
  },
  "pointer-state-tracer": {
    sampleStates: [
      {
        label: text("Before pointer reassignment", "重定向之前", "重定向之前"),
        value: text(
          "p1 points to firstvalue, p2 points to secondvalue, and writing through p1 changes firstvalue.",
          "p1 指向 firstvalue，p2 指向 secondvalue，而經 p1 寫入會改變 firstvalue。",
          "p1 指向 firstvalue，p2 指向 secondvalue，而经 p1 写入会改变 firstvalue。"
        ),
      },
      {
        label: text("After p1 = p2", "做完 p1 = p2 之後", "做完 p1 = p2 之后"),
        value: text(
          "Both pointers now refer to secondvalue, so the final write changes secondvalue instead of firstvalue.",
          "兩個 pointer 都改為指向 secondvalue，所以最後一次寫入會改變 secondvalue。",
          "两个 pointer 都改为指向 secondvalue，所以最后一次写入会改变 secondvalue。"
        ),
      },
    ],
    summary: text(
      "The tracer lets you change the starting integers, then replay the pointer tutorial step by step.",
      "這個 tracer 讓你改動初始整數，再逐步重播 pointer tutorial 的狀態變化。",
      "这个 tracer 让你改动初始整数，再逐步重播 pointer tutorial 的状态变化。"
    ),
    steps: [
      text("Set the initial integer values.", "先設定初始整數值。", "先设定初始整数值。"),
      text("Step through the pointer assignments and dereferences.", "逐步查看 pointer 指派與 dereference。", "逐步查看 pointer 指派与 dereference。"),
      text("Check whether you are moving an address or writing through an address.", "分清楚你是在移動地址，還是在經地址寫值。", "分清楚你是在移动地址，还是在经地址写值。"),
    ],
    title: text(
      "Trace one pointer state sequence",
      "追蹤一條 pointer 狀態序列",
      "追踪一条 pointer 状态序列"
    ),
  },
  "hash-bucket-lab": {
    sampleStates: [
      {
        label: text("Four keys in seven buckets", "七個 bucket 裡的四個 key", "七个 bucket 里的四个 key"),
        value: text(
          "The lab hashes `cat`, `dog`, `cow`, and `cod`, then shows which keys collide into the same bucket chain.",
          "工具會對 `cat`、`dog`、`cow`、`cod` 做 hashing，並顯示哪些 key 落入同一條 bucket chain。",
          "工具会对 `cat`、`dog`、`cow`、`cod` 做 hashing，并显示哪些 key 落入同一条 bucket chain。"
        ),
      },
      {
        label: text("Collision count", "Collision 數量", "Collision 数量"),
        value: text(
          "Changing the bucket count shows how the same keys can collide more or less often under the same simple hash rule.",
          "改變 bucket 數量之後，可看到同一組 key 在相同 hash 規則下碰撞次數如何改變。",
          "改变 bucket 数量之后，可看到同一组 key 在相同 hash 规则下碰撞次数如何改变。"
        ),
      },
    ],
    summary: text(
      "The lab maps sample keys into buckets with a simple hash rule so you can see collisions and chaining directly.",
      "這個 lab 用一條簡單 hash 規則把 key 映射到 bucket，讓你直接看到 collision 與 chaining。",
      "这个 lab 用一条简单 hash 规则把 key 映射到 bucket，让你直接看到 collision 与 chaining。"
    ),
    steps: [
      text("Choose a bucket count.", "先選一個 bucket 數量。", "先选一个 bucket 数量。"),
      text("Enter a comma-separated key list.", "輸入用逗號分隔的 key 串列。", "输入用逗号分隔的 key 串列。"),
      text("Compare bucket assignments and collision counts.", "比較各 key 的 bucket 分派與 collision 數量。", "比较各 key 的 bucket 分派与 collision 数量。"),
    ],
    title: text(
      "Test a simple hash-and-bucket model",
      "測試一個簡單的 hash-and-bucket 模型",
      "测试一个简单的 hash-and-bucket 模型"
    ),
  },
  "complexity-growth-comparator": {
    sampleStates: [
      {
        label: text("Merge-style code at n = 16", "merge 類程式在 n = 16", "merge 类程序在 n = 16"),
        value: text(
          "The sample merge-style loop estimates about 64 primitive steps, while a quadratic double loop would already be at 256.",
          "範例中的 merge 類迴圈大約是 64 個基本步，而二次雙重迴圈已經到 256。",
          "示例中的 merge 类循环大约是 64 个基本步，而二次双重循环已经到 256。"
        ),
      },
      {
        label: text("Halving vs nested loops at n = 128", "n = 128 時的對半迴圈與雙重迴圈", "n = 128 时的对半循环与双重循环"),
        value: text(
          "The halving loop stays logarithmic, while the nested loop explodes to 16384 primitive steps.",
          "對半迴圈仍保持對數級，而雙重迴圈已膨脹到 16384 個基本步。",
          "对半循环仍保持对数级，而双重循环已膨胀到 16384 个基本步。"
        ),
      },
    ],
    summary: text(
      "The widget now ties each growth class to a concrete code shape, so readers can change n and see how the chosen sample behaves against the comparison table.",
      "這個工具現在把增長級別綁到具體程式形狀上，讓讀者可以改變 n，並把當前範例與比較表對照。",
      "这个工具现在把增长级别绑到具体程序形状上，让读者可以改变 n，并把当前示例与比较表对照。"
    ),
    steps: [
      text("Choose one sample code shape first.", "先選擇一個程式形狀。", "先选择一个程序形状。"),
      text("Change n and compare the estimated primitive steps with the table on the right.", "調整 n，並把估計步數與右邊的比較表對照。", "调整 n，并把估计步数与右边的比较表对照。"),
      text("Use the widening gap to justify why one algorithm scales better than another.", "用逐步擴大的差距說明為甚麼某些演算法比另一些更能擴展。", "用逐步扩大的差距说明为什么某些算法比另一些更能扩展。"),
    ],
    title: text(
      "Compare asymptotic growth at one n",
      "在同一 n 比較漸進增長",
      "在同一 n 比较渐进增长"
    ),
  },
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
  "dedekind-cut-explorer": {
    sampleStates: [
      {
        label: text("Rational cut at 3/2", "3/2 的有理 cut", "3/2 的有理 cut"),
        value: text(
          "A = {q in Q : q < 3/2} has no largest element, while B = {q in Q : q >= 3/2} starts with a least element 3/2.",
          "A = {q in Q : q < 3/2} 沒有最大元，而 B = {q in Q : q >= 3/2} 則由最小元 3/2 開始。",
          "A = {q in Q : q < 3/2} 没有最大元，而 B = {q in Q : q >= 3/2} 则由最小元 3/2 开始。"
        ),
      },
      {
        label: text("Irrational cut at sqrt(2)", "sqrt(2) 的無理 cut", "sqrt(2) 的无理 cut"),
        value: text(
          "For A = {q in Q : q < sqrt(2)}, the right side B = {q in Q : q > sqrt(2)} has no least rational element, which is why the cut represents an irrational real number.",
          "對 A = {q in Q : q < sqrt(2)} 而言，右側 B = {q in Q : q > sqrt(2)} 沒有最小的有理元，這正是它代表無理實數的原因。",
          "对 A = {q in Q : q < sqrt(2)} 而言，右侧 B = {q in Q : q > sqrt(2)} 没有最小的有理元，这正是它代表无理实数的原因。"
        ),
      },
    ],
    staticDiagramNote: text(
      "Export as two static number-line panels: one split at 3/2 and one split near sqrt(2), with sample rationals marked on the left set A and the right set B.",
      "匯出時可用兩條靜態數線：一條在 3/2 處切開，一條在 sqrt(2) 附近切開，並把示例有理數標成左側的 A 與右側的 B。",
      "导出时可用两条静态数线：一条在 3/2 处切开，一条在 sqrt(2) 附近切开，并把示例有理数标成左侧的 A 与右侧的 B。"
    ),
    summary: text(
      "The explorer splits sample rationals into the left and right sides of a Dedekind cut so readers can see the structural difference between rational and irrational cuts.",
      "這個工具把示例有理數分到 Dedekind cut 的左右兩側，讓讀者直接看見有理 cut 與無理 cut 在結構上的差異。",
      "这个工具把示例有理数分到 Dedekind cut 的左右两侧，让读者直接看见有理 cut 与无理 cut 在结构上的差异。"
    ),
    steps: [
      text("Choose a boundary such as 3/2 or sqrt(2).", "先選擇一條邊界，例如 3/2 或 sqrt(2)。", "先选择一条边界，例如 3/2 或 sqrt(2)。"),
      text("Check which sample rationals fall into A and which fall into B.", "檢查哪些示例有理數落入 A，哪些落入 B。", "检查哪些示例有理数落入 A，哪些落入 B。"),
      text("Ask whether B begins with a smallest rational element or not.", "再問右側的 B 是否由某個最小的有理數開始。", "再问右侧的 B 是否由某个最小的有理数开始。"),
    ],
    title: text(
      "Inspect the two sides of a Dedekind cut",
      "觀察 Dedekind cut 的兩側",
      "观察 Dedekind cut 的两侧"
    ),
  },
  "decimal-approximation-builder": {
    sampleStates: [
      {
        label: text("Whole-number fence", "整數級圍欄", "整数级围栏"),
        value: text(
          "Before any decimal digit is used, the target lies between 10 and 11 in the lecture-note example, or between 1 and 2 for sqrt(2).",
          "在還未使用任何小數位時，講義例子只知道目標落在 10 與 11 之間；對 sqrt(2) 則只知道它在 1 與 2 之間。",
          "在还未使用任何小数位时，讲义例子只知道目标落在 10 与 11 之间；对 sqrt(2) 则只知道它在 1 与 2 之间。"
        ),
      },
      {
        label: text("After three decimal digits", "取到三位小數之後", "取到三位小数之后"),
        value: text(
          "At step 3 for sqrt(2), the number is trapped between 1.414 and 1.415, so the interval width has already shrunk to 0.001.",
          "對 sqrt(2) 而言，到第 3 步時數值已被夾在 1.414 與 1.415 之間，因此區間寬度已縮到 0.001。",
          "对 sqrt(2) 而言，到第 3 步时数值已被夹在 1.414 与 1.415 之间，因此区间宽度已缩到 0.001。"
        ),
      },
    ],
    staticDiagramNote: text(
      "Export as a staircase of nested intervals, where each extra decimal digit replaces a wider interval by a narrower one inside it.",
      "匯出時可把它畫成一串巢狀區間：每增加一位小數，就用更窄的區間取代原來較寬的區間。",
      "导出时可把它画成一串嵌套区间：每增加一位小数，就用更窄的区间取代原来较宽的区间。"
    ),
    summary: text(
      "The builder turns a decimal expansion into successive lower and upper rational bounds, making the approximation process visible one digit at a time.",
      "這個工具把小數展開轉成逐步收緊的上下有理界，讓近似過程可以按數位一步一步看見。",
      "这个工具把小数展开转成逐步收紧的上下有理界，让近似过程可以按数位一步一步看见。"
    ),
    steps: [
      text("Start with the whole-number interval.", "先從整數級的區間開始。", "先从整数级的区间开始。"),
      text("Add one more decimal digit to create a tighter lower and upper bound.", "每加入一位小數，就得到更緊的下界與上界。", "每加入一位小数，就得到更紧的下界与上界。"),
      text("Compare the new interval width with the previous step.", "把新的區間寬度與前一步比較。", "把新的区间宽度与前一步比较。"),
    ],
    title: text(
      "Build decimal approximations as shrinking intervals",
      "把小數近似看成收窄中的區間",
      "把小数近似看成收窄中的区间"
    ),
  },
  "sequence-limit-explorer": {
    sampleStates: [
      {
        label: text("Convergent tail for 1/n", "1/n 的收斂尾部", "1/n 的收敛尾部"),
        value: text(
          "With candidate limit 0 and epsilon = 0.2, taking N = 5 works because every term after n > 5 satisfies 1/n < 0.2.",
          "當候選極限是 0 且 epsilon = 0.2 時，取 N = 5 就足夠，因為所有 n > 5 的項都滿足 1/n < 0.2。",
          "当候选极限是 0 且 epsilon = 0.2 时，取 N = 5 就足够，因为所有 n > 5 的项都满足 1/n < 0.2。"
        ),
      },
      {
        label: text("Oscillation for (-1)^n", "(-1)^n 的震盪", "(-1)^n 的振荡"),
        value: text(
          "With candidate limit 0, the terms keep jumping between -1 and 1, so no matter how far you go there is no single tail trapped inside a small epsilon-band around 0.",
          "當候選極限是 0 時，各項會一直在 -1 與 1 之間跳動，所以無論走得多後，都找不到整條尾部被困在 0 附近小 epsilon 帶內。",
          "当候选极限是 0 时，各项会一直在 -1 与 1 之间跳动，所以无论走得多后，都找不到整条尾部被困在 0 附近小 epsilon 带内。"
        ),
      },
    ],
    staticDiagramNote: text(
      "Export as a term table together with one highlighted epsilon-band and the first usable tail index N when the sequence converges.",
      "匯出時可保留數列表格，再配上一條被標出的 epsilon 帶，以及收斂情況下第一個可用的尾部起點 N。",
      "导出时可保留数列表格，再配上一条被标出的 epsilon 带，以及收敛情况下第一个可用的尾部起点 N。"
    ),
    summary: text(
      "The explorer compares convergent and non-convergent sequences by asking whether the tail can be trapped inside a chosen epsilon-band around the candidate limit.",
      "這個工具用「尾部能否被某條 epsilon 帶困住」來比較收斂與不收斂的數列。",
      "这个工具用“尾部能否被某条 epsilon 带困住”来比较收敛与不收敛的数列。"
    ),
    steps: [
      text("Choose a sequence and a candidate limit L.", "先選一條數列與一個候選極限 L。", "先选一条数列与一个候选极限 L。"),
      text("Choose epsilon and inspect which early terms already lie inside the band.", "再選 epsilon，觀察前面幾項有哪些已經落在帶內。", "再选 epsilon，观察前面几项有哪些已经落在带内。"),
      text("Decide whether some tail index N makes every later term stay inside the band.", "最後判斷是否存在某個尾部起點 N，使之後所有項都留在帶內。", "最后判断是否存在某个尾部起点 N，使之后所有项都留在带内。"),
    ],
    title: text(
      "Test whether a sequence tail stays inside an epsilon-band",
      "測試數列尾部能否留在 epsilon 帶內",
      "测试数列尾部能否留在 epsilon 带内"
    ),
  },
  "delta-epsilon-limit-explorer": {
    sampleIO: [
      {
        input: text(
          "For f(x) = 2x + 1 near a = 3, choose epsilon = 0.5, so delta = 0.25. Test x = 3.12.",
          "對 f(x) = 2x + 1 且 a = 3，選 epsilon = 0.5，因此 delta = 0.25。再測試 x = 3.12。",
          "对 f(x) = 2x + 1 且 a = 3，选 epsilon = 0.5，因此 delta = 0.25。再测试 x = 3.12。"
        ),
        output: text(
          "Because 0 < |3.12 - 3| = 0.12 < 0.25 and |f(3.12) - 7| = 0.24 < 0.5, this sample x obeys the delta-epsilon implication.",
          "因為 0 < |3.12 - 3| = 0.12 < 0.25，且 |f(3.12) - 7| = 0.24 < 0.5，所以這個樣本 x 確實符合 delta-epsilon 的蘊含式。",
          "因为 0 < |3.12 - 3| = 0.12 < 0.25，且 |f(3.12) - 7| = 0.24 < 0.5，所以这个样本 x 确实符合 delta-epsilon 的蕴含式。"
        ),
      },
      {
        input: text(
          "For (x^2 - 4)/(x - 2) near a = 2, choose epsilon = 0.25, so delta = 0.25. Test x = 1.9.",
          "對 (x^2 - 4)/(x - 2) 且 a = 2，選 epsilon = 0.25，因此 delta = 0.25。再測試 x = 1.9。",
          "对 (x^2 - 4)/(x - 2) 且 a = 2，选 epsilon = 0.25，因此 delta = 0.25。再测试 x = 1.9。"
        ),
        output: text(
          "Here 0 < |1.9 - 2| = 0.1 < 0.25 and |f(1.9) - 4| = 0.1 < 0.25, so even with a hole at x = 2 the nearby values still fit the target limit 4.",
          "此時 0 < |1.9 - 2| = 0.1 < 0.25，且 |f(1.9) - 4| = 0.1 < 0.25，所以即使 x = 2 有空點，附近函數值仍符合目標極限 4。",
          "此时 0 < |1.9 - 2| = 0.1 < 0.25，且 |f(1.9) - 4| = 0.1 < 0.25，所以即使 x = 2 有空点，附近函数值仍符合目标极限 4。"
        ),
      },
    ],
    staticDiagramNote: text(
      "Export as two aligned interval strips: the first marks the allowed x-neighbourhood around a, and the second marks the epsilon-band around L together with one tested sample point.",
      "匯出時可保留兩條對齊的靜態區間帶：第一條標出 a 周圍允許的 x 鄰域，第二條標出 L 周圍的 epsilon 帶，並附上一個被測試的樣本點。",
      "导出时可保留两条对齐的静态区间带：第一条标出 a 周围允许的 x 邻域，第二条标出 L 周围的 epsilon 带，并附上一个被测试的样本点。"
    ),
    summary: text(
      "The explorer links the x-side delta-condition and the y-side epsilon-condition so readers can see the formal implication as two coordinated geometric tests.",
      "這個工具把 x 端的 delta 條件與 y 端的 epsilon 條件連在一起，讓讀者把正式定義看成兩個互相配合的幾何檢查。",
      "这个工具把 x 端的 delta 条件与 y 端的 epsilon 条件连在一起，让读者把正式定义看成两个互相配合的几何检查。"
    ),
    steps: [
      text("Choose a function example and an epsilon value.", "先選一個函數例子與一個 epsilon 值。", "先选一个函数例子与一个 epsilon 值。"),
      text("Read off the matching delta suggested by the example.", "讀出例子對應的 delta。", "读出例子对应的 delta。"),
      text("Test one sample x on the x-strip and then on the f(x)-strip to see the implication work in both places.", "把同一個樣本 x 先放到 x 軸區間帶，再放到 f(x) 區間帶，觀察蘊含式如何在兩邊同時成立。", "把同一个样本 x 先放到 x 轴区间带，再放到 f(x) 区间带，观察蕴含式如何在两边同时成立。"),
    ],
    title: text(
      "Check one delta-epsilon implication geometrically",
      "用幾何方式檢查一次 delta-epsilon 蘊含",
      "用几何方式检查一次 delta-epsilon 蕴含"
    ),
  },
  "cardinality-comparison-lab": {
    sampleStates: [
      {
        label: text("Bijection", "雙射", "双射"),
        value: text(
          "A map a -> 1, b -> 2, c -> 3 proves that two three-element sets have the same cardinality.",
          "映射 a -> 1、b -> 2、c -> 3 證明兩個三元素集合有相同基數。",
          "映射 a -> 1、b -> 2、c -> 3 证明两个三元素集合有相同基数。"
        ),
      },
      {
        label: text("Diagonal enumeration", "對角枚舉", "对角枚举"),
        value: text(
          "Scanning positive rationals by p+q reaches every rational entry in the grid.",
          "按 p+q 掃描正有理數格點會到達每個有理數位置。",
          "按 p+q 扫描正有理数格点会到达每个有理数位置。"
        ),
      },
    ],
    staticDiagramNote: text(
      "Export as a small map table: one finite bijection, one proper injection, one integer enumeration, and one rational diagonal scan.",
      "匯出時保留小型映射表：一個有限雙射、一個真正單射、一個整數枚舉，以及一個有理數對角掃描。",
      "导出时保留小型映射表：一个有限双射、一个真正单射、一个整数枚举，以及一个有理数对角扫描。"
    ),
    summary: text(
      "The lab compares equality of cardinality, injection-only comparison, and countable enumeration using concrete maps.",
      "這個工具用具體映射比較基數相等、只由單射得到的大小比較，以及可數枚舉。",
      "这个工具用具体映射比较基数相等、只由单射得到的大小比较，以及可数枚举。"
    ),
    steps: [
      text("Choose a comparison example.", "先選一個大小比較例子。", "先选一个大小比较例子。"),
      text("Read whether the displayed map is a bijection, injection, or enumeration.", "判斷顯示的映射是雙射、單射還是枚舉。", "判断显示的映射是双射、单射还是枚举。"),
      text("Connect the map property to the cardinality statement.", "把映射性質連到相應的基數陳述。", "把映射性质连到相应的基数陈述。"),
    ],
    title: text(
      "Compare set sizes by maps",
      "用映射比較集合大小",
      "用映射比较集合大小"
    ),
  },
  "cantor-diagonal-lab": {
    sampleStates: [
      {
        label: text("Diagonal set", "對角集合", "对角集合"),
        value: text(
          "T is defined by reversing membership on the diagonal: n belongs to T exactly when n is not in f(n).",
          "T 透過反轉對角線上的隸屬關係定義：n 屬於 T 當且僅當 n 不屬於 f(n)。",
          "T 通过反转对角线上的隶属关系定义：n 属于 T 当且仅当 n 不属于 f(n)。"
        ),
      },
      {
        label: text("Contradiction", "矛盾", "矛盾"),
        value: text(
          "If f(y) were T, then y in T would be equivalent to y notin T.",
          "若 f(y) 是 T，則 y 屬於 T 會等價於 y 不屬於 T。",
          "若 f(y) 是 T，则 y 属于 T 会等价于 y 不属于 T。"
        ),
      },
    ],
    staticDiagramNote: text(
      "Export as a finite diagonal table plus the formal rule T = {n in N : n notin f(n)}.",
      "匯出時保留有限對角表，並列出正式規則 T = {n in N : n notin f(n)}。",
      "导出时保留有限对角表，并列出正式规则 T = {n in N : n notin f(n)}。"
    ),
    summary: text(
      "The lab turns Cantor's diagonal argument into a table that shows why no list can contain every subset.",
      "這個工具把 Cantor 對角論證變成表格，顯示為甚麼任何列表都不能包含所有子集。",
      "这个工具把 Cantor 对角论证变成表格，显示为什么任何列表都不能包含所有子集。"
    ),
    steps: [
      text("Read each listed subset f(n).", "先讀取每個列出的子集 f(n)。", "先读取每个列出的子集 f(n)。"),
      text("Reverse the diagonal membership decision to build T.", "反轉對角線上的隸屬判斷來建立 T。", "反转对角线上的隶属判断来建立 T。"),
      text("Observe that T differs from f(n) at least at n.", "觀察 T 至少在 n 這個位置不同於 f(n)。", "观察 T 至少在 n 这个位置不同于 f(n)。"),
    ],
    title: text(
      "Build Cantor's diagonal set",
      "建立 Cantor 的對角集合",
      "建立 Cantor 的对角集合"
    ),
  },
  "cantor-set-stage-viewer": {
    sampleStates: [
      {
        label: text("Stage 1", "第 1 階段", "第 1 阶段"),
        value: text(
          "Remove the open middle third (1/3, 2/3), leaving two closed intervals.",
          "移除開中三分之一 (1/3, 2/3)，留下兩個閉區間。",
          "移除开中三分之一 (1/3, 2/3)，留下两个闭区间。"
        ),
      },
      {
        label: text("Ternary rule", "三進制規則", "三进制规则"),
        value: text(
          "The surviving points are exactly those with a ternary expansion using only 0 and 2.",
          "留下來的點正是可用只含 0 與 2 的三進制展開表示的點。",
          "留下来的点正是可用只含 0 与 2 的三进制展开表示的点。"
        ),
      },
    ],
    staticDiagramNote: text(
      "Export as the first four Cantor-set stages, the removed-length geometric series, and the ternary digit rule.",
      "匯出時保留 Cantor set 前四個階段、被移除長度的幾何級數，以及三進制數字規則。",
      "导出时保留 Cantor set 前四个阶段、被移除长度的几何级数，以及三进制数字规则。"
    ),
    summary: text(
      "The viewer shows how repeated middle-third removal creates a set that is small by length but large by cardinality.",
      "這個工具顯示反覆移除中三分之一如何產生一個長度很小、但基數很大的集合。",
      "这个工具显示反复移除中三分之一如何产生一个长度很小、但基数很大的集合。"
    ),
    steps: [
      text("Move through stages C0, C1, C2, and C3.", "依次查看 C0、C1、C2、C3。", "依次查看 C0、C1、C2、C3。"),
      text("Count the remaining intervals and compare the removed length.", "數剩餘區間，並比較已移除長度。", "数剩余区间，并比较已移除长度。"),
      text("Connect the geometric construction to ternary expansions.", "把幾何構造連到三進制展開。", "把几何构造连到三进制展开。"),
    ],
    title: text(
      "Step through the Cantor set construction",
      "逐步查看 Cantor set 構造",
      "逐步查看 Cantor set 构造"
    ),
  },
  "monoid-group-law-checker": {
    sampleStates: [
      {
        label: text("Monoid but not group", "是 monoid 但不是群", "是 monoid 但不是群"),
        value: text(
          "(N,+) has associativity and identity 0, but 1 has no natural-number additive inverse.",
          "(N,+) 有結合律與單位元 0，但 1 沒有自然數加法逆元。",
          "(N,+) 有结合律与单位元 0，但 1 没有自然数加法逆元。"
        ),
      },
      {
        label: text("Group", "群", "群"),
        value: text(
          "(Z,+) is a group because every integer a has inverse -a.",
          "(Z,+) 是群，因為每個整數 a 都有逆元 -a。",
          "(Z,+) 是群，因为每个整数 a 都有逆元 -a。"
        ),
      },
    ],
    staticDiagramNote: text(
      "Export as a law-check table listing associativity, identity, and inverse status for (Z,+), (N,+), (Z,-), and Boolean addition.",
      "匯出時保留 law-check 表格，列出 (Z,+)、(N,+)、(Z,-) 與 Boolean 加法的結合律、單位元與逆元狀態。",
      "导出时保留 law-check 表格，列出 (Z,+)、(N,+)、(Z,-) 与 Boolean 加法的结合律、单位元与逆元状态。"
    ),
    summary: text(
      "The checker compares binary operations by the exact laws needed for monoids and groups.",
      "這個檢查器按 monoid 與 group 所需的精確公理比較二元運算。",
      "这个检查器按 monoid 与 group 所需的精确公理比较二元运算。"
    ),
    steps: [
      text("Choose one set with one binary operation.", "先選一個帶二元運算的集合。", "先选一个带二元运算的集合。"),
      text("Check associativity and identity before asking about inverses.", "先檢查結合律與單位元，再問逆元。", "先检查结合律与单位元，再问逆元。"),
      text("Classify the structure as not a monoid, a monoid, or a group.", "把結構分類為不是 monoid、monoid 或 group。", "把结构分类为不是 monoid、monoid 或 group。"),
    ],
    title: text(
      "Check monoid and group laws",
      "檢查 monoid 與 group 公理",
      "检查 monoid 与 group 公理"
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
