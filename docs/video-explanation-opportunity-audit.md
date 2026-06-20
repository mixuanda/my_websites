# Video Explanation Opportunity Audit

Date: 2026-05-25

Status: internal audit for source-backed Notes video integration. This is not
public reader copy.

Execution backlog: `docs/video-explanation-implementation-roadmap.md` contains
the complete per-unit implementation register generated from this audit.

## Scope Checked

This pass reviewed the current repository structure rather than guessing from
course names alone.

Evidence checked:

- `content/textbook/**/en.mdx`: 81 English note units across the active
  course areas.
- Locale parity files: 244 MDX files under `content/textbook/`, including
  English, Traditional Chinese, and Simplified Chinese variants.
- Course distribution by MDX file count:
  - `math1030`: 111 files, corresponding to 37 English note units.
  - `math1090`: 69 files, corresponding to 23 English note units.
  - `math1025`: 36 files, corresponding to 12 English note units.
  - `csci2520`: 27 files, corresponding to 9 English note units.
- Existing storyboard metadata:
  - `content/textbook/math1030/matrices/matrix-basics/storyboard.json`
  - `content/textbook/math1030/matrices/augmented-matrices-row-operations/storyboard.json`
  - `content/textbook/math1030/matrices/gaussian-elimination-rref/storyboard.json`
- Existing interactive metadata in `src/lib/textbook/catalog.ts`.
- Reference folders for `MATH1030`, `MATH1090`, `MATH1025`, and `CSCI2520`.
- No `reference/MATH1010/**` tree was found in this repository, so Math1010 is
  not a video-production candidate yet.

## Decision Rules

Use Manim video when the main learning value is a curated visual sequence:
state changes, formula transformations, geometric movement, matrix operations,
proof diagrams, or algorithm invariants.

Prefer a React/TypeScript embedded widget when the reader should control input,
try many cases, inspect code output, or repeatedly step through an algorithm.

Defer video when the section is mostly terminology, proof prose, or unsupported
by enough repository reference material.

Every accepted video candidate must have:

- English, Traditional Chinese, and Simplified Chinese support.
- `videoSrc` and `posterSrc` resolved by locale when visible text appears in
  the rendered video.
- A static TXT/PDF export fallback through `VideoExplanation` frames,
  captions, conclusion, and optional transcript.
- A poster image, native controls, no autoplay, and browser QA in at least one
  desktop viewport plus one mobile-width viewport.
- A source-backed storyboard before or during Manim scene implementation.

## Current Pilot

Implemented candidate:

| Course | Unit | Explanation id | Status | Why it fits |
| --- | --- | --- | --- | --- |
| Math1030 | `math1030.matrices.gaussian-elimination-rref` | `math1030-gaussian-elimination-rref-pivot-story` | Implemented pilot | Pivot selection, row replacement, REF, RREF, and reading the solution are sequential visual states. |

The pilot now uses separate rendered assets for `en`, `zh-hk`, and `zh-cn`
because the video frame itself contains localized explanatory text.

## Tier 1: High-Value Next Manim Candidates

These should be the next video candidates because they are already represented
in Notes, have source backing, and benefit from a short visual sequence.

