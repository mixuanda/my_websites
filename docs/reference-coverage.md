# Reference coverage

This document tracks every non-sidecar item under `reference/` that is relevant
to the math notes system. It is the working ledger for deciding whether a
source has already been incorporated into the public Notes section, merged into
another authored note, deferred, or blocked.

## Latest resume state

As of April 24, 2026, the latest local source-processing checkpoints are:

- `9085148` `Fix note block prompt rendering`
- `49345a4` `Fix set note reveal integrity`
- `0526751` `Deepen augmented matrix notes`
- `95f3ad7` `Deepen invertible matrix notes`
- `f2c5513` `Deepen notes across math and CSCI units`
- `0d5aaa5` `Deepen MATH1030 notes and assessment flow`
- `0371ef0` `Expand MATH1030 notes and problem model`
- `a032185` `Deepen linear dependence note`

Every push attempt for those checkpoints failed with the same external error:
`ssh: Could not resolve hostname github.com: Temporary failure in name
resolution`.

The latest merged content passes also:

- deepened the public `math1030` unit `3.1 Matrix multiplication and identity
  matrices` in EN, zh-HK, and zh-CN with stronger column-reading and
  composition structure;
- deepened the public `math1030` unit `4.1 Homogeneous systems and null space`
  in EN, zh-HK, and zh-CN with stronger null-space structure, free-variable,
  and subspace explanations;
- expanded the public `csci2520` units on ADT operations and complexity growth
  in EN, zh-HK, and zh-CN so the course no longer feels like it jumps
  immediately from a thin ADT page into a thin complexity page;
- added code-oriented CSCI interactive support that is now active in the public
  Notes routes;
- keeps the grouped `reference/MATH1025/**` backlog active after the initial
  foundations baseline.
- expanded the `math1030` problem inventory and added a first Preview / Submit
  attempt-tracking assessment foundation beneath the public Notes shell.
- deepened `math1030` unit `3.2 Transpose and special matrices` across all
  three locales so the transpose chapter now carries symmetry, decomposition,
  commuting, and block-matrix structure at real note depth;
- deepened `math1030` unit `6.4 Linear dependence and independence` across all
  three locales so the dependence chapter now carries redundancy, null-space,
  pivot, and low-dimensional tests at real note depth.
- authored the public `math1030` determinant chapter family through `7.3` in
  EN, zh-HK, and zh-CN, covering cofactor expansion, row and column
  determinant rules, multiplicativity, the invertibility criterion, adjoints,
  and Cramer's rule.
- authored the public `math1030` eigenvalue / diagonalization chapter family
  through `8.3` in EN, zh-HK, and zh-CN, covering eigenspaces, similarity,
  diagonalization criteria, characteristic polynomials, multiplicities, and a
  first Cayley-Hamilton pass.
- authored the public `math1030` inner-product / orthogonality chapter family
  through `9.4` in EN, zh-HK, and zh-CN, covering norms, angles, orthogonal
  and orthonormal bases, Gram-Schmidt, and the Cauchy-Schwarz / triangle
  inequalities.
- split the public `math1090` order / completeness chapter into a four-unit
  EN / zh-HK / zh-CN family through `§4.7`, covering total orders, ordered
  fields, upper and lower bounds, supremum / infimum, completeness, the
  classical `Q`-gap at `sqrt(2)`, and the first axiomatic / approximation
  viewpoint on the reals.
- completed the source-backed late Math1090 family in EN, zh-HK, and zh-CN
  through `4.5`, `4.6`, and `5.1`-`5.3`, covering Dedekind cuts, decimal
  expansions, irrational numbers, sequence limits, Cauchy sequences, the
  Cauchy-sequence model of `R`, delta-epsilon limits, limit laws, sequential
  characterization, and continuity, with new pedagogically justified
  interactives and static illustration assets.
- deepened the public `math1090` number-system units `3.3` and `3.4` in EN,
  zh-HK, and zh-CN with an integer-equivalence explorer, a
  rational-representative lab, source-backed exercises from Lecture Exercises
  33-38 / Worksheet 5, and matching problem-bank checkpoint questions.

The next resume point is now QA rather than missing Math1090 content:

1. keep export, rendering, and exercise QA active on the new Math1090 `4.5`
   through `5.3` family.
2. keep export, rendering, and exercise QA active on the recently added higher
   Math1030 chapters.

Current QA progress from April 24, 2026:

- fixed broken zh-HK related-note links that had been translated into
  `/zh-hk/這些筆記/**` instead of the public `/zh-hk/notes/**` route;
- removed public source-process phrasing such as "source notes", "lecture
  notes", "worksheet", and `源材料` from the audited MATH1090 / MATH1030 note
  prose where it was describing authoring provenance rather than mathematics;
- repaired remaining English related-note labels in localized MATH1030
  `solution-set-types` and `invertible-matrices` pages;
- confirmed by script that authored internal note links resolve to existing
  `content/textbook/**` units.
- expanded the public `csci2520` sequence from four units to nine
  three-language note units, adding list / recursion, selection and
  non-comparison sorting, binary trees / BSTs, graph traversal / MST /
  shortest-path reasoning, and topological sort / heap / Huffman coding.
- replaced the PPT extraction helper's external `python-pptx` dependency with
  a standard-library `.pptx` reader and extracted the later CSCI2520 tutorial
  decks into `docs/extracted/csci2520/**`.
- confirmed that the repository has no checked-in `CSCI2120` reference or
  content tree; this run therefore treats the user-requested CSCI course as the
  present `CSCI2520` material and records the absence explicitly.

Current MATH1030 practice / rendering progress from April 25, 2026:

- added source-aligned checkpoint problems to the previously uncovered public
  MATH1030 units `1.1`, `2.1`, `2.2`, `2.4`, `6.1`, `6.2`, `6.3`, and `6.5`,
  so every live MATH1030 unit now has at least one checkpoint problem;
- used the existing course sources and practice packets as the conceptual
  basis for systems, matrix basics, row operations, RREF contradiction rows,
  vector-space axioms, subspace testing, span, and basis / dimension checks;
- simplified the public page TOC to article headings through `h3`, preventing
  theorem / example / quick-check titles from crowding out the actual section
  structure;
- recorded the durable "textbook prose + purposeful interaction + visual
  support + WebWork-like exercises" authoring expectation in
  `docs/math-notes-authoring-memory.md`.
- added two source-backed public MATH1030 appendix-style units in all three
  locales: `1.2 Reading theorems and proof language`, using the proof-language
  and counterexample appendices, and `2.5 Existence of row-echelon forms`,
  using the optional REF/RREF existence proof appendix.
