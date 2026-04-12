# Reference coverage

This document tracks every non-sidecar item under `reference/` that is relevant
to the math notes system. It is the working ledger for deciding whether a
source has already been incorporated into the public Notes section, merged into
another authored note, deferred, or blocked.

## Latest resume state

As of April 13, 2026, the latest local source-processing checkpoints are:

- `9085148` `Fix note block prompt rendering`
- `49345a4` `Fix set note reveal integrity`
- `0526751` `Deepen augmented matrix notes`

Every push attempt for those checkpoints failed with the same external error:
`ssh: Could not resolve hostname github.com: Temporary failure in name
resolution`.

The next resume point is the next highest-value source-backed MATH1030 unit:
either `2.3 Gaussian elimination and RREF` or the `n03-*` invertibility notes.

The current local workspace also includes a shared `QuickCheck` renderer update
that makes prompts visible by default. That structural cleanup should be
verified together with the next content pass rather than treated as isolated UI
decoration.

The tables below use these status labels:

- `incorporated`: already represented in public notes or in shared glossary and
  metadata.
- `partially incorporated`: some material is live, but the source still
  contains teachable sections not yet authored as note pages.
- `overlap`: mainly duplicate, answer-key, or reinforcement material already
  merged into another authored note.
- `pending`: audited and usable, but not yet authored into a public note.
- `blocked`: unreadable, weak, stray, or not actually course material.

`*:Zone.Identifier` files are Windows metadata sidecars, not learning sources,
so they are intentionally excluded from the tables. `reference/rerference/` is
currently empty.

## Checkpoint log

This log records the latest implementation checkpoints that affected source
coverage decisions or the next source-backed target.

### 2026-04-13 checkpoint 1: rendering and note-block titles

This checkpoint focused on the render path rather than new source ingestion,
but it still changes the immediate coverage work order.

- Checkpoint name: rendering and note-block title formatting
- What was inspected:
  `AGENTS.md`, `contentlayer.config.ts`, `src/app/globals.css`,
  `src/components/Mdx.tsx`, `src/components/textbook/TextbookMdx.tsx`,
  `src/components/textbook/mdx-components.tsx`,
  `src/components/textbook/mdx-blocks.tsx`,
  `src/app/[locale]/notes/[course]/[chapter]/[unit]/page.tsx`,
  representative `content/textbook/**` units, and current reference coverage
  notes.
- What was changed:
  no source coverage state changed yet; the active work shifted to a rendering
  fix so note titles and quick-check prompts can display inline math and
  notation instead of raw backticks.
- What was verified:
  a KaTeX smoke check with the local Windows Node runtime succeeded, and the
  malformed zh-HK basis prompt was corrected in source.
- Files touched:
  `src/components/textbook/mdx-blocks.tsx`,
  `content/textbook/math1030/vector-spaces/basis-and-dimension/zh-hk.mdx`,
  `docs/reference-coverage.md`,
  `docs/rendering-formatting-qa.md`,
  `docs/exercise-solution-integrity.md`,
  `docs/content-parity-checklist.md`.
- Remaining issues:
  source-backed coverage remains incomplete beyond the currently authored
  chapters, and the next structural checkpoint is still exercise / solution
  integrity.
- Exact next target:
  normalize the six MATH1090 set-theory units whose `QuickCheck` blocks contain
  answers directly instead of pairing each prompt with a following
  `RevealSolution`.
- Commit created:
  yes. Created as `9085148` with message
  `Fix note block prompt rendering`.
- Push succeeded:
  no. `git push origin main` stalled, and the explicit batch-mode retry failed
  with `ssh: Could not resolve hostname github.com: Temporary failure in name
  resolution`.
- Current resume point:
  start checkpoint 2 with the six MATH1090 set-theory files and the
  `QuickCheck` / `RevealSolution` pairing audit.

### 2026-04-13 checkpoint 2: set-theory integrity cleanup

This checkpoint did not add new source-backed units, but it completed a known
content integrity repair in the existing MATH1090 set-theory coverage.

- Checkpoint name: set-theory integrity cleanup
- What was inspected:
  the six MATH1090 set-theory files previously flagged for answer drift.
- What was changed:
  converted embedded answers inside `QuickCheck` blocks into proper
  `RevealSolution` pairs across EN, zh-HK, and zh-CN.
- What was verified:
  each edited quick check now contains only the learner prompt or hint, and the
  answer lives in the following reveal block.
- Files touched:
  the six MATH1090 set-theory note files plus the four tracking documents.