| Priority | Course | Unit / topic | Suggested video idea | Reason |
| --- | --- | --- | --- | --- |
| 1 | Math1030 | `matrices/augmented-matrices-row-operations` | System-to-augmented-matrix morph, then equivalent row operations with invariant markers. | Existing storyboard exists and row operations are hard to read as prose only. |
| 2 | Math1030 | `matrices/matrix-basics` | Matrix anatomy: rows, columns, entries, size, equality checks, and indexing. | Existing storyboard exists and would make notation less brittle for beginners. |
| 3 | Math1030 | `matrix-algebra/matrix-multiplication-and-linear-systems` | Show dot products becoming matrix entries, then the same multiplication as several linear equations. | Strong visual payoff and already tied to matrix multiplication interactives. |
| 4 | Math1030 | `invertibility/invertible-matrices` | Row-reduce beside determinant / inverse cues to show equivalent invertibility tests. | The unit already has an invertibility row-reduction interaction, but a polished overview clip can set the conceptual map. |
| 5 | Math1030 | `vector-spaces/linear-combinations-and-span` | Vectors sweep out a line or plane as coefficients vary, then connect to span notation. | Geometric intuition is central and suitable for a short non-interactive explainer. |
| 6 | Math1030 | `vector-spaces/linear-dependence-and-independence` | Move one vector into or out of the span of previous vectors, then show the coefficient relation. | The concept is visual and often misread if only symbolic. |
| 7 | Math1030 | `vector-spaces/basis-and-dimension` | Done: build a basis from independent spanning vectors and label dimension as number of basis vectors. | Implemented as `math1030-basis-dimension-just-right-story`; the section links span, independence, and dimension shortcuts. |
| 8 | Math1030 | `determinants/row-operations-products-and-invertibility` | Animate row swaps, scaling, and row replacement effects on determinant value. | The effect of operations on determinant is stateful and easy to show visually. |
| 9 | Math1030 | `eigenvalues/diagonalization-and-similarity` | Transform a vector through a matrix, then show eigen-directions and diagonal action in a changed basis. | This is a natural Manim target because movement and basis change are the content. |
| 10 | Math1030 | `inner-products/gram-schmidt-orthogonalization` | Step through projection subtraction and normalization as vectors become orthogonal. | User feedback specifically identified Gram-Schmidt / orthogonalization as difficult by formula alone. |

## Tier 2: Good Candidates After Storyboard Preparation

These are good, but should not be started before a storyboard and export
fallback are written.

| Course | Unit / topic | Suggested video idea | Notes |
| --- | --- | --- | --- |
| Math1030 | `systems/equations-solution-sets` and `matrices/solution-set-types` | Lines / planes changing from unique solution to no solution to infinitely many solutions. | A short geometric clip would pair well with the existing classifier. |
| Math1030 | `matrix-algebra/row-operation-matrices` | Left multiplication by elementary matrices as row swaps, scaling, and replacement. | Use after the row-operation pilot is stable. |
| Math1030 | `vector-spaces/column-space-row-space-rank` | Done: one RREF selects original pivot columns for `C(A)`, nonzero RREF rows for `R(A)`, and rank as the shared count. | Implemented as `math1030-column-row-space-rank-story`; careful pacing keeps column space and row space separate. |
| Math1030 | `vector-spaces/matrix-subspaces-basis-dimension` | Done: fixed-size matrices as vectors, standard matrix units, constraints as free-parameter reductions, and `Sym_2(R)` splitting into basis matrices. | Implemented as `math1030-matrix-subspace-basis-dimension-story`; no widget added because the source-backed move is a curated decomposition, not reader-controlled computation. |
| Math1030 | `inner-products/orthogonal-sets-and-orthonormal-bases` | Orthogonal vectors, projections, and coordinate reading in an orthonormal basis. | Pairs naturally with Gram-Schmidt. |
| Math1090 | `sets/set-operations` | Union, intersection, complement, difference, and De Morgan transformations. | Existing set-operation interaction exists; video should be a concise theorem/intuition clip, not a replacement. |
| Math1090 | `sets/functions-relations` | Domain, codomain, image, preimage, injective/surjective/composition maps. | Strong visual fit for Manim arrows and set diagrams. |
| Math1090 | `numbers/induction-and-recursive-arithmetic` | Domino / ladder style induction with base case, step case, and recursion. | Existing induction stepper means video should be an overview. |
| Math1090 | `numbers/rationals-and-well-defined-operations` | Equivalent fraction classes collapsing to the same rational number. | Good proof-diagram candidate. |
| Math1090 | `numbers/gaps-in-q-and-sqrt2` | Nested rational intervals around `sqrt(2)` and the missing rational point. | Helps make an abstract gap visible. |
| Math1090 | `order-and-completeness/dedekind-cuts-and-embedding-of-q` | Cuts moving on the number line and rational embedding. | Existing interaction exists, but a curated clip can explain the construction. |
| Math1090 | `sequences-and-limits/sequences-and-epsilon-n-limits` | Epsilon band around a limit and the `N` after which all terms stay inside. | Very strong visual payoff. |
| Math1090 | `big-sets/cantor-theorem-continuum-and-choice` | Diagonal construction showing why the listed sequence misses a new element. | Must be tightly scripted to avoid mathematical sloppiness. |
| Math1025 | `complex-numbers/complex-number-arithmetic-and-geometry` | Complex addition, multiplication, rotation, modulus, and argument on the plane. | Natural geometry candidate. |
| Math1025 | `integer-methods/divisibility-gcd-and-integer-equations` | Euclidean algorithm and Bezout back-substitution as a state sequence. | Algorithmic but short enough for Manim. |
| Math1025 | `proof-and-inequalities/mathematical-induction` | Induction logic and a representative sum formula proof. | Good only if it stays proof-structured rather than decorative. |
| Math1025 | `sequences/sequences-and-recursion` | Recursive sequence generation and convergence/divergence behavior. | Existing sequence recursion lab suggests video should be explanatory overview. |
| Math1025 | `polynomial-methods/polynomial-arithmetic-and-division` | Long division tableau and remainder theorem visualization. | Already has a stepper; video can introduce the invariant. |
| Math1025 | `binomial-theorem/binomial-coefficients-and-expansions` | Pascal triangle growth and coefficient extraction. | Good visual payoff, but should not replace exercises. |
| CSCI2520 | `adt-and-operations/stack-queue-and-function-operations` | Push/pop/enqueue/dequeue and function-call stack states. | Manim can provide a polished overview, while practice should remain interactive. |
| CSCI2520 | `adt-and-operations/hash-tables-and-collision-strategies` | Hashing into buckets, collision, chaining, and probing. | Strong state-change candidate. |
| CSCI2520 | `complexity-and-sorting/selection-quickselect-and-linear-sorting` | Partition movement, quickselect narrowing, counting sort buckets. | For reader-controlled traces, React is better; Manim can provide the overview. |
| CSCI2520 | `trees/binary-trees-and-bst-operations` | Insertion/search/deletion and traversal order. | Good for short clips, but AVL-style balancing should be carefully scoped. |
| CSCI2520 | `graphs/graph-traversal-mst-and-shortest-paths` | BFS/DFS frontier, MST edge choice, Dijkstra relaxation. | High payoff, but each algorithm likely needs its own short clip. |
| CSCI2520 | `graphs/topological-sort-heaps-and-huffman-coding` | Heapify, topological queue, or Huffman merge tree. | Use one focused animation per invariant. |

