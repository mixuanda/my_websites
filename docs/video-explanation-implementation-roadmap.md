# Video Explanation Implementation Roadmap

Date: 2026-05-25

Status: internal execution backlog for step-by-step video and interaction
improvement in the public Notes system.

This document turns the video-opportunity audit into an implementation list. It
should be used as the working backlog for future Manim `VideoExplanation`
passes and related React interactive-widget passes.

## Repository Scope Checked

This pass checked the current repository, not an imagined course list.

- `content/textbook/**/en.mdx`: 81 English note units.
- `content/textbook/**/*.mdx`: 244 localized MDX files.
- Current course distribution:
  - CSCI2520: 9 English note units.
  - Math1025: 12 English note units.
  - Math1030: 37 English note units.
  - Math1090: 23 English note units.
- Existing storyboard files:
  - `math1030/matrices/gaussian-elimination-rref`
  - `math1030/matrices/matrix-basics`
  - `math1030/matrices/augmented-matrices-row-operations`
  - `math1030/inner-products/gram-schmidt-orthogonalization`
  - `math1030/matrix-algebra/matrix-multiplication-and-linear-systems`
  - `math1030/matrix-algebra/row-operation-matrices`
  - `math1030/vector-spaces/linear-combinations-and-span`
  - `math1030/vector-spaces/linear-dependence-and-independence`
  - `math1030/vector-spaces/basis-and-dimension`
  - `math1030/vector-spaces/column-space-row-space-rank`
  - `math1030/vector-spaces/matrix-subspaces-basis-dimension`
  - `math1030/vector-spaces/basis-extension-and-change-of-basis`
  - `math1030/determinants/determinants-and-cofactor-expansion`
  - `math1030/determinants/row-operations-products-and-invertibility`
  - `math1030/determinants/transpose-column-operations-and-cramers-rule`
  - `math1030/eigenvalues/eigenvalues-eigenvectors-and-eigenspaces`
  - `math1030/eigenvalues/diagonalization-and-similarity`
  - `math1030/eigenvalues/characteristic-polynomials-and-diagonalization-tests`
  - `math1030/inner-products/inner-products-norms-and-angles`
  - `math1030/inner-products/orthogonal-sets-and-orthonormal-bases`
  - `math1030/inner-products/cauchy-schwarz-and-triangle-inequalities`
  - `math1030/matrices/solution-set-types`
  - `math1030/matrices/existence-of-row-echelon-forms`
  - `math1030/systems/equations-solution-sets`
  - `math1090/sets/functions-relations`
  - `math1025/complex-numbers/complex-number-arithmetic-and-geometry`
  - `math1025/integer-methods/divisibility-gcd-and-integer-equations`
  - `csci2520/adt-and-operations/hash-tables-and-collision-strategies`
- Existing video pilots:
  - `math1030/matrices/gaussian-elimination-rref`
  - `math1030/matrices/matrix-basics`
  - `math1030/matrices/augmented-matrices-row-operations`
  - `math1030/inner-products/gram-schmidt-orthogonalization`
  - `math1030/matrix-algebra/matrix-multiplication-and-linear-systems`
  - `math1030/matrix-algebra/row-operation-matrices`
  - `math1030/vector-spaces/linear-combinations-and-span`
  - `math1030/vector-spaces/linear-dependence-and-independence`
  - `math1030/vector-spaces/basis-and-dimension`
  - `math1030/vector-spaces/column-space-row-space-rank`
  - `math1030/vector-spaces/matrix-subspaces-basis-dimension`
  - `math1030/vector-spaces/basis-extension-and-change-of-basis`
  - `math1030/determinants/determinants-and-cofactor-expansion`
  - `math1030/determinants/row-operations-products-and-invertibility`
  - `math1030/determinants/transpose-column-operations-and-cramers-rule`
  - `math1030/eigenvalues/eigenvalues-eigenvectors-and-eigenspaces`
  - `math1030/eigenvalues/diagonalization-and-similarity`
  - `math1030/eigenvalues/characteristic-polynomials-and-diagonalization-tests`
  - `math1030/inner-products/inner-products-norms-and-angles`
  - `math1030/inner-products/orthogonal-sets-and-orthonormal-bases`
  - `math1030/inner-products/cauchy-schwarz-and-triangle-inequalities`
  - `math1030/matrices/solution-set-types`
  - `math1030/matrices/existence-of-row-echelon-forms`
  - `math1030/systems/equations-solution-sets`
  - `math1090/sets/functions-relations`
  - `math1025/complex-numbers/complex-number-arithmetic-and-geometry`
  - `math1025/integer-methods/divisibility-gcd-and-integer-equations`
  - `csci2520/adt-and-operations/hash-tables-and-collision-strategies`