- Remaining issues:
  the next source-backed content gain should come from a thin MATH1030 note
  rather than another bookkeeping-only pass.
- Exact next target:
  expand `2.2 Augmented matrices and row operations` with direct support from
  `reference/MATH1030/1030gi-n02-01.pdf`, related tutorial material, and the
  master note packet where relevant.
- Commit created:
  yes. Created as `49345a4` with message
  `Fix set note reveal integrity`.
- Push succeeded:
  no. The batch-mode retry failed with
  `ssh: Could not resolve hostname github.com: Temporary failure in name
  resolution`.
- Current resume point:
  commit this integrity checkpoint, retry push, then read the row-operation
  PDFs for the next content cycle.

### 2026-04-13 checkpoint 3: deepen the row-operations unit

This checkpoint substantially expanded an existing source-backed MATH1030 unit
instead of adding a brand-new route.

- Checkpoint name: deepen the row-operations unit
- What was inspected:
  `reference/MATH1030/1030gi-n02-01.pdf`,
  `reference/MATH1030/MATH1030-Notes.pdf`,
  `reference/MATH1030/Practice Set 1_Set review and Solving Linear system.pdf`,
  the existing three localized `2.2 Augmented matrices and row operations`
  files, and the catalog metadata for that unit.
- What was changed:
  rewrote the EN, zh-HK, and zh-CN versions of the `2.2` note so the unit now
  covers `Ax = b`, `[A|b]`, the three elementary row operations, reversibility,
  a source-backed worked elimination example, structured mistakes, quick checks,
  and guided exercises. Folded in the current textbook inline-math renderer so
  body-level code spans can display mathematical notation consistently.
- What was verified:
  cross-checked the new sections against the extracted PDF text; confirmed the
  three locales keep the same note structure and exercise flow; inspected the
  final diff to confirm the note is substantially deeper than the previous stub.
- Files touched:
  `content/textbook/math1030/matrices/augmented-matrices-row-operations/en.mdx`,
  `content/textbook/math1030/matrices/augmented-matrices-row-operations/zh-hk.mdx`,
  `content/textbook/math1030/matrices/augmented-matrices-row-operations/zh-cn.mdx`,
  `src/components/textbook/mdx-blocks.tsx`,
  `src/components/textbook/mdx-components.tsx`,
  and the four tracking documents.
- Remaining issues:
  many later source-backed MATH1030 chapters remain unauthored, and several
  earlier authored units are still thinner than the available reference
  material.
- Exact next target:
  continue the chapter 2 matrix sequence with a formatting and content pass on
  `2.3 Gaussian elimination and RREF`, or deepen the MATH1030 invertibility
  sequence from the `n03-*` lecture notes.
- Commit created:
  pending at the time of this doc update; the checkpoint commit follows this
  documentation step.
- Push succeeded:
  pending at the time of this doc update; push will be retried in batch mode.
- Current resume point:
  commit the `2.2` expansion, retry push, then continue with the next highest
  value source-backed MATH1030 unit.

## Current public note boundary

After the current implementation pass, the live MATH1030 notes extend through
chapters 1 to 6 with explicit public pages for:

- systems and solution sets
- matrix basics
- augmented matrices and row operations
- Gaussian elimination and RREF
- solution-set types
- matrix multiplication and identity matrices
- transpose and special matrices
- homogeneous systems and null space
- invertible matrices
- vector spaces, subspaces, span, dependence, basis, column space, row space,
  and rank

MATH1090 remains strongest through logic, sets, natural numbers, induction,
integers, rationals, and the `sqrt(2)` / incompleteness boundary example. Later
order, real-number, and analysis-preparatory material is present in
`reference/`, but is not yet fully authored into public notes.

## MATH1090 coverage

The MATH1090 tree is smaller, so each source item is tracked individually
below.