## Prefer Interactive Widget Over Video

These topics should usually be interactive first, with video only as a short
intro or recap:

- Truth-table generation and propositional equivalence in Math1090.
- Quantifier-negation drills in Math1090.
- Checkpoint-style computational practice in Math1030 and Math1025.
- Code-output, pointer-state, and algorithm-tracing practice in CSCI2520.
- Any data-structure trace where the reader needs to choose inputs and inspect
  many possible states.

## Defer For Now

Do not start video work for:

- Math1010, because this repository currently has no `reference/MATH1010/**`
  source tree.
- Units whose main gap is content completeness rather than visual explanation.
- Pure public-copy cleanup, authentication flow, source-coverage tracking, or
  localization strategy docs.
- Very long lecture-style videos. The site should keep using short embedded
  study figures, not a detached course-video portal.

## Recommended Production Sequence

1. Finish the current MATH1030 RREF pilot and keep it as the reference pattern.
2. Promote the two remaining existing storyboard-backed MATH1030 matrix units:
   `matrix-basics` and `augmented-matrices-row-operations`.
3. Add a new storyboard for Gram-Schmidt because user feedback already
   identified that unit as visually underserved.
4. Add one Math1090 set/function clip to prove the pattern is not only matrix
   specific.
5. Add one CSCI2520 algorithm clip only after deciding the split between Manim
   curated overview and React reader-controlled trace.

## QA Checklist For Each Future Video

For each accepted video candidate, record this evidence before shipping:

- Source note and reference support identified.
- Storyboard file or `VideoExplanation` frame sequence written in all three
  locales.
- Manim source committed under `tools/animations/manim/scenes/<course>/`.
- `npm run animation:manim:render` or course-specific render command succeeds.
- MP4 metadata checked with `ffprobe`: codec, dimensions, duration, and size.
- Poster visually inspected for all three locales.
- English, Traditional Chinese, and Simplified Chinese note routes load the
  expected locale-specific `videoSrc`.
- Desktop light mode, desktop dark mode, and mobile-width browser QA have no
  framework overlay, relevant console errors, or horizontal overflow.
- TXT and PDF export include the static video explanation sequence.