- added checkpoint problems for the new proof-language and REF/RREF existence
  units, and corrected the `2.3 Gaussian elimination and RREF` catalog source
  refs to list `1030gi-n02-02.pdf` explicitly.
- added the source-backed public MATH1030 appendix-style unit `5.2 RREF
  uniqueness and well-defined rank` in EN, zh-HK, and zh-CN, using
  `1030gi-n03-04p.pdf` for the induction proof and `1030gi-n03-04.pdf` for
  the preserved-column-relation bridge.
- added checkpoint problems for the new `5.2` unit covering the uniqueness
  conclusion and reading rank from the pivot-column count.
- deepened the public MATH1030 unit `2.3 Gaussian elimination and RREF` in EN,
  zh-HK, and zh-CN with assignment-style RREF drills from `as02`, including a
  long augmented-system reduction, one-step RREF cleanup, parametric solution
  reading, and two matching checkpoint problems.

Current Math1025 expansion progress from April 25, 2026:

- extracted the main Math1025 chapter-slide PDFs into
  `docs/extracted/math1025/**` for internal source-backed authoring review;
- added public three-language Math1025 notes for `2.1 Mathematical induction`,
  `3.1 Inequalities and absolute value`, and `4.1 Binomial coefficients and
  expansions`;
- registered the new Math1025 chapter families in `src/lib/textbook/catalog.ts`
  so they appear under public Notes and participate in unit-level exports;
- left `reference/MATH1025/MATH1025_slides_ch5.pdf` through
  `MATH1025_slides_ch11.pdf` as the next source-backed Math1025 backlog.

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
chapter 9 with explicit public pages for:

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
- determinants and cofactor expansion
- row operations, products, and invertibility through determinants
- transpose, column operations, adjoints, and Cramer's rule
- eigenvalues, eigenvectors, and eigenspaces
- diagonalization and similarity
- characteristic polynomials, multiplicities, and diagonalization tests
- inner products, norms, and angles
- orthogonal sets, orthonormal bases, and coordinate formulas
- Gram-Schmidt orthogonalization
- Cauchy-Schwarz and triangle inequalities

MATH1090 now reaches a six-unit reals sequence plus a three-unit first-limits
sequence with explicit public pages for total orders and ordered fields; upper
/ lower bounds, supremum, and infimum; completeness and gaps in `Q`; the
axiomatic / first-approximation view of the reals; Dedekind cuts; decimal
expansions and irrational numbers; sequence limits; Cauchy sequences; and the
first delta-epsilon / continuity family.

CSCI2520 now has explicit public note pages in EN, zh-HK, and zh-CN for C
memory foundations; ADT semantics; stack / queue behavior; hash tables and
collision handling; list recursion; complexity growth; selection, quickselect,
counting sort, and radix sort; binary trees and BST operations; graph
traversal, MST, and Dijkstra-style shortest paths; and topological sorting,
heaps, and Huffman coding.

## MATH1090 coverage

The MATH1090 tree is smaller, so each source item is tracked individually
below.

| Course | Source item | Material type | Current status | Incorporated | Overlap | Blocked | Notes / next action |
| --- | --- | --- | --- | --- | --- | --- | --- |
| MATH1090 | `reference/MATH1090/MATH1090_Lecture_Notes_Feb27.pdf` | lecture notes | incorporated | yes | no | no | Direct source for logic, truth tables, quantifiers, sets, functions, and relations. |
| MATH1090 | `reference/MATH1090/MATH1090_Lecture_Notes_Mar26.pdf` | lecture notes | partially incorporated | partial | no | no | Primary source for the current public `§3.*` number-construction notes; the latest pass strengthened integer subtraction / multiplication and rational well-definedness inside `3.3`-`3.4`. Later real-number and analysis-preparatory sections remain backlog. |
| MATH1090 | `reference/MATH1090/MATH1090_Lecture_Notes_Apr10.pdf` | lecture notes | incorporated | yes | no | no | Direct source for the public `4.1`-`4.6` and `5.1`-`5.3` family: cuts, decimals, irrationals, sequence limits, Cauchy sequences, delta-epsilon limits, limit laws, sequential characterization, and continuity. |
| MATH1090 | `reference/MATH1090/MATH1090_midterm_review_notes_final.tex` | review source | partially incorporated | partial | yes | no | Used for headings, terminology, proof structure, number-system exercises 32-38, Worksheet 5 proof patterns, and the chapter-4 note family through `§4.7`. Later proof-template and appendix sections remain backlog. |
| MATH1090 | `reference/MATH1090/MATH1090_midterm_review_notes_final.pdf` | review packet | partially incorporated | partial | yes | no | Reinforces the authored logic-through-`§4.7` units and still contains later proof-template / rapid-review material not yet surfaced publicly. |
| MATH1090 | `reference/MATH1090/MATH1090_midterm_review_notes_master.pdf` | review packet | overlap | partial | yes | no | Editorial variant of the final review packet; do not treat as a separate public-content stream. |
| MATH1090 | `reference/MATH1090/MATH1090_HW1.pdf` | homework | incorporated | yes | yes | no | Supports propositional logic practice already merged into public notes. |
| MATH1090 | `reference/MATH1090/MATH1090 HW8.pdf` | homework | blocked | no | no | yes | Extraction quality is weak and the surrounding later-course material is not yet mapped tightly enough to author from this file alone. |
| MATH1090 | `reference/MATH1090/MATH1090_Worksheet1.pdf` | worksheet | incorporated | yes | yes | no | Supports propositional logic examples and quick checks. |
| MATH1090 | `reference/MATH1090/MATH1090_Worksheet2.pdf` | worksheet | incorporated | yes | yes | no | Supports quantifiers and negation. |
| MATH1090 | `reference/MATH1090/MATH1090_Worksheet3.pdf` | worksheet | incorporated | yes | yes | no | Supports sets, Venn-diagram language, and function / relation examples. |
| MATH1090 | `reference/MATH1090/MATH1090_Worksheet4.pdf` | worksheet | incorporated | yes | yes | no | Supports naturals, induction, integer-construction notes, and the latest subtraction / multiplication practice expansion. |
| MATH1090 | `reference/MATH1090/MATH1090_Worksheet5.pdf` | worksheet | incorporated | yes | yes | no | Supports rationals, Euclidean-algorithm gcd invariance, well-defined relations on `Q`, the `sqrt(2)` gap note, and chapter-4 completeness / gap exercises. |

## MATH1030 coverage

