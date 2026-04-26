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

April 24, 2026 parity update:

- zh-HK related-note links were normalized back to the public `/zh-hk/notes/**`
  route after a bad localized path appeared in several Math1090 pages;
- localized MATH1030 related-note labels now avoid leftover English titles in
  `solution-set-types` and `invertible-matrices`;
- public math prose was cleaned so source-tracking remains internal while the
  live pages read as serious note articles.
- CSCI2520 was expanded in synchronized EN / zh-HK / zh-CN files for lists,
  selection and non-comparison sorting, binary trees / BSTs, graph traversal,
  topological sorting, heaps, and Huffman coding.
- MATH1090 `3.3` and `3.4` were expanded in synchronized EN / zh-HK / zh-CN
  files with matching interactive placements, added exercise / solution pairs,
  and shared checkpoint questions.

April 25, 2026 MATH1030 exercise / TOC update:

- MATH1030 now has at least one checkpoint problem attached to every public
  unit, including the previously uncovered systems, matrix-basics,
  augmented-matrix, solution-type, and vector-space units.
- Practice prompt, choice, hint, and solution strings now use the shared inline
  math renderer so WebWork-like checkpoint text does not display raw math
  markup.
- The page TOC now defaults to article-level headings through `h3`, so
  definition, theorem, example, quick-check, and solution card titles no longer
  overwhelm the contents list.
- `docs/math-notes-authoring-memory.md` records the durable expectation that
  future MATH1030 / MATH1090 units should combine textbook-style prose,
  purposeful interaction, useful visuals, and source-backed exercises.
- `math1030` `2.1 Matrix basics` now has parallel EN / zh-HK / zh-CN additions:
  prerequisite preparation, a matrix anatomy figure, a matrix-reading
  interaction, a problem-solving routine, and expanded checkpoint questions.
- `math1030` `5.1 Invertible matrices` now has parallel EN / zh-HK / zh-CN
  additions: prerequisite preparation, one-sided inverse warnings, a practical
  invertibility-dictionary workflow, nonzero-null-vector examples, inverse
  solving examples, and extra checkpoint questions.
- `math1030` `4.2 Set language and solution sets` and `6.7 Matrix subspaces,
  bases, and dimension` were added in synchronized EN / zh-HK / zh-CN files;
  `6.5` received parallel dimension-theorem expansions, and `6.6` received a
  shared static rank map in all three languages.
- `math1030` `3.3 Row-operation matrices` was added in synchronized EN /
  zh-HK / zh-CN files; `6.3`, `6.4`, and `6.5` received parallel algorithmic
  additions for span membership, dependence via homogeneous systems, and
  minimal spanning set extraction.

## Current parity status

The following units are currently present in EN, zh-HK, and zh-CN.

- `math1090`: 1.1 propositional logic, 1.2 truth tables and equivalence,
  1.3 quantifiers and negation, 2.1 sets and set operations, 2.2 functions and
  relations, 3.1 natural numbers and Peano axioms, 3.2 induction and recursive
  arithmetic, 3.3 integers from equivalence classes, 3.4 rationals and
  well-defined operations, 3.5 gaps in `Q` and `sqrt(2)`, 4.1 total orders and
  ordered fields, 4.2 upper bounds / supremum / infimum, 4.3 completeness and
  gaps in `Q`, 4.4 axioms for the reals and first approximations, 4.5 Dedekind
  cuts and the embedding of `Q`, 4.6 decimal expansions and irrational
  numbers, 5.1 sequences and epsilon-`N` limits, 5.2 Cauchy sequences and
  another model of the reals, 5.3 delta-epsilon limits / limit laws /
  continuity, 6.1 cardinality / countability / cardinal inequalities, 6.2
  Cantor theorem / continuum / choice, 6.3 intervals / Cantor set / density /
  well-ordering, 7.1 binary operations / monoids / groups
