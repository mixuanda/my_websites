# Interactive component behavior

The math notes site is interactive-first. The live page teaches through
exploration, state changes, and guided steps. The component set stays small on
purpose so the experience remains coherent across routes and languages.

## Article-first embedding

Interactive blocks are part of the note, not a detached studio or mini-app.

- `InteractiveWidget` renders as a compact inline teaching panel with a
  localized label.
- Notes add lead-in paragraphs before widgets so the interaction reads as a
  guided pause inside the explanation.
- Widgets should sit near the paragraph, worked example, or quick check they
  are meant to clarify.
- Exports keep a static study snapshot instead of dropping the interaction
  entirely.

## Current reusable blocks

The current reusable note blocks live across
`src/components/textbook/mdx-blocks.tsx`,
`src/components/textbook/PrerequisiteLink.tsx`, and
`src/components/textbook/GlossaryPopover.tsx`.

- definition
- theorem card
- worked example
- common mistake
- collapsible proof
- quick check
- revealable solution
- prerequisite link
- glossary popover

## Current interactive widgets

The current widget set lives in `src/components/textbook/interactives.tsx`.

- `math1090`: truth-table builder, quantifier-negation stepper,
  set-operation explorer, integer-equivalence explorer,
  rational-representative lab
- `math1030`: system-to-augmented-matrix explorer, row-reduction stepper,
  matrix-multiplication visualizer, solution-set classifier,
  invertibility row-reduction demo, subspace checker, span explorer,
  independence checker
- `math1025`: sequence-recursion lab, polynomial-division stepper

## Behavior rules

Each widget must follow these rules.

- Keep the mathematical goal explicit.
- Show state changes that teach the next idea.
- Stay readable on small screens.
- Work in EN, zh-HK, and zh-CN without changing the mathematics.
- Provide a static export snapshot instead of disappearing in TXT or PDF.

## Export mapping

The export layer currently converts widgets through
`src/lib/textbook/interactive-snapshots.ts`.

- Step-based widgets export their revealed steps.
- Manipulable examples export representative states.
- Input/output widgets export representative input/output pairs.
- Diagram-heavy widgets export a short text summary or diagram note.

## Pedagogical rules

Use these rules when you author a new interactive note.

1. Start with the concept the learner is trying to understand.
2. Make the interaction expose that concept directly.
3. Embed the interaction where the learner naturally wants to test the idea,
   not in a detached section at the end.
4. Use the result to support the nearby worked example or quick check.
5. Keep the interaction short enough that the export snapshot stays useful.

## Current correction notes

The current pass especially strengthens the `math1030` note flow.

- `math1090` `3.3` now has an integer-equivalence explorer that keeps the
  quotient-class definition visible while readers change representatives and
  test the cross-sum condition.
- `math1090` `3.4` now has a rational-representative lab that compares
  candidate formulas for relations on `Q` against legal changes of fraction
  representative.
- `math1090` `2.1` still uses the existing set-operation explorer; the April
  27 depth pass added static set-builder, Venn-counting, and proof material
  rather than a new widget because the existing explorer already covers the
  state-changing part of union / intersection / difference / complement.
- `math1090` `2.2` did not add a widget. The new `B^A`, finite inverse,
  cardinality, operation, and Hasse-diagram material is proof-and-reading
  material that exports more cleanly as static worked examples and checkpoint
  problems.
- The April 28 MATH1090 Worksheet 3 parity pass also did not add a widget. The
  remaining Venn configurations and the `N x N -> N` injection are best handled
  as static region-reading / proof examples plus checkpoint questions, while
  the existing set-operation explorer continues to cover the state-changing
  union / intersection / difference / complement material.
- `2.3` now explains the distinction between REF, RREF, and back substitution
  before the learner opens the row-reduction stepper.
- Vector-space notes already use widgets to make subspace testing, span, and
  independence visible inside the article flow.
- The MATH1030 `6.5` basis-and-dimension video pass did not add a new widget.
  The existing `span-explorer` remains the reader-controlled follow-up; the new
  Manim clip is a short static overview tying span, independence, dimension,
  and the two-of-three basis shortcut together before the interactive pause.
- The MATH1030 `6.6` column-space / row-space / rank video pass did not add a
  new widget. The page already has a static map for the worked example, and
  the Manim clip clarifies the source-backed warning that RREF gives pivot
  positions for column-space basis selection while its nonzero rows give the
  row-space basis directly.
- Public note pages now keep source tracing out of the interaction chrome so
  the widget remains focused on learning rather than documentation.

## Next steps

The `math1030` `5.2 RREF uniqueness and well-defined rank` appendix pass did
not add a widget. The material is proof-structural, and the existing theorem,
collapsible-proof, quick-check, and reveal-solution blocks preserve the
article-first reading flow better than a detached interaction.

The later `math1030` `3.1` matrix-algebra practice parity pass also did not add
a new widget. The existing `matrix-multiplication-visualizer` remains the
right interaction for the unit; the new material is better represented as
worked examples, common mistakes, and static guided exercises so exports keep
the same learning value.