| Course | Source item | Material type | Current status | Incorporated | Overlap | Blocked | Notes / next action |
| --- | --- | --- | --- | --- | --- | --- | --- |
| MATH1090 | `reference/MATH1090/MATH1090_Lecture_Notes_Feb27.pdf` | lecture notes | incorporated | yes | no | no | Direct source for logic, truth tables, quantifiers, sets, functions, and relations. |
| MATH1090 | `reference/MATH1090/MATH1090_Lecture_Notes_Mar26.pdf` | lecture notes | partially incorporated | partial | no | no | Current public notes use `§3.1-§4.7`; later real-number, sequence, limit, and continuity sections still need explicit note pages. |
| MATH1090 | `reference/MATH1090/MATH1090_midterm_review_notes_final.tex` | review source | partially incorporated | partial | yes | no | Used for headings, proof structure, and terminology. Later review sections on order, real numbers, and analysis prep remain backlog. |
| MATH1090 | `reference/MATH1090/MATH1090_midterm_review_notes_final.pdf` | review packet | partially incorporated | partial | yes | no | Reinforces current authored units and contains later order / completeness / proof-template material not yet surfaced publicly. |
| MATH1090 | `reference/MATH1090/MATH1090_midterm_review_notes_master.pdf` | review packet | overlap | partial | yes | no | Editorial variant of the final review packet; do not treat as a separate public-content stream. |
| MATH1090 | `reference/MATH1090/MATH1090_HW1.pdf` | homework | incorporated | yes | yes | no | Supports propositional logic practice already merged into public notes. |
| MATH1090 | `reference/MATH1090/MATH1090 HW8.pdf` | homework | blocked | no | no | yes | Extraction quality is weak and the surrounding later-course material is not yet mapped tightly enough to author from this file alone. |
| MATH1090 | `reference/MATH1090/MATH1090_Worksheet1.pdf` | worksheet | incorporated | yes | yes | no | Supports propositional logic examples and quick checks. |
| MATH1090 | `reference/MATH1090/MATH1090_Worksheet2.pdf` | worksheet | incorporated | yes | yes | no | Supports quantifiers and negation. |
| MATH1090 | `reference/MATH1090/MATH1090_Worksheet3.pdf` | worksheet | incorporated | yes | yes | no | Supports sets, Venn-diagram language, and function / relation examples. |
| MATH1090 | `reference/MATH1090/MATH1090_Worksheet4.pdf` | worksheet | incorporated | yes | yes | no | Supports naturals, induction, and integer-construction notes. |
| MATH1090 | `reference/MATH1090/MATH1090_Worksheet5.pdf` | worksheet | incorporated | yes | yes | no | Supports rationals, well-defined relations on `Q`, and the `sqrt(2)` gap note. |

## MATH1030 coverage

The MATH1030 tree is larger and mixes master notes, lecture-note packets,
tutorials, assignments, practice sets, and duplicates. The tables below record
each non-sidecar item once.

### Core notes and lecture packets

These files are the main conceptual sources for authored note pages.