- No `reference/MATH1010/**` tree exists, so Math1010 should not enter this
  implementation roadmap yet.

## Mode Legend

- `Done`: already has a public `VideoExplanation` and rendered localized assets.
- `Manim`: best next form is a short curated rendered explainer clip.
- `Manim + widget`: use Manim for the polished conceptual sequence, but keep or
  add React interaction for reader-controlled exploration.
- `Widget-first`: the main value is reader-controlled tracing or practice; use
  Manim only as an optional overview later.
- `Defer`: not a good first video target, or the current need is content/prose
  completeness rather than animation.

## Required Workflow Per Item

For each `Manim` or `Manim + widget` item:

1. Confirm source support in `reference/` and current MDX content.
2. Write or update a storyboard in the note unit folder.
3. Add a localized `VideoExplanation` entry with English, Traditional Chinese,
   and Simplified Chinese text.
4. Add Manim scene source under `tools/animations/manim/scenes/<course>/`.
5. Render all required locale variants.
6. Connect localized `videoSrc` and `posterSrc`.
7. Embed inside the article flow, close to the definition, theorem, proof idea,
   or worked example it explains.
8. Verify TXT and PDF export degrade to the static study sequence.
9. Run static QA, browser QA, and poster/video inspection.
10. Record the QA result in `docs/`.

For `Widget-first` items:

1. Confirm whether an existing interactive widget already covers the core
   learning task.
2. Improve the widget or add a focused widget before making a rendered clip.
3. If a video is later added, keep it short and use it as an overview, not as a
   replacement for the interactive trace.

## Current Video Design Defaults

- Video clips should stay short, article-embedded, and silent unless a later
  narration/caption policy is defined.
- If visible explanatory text appears inside the video, render separate
  locale-specific assets.
- Current Manim font defaults:
  - English: `Avenir Next`
  - Traditional Chinese: `PingFang HK`
  - Simplified Chinese: `PingFang SC`
- Do not autoplay.
- Always provide poster images.
- Always provide static export fallback.

## Execution Order

Use this order unless a later user request changes priority:

1. Maintain current pilots: Math1030 `2.3 Gaussian elimination and RREF`,
   Math1030 `2.1 Matrix basics`, Math1030 `2.2 Augmented matrices and row
   operations`, Math1030 `9.3 Gram-Schmidt orthogonalization`, Math1030 `3.2
   Matrix multiplication and linear systems`, and Math1030 `3.3 Row-operation
   matrices`, Math1030 `6.3 Linear combinations and span`, and Math1030 `6.4
   Linear dependence and independence`, Math1030 `6.5 Basis and dimension`,
   Math1030 `6.6 Column space, row space, and rank`, and Math1030 `6.7 Matrix
   subspaces, basis, and dimension`, and Math1030 `6.8 Basis extension and
   change of basis`, Math1030 `7.1 Determinants and cofactor expansion`, and
   Math1030 `7.2 Row operations, products, and invertibility`, and Math1030
   `7.3 Transpose, column operations, and Cramer's rule`, Math1030 `8.1
   Eigenvalues, eigenvectors, and eigenspaces`, Math1030 `8.2
   Diagonalization and similarity`, Math1030 `8.3 Characteristic polynomials
   and diagonalization tests`, and Math1030 `9.1 Inner products, norms, and
   angles`, and Math1030 `9.2 Orthogonal sets and orthonormal bases`.
