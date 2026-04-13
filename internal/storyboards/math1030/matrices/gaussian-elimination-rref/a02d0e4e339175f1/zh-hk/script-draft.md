# Script Draft (zh-hk)

Audience: 線性代數入門

## Concept Intro
Goal: 把消元法定位為結構閱讀程序。

- 在增廣矩陣中定義主元與主元列。
- 比較 REF 與 RREF 的閱讀能力。
- 用階梯形直觀說明主元安排。

Math blocks:
- `\text{REF}\subset\text{RREF}`

## Theorem Statement
Goal: 以形式不變量支撐每一步運算。

- 陳述列等價矩陣對應等價方程組。
- 指出每一步都要記錄列運算符號。
- 補充矛盾列的判讀。

Math blocks:
- `A\sim B \Rightarrow \mathcal{S}(A)=\mathcal{S}(B)`

## Example Walkthrough
Goal: 由原方程組完整推到最簡列階梯形。

- 先消主元下方元素去到 REF。
- 再標準化主元並清主元上方去到 RREF。
- 最後直接讀出未知數。

Math blocks:
- `R_2\leftarrow R_2-R_1`

## Recap Checkpoints
Goal: 由 RREF 快速分辨唯一解、無限多解、無解。

- 無矛盾且每個變數列都有主元：唯一解。
- 有自由變數：無限多解。
- 出現矛盾列：無解。