| Course | Source item | Material type | Current status | Incorporated | Overlap | Blocked | Notes / next action |
| --- | --- | --- | --- | --- | --- | --- | --- |
| MATH1030 | `reference/MATH1030/MATH1030-Notes.pdf` | master notes | partially incorporated | partial | no | no | Public notes now cover chapters 1-6 through `6.6`. Remaining backlog includes advanced basis appendices, determinants, eigenvalues, diagonalization, inner products, orthogonality, Gram-Schmidt, and inequalities. |
| MATH1030 | `reference/MATH1030/1030gi-n01-01.pdf` | lecture note | incorporated | yes | no | no | Merged into `2.1 Matrix basics`. |
| MATH1030 | `reference/MATH1030/1030gi-n01-02.pdf` | lecture note | incorporated | yes | no | no | Merged into `3.1 Matrix multiplication and identity matrices`. |
| MATH1030 | `reference/MATH1030/1030gi-n01-03.pdf` | lecture note | incorporated | yes | no | no | Merged into `3.2 Transpose and special matrices`. |
| MATH1030 | `reference/MATH1030/1030gi-n01-03p.pdf` | optional appendix | pending | no | partial | no | Proof-culture appendix; useful for future theorem / proof-writing note or appendix pages. |
| MATH1030 | `reference/MATH1030/1030gi-n01-03q.pdf` | optional appendix | pending | no | partial | no | Logic-phrase appendix; could inform a later proof-language note if public scope expands. |
| MATH1030 | `reference/MATH1030/1030gi-n01-04.pdf` | lecture note | incorporated | yes | no | no | Merged into `3.2 Transpose and special matrices`. |
| MATH1030 | `reference/MATH1030/1030gi-n01-04p.pdf` | optional appendix | overlap | partial | yes | no | Induction appendix overlaps with existing MATH1090 induction note; no dedicated MATH1030 public page yet. |
| MATH1030 | `reference/MATH1030/1030gi-n01-04q.pdf` | optional appendix | overlap | partial | yes | no | Counterexample appendix informs note-writing style, but is not yet a separate public note. |
| MATH1030 | `reference/MATH1030/1030gi-n01-05.pdf` | lecture note | partially incorporated | partial | no | no | Linear-combination ideas are live in `6.3`, but the earlier matrix-algebra framing is not fully preserved yet. |
| MATH1030 | `reference/MATH1030/1030gi-n01-06.pdf` | lecture note | partially incorporated | partial | no | no | Dependence material is live in `6.4`, but the explicit homogeneous-system viewpoint still needs a later refinement pass. |
| MATH1030 | `reference/MATH1030/1030gi-n01-07.pdf` | lecture note | incorporated | yes | no | no | Row-operation language is merged into `2.2` and `2.3`. |
| MATH1030 | `reference/MATH1030/1030gi-n01-08.pdf` | lecture note | partially incorporated | partial | no | no | Row-operation matrices are only lightly represented; still room for a deeper dedicated note or expansion. |
| MATH1030 | `reference/MATH1030/1030gi-n02-01.pdf` | lecture note | incorporated | yes | no | no | Merged into `2.2 Augmented matrices and row operations`. |
| MATH1030 | `reference/MATH1030/1030gi-n02-02.pdf` | lecture note | incorporated | yes | no | no | Core source for the RREF note; already reflected in public coverage even though not every source ref was listed before this pass. |
| MATH1030 | `reference/MATH1030/1030gi-n02-02p.pdf` | optional appendix | overlap | partial | yes | no | Small-size RREF classification overlaps with current Gaussian-elimination coverage and export examples. |
| MATH1030 | `reference/MATH1030/1030gi-n02-03.pdf` | lecture note | incorporated | yes | no | no | Direct source for Gaussian elimination and uniqueness discussion. |
| MATH1030 | `reference/MATH1030/1030gi-n02-03p.pdf` | optional appendix | pending | no | partial | no | Existence / uniqueness proofs for REF and RREF are not yet written as a theorem-first appendix note. |
| MATH1030 | `reference/MATH1030/1030gi-n02-04.pdf` | lecture note | incorporated | yes | no | no | Merged into `4.1 Homogeneous systems and null space`. |
| MATH1030 | `reference/MATH1030/1030gi-n02-05.pdf` | lecture note | pending | no | partial | no | System viewpoint on linear combinations is strong and usable; a later note or expansion should integrate it explicitly. |
| MATH1030 | `reference/MATH1030/1030gi-n02-06.pdf` | lecture note | partially incorporated | partial | no | no | Homogeneous-system viewpoint on dependence is only partly reflected in current `6.4`; still needs a fuller merge. |
| MATH1030 | `reference/MATH1030/1030gi-n03-01.pdf` | lecture note | partially incorporated | partial | no | no | Supports invertible / nonsingular language; public invertibility note still needs another depth pass. |
| MATH1030 | `reference/MATH1030/1030gi-n03-02.pdf` | lecture note | partially incorporated | partial | no | no | Row-operation characterization of invertibility is present, but not yet covered with full theorem detail. |
| MATH1030 | `reference/MATH1030/1030gi-n03-03.pdf` | lecture note | partially incorporated | partial | no | no | Necessary-and-sufficient conditions for invertibility are only partly surfaced. |
| MATH1030 | `reference/MATH1030/1030gi-n03-04.pdf` | lecture note | incorporated | yes | no | no | Direct source for the expanded row-equivalence, preserved-column-relation, and rank discussion in `5.1 Invertible matrices`. |
| MATH1030 | `reference/MATH1030/1030gi-n03-04p.pdf` | optional appendix | partially incorporated | partial | no | no | The uniqueness of RREF and well-defined rank now appear in `5.1`, though the full induction proof is still only summarized. |
| MATH1030 | `reference/MATH1030/1030gi-n04-01.pdf` | lecture note | partially incorporated | partial | no | no | Set language in elementary linear algebra informs `4.1` and vector-space notes, but is not yet a standalone public page. |
| MATH1030 | `reference/MATH1030/1030gi-n04-02.pdf` | lecture note | pending | no | no | no | Set equality arguments are audited but not yet surfaced as a public note. |
| MATH1030 | `reference/MATH1030/1030gi-n04-03.pdf` | lecture note | incorporated | yes | no | no | Direct source for the new null-space note. |
| MATH1030 | `reference/MATH1030/1030gi-n04-04.pdf` | lecture note | incorporated | yes | no | no | Direct source for the vector-space note. |
| MATH1030 | `reference/MATH1030/1030gi-n05-01.pdf` | lecture note | incorporated | yes | no | no | Used in basis / dimension coverage. |
| MATH1030 | `reference/MATH1030/1030gi-n05-02.pdf` | lecture note | incorporated | yes | no | no | Used in basis / dimension coverage. |
| MATH1030 | `reference/MATH1030/1030gi-n05-02p.pdf` | optional appendix | pending | no | no | no | Existence of basis appendix is not yet a dedicated public theorem note. |
| MATH1030 | `reference/MATH1030/1030gi-n05-02q.pdf` | optional appendix | pending | no | no | no | Replacement theorem remains backlog. |
| MATH1030 | `reference/MATH1030/1030gi-n05-02r.pdf` | optional appendix | pending | no | no | no | Change-of-basis theorem remains backlog. |
| MATH1030 | `reference/MATH1030/1030gi-n05-03.pdf` | lecture note | partially incorporated | partial | no | no | Linear-combination / span note uses this source, but minimal-spanning-set language is not yet explicit. |
| MATH1030 | `reference/MATH1030/1030gi-n05-04.pdf` | lecture note | incorporated | yes | no | no | Direct source for the new `6.6 Column space, row space, and rank` note. |
| MATH1030 | `reference/MATH1030/1030gi-n05-05.pdf` | lecture note | partially incorporated | partial | no | no | Some dimension shortcuts appear in `6.5`, but the full necessary / sufficient theorem package is not yet explicit. |
| MATH1030 | `reference/MATH1030/1030gi-n05-05p.pdf` | optional appendix | pending | no | no | no | Dimension inequalities for comparable subspaces remain backlog. |
| MATH1030 | `reference/MATH1030/1030gi-n05-07.pdf` | lecture note | pending | no | no | no | Basis and dimension for matrix subspaces are source-backed but not yet authored. |
| MATH1030 | `reference/MATH1030/1030gi-n06-01.pdf` | lecture note | pending | no | no | no | Determinants chapter not yet authored. |
| MATH1030 | `reference/MATH1030/1030gi-n06-02.pdf` | lecture note | pending | no | no | no | Determinants and row operations remain backlog. |
| MATH1030 | `reference/MATH1030/1030gi-n06-03.pdf` | lecture note | pending | no | no | no | Determinants with transpose / column operations remain backlog. |
| MATH1030 | `reference/MATH1030/1030gi-n07-01.pdf` | lecture note | pending | no | no | no | Eigenvalues and eigenvectors not yet authored. |
| MATH1030 | `reference/MATH1030/1030gi-n07-02.pdf` | lecture note | pending | no | no | no | Diagonalization not yet authored. |
| MATH1030 | `reference/MATH1030/1030gi-n07-03.pdf` | lecture note | pending | no | no | no | Characteristic polynomials not yet authored. |
| MATH1030 | `reference/MATH1030/1030gi-n08-01.pdf` | lecture note | pending | no | no | no | Inner products and norms not yet authored. |