- `math1030`: 1.1 equations and solution sets, 2.1 matrix basics,
  2.2 augmented matrices and row operations, 2.3 Gaussian elimination and
  RREF, 2.4 solution-set types, 3.1 matrix multiplication and identity
  matrices, 3.2 transpose and special matrices, 3.3 row-operation matrices,
  4.1 homogeneous systems and
  null space, 4.2 set language and solution sets, 5.1 invertible matrices, 6.1
  vector spaces, 6.2 subspaces, 6.3
  linear combinations and span, 6.4 linear dependence and independence, 6.5
  basis and dimension, 6.6 column space / row space / rank, 6.7 matrix
  subspaces / bases / dimension, 6.8 basis extension / change of basis, 7.1
  determinants and cofactor expansion, 7.2 row operations / products /
  invertibility, 7.3 transpose / column operations / Cramer's rule, 8.1 eigenvalues /
  eigenvectors / eigenspaces, 8.2 diagonalization / similarity, 8.3
  characteristic polynomials / diagonalization tests, 9.1 inner products /
  norms / angles, 9.2 orthogonal sets / orthonormal bases, 9.3 Gram-Schmidt,
  9.4 Cauchy-Schwarz / triangle inequalities
- `math1025`: 0.1 course foundations and notation, 1.1 equation structure and
  trigonometric identities, 2.1 mathematical induction, 3.1 inequalities and
  absolute value, 4.1 binomial coefficients and expansions
- `csci2520`: 0.1 pointers / memory / structs, 1.1 ADT operations, 1.2 hash
  tables and collision strategies, 2.1 lists as recursive ADTs, 3.1
  complexity growth and algorithmic cost, 3.2 selection / quickselect /
  linear-time sorting, 4.1 binary trees and BST operations, 5.1 graph
  traversal / spanning trees / shortest paths, 5.2 topological sort / heaps /
  Huffman coding

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

- Later Math1090 material beyond `4.4` and the post-eigenvalue `math1030`
  chapters are not authored yet, so parity is limited to the current
  source-backed note set.
- zh-HK wording still needs a dedicated Hong Kong terminology review beyond the
  newer number-system and vector-space units.
- TXT and PDF export need a final visual QA pass on all localized units.

## Next steps

Use this checklist while you verify the current note set, then extend it as new
source-backed chapters are added.

## Current MATH1030 parity note

- `6.8 Basis extension and change of basis` now exists in EN, zh-HK, and zh-CN
  with matching section order, theorem blocks, worked examples, quick checks,
  exercises, and localized prerequisite links.
- The unit is source-backed by `1030gi-n05-02p.pdf`,
  `1030gi-n05-02q.pdf`, and `1030gi-n05-02r.pdf`.
- Catalog order now places `6.8` after matrix subspaces and before the
  determinant chapter; later MATH1030 chapters retain their relative order.

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

### 2026-04-25 checkpoint 6: late-chapter MATH1030 examples kept in parity

This checkpoint deepened three already-authored late MATH1030 units in all
three supported written languages.

- Checkpoint name: Parallel EN, zh-HK, and zh-CN expansion of `8.2`, `9.1`,
  and `9.3`
- What was inspected: the localized diagonalization, inner-product angle, and
  Gram-Schmidt MDX files
- What was changed: each locale received the same instructional additions:
  a full `2 by 2` diagonalization example, an angle / polarization worked
  example, and a static Gram-Schmidt computation table
- What was verified: the additions keep the same mathematical data, ordering,
  and exercise targets across the three locales while allowing the actual prose
  to remain idiomatic in each language
- Remaining issues: browser and export QA still need to confirm that the new
  display math and table render cleanly after regeneration

### 2026-04-25 checkpoint 7: RREF uniqueness appendix kept in parity

This checkpoint adds one new MATH1030 appendix unit in all three supported
written languages.

- Checkpoint name: Parallel EN, zh-HK, and zh-CN authoring of `5.2 RREF
  uniqueness and well-defined rank`
- What was inspected: `reference/MATH1030/1030gi-n03-04p.pdf`, supporting
  column-relation material from `1030gi-n03-04.pdf`, and the existing
  localized `5.1` invertibility page
- What was changed: each locale now has the same theorem structure,
  induction-proof structure, concrete RREF example, rank definition, common
  mistakes, quick checks, and guided exercises