The later `math1030` `4.1` homogeneous-solution assignment parity pass also
did not add a new widget. The new material is the structural identity
`S(A,b)=p+N(A)`, the proof that `v-u in N(A)`, and static parameter-form
reading. Existing theorem, proof, worked-example, quick-check, and reveal
blocks preserve the article-first flow and export cleanly.

The later `math1030` `4.2` / `5.1` as03 assignment parity pass also did not
add a new widget. The added material is proof-structural: direct subset
arguments from definitions, solution-set intersection logic, and cyclic
product identities from `ABCD=I`. Existing theorem, proof, worked-example,
common-mistake, quick-check, and reveal blocks preserve the article-first flow
and export cleanly.

The later `math1030` `2.3` RREF numerical drill parity pass also did not add a
new widget. The existing row-reduction stepper already covers the state change
from row operations; the new material is a static practice-style computation
and is better represented through display math, worked examples, quick checks,
and guided exercises so exports keep the full study value.

The later `math1030` `5.1` as03 invertibility-depth pass also did not add a
new widget. The parameterized inverse computation is already a completed
static row-reduction output, and the Q10 material is determinant-free proof
practice. Existing worked-example, common-mistake, quick-check, and
reveal-solution blocks preserve the article-first flow and export cleanly.

The later `math1030` `5.1` as03 row-reduction table parity pass also did not
add a new widget. The added Q5 / Q6 / Q8 material is a static reading task:
recognize when the left block is the identity, interpret the right block as an
inverse, detect missing pivot columns, and translate the shared row-operation
product into an algebraic identity. Existing worked-example, quick-check, and
reveal-solution blocks keep the page article-first and export-friendly.

The later `math1030` `3.3` as02 row-operation product parity pass also did not
add a new widget. The added Q1-style material is a static product-order and
inverse-reading task: identify `H_1,...,H_6`, form
`J=H_6H_5H_4H_3H_2H_1`, and read the reverse multiplier `K` as `J^{-1}`.
Existing worked-example, quick-check, and reveal-solution blocks preserve the
article-first flow and export cleanly.

The later `math1030` `3.3` as02 parameterized row-operation product pass also
did not add a new widget. The Q2-style `G/H` construction is a static symbolic
tracking task: apply the parameterized row-operation chain to `I_5`, remember
that later operations use current rows, and reverse the chain to obtain
`H=G^{-1}`. Existing quick-check and reveal-solution blocks keep the page
article-first and export-friendly.

The Math1025 `5.1` sequences pass adds `math1025-sequence-recursion-lab`
because the source chapter explicitly compares recursive rules, explicit
general terms, arithmetic / geometric sums, and a mortgage recurrence. The
widget is justified because learners need to see how changing the number of
displayed terms affects term values, partial sums, and loan balances while
keeping the recursive and explicit descriptions visible.

The MATH1090 May 12 early-unit checkpoint pass did not add a widget. The added
material is assessment depth for already-authored logic and number-construction
notes: proposition recognition, truth-table row reading, quantified negation,
Peano successor structure, induction-step selection, and the rational
`sqrt(2)` gap. The existing article flow and checkpoint surface preserve the
learning value more cleanly than a new detached interaction.

The Math1025 `6.1` complex-number pass is documented without a new widget.
Although the source contains geometric material, this pass kept the public page
article-first and verified route rendering, static formulas, export readability,
and exercise pairing instead of introducing a detached complex-plane tool. Add
an interactive complex-plane component only if a later pass needs stateful
rotation, root-of-unity, or locus exploration beyond what static article
examples can explain.

The Math1025 `7.1` integer-methods pass also does not add a widget. Divisibility
definitions, Euclidean remainders, Bezout back-substitution, prime
factorization, and Diophantine solution families are best introduced through
static display math and worked examples in this first public unit. A future
Euclidean-algorithm stepper could be useful only if it remains article-embedded
and exports as a full static remainder / back-substitution table.

The Math1025 `7.2` rational / irrational-number pass also does not add a
widget. The supported material is proof-structure heavy: rational closure,
counterexamples for irrational operations, the reduced-fraction contradiction
for `sqrt(2)`, prime-root irrationality, and the perfect-square criterion for
`sqrt(n)`. Static theorem / example / quick-check blocks preserve the logical
sequence better than a detached calculator-style tool. A later radical
classification widget would only be justified if it stays embedded and exports
as a static table of representative integers and square-root classifications.