### Supplementary exercises, tutorials, assignments, and practice sets

These files mainly reinforce or extend the core notes. Many are already merged
into exercises, examples, and source refs for authored note pages.

| Course | Source item | Material type | Current status | Incorporated | Overlap | Blocked | Notes / next action |
| --- | --- | --- | --- | --- | --- | --- | --- |
| MATH1030 | `reference/MATH1030/1030gi-n01-se0102.pdf` | supplementary exercise | overlap | partial | yes | no | Matrix-algebra practice merged into early matrix notes; still useful for future exercise expansion. |
| MATH1030 | `reference/MATH1030/1030gi-n01-se0102as.pdf` | supplementary answers | overlap | partial | yes | no | Answer key only; keep for internal verification. |
| MATH1030 | `reference/MATH1030/1030gi-n01-se0304.pdf` | supplementary exercise | incorporated | yes | yes | no | Feeds transpose / symmetry / commuting examples. |
| MATH1030 | `reference/MATH1030/1030gi-n01-se0304as.pdf` | supplementary answers | overlap | partial | yes | no | Answer key only; useful for future worked-example checks. |
| MATH1030 | `reference/MATH1030/1030gi-n01-se0708.pdf` | supplementary exercise | overlap | partial | yes | no | Row-operation reinforcement already overlaps with authored elimination notes. |
| MATH1030 | `reference/MATH1030/1030gi-n01-se0708as.pdf` | supplementary answers | overlap | partial | yes | no | Answer key only. |
| MATH1030 | `reference/MATH1030/1030gi-n02-se01020304.pdf` | supplementary exercise | overlap | partial | yes | no | Strong elimination / RREF practice; useful for later exercise-depth pass. |
| MATH1030 | `reference/MATH1030/1030gi-n02-se01020304as.pdf` | supplementary answers | overlap | partial | yes | no | Answer key only. |
| MATH1030 | `reference/MATH1030/1030efghi-tutorial-week02.pdf` | tutorial | incorporated | yes | yes | no | Supports equation / solution-set note. |
| MATH1030 | `reference/MATH1030/1030efghi-tutorial-week02 (1).pdf` | tutorial duplicate | overlap | yes | yes | no | Duplicate of the week 2 packet. |
| MATH1030 | `reference/MATH1030/1030efghi-tutorial-week02as.pdf` | tutorial answers | overlap | partial | yes | no | Internal answer support only. |
| MATH1030 | `reference/MATH1030/1030efghi-tutorial-week03.pdf` | tutorial | incorporated | yes | yes | no | Already merged into Gaussian elimination and matrix-algebra examples. |
| MATH1030 | `reference/MATH1030/1030efghi-tutorial-week03as.pdf` | tutorial answers | overlap | partial | yes | no | Answer key only. |
| MATH1030 | `reference/MATH1030/1030efghi-tutorial-week04.pdf` | tutorial | incorporated | yes | yes | no | Direct support for transpose / symmetry note. |
| MATH1030 | `reference/MATH1030/1030efghi-tutorial-week04as.pdf` | tutorial answers | overlap | partial | yes | no | Answer key only. |
| MATH1030 | `reference/MATH1030/1030efghi-tutorial-week05.pdf` | tutorial | incorporated | yes | yes | no | Row operations and RREF reinforcement already merged. |
| MATH1030 | `reference/MATH1030/1030efghi-tutorial-week05as.pdf` | tutorial answers | overlap | partial | yes | no | Answer key only. |
| MATH1030 | `reference/MATH1030/1030efghi-tutorial-week06.pdf` | tutorial | incorporated | yes | yes | no | Direct support for null-space / set-language note. |
| MATH1030 | `reference/MATH1030/1030efghi-tutorial-week06as.pdf` | tutorial answers | overlap | partial | yes | no | Answer key only. |
| MATH1030 | `reference/MATH1030/1030efghi-tutorial-week07.pdf` | tutorial | partially incorporated | partial | yes | no | Invertibility ideas are live, but theorem-level expansion is still pending. |
| MATH1030 | `reference/MATH1030/1030efghi-tutorial-week07as.pdf` | tutorial answers | overlap | partial | yes | no | Answer key only. |
| MATH1030 | `reference/MATH1030/1030efghi-tutorial-week08.pdf` | tutorial | incorporated | yes | yes | no | Supports vector-space and subspace coverage. |
| MATH1030 | `reference/MATH1030/1030efghi-tutorial-week08as.pdf` | tutorial answers | overlap | partial | yes | no | Answer key only. |
| MATH1030 | `reference/MATH1030/1030efghi-as01.pdf` | assignment | partially incorporated | partial | no | no | Matrix algebra assignment now aligns with new chapter 3 notes, but not every problem type has been surfaced. |
| MATH1030 | `reference/MATH1030/1030efghi-as01as.pdf` | assignment answers | overlap | partial | yes | no | Answer key only. |
| MATH1030 | `reference/MATH1030/1030efghi-as02.pdf` | assignment | partially incorporated | partial | no | no | Systems and row-operation material largely merged, but some problem structures remain internal only. |
| MATH1030 | `reference/MATH1030/1030efghi-as02as.pdf` | assignment answers | overlap | partial | yes | no | Answer key only. |
| MATH1030 | `reference/MATH1030/1030efghi-as03.pdf` | assignment | partially incorporated | partial | no | no | Set language, null space, and invertibility questions now have better coverage, but not full one-to-one exercise parity. |
| MATH1030 | `reference/MATH1030/1030efghi-as03as.pdf` | assignment answers | overlap | partial | yes | no | Answer key only. |
| MATH1030 | `reference/MATH1030/1030efghi-as04-202526.pdf` | assignment | incorporated | yes | yes | no | Already supports dependence / span / vector-space public notes. |
| MATH1030 | `reference/MATH1030/Practice Set 1_Set review and Solving Linear system.pdf` | practice set | incorporated | yes | yes | no | Used in systems, augmented matrices, and solution-set types. |
| MATH1030 | `reference/MATH1030/Practice Set 1_Solutions.pdf` | practice solutions | overlap | partial | yes | no | Internal solution support only. |
| MATH1030 | `reference/MATH1030/Practice Set 2_Matrix Algebra.pdf` | practice set | incorporated | yes | yes | no | Now directly merged into matrix basics and matrix multiplication notes. |
| MATH1030 | `reference/MATH1030/Practice Set 2_Solutions.pdf` | practice solutions | overlap | partial | yes | no | Internal solution support only. |
| MATH1030 | `reference/MATH1030/Practice Set 3_Matrix Algebra and Linear Equation System.pdf` | practice set | incorporated | yes | yes | no | Supports matrix multiplication note and elimination-related exercises. |
| MATH1030 | `reference/MATH1030/Practice Set 3_Solutions.pdf` | practice solutions | overlap | partial | yes | no | Internal solution support only. |
| MATH1030 | `reference/MATH1030/Practice Set 4_Invertible Matrix.pdf` | practice set | partially incorporated | partial | yes | no | Supports invertibility page, but the public note still needs a deeper theorem pass. |
| MATH1030 | `reference/MATH1030/Practice Set 4_Solutions.pdf` | practice solutions | overlap | partial | yes | no | Internal solution support only. |
| MATH1030 | `reference/MATH1030/MATH1030 HW3.pdf` | homework | partially incorporated | partial | no | no | Appears to align with null-space / invertibility territory; extraction is weak, so treat as secondary support only. |
| MATH1030 | `reference/MATH1030/math1030_assignment4_review_solutions.pdf` | review packet | incorporated | yes | yes | no | Already used in span and dependence notes. |
| MATH1030 | `reference/MATH1030/math1030_assignment4_review_solutions (1).pdf` | review duplicate | overlap | yes | yes | no | Duplicate language / version of the same review packet. |
| MATH1030 | `reference/MATH1030/math1030_assignment4_review_solutions (2).pdf` | review duplicate | overlap | yes | yes | no | Duplicate language / version of the same review packet. |