The MATH1030 tree is larger and mixes master notes, lecture-note packets,
tutorials, assignments, practice sets, and duplicates. The tables below record
each non-sidecar item once.

### Core notes and lecture packets

These files are the main conceptual sources for authored note pages.

| Course | Source item | Material type | Current status | Incorporated | Overlap | Blocked | Notes / next action |
| --- | --- | --- | --- | --- | --- | --- | --- |
| MATH1030 | `reference/MATH1030/MATH1030-Notes.pdf` | master notes | partially incorporated | partial | no | no | Public notes now cover chapters 1-9 through `9.4`, plus gap passes on proof language, REF/RREF existence, set language, and matrix subspaces. Remaining backlog is mainly optional uniqueness proof detail and deeper exercise / export QA; linear transformations only appear as isolated motivation in the checked master notes, not as a supported full unit. |
| MATH1030 | `reference/MATH1030/1030gi-n01-01.pdf` | lecture note | incorporated | yes | no | no | Merged into `2.1 Matrix basics`. |
| MATH1030 | `reference/MATH1030/1030gi-n01-02.pdf` | lecture note | incorporated | yes | no | no | Merged into `3.1 Matrix multiplication and identity matrices`. |
| MATH1030 | `reference/MATH1030/1030gi-n01-03.pdf` | lecture note | incorporated | yes | no | no | Merged into `3.2 Transpose and special matrices`. |
| MATH1030 | `reference/MATH1030/1030gi-n01-03p.pdf` | optional appendix | incorporated | yes | no | no | Direct source for `1.2 Reading theorems and proof language`, covering theorem formats, assumptions / conclusions, direct proofs, and definitions. |
| MATH1030 | `reference/MATH1030/1030gi-n01-03q.pdf` | optional appendix | incorporated | yes | no | no | Direct source for `1.2 Reading theorems and proof language`, covering logical words, conditionals, converses, contrapositives, equivalence, quantifiers, and uniqueness. |
| MATH1030 | `reference/MATH1030/1030gi-n01-04.pdf` | lecture note | incorporated | yes | no | no | Merged into `3.2 Transpose and special matrices`. |
| MATH1030 | `reference/MATH1030/1030gi-n01-04p.pdf` | optional appendix | overlap | partial | yes | no | Induction appendix overlaps with existing MATH1090 induction note; no dedicated MATH1030 public page yet. |
| MATH1030 | `reference/MATH1030/1030gi-n01-04q.pdf` | optional appendix | incorporated | yes | no | no | Counterexample appendix is now incorporated into `1.2 Reading theorems and proof language`. |
| MATH1030 | `reference/MATH1030/1030gi-n01-05.pdf` | lecture note | incorporated | yes | no | no | Core linear-combination definitions, closure, and column-vector emphasis are represented in `6.3`; the matrix-space adaptation is now supported by `6.7`. |
| MATH1030 | `reference/MATH1030/1030gi-n01-06.pdf` | lecture note | incorporated | yes | no | no | Dependence / independence definitions and the homogeneous-system dictionary are now explicit in `6.4`, with matrix-space context covered by `6.7`. |
| MATH1030 | `reference/MATH1030/1030gi-n01-07.pdf` | lecture note | incorporated | yes | no | no | Row-operation language is merged into `2.2` and `2.3`. |
| MATH1030 | `reference/MATH1030/1030gi-n01-08.pdf` | lecture note | incorporated | yes | no | no | Direct source for the new `3.3 Row-operation matrices` note, with standard matrix units also connected to `6.7`. |
| MATH1030 | `reference/MATH1030/1030gi-n02-01.pdf` | lecture note | incorporated | yes | no | no | Merged into `2.2 Augmented matrices and row operations`. |
| MATH1030 | `reference/MATH1030/1030gi-n02-02.pdf` | lecture note | incorporated | yes | no | no | Core source for the RREF note and now explicitly listed in the `2.3 Gaussian elimination and RREF` catalog source refs. |
| MATH1030 | `reference/MATH1030/1030gi-n02-02p.pdf` | optional appendix | partially incorporated | partial | yes | no | Small-size RREF classification now supports `2.5 Existence of row-echelon forms`; not every classification table is reproduced publicly. |
| MATH1030 | `reference/MATH1030/1030gi-n02-03.pdf` | lecture note | incorporated | yes | no | no | Direct source for Gaussian elimination and uniqueness discussion. |
| MATH1030 | `reference/MATH1030/1030gi-n02-03p.pdf` | optional appendix | incorporated | yes | no | no | Direct source for `2.5 Existence of row-echelon forms`, covering induction on row count for REF existence and induction on rank for REF-to-RREF existence while preserving pivot columns. |
| MATH1030 | `reference/MATH1030/1030gi-n02-04.pdf` | lecture note | incorporated | yes | no | no | Merged into `4.1 Homogeneous systems and null space`. |
| MATH1030 | `reference/MATH1030/1030gi-n02-05.pdf` | lecture note | incorporated | yes | no | no | The membership algorithm for span via `[U|v]`, consistency, inconsistency, and coefficient recovery is now explicit in `6.3`. |
| MATH1030 | `reference/MATH1030/1030gi-n02-06.pdf` | lecture note | incorporated | yes | no | no | The homogeneous-system algorithm for dependence / independence and reading nontrivial relations from `Uc=0` is now explicit in `6.4`. |
| MATH1030 | `reference/MATH1030/1030gi-n03-01.pdf` | lecture note | incorporated | yes | no | no | Invertible / nonsingular language is now reinforced in `5.1` through prerequisite preparation, one-sided inverse warnings, and the theorem dictionary. |
| MATH1030 | `reference/MATH1030/1030gi-n03-02.pdf` | lecture note | incorporated | yes | no | no | Row-operation characterization of invertibility is now represented in `5.1`, including row-equivalence, row-operation matrices, and the `[A | I]` method. |
| MATH1030 | `reference/MATH1030/1030gi-n03-03.pdf` | lecture note | incorporated | yes | no | no | Necessary-and-sufficient invertibility conditions are now surfaced as a practical problem-solving dictionary in `5.1`. |
| MATH1030 | `reference/MATH1030/1030gi-n03-04.pdf` | lecture note | incorporated | yes | no | no | Direct source for the expanded row-equivalence, preserved-column-relation, and rank discussion in `5.1 Invertible matrices`. |
| MATH1030 | `reference/MATH1030/1030gi-n03-04p.pdf` | optional appendix | incorporated | yes | no | no | Direct source for `5.2 RREF uniqueness and well-defined rank`, covering the induction proof that a row-equivalence class contains only one RREF and making rank independent of the row-reduction path. |
| MATH1030 | `reference/MATH1030/1030gi-n04-01.pdf` | lecture note | incorporated | yes | no | no | Direct source for `4.2 Set language and solution sets`, including membership, ambient spaces, solution sets, null spaces, and span as set notation. |
| MATH1030 | `reference/MATH1030/1030gi-n04-02.pdf` | lecture note | incorporated | yes | no | no | Direct source for `4.2 Set language and solution sets`, especially two-inclusion set equality proofs and redundant-vector span arguments. |
| MATH1030 | `reference/MATH1030/1030gi-n04-03.pdf` | lecture note | incorporated | yes | no | no | Direct source for the new null-space note. |
| MATH1030 | `reference/MATH1030/1030gi-n04-04.pdf` | lecture note | incorporated | yes | no | no | Direct source for the vector-space note. |
| MATH1030 | `reference/MATH1030/1030gi-n05-01.pdf` | lecture note | incorporated | yes | no | no | Used in basis / dimension coverage. |
| MATH1030 | `reference/MATH1030/1030gi-n05-02.pdf` | lecture note | incorporated | yes | no | no | Used in basis / dimension coverage. |
| MATH1030 | `reference/MATH1030/1030gi-n05-02p.pdf` | optional appendix | incorporated | yes | no | no | Basis-existence proof for arbitrary nonzero subspaces of `R^n` is now incorporated in `6.8 Basis extension and change of basis`. |
| MATH1030 | `reference/MATH1030/1030gi-n05-02q.pdf` | optional appendix | incorporated | yes | no | no | Replacement theorem, same-size bases, and dimension counting consequences are now incorporated in `6.8`. |
| MATH1030 | `reference/MATH1030/1030gi-n05-02r.pdf` | optional appendix | incorporated | yes | no | no | Change-of-basis theorem, `U=VS`, coordinate conversion, and a proper-subspace worked example are now incorporated in `6.8`. |
| MATH1030 | `reference/MATH1030/1030gi-n05-03.pdf` | lecture note | incorporated | yes | no | no | Minimal spanning sets, rank of a generating matrix, pivot-column extraction, and redundant-column relations are now explicit in `6.5`. |
| MATH1030 | `reference/MATH1030/1030gi-n05-04.pdf` | lecture note | incorporated | yes | no | no | Direct source for the new `6.6 Column space, row space, and rank` note. |
| MATH1030 | `reference/MATH1030/1030gi-n05-05.pdf` | lecture note | incorporated | yes | no | no | `6.5 Basis and dimension` now includes the counting theorem, two-of-three basis criterion, dimension consequences, and rank-nullity-style basis tests. |
| MATH1030 | `reference/MATH1030/1030gi-n05-05p.pdf` | optional appendix | incorporated | yes | no | no | Comparable-subspace dimension inequalities and the equal-dimension containment criterion are now summarized in `6.5`. |
| MATH1030 | `reference/MATH1030/1030gi-n05-07.pdf` | lecture note | incorporated | yes | no | no | Direct source for the new `6.7 Matrix subspaces, bases, and dimension` note. |
| MATH1030 | `reference/MATH1030/1030gi-n06-01.pdf` | lecture note | incorporated | yes | no | no | Direct source for `7.1 Determinants and cofactor expansion`. |
| MATH1030 | `reference/MATH1030/1030gi-n06-02.pdf` | lecture note | incorporated | yes | no | no | Direct source for `7.2 Row operations, products, and invertibility`. |
| MATH1030 | `reference/MATH1030/1030gi-n06-03.pdf` | lecture note | incorporated | yes | no | no | Direct source for `7.3`, including the local appendix path to adjoints and Cramer's rule. |
| MATH1030 | `reference/MATH1030/1030gi-n07-01.pdf` | lecture note | incorporated | yes | no | no | Direct source for `8.1 Eigenvalues, eigenvectors, and eigenspaces`. |
| MATH1030 | `reference/MATH1030/1030gi-n07-02.pdf` | lecture note | incorporated | yes | no | no | Direct source for `8.2 Diagonalization and similarity`. |
| MATH1030 | `reference/MATH1030/1030gi-n07-03.pdf` | lecture note | incorporated | yes | no | no | Direct source for `8.3`, including multiplicities and the first Cayley-Hamilton pass. |
| MATH1030 | `reference/MATH1030/1030gi-n08-01.pdf` | lecture note | incorporated | yes | no | no | Direct source for the `9.1` to `9.4` inner-product and orthogonality sequence. |

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
| MATH1030 | `reference/MATH1030/1030efghi-tutorial-week07.pdf` | tutorial | incorporated | yes | yes | no | Invertibility tutorial ideas are now represented through theorem use, null-space noninvertibility tests, and inverse-solve examples. |
| MATH1030 | `reference/MATH1030/1030efghi-tutorial-week07as.pdf` | tutorial answers | overlap | partial | yes | no | Answer key only. |
| MATH1030 | `reference/MATH1030/1030efghi-tutorial-week08.pdf` | tutorial | incorporated | yes | yes | no | Supports vector-space and subspace coverage. |
| MATH1030 | `reference/MATH1030/1030efghi-tutorial-week08as.pdf` | tutorial answers | overlap | partial | yes | no | Answer key only. |
| MATH1030 | `reference/MATH1030/1030efghi-as01.pdf` | assignment | partially incorporated | partial | no | no | Matrix algebra assignment now directly supports the strengthened `3.1` unknown-product example and noncommutative product-expansion warnings; transpose / symmetry problems remain covered mostly by `3.2`. |
| MATH1030 | `reference/MATH1030/1030efghi-as01as.pdf` | assignment answers | overlap | partial | yes | no | Answer key only. |
| MATH1030 | `reference/MATH1030/1030efghi-as02.pdf` | assignment | substantially incorporated | partial | no | no | Systems and row-operation material largely merged. The `4.1` note directly incorporates the particular-solution plus null-space structure, the `v-u in N(A)` proof pattern, and the `2A,3b` scaling check; `2.3` now incorporates Q5/Q7-style RREF cleanup, long row-reduction, and parametric-solution reading. Remaining row-operation-matrix composition items are better treated in `3.3` or future checkpoint work. |
| MATH1030 | `reference/MATH1030/1030efghi-as02as.pdf` | assignment answers | overlap | partial | yes | no | Answer key used to verify the `2.3` RREF cleanup / parametric-solution forms and the existing `4.1` homogeneous-solution patterns. |
| MATH1030 | `reference/MATH1030/1030efghi-as03.pdf` | assignment | substantially incorporated | partial | no | no | Direct support now appears in `4.2` for stacked-null-space subset proofs and same-coefficient solution-set intersections, and in `5.1` for one-sided identity / cyclic product invertibility arguments, the parameterized inverse family `A_alpha`, and determinant-free polynomial identity proof practice. Full Q5 / Q6 / Q8 numerical row-reduction table parity remains exercise-depth backlog. |
| MATH1030 | `reference/MATH1030/1030efghi-as03as.pdf` | assignment answers | overlap | partial | yes | no | Used to verify the solution patterns for the `4.2` set-language proof templates, `5.1` determinant-free invertibility algebra, the `A_alpha^{-1}` formula, and the Q10 proof patterns; answer-key extraction remains secondary evidence. |
| MATH1030 | `reference/MATH1030/1030efghi-as04-202526.pdf` | assignment | incorporated | yes | yes | no | Already supports dependence / span / vector-space public notes. |
| MATH1030 | `reference/MATH1030/Practice Set 1_Set review and Solving Linear system.pdf` | practice set | incorporated | yes | yes | no | Used in systems, augmented matrices, and solution-set types. |
| MATH1030 | `reference/MATH1030/Practice Set 1_Solutions.pdf` | practice solutions | overlap | partial | yes | no | Internal solution support only. |
| MATH1030 | `reference/MATH1030/Practice Set 2_Matrix Algebra.pdf` | practice set | incorporated | yes | yes | no | Now directly merged into matrix basics and matrix multiplication notes, including product-size, parameter-recovery, noncommutative expansion, and lower-triangular closure patterns. |
| MATH1030 | `reference/MATH1030/Practice Set 2_Solutions.pdf` | practice solutions | overlap | partial | yes | no | Internal solution support only. |
| MATH1030 | `reference/MATH1030/Practice Set 3_Matrix Algebra and Linear Equation System.pdf` | practice set | incorporated | yes | yes | no | Supports matrix multiplication note and elimination-related exercises. |
| MATH1030 | `reference/MATH1030/Practice Set 3_Solutions.pdf` | practice solutions | overlap | partial | yes | no | Internal solution support only. |
| MATH1030 | `reference/MATH1030/Practice Set 4_Invertible Matrix.pdf` | practice set | incorporated | yes | yes | no | Supports the expanded invertibility page and the new checkpoint questions on nonzero null-space vectors and inverse-based solving. |
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
| MATH1030 | `reference/MATH1030/MATH1090_Worksheet5 (1).pdf` | stray file | blocked | no | yes | yes | MATH1090 rational-number worksheet stored in the wrong course folder. |