The Math1025 `8.1` polynomial-arithmetic pass adds
`math1025-polynomial-division-stepper` because the source chapter's first
computational bottleneck is reading long division as repeated leading-term
cancellation. The widget remains fixed to the chapter's Example 8.0 rather
than becoming a symbolic algebra app, and its export snapshot records the
quotient / remainder sequence so TXT and PDF exports retain the study value.
The companion `8.2` unit now uses a trilingual `VideoExplanation` for the
monic-gcd convention, Euclidean remainder-chain invariant, Bézout reverse pass,
and field-dependent irreducibility checks, but does not add a widget. The `8.3`
unit should follow the same constraint unless partial-fraction or Vieta support
requires a reader-controlled state. Gcd proof structure, irreducibility,
partial-fraction forms, and Vieta formulas are usually clearer as theorem-led
prose, worked examples, quick checks, and source-backed guided exercises.

The Math1030 `6.7` matrix-subspaces pass also does not add a widget. The
source-backed learning move is not stateful manipulation; it is recognizing
that fixed-size matrices form a vector space, identifying free parameters in
families such as `Sym_2(R)`, `UT_3(R)`, and `Skew_3(R)`, and splitting a
general matrix into fixed basis matrices. The trilingual Manim clip now
supports that one conceptual transition while the article keeps the formal
definitions, example, and entry-comparison independence proof in static,
export-friendly form.

The Math1030 `6.8` basis-extension and change-of-basis pass also stays
Manim-only. The source-backed move is a fixed theorem/example bridge:
express each `U`-basis vector in the `V`-basis, package those coordinate
columns as `S`, read `U=VS`, convert `[x]_U` to `[x]_V` with `S`, and reserve
`S^{-1}` for the reverse direction. A reader-controlled widget would only be
worth adding later if the course needs multi-basis coordinate conversion
practice beyond the current checkpoint questions and worked example.

The Math1030 `7.1` determinants and cofactor-expansion pass also stays
Manim-only. The source-backed move is a fixed recursive computation strategy:
delete one row and one column to form a minor, attach the checkerboard sign to
form a cofactor, split the determinant into signed smaller branches, prune zero
branches, and repeatedly collapse triangular matrices to their diagonal
products. A widget would be justified later only for reader-chosen row/column
expansion practice with grading; the current clip is the conceptual bridge
before the existing checkpoint and exercises.

The Math1030 `7.2` row-operations/products/invertibility pass also stays
Manim-only. The source-backed move is determinant bookkeeping: swaps multiply
by `-1`, row scaling multiplies by the scale factor, row replacement preserves
the determinant, triangular read-off must be corrected by that ledger, and the
same rules become `det(EA)=det(E)det(A)`, `det(AB)=det(A)det(B)`, and
`det(A)!=0` iff `A` is invertible. A widget would mostly duplicate
row-reduction bookkeeping and risk becoming a determinant calculator; a later
graded determinant-practice surface could be justified only if it remains
article-embedded and exports every operation, factor, and final determinant as
a static ledger.

The Math1030 `7.3` transpose, column-operations, and Cramer's-rule pass also
stays Manim-only. The source-backed move is the fixed proof mechanism behind
Cramer's rule: read `Ax=b` by columns, replace one selected column by `b`, use
column linearity, cancel the repeated-column determinants, and then divide by
`det(A)` in the source example. A reader-controlled widget would mainly become
another determinant calculator unless it were promoted into a later graded
Cramer-practice surface; the current article, static example, checkpoint, and
trilingual clip cover the explanatory transition cleanly and export as a fixed
study sequence.

The Math1030 `8.1` eigenvalues, eigenvectors, and eigenspaces pass also stays
Manim-only. The source-backed move is a fixed conceptual bridge: compare a
generic vector that changes direction with an eigenvector whose image stays on
the same line, enforce the nonzero-vector condition, rewrite `Av=λv` as
`(A-λI)v=0`, and name the eigenspace as `N(A-λI)`. A widget would only be
justified later for graded eigenspace-practice problems; this first pass is
better served as a short article-embedded explanation that exports as a static
study sequence.

The Math1030 `8.2` diagonalization and similarity pass also stays Manim-only.
The source-backed move is a fixed eigenbasis bridge: use the already computed
`C=[[3,2],[3,-2]]` eigendirections, place the independent eigenvectors as the
columns of `S`, match their eigenvalues in `D`, read `CS=SD` by columns, and
then convert it to the similarity form `S^{-1}CS=D`. A reader-controlled
widget would mainly become a diagonalization calculator unless promoted later
into graded eigenbasis practice; this first pass is better as a curated
article-embedded sequence with static export frames.

The Math1030 `8.3` characteristic-polynomial and diagonalization-test pass also
stays Manim-only. The source-backed move is a decision chain rather than a
stateful manipulation surface: package `det(A-lambda I)=0` as
`p_A(x)=det(A-xI)`, factor to read eigenvalues, separate algebraic
multiplicity from eigenspace dimension, and apply the dimension-sum or
distinct-eigenvalue tests. A reader-controlled widget would mainly become a
symbolic characteristic-polynomial calculator; a later graded practice surface
would need carefully scoped matrices, static export of every determinant and
null-space step, and answer checking before it belongs on the article page.

Add the next `math1030` widgets only for geometry-heavy or state-changing
topics once the source audit supports those units.