### Duplicates, bundles, and blocked items

These files are intentionally not treated as standalone source streams for
public notes.

| Course | Source item | Material type | Current status | Incorporated | Overlap | Blocked | Notes / next action |
| --- | --- | --- | --- | --- | --- | --- | --- |
| MATH1030 | `reference/MATH1030/1030 added.zip` | archive bundle | overlap | no | yes | no | Contains duplicates of `n06-*`, `n07-*`, and `n08-01`; use extracted PDFs already present beside it. |
| MATH1030 | `reference/MATH1030/0314 表格2.pdf` | non-course handout | blocked | no | no | yes | Not MATH1030 mathematics content. |
| MATH1030 | `reference/MATH1030/MATH1090_Worksheet5 (1).pdf` | stray file | blocked | no | yes | yes | MATH1090 rational-number worksheet stored in the wrong course folder. |

## Highest-value remaining backlog

The next source-backed expansions with the clearest payoff are:

1. MATH1030 `1030gi-n05-05.pdf` and `1030gi-n05-07.pdf` for sharper basis
   tests, dimension criteria, and matrix-subspace dimension.
2. MATH1030 `1030gi-n06-01.pdf` to `1030gi-n08-01.pdf` and the parallel master
   note chapters for determinants, eigenvalues, diagonalization, and inner
   products.