## MATH1025 coverage

The `reference/MATH1025/**` tree is large enough that it must be tracked now.
The public site now exposes the foundations, induction, inequalities, and
binomial-theorem baseline in EN, zh-HK, and zh-CN, but the course remains
mostly backlog beyond chapter 4.

| Course | Source item | Material type | Current status | Incorporated | Overlap | Blocked | Notes / next action |
| --- | --- | --- | --- | --- | --- | --- | --- |
| MATH1025 | `reference/MATH1025/MATH1025_slides_ch0.pdf` | foundations slides | incorporated | yes | no | no | Direct source for public `0.1 Course foundations and notation`. |
| MATH1025 | `reference/MATH1025/MATH1025_slides_ch1(1).pdf` | trigonometry slides | incorporated | yes | no | no | Direct source for public `1.1 Equation structure and trigonometric identities`. |
| MATH1025 | `reference/MATH1025/MATH1025_slides_ch2(2).pdf` | induction slides | incorporated | yes | no | no | Direct source for public `2.1 Mathematical induction`. Extracted to `docs/extracted/math1025/MATH1025_slides_ch22.txt`. |
| MATH1025 | `reference/MATH1025/MATH1025_slides_ch3(5).pdf` | inequalities slides | incorporated | yes | no | no | Direct source for public `3.1 Inequalities and absolute value`. Extracted to `docs/extracted/math1025/MATH1025_slides_ch35.txt`. |
| MATH1025 | `reference/MATH1025/MATH1025_slides_ch4(1).pdf` | binomial theorem slides | incorporated | yes | no | no | Direct source for public `4.1 Binomial coefficients and expansions`. Extracted to `docs/extracted/math1025/MATH1025_slides_ch41.txt`. |
| MATH1025 | `reference/MATH1025/MATH1025_slides_ch5.pdf` to `reference/MATH1025/MATH1025_slides_ch8.pdf` | methods slides | pending | no | no | no | Primary future-course backbone for sequences, complex numbers, integers / rational numbers, and polynomials. |
| MATH1025 | `reference/MATH1025/MATH1025_slides_ch9.pdf` to `reference/MATH1025/MATH1025_slides_ch11.pdf` | vectors and geometry slides | pending | no | no | no | Primary future-course backbone for vectors in `R^n`, straight lines / planes / curves, and conic sections. |
| MATH1025 | `reference/MATH1025/Solution to MATH1025_1028_HW1.pdf` to `reference/MATH1025/Solution to MATH1025_1028_HW10.pdf` | homework solutions | pending | no | partial | no | Keep for later exercise / solution authoring once the baseline chapter notes exist. |
| MATH1025 | `reference/MATH1025/MATH1025_Midterm_Exam.pdf` and `reference/MATH1025/Solution to MATH1025_Midterm_Exam.pdf` | assessment pair | pending | no | partial | no | Secondary support only; use after the first chapter-family notes exist. |
| MATH1025 | `reference/MATH1025/MATH1028_Midterm_Exam.pdf` and `reference/MATH1025/Solution to MATH1028_Midterm_Exam.pdf` | adjacent-course assessment pair | overlap | no | yes | no | Shared support material only; do not treat it as primary Math1025 conceptual source. |

