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
  RREF, 2.4 solution-set types, 5.1 invertible matrices, 6.1 vector spaces,
  6.2 subspaces, 6.3 linear combinations and span, 6.4 linear dependence and
  independence, 6.5 basis and dimension

## Checkpoint log

This log records parity-relevant fixes and the next localization target.

### 2026-04-13 checkpoint 1: render parity in note-block prompts

This checkpoint fixed a cross-locale rendering defect and one zh-HK source typo
that affected prompt display parity.

- Checkpoint name: render parity in note-block prompts
- What was inspected:
  `src/components/textbook/mdx-blocks.tsx`, representative EN / zh-HK / zh-CN
  textbook files, and the zh-HK basis note prompt around the exercise section.
- What was changed:
  note-block prompt and title props now render inline notation consistently
  instead of showing literal backticks, and the zh-HK basis note no longer has
  the stray backtick in its final exercise prompt.
- What was verified:
  the zh-HK basis note now matches the EN and zh-CN prompt structure for that
  exercise, and the shared block renderer now applies to all three locales.
- Files touched:
  `src/components/textbook/mdx-blocks.tsx`,
  `content/textbook/math1030/vector-spaces/basis-and-dimension/zh-hk.mdx`,
  `docs/content-parity-checklist.md`,
  `docs/reference-coverage.md`,
  `docs/rendering-formatting-qa.md`,
  `docs/exercise-solution-integrity.md`.
- Remaining issues:
  the six set-theory files listed in
  `docs/exercise-solution-integrity.md` still need prompt / answer parity
  cleanup across all three languages.
- Exact next target:
  keep EN, zh-HK, and zh-CN aligned while normalizing the MATH1090 set-theory
  quick checks into prompt plus `RevealSolution` pairs.
- Commit created:
  yes. Created as `9085148` with message
  `Fix note block prompt rendering`.
- Push succeeded:
  no. `git push origin main` stalled, and the explicit batch-mode retry failed
  with `ssh: Could not resolve hostname github.com: Temporary failure in name
  resolution`.
- Current resume point:
  start parity-preserving edits in the three-language MATH1090 set-theory
  notes.

### 2026-04-13 checkpoint 2: set-theory quick-check parity

This checkpoint restored a consistent prompt / answer pattern across all three
languages in the MATH1090 set chapter.

- Checkpoint name: set-theory quick-check parity
- What was inspected:
  EN, zh-HK, and zh-CN versions of `set-operations` and
  `functions-relations`.
- What was changed:
  each of the six flagged quick checks now uses the same structure:
  `QuickCheck` for the learner-facing prompt or hint, followed immediately by
  `RevealSolution` for the answer.
- What was verified:
  the edited sections remain aligned across EN, zh-HK, and zh-CN, and no locale
  keeps the old inline-answer pattern.
- Files touched:
  the six MATH1090 set-theory note files plus the four tracking documents.
- Remaining issues:
  deeper parity work is still needed when new content is added, especially in
  later MATH1030 and MATH1090 chapters.
- Exact next target:
  preserve three-language structure while expanding the thin MATH1030 row
  operations note from the reference PDFs.
- Commit created:
  yes. Created as `49345a4` with message
  `Fix set note reveal integrity`.
- Push succeeded:
  no. The batch-mode retry failed with
  `ssh: Could not resolve hostname github.com: Temporary failure in name
  resolution`.
- Current resume point:
  commit checkpoint 2 and continue with a three-language-aware content
  deepening pass.

### 2026-04-13 checkpoint 3: parity-preserving rewrite of MATH1030 unit 2.2

This checkpoint deepened one source-backed MATH1030 note while preserving EN,
zh-HK, and zh-CN parity at the section level.

- Checkpoint name: parity-preserving rewrite of MATH1030 unit 2.2
- What was inspected:
  EN, zh-HK, and zh-CN versions of `augmented-matrices-row-operations`, plus
  the extracted reference text used to guide the rewrite.
- What was changed:
  rewrote all three localized files together so they now share the same article
  structure, theorem flow, worked example, common mistakes, quick checks, and
  guided exercises.
- What was verified:
  the three locales keep aligned section order and mathematical content, and the
  new exercises appear in the same sequence with matching reveal blocks.
- Files touched:
  the three localized `2.2` note files,
  `src/components/textbook/mdx-blocks.tsx`,
  `src/components/textbook/mdx-components.tsx`,
  and the four tracking documents.
- Remaining issues:
  later units still need the same parity discipline as they are expanded.
- Exact next target:
  keep EN, zh-HK, and zh-CN aligned while deepening the next source-backed
  MATH1030 unit in the chapter 2 to 3 sequence.
- Commit created:
  pending at the time of this doc update; the checkpoint commit follows this
  documentation step.
- Push succeeded:
  pending at the time of this doc update; push will be retried in batch mode.
- Current resume point:
  commit the `2.2` parity-preserving rewrite and continue with the next
  three-language content pass.

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
  limited to the current source-backed note set.
- zh-HK wording still needs a dedicated Hong Kong terminology review beyond the
  newer number-system and vector-space units.
- TXT and PDF export need a final visual QA pass on all localized units.

## Next steps

Use this checklist while you verify the current note set, then extend it as new
source-backed chapters are added.