3. MATH1090 later sections from `MATH1090_Lecture_Notes_Mar26.pdf` and the
   review packet, especially total orders, supremum / infimum, incompleteness
   of `Q`, first constructions of the reals, and the later proof templates.

## Current blockers

The following constraints still matter during future authoring:

- Later MATH1090 material is present, but the public note set does not yet have
  route coverage or three-language authoring for those sections.
- Several MATH1030 appendix files are theoretically strong but need deliberate
  decisions about whether to surface them as main notes or as secondary
  appendices.
- `MATH1090 HW8.pdf` and `MATH1030 HW3.pdf` extract poorly enough that they
  should not be used as primary sources without stronger corroborating files.

## Checkpoint log

This log records implementation checkpoints that affect the reference-backed
authoring workflow.

### 2026-04-13 checkpoint 1: rendering-only pass

This checkpoint changed rendering behavior, not course coverage, but it still
updated the source ledger so the next run does not have to rediscover the
state.

- Checkpoint name: Rendering pipeline and inline notation
- What was inspected: the current authored unit tree under `content/textbook`,
  representative MATH1030 and MATH1090 reference packets, and the existing
  course catalog / coverage mapping
- What was changed: no source rows changed; the current coverage map still
  accurately describes the public boundary after the rendering-only component
  fix
- What was verified: re-audited the existing public unit set and confirmed that
  the next highest-value source-backed content target is still the MATH1030
  invertibility / row-equivalence backlog