## Highest-value remaining backlog

The next source-backed expansions with the clearest payoff are:

1. Next missing source-backed priority: continue Math1025 chapter slides
   `ch5`-`ch8` into sequences, complex numbers, integers / rationals, and
   polynomials, unless the next user request narrows the course scope.
2. Keep refining thin but already public units, especially MATH1030 `3.1`,
   `4.1`, and the lighter MATH1090 set / function notes, only when they
   compete directly with a current source-backed chapter family.
3. Keep Math1030 and Math1090 mostly in QA / refinement mode unless a specific
   thin unit is selected from the ledger.

## Current blockers

The following constraints still matter during future authoring:

- Several MATH1030 appendix files are theoretically strong but need deliberate
  decisions about whether to surface them as main notes or as secondary
  appendices.
- `MATH1090 HW8.pdf` and `MATH1030 HW3.pdf` extract poorly enough that they
  should not be used as primary sources without stronger corroborating files.
- No `reference/CSCI2120/**` or `content/textbook/csci2120/**` tree is present;
  do not claim CSCI2120 coverage until repository sources are added.

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

### 2026-04-13 checkpoint 6: membership gating and dependence-note expansion

- Checkpoint name: membership entitlement baseline + dependence note deepening
- What was inspected: Notes route rendering, textbook catalog metadata, problem-bank APIs, and Stripe integration points.
- What was changed: introduced server-side membership entitlements (`FREE` / `MEMBER` with admin bypass), Stripe checkout/portal/webhook routes, premium unit gating, premium-problem API checks, and a deeper three-locale rewrite of `6.4 linear dependence and independence` with matrix criterion, pivot criterion, and extra guided exercises.
- What was verified: premium units now show member badges; premium unit bodies and premium checkpoint problems are blocked unless entitlement is satisfied server-side.
- Files touched: billing APIs, membership libs, unit rendering pages, quiz routes, and the `6.4` EN/zh-HK/zh-CN note pages.
- Remaining issues: live Stripe webhook sync still depends on deployment environment variables and endpoint setup.
- Exact next target: broaden premium checkpoint coverage across more units and localize membership center text.