- What was verified: the three files keep matching section order and
  exercise-answer pairing while preserving locale-specific terminology such as
  zh-HK `樞軸欄` and zh-CN `主元列`; contentlayer, lint, production build,
  local route checks, representative TXT / PDF exports, and browser QA passed
- Remaining issues: broader assignment / tutorial exercise parity remains

### 2026-04-25 checkpoint 8: Matrix-algebra practice parity

This checkpoint strengthens an existing MATH1030 unit in all three supported
written languages.

- Checkpoint name: Parallel EN, zh-HK, and zh-CN expansion of `3.1 Matrix
  multiplication and identity matrices`
- What was inspected: `1030efghi-as01.pdf`, `1030efghi-as01as.pdf`,
  `Practice Set 2_Matrix Algebra.pdf`, `Practice Set 2_Solutions.pdf`, and
  the existing localized `3.1` note files
- What was changed: each locale now has the same added section on
  assignment-style traps, including unknown recovery from a partial product,
  noncommutative expansion, lower triangular closure, common mistakes, quick
  checks, and guided exercises
- What was verified: contentlayer, lint, build, local route / export checks,
  and zh-HK browser QA passed for the strengthened `3.1` unit; the three
  locales keep matching section order and exercise targets while using
  locale-specific terminology
- Remaining issues: later passes should continue with `as02` / `as03`
  assignment parity and higher-chapter export QA

### 2026-04-25 checkpoint 9: Homogeneous-solution parity

This checkpoint strengthens an existing MATH1030 unit in all three supported
written languages.

- Checkpoint name: Parallel EN, zh-HK, and zh-CN expansion of `4.1 Homogeneous
  systems and null space`
- What was inspected: `1030efghi-as02.pdf`, `1030efghi-as02as.pdf`, and the
  existing localized `4.1` note files
- What was changed: each locale received the same added section on moving from
  one particular solution to the whole solution set, including the proof that
  `v-u in N(A)`, a concrete `p+s q_1+t q_2` worked example, a scaling check
  for `2A` and `3b`, a common-mistake block, and a quick-check / reveal pair
- What was verified: contentlayer, lint, build, local route / export checks,
  and zh-HK browser QA passed for the strengthened `4.1` unit; the three
  files keep matching section order and exercise targets while using
  locale-specific terminology
- Remaining issues: `as03` assignment parity and broader export QA should
  follow

### 2026-04-25 checkpoint 10: as03 set-language and invertibility parity

This checkpoint strengthens two existing MATH1030 units in all three supported
written languages.

- Checkpoint name: Parallel EN, zh-HK, and zh-CN expansion of `4.2 Set
  language and solution sets` and `5.1 Invertible matrices`
- What was inspected: `1030efghi-as03.pdf`, `1030efghi-as03as.pdf`, and the
  existing localized `4.2` and `5.1` note files
- What was changed: each locale received the same added proof templates for
  stacked-null-space subset arguments, same-coefficient solution-set
  intersections, and cyclic product identities from `ABCD=I`
- What was verified: contentlayer, lint, build, local route / export checks,
  and zh-HK browser QA passed for the strengthened `4.2` and `5.1` units; the
  three locale files keep matching section order and exercise targets while
  using locale-specific terminology
- Remaining issues: full numerical `as03` row-reduction tables and longer
  polynomial-identity proofs remain exercise-depth backlog; broader export QA
  should continue

### 2026-04-26 checkpoint 11: RREF numerical drill parity

This checkpoint strengthens one existing MATH1030 unit in all three supported
written languages.

- Checkpoint name: Parallel EN, zh-HK, and zh-CN expansion of `2.3 Gaussian
  elimination and RREF`
- What was inspected: `1030efghi-as02.pdf`, `1030efghi-as02as.pdf`, the
  existing localized `2.3` note files, `src/lib/textbook/catalog.ts`, and
  `src/lib/textbook/problem-bank.ts`
- What was changed: each locale received the same assignment-style long RREF
  reduction, the same one-step near-RREF cleanup example, matching quick
  checks, guided exercises, and two new problem-bank checkpoint patterns