- Files touched: `docs/reference-coverage.md`,
  `docs/rendering-formatting-qa.md`,
  `docs/exercise-solution-integrity.md`,
  `docs/content-parity-checklist.md`
- Remaining issues: source-backed backlog still begins with stronger treatment
  of MATH1030 invertibility, row equivalence, dimension criteria, then the
  determinant and eigenvalue chapters
- Exact next target: complete checkpoint 2 first, then return to the next
  source-backed authoring pass
- Commit created: pending until this checkpoint commit is written
- Push succeeded: pending until this checkpoint push is attempted
- Current resume point: after the exercise / reveal integrity fix, return to
  MATH1030 `1030gi-n03-04.pdf` and adjacent invertibility material

### 2026-04-13 checkpoint 4: shared quick-check shell fix

This checkpoint changed the shared note shell, not course coverage, but it
still updated the reference ledger so the next run can resume from the right
source-backed backlog.

- Checkpoint name: Shared quick-check shell fix
- What was inspected: the current authored unit tree under `content/textbook`,
  especially units that pair `QuickCheck` with a following `RevealSolution`
- What was changed: no source rows changed; the coverage map remains accurate
  after the shared `QuickCheck` component fix
- What was verified: re-audited the current public boundary and confirmed that
  the next highest-value content target is still the MATH1030 invertibility /
  row-equivalence backlog centered on `1030gi-n03-04.pdf`
- Files touched: `src/components/textbook/mdx-blocks.tsx`,
  `docs/reference-coverage.md`,
  `docs/rendering-formatting-qa.md`,
  `docs/exercise-solution-integrity.md`,
  `docs/content-parity-checklist.md`
- Remaining issues: source-backed backlog is unchanged; the next major content
  work still starts with MATH1030 invertibility depth, then determinants and
  eigenvalues
- Exact next target: after this checkpoint commit, return to
  `reference/MATH1030/1030gi-n03-04.pdf` and adjacent invertibility material
- Commit created: pending until this checkpoint commit is written
- Push succeeded: pending until this checkpoint push is attempted
- Current resume point: commit the shared shell fix, then continue the next
  source-backed MATH1030 expansion

### 2026-04-13 checkpoint 5: deepen invertibility with row-equivalence and rank

This checkpoint folded the previously pending row-equivalence packet into the
existing invertibility note instead of creating a detached new route.

- Checkpoint name: Deepen `5.1 Invertible matrices`
- What was inspected: `reference/MATH1030/1030gi-n03-04.pdf`,
  `reference/MATH1030/1030gi-n03-04p.pdf`,
  `reference/MATH1030/1030efghi-tutorial-week07.pdf`,
  `reference/MATH1030/Practice Set 4_Invertible Matrix.pdf`,
  and the three localized `5.1` note files
- What was changed: expanded the existing `5.1` note in EN, zh-HK, and zh-CN
  to include row-equivalence as left multiplication by an invertible matrix,
  preservation of column relations, uniqueness of RREF, and the definition of
  rank; added the new source refs to the textbook catalog
- What was verified: diff review confirmed the new sections are present in all
  three locales and that `src/lib/textbook/catalog.ts` now cites
  `1030gi-n03-04.pdf` and `1030gi-n03-04p.pdf`
- Files touched: `content/textbook/math1030/invertibility/invertible-matrices/en.mdx`,
  `content/textbook/math1030/invertibility/invertible-matrices/zh-hk.mdx`,
  `content/textbook/math1030/invertibility/invertible-matrices/zh-cn.mdx`,
  `src/lib/textbook/catalog.ts`,
  `docs/reference-coverage.md`,
  `docs/rendering-formatting-qa.md`,
  `docs/exercise-solution-integrity.md`,
  `docs/content-parity-checklist.md`
- Remaining issues: the full induction proof from the appendix is only
  summarized, so `1030gi-n03-04p.pdf` remains partially incorporated rather
  than fully exhausted
- Exact next target: move to the MATH1030 basis / dimension backlog in
  `1030gi-n05-05.pdf` and `1030gi-n05-07.pdf`
- Commit created: yes, `95f3ad7` (`Deepen invertible matrix notes`)
- Push succeeded: no. `git push origin main` failed with
  `ssh: Could not resolve hostname github.com: Temporary failure in name resolution`
- Current resume point: once pushing and platform-matched verification are
  available again, continue with `1030gi-n05-05.pdf` and `1030gi-n05-07.pdf`