### 2026-04-13 checkpoint 7: math1090 order/completeness expansion and backlog constraints

- Added a new three-locale MATH1090 chapter-4 unit (`4.1 Order, bounds, and completeness`) from the Mar26 lecture notes and review packet references.
- Recorded explicit backlog constraint: `reference/` currently has no `MATH1010` source folder, so MATH1010 public-note completion is blocked by missing repository source material.
- Recorded explicit backlog constraint: `reference/CSCI2520/**` is present but primarily legacy `.ppt` binaries; a full source-backed chapter-by-chapter conversion requires a controlled extraction pass before claiming complete coverage.

### 2026-04-13 checkpoint 8: csci2520 ADT interactive baseline + reading-time function

- Added a new CSCI2520 unit (`1.1 ADT operations: stack, queue, and function pointers`) in EN/zh-HK/zh-CN under Notes.
- Added one embedded interactive widget (`adt-stack-queue-stepper`) for operation-semantics walkthrough aligned with ADT/function-operation demos.
- Added estimated reading-time computation in textbook content utilities and surfaced it in unit pages.
- Added an internal skill (`skills/ppt-reference-reader`) to standardize `.ppt/.pptx` extraction workflow before claiming full source-backed coverage for legacy slide decks.

### 2026-04-13 checkpoint 9: csci complexity unit + math1025 baseline units

- Added CSCI2520 chapter 2 baseline unit on complexity growth with a new interactive comparator.
- Added first MATH1025 baseline units (`0.1` and `1.1`) in EN/zh-HK/zh-CN from chapter-0/chapter-1 slide references.
- Kept remaining MATH1025 chapters (`ch2`-`ch11`) and CSCI2520 chapters beyond current authored units in active backlog for continued source-backed authoring cycles.

### 2026-04-24 checkpoint 10: split Math1090 chapter 4 into a public note family

- Reworked the previous merged `math1090` chapter-4 note into a textbook-like
  four-unit sequence in EN, zh-HK, and zh-CN: `4.1` total orders and ordered
  fields, `4.2` upper / lower bounds with `sup` / `inf`, `4.3` completeness and
  gaps in `Q`, and `4.4` axioms for the reals with the first approximation
  strategy.
- Updated textbook metadata and glossary coverage so the Notes sidebar,
  breadcrumbs, previous / next navigation, related-term popovers, and export
  routes all recognize the expanded family.
- Synchronized coverage and parity docs so the current public boundary now
  matches the repository reality through `§4.7`.
- Exact next target: continue from the post-`§4.7` Apr10 backlog rather than
  re-splitting chapter 4 again.

### 2026-04-24 checkpoint 11: finish the source-backed late Math1090 family

- Extended the public Math1090 notes in EN, zh-HK, and zh-CN with `4.5`
  Dedekind cuts and the embedding of `Q`, `4.6` decimal expansions and
  irrational numbers, `5.1` sequences and epsilon-`N` limits, `5.2` Cauchy
  sequences and another model of the reals, and `5.3` delta-epsilon limits,
  limit laws, and continuity.
- Added Math1090-specific interactives for cuts, decimal approximation,
  sequence limits, and delta-epsilon limits, plus static explanatory figure
  assets for the same concepts.
- Updated textbook metadata, glossary coverage, and localization / parity
  tracking so the public boundary now matches the repository reality through
  the source-backed chapter-5 limit material.
- Exact next target: stay on QA, export fidelity, and formatting / exercise
  integrity for the new Math1090 family rather than opening another missing
  content batch first.

### 2026-04-24 checkpoint 12: expand CSCI2520 toward near-complete public coverage

- Repaired the local PPT extraction helper so `.pptx` tutorial decks can be
  extracted with only Python standard-library modules.
- Extracted later CSCI2520 tutorial decks and selected legacy lecture decks
  into `docs/extracted/csci2520/**`.
- Added five three-language CSCI2520 units under public Notes:
  `2.1` lists as recursive ADTs, `3.2` selection / quickselect / linear-time
  sorting, `4.1` binary trees and BST operations, `5.1` graph traversal / MST /
  shortest paths, and `5.2` topological sort / heaps / Huffman coding.
- Updated `src/lib/textbook/catalog.ts` so the CSCI2520 sidebar now reaches
  lists, sorting, trees, graphs, topological sorting, and heap-based coding.
- Recorded that no checked-in CSCI2120 source tree exists; do not claim public
  CSCI2120 completion until repository sources are present.
- Validation so far: `npm run contentlayer` generated 181 documents.

### 2026-04-25 checkpoint 13: fill MATH1030 set-language and matrix-subspace gaps

- Audited the MATH1030 `1030gi-n**-**` family against the current public Notes
  map, with special attention to `1030gi-n04-01`, `1030gi-n04-02`,
  `1030gi-n05-05`, `1030gi-n05-05p`, and `1030gi-n05-07`.
- Added a new three-locale `4.2 Set language and solution sets` unit covering
  set membership, ambient spaces, solution-set notation, null spaces, span as a
  set, two-inclusion equality proofs, redundant-vector span arguments, worked
  examples, common mistakes, quick checks, and exercises.