2. Math1030 basis, rank, determinant, and eigenvalue units.
3. Remaining Math1030 matrix-algebra clips such as transpose, special
   matrices, and block matrices.
4. Remaining Math1090 set, limit, and completeness clips.
5. Math1025 complex-number, Euclidean-algorithm, polynomial, and sequence clips.
6. CSCI2520 algorithm clips only after deciding the Manim-vs-widget split for
   each algorithm trace.

## Math1030 Register

| Unit | Title | Mode | Operation to build | Next step |
| --- | --- | --- | --- | --- |
| `math1030/matrices/gaussian-elimination-rref` | 2.3 Gaussian elimination and RREF | Done | Pivot staircase, REF, RREF, and solved variables. | Keep as reference pattern. |
| `math1030/matrices/matrix-basics` | 2.1 Matrix basics | Done | Rows, columns, entries, size, equality, and indexing. | Completed as the second trilingual Manim pilot; keep as the entry-level matrix-position reference pattern. |
| `math1030/matrices/augmented-matrices-row-operations` | 2.2 Augmented matrices and row operations | Done | System-to-matrix morph and row-operation invariance. | Completed as the third trilingual Manim pilot; keep the existing widget as the reader-controlled follow-up. |
| `math1030/matrices/solution-set-types` | 2.4 Solution-set types | Done | RREF reading order, contradiction-row consistency, pivot/free-variable count, unique / no / infinite trichotomy, and bridge to the existing classifier. | Completed as the twenty-second Math1030 trilingual Manim pass; existing `solution-set-classifier` remains the reader-controlled follow-up. |
| `math1030/matrices/existence-of-row-echelon-forms` | 2.5 Existence of row-echelon forms | Done | REF existence by row-count induction, REF-to-RREF cleanup by rank induction, and pivot-column preservation. | Completed as the twenty-third Math1030 trilingual Manim pass; no widget was added because the source-backed value is the fixed proof-as-algorithm sequence. |
| `math1030/systems/equations-solution-sets` | 1.1 Equations and solution sets | Done | Lines as solution sets, intersections, empty intersections, coincident-line families, reversible equation rewrites, and bridge to augmented matrices. | Completed as the twenty-fourth Math1030 trilingual Manim pass; existing `system-augmented-matrix-explorer` remains the reader-controlled follow-up. |
| `math1030/systems/reading-theorems-and-proof-language` | 1.2 Reading theorems and proof language | Defer | Proof-reading map only if later needed. | Improve prose/checkpoints first. |
| `math1030/matrix-algebra/matrix-addition-scalar-multiplication` | 3.1 Matrix addition, subtraction, and scalar multiplication | Manim + widget | Entrywise arithmetic and scalar scaling. | Storyboard entrywise transformation. |
| `math1030/matrix-algebra/matrix-multiplication-and-identity` | 3.1 Matrix multiplication and identity matrices | Manim + widget | Dot products becoming entries; identity preserving vectors. | Storyboard multiplication panes. |
| `math1030/matrix-algebra/matrix-multiplication-and-linear-systems` | 3.2 Matrix multiplication and linear systems | Done | Matrix product as multiple linear equations. | Completed as the fifth trilingual Manim pilot; existing multiplication visualizer remains the reader-controlled follow-up. |
| `math1030/matrix-algebra/transpose-and-special-matrices` | 3.2 Transpose and special matrices | Manim | Reflect entries across the diagonal and label matrix families. | Consolidate with symmetric/skew-symmetric unit if overlapping. |
| `math1030/matrix-algebra/row-operation-matrices` | 3.3 Row-operation matrices | Done | Elementary matrices acting by left multiplication. | Completed as the sixth trilingual Manim pilot; no separate widget exists for this unit yet. |
| `math1030/matrix-algebra/transposes-and-symmetric-matrices` | 3.3 Transposes, symmetric matrices, and skew-symmetric matrices | Manim + widget | Symmetry and skew-symmetry as diagonal reflection rules. | Decide whether to merge with transpose video. |
| `math1030/matrix-algebra/special-matrices` | 3.4 Special matrices | Manim + widget | Diagonal, triangular, identity, zero, and special-family recognition. | Use current family checker as interactive anchor. |
| `math1030/matrix-algebra/block-matrices` | 3.5 Block matrices | Manim | Partitioned matrices and block multiplication compatibility. | Storyboard block boundaries and compatible sizes. |
| `math1030/solution-structure/homogeneous-systems-and-null-space` | 4.1 Homogeneous systems and null space | Manim | Null space as all vectors sent to zero. | Storyboard solution-set geometry. |
| `math1030/solution-structure/set-language-and-solution-sets` | 4.2 Set language and solution sets | Manim | Translate algebraic constraints into set-builder notation. | Keep short; avoid replacing prose. |
| `math1030/invertibility/invertible-matrices` | 5.1 Invertible matrices | Manim + widget | Equivalent invertibility tests through row reduction and inverse behavior. | Pair with existing invertibility demo. |
| `math1030/invertibility/rref-uniqueness-and-rank` | 5.2 RREF uniqueness and well-defined rank | Manim | Same matrix reaching one RREF and stable rank count. | Storyboard uniqueness/rank invariant. |
| `math1030/vector-spaces/vector-spaces` | 6.1 Vector spaces | Defer | Abstract axiom overview only if later needed. | Improve content/checkpoints first. |
| `math1030/vector-spaces/subspaces` | 6.2 Subspaces | Manim + widget | Closure under addition and scalar multiplication. | Pair with existing subspace checker. |
| `math1030/vector-spaces/linear-combinations-and-span` | 6.3 Linear combinations and span | Done | Coefficients sweeping out a line, plane, or span. | Completed as the seventh trilingual Manim pilot; keep the existing `span-explorer` as the reader-controlled follow-up. |
| `math1030/vector-spaces/linear-dependence-and-independence` | 6.4 Linear dependence and independence | Done | One vector entering span of previous vectors. | Completed as the eighth trilingual Manim pilot; keep the existing `independence-checker` as the reader-controlled follow-up. |
| `math1030/vector-spaces/basis-and-dimension` | 6.5 Basis and dimension | Done | Spanning as reach, independence as no redundancy, dimension as stable basis count, and the two-of-three shortcut. | Completed as the ninth Math1030 trilingual Manim pass; the existing `span-explorer` remains the reader-controlled follow-up. |
| `math1030/vector-spaces/column-space-row-space-rank` | 6.6 Column space, row space, and rank | Done | RREF pivot positions, original pivot columns as a column-space basis, nonzero RREF rows as a row-space basis, and rank as the shared count. | Completed as the tenth Math1030 trilingual Manim pass; no separate widget was added because the existing static map plus video covers the same source-backed example. |
| `math1030/vector-spaces/matrix-subspaces-basis-dimension` | 6.7 Matrix subspaces, basis, and dimension | Done | Fixed-size matrices as vectors, standard matrix units, free-parameter splitting for `Sym_2(R)`, and dimension as basis-size/free-parameter count. | Completed as the eleventh Math1030 trilingual Manim pass; no separate widget was added because the source-backed Sym2/UT/Skew examples are best served by the article, static formulas, and curated clip. |
| `math1030/vector-spaces/basis-extension-and-change-of-basis` | 6.8 Basis extension and change of basis | Done | Ordered bases on the same subspace, columns of `S` as coordinate recipes, `U=VS`, `[x]_V=S[x]_U`, and the reverse conversion via `S^{-1}`. | Completed as the twelfth Math1030 trilingual Manim pass; no separate widget was added because the source-backed theorem and proper-subspace example are best served by a curated coordinate-translation clip plus static worked examples. |
| `math1030/determinants/determinants-and-cofactor-expansion` | 7.1 Determinants and cofactor expansion | Done | Minor deletion, checkerboard cofactor signs, the source-backed 3 by 3 expansion tree, zero-branch pruning, one-nonzero collapse, and triangular diagonal products. | Completed as the thirteenth Math1030 trilingual Manim pass; no widget was added because the source-backed learning move is a curated recursive computation strategy, not an open-ended manipulation surface. |
| `math1030/determinants/row-operations-products-and-invertibility` | 7.2 Row operations, products, and invertibility | Done | Swap, scaling, and replacement determinant effects; row-replacement triangular computation; zero-row singularity; elementary-matrix bridge to product and invertibility tests. | Completed as the fourteenth Math1030 trilingual Manim pass; no widget was added because the source-backed value is determinant bookkeeping, not a detached calculator. |
| `math1030/determinants/transpose-column-operations-and-cramers-rule` | 7.3 Transpose, column operations, and Cramer's rule | Done | Column replacement, column linearity, repeated-column cancellation, and the source-backed Cramer numerator example. | Completed as the fifteenth Math1030 trilingual Manim pass; no widget was added because the source-backed value is the fixed proof mechanism behind Cramer's rule, not open-ended determinant calculation. |
| `math1030/eigenvalues/eigenvalues-eigenvectors-and-eigenspaces` | 8.1 Eigenvalues, eigenvectors, and eigenspaces | Done | Vectors that keep direction under transformation, the conversion `Av=λv` to `(A-λI)v=0`, and eigenspace as null space. | Completed as the sixteenth Math1030 trilingual Manim pass; no widget was added because the source-backed value is a fixed direction-to-null-space bridge. |
| `math1030/eigenvalues/diagonalization-and-similarity` | 8.2 Diagonalization and similarity | Done | Change of basis making the transformation diagonal: source eigendirections become columns of `S`, `CS=SD` packages the eigenvector equations, and `S^{-1}CS=D` is the diagonalization. | Completed as the seventeenth Math1030 trilingual Manim pass; no widget was added because the source-backed value is the fixed eigenbasis-to-similarity bridge. |
| `math1030/eigenvalues/characteristic-polynomials-and-diagonalization-tests` | 8.3 Characteristic polynomials and diagonalization tests | Done | `det(A - lambda I)` pipeline, repeated-root multiplicity warning, eigenspace dimension count, and distinct-eigenvalue shortcut. | Completed as the eighteenth Math1030 trilingual Manim pass; no widget was added because the source-backed value is the fixed polynomial-to-diagonalization-test bridge. |
| `math1030/inner-products/inner-products-norms-and-angles` | 9.1 Inner products, norms, and angles | Done | Standard inner product, source-backed norm and normalization, plus a short 9.2 angle / orthogonality bridge. Projection subtraction is explicitly deferred to Gram-Schmidt. | Completed as the nineteenth Math1030 trilingual Manim pass; no widget was added because the source-backed value is the fixed algebra-to-geometry bridge, not an open-ended vector calculator. |
| `math1030/inner-products/orthogonal-sets-and-orthonormal-bases` | 9.2 Orthogonal sets and orthonormal bases | Done | Orthogonality, automatic independence, coordinate reading, and normalization to an orthonormal basis. Projection subtraction remains reserved for Gram-Schmidt. | Completed as the twentieth Math1030 trilingual Manim pass; no widget was added because the source-backed value is the fixed coefficient-reading mechanism, not a general vector calculator. |
| `math1030/inner-products/gram-schmidt-orthogonalization` | 9.3 Gram-Schmidt orthogonalization | Done | Projection subtraction and normalization step by step. | Completed as the fourth trilingual Manim pilot; keep the static table as the export-friendly follow-up. |
| `math1030/inner-products/cauchy-schwarz-and-triangle-inequalities` | 9.4 Cauchy-Schwarz and triangle inequalities | Done | Nonnegative quadratic proof of Cauchy-Schwarz, zero-vector case, equality as linear dependence, and triangle inequality as a two-step path estimate controlled by Cauchy-Schwarz. | Completed as the twenty-first Math1030 trilingual Manim pass; no widget was added because the source-backed value is a fixed proof chain, not an open-ended vector calculator. |

