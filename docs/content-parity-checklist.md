# Content parity checklist

Use this checklist before you mark a textbook unit ready. The goal is not only
to have three files on disk. The goal is to keep the meaning, navigation, and
export output aligned across all written languages.

## Current parity status

The following units are currently present in EN, zh-HK, and zh-CN.

- `math1090`: 1.1 propositional logic, 1.2 truth tables and equivalence,
  1.3 quantifiers and negation, 2.1 sets and set operations, 2.2 functions and
  relations
- `math1030`: 1.1 equations and solution sets, 2.1 matrix basics,
  2.2 augmented matrices and row operations, 2.3 Gaussian elimination and
  RREF, 2.4 solution-set types, 5.1 invertible matrices

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

- Later `math1090` and `math1030` units are not authored yet, so parity is
  limited to the first source-backed milestone units.
- zh-HK wording still needs a dedicated Hong Kong terminology review beyond the
  currently shipped glossary items.
- TXT and PDF export need a final visual QA pass on all localized units.

## Next steps

Use this checklist while you verify the first milestone units, then extend it
as new chapters are added.