- Added a new three-locale `6.7 Matrix subspaces, bases, and dimension` unit
  covering matrix spaces as vector spaces, matrix units `E_ij`, bases and
  dimensions of full matrix spaces, upper triangular matrices, skew-symmetric
  matrices, coordinate-vector conversion, and a repeatable basis routine.
- Expanded `6.5 Basis and dimension` with the dimension counting theorem,
  two-of-three basis criterion, rank-nullity-style basis tests, and comparable
  subspace consequences.
- Added a static study diagram for `6.6 Column space, row space, and rank` and
  inserted it into EN / zh-HK / zh-CN note pages; the zh-HK page was also
  cleaned toward formal written Hong Kong Chinese around this section.
- Added more MATH1030 checkpoint problems in the problem bank so the new /
  strengthened vector-space units have assessment coverage.
- Remaining issues: optional proof appendices such as `1030gi-n01-03p`,
  `1030gi-n01-03q`, `1030gi-n02-03p`, `1030gi-n05-02p/q/r`, and some older
  homogeneous-system viewpoints remain candidates for future appendix-style
  or refinement passes rather than blockers for the newly added core pages.

### 2026-04-25 checkpoint 14: row-operation matrices and span algorithms

- Added a new three-locale MATH1030 unit, `3.3 Row-operation matrices`, from
  `1030gi-n01-08.pdf`. The unit explains row-operation matrices as row
  operations applied to `I_p`, left multiplication, products of elementary
  matrices, reverse row operations, and invertibility.
- Expanded `6.3 Linear combinations and span` with the explicit `[U|v]`
  membership algorithm, proof via `Uc=c_1u_1+\cdots+c_qu_q`, and an
  inconsistency example proving non-membership.
- Expanded `6.4 Linear dependence and independence` with the homogeneous-system
  algorithm for `Uc=0`, the too-many-vectors shortcut, and relation reading
  from nontrivial solutions.
- Expanded `6.5 Basis and dimension` with the minimal-spanning-set extraction
  theorem from `1030gi-n05-03.pdf`: pivot positions are read from a reduced
  form of `U=[u_1\cdots u_q]`, but basis vectors are taken from the original
  generating list.
- Added checkpoint questions for row-operation matrices, span nonmembership,
  dependence relations from `Uc=0`, and minimal spanning sets.
- Remaining issues: optional proof-culture appendices and full REF/RREF
  existence / uniqueness proof appendices remain documented backlog rather than
  public-page blockers; the basis-existence / replacement / change-of-basis
  appendix family is now represented publicly.

### 2026-04-25 checkpoint 15: basis extension and change-of-basis appendix pass

- Added a new three-locale MATH1030 unit, `6.8 Basis extension and change of
  basis`, from `1030gi-n05-02p.pdf`, `1030gi-n05-02q.pdf`, and
  `1030gi-n05-02r.pdf`.
- The new unit covers basis existence for nonzero subspaces of `R^n`, the
  greedy selection proof idea, the Replacement Theorem, dimension counting
  consequences, ordered bases, coordinate vectors, the change-of-basis theorem,
  the formula `U=VS`, and coordinate conversion `[x]_V=S[x]_U`.
- Added a worked proper-subspace coordinate-conversion example based on the
  reference packet and two checkpoint questions covering replacement-theorem
  counting and change-of-basis coordinate conversion.
- Updated the catalog so the MATH1030 vector-space chapter now runs through
  `6.8`; later determinant, eigenvalue, and inner-product order values were
  shifted accordingly.
- Remaining issues at that point: after the later `2.5` pass, this backlog
  moved from REF / RREF existence into deeper RREF uniqueness / well-defined
  rank proof detail and exercise-depth parity. The RREF uniqueness proof
  detail is handled by checkpoint 18 below.

### 2026-04-25 checkpoint 16: late-chapter worked-example refinement

- Revisited already-authored MATH1030 late chapters against the `1030gi-n**`
  and `MATH1030-Notes` material, focusing on places where the public note had
  the right theorem spine but too little calculation for independent study.
- Expanded `8.2 Diagonalization and similarity` in EN, zh-HK, and zh-CN with a
  full `2 by 2` diagonalization example: characteristic polynomial, two
  eigenspaces, construction of `S` and `D`, verification through `AS=SD`, and
  the ordering convention for eigenvector columns.
- Expanded `9.1 Inner products, norms, and angles` in all three locales with a
  complete angle computation for two vectors, plus a polarization identity
  check showing how the same inner product can be recovered from norms.
- Expanded `9.3 Gram-Schmidt orthogonalization` in all three locales with a
  static study table for a three-vector Gram-Schmidt computation. This gives
  export-friendly projection data and intermediate orthogonal vectors instead
  of relying only on interactive or prose explanation.
- Added three checkpoint questions tied to these strengthened units:
  diagonalization order, angle cosine, and the first Gram-Schmidt projection
  coefficient.
- Remaining issues: late-chapter MATH1030 now has better computation support,
  but tutorial / practice-set material can still support broader exercise sets
  after the core article pages are stable.

### 2026-04-25 checkpoint 17: MATH1030 proof-language and REF/RREF appendix pass

- Audited `reference/MATH1030` against the live `content/textbook/math1030`
  tree and confirmed that the remaining "reference exists but no public note"
  gaps are mainly optional appendix material and exercise-depth parity, not
  missing core chapter families.
- Added a new three-locale public unit, `1.2 Reading theorems and proof
  language`, from `1030gi-n01-03p.pdf`, `1030gi-n01-03q.pdf`, and
  `1030gi-n01-04q.pdf`. The unit covers theorem assumptions and conclusions,
  converses, contrapositives, equivalences, direct proof, definitions,
  existence / uniqueness, and counterexamples.
- Added a new three-locale public unit, `2.5 Existence of row-echelon forms`,
  from `1030gi-n02-03p.pdf`, with `1030gi-n02-02p.pdf` as supporting
  small-size RREF context. The unit explains induction on row count for REF
  existence, induction on rank for REF-to-RREF existence, and preservation of
  pivot columns during cleanup.
- Updated the MATH1030 catalog so both new units appear under public Notes,
  and corrected the `2.3 Gaussian elimination and RREF` source refs to include
  `1030gi-n02-02.pdf` explicitly.
- Added checkpoint questions for the new proof-language and REF/RREF existence
  units.
- Updated this coverage ledger and removed the stale `0314 表格2.pdf` entry
  because no such file is present in the current `reference/MATH1030` tree.
