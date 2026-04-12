# Content parity checklist

Use this checklist before you mark a note unit ready. The goal is not only to
have three files on disk. The goal is to keep the meaning, navigation, and
export output aligned across all written languages.

## Current parity status

The following units are currently present in EN, zh-HK, and zh-CN.

- `math1090`: 1.1 propositional logic, 1.2 truth tables and equivalence,
  1.3 quantifiers and negation, 2.1 sets and set operations, 2.2 functions and
  relations, 3.1 natural numbers and Peano axioms, 3.2 induction and recursive
  arithmetic, 3.3 integers from equivalence classes, 3.4 rationals and
  well-defined operations, 3.5 gaps in `Q` and `sqrt(2)`
- `math1030`: 1.1 equations and solution sets, 2.1 matrix basics,
  2.2 augmented matrices and row operations, 2.3 Gaussian elimination and
  RREF, 2.4 solution-set types, 3.1 matrix addition, subtraction, and scalar
  multiplication, 3.2 matrix multiplication and linear systems,
  3.3 transposes, symmetric matrices, and skew-symmetric matrices,
  3.4 special matrices, 3.5 block matrices, 5.1 invertible matrices,
  6.1 vector spaces, 6.2 subspaces, 6.3 linear combinations and span,
  6.4 linear dependence and independence, 6.5 basis and dimension

## Unit checklist

Run this checklist on every localized unit.

- Confirm the unit has one stable `unitId` and one route per locale.
- Confirm the English, zh-HK, and zh-CN pages all exist.
- Confirm the heading structure is parallel enough that the page table of
  contents stays comparable across languages.
- Confirm notation and displayed formulas are unchanged across languages.
- Confirm prerequisite links resolve to the matching localized route.
- Confirm glossary terms match `docs/terminology-glossary.md`.
- Confirm export produces the current unit only.
- Confirm interactive widgets degrade into readable static study content.
- Confirm the page shows `MISSING_SOURCE` if the source set is incomplete.

## Known parity gaps

The following gaps remain active.

- Later `math1090` units and post-Chapter-3 `math1030` units are not authored
  yet, so parity is limited to the current source-backed note set.
- zh-HK wording still needs a dedicated Hong Kong terminology review beyond the
  newer matrix-algebra, number-system, and vector-space units.
- TXT and PDF export need a final visual QA pass on all localized units.

## Next steps

Use this checklist while you verify the current note set, then extend it as new
source-backed chapters are added.