## Math1090 Register

| Unit | Title | Mode | Operation to build | Next step |
| --- | --- | --- | --- | --- |
| `math1090/logic/propositional-logic` | 1.1 Propositional logic | Widget-first | Formula construction and connective truth behavior. | Improve truth-table widget before video. |
| `math1090/logic/truth-tables-equivalence` | 1.2 Truth tables and equivalence | Widget-first | Truth-table comparison and equivalence checking. | Keep as interactive practice; optional overview later. |
| `math1090/logic/quantifiers-negation` | 1.3 Quantifiers and negation | Widget-first | Negation movement through quantifiers. | Keep stepper as primary surface. |
| `math1090/sets/set-operations` | 2.1 Sets and set operations | Manim + widget | Venn/set regions for union, intersection, complement, and De Morgan laws. | Storyboard one theorem-style clip. |
| `math1090/sets/functions-relations` | 2.2 Functions and relations | Done | Domain, target, graph, image, preimage, injection, surjection, and composition. | Completed as the first non-Math1030 trilingual Manim pilot; no separate widget exists for this unit yet. |
| `math1090/numbers/natural-numbers-peano` | 3.1 Natural numbers and Peano's axioms | Manim | Successor chain and recursive construction. | Storyboard axiom-to-construction map. |
| `math1090/numbers/induction-and-recursive-arithmetic` | 3.2 Induction and recursive arithmetic | Manim + widget | Base case, induction step, and recursion ladder. | Pair with existing induction stepper. |
| `math1090/numbers/integers-from-equivalence-classes` | 3.3 Integers from equivalence classes | Manim + widget | Pairs collapsing into equivalence classes. | Pair with integer-equivalence explorer. |
| `math1090/numbers/rationals-and-well-defined-operations` | 3.4 Rationals and well-defined operations | Manim + widget | Fraction representatives collapsing to the same rational. | Pair with rational representative lab. |
| `math1090/numbers/gaps-in-q-and-sqrt2` | 3.5 Gaps in Q and why sqrt(2) is not rational | Manim | Rational number line with missing `sqrt(2)` point. | Storyboard proof plus number-line intuition. |
| `math1090/order-and-completeness/order-bounds-and-completeness` | 4.1 Total orders and ordered fields | Manim | Ordered field structure and bounded sets. | Use only if tied to supremum clip. |
| `math1090/order-and-completeness/supremum-and-infimum` | 4.2 Upper bounds, supremum, and infimum | Manim | Upper-bound set shrinking to least upper bound. | High-value completeness clip. |
| `math1090/order-and-completeness/completeness-and-gaps-in-q` | 4.3 Completeness and gaps in Q | Manim | Gap in rationals versus completeness of reals. | Pair with `sqrt(2)` gap clip. |
| `math1090/order-and-completeness/axioms-for-the-reals-and-first-approximations` | 4.4 Axioms for the reals and first approximations | Defer | Mostly structural/prose content. | Improve content/checkpoints first. |
| `math1090/order-and-completeness/dedekind-cuts-and-embedding-of-q` | 4.5 Dedekind cuts and the embedding of Q | Manim + widget | Moving cuts and rational embedding into cuts. | Pair with existing cut explorer. |
| `math1090/order-and-completeness/decimal-expansions-and-irrational-numbers` | 4.6 Decimal expansions and irrational numbers | Manim + widget | Nested decimal intervals and non-terminating behavior. | Pair with decimal approximation builder. |
| `math1090/sequences-and-limits/sequences-and-epsilon-n-limits` | 5.1 Sequences and epsilon-N limits | Manim + widget | Terms entering an epsilon band after `N`. | Strong limit clip candidate. |
| `math1090/sequences-and-limits/cauchy-sequences-and-another-real-construction` | 5.2 Cauchy sequences and another model of the reals | Manim | Terms clustering together without naming the limit first. | Storyboard Cauchy band sequence. |
| `math1090/sequences-and-limits/delta-epsilon-limits-limit-laws-and-continuity` | 5.3 Delta-epsilon limits, limit laws, and continuity | Manim + widget | Delta window mapping into epsilon window. | Pair with delta-epsilon explorer. |
| `math1090/big-sets/cardinality-countability-and-cardinal-inequalities` | 6.1 Cardinality, countability, and cardinal inequalities | Manim + widget | Matching, injection, surjection, and countable listing. | Pair with cardinality comparison lab. |
| `math1090/big-sets/cantor-theorem-continuum-and-choice` | 6.1.2-6.3 Cantor's theorem, continuum, and choice | Manim + widget | Diagonal construction producing a missing element. | Pair with Cantor diagonal lab. |
| `math1090/big-sets/intervals-cantor-set-density-and-well-ordering` | 6.4-6.7 Intervals, Cantor set, density, and well-ordering | Manim + widget | Cantor-set stage removal and density examples. | Pair with Cantor-set stage viewer. |
| `math1090/sets-with-structure/binary-operations-monoids-and-groups` | 7.1-7.2 Binary operations, monoids, and groups | Manim + widget | Cayley table, identity, inverses, and associativity checks. | Pair with monoid/group law checker. |

