# Content parity checklist

Use this checklist before you mark a note unit ready. The goal is not only to
have three files on disk. The goal is to keep the meaning, navigation, and
export output aligned across all written languages.

## Latest resume state

As of April 13, 2026, the latest local parity-related checkpoints are:

- `9085148` `Fix note block prompt rendering`
- `49345a4` `Fix set note reveal integrity`
- `0526751` `Deepen augmented matrix notes`

The current local workspace also includes synchronized rewrites of `math1090`
unit `3.4` and `math1030` unit `2.4` in EN, zh-HK, and zh-CN. Those rewrites
remove public source-process phrasing and keep the same theorem / example /
quick-check order across all three locales. The same is now true for
`math1030` units `6.1` and `6.3`.

Every push attempt for those checkpoints failed with the same external error:
`ssh: Could not resolve hostname github.com: Temporary failure in name
resolution`.

The next resume point is to expand the next source-backed MATH1030 unit in EN,
zh-HK, and zh-CN together rather than deepening English first and translating
later.

The current local workspace also includes a shared `QuickCheck` renderer update
that makes prompt cards visible by default. When the next unit is expanded, the
three locales should be re-checked with that visible-prompt behavior in mind.

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
  independence, 6.5 basis and dimension, 6.6 column space / row space / rank,
  7.1 determinants and cofactor expansion, 7.2 row operations / products /
  invertibility, 7.3 transpose / column operations / Cramer's rule, 8.1
  eigenvalues / eigenvectors / eigenspaces, 8.2 diagonalization / similarity,
  8.3 characteristic polynomials / diagonalization tests, 9.1 inner products /
  norms / angles, 9.2 orthogonal sets / orthonormal bases, 9.3 Gram-Schmidt,
  9.4 Cauchy-Schwarz / triangle inequalities

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

- Later `math1090` units and the post-eigenvalue `math1030` chapters are not
  authored yet, so parity is limited to the current source-backed note set.
- zh-HK wording still needs a dedicated Hong Kong terminology review beyond the
  newer number-system and vector-space units.
- TXT and PDF export need a final visual QA pass on all localized units.

## Next steps

Use this checklist while you verify the current note set, then extend it as new
source-backed chapters are added.

## Checkpoint log

This log records parity-impacting checkpoints so the three-language note set
stays resumable across implementation cycles.

### 2026-04-13 checkpoint 1: textbook inline notation rendering

This checkpoint improved rendering in the shared textbook MDX layer, so it
applies to all three locales at once.

- Checkpoint name: Shared rendering pass across EN, zh-HK, and zh-CN
- What was inspected: representative units in all three supported languages,
  especially MATH1030 and MATH1090 units that use dense inline notation in the
  article body and in block prompts
- What was changed: textbook inline code now promotes obvious mathematical
  notation to KaTeX in the shared renderer instead of leaving it in code
  styling; the change is locale-neutral and therefore parity-preserving
- What was verified: the rendering logic was changed in the shared textbook MDX
  component layer rather than in one locale-specific content file
- Files touched: `src/components/textbook/mdx-blocks.tsx`,
  `src/components/textbook/mdx-components.tsx`,
  `docs/content-parity-checklist.md`,
  `docs/rendering-formatting-qa.md`,
  `docs/exercise-solution-integrity.md`,
  `docs/reference-coverage.md`
- Remaining issues: the authored `QuickCheck` / `RevealSolution` pairing still
  needs a shared component-level fix and then a parity re-check
- Exact next target: fix the shared `QuickCheck` structure so exercise prompts
  and answer disclosure behave consistently in all locales
- Commit created: pending until this checkpoint commit is written
- Push succeeded: pending until this checkpoint push is attempted
- Current resume point: continue in the shared textbook MDX block components
  before making any locale-specific note edits

### 2026-04-13 checkpoint 4: shared quick-check shell fix

This checkpoint changed the shared quick-check shell, so it applies to all
three locales at once.

- Checkpoint name: Shared quick-check shell fix across EN, zh-HK, and zh-CN
- What was inspected: representative units in all three supported languages,
  especially MATH1030 and MATH1090 units that pair `QuickCheck` with a
  following `RevealSolution`
- What was changed: `QuickCheck` now renders as a visible shared prompt card,
  which matches the authored multilingual note structure and preserves parity
  across locales
- What was verified: the change lives in the shared textbook MDX block layer
  rather than in one locale-specific content file
- Files touched: `src/components/textbook/mdx-blocks.tsx`,
  `docs/content-parity-checklist.md`,
  `docs/rendering-formatting-qa.md`,
  `docs/exercise-solution-integrity.md`,
  `docs/reference-coverage.md`
- Remaining issues: representative localized pages still need visual QA and
  export QA once the environment can run a platform-matched build
- Exact next target: keep parity checks attached to the next source-backed
  content expansion rather than letting the three locales drift
- Commit created: pending until this checkpoint commit is written
- Push succeeded: pending until this checkpoint push is attempted
- Current resume point: continue from the next shared content expansion with
  the quick-check contract aligned in all locales

### 2026-04-13 checkpoint 5: invertibility expansion kept in parity

This checkpoint deepened one existing source-backed note in all three
languages.

- Checkpoint name: Three-language expansion of `5.1 Invertible matrices`
- What was inspected: the EN, zh-HK, and zh-CN versions of
  `content/textbook/math1030/invertibility/invertible-matrices/*.mdx`
- What was changed: added parallel sections on row-equivalence through
  invertible matrices, preserved column relations, uniqueness of RREF, rank,
  and two matching quick checks in all three locales
- What was verified: the new major sections and quick-check / reveal ordering
  remain parallel across EN, zh-HK, and zh-CN, and the shared catalog now cites
  the additional source packets
- Files touched: `content/textbook/math1030/invertibility/invertible-matrices/en.mdx`,
  `content/textbook/math1030/invertibility/invertible-matrices/zh-hk.mdx`,
  `content/textbook/math1030/invertibility/invertible-matrices/zh-cn.mdx`,
  `src/lib/textbook/catalog.ts`,
  `docs/content-parity-checklist.md`,
  `docs/reference-coverage.md`,
  `docs/rendering-formatting-qa.md`,
  `docs/exercise-solution-integrity.md`
- Remaining issues: page-level visual QA and export QA are still blocked by the
  current mixed-platform build environment
- Exact next target: carry the same parity discipline into the next MATH1030
  basis / dimension expansion
- Commit created: yes, `95f3ad7` (`Deepen invertible matrix notes`)
- Push succeeded: no. `git push origin main` failed with
  `ssh: Could not resolve hostname github.com: Temporary failure in name resolution`
- Current resume point: once connectivity and build verification are available
  again, continue from the next source-backed MATH1030 unit rather than
  reopening `5.1`
