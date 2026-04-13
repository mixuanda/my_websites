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
| Well-defined | well-defined | 良定 | 良定 | Use when a formula does not depend on the chosen representative. | MATH1090 numbers |
| Upper bound | upper bound | 上界 | 上界 | Keep it distinct from maximum. | MATH1090 reals |
| Lower bound | lower bound | 下界 | 下界 | Keep it distinct from minimum. | MATH1090 reals |
| Supremum | supremum | 上確界 | 上确界 | Keep the least-upper-bound wording explicit. | MATH1090 reals |
| Infimum | infimum | 下確界 | 下确界 | Keep the greatest-lower-bound wording explicit. | MATH1090 reals |
| Complete ordered set | complete ordered set | 完備有序集 | 完备有序集 | Do not shorten this to a vague “complete system.” | MATH1090 reals |
| Irrational number | irrational number | 無理數 | 无理数 | Avoid replacing it with vague “not rational” wording in definitions. | MATH1090 numbers |
| System of linear equations | system of linear equations | 線性方程組 | 线性方程组 | Read as a full system, not isolated equations. | MATH1030 notes |
| Matrix | matrix | 矩陣 | 矩阵 | Hong Kong teaching normally uses “矩陣”. | MATH1030 notes |
| Augmented matrix | augmented matrix | 增廣矩陣 | 增广矩阵 | Keep the “augmented” part visible. | MATH1030 notes |
| Row operation | row operation | 行變換 | 行变换 | Use the operation wording, not just “move rows.” | MATH1030 notes |
| Pivot | pivot | 主元 | 主元 | Keep it tied to reading matrix structure, not only mechanics. | MATH1030 notes |
| Dependent variable | dependent variable | 主變量 | 主变量 | Pair with pivot-column language. | MATH1030 systems |
| Free variable | free variable | 自由變量 | 自由变量 | Explain it as a variable without a pivot. | MATH1030 notes |
| Consistent system | consistent system | 一致系統 | 一致系统 | Use this for a system that has at least one solution. | MATH1030 systems |
| Inconsistent system | inconsistent system | 不一致系統 | 不一致系统 | Tie it to contradiction rows such as `0 = 1`. | MATH1030 systems |
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