## Math1025 Register

| Unit | Title | Mode | Operation to build | Next step |
| --- | --- | --- | --- | --- |
| `math1025/foundations/course-foundations-and-notation` | 0.1 Course foundations and notation | Defer | Orientation and notation map only if needed. | Prioritize content completeness. |
| `math1025/foundations/equation-structure-and-trigonometric-identities` | 1.1 Equation structure and trigonometric identities | Manim | Equation transformations and trig identity rewrites. | Storyboard one identity transformation. |
| `math1025/proof-and-inequalities/mathematical-induction` | 2.1 Mathematical induction | Manim | Base case and induction step as proof ladder. | Coordinate with Math1090 induction clip. |
| `math1025/proof-and-inequalities/inequalities-and-absolute-value` | 3.1 Inequalities and absolute value | Manim | Number-line intervals and absolute-value distance. | Storyboard interval transformations. |
| `math1025/binomial-theorem/binomial-coefficients-and-expansions` | 4.1 Binomial coefficients and expansions | Manim | Pascal triangle growth and coefficient extraction. | Good medium-priority clip. |
| `math1025/sequences/sequences-and-recursion` | 5.1 Sequences, recursion, and series | Manim + widget | Recurrence generation and convergence/divergence behavior. | Pair with existing recursion lab. |
| `math1025/complex-numbers/complex-number-arithmetic-and-geometry` | 6.1 Complex numbers, polar form, and geometry | Done | Complex-plane point/vector reading, vector addition, modulus, argument, polar form, and multiplication as rotation plus scaling. | Completed as the first Math1025 trilingual Manim pilot; no separate widget exists for this unit yet. |
| `math1025/integer-methods/divisibility-gcd-and-integer-equations` | 7.1 Divisibility, gcd, and integer equations | Done | Euclidean algorithm, gcd invariant, back-substitution, Bézout combination, and Diophantine solvability test. | Completed as the second Math1025 trilingual Manim pilot; QA is recorded in `docs/manim-euclidean-bezout-video-qa-2026-06-12.md`. |
| `math1025/integer-methods/rational-and-irrational-numbers` | 7.2 Rational and irrational numbers | Done | Contradiction proof for `sqrt(2)`, prime nth-root irrationality pattern, and perfect-square test. | Completed as the third Math1025 trilingual Manim pilot; QA is recorded in `docs/manim-rational-irrational-video-qa-2026-06-12.md`. |
| `math1025/polynomial-methods/polynomial-arithmetic-and-division` | 8.1 Polynomial arithmetic and division | Done | Long division tableau, leading-term cancellation, quotient accumulation, remainder degree stop condition, and final `f=gq+r` invariant. | Completed as the fourth Math1025 trilingual Manim pass; the existing polynomial division stepper remains the reader-controlled follow-up, and QA is recorded in `docs/manim-polynomial-division-video-qa-2026-06-12.md`. |
| `math1025/polynomial-methods/polynomial-gcds-and-irreducibility` | 8.2 Polynomial gcds and irreducibility | Done | Euclidean remainder-chain invariant, monic gcd normalization, Bézout back-substitution, coefficient-field-dependent irreducibility, and prime-like divisibility tests. | Completed as the fifth Math1025 trilingual Manim pass; no widget was added because the unit is theorem-led. QA is recorded in `docs/manim-polynomial-gcd-video-qa-2026-06-12.md`. |
| `math1025/polynomial-methods/rational-functions-and-vieta` | 8.3 Rational functions, partial fractions, and Vieta formulas | Manim | Partial-fraction decomposition and root-coefficient relationships. | Split into two short clips if needed. |

