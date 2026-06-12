import { getLocalizedText } from "./i18n";
import type { Locale, LocalizedText, VideoExplanationSnapshot } from "./types";

type LocalizedAsset = string | LocalizedText;

type VideoExplanationEntry = {
  conclusion: LocalizedText;
  durationSeconds?: number;
  frames: Array<{
    label: LocalizedText;
    value: LocalizedText;
  }>;
  posterSrc?: LocalizedAsset;
  summary: LocalizedText;
  title: LocalizedText;
  transcript?: LocalizedText[];
  videoSrc?: LocalizedAsset;
};

function text(en: string, zhHk: string, zhCn: string): LocalizedText {
  return {
    en,
    "zh-cn": zhCn,
    "zh-hk": zhHk,
  };
}

function resolveLocalizedAsset(asset: LocalizedAsset | undefined, locale: Locale) {
  if (!asset) {
    return undefined;
  }

  return typeof asset === "string" ? asset : getLocalizedText(asset, locale);
}

const videoExplanationCatalog: Record<string, VideoExplanationEntry> = {
  "math1030-augmented-matrix-row-operation-safety": {
    conclusion: text(
      "Use the augmented matrix because elementary row operations are reversible equation rewrites. The constants column is part of the same rows, so it must change together with the coefficient block.",
      "使用增廣矩陣的理由，是基本行變換都是可逆的方程改寫。常數列屬於同一批行，因此必須跟係數區塊一起改變。",
      "使用增广矩阵的理由，是基本行变换都是可逆的方程改写。常数列属于同一批行，因此必须跟系数区块一起改变。"
    ),
    durationSeconds: 15,
    frames: [
      {
        label: text("Package the system", "包裝方程組", "包装方程组"),
        value: text(
          "The coefficient block and the constants column are stored in one augmented matrix so the data remains aligned.",
          "係數區塊和常數列被放入同一個增廣矩陣，令資料保持對齊。",
          "系数区块和常数列被放入同一个增广矩阵，让数据保持对齐。"
        ),
      },
      {
        label: text("Read the bar correctly", "正確閱讀直線", "正确阅读直线"),
        value: text(
          "The vertical bar is bookkeeping, not a barrier. A row operation acts on the entire row, including the constants column.",
          "直線只是記號提示，不是一道牆。行變換作用在整行上，包括常數列。",
          "直线只是记号提示，不是一道墙。行变换作用在整行上，包括常数列。"
        ),
      },
      {
        label: text("Use only reversible operations", "只用可逆操作", "只用可逆操作"),
        value: text(
          "Swapping rows, scaling by a nonzero number, and adding a multiple of one row to another can each be undone.",
          "交換兩行、用非零數乘一行、把一行倍數加到另一行，這三種操作都可以逆轉。",
          "交换两行、用非零数乘一行、把一行倍数加到另一行，这三种操作都可以逆转。"
        ),
      },
      {
        label: text("Rewrite equations, not variables", "改寫方程，不改變變量", "改写方程，不改变变量"),
        value: text(
          "A row replacement such as R2 <- R2 - R1 replaces one equation by an equivalent combination of equations.",
          "例如 R2 <- R2 - R1 的行替換，是把一條方程改寫成等價的方程組合。",
          "例如 R2 <- R2 - R1 的行替换，是把一条方程改写成等价的方程组合。"
        ),
      },
      {
        label: text("Move the constants too", "常數列也要一起變", "常数列也要一起变"),
        value: text(
          "If the coefficients change but the constants are frozen, the matrix no longer represents the same system.",
          "如果係數改了但常數列不動，矩陣就不再代表同一個方程組。",
          "如果系数改了但常数列不动，矩阵就不再代表同一个方程组。"
        ),
      },
      {
        label: text("Track the invariant", "追蹤不變量", "追踪不变量"),
        value: text(
          "The visible matrix changes, but the solution set is preserved by every legal elementary row operation.",
          "眼前矩陣會改變，但每個合法基本行變換都會保留解集。",
          "眼前矩阵会改变，但每个合法基本行变换都会保留解集。"
        ),
      },
    ],
    summary: text(
      "See why `[A|b]` is a safe working form: elementary row operations rewrite equations while preserving the solution set.",
      "看清為甚麼 `[A|b]` 是安全的工作形式：基本行變換是在改寫方程，同時保留解集。",
      "看清为什么 `[A|b]` 是安全的工作形式：基本行变换是在改写方程，同时保留解集。"
    ),
    posterSrc: text(
      "/generated/animations/math1030/augmented-matrix-row-operation-safety-en.png",
      "/generated/animations/math1030/augmented-matrix-row-operation-safety-zh-hk.png",
      "/generated/animations/math1030/augmented-matrix-row-operation-safety-zh-cn.png"
    ),
    title: text(
      "Why row operations are safe",
      "為甚麼行變換是安全的",
      "为什么行变换是安全的"
    ),
    transcript: [
      text(
        "The augmented matrix keeps the coefficients and constants aligned.",
        "增廣矩陣令係數和常數保持對齊。",
        "增广矩阵让系数和常数保持对齐。"
      ),
      text(
        "Legal row operations are reversible equation operations.",
        "合法行變換都是可逆的方程操作。",
        "合法行变换都是可逆的方程操作。"
      ),
      text(
        "The invariant is the solution set, not the displayed numbers.",
        "不變量是解集，不是眼前顯示的數字。",
        "不变量是解集，不是眼前显示的数字。"
      ),
    ],
    videoSrc: text(
      "/generated/animations/math1030/augmented-matrix-row-operation-safety-en.mp4",
      "/generated/animations/math1030/augmented-matrix-row-operation-safety-zh-hk.mp4",
      "/generated/animations/math1030/augmented-matrix-row-operation-safety-zh-cn.mp4"
    ),
  },
  "math1030-matrix-basics-position-map": {
    conclusion: text(
      "Before doing row reduction or multiplication, read the matrix as a positioned object: first its size, then the row and column of each entry, then whether another matrix has the same positioned data.",
      "在做行化簡或矩陣乘法之前，先把矩陣讀成有位置的對象：先看大小，再看每個元素的行列位置，最後才判斷另一個矩陣是否有同樣位置資料。",
      "在做行化简或矩阵乘法之前，先把矩阵读成有位置的对象：先看大小，再看每个元素的行列位置，最后才判断另一个矩阵是否有同样位置数据。"
    ),
    durationSeconds: 15,
    frames: [
      {
        label: text("Read the size first", "先讀大小", "先读大小"),
        value: text(
          "A 2 x 3 matrix has two rows and three columns. That size determines which comparisons and operations are even defined.",
          "一個 2 x 3 矩陣有兩行三列。這個大小會先決定哪些比較和運算有定義。",
          "一个 2 x 3 矩阵有两行三列。这个大小会先决定哪些比较和运算有定义。"
        ),
      },
      {
        label: text("Locate entries by row and column", "用行和列定位元素", "用行和列定位元素"),
        value: text(
          "The notation a_23 means row 2, column 3. In the sample matrix, that position contains the entry 4.",
          "記號 a_23 表示第 2 行第 3 列。在例子矩陣中，這個位置的元素是 4。",
          "记号 a_23 表示第 2 行第 3 列。在例子矩阵中，这个位置的元素是 4。"
        ),
      },
      {
        label: text("Check equality entry by entry", "逐項檢查矩陣相等", "逐项检查矩阵相等"),
        value: text(
          "Two matrices are equal only when they have the same size and every corresponding entry matches.",
          "兩個矩陣要相等，必須大小相同，而且每個對應位置的元素都相同。",
          "两个矩阵要相等，必须大小相同，而且每个对应位置的元素都相同。"
        ),
      },
      {
        label: text("One mismatch is enough", "一個位置不同已足夠", "一个位置不同已足够"),
        value: text(
          "Changing only one entry changes the whole matrix, because the matrix remembers both values and positions.",
          "只改一個元素，整個矩陣已經改變，因為矩陣同時記錄數值和位置。",
          "只改一个元素，整个矩阵已经改变，因为矩阵同时记录数值和位置。"
        ),
      },
      {
        label: text("Keep the variable order", "保留變量次序", "保留变量次序"),
        value: text(
          "In a coefficient matrix, column 2 has meaning only after the variable order has been fixed.",
          "在係數矩陣中，第 2 列的意思要等變量次序固定後才清楚。",
          "在系数矩阵中，第 2 列的意思要等变量次序固定后才清楚。"
        ),
      },
    ],
    summary: text(
      "Watch the basic row-column map behind matrix size, entry notation, equality, and coefficient columns.",
      "用一段短圖解看清矩陣大小、元素記號、矩陣相等和係數列背後的行列位置。",
      "用一段短图解看清矩阵大小、元素记号、矩阵相等和系数列背后的行列位置。"
    ),
    posterSrc: text(
      "/generated/animations/math1030/matrix-basics-position-map-en.png",
      "/generated/animations/math1030/matrix-basics-position-map-zh-hk.png",
      "/generated/animations/math1030/matrix-basics-position-map-zh-cn.png"
    ),
    title: text(
      "Read a matrix by position",
      "按位置閱讀矩陣",
      "按位置阅读矩阵"
    ),
    transcript: [
      text(
        "Start by reading the size of the matrix before doing any arithmetic.",
        "先讀矩陣大小，然後才做任何計算。",
        "先读矩阵大小，然后才做任何计算。"
      ),
      text(
        "Use row and column numbers to locate each entry without ambiguity.",
        "用行號和列號準確定位每個元素。",
        "用行号和列号准确定位每个元素。"
      ),
      text(
        "Matrix equality requires both the same shape and the same positioned entries.",
        "矩陣相等同時要求形狀相同和對應位置元素相同。",
        "矩阵相等同时要求形状相同和对应位置元素相同。"
      ),
    ],
    videoSrc: text(
      "/generated/animations/math1030/matrix-basics-position-map-en.mp4",
      "/generated/animations/math1030/matrix-basics-position-map-zh-hk.mp4",
      "/generated/animations/math1030/matrix-basics-position-map-zh-cn.mp4"
    ),
  },
  "math1030-gaussian-elimination-rref-pivot-story": {
    conclusion: text(
      "The calculation is not a collection of disconnected row operations. It is a controlled change of form: first create REF by clearing below pivots, then create RREF by normalizing pivots and clearing above them.",
      "這個計算唔係一堆互不相干的行變換，而係有控制地改變形狀：先清主元下方得到 REF，再標準化主元並清主元上方得到 RREF。",
      "这个计算不是一堆互不相干的行变换，而是有控制地改变形状：先清主元下方得到 REF，再标准化主元并清主元上方得到 RREF。"
    ),
    durationSeconds: 16,
    frames: [
      {
        label: text("Start from the augmented matrix", "由增廣矩陣開始", "由增广矩阵开始"),
        value: text(
          "The first column already has a convenient pivot in row 1. The immediate goal is to make every entry below that pivot equal to 0.",
          "第一列在第 1 行已有方便的主元。眼前目標是把這個主元下方的元素全部變成 0。",
          "第一列在第 1 行已有方便的主元。眼前目标是把这个主元下方的元素全部变成 0。"
        ),
      },
      {
        label: text("Build the pivot staircase", "建立主元階梯", "建立主元阶梯"),
        value: text(
          "After the first clearing step, the next pivot appears in row 2, column 2. Clearing beneath it produces a row echelon form.",
          "第一次清下方元素之後，下一個主元出現在第 2 行第 2 列。再清它下方的元素，就得到列階梯形。",
          "第一次清下方元素之后，下一个主元出现在第 2 行第 2 列。再清它下方的元素，就得到行阶梯形。"
        ),
      },
      {
        label: text("Normalize the last pivot", "標準化最後主元", "标准化最后主元"),
        value: text(
          "The last nonzero row has leading entry -1. Multiplying the row by -1 turns the pivot into 1 without changing the solution set.",
          "最後一個非零行的 leading entry 是 -1。把整行乘以 -1，主元變成 1，但解集不變。",
          "最后一个非零行的 leading entry 是 -1。把整行乘以 -1，主元变成 1，但解集不变。"
        ),
      },
      {
        label: text("Clear above pivots", "清主元上方", "清主元上方"),
        value: text(
          "RREF is obtained only after each pivot is the sole nonzero entry in its column, so the operations move upward as well as downward.",
          "只有當每個主元都是所在列唯一的非零元素時，才到達 RREF；因此後半段運算會向上清除。",
          "只有当每个主元都是所在列唯一的非零元素时，才到达 RREF；因此后半段运算会向上清除。"
        ),
      },
      {
        label: text("Read the solved variables", "讀出已解變數", "读出已解变量"),
        value: text(
          "Once the left block is the identity, the right column can be read directly as x = 2, y = -3, and z = 4.",
          "當左邊變成單位矩陣，右邊一列就可以直接讀成 x = 2、y = -3、z = 4。",
          "当左边变成单位矩阵，右边一列就可以直接读成 x = 2、y = -3、z = 4。"
        ),
      },
    ],
    summary: text(
      "Follow the same elimination example as a short visual sequence: pivots are selected, entries are cleared, and the final RREF is read as a solved system.",
      "把同一個消元例子看成一段短圖解：選主元、清元素，最後從 RREF 讀出已解方程組。",
      "把同一个消元例子看成一段短图解：选主元、清元素，最后从 RREF 读出已解方程组。"
    ),
    posterSrc: text(
      "/generated/animations/math1030/gaussian-elimination-rref-pivot-story-en.png",
      "/generated/animations/math1030/gaussian-elimination-rref-pivot-story-zh-hk.png",
      "/generated/animations/math1030/gaussian-elimination-rref-pivot-story-zh-cn.png"
    ),
    title: text(
      "Pivot staircase to RREF",
      "由主元階梯到 RREF",
      "由主元阶梯到 RREF"
    ),
    transcript: [
      text(
        "Begin by treating the first nonzero entry as the first pivot.",
        "先把第一個非零元素視為第一個主元。",
        "先把第一个非零元素视为第一个主元。"
      ),
      text(
        "Clear below the pivot before moving to the next smaller submatrix.",
        "先清主元下方，再移入下一個較小子矩陣。",
        "先清主元下方，再移入下一个较小子矩阵。"
      ),
      text(
        "After REF is reached, normalize and clear above to reach RREF.",
        "到達 REF 後，再標準化並清上方以得到 RREF。",
        "到达 REF 后，再标准化并清上方以得到 RREF。"
      ),
    ],
    videoSrc: text(
      "/generated/animations/math1030/gaussian-elimination-rref-pivot-story-en.mp4",
      "/generated/animations/math1030/gaussian-elimination-rref-pivot-story-zh-hk.mp4",
      "/generated/animations/math1030/gaussian-elimination-rref-pivot-story-zh-cn.mp4"
    ),
  },
  "math1030-matrix-product-linear-system-story": {
    conclusion: text(
      "The row-by-column rule is why one compact equation, `Ax = b`, can store an entire linear system. Each row of `A` supplies one equation; a full product `AB` repeats the same idea once for every column of `B`.",
      "行乘列規則解釋了為何一條緊湊的 `Ax = b` 可以保存整個線性方程組。`A` 的每一行提供一條方程；完整乘積 `AB` 則對 `B` 的每一列重複同一想法。",
      "行乘列规则解释了为什么一条紧凑的 `Ax = b` 可以保存整个线性方程组。`A` 的每一行提供一条方程；完整乘积 `AB` 则对 `B` 的每一列重复同一想法。"
    ),
    durationSeconds: 16,
    frames: [
      {
        label: text("Match the sizes", "先檢查大小", "先检查大小"),
        value: text(
          "A 2 x 3 matrix can multiply a 3 x 1 vector because each row of A has exactly three entries to pair with x.",
          "2 x 3 矩陣可以乘 3 x 1 向量，因為 A 的每一行剛好有三個元素與 x 配對。",
          "2 x 3 矩阵可以乘 3 x 1 向量，因为 A 的每一行刚好有三个元素与 x 配对。"
        ),
      },
      {
        label: text("Read row 1", "讀第 1 行", "读第 1 行"),
        value: text(
          "The first output entry is the first row of A paired with x: a11*x1 + a12*x2 + a13*x3.",
          "第一個輸出元素是 A 的第 1 行與 x 配對：a11*x1 + a12*x2 + a13*x3。",
          "第一个输出元素是 A 的第 1 行与 x 配对：a11*x1 + a12*x2 + a13*x3。"
        ),
      },
      {
        label: text("Set it equal to b1", "設成 b1", "设成 b1"),
        value: text(
          "When Ax = b, that first output entry becomes the first equation of the system.",
          "當 Ax = b，這個第一輸出元素就成為方程組的第一條方程。",
          "当 Ax = b，这个第一输出元素就成为方程组的第一条方程。"
        ),
      },
      {
        label: text("Read row 2", "讀第 2 行", "读第 2 行"),
        value: text(
          "The second row gives the second equation: a21*x1 + a22*x2 + a23*x3 = b2.",
          "第 2 行給出第二條方程：a21*x1 + a22*x2 + a23*x3 = b2。",
          "第 2 行给出第二条方程：a21*x1 + a22*x2 + a23*x3 = b2。"
        ),
      },
      {
        label: text("Stack the equations", "疊成方程組", "叠成方程组"),
        value: text(
          "`Ax = b` is the vertical stack of all row equations, written as one matrix equation.",
          "`Ax = b` 就是把所有按行讀出的方程上下疊起，再用一條矩陣方程寫出。",
          "`Ax = b` 就是把所有按行读出的方程上下叠起，再用一条矩阵方程写出。"
        ),
      },
      {
        label: text("Extend to AB", "推廣到 AB", "推广到 AB"),
        value: text(
          "If B = [u v], then AB = [Au Av]. A general product is several Ax-style products side by side.",
          "若 B = [u v]，則 AB = [Au Av]。一般矩陣乘積就是多個 Ax 式乘積並排。",
          "若 B = [u v]，则 AB = [Au Av]。一般矩阵乘积就是多个 Ax 式乘积并排。"
        ),
      },
    ],
    summary: text(
      "Watch how row-by-column multiplication turns `Ax = b` into a complete system, one row equation at a time.",
      "觀看行乘列乘法如何把 `Ax = b` 變成完整方程組：每一行讀出一條方程。",
      "观看行乘列乘法如何把 `Ax = b` 变成完整方程组：每一行读出一条方程。"
    ),
    posterSrc: text(
      "/generated/animations/math1030/matrix-product-linear-system-story-en.png",
      "/generated/animations/math1030/matrix-product-linear-system-story-zh-hk.png",
      "/generated/animations/math1030/matrix-product-linear-system-story-zh-cn.png"
    ),
    title: text(
      "Matrix products as equations",
      "把矩陣乘積讀成方程",
      "把矩阵乘积读成方程"
    ),
    transcript: [
      text(
        "Start with the size match: a 2 x 3 matrix can pair each row with a 3 x 1 vector.",
        "先看大小吻合：2 x 3 矩陣可以把每一行與 3 x 1 向量配對。",
        "先看大小匹配：2 x 3 矩阵可以把每一行与 3 x 1 向量配对。"
      ),
      text(
        "Each row of A produces one output entry, and in Ax = b that entry becomes one equation.",
        "A 的每一行都產生一個輸出元素；在 Ax = b 中，這個元素就成為一條方程。",
        "A 的每一行都产生一个输出元素；在 Ax = b 中，这个元素就成为一条方程。"
      ),
      text(
        "A full product AB repeats this column by column: AB is A times each column of B side by side.",
        "完整乘積 AB 則逐列重複這件事：AB 是 A 乘 B 每一列後並排。",
        "完整乘积 AB 则逐列重复这件事：AB 是 A 乘 B 每一列后并排。"
      ),
    ],
    videoSrc: text(
      "/generated/animations/math1030/matrix-product-linear-system-story-en.mp4",
      "/generated/animations/math1030/matrix-product-linear-system-story-zh-hk.mp4",
      "/generated/animations/math1030/matrix-product-linear-system-story-zh-cn.mp4"
    ),
  },
  "math1030-row-operation-matrix-left-multiply-story": {
    conclusion: text(
      "A row-operation matrix is built by doing the row operation to the identity matrix. Multiplying by that matrix on the left then performs the same row operation on any compatible matrix, and the reverse row operation gives the inverse matrix.",
      "行變換矩陣是把行變換先作用在單位矩陣上得到的。之後用它左乘任何相容矩陣，就會執行同一個行變換；反向行變換則給出逆矩陣。",
      "行变换矩阵是把行变换先作用在单位矩阵上得到的。之后用它左乘任何相容矩阵，就会执行同一个行变换；反向行变换则给出逆矩阵。"
    ),
    durationSeconds: 16,
    frames: [
      {
        label: text("Start from I", "由 I 開始", "由 I 开始"),
        value: text(
          "For ρ: R₂ ← R₂ + 3R₁, first apply the operation to I₃.",
          "對 ρ: R₂ ← R₂ + 3R₁，先把操作作用在 I₃ 上。",
          "对 ρ: R₂ ← R₂ + 3R₁，先把操作作用在 I₃ 上。"
        ),
      },
      {
        label: text("Build Eρ", "建立 Eρ", "建立 Eρ"),
        value: text(
          "Only row 2 of I₃ changes, giving Eρ with row 2 equal to [3,1,0].",
          "只有 I₃ 的第 2 行改變，得到第 2 行為 [3,1,0] 的 Eρ。",
          "只有 I₃ 的第 2 行改变，得到第 2 行为 [3,1,0] 的 Eρ。"
        ),
      },
      {
        label: text("Multiply on the left", "放在左邊相乘", "放在左边相乘"),
        value: text(
          "The same matrix performs the operation on A: ρ(A)=Eρ A.",
          "同一個矩陣會對 A 執行該操作：ρ(A)=Eρ A。",
          "同一个矩阵会对 A 执行该操作：ρ(A)=Eρ A。"
        ),
      },
      {
        label: text("Read the new row", "讀新行", "读新行"),
        value: text(
          "The new second row is old row 2 plus three copies of old row 1.",
          "新的第 2 行等於舊第 2 行加三份舊第 1 行。",
          "新的第 2 行等于旧第 2 行加三份旧第 1 行。"
        ),
      },
      {
        label: text("Keep product order", "保留乘積次序", "保留乘积顺序"),
        value: text(
          "In A₃=E₂E₁A₁, E₁ sits closest to A₁ because ρ₁ acts first.",
          "在 A₃=E₂E₁A₁ 中，E₁ 最靠近 A₁，因為 ρ₁ 最先作用。",
          "在 A₃=E₂E₁A₁ 中，E₁ 最靠近 A₁，因为 ρ₁ 最先作用。"
        ),
      },
      {
        label: text("Reverse gives inverse", "反向得到逆矩陣", "反向得到逆矩阵"),
        value: text(
          "The inverse of R₂ ← R₂ + 3R₁ is R₂ ← R₂ − 3R₁, so the corresponding matrices multiply to I.",
          "R₂ ← R₂ + 3R₁ 的反向操作是 R₂ ← R₂ − 3R₁，所以相應矩陣相乘得到 I。",
          "R₂ ← R₂ + 3R₁ 的反向操作是 R₂ ← R₂ − 3R₁，所以相应矩阵相乘得到 I。"
        ),
      },
    ],
    summary: text(
      "See how an elementary row operation becomes a left multiplier: apply it to the identity, then use the resulting matrix to change rows of any compatible matrix.",
      "看清初等行變換如何變成左乘矩陣：先把操作作用在單位矩陣上，再用所得矩陣改變任何相容矩陣的行。",
      "看清初等行变换如何变成左乘矩阵：先把操作作用在单位矩阵上，再用所得矩阵改变任何相容矩阵的行。"
    ),
    posterSrc: text(
      "/generated/animations/math1030/row-operation-matrix-left-multiply-story-en.png",
      "/generated/animations/math1030/row-operation-matrix-left-multiply-story-zh-hk.png",
      "/generated/animations/math1030/row-operation-matrix-left-multiply-story-zh-cn.png"
    ),
    title: text(
      "Row operations as left multiplication",
      "把行變換讀成左乘",
      "把行变换读成左乘"
    ),
    transcript: [
      text(
        "Start by applying the row operation to the identity matrix.",
        "先把行變換作用在單位矩陣上。",
        "先把行变换作用在单位矩阵上。"
      ),
      text(
        "The resulting elementary matrix performs the same row operation by left multiplication.",
        "所得初等矩陣會透過左乘執行同一個行變換。",
        "所得初等矩阵会通过左乘执行同一个行变换。"
      ),
      text(
        "Sequences become products, and reverse operations give inverse matrices.",
        "一串操作會變成矩陣乘積，而反向操作會給出逆矩陣。",
        "一串操作会变成矩阵乘积，而反向操作会给出逆矩阵。"
      ),
    ],
    videoSrc: text(
      "/generated/animations/math1030/row-operation-matrix-left-multiply-story-en.mp4",
      "/generated/animations/math1030/row-operation-matrix-left-multiply-story-zh-hk.mp4",
      "/generated/animations/math1030/row-operation-matrix-left-multiply-story-zh-cn.mp4"
    ),
  },
  "math1030-linear-combination-span-sweep-story": {
    conclusion: text(
      "A span is the full output set of a linear-combination recipe. One nonzero generator gives a line; two nonparallel generators in R^2 can fill the plane; membership asks whether the needed coefficients exist.",
      "張成是一條線性組合配方的完整輸出集合。一個非零生成向量給出直線；R^2 裡兩個非平行生成向量可以填滿平面；判斷屬於張成就是問需要的係數是否存在。",
      "张成是一条线性组合配方的完整输出集合。一个非零生成向量给出直线；R^2 里两个非平行生成向量可以填满平面；判断属于张成就是问需要的系数是否存在。"
    ),
    durationSeconds: 16,
    frames: [
      {
        label: text("Build one output", "造出一個輸出", "造出一个输出"),
        value: text(
          "Choosing coefficients such as α=2 and β=-1 turns αu+βv into one concrete output vector.",
          "選擇 α=2 和 β=-1 這類係數，會把 αu+βv 變成一個具體輸出向量。",
          "选择 α=2 和 β=-1 这类系数，会把 αu+βv 变成一个具体输出向量。"
        ),
      },
      {
        label: text("One generator gives a line", "一個生成向量給出直線", "一个生成向量给出直线"),
        value: text(
          "All multiples tu stay on the same line through the origin, so Span{u} is one-dimensional.",
          "所有倍數 tu 都留在通過原點的同一直線上，所以 Span{u} 是一維的。",
          "所有倍数 tu 都留在通过原点的同一直线上，所以 Span{u} 是一维的。"
        ),
      },
      {
        label: text("Two directions give a plane", "兩個方向給出平面", "两个方向给出平面"),
        value: text(
          "If u and v are not parallel in R^2, α and β move independently and the span reaches every point in the plane.",
          "如果 R^2 裡的 u 與 v 不平行，α 與 β 可以獨立移動，張成便可到達平面每一點。",
          "如果 R^2 里的 u 与 v 不平行，α 与 β 可以独立移动，张成便可到达平面每一点。"
        ),
      },
      {
        label: text("Membership asks for coefficients", "屬於張成就是求係數", "属于张成就是求系数"),
        value: text(
          "A target b lies in Span{u,v} exactly when the equation αu+βv=b is solvable.",
          "目標 b 屬於 Span{u,v}，正好等於方程 αu+βv=b 有解。",
          "目标 b 属于 Span{u,v}，正好等于方程 αu+βv=b 有解。"
        ),
      },
      {
        label: text("Collinear generators can miss", "共線生成向量會錯過目標", "共线生成向量会错过目标"),
        value: text(
          "Replacing v by 2u adds no new direction, so an off-line target is not in Span{u,2u}.",
          "把 v 換成 2u 並不加入新方向，所以線外目標不屬於 Span{u,2u}。",
          "把 v 换成 2u 并不加入新方向，所以线外目标不属于 Span{u,2u}。"
        ),
      },
      {
        label: text("Then use the explorer", "接着使用探索器", "接着使用探索器"),
        value: text(
          "The interactive span explorer below lets you vary α and β after the video fixes the geometric picture.",
          "下方互動張成探索器讓你在這個幾何圖像之後改變 α 與 β。",
          "下方互动张成探索器让你在这个几何图像之后改变 α 与 β。"
        ),
      },
    ],
    summary: text(
      "Watch coefficients sweep out a line, a plane, and a missed target so the definition of span reads as a set of reachable outputs.",
      "觀看係數如何掃出直線、平面與錯過的目標，從而把張成定義讀成可到達輸出所成的集合。",
      "观看系数如何扫出直线、平面与错过的目标，从而把张成定义读成可到达输出所成的集合。"
    ),
    posterSrc: text(
      "/generated/animations/math1030/linear-combination-span-sweep-story-en.png",
      "/generated/animations/math1030/linear-combination-span-sweep-story-zh-hk.png",
      "/generated/animations/math1030/linear-combination-span-sweep-story-zh-cn.png"
    ),
    title: text(
      "How coefficients sweep out a span",
      "係數如何掃出張成",
      "系数如何扫出张成"
    ),
    transcript: [
      text(
        "A linear combination starts with generators and adjustable coefficients.",
        "線性組合由生成向量與可調係數開始。",
        "线性组合由生成向量与可调系数开始。"
      ),
      text(
        "Changing one coefficient along one generator sweeps a line; changing two independent coefficients can sweep a plane.",
        "沿一個生成向量改變一個係數會掃出直線；改變兩個獨立係數可以掃出平面。",
        "沿一个生成向量改变一个系数会扫出直线；改变两个独立系数可以扫出平面。"
      ),
      text(
        "Membership in a span means the target can be reached by some choice of coefficients.",
        "屬於張成表示目標可由某組係數到達。",
        "属于张成表示目标可由某组系数到达。"
      ),
    ],
    videoSrc: text(
      "/generated/animations/math1030/linear-combination-span-sweep-story-en.mp4",
      "/generated/animations/math1030/linear-combination-span-sweep-story-zh-hk.mp4",
      "/generated/animations/math1030/linear-combination-span-sweep-story-zh-cn.mp4"
    ),
  },
  "math1030-linear-dependence-redundancy-story": {
    conclusion: text(
      "Dependence is not the same as failing to span. It says at least one listed vector is redundant because it can be rebuilt from the others.",
      "相依不等於不能張成。它表示至少一個列出的向量是冗餘的，因為它可由其他向量重建。",
      "依赖不等于不能张成。它表示至少一个列出的向量是冗余的，因为它可由其他向量重建。"
    ),
    durationSeconds: 16,
    frames: [
      {
        label: text("Start from a span plane", "由張成平面開始", "由张成平面开始"),
        value: text(
          "The first two vectors generate a plane of outputs, so the next question is whether u₃ adds a new direction.",
          "頭兩個向量生成一個輸出平面，因此下一個問題是 u₃ 是否加入新方向。",
          "头两个向量生成一个输出平面，因此下一个问题是 u₃ 是否加入新方向。"
        ),
      },
      {
        label: text("Outside means no visible redundancy", "在外表示暫無冗餘", "在外表示暂无冗余"),
        value: text(
          "When u₃ is outside Span{u₁,u₂}, it is not generated by the previous vectors.",
          "當 u₃ 在 Span{u₁,u₂} 外，它不是由前面向量生成。",
          "当 u₃ 在 Span{u₁,u₂} 外，它不是由前面向量生成。"
        ),
      },
      {
        label: text("Inside means one vector repeats information", "落入張成表示重覆資訊", "落入张成表示重复信息"),
        value: text(
          "If u₃=u₁+u₂, then the third vector does not enlarge the span.",
          "如果 u₃=u₁+u₂，第三個向量就不會擴大張成。",
          "如果 u₃=u₁+u₂，第三个向量就不会扩大张成。"
        ),
      },
      {
        label: text("Redundancy becomes a relation", "冗餘變成關係式", "冗余变成关系式"),
        value: text(
          "Moving all terms to one side gives u₁+u₂-u₃=0, a nontrivial linear relation.",
          "把所有項移到同一邊得到 u₁+u₂-u₃=0，這是非平凡線性關係。",
          "把所有项移到同一边得到 u₁+u₂-u₃=0，这是非平凡线性关系。"
        ),
      },
      {
        label: text("Row reduction finds it", "行化簡找到它", "行化简找到它"),
        value: text(
          "In Aα=0, a non-pivot column gives a free coefficient and therefore a nonzero solution.",
          "在 Aα=0 中，非 pivot 欄給出自由係數，因此產生非零解。",
          "在 Aα=0 中，非 pivot 列给出自由系数，因此产生非零解。"
        ),
      },
      {
        label: text("Then use the checker", "接着使用檢查器", "接着使用检查器"),
        value: text(
          "The existing independence checker below compares independent pairs, sum redundancy, scalar multiples, and zero-vector cases.",
          "下方既有線性獨立檢查器會比較獨立一對、和式冗餘、純量倍數與零向量情況。",
          "下方既有线性独立检查器会比较独立一对、和式冗余、数乘倍数与零向量情况。"
        ),
      },
    ],
    summary: text(
      "Watch a third vector stop adding a new direction, become a nontrivial relation, and appear as a free column in the homogeneous test.",
      "觀看第三個向量如何停止加入新方向，變成非平凡關係，並在齊次系統測試中顯示為自由欄。",
      "观看第三个向量如何停止加入新方向，变成非平凡关系，并在齐次系统测试中显示为自由列。"
    ),
    posterSrc: text(
      "/generated/animations/math1030/linear-dependence-redundancy-story-en.png",
      "/generated/animations/math1030/linear-dependence-redundancy-story-zh-hk.png",
      "/generated/animations/math1030/linear-dependence-redundancy-story-zh-cn.png"
    ),
    title: text(
      "When a vector becomes redundant",
      "向量何時變成冗餘",
      "向量何时变成冗余"
    ),
    transcript: [
      text(
        "Linear independence asks whether every vector in the list is genuinely needed.",
        "線性獨立問的是列表中每個向量是否真正必要。",
        "线性独立问的是列表中每个向量是否真正必要。"
      ),
      text(
        "When one vector is a combination of the others, moving terms to zero gives a nontrivial relation.",
        "當一個向量是其他向量的線性組合，把各項移到零向量一邊就得到非平凡關係。",
        "当一个向量是其他向量的线性组合，把各项移到零向量一边就得到非平凡关系。"
      ),
      text(
        "Row reduction detects the same redundancy through free columns in the homogeneous system.",
        "行化簡會透過齊次系統中的自由欄偵測同一種冗餘。",
        "行化简会通过齐次系统中的自由列侦测同一种冗余。"
      ),
    ],
    videoSrc: text(
      "/generated/animations/math1030/linear-dependence-redundancy-story-en.mp4",
      "/generated/animations/math1030/linear-dependence-redundancy-story-zh-hk.mp4",
      "/generated/animations/math1030/linear-dependence-redundancy-story-zh-cn.mp4"
    ),
  },
  "math1030-gram-schmidt-projection-story": {
    conclusion: text(
      "Gram-Schmidt preserves the subspace because every new vector is made from the vectors already in the same partial span. The subtraction removes old directions; normalization only changes lengths afterward.",
      "Gram-Schmidt 會保留子空間，因為每個新向量都是由同一個部分張成空間內的向量組成。扣除步驟移走舊方向；正規化只是在之後改變長度。",
      "Gram-Schmidt 会保留子空间，因为每个新向量都是由同一个部分张成空间内的向量组成。扣除步骤移走旧方向；规范化只是在之后改变长度。"
    ),
    durationSeconds: 16,
    frames: [
      {
        label: text("Start from the input list", "由輸入列表開始", "由输入列表开始"),
        value: text(
          "The worked example begins with w1=(1,0,1), w2=(1,1,1), and w3=(0,1,2). They are independent, but not yet orthogonal.",
          "例子由 w1=(1,0,1)、w2=(1,1,1)、w3=(0,1,2) 開始。它們線性無關，但尚未互相正交。",
          "例子由 w1=(1,0,1)、w2=(1,1,1)、w3=(0,1,2) 开始。它们线性无关，但尚未互相正交。"
        ),
      },
      {
        label: text("Keep the first direction", "保留第一個方向", "保留第一个方向"),
        value: text(
          "The first Gram-Schmidt vector is v1=w1, so the first direction is carried into the new basis unchanged.",
          "第一個 Gram-Schmidt 向量是 v1=w1，所以第一個方向原封不動進入新基底。",
          "第一个 Gram-Schmidt 向量是 v1=w1，所以第一个方向原封不动进入新基底。"
        ),
      },
      {
        label: text("Subtract the projection from w2", "從 w2 扣除投影", "从 w2 扣去投影"),
        value: text(
          "Since <w2,v1>/||v1||^2 = 1, subtract one copy of v1 and obtain v2=(0,1,0), which is perpendicular to v1.",
          "因為 <w2,v1>/||v1||^2 = 1，扣除一份 v1 後得到 v2=(0,1,0)，它與 v1 垂直。",
          "因为 <w2,v1>/||v1||^2 = 1，扣去一份 v1 后得到 v2=(0,1,0)，它与 v1 垂直。"
        ),
      },
      {
        label: text("Subtract every old direction", "扣除每個舊方向", "扣去每个旧方向"),
        value: text(
          "For w3, the coefficients along v1 and v2 are both 1, so v3=w3-v1-v2=(-1,0,1).",
          "對 w3 而言，沿 v1 和 v2 的係數都等於 1，所以 v3=w3-v1-v2=(-1,0,1)。",
          "对 w3 而言，沿 v1 和 v2 的系数都等于 1，所以 v3=w3-v1-v2=(-1,0,1)。"
        ),
      },
      {
        label: text("Check orthogonality", "檢查正交性", "检查正交性"),
        value: text(
          "The pairwise dot products are zero, so the new list is orthogonal.",
          "兩兩內積都是 0，所以新列表是正交的。",
          "两两内积都是 0，所以新列表是正交的。"
        ),
      },
      {
        label: text("Normalize after the span is safe", "張成安全後再正規化", "张成安全后再规范化"),
        value: text(
          "After orthogonalization, divide each nonzero vector by its norm if an orthonormal basis is needed.",
          "完成正交化後，若需要標準正交基，才把每個非零向量除以自己的範數。",
          "完成正交化后，若需要标准正交基，才把每个非零向量除以自己的范数。"
        ),
      },
    ],
    summary: text(
      "Watch the worked example as projection subtraction: keep v1, remove old directions from w2 and w3, then normalize only after the span is preserved.",
      "把頁面例子看成投影扣除：保留 v1，從 w2 和 w3 扣除舊方向，最後在張成空間已保留後才正規化。",
      "把页面例子看成投影扣除：保留 v1，从 w2 和 w3 扣去旧方向，最后在张成空间已保留后才规范化。"
    ),
    posterSrc: text(
      "/generated/animations/math1030/gram-schmidt-projection-story-en.png",
      "/generated/animations/math1030/gram-schmidt-projection-story-zh-hk.png",
      "/generated/animations/math1030/gram-schmidt-projection-story-zh-cn.png"
    ),
    title: text(
      "Projection subtraction in Gram-Schmidt",
      "Gram-Schmidt 的投影扣除",
      "Gram-Schmidt 的投影扣除"
    ),
    transcript: [
      text(
        "Gram-Schmidt starts with the first vector unchanged.",
        "Gram-Schmidt 由保留第一個向量開始。",
        "Gram-Schmidt 由保留第一个向量开始。"
      ),
      text(
        "Each later vector subtracts the components lying in earlier orthogonal directions.",
        "之後每個向量都扣除落在舊正交方向上的部分。",
        "之后每个向量都扣去落在旧正交方向上的部分。"
      ),
      text(
        "The result is orthogonal and spans the same subspace; normalization is the final optional step.",
        "結果是正交的，並張成同一個子空間；正規化是最後可選的一步。",
        "结果是正交的，并张成同一个子空间；规范化是最后可选的一步。"
      ),
    ],
    videoSrc: text(
      "/generated/animations/math1030/gram-schmidt-projection-story-en.mp4",
      "/generated/animations/math1030/gram-schmidt-projection-story-zh-hk.mp4",
      "/generated/animations/math1030/gram-schmidt-projection-story-zh-cn.mp4"
    ),
  },
  "math1025-complex-plane-arithmetic-story": {
    conclusion: text(
      "Complex addition has the geometry of vector addition. Complex multiplication is clearest in polar form: multiply the moduli and add the arguments, with angles understood modulo 2 pi.",
      "複數加法具有向量加法的幾何。複數乘法在極式中最清楚：把模相乘，並把幅角相加；角度以模 2 pi 理解。",
      "复数加法具有向量加法的几何。复数乘法在极式中最清楚：把模相乘，并把辐角相加；角度以模 2 pi 理解。"
    ),
    durationSeconds: 12,
    frames: [
      {
        label: text("Complex plane", "複平面", "复平面"),
        value: text(
          "A complex number z=x+iy is the point or vector (x,y), with the real axis horizontal and the imaginary axis vertical.",
          "複數 z=x+iy 是點或向量 (x,y)，實軸水平，虛軸垂直。",
          "复数 z=x+iy 是点或向量 (x,y)，实轴水平，虚轴垂直。"
        ),
      },
      {
        label: text("Addition", "加法", "加法"),
        value: text(
          "Addition is coordinatewise: add real parts and imaginary parts separately, so the picture is ordinary vector addition.",
          "加法是逐坐標進行：分別相加實部與虛部，所以圖像就是普通向量加法。",
          "加法是逐坐标进行：分别相加实部与虚部，所以图像就是普通向量加法。"
        ),
      },
      {
        label: text("Modulus and argument", "模與幅角", "模与辐角"),
        value: text(
          "The modulus is the length from the origin; an argument is the counterclockwise angle from the positive real axis, up to full turns.",
          "模是離原點的長度；幅角是由正實軸逆時針量起的角，並以相差整圈視為同等。",
          "模是离原点的长度；辐角是由正实轴逆时针量起的角，并以相差整圈视为同等。"
        ),
      },
      {
        label: text("Polar form", "極式", "极式"),
        value: text(
          "Polar form writes the same point as z=r(cos theta+i sin theta), where r is the modulus and theta is an argument.",
          "極式把同一點寫成 z=r(cos theta+i sin theta)，其中 r 是模，theta 是一個幅角。",
          "极式把同一点写成 z=r(cos theta+i sin theta)，其中 r 是模，theta 是一个辐角。"
        ),
      },
      {
        label: text("Product length", "乘積長度", "乘积长度"),
        value: text(
          "For nonzero complex numbers, the product length is |z1z2|=|z1||z2|.",
          "對非零複數，乘積長度滿足 |z1z2|=|z1||z2|。",
          "对非零复数，乘积长度满足 |z1z2|=|z1||z2|。"
        ),
      },
      {
        label: text("Product angle", "乘積幅角", "乘积辐角"),
        value: text(
          "The argument of a product is the sum of the arguments, modulo 2 pi, so multiplication acts as rotation plus scaling.",
          "乘積的幅角是兩個幅角之和，模 2 pi 而定；所以乘法可看成旋轉加縮放。",
          "乘积的辐角是两个辐角之和，模 2 pi 而定；所以乘法可看成旋转加缩放。"
        ),
      },
    ],
    summary: text(
      "Watch how the complex plane separates addition from multiplication: addition moves vectors, while polar multiplication scales lengths and rotates angles.",
      "看清複平面如何分開加法與乘法：加法移動向量，而極式乘法會縮放長度並旋轉角度。",
      "看清复平面如何分开加法与乘法：加法移动向量，而极式乘法会缩放长度并旋转角度。"
    ),
    posterSrc: text(
      "/generated/animations/math1025/complex-plane-arithmetic-story-en.png",
      "/generated/animations/math1025/complex-plane-arithmetic-story-zh-hk.png",
      "/generated/animations/math1025/complex-plane-arithmetic-story-zh-cn.png"
    ),
    title: text(
      "Complex arithmetic on the plane",
      "複數運算的平面圖像",
      "复数运算的平面图像"
    ),
    transcript: [
      text(
        "In the complex plane, z=x+iy is both a point and a vector.",
        "在複平面中，z=x+iy 同時是一個點和一支向量。",
        "在复平面中，z=x+iy 同时是一个点和一支向量。"
      ),
      text(
        "Complex addition is vector addition because real and imaginary parts are added separately.",
        "複數加法就是向量加法，因為實部和虛部分別相加。",
        "复数加法就是向量加法，因为实部和虚部分别相加。"
      ),
      text(
        "Complex multiplication is best read in polar form: multiply lengths and add angles.",
        "複數乘法最適合用極式閱讀：長度相乘，幅角相加。",
        "复数乘法最适合用极式阅读：长度相乘，辐角相加。"
      ),
    ],
    videoSrc: text(
      "/generated/animations/math1025/complex-plane-arithmetic-story-en.mp4",
      "/generated/animations/math1025/complex-plane-arithmetic-story-zh-hk.mp4",
      "/generated/animations/math1025/complex-plane-arithmetic-story-zh-cn.mp4"
    ),
  },
  "math1025-euclidean-bezout-integer-equation-story": {
    conclusion: text(
      "The Euclidean algorithm moves downward through smaller remainders to find the gcd. The extended algorithm then reads the same equations backward to express that gcd as a Bézout combination, which is why gcd(a,b) controls when ax+by=c has integer solutions.",
      "歐幾里得算法向下經過越來越小的餘數來求 gcd。擴展算法再把同一批等式倒過來讀，把 gcd 寫成 Bézout 組合，因此 gcd(a,b) 會控制 ax+by=c 何時有整數解。",
      "欧几里得算法向下经过越来越小的余数来求 gcd。扩展算法再把同一批等式倒过来读，把 gcd 写成 Bézout 组合，因此 gcd(a,b) 会控制 ax+by=c 何时有整数解。"
    ),
    durationSeconds: 11,
    frames: [
      {
        label: text("First division", "第一次帶餘除法", "第一次带余除法"),
        value: text(
          "The computation starts with 7224=1290*5+774, so the next pair is (1290,774).",
          "計算由 7224=1290*5+774 開始，所以下一對數是 (1290,774)。",
          "计算由 7224=1290*5+774 开始，所以下一对数是 (1290,774)。"
        ),
      },
      {
        label: text("Gcd invariant", "gcd 不變量", "gcd 不变量"),
        value: text(
          "If a=bq+r, then the positive common divisors of (a,b) are exactly the positive common divisors of (b,r).",
          "若 a=bq+r，則 (a,b) 的正共同因數正好就是 (b,r) 的正共同因數。",
          "若 a=bq+r，则 (a,b) 的正共同因数正好就是 (b,r) 的正共同因数。"
        ),
      },
      {
        label: text("Remainder chain", "餘數鏈", "余数链"),
        value: text(
          "The remainders 774, 516, 258, 0 show that the last nonzero remainder is gcd(7224,1290)=258.",
          "餘數 774, 516, 258, 0 說明最後非零餘數是 gcd(7224,1290)=258。",
          "余数 774, 516, 258, 0 说明最后非零余数是 gcd(7224,1290)=258。"
        ),
      },
      {
        label: text("Back-substitution", "倒代", "倒代"),
        value: text(
          "Running the equations backward first gives 258=2*774-1290.",
          "把等式倒過來用，先得到 258=2*774-1290。",
          "把等式倒过来用，先得到 258=2*774-1290。"
        ),
      },
      {
        label: text("Bézout combination", "Bézout 組合", "Bézout 组合"),
        value: text(
          "Substituting 774=7224-5*1290 gives the concrete identity 258=2*7224-11*1290.",
          "代入 774=7224-5*1290，得到具體恆等式 258=2*7224-11*1290。",
          "代入 774=7224-5*1290，得到具体恒等式 258=2*7224-11*1290。"
        ),
      },
      {
        label: text("Equation test", "方程判別", "方程判别"),
        value: text(
          "A linear integer equation ax+by=c has integer solutions exactly when gcd(a,b) divides c.",
          "一次整數方程 ax+by=c 有整數解，當且僅當 gcd(a,b) 整除 c。",
          "一次整数方程 ax+by=c 有整数解，当且仅当 gcd(a,b) 整除 c。"
        ),
      },
    ],
    summary: text(
      "Watch the Euclidean algorithm first find the gcd and then reverse into a concrete Bézout identity for integer equations.",
      "觀看歐幾里得算法如何先找出 gcd，再倒代成可用於整數方程的具體 Bézout 恆等式。",
      "观看欧几里得算法如何先找出 gcd，再倒代成可用于整数方程的具体 Bézout 恒等式。"
    ),
    posterSrc: text(
      "/generated/animations/math1025/euclidean-bezout-integer-equation-story-en.png",
      "/generated/animations/math1025/euclidean-bezout-integer-equation-story-zh-hk.png",
      "/generated/animations/math1025/euclidean-bezout-integer-equation-story-zh-cn.png"
    ),
    title: text(
      "From Euclid to Bézout",
      "由歐幾里得算法到 Bézout",
      "从欧几里得算法到 Bézout"
    ),
    transcript: [
      text(
        "Euclid's algorithm repeatedly replaces (a,b) by (b,r), where a=bq+r.",
        "歐幾里得算法反覆把 (a,b) 換成 (b,r)，其中 a=bq+r。",
        "欧几里得算法反复把 (a,b) 换成 (b,r)，其中 a=bq+r。"
      ),
      text(
        "The last nonzero remainder is the gcd.",
        "最後非零餘數就是最大公因數。",
        "最后非零余数就是最大公因数。"
      ),
      text(
        "Back-substitution expresses that gcd as an integer linear combination of the original two numbers.",
        "倒代把這個 gcd 寫成原本兩個數的整數線性組合。",
        "倒代把这个 gcd 写成原本两个数的整数线性组合。"
      ),
    ],
    videoSrc: text(
      "/generated/animations/math1025/euclidean-bezout-integer-equation-story-en.mp4",
      "/generated/animations/math1025/euclidean-bezout-integer-equation-story-zh-hk.mp4",
      "/generated/animations/math1025/euclidean-bezout-integer-equation-story-zh-cn.mp4"
    ),
  },
  "csci2520-hash-table-collision-strategy-story": {
    conclusion: text(
      "Hashing is only the first step. Correct lookup and update still depend on the collision strategy checking keys along the chain or probe sequence.",
      "Hashing 只是第一步。正確 lookup 和 update 仍取決於 collision strategy 是否沿 chain 或 probe sequence 檢查 key。",
      "Hashing 只是第一步。正确 lookup 和 update 仍取决于 collision strategy 是否沿 chain 或 probe sequence 检查 key。"
    ),
    durationSeconds: 12,
    frames: [
      {
        label: text("Dictionary contract", "Dictionary contract", "Dictionary contract"),
        value: text(
          "A hash table implements dictionary operations by key; buckets are the implementation, not the logical contract.",
          "Hash table 按 key 實作 dictionary 操作；bucket 是實作方式，不是邏輯 contract 本身。",
          "Hash table 按 key 实现 dictionary 操作；bucket 是实现方式，不是逻辑 contract 本身。"
        ),
      },
      {
        label: text("Hash to a bucket", "Hash 到 bucket", "Hash 到 bucket"),
        value: text(
          "The hash function compresses a key to an index, so lookup starts in a small region of the table.",
          "Hash function 把 key 壓成 index，令 lookup 由 table 中較小範圍開始。",
          "Hash function 把 key 压成 index，让 lookup 从 table 中较小范围开始。"
        ),
      },
      {
        label: text("Collision", "Collision", "Collision"),
        value: text(
          "Two different keys can land in the same bucket. Collision does not mean the keys are equal.",
          "兩個不同 key 可以落入同一 bucket。Collision 不代表兩個 key 相等。",
          "两个不同 key 可以落入同一 bucket。Collision 不代表两个 key 相等。"
        ),
      },
      {
        label: text("Chaining", "Chaining", "Chaining"),
        value: text(
          "Chaining attaches a linked list to the bucket and compares keys while scanning that list.",
          "Chaining 把 linked list 掛在 bucket 底下，並在掃描該 list 時比較 key。",
          "Chaining 把 linked list 挂在 bucket 下面，并在扫描该 list 时比较 key。"
        ),
      },
      {
        label: text("Open addressing", "Open addressing", "Open addressing"),
        value: text(
          "Open addressing stores entries in the table itself and follows a probe sequence after a collision.",
          "Open addressing 把 entry 存在 table 本身，collision 後沿 probe sequence 前進。",
          "Open addressing 把 entry 存在 table 本身，collision 后沿 probe sequence 前进。"
        ),
      },
      {
        label: text("Invariant", "不變量", "不变量"),
        value: text(
          "Hashing narrows the search; collision handling preserves dictionary correctness.",
          "Hashing 縮小搜尋；collision handling 保持 dictionary 正確。",
          "Hashing 缩小搜索；collision handling 保持 dictionary 正确。"
        ),
      },
    ],
    summary: text(
      "Watch how a hash table keeps dictionary operations correct when two different keys collide.",
      "看清 hash table 在兩個不同 key 發生 collision 時，如何仍保持 dictionary 操作正確。",
      "看清 hash table 在两个不同 key 发生 collision 时，如何仍保持 dictionary 操作正确。"
    ),
    posterSrc: text(
      "/generated/animations/csci2520/hash-table-collision-strategy-story-en.png",
      "/generated/animations/csci2520/hash-table-collision-strategy-story-zh-hk.png",
      "/generated/animations/csci2520/hash-table-collision-strategy-story-zh-cn.png"
    ),
    title: text(
      "Hash-table collisions and correctness",
      "Hash table collision 與正確性",
      "Hash table collision 与正确性"
    ),
    transcript: [
      text(
        "A hash table implements dictionary operations by key.",
        "Hash table 按 key 實作 dictionary 操作。",
        "Hash table 按 key 实现 dictionary 操作。"
      ),
      text(
        "A collision means two different keys reached the same bucket, so lookup must still compare keys.",
        "Collision 表示兩個不同 key 到達同一 bucket，所以 lookup 仍然要比較 key。",
        "Collision 表示两个不同 key 到达同一 bucket，所以 lookup 仍然要比较 key。"
      ),
      text(
        "Chaining and probing are different recovery strategies, but both preserve the same dictionary contract.",
        "Chaining 與 probing 是不同補救策略，但兩者都保留同一個 dictionary contract。",
        "Chaining 与 probing 是不同补救策略，但两者都保留同一个 dictionary contract。"
      ),
    ],
    videoSrc: text(
      "/generated/animations/csci2520/hash-table-collision-strategy-story-en.mp4",
      "/generated/animations/csci2520/hash-table-collision-strategy-story-zh-hk.mp4",
      "/generated/animations/csci2520/hash-table-collision-strategy-story-zh-cn.mp4"
    ),
  },
  "math1090-function-map-properties-story": {
    conclusion: text(
      "The same arrow diagram separates the main definitions. A function gives each input exactly one output, injectivity forbids collisions, surjectivity covers the target, and composition feeds one output into the next map.",
      "同一張箭嘴圖可以把主要定義分清楚。函數要求每個輸入剛好有一個輸出；單射禁止碰撞；滿射覆蓋 target；合成則把一個輸出接到下一個映射。",
      "同一张箭头图可以把主要定义分清楚。函数要求每个输入刚好有一个输出；单射禁止碰撞；满射覆盖 target；合成则把一个输出接到下一个映射。"
    ),
    durationSeconds: 12,
    frames: [
      {
        label: text("Domain and target", "domain 與 target", "domain 和 target"),
        value: text(
          "A function f:X->Y is a relation where every input in X has exactly one output in the target Y.",
          "函數 f:X->Y 是一種關係，其中 X 內每個輸入在 target Y 中都有唯一一個輸出。",
          "函数 f:X->Y 是一种关系，其中 X 中每个输入在 target Y 中都有唯一一个输出。"
        ),
      },
      {
        label: text("Graph as ordered pairs", "graph 作為有序對", "graph 作为有序对"),
        value: text(
          "The graph stores the same arrows as ordered pairs inside X x Y, with one pair for each input.",
          "graph 把同一批箭嘴記成 X x Y 內的有序對，而且每個輸入只出現在一個有序對中。",
          "graph 把同一批箭头记成 X x Y 中的有序对，而且每个输入只出现在一个有序对中。"
        ),
      },
      {
        label: text("Image and preimage", "image 與 preimage", "image 和 preimage"),
        value: text(
          "Image is read forward to reached outputs; preimage is read backward from an output set to the inputs that land there.",
          "image 是向前讀到被命中的輸出；preimage 是從輸出集合反向讀回會落入其中的輸入。",
          "image 是向前读到被取到的输出；preimage 是从输出集合反向读回会落入其中的输入。"
        ),
      },
      {
        label: text("Injective", "單射", "单射"),
        value: text(
          "Injective means no collision: if two inputs have the same output, they must have been the same input.",
          "單射表示沒有碰撞：若兩個輸入有同一輸出，它們其實必須是同一個輸入。",
          "单射表示没有碰撞：若两个输入有同一输出，它们其实必须是同一个输入。"
        ),
      },
      {
        label: text("Surjective", "滿射", "满射"),
        value: text(
          "Surjective means the actual image equals the whole target, so no target element is missed.",
          "滿射表示實際 image 等於整個 target，因此沒有 target 元素被漏掉。",
          "满射表示实际 image 等于整个 target，因此没有 target 元素被漏掉。"
        ),
      },
      {
        label: text("Composition", "合成", "合成"),
        value: text(
          "For g o f, first apply f and then feed the resulting output into g.",
          "對 g o f，要先做 f，再把得到的輸出放入 g。",
          "对 g o f，要先做 f，再把得到的输出放入 g。"
        ),
      },
    ],
    summary: text(
      "Use one arrow diagram to keep domain, target, image, preimage, injectivity, surjectivity, and composition distinct.",
      "用同一張箭嘴圖分清 domain、target、image、preimage、單射、滿射與合成。",
      "用同一张箭头图分清 domain、target、image、preimage、单射、满射和合成。"
    ),
    posterSrc: text(
      "/generated/animations/math1090/function-map-properties-story-en.png",
      "/generated/animations/math1090/function-map-properties-story-zh-hk.png",
      "/generated/animations/math1090/function-map-properties-story-zh-cn.png"
    ),
    title: text(
      "Read a function as arrows",
      "用箭嘴閱讀函數",
      "用箭头读函数"
    ),
    transcript: [
      text(
        "A function is a controlled relation from a domain to a target.",
        "函數是由 domain 到 target 的受控關係。",
        "函数是从 domain 到 target 的受控关系。"
      ),
      text(
        "Image and preimage read the same arrows in opposite directions.",
        "image 與 preimage 是用相反方向閱讀同一批箭嘴。",
        "image 和 preimage 是用相反方向阅读同一批箭头。"
      ),
      text(
        "Injective, surjective, bijective, and composition are all conditions on how those arrows behave.",
        "單射、滿射、雙射與合成都在描述這些箭嘴如何運作。",
        "单射、满射、双射和合成都在描述这些箭头如何运作。"
      ),
    ],
    videoSrc: text(
      "/generated/animations/math1090/function-map-properties-story-en.mp4",
      "/generated/animations/math1090/function-map-properties-story-zh-hk.mp4",
      "/generated/animations/math1090/function-map-properties-story-zh-cn.mp4"
    ),
  },
};

export function getVideoExplanationSnapshot(
  id: string,
  locale: Locale
): VideoExplanationSnapshot | null {
  const entry = videoExplanationCatalog[id];

  if (!entry) {
    return null;
  }

  return {
    conclusion: getLocalizedText(entry.conclusion, locale),
    durationSeconds: entry.durationSeconds,
    frames: entry.frames.map((frame) => ({
      label: getLocalizedText(frame.label, locale),
      value: getLocalizedText(frame.value, locale),
    })),
    posterSrc: resolveLocalizedAsset(entry.posterSrc, locale),
    summary: getLocalizedText(entry.summary, locale),
    title: getLocalizedText(entry.title, locale),
    transcript: entry.transcript?.map((line) => getLocalizedText(line, locale)),
    videoSrc: resolveLocalizedAsset(entry.videoSrc, locale),
  };
}
