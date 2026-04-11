# Terminology glossary

This glossary records the approved terms for the currently implemented units.
Use it for page copy, glossary popovers, sidebar labels, export text, and
translation review. The goal is not literal translation. The goal is stable
mathematical meaning with natural beginner-facing wording.

## Current approved terms

The table below covers the first source-backed milestone units in the current
implementation.

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
| System of linear equations | system of linear equations | 線性方程組 | 线性方程组 | Read as a full system, not isolated equations. | MATH1030 notes |
| Matrix | matrix | 矩陣 | 矩阵 | Hong Kong teaching normally uses “矩陣”. | MATH1030 notes |
| Augmented matrix | augmented matrix | 增廣矩陣 | 增广矩阵 | Keep the “augmented” part visible. | MATH1030 notes |
| Row operation | row operation | 行變換 | 行变换 | Use the operation wording, not just “move rows.” | MATH1030 notes |
| RREF | reduced row-echelon form | 最簡行階梯形 | 最简行阶梯形 | Keep the acronym `RREF` in all languages. | MATH1030 notes |
| Solution set | solution set | 解集 | 解集 | Explain whether the set has one, many, or no solutions. | MATH1030 notes |
| Invertible matrix | invertible matrix | 可逆矩陣 | 可逆矩阵 | Keep the link to the inverse matrix explicit. | MATH1030 notes |

## Usage rules

Apply these rules whenever you add or revise textbook content.

- Keep the English term in unit metadata so search and linking remain stable.
- Treat zh-HK as a real writing target, not a character-converted copy of
  zh-CN.
- Keep notation identical across languages unless you add a notation note.
- Add new terms only after the source audit supports them. Otherwise mark the
  affected unit `MISSING_SOURCE`.

## Next steps

Expand this glossary when you add later `math1030` vector-space units or later
`math1090` number-system units, and review every new zh-HK term before it is
treated as approved.