## CSCI2520 Register

CSCI2520 should remain widget-first for traces where the reader needs to choose
inputs. Manim is still useful for short invariant-focused overview clips.

| Unit | Title | Mode | Operation to build | Next step |
| --- | --- | --- | --- | --- |
| `csci2520/programming-foundations/pointers-memory-and-structs` | 0.1 Pointers, memory, and structs | Widget-first | Pointer state, memory boxes, struct fields, and aliasing. | Improve pointer tracer first. |
| `csci2520/adt-and-operations/stack-queue-and-function-operations` | 1.1 ADT operations: stack, queue, and function pointers | Manim + widget | Stack push/pop, queue enqueue/dequeue, and call-stack frames. | Pair with existing ADT stepper. |
| `csci2520/adt-and-operations/hash-tables-and-collision-strategies` | 1.2 Hash tables and collision strategies | Done | Hash buckets, collisions, chaining, and probing. | Completed as the first CSCI2520 trilingual Manim + widget pass; `hash-bucket-lab` remains the reader-controlled follow-up. |
| `csci2520/lists-and-recursion/lists-as-recursive-adts` | 2.1 Lists as recursive ADTs | Widget-first | Recursive list structure and pointer traversal. | Add trace widget before video. |
| `csci2520/complexity-and-sorting/complexity-growth-and-cost` | 3.1 Complexity growth and algorithmic cost | Manim + widget | Growth curves and cost comparison. | Pair with complexity comparator. |
| `csci2520/complexity-and-sorting/selection-quickselect-and-linear-sorting` | 3.2 Selection, quickselect, and linear-time sorting | Manim + widget | Partition movement, narrowing search, and bucket/counting states. | Decide per-algorithm clip scope. |
| `csci2520/trees/binary-trees-and-bst-operations` | 4.1 Binary trees and BST operations | Manim + widget | Search, insertion, deletion, traversal, and rotation if covered. | Start with one BST search/insert clip. |
| `csci2520/graphs/graph-traversal-mst-and-shortest-paths` | 5.1 Graph traversal, spanning trees, and shortest paths | Manim + widget | BFS/DFS frontier, MST edge choice, and Dijkstra relaxation. | Split into separate algorithm clips. |
| `csci2520/graphs/topological-sort-heaps-and-huffman-coding` | 5.2 Topological sort, heaps, and Huffman coding | Manim + widget | Topological queue, heapify, and Huffman merge tree. | Pick heapify or Huffman first. |

## Next Implementation Slices

These are the concrete next slices to execute one by one:

1. Continue the next unresolved Math1030 register item:
   `systems/equations-solution-sets`, unless the roadmap priority changes.
2. Generalize the Manim render registry further if the course-aware shell
    registry becomes too large for future non-Math1030 assets.

## Maintenance Notes

- Keep this roadmap updated after each implementation slice.
- Move items from `Manim` to `Done` only after localized assets and export QA
  are recorded.
- Generated MP4/poster assets remain repo-local under
  `public/generated/animations/` until the gates in
  `docs/generated-video-storage-policy.md` say to move them.
- If a unit is found to lack enough reference support, mark the item blocked in
  this file and in the relevant coverage document.
- Do not add videos merely because a unit exists. The animation must clarify a
  specific mathematical, algorithmic, or proof transition.