- Remaining issues at that point: `1030gi-n03-04p.pdf` still contained deeper
  RREF uniqueness / well-defined rank proof detail than the public notes then
  spelled out. Checkpoint 18 handles that proof gap; assignments `as01`
  through `as03` remain only partially converted into WebWork-like public
  checkpoint coverage.

### 2026-04-25 checkpoint 18: MATH1030 RREF uniqueness and rank appendix pass

- Added a new three-locale public unit, `5.2 RREF uniqueness and well-defined
  rank`, from `1030gi-n03-04p.pdf`, with `1030gi-n03-04.pdf` as supporting
  material for preserved linear relations among corresponding columns.
- The new unit explains why RREF uniqueness is needed, proves uniqueness by
  induction on the number of pivot columns, shows how free-column relations
  force a second RREF column by column, and defines rank only after uniqueness
  is established.
- Updated the MATH1030 catalog so the unit appears under public Notes after
  `5.1 Invertible matrices`.
- Added checkpoint questions for the uniqueness conclusion and pivot-count
  rank reading.
- Remaining issues: the MATH1030 content backlog is now mainly broader
  assignment / tutorial exercise parity and export / rendering QA across the
  expanded higher-chapter sequence.

### 2026-04-25 checkpoint 19: MATH1030 matrix-algebra practice parity pass

- Strengthened the existing three-locale `3.1 Matrix multiplication and
  identity matrices` note using `1030efghi-as01.pdf`,
  `1030efghi-as01as.pdf`, `Practice Set 2_Matrix Algebra.pdf`, and
  `Practice Set 2_Solutions.pdf`.
- Added textbook-style coverage for assignment-style parameter recovery from a
  partially known product, noncommutative expansion of matrix products, the
  correct column interpretation of `AB`, and closure of lower triangular
  matrices under multiplication.
- Updated the MATH1030 catalog source refs so the assignment packet is visible
  as internal provenance for the strengthened `3.1` unit.
- Added checkpoint questions for parameter recovery and noncommuting product
  expansion in the problem bank.
- Remaining issues: assignment `as02` and `as03` still have problem structures
  that are only partially represented in public checkpoint coverage, and the
  higher-chapter export / rendering QA pass should continue.

### 2026-04-25 checkpoint 20: MATH1030 homogeneous-solution assignment parity pass

- Strengthened the existing three-locale `4.1 Homogeneous systems and null
  space` note using `1030efghi-as02.pdf` and `1030efghi-as02as.pdf`.
- Added textbook-style coverage for the assignment pattern that moves between
  one known particular solution, homogeneous solution directions, and the full
  solution set `S(A,b)=p+N(A)`.
- Added a direct proof explanation that if `u` and `v` both solve `Ax=b`, then
  `v-u` solves `Ax=0`, plus the assignment-style scaling check
  `2A((3/2)p)=3b` when `Ap=b`.
- Updated the MATH1030 catalog source refs so `as02` is visible as internal
  provenance for the strengthened `4.1` unit.
- Added a checkpoint question for the difference-of-particular-solutions
  pattern in the problem bank.
- Remaining issues: longer `as02` row-operation-matrix and RREF drill
  sequences are still better handled in future exercise-depth passes; `as03`
  invertibility / set-language practice parity remains the next assignment
  content target.

### 2026-04-25 checkpoint 21: MATH1030 as03 set-language and invertibility parity pass

- Strengthened the existing three-locale `4.2 Set language and solution sets`
  note using `1030efghi-as03.pdf` and `1030efghi-as03as.pdf`.
- Added textbook-style coverage for direct subset proofs from definitions,
  including the stacked matrix pattern
  `C=[A;B]` and `N(C)\subseteq N(\alpha A+\beta B)`.
- Added the same-coefficient solution-set intersection theorem: if
  `S(A,b)\cap S(A,c)` is nonempty, then a common solution forces `b=c`, hence
  `S(A,b)=S(A,c)`.
- Strengthened the existing three-locale `5.1 Invertible matrices` note with
  the determinant-free `as03` product-identity pattern: for square matrices,
  one-sided identities promote to genuine inverse relations, so `ABCD=I`
  forces cyclic identities such as `DABC=I`, `CDAB=I`, and `BCDA=I`, but not
  arbitrary reorderings.
- Updated catalog source refs for `4.2` and `5.1`, and added checkpoint
  questions for the solution-set intersection pattern and cyclic product
  identity pattern.
- Remaining issues: full `as03` numerical row-reduction tables, parameterized
  inverse computations, and longer Q10 polynomial identity proofs remain
  exercise-depth backlog rather than core article blockers.

### 2026-04-26 checkpoint 22: MATH1030 RREF numerical drill parity pass

- Strengthened the existing three-locale `2.3 Gaussian elimination and RREF`
  note using `1030efghi-as02.pdf` and `1030efghi-as02as.pdf`.
- Added a long augmented-system row-reduction example from the assignment
  pattern, including the intermediate echelon stage, final RREF, pivot/free
  variable reading, and full parametric solution form.
- Added a one-step RREF cleanup worked example so readers can recognize a
  matrix that is almost reduced but still has a nonzero entry above a pivot.
- Updated the MATH1030 catalog source refs for `2.3` and added checkpoint
  questions for the cleanup operation and scalar substitution in a parametric
  RREF solution.
- Remaining issues: as03 inverse-by-row-reduction and parameterized inverse
  computations remain better suited to a later invertibility-depth exercise
  pass; broader export / rendering QA should continue.

### 2026-04-26 checkpoint 23: MATH1030 as03 invertibility-depth pass

- Strengthened the existing three-locale `5.1 Invertible matrices` note using
  `1030efghi-as03.pdf` and `1030efghi-as03as.pdf`.
- Added a practice-style parameterized inverse computation for
  `A_alpha`, including the displayed augmented-row-reduction output,
  conclusion that `A_alpha` is invertible for every real `alpha`, and the
  explicit inverse matrix.
- Added determinant-free proof practice from Q10: a vector identity
  `A^2x=Ax+x` proving invertibility with inverse `A-I`, and a contradiction
  proof that `A^2+B^2` is not invertible under the hypotheses
  `A^3=B^3`, `A^2B=B^2A`, and `A != B`.
- Added in-page quick checks and a guided commutativity exercise from
  `(A-B)A=I`, plus two problem-bank checkpoints for parameter substitution
  in the inverse formula and the vector-identity inverse pattern.
- Remaining issues: full Q5 / Q6 / Q8 numerical row-reduction table parity
  and broader export QA across MATH1030 remain later exercise-depth work.
