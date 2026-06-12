# Storyboard Generation Workflow (Internal)

This workflow converts note units into deterministic storyboard packages for
internal media production, while preserving textbook-first instructional rigor.

## 1) Metadata source of truth (human editable)

Each unit can include a `storyboard.json` (or `.yaml`) file stored alongside
MDX content, for example:

- `content/textbook/math1030/matrices/matrix-basics/storyboard.json`
- `content/textbook/math1030/matrices/augmented-matrices-row-operations/storyboard.json`
- `content/textbook/math1030/matrices/gaussian-elimination-rref/storyboard.json`
- `content/textbook/math1030/inner-products/gram-schmidt-orthogonalization/storyboard.json`
- `content/textbook/math1030/matrix-algebra/matrix-multiplication-and-linear-systems/storyboard.json`
- `content/textbook/math1030/matrix-algebra/row-operation-matrices/storyboard.json`
- `content/textbook/math1030/vector-spaces/linear-combinations-and-span/storyboard.json`
- `content/textbook/math1030/vector-spaces/linear-dependence-and-independence/storyboard.json`
- `content/textbook/math1090/sets/functions-relations/storyboard.json`
- `content/textbook/math1025/complex-numbers/complex-number-arithmetic-and-geometry/storyboard.json`
- `content/textbook/math1025/integer-methods/divisibility-gcd-and-integer-equations/storyboard.json`
- `content/textbook/math1025/integer-methods/rational-and-irrational-numbers/storyboard.json`
- `content/textbook/math1025/polynomial-methods/polynomial-arithmetic-and-division/storyboard.json`
- `content/textbook/csci2520/adt-and-operations/hash-tables-and-collision-strategies/storyboard.json`

Required segment taxonomy per locale:

1. `concept_intro`
2. `theorem_statement`
3. `example_walkthrough`
4. `recap_checkpoints`

The metadata is designed for deterministic generation:

- fixed segment types
- explicit ordering
- explicit beats, voiceover lines, and math blocks
- explicit animation intent labels

## 2) Deterministic package generation

Run:

```bash
npm run storyboard:generate
```

The generator validates each metadata file and then outputs a fingerprinted
package under `internal/storyboards/`:

- `manifest.json` (source trace + workflow stage manifest)
- `script-draft.md` (segment-structured narrative script)
- `narration-lines.txt` (clean lines for TTS/narration tools)
- `slide-plan.json` (segment-to-frame assembly plan)
- `qa-checklist.md` (internal QA gate)

Fingerprinting uses stable JSON serialization so the same metadata always yields
repeatable package output locations and content.

## 3) Internal production stages

The generated artifacts support this internal pipeline:

1. **Script drafting**
   - author edits `script-draft.md`
   - checks theorem wording against MDX theorem/definition blocks
2. **Narration generation**
   - use `narration-lines.txt` as canonical narration source
   - keep locale variants separate by folder
3. **Slide/animation assembly**
   - translate `slide-plan.json` into timeline scenes
   - preserve fixed segment order and math focus lists
4. **QA gate**
   - complete `qa-checklist.md`
   - block publish if notation/terminology/locale checks fail

## 4) QA checklist standards

Every locale package must pass:

- math notation correctness
- theorem statement fidelity to note content
- terminology consistency with `docs/terminology-glossary.md`
- locale correctness (`en`, `zh-hk`, `zh-cn`), with Hong Kong wording in
  Traditional Chinese
- storyboard order consistency
- recap alignment with quick checks/exercises

## 5) Scaling policy

Use pilot metrics gate first, then scale only after thresholds pass:

```bash
npm run storyboard:pilot-evaluate
```

Threshold and current pilot metrics are tracked in:

- `data/storyboard/pilot-thresholds.json`
- `data/storyboard/pilot-metrics.json`

If the gate fails, keep scope at pilot units and fix quality issues before
expanding to more units.

## 6) Manim bridge

For visual explanations that should become rendered videos, use the storyboard
package as the editorial source and Manim as the rendering backend.

Current pilots:

- `content/textbook/math1030/matrices/gaussian-elimination-rref/storyboard.json`
- `tools/animations/manim/scenes/math1030/gaussian_elimination_rref.py`
- public MDX id: `math1030-gaussian-elimination-rref-pivot-story`
- `content/textbook/math1030/matrices/matrix-basics/storyboard.json`
- `tools/animations/manim/scenes/math1030/matrix_basics.py`
- public MDX id: `math1030-matrix-basics-position-map`
- `content/textbook/math1030/matrices/augmented-matrices-row-operations/storyboard.json`
- `tools/animations/manim/scenes/math1030/augmented_matrices.py`
- public MDX id: `math1030-augmented-matrix-row-operation-safety`
- `content/textbook/math1030/inner-products/gram-schmidt-orthogonalization/storyboard.json`
- `tools/animations/manim/scenes/math1030/gram_schmidt.py`
- public MDX id: `math1030-gram-schmidt-projection-story`
- `content/textbook/math1030/matrix-algebra/matrix-multiplication-and-linear-systems/storyboard.json`
- `tools/animations/manim/scenes/math1030/matrix_multiplication_linear_systems.py`
- public MDX id: `math1030-matrix-product-linear-system-story`
- `content/textbook/math1030/matrix-algebra/row-operation-matrices/storyboard.json`
- `tools/animations/manim/scenes/math1030/row_operation_matrices.py`
- public MDX id: `math1030-row-operation-matrix-left-multiply-story`
- `content/textbook/math1030/vector-spaces/linear-combinations-and-span/storyboard.json`
- `tools/animations/manim/scenes/math1030/linear_combinations_span.py`
- public MDX id: `math1030-linear-combination-span-sweep-story`
- `content/textbook/math1030/vector-spaces/linear-dependence-and-independence/storyboard.json`
- `tools/animations/manim/scenes/math1030/linear_dependence_independence.py`
- public MDX id: `math1030-linear-dependence-redundancy-story`
- `content/textbook/math1090/sets/functions-relations/storyboard.json`
- `tools/animations/manim/scenes/math1090/functions_relations.py`
- public MDX id: `math1090-function-map-properties-story`
- `content/textbook/math1025/complex-numbers/complex-number-arithmetic-and-geometry/storyboard.json`
- `tools/animations/manim/scenes/math1025/complex_numbers.py`
- public MDX id: `math1025-complex-plane-arithmetic-story`
- `content/textbook/math1025/integer-methods/divisibility-gcd-and-integer-equations/storyboard.json`
- `tools/animations/manim/scenes/math1025/euclidean_bezout_integer_equations.py`
- public MDX id: `math1025-euclidean-bezout-integer-equation-story`
- `content/textbook/math1025/integer-methods/rational-and-irrational-numbers/storyboard.json`
- `tools/animations/manim/scenes/math1025/rational_irrational_roots.py`
- public MDX id: `math1025-rational-irrational-root-proof-story`
- `content/textbook/math1025/polynomial-methods/polynomial-arithmetic-and-division/storyboard.json`
- `tools/animations/manim/scenes/math1025/polynomial_division.py`
- public MDX id: `math1025-polynomial-division-remainder-story`
- `content/textbook/csci2520/adt-and-operations/hash-tables-and-collision-strategies/storyboard.json`
- `tools/animations/manim/scenes/csci2520/hash_table_collision_strategy.py`
- public MDX id: `csci2520-hash-table-collision-strategy-story`

The Notes page should keep a static storyboard fallback through
`VideoExplanation` until the MP4 has passed visual QA and is connected in
`src/lib/textbook/video-explanations.ts`.