- What was verified: contentlayer, TypeScript, lint, build, local route /
  export checks, and zh-HK browser QA passed for the strengthened `2.3` unit;
  the three files keep matching section order and exercise targets while using
  locale-specific prose
- Remaining issues: later passes should focus on `as03` inverse computation
  and broader export QA rather than early RREF drill parity

### 2026-04-26 checkpoint 12: as03 invertibility-depth parity

This checkpoint strengthens one existing MATH1030 unit in all three supported
written languages.

- Checkpoint name: Parallel EN, zh-HK, and zh-CN expansion of `5.1 Invertible
  matrices`
- What was inspected: `1030efghi-as03.pdf`, `1030efghi-as03as.pdf`, the
  existing localized `5.1` note files, `src/lib/textbook/catalog.ts`, and
  `src/lib/textbook/problem-bank.ts`
- What was changed: each locale received the same practice-style
  parameterized inverse computation for `A_alpha`, determinant-free proof
  practice for vector identities and polynomial matrix expressions, matching
  quick checks, a guided commutativity exercise, and two new problem-bank
  checkpoint patterns
- What was verified: contentlayer, TypeScript, lint, build, local route /
  export checks on `127.0.0.1:3001`, and zh-HK browser QA in light and dark
  mode passed for the strengthened `5.1` unit; the three files keep matching
  section order and exercise targets while using locale-specific prose
- Remaining issues after this pass: the `as03` Q5 / Q6 / Q8 row-reduction
  table material was addressed by checkpoint 13; broader export QA remains

### 2026-04-26 checkpoint 13: as03 row-reduction table parity

This checkpoint strengthens one existing MATH1030 unit in all three supported
written languages.

- Checkpoint name: Parallel EN, zh-HK, and zh-CN expansion of `5.1 Invertible
  matrices`
- What was inspected: `1030efghi-as03.pdf`, `1030efghi-as03as.pdf`, the
  existing localized `5.1` note files, `src/lib/textbook/catalog.ts`, and
  `src/lib/textbook/problem-bank.ts`
- What was changed: each locale received the same supplied-row-reduction-table
  section, including Q5-style recovery of `A`, `A^{-1}`, and the solution of
  `A^t x=g`; Q6-style four-case invertibility decisions from pivot columns;
  Q8-style reading of `A^{-1}`, `(A^t)^{-1}`, and
  `F=A^4+3A^2+A-I_5`; matching quick checks; and two new problem-bank
  checkpoint patterns
- What was verified: contentlayer, TypeScript, lint, build, local route /
  export checks on `127.0.0.1:3002`, and browser QA for zh-HK / zh-CN
  language switching plus dark mode passed for the strengthened `5.1` unit;
  the three locale files keep matching section order and exercise targets
  while using locale-specific prose
- Remaining issues: broader export QA remains; exhaustive reproduction of
  every intermediate numerical row operation is intentionally left as optional
  QA-depth work rather than public-page clutter

### 2026-04-26 checkpoint 14: as02 row-operation product parity

This checkpoint strengthens one existing MATH1030 unit in all three supported
written languages.

- Checkpoint name: Parallel EN, zh-HK, and zh-CN expansion of `3.3
  Row-operation matrices`
- What was inspected: `1030efghi-as02.pdf`, `1030efghi-as02as.pdf`, the
  existing localized `3.3` note files, `src/lib/textbook/catalog.ts`, and
  `src/lib/textbook/problem-bank.ts`
- What was changed: each locale received the same six-step row-operation
  product section, including `H_1` through `H_6`, the combined multiplier
  `J=H_6H_5H_4H_3H_2H_1`, the equation `A_7=JA_1`, and a reverse-chain
  quick check; one new problem-bank checkpoint matches the same concept
- What was verified: contentlayer, TypeScript, lint, build, local route /
  export checks on `127.0.0.1:3002`, and browser QA for zh-HK dark-mode
  rendering plus zh-CN language switching passed for the strengthened `3.3`
  unit; the three locale files keep matching section order and exercise
  targets while using locale-specific prose
- Remaining issues: the parameterized `G/H` construction from `as02` Q2
  remains optional exercise-depth backlog
