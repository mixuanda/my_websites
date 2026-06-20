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
  "math1030-basis-dimension-just-right-story": {
    conclusion: text(
      "A basis is exactly enough information: it reaches every vector in the space and contains no redundant direction. Dimension records the stable size of such a list.",
      "基底是剛好足夠的資訊：它能到達空間內每個向量，而且沒有冗餘方向。維數記錄這種列表的穩定大小。",
      "基是刚好足够的信息：它能到达空间内每个向量，而且没有冗余方向。维数记录这种列表的稳定大小。"
    ),
    durationSeconds: 16,
    frames: [
      {
        label: text("Spanning means enough reach", "張成表示範圍足夠", "张成表示范围足够"),
        value: text(
          "A list such as {u1,u2} spans W when every target x in W can be written as a linear combination of the listed vectors.",
          "像 {u1,u2} 這樣的列表若張成 W，就表示 W 中每個目標 x 都可寫成列表向量的線性組合。",
          "像 {u1,u2} 这样的列表若张成 W，就表示 W 中每个目标 x 都可写成列表向量的线性组合。"
        ),
      },
      {
        label: text("Independence removes redundancy", "線性獨立排除冗餘", "线性独立排除冗余"),
        value: text(
          "If u3=u1+u2, then adding u3 changes the description but not the span, so the list is too large to be a basis.",
          "如果 u3=u1+u2，加入 u3 只會改變描述方式而不改變張成，所以列表太大，不能成為基底。",
          "如果 u3=u1+u2，加入 u3 只会改变描述方式而不改变张成，所以列表太大，不能成为基。"
        ),
      },
      {
        label: text("Basis means both conditions", "基底需要兩個條件", "基需要两个条件"),
        value: text(
          "A basis is a spanning list that is also linearly independent: large enough to reach W, but not larger than necessary.",
          "基底是同時線性獨立的張成列表：足夠大，可以到達 W，但不比必要的更大。",
          "基是同时线性独立的张成列表：足够大，可以到达 W，但不比必要的更大。"
        ),
      },
      {
        label: text("Dimension is the stable count", "維數是穩定數目", "维数是稳定数目"),
        value: text(
          "Different bases of the same finite-dimensional space may look different, but they contain the same number of vectors.",
          "同一有限維空間的不同基底可以長得不同，但它們含有相同數目的向量。",
          "同一有限维空间的不同基可以长得不同，但它们含有相同数目的向量。"
        ),
      },
      {
        label: text("Use the two-of-three shortcut", "使用二推一捷徑", "使用二推一捷径"),
        value: text(
          "For n vectors in W, any two facts among dim(W)=n, independence, and spanning imply the third.",
          "對 W 中 n 個向量而言，dim(W)=n、線性獨立、張成 W 這三項任取兩項，即可推出第三項。",
          "对 W 中 n 个向量而言，dim(W)=n、线性独立、张成 W 这三项任取两项，即可推出第三项。"
        ),
      },
      {
        label: text("Shortcut in R3", "在 R3 中使用捷徑", "在 R3 中使用捷径"),
        value: text(
          "Once row reduction shows three vectors in R3 are independent, dim(R3)=3 supplies the spanning part automatically.",
          "一旦行化簡顯示 R3 中三個向量線性獨立，dim(R3)=3 就會自動補上張成部分。",
          "一旦行化简显示 R3 中三个向量线性独立，dim(R3)=3 就会自动补上张成部分。"
        ),
      },
    ],
    summary: text(
      "Watch basis and dimension connect span, independence, stable basis size, and the two-of-three basis shortcut.",
      "觀看基底與維數如何連接張成、線性獨立、穩定的基底大小，以及二推一基底捷徑。",
      "观看基与维数如何连接张成、线性独立、稳定的基大小，以及二推一基捷径。"
    ),
    posterSrc: text(
      "/generated/animations/math1030/basis-dimension-just-right-story-en.png",
      "/generated/animations/math1030/basis-dimension-just-right-story-zh-hk.png",
      "/generated/animations/math1030/basis-dimension-just-right-story-zh-cn.png"
    ),
    title: text(
      "Basis and dimension: exactly enough",
      "基底與維數：剛好足夠",
      "基与维数：刚好足够"
    ),
    transcript: [
      text(
        "Spanning says the list reaches every vector in the space.",
        "張成表示列表能到達空間內每個向量。",
        "张成表示列表能到达空间内每个向量。"
      ),
      text(
        "Independence says no listed vector is redundant.",
        "線性獨立表示沒有列出的向量是冗餘的。",
        "线性独立表示没有列出的向量是冗余的。"
      ),
      text(
        "Dimension records the stable size of a just-right list, so it can finish basis arguments once the count matches.",
        "維數記錄剛好列表的穩定大小，所以當數目匹配時，它可以完成基底論證。",
        "维数记录刚好列表的稳定大小，所以当数目匹配时，它可以完成基论证。"
      ),
    ],
    videoSrc: text(
      "/generated/animations/math1030/basis-dimension-just-right-story-en.mp4",
      "/generated/animations/math1030/basis-dimension-just-right-story-zh-hk.mp4",
      "/generated/animations/math1030/basis-dimension-just-right-story-zh-cn.mp4"
    ),
  },
  "math1030-column-row-space-rank-story": {
    conclusion: text(
      "The RREF tells you positions and counts. For column space, return to the original matrix; for row space, keep the nonzero rows of the RREF.",
      "RREF 告訴你位置和數目。列空間要回到原矩陣取列；行空間則保留 RREF 的非零行。",
      "RREF 告诉你位置和数目。列空间要回到原矩阵取列；行空间则保留 RREF 的非零行。"
    ),
    durationSeconds: 12,
    frames: [
      {
        label: text("Column space records outputs", "列空間記錄輸出", "列空间记录输出"),
        value: text(
          "The columns of A span all right-hand sides b for which Ax=b is consistent.",
          "A 的列張成所有令 Ax=b 有解的右端向量 b。",
          "A 的列张成所有使 Ax=b 有解的右端向量 b。"
        ),
      },
      {
        label: text("Row space is different data", "行空間是另一種資訊", "行空间是另一种信息"),
        value: text(
          "For this 3 by 4 matrix, C(A) lives in R3 while R(A) lives in R4, so the two spaces must be distinguished.",
          "對這個 3 乘 4 矩陣，C(A) 在 R3 中，而 R(A) 在 R4 中，所以兩個空間必須分清楚。",
          "对这个 3 乘 4 矩阵，C(A) 在 R3 中，而 R(A) 在 R4 中，所以两个空间必须分清楚。"
        ),
      },
      {
        label: text("RREF gives pivot positions", "RREF 給出樞紐位置", "RREF 给出主元位置"),
        value: text(
          "Row reduction locates pivot columns 1 and 2, but this is only positional information for column space.",
          "行化簡找出第 1、2 列是樞紐列，但對列空間而言，這只是位置信息。",
          "行化简找出第 1、2 列是主元列，但对列空间而言，这只是位置信息。"
        ),
      },
      {
        label: text("Column basis comes from A", "列空間基底取自 A", "列空间基取自 A"),
        value: text(
          "Use the original columns c1 and c2 as a basis for C(A); do not use the pivot columns of the RREF as the actual basis vectors.",
          "用原矩陣的列 c1 和 c2 作為 C(A) 的基底；不要把 RREF 的樞紐列當成真正基底向量。",
          "用原矩阵的列 c1 和 c2 作为 C(A) 的基；不要把 RREF 的主元列当成真正基向量。"
        ),
      },
      {
        label: text("Row basis comes from R", "行空間基底取自 R", "行空间基取自 R"),
        value: text(
          "Row operations preserve row space, so the nonzero rows of the RREF form a basis for R(A).",
          "行變換保留行空間，所以 RREF 的非零行形成 R(A) 的一組基底。",
          "行变换保持行空间，所以 RREF 的非零行形成 R(A) 的一组基。"
        ),
      },
      {
        label: text("Rank is the shared count", "秩是共同數目", "秩是共同数目"),
        value: text(
          "The number of pivots, dim C(A), and dim R(A) are all 2, so rank(A)=2.",
          "樞紐數、dim C(A) 與 dim R(A) 全都是 2，所以 rank(A)=2。",
          "主元数、dim C(A) 与 dim R(A) 全都是 2，所以 rank(A)=2。"
        ),
      },
    ],
    summary: text(
      "Watch one row reduction identify the column-space basis, row-space basis, and rank without confusing the RREF with the original matrix.",
      "觀看一次行化簡如何辨認列空間基底、行空間基底與秩，同時避免混淆 RREF 和原矩陣。",
      "观看一次行化简如何辨认列空间基、行空间基与秩，同时避免混淆 RREF 和原矩阵。"
    ),
    posterSrc: text(
      "/generated/animations/math1030/column-row-space-rank-story-en.png",
      "/generated/animations/math1030/column-row-space-rank-story-zh-hk.png",
      "/generated/animations/math1030/column-row-space-rank-story-zh-cn.png"
    ),
    title: text(
      "Column space, row space, and rank",
      "列空間、行空間與秩",
      "列空间、行空间与秩"
    ),
    transcript: [
      text(
        "Column space is the set of outputs the matrix can produce.",
        "列空間是矩陣可以產生的輸出集合。",
        "列空间是矩阵可以产生的输出集合。"
      ),
      text(
        "The RREF gives pivot positions, but the column-space basis vectors are taken from the original matrix.",
        "RREF 給出樞紐位置，但列空間的基底向量要取自原矩陣。",
        "RREF 给出主元位置，但列空间的基向量要取自原矩阵。"
      ),
      text(
        "For row space, the nonzero rows of the RREF are already basis vectors, and their count equals the rank.",
        "對行空間而言，RREF 的非零行本身就是基底向量，而它們的數目等於秩。",
        "对行空间而言，RREF 的非零行本身就是基向量，而它们的数目等于秩。"
      ),
    ],
    videoSrc: text(
      "/generated/animations/math1030/column-row-space-rank-story-en.mp4",
      "/generated/animations/math1030/column-row-space-rank-story-zh-hk.mp4",
      "/generated/animations/math1030/column-row-space-rank-story-zh-cn.mp4"
    ),
  },
  "math1030-matrix-subspace-basis-dimension-story": {
    conclusion: text(
      "For a matrix subspace, write the general matrix, identify the free parameters, split by those parameters, and count the fixed matrices that form the basis.",
      "處理矩陣子空間時，先寫出一般矩陣，找出自由參數，按參數拆成固定矩陣，最後數形成基底的固定矩陣。",
      "处理矩阵子空间时，先写出一般矩阵，找出自由参数，按参数拆成固定矩阵，最后数形成基的固定矩阵。"
    ),
    durationSeconds: 12,
    frames: [
      {
        label: text("Matrices can be vectors", "矩陣也可以作為向量", "矩阵也可以作为向量"),
        value: text(
          "Inside a fixed-size matrix space such as M2,2(R), ordinary matrix addition and scalar multiplication keep every result in the same ambient space.",
          "在固定大小的矩陣空間，例如 M2,2(R)，普通矩陣加法與純量乘法會令結果仍留在同一環境空間。",
          "在固定大小的矩阵空间，例如 M2,2(R)，普通矩阵加法与标量乘法会让结果仍留在同一环境空间。"
        ),
      },
      {
        label: text("Matrix units isolate entries", "矩陣單位分離矩陣項", "矩阵单位分离矩阵项"),
        value: text(
          "The standard matrices E11, E12, E21, and E22 isolate the four independent entry directions of M2,2(R).",
          "標準矩陣 E11、E12、E21、E22 分離出 M2,2(R) 的四個獨立位置方向。",
          "标准矩阵 E11、E12、E21、E22 分离出 M2,2(R) 的四个独立位置方向。"
        ),
      },
      {
        label: text("Constraints reduce freedom", "限制減少自由度", "限制减少自由度"),
        value: text(
          "In Sym2(R), the equation A^T=A ties the two off-diagonal entries together, leaving only a, b, and c free.",
          "在 Sym2(R) 中，方程 A^T=A 綁定兩個非對角項，所以只剩 a、b、c 自由。",
          "在 Sym2(R) 中，方程 A^T=A 绑定两个非对角项，所以只剩 a、b、c 自由。"
        ),
      },
      {
        label: text("Split by parameters", "按參數拆開", "按参数拆开"),
        value: text(
          "The general symmetric matrix [a b; b c] splits as aB1+bB2+cB3, one fixed matrix for each free parameter.",
          "一般對稱矩陣 [a b; b c] 可拆成 aB1+bB2+cB3，每個自由參數對應一個固定矩陣。",
          "一般对称矩阵 [a b; b c] 可拆成 aB1+bB2+cB3，每个自由参数对应一个固定矩阵。"
        ),
      },
      {
        label: text("Check basis", "檢查基底", "检查基"),
        value: text(
          "The decomposition gives spanning, and comparing entries in aB1+bB2+cB3=0 gives independence.",
          "分解式給出張成；在 aB1+bB2+cB3=0 中比較矩陣項，便得到線性獨立。",
          "分解式给出张成；在 aB1+bB2+cB3=0 中比较矩阵项，便得到线性无关。"
        ),
      },
      {
        label: text("Count free choices", "數自由選擇", "数自由选择"),
        value: text(
          "Dimension counts the basis matrices, so dim Sym2(R)=3 even though the matrices are still 2 by 2.",
          "維數數基底矩陣，所以 dim Sym2(R)=3，即使這些矩陣仍然是 2 乘 2。",
          "维数数基矩阵，所以 dim Sym2(R)=3，即使这些矩阵仍然是 2 乘 2。"
        ),
      },
    ],
    summary: text(
      "Watch the Sym2(R) worked example turn free parameters into fixed basis matrices, then compare the resulting dimensions with full, triangular, and skew-symmetric matrix spaces.",
      "觀看 Sym2(R) 例子如何把自由參數變成固定基底矩陣，再與全矩陣、上三角矩陣、反對稱矩陣空間的維數作比較。",
      "观看 Sym2(R) 例子如何把自由参数变成固定基矩阵，再与全矩阵、上三角矩阵、反对称矩阵空间的维数作比较。"
    ),
    posterSrc: text(
      "/generated/animations/math1030/matrix-subspace-basis-dimension-story-en.png",
      "/generated/animations/math1030/matrix-subspace-basis-dimension-story-zh-hk.png",
      "/generated/animations/math1030/matrix-subspace-basis-dimension-story-zh-cn.png"
    ),
    title: text(
      "Matrix subspaces, basis, and dimension",
      "矩陣子空間、基底與維數",
      "矩阵子空间、基与维数"
    ),
    transcript: [
      text(
        "A fixed-size matrix space behaves like a vector space because addition and scalar multiplication keep the same matrix size.",
        "固定大小的矩陣空間像向量空間一樣運作，因為加法與純量乘法會保持同一矩陣大小。",
        "固定大小的矩阵空间像向量空间一样运作，因为加法与标量乘法会保持同一矩阵大小。"
      ),
      text(
        "Standard matrix units isolate free entries; constraints such as symmetry reduce how many entries are free.",
        "標準矩陣單位分離自由矩陣項；對稱等限制會減少自由項的數目。",
        "标准矩阵单位分离自由矩阵项；对称等限制会减少自由项的个数。"
      ),
      text(
        "For Sym2(R), the three free parameters produce three fixed basis matrices, so the dimension is three.",
        "對 Sym2(R) 而言，三個自由參數產生三個固定基底矩陣，所以維數是三。",
        "对 Sym2(R) 而言，三个自由参数产生三个固定基矩阵，所以维数是三。"
      ),
    ],
    videoSrc: text(
      "/generated/animations/math1030/matrix-subspace-basis-dimension-story-en.mp4",
      "/generated/animations/math1030/matrix-subspace-basis-dimension-story-zh-hk.mp4",
      "/generated/animations/math1030/matrix-subspace-basis-dimension-story-zh-cn.mp4"
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
  "math1025-rational-irrational-root-proof-story": {
    conclusion: text(
      "The proof of sqrt(2) is a lowest-terms contradiction: a prime is forced into both the numerator and denominator. The same pattern explains why prime nth roots are irrational and why sqrt(n) is rational exactly when n is a perfect square.",
      "sqrt(2) 的證明是一個最低項反證：同一個質數被迫同時進入分子和分母。同一模式解釋質數 n 次根為何無理，也解釋為何 sqrt(n) 有理正好等於 n 是完全平方數。",
      "sqrt(2) 的证明是一个最低项反证：同一个质数被迫同时进入分子和分母。同一模式解释质数 n 次根为何无理，也解释为什么 sqrt(n) 有理正好等于 n 是完全平方数。"
    ),
    durationSeconds: 11,
    frames: [
      {
        label: text("The gap in Q", "Q 的缺口", "Q 的缺口"),
        value: text(
          "The rational numbers are closed under arithmetic, but the real equation x^2=2 has no rational solution.",
          "有理數對四則運算封閉，但實數方程 x^2=2 沒有有理數解。",
          "有理数对四则运算封闭，但实数方程 x^2=2 没有有理数解。"
        ),
      },
      {
        label: text("Lowest terms", "最低項", "最低项"),
        value: text(
          "Assume sqrt(2)=a/b with positive integers a,b and gcd(a,b)=1; the contradiction must break that lowest-terms condition.",
          "假設 sqrt(2)=a/b，其中 a,b 為正整數且 gcd(a,b)=1；矛盾必須打破這個最低項條件。",
          "假设 sqrt(2)=a/b，其中 a,b 为正整数且 gcd(a,b)=1；矛盾必须打破这个最低项条件。"
        ),
      },
      {
        label: text("Prime enters a", "質數進入 a", "质数进入 a"),
        value: text(
          "Squaring gives 2b^2=a^2, so 2 divides a^2; Euclid's lemma then forces 2 to divide a.",
          "平方得到 2b^2=a^2，所以 2 整除 a^2；Euclid 引理迫使 2 整除 a。",
          "平方得到 2b^2=a^2，所以 2 整除 a^2；Euclid 引理迫使 2 整除 a。"
        ),
      },
      {
        label: text("Prime enters b", "質數進入 b", "质数进入 b"),
        value: text(
          "Writing a=2c and substituting back gives b^2=2c^2, so the same prime also divides b.",
          "寫 a=2c 並代回去得到 b^2=2c^2，所以同一質數也整除 b。",
          "写 a=2c 并代回去得到 b^2=2c^2，所以同一质数也整除 b。"
        ),
      },
      {
        label: text("Contradiction", "矛盾", "矛盾"),
        value: text(
          "A lowest-terms fraction cannot have the same prime dividing both numerator and denominator, so sqrt(2) is irrational.",
          "最低項分數不可能讓同一個質數同時整除分子和分母，因此 sqrt(2) 是無理數。",
          "最低项分数不可能让同一个质数同时整除分子和分母，因此 sqrt(2) 是无理数。"
        ),
      },
      {
        label: text("Root tests", "根式判別", "根式判别"),
        value: text(
          "The same proof pattern gives prime nth-root irrationality and the criterion sqrt(n) is rational iff n is a perfect square.",
          "同一證明模式給出質數 n 次根無理性，以及 sqrt(n) 有理 iff n 是完全平方數的判別。",
          "同一证明模式给出质数 n 次根无理性，以及 sqrt(n) 有理 iff n 是完全平方数的判别。"
        ),
      },
    ],
    summary: text(
      "Watch the contradiction proof behind sqrt(2): the same prime is forced into numerator and denominator, then the idea extends to prime roots and perfect squares.",
      "觀看 sqrt(2) 背後的反證法：同一質數被迫同時進入分子和分母，然後把這個想法推到質數根式和完全平方數。",
      "观看 sqrt(2) 背后的反证法：同一质数被迫同时进入分子和分母，然后把这个想法推到质数根式和完全平方数。"
    ),
    posterSrc: text(
      "/generated/animations/math1025/rational-irrational-root-proof-story-en.png",
      "/generated/animations/math1025/rational-irrational-root-proof-story-zh-hk.png",
      "/generated/animations/math1025/rational-irrational-root-proof-story-zh-cn.png"
    ),
    title: text(
      "Why some roots are irrational",
      "為何某些根式是無理數",
      "为什么某些根式是无理数"
    ),
    transcript: [
      text(
        "Assume sqrt(2) has a lowest-terms rational representation.",
        "先假設 sqrt(2) 有一個最低項有理表示。",
        "先假设 sqrt(2) 有一个最低项有理表示。"
      ),
      text(
        "Squaring and Euclid's lemma force 2 to divide both numerator and denominator.",
        "平方再用 Euclid 引理，會迫使 2 同時整除分子和分母。",
        "平方再用 Euclid 引理，会迫使 2 同时整除分子和分母。"
      ),
      text(
        "That contradiction is the template for prime roots and the perfect-square criterion.",
        "這個矛盾就是質數根式和完全平方數判別的模板。",
        "这个矛盾就是质数根式和完全平方数判别的模板。"
      ),
    ],
    videoSrc: text(
      "/generated/animations/math1025/rational-irrational-root-proof-story-en.mp4",
      "/generated/animations/math1025/rational-irrational-root-proof-story-zh-hk.mp4",
      "/generated/animations/math1025/rational-irrational-root-proof-story-zh-cn.mp4"
    ),
  },
  "math1025-polynomial-division-remainder-story": {
    conclusion: text(
      "Polynomial long division repeatedly cancels the current leading term while preserving f=gq+current remainder. The process stops only when the remainder degree is smaller than the divisor degree.",
      "多項式長除法反覆消去暫時餘式的最高次項，同時保持 f=gq+暫時餘式。過程只在餘式次數小於除式次數時停止。",
      "多项式长除法反复消去暂时余式的最高次项，同时保持 f=gq+暂时余式。过程只在余式次数小于除式次数时停止。"
    ),
    durationSeconds: 11.3,
    frames: [
      {
        label: text("Division identity", "除法恆等式", "除法恒等式"),
        value: text(
          "For nonzero g, polynomial division writes f(x)=g(x)q(x)+r(x) with deg r < deg g.",
          "對非零 g，多項式除法把 f(x) 寫成 f(x)=g(x)q(x)+r(x)，且 deg r < deg g。",
          "对非零 g，多项式除法把 f(x) 写成 f(x)=g(x)q(x)+r(x)，且 deg r < deg g。"
        ),
      },
      {
        label: text("Chapter example", "本章例子", "本章例子"),
        value: text(
          "Divide f=x^4-3x^3+2x^2+4x-1 by g=x^2-2x+3, building q and r one leading term at a time.",
          "用 g=x^2-2x+3 除 f=x^4-3x^3+2x^2+4x-1，逐個最高次項建立 q 與 r。",
          "用 g=x^2-2x+3 除 f=x^4-3x^3+2x^2+4x-1，逐个最高次项建立 q 与 r。"
        ),
      },
      {
        label: text("Cancel x^4", "消去 x^4", "消去 x^4"),
        value: text(
          "The leading ratio x^4/x^2 gives the first quotient term x^2; subtracting x^2g leaves -x^3-x^2+4x-1.",
          "最高次項比值 x^4/x^2 給出第一個商式項 x^2；減去 x^2g 後留下 -x^3-x^2+4x-1。",
          "最高次项比值 x^4/x^2 给出第一个商式项 x^2；减去 x^2g 后留下 -x^3-x^2+4x-1。"
        ),
      },
      {
        label: text("Cancel -x^3", "消去 -x^3", "消去 -x^3"),
        value: text(
          "Repeating the rule gives the second quotient term -x and updates the current remainder to -3x^2+7x-1.",
          "重複同一規則得到第二個商式項 -x，並把暫時餘式更新為 -3x^2+7x-1。",
          "重复同一规则得到第二个商式项 -x，并把暂时余式更新为 -3x^2+7x-1。"
        ),
      },
      {
        label: text("Stop by degree", "按次數停止", "按次数停止"),
        value: text(
          "The last quotient term is -3; the remainder x+8 has degree 1, which is smaller than deg(g)=2.",
          "最後商式項是 -3；餘式 x+8 的次數為 1，小於 deg(g)=2。",
          "最后商式项是 -3；余式 x+8 的次数为 1，小于 deg(g)=2。"
        ),
      },
      {
        label: text("Invariant", "不變量", "不变量"),
        value: text(
          "The final identity is f=(x^2-2x+3)(x^2-x-3)+(x+8), and the stepper below lets readers inspect the same updates.",
          "最後恆等式是 f=(x^2-2x+3)(x^2-x-3)+(x+8)，下方 stepper 可逐步檢查同一批更新。",
          "最后恒等式是 f=(x^2-2x+3)(x^2-x-3)+(x+8)，下方 stepper 可逐步检查同一批更新。"
        ),
      },
    ],
    summary: text(
      "Watch polynomial long division build quotient terms by canceling leading terms while preserving the identity f=gq+current remainder.",
      "觀看多項式長除法如何逐步消去最高次項來建立商式，同時保持 f=gq+暫時餘式。",
      "观看多项式长除法如何逐步消去最高次项来建立商式，同时保持 f=gq+暂时余式。"
    ),
    posterSrc: text(
      "/generated/animations/math1025/polynomial-division-remainder-story-en.png",
      "/generated/animations/math1025/polynomial-division-remainder-story-zh-hk.png",
      "/generated/animations/math1025/polynomial-division-remainder-story-zh-cn.png"
    ),
    title: text(
      "Polynomial division and remainder tracking",
      "多項式除法與餘式追蹤",
      "多项式除法与余式追踪"
    ),
    transcript: [
      text(
        "Polynomial division produces the identity f=gq+r, where the remainder has smaller degree than the divisor.",
        "多項式除法產生恆等式 f=gq+r，其中餘式次數小於除式次數。",
        "多项式除法产生恒等式 f=gq+r，其中余式次数小于除式次数。"
      ),
      text(
        "Each step chooses a quotient term by comparing the leading term of the current remainder with the leading term of g.",
        "每一步都比較暫時餘式的最高次項與 g 的最高次項，從而選出下一個商式項。",
        "每一步都比较暂时余式的最高次项与 g 的最高次项，从而选出下一个商式项。"
      ),
      text(
        "For the chapter example, the quotient is x^2-x-3 and the remainder is x+8.",
        "在本章例子中，商式是 x^2-x-3，餘式是 x+8。",
        "在本章例子中，商式是 x^2-x-3，余式是 x+8。"
      ),
    ],
    videoSrc: text(
      "/generated/animations/math1025/polynomial-division-remainder-story-en.mp4",
      "/generated/animations/math1025/polynomial-division-remainder-story-zh-hk.mp4",
      "/generated/animations/math1025/polynomial-division-remainder-story-zh-cn.mp4"
    ),
  },
  "math1025-polynomial-gcd-irreducibility-story": {
    conclusion: text(
      "Polynomial gcd work has three linked layers: normalize associates to a monic gcd, preserve common divisors through the Euclidean remainder chain, and use Bezout to prove irreducible-polynomial divisibility tests.",
      "多項式 gcd 有三層連接：把相伴多項式標準化為 monic gcd，透過 Euclidean 餘式鏈保持共同因式，再用 Bézout 證明不可約多項式的整除判別。",
      "多项式 gcd 有三层连接：把相伴多项式标准化为 monic gcd，通过 Euclidean 余式链保持共同因式，再用 Bézout 证明不可约多项式的整除判别。"
    ),
    durationSeconds: 15.9,
    frames: [
      {
        label: text("Monic gcd", "Monic gcd", "Monic gcd"),
        value: text(
          "Scalar multiples such as x-1, 5x-5, and -2x+2 have the same divisibility behavior, so gcds are recorded using the monic representative.",
          "x-1、5x-5、-2x+2 這些常數倍有相同整除行為，所以 gcd 以 monic 代表記錄。",
          "x-1、5x-5、-2x+2 这些常数倍有相同整除行为，所以 gcd 以 monic 代表记录。"
        ),
      },
      {
        label: text("Euclidean invariant", "Euclidean 不變量", "Euclidean 不变量"),
        value: text(
          "From f=gq+r, the common divisors of f and g are exactly the common divisors of g and r; hence gcd(f,g)=gcd(g,r).",
          "由 f=gq+r 可知，f 與 g 的共同因式正好就是 g 與 r 的共同因式；所以 gcd(f,g)=gcd(g,r)。",
          "由 f=gq+r 可知，f 与 g 的共同因式正好就是 g 与 r 的共同因式；所以 gcd(f,g)=gcd(g,r)。"
        ),
      },
      {
        label: text("Example chain", "例子餘式鏈", "例子余式链"),
        value: text(
          "For the chapter example, the remainders are r1=-6x^2-3x+9, r2=-x+1, and then 0.",
          "在本章例子中，餘式依次是 r1=-6x^2-3x+9、r2=-x+1，然後是 0。",
          "在本章例子中，余式依次是 r1=-6x^2-3x+9、r2=-x+1，然后是 0。"
        ),
      },
      {
        label: text("Back-substitution", "回代", "回代"),
        value: text(
          "The last nonzero remainder -x+1 is normalized to x-1, then reversed into x-1=(-1/3x+1/3)f+(2/3x^2-2/3x-1)g.",
          "最後非零餘式 -x+1 標準化為 x-1，再回代成 x-1=(-1/3x+1/3)f+(2/3x^2-2/3x-1)g。",
          "最后非零余式 -x+1 标准化为 x-1，再回代成 x-1=(-1/3x+1/3)f+(2/3x^2-2/3x-1)g。"
        ),
      },
      {
        label: text("Field dependence", "係數域依賴", "系数域依赖"),
        value: text(
          "Irreducibility depends on the field: x^2-2 changes between Q and R, while x^2+1 changes between R and C.",
          "不可約性取決於係數域：x^2-2 在 Q 與 R 之間改變，x^2+1 在 R 與 C 之間改變。",
          "不可约性取决于系数域：x^2-2 在 Q 与 R 之间改变，x^2+1 在 R 与 C 之间改变。"
        ),
      },
      {
        label: text("Prime-like role", "類似質數", "类似质数"),
        value: text(
          "If p is irreducible and p does not divide a, Bezout gives ua+vp=1; multiplying by b explains why p|ab forces p|b.",
          "若 p 不可約且 p 不整除 a，Bézout 給出 ua+vp=1；乘以 b 便解釋 p|ab 為何迫使 p|b。",
          "若 p 不可约且 p 不整除 a，Bézout 给出 ua+vp=1；乘以 b 便解释 p|ab 为何迫使 p|b。"
        ),
      },
    ],
    summary: text(
      "Watch the polynomial Euclidean algorithm produce a monic gcd, reverse into a Bezout identity, and support field-dependent irreducibility tests.",
      "觀看多項式 Euclidean algorithm 如何產生 monic gcd、回代成 Bézout 恆等式，並支撐依係數域而定的不可約判別。",
      "观看多项式 Euclidean algorithm 如何产生 monic gcd、回代成 Bézout 恒等式，并支撑依系数域而定的不可约判别。"
    ),
    posterSrc: text(
      "/generated/animations/math1025/polynomial-gcd-irreducibility-story-en.png",
      "/generated/animations/math1025/polynomial-gcd-irreducibility-story-zh-hk.png",
      "/generated/animations/math1025/polynomial-gcd-irreducibility-story-zh-cn.png"
    ),
    title: text(
      "Polynomial gcds, Bezout, and irreducibility",
      "多項式 gcd、Bézout 與不可約性",
      "多项式 gcd、Bézout 与不可约性"
    ),
    transcript: [
      text(
        "Polynomial gcds are normalized by choosing a monic representative among scalar multiples.",
        "多項式 gcd 會在常數倍之中選 monic 代表作標準化。",
        "多项式 gcd 会在常数倍之中选 monic 代表作标准化。"
      ),
      text(
        "The Euclidean step f=gq+r keeps the same common divisors, so the last nonzero remainder gives the gcd after normalization.",
        "Euclidean step f=gq+r 保持同一批共同因式，所以最後非零餘式標準化後就是 gcd。",
        "Euclidean step f=gq+r 保持同一批共同因式，所以最后非零余式标准化后就是 gcd。"
      ),
      text(
        "Back-substitution gives a Bezout identity, and that identity powers the prime-like divisibility tests for irreducible polynomials.",
        "回代給出 Bézout 恆等式，而這個恆等式支撐不可約多項式像質數一樣的整除判別。",
        "回代给出 Bézout 恒等式，而这个恒等式支撑不可约多项式像质数一样的整除判别。"
      ),
    ],
    videoSrc: text(
      "/generated/animations/math1025/polynomial-gcd-irreducibility-story-en.mp4",
      "/generated/animations/math1025/polynomial-gcd-irreducibility-story-zh-hk.mp4",
      "/generated/animations/math1025/polynomial-gcd-irreducibility-story-zh-cn.mp4"
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
