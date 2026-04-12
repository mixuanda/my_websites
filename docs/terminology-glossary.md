# Terminology glossary

This glossary records the approved terms for the currently implemented note
units. Use it for page copy, glossary popovers, sidebar labels, export text,
and translation review. The goal is not literal translation. The goal is
stable mathematical meaning with natural beginner-facing wording.

## Current approved terms

The table below covers the current source-backed note set in the implementation.

| Concept | English | zh-HK | zh-CN | Spoken-language note | Source trace |
| --- | --- | --- | --- | --- | --- |
| Proposition | proposition | 命題 | 命题 | Use plain “命題 / 命题” in writing. | MATH1090 logic |
| Conditional statement | conditional statement | 條件命題 | 条件命题 | Keep the logical role explicit. | MATH1090 logic |
| Truth table | truth table | 真值表 | 真值表 | Keep the same term in all variants. | MATH1090 logic |
| Logical equivalence | logical equivalence | 邏輯等價 | 逻辑等价 | Avoid mixing with “equivalent statement.” | MATH1090 logic |
| Quantifier | quantifier | 量詞 | 量词 | Distinguish 全稱 / 存在 clearly. | MATH1090 logic |
| Set | set | 集合 | 集合 | Cantonese classroom phrasing often adds “元素組成”. | MATH1090 sets |
| Function | function | 函數 | 函数 | zh-HK keeps `函數`, not converted Simplified text. | MATH1090 functions |
| Relation | relation | 關係 | 关系 | Keep “有序對” language explicit when needed. | MATH1090 relations |
| Natural number | natural number | 自然數 | 自然数 | Keep the Peano context explicit when relevant. | MATH1090 numbers |
| Induction | induction | 歸納法 | 归纳法 | Distinguish the base case from the induction step. | MATH1090 numbers |
| Integer | integer | 整數 | 整数 | Keep the equivalence-class construction visible when needed. | MATH1090 numbers |
| Rational number | rational number | 有理數 | 有理数 | Pair with “well-defined” language in construction notes. | MATH1090 numbers |
| Irrational number | irrational number | 無理數 | 无理数 | Avoid replacing it with vague “not rational” wording in definitions. | MATH1090 numbers |
| System of linear equations | system of linear equations | 線性方程組 | 线性方程组 | Read as a full system, not isolated equations. | MATH1030 notes |
| Matrix | matrix | 矩陣 | 矩阵 | Hong Kong teaching normally uses “矩陣”. | MATH1030 notes |
| Zero matrix | zero matrix | 零矩陣 | 零矩阵 | Keep it tied to additive identity language. | MATH1030 matrix algebra |
| Matrix multiplication | matrix multiplication | 矩陣乘法 | 矩阵乘法 | Emphasize row-by-column rather than vague “multiply matrices”. | MATH1030 matrix algebra |
| Transpose | transpose | 轉置 | 转置 | Keep notation as `A^T` in all language variants. | MATH1030 matrix algebra |
| Symmetric matrix | symmetric matrix | 對稱矩陣 | 对称矩阵 | Tie it to equality with the transpose. | MATH1030 matrix algebra |
| Skew-symmetric matrix | skew-symmetric matrix | 反對稱矩陣 | 反对称矩阵 | Use `反對稱 / 反对称` as the primary written term. | MATH1030 matrix algebra |
| Diagonal matrix | diagonal matrix | 對角矩陣 | 对角矩阵 | Explain it through off-diagonal zeros. | MATH1030 matrix algebra |
| Triangular matrix | triangular matrix | 三角矩陣 | 三角矩阵 | Say explicitly which side of the diagonal is zero. | MATH1030 matrix algebra |
| Identity matrix | identity matrix | 單位矩陣 | 单位矩阵 | Keep the “does nothing under multiplication” meaning visible. | MATH1030 matrix algebra |
| Elementary matrix | elementary matrix | 初等矩陣 | 初等矩阵 | Link it directly to one row operation on `I`. | MATH1030 matrix algebra |
| Block matrix | block matrix | 分塊矩陣 | 分块矩阵 | Stress that block partitions must match before blockwise addition. | MATH1030 matrix algebra |
| Augmented matrix | augmented matrix | 增廣矩陣 | 增广矩阵 | Keep the “augmented” part visible. | MATH1030 notes |
| Row operation | row operation | 行變換 | 行变换 | Use the operation wording, not just “move rows.” | MATH1030 notes |
| Pivot | pivot | 主元 | 主元 | Keep it tied to reading matrix structure, not only mechanics. | MATH1030 notes |
| Free variable | free variable | 自由變量 | 自由变量 | Explain it as a variable without a pivot. | MATH1030 notes |
| RREF | reduced row-echelon form | 最簡行階梯形 | 最简行阶梯形 | Keep the acronym `RREF` in all languages. | MATH1030 notes |
| Solution set | solution set | 解集 | 解集 | Explain whether the set has one, many, or no solutions. | MATH1030 notes |
| Invertible matrix | invertible matrix | 可逆矩陣 | 可逆矩阵 | Keep the link to the inverse matrix explicit. | MATH1030 notes |
| Vector space | vector space | 向量空間 | 向量空间 | Use the full term before shortening explanations. | MATH1030 vector spaces |
| Subspace | subspace | 子空間 | 子空间 | Tie the term to the closure test in beginner-facing prose. | MATH1030 vector spaces |
| Span | span | 張成 | 张成 | Avoid mixing it with “generate” unless you explain the relation. | MATH1030 vector spaces |
| Linear independence | linear independence | 線性獨立 | 线性独立 | Keep the “only trivial relation” idea explicit. | MATH1030 vector spaces |
| Basis | basis | 基底 | 基底 | Keep the dual role of spanning plus independence visible. | MATH1030 vector spaces |
| Dimension | dimension | 維數 | 维数 | Explain it as the size of a basis, not only as a number. | MATH1030 vector spaces |

## Usage rules

Apply these rules whenever you add or revise math note content.

- Keep the English term in unit metadata so search and linking remain stable.
- Treat zh-HK as a real writing target, not a character-converted copy of
  zh-CN.
- Keep notation identical across languages unless you add a notation note.
- Add new terms only after the source audit supports them. Otherwise mark the
  affected unit `MISSING_SOURCE`.

## Next steps

Expand this glossary when you add later source-backed units, and review every
new zh-HK term before it is treated as approved.
