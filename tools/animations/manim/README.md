# Manim Animation Workflow

This folder contains repo-local Manim scene source for short Notes visual
explanations. The public Notes pages remain article-first; rendered videos are
supporting study figures with static storyboard fallbacks for TXT/PDF export.

## Pilot Scenes

Current pilots target:

- unit: `math1030.matrices.gaussian-elimination-rref`
- public component id: `math1030-gaussian-elimination-rref-pivot-story`
- scenes:
  - `GaussianEliminationRrefPivotStoryEn`
  - `GaussianEliminationRrefPivotStoryZhHk`
  - `GaussianEliminationRrefPivotStoryZhCn`
- source: `scenes/math1030/gaussian_elimination_rref.py`
- unit: `math1030.matrices.matrix-basics`
- public component id: `math1030-matrix-basics-position-map`
- scenes:
  - `MatrixBasicsPositionMapEn`
  - `MatrixBasicsPositionMapZhHk`
  - `MatrixBasicsPositionMapZhCn`
- source: `scenes/math1030/matrix_basics.py`
- unit: `math1030.matrices.augmented-matrices-row-operations`
- public component id: `math1030-augmented-matrix-row-operation-safety`
- scenes:
  - `AugmentedMatrixRowOperationSafetyEn`
  - `AugmentedMatrixRowOperationSafetyZhHk`
  - `AugmentedMatrixRowOperationSafetyZhCn`
- source: `scenes/math1030/augmented_matrices.py`
- unit: `math1030.inner-products.gram-schmidt-orthogonalization`
- public component id: `math1030-gram-schmidt-projection-story`
- scenes:
  - `GramSchmidtProjectionStoryEn`
  - `GramSchmidtProjectionStoryZhHk`
  - `GramSchmidtProjectionStoryZhCn`
- source: `scenes/math1030/gram_schmidt.py`
- unit: `math1030.matrix-algebra.matrix-multiplication-and-linear-systems`
- public component id: `math1030-matrix-product-linear-system-story`
- scenes:
  - `MatrixProductLinearSystemStoryEn`
  - `MatrixProductLinearSystemStoryZhHk`
  - `MatrixProductLinearSystemStoryZhCn`
- source: `scenes/math1030/matrix_multiplication_linear_systems.py`
- unit: `math1030.matrix-algebra.row-operation-matrices`
- public component id: `math1030-row-operation-matrix-left-multiply-story`
- scenes:
  - `RowOperationMatrixLeftMultiplyStoryEn`
  - `RowOperationMatrixLeftMultiplyStoryZhHk`
  - `RowOperationMatrixLeftMultiplyStoryZhCn`
- source: `scenes/math1030/row_operation_matrices.py`
- unit: `math1030.vector-spaces.linear-combinations-and-span`
- public component id: `math1030-linear-combination-span-sweep-story`
- scenes:
  - `LinearCombinationSpanSweepStoryEn`
  - `LinearCombinationSpanSweepStoryZhHk`
  - `LinearCombinationSpanSweepStoryZhCn`
- source: `scenes/math1030/linear_combinations_span.py`
- unit: `math1030.vector-spaces.linear-dependence-and-independence`
- public component id: `math1030-linear-dependence-redundancy-story`
- scenes:
  - `LinearDependenceRedundancyStoryEn`
  - `LinearDependenceRedundancyStoryZhHk`
  - `LinearDependenceRedundancyStoryZhCn`
- source: `scenes/math1030/linear_dependence_independence.py`
- unit: `math1090.sets.functions-relations`
- public component id: `math1090-function-map-properties-story`
- scenes:
  - `FunctionMapPropertiesStoryEn`
  - `FunctionMapPropertiesStoryZhHk`
  - `FunctionMapPropertiesStoryZhCn`
- source: `scenes/math1090/functions_relations.py`
- unit: `math1025.complex-numbers.complex-number-arithmetic-and-geometry`
- public component id: `math1025-complex-plane-arithmetic-story`
- scenes:
  - `ComplexPlaneArithmeticStoryEn`
  - `ComplexPlaneArithmeticStoryZhHk`
  - `ComplexPlaneArithmeticStoryZhCn`
- source: `scenes/math1025/complex_numbers.py`

## Local Render

Use an isolated environment. Do not install Manim globally just for this repo.

```bash
npm run animation:manim:render
```

The default command renders all registered locale variants into the
course-specific directory under `public/generated/animations/<course>/`:

- `gaussian-elimination-rref-pivot-story-en.mp4`
- `gaussian-elimination-rref-pivot-story-en.png`
- `gaussian-elimination-rref-pivot-story-zh-hk.mp4`
- `gaussian-elimination-rref-pivot-story-zh-hk.png`
- `gaussian-elimination-rref-pivot-story-zh-cn.mp4`
- `gaussian-elimination-rref-pivot-story-zh-cn.png`
- `matrix-basics-position-map-en.mp4`
- `matrix-basics-position-map-en.png`
- `matrix-basics-position-map-zh-hk.mp4`
- `matrix-basics-position-map-zh-hk.png`
- `matrix-basics-position-map-zh-cn.mp4`
- `matrix-basics-position-map-zh-cn.png`
- `augmented-matrix-row-operation-safety-en.mp4`
- `augmented-matrix-row-operation-safety-en.png`
- `augmented-matrix-row-operation-safety-zh-hk.mp4`
- `augmented-matrix-row-operation-safety-zh-hk.png`
- `augmented-matrix-row-operation-safety-zh-cn.mp4`
- `augmented-matrix-row-operation-safety-zh-cn.png`
- `gram-schmidt-projection-story-en.mp4`
- `gram-schmidt-projection-story-en.png`
- `gram-schmidt-projection-story-zh-hk.mp4`
- `gram-schmidt-projection-story-zh-hk.png`
- `gram-schmidt-projection-story-zh-cn.mp4`
- `gram-schmidt-projection-story-zh-cn.png`
- `matrix-product-linear-system-story-en.mp4`
- `matrix-product-linear-system-story-en.png`
- `matrix-product-linear-system-story-zh-hk.mp4`
- `matrix-product-linear-system-story-zh-hk.png`
- `matrix-product-linear-system-story-zh-cn.mp4`
- `matrix-product-linear-system-story-zh-cn.png`
- `row-operation-matrix-left-multiply-story-en.mp4`
- `row-operation-matrix-left-multiply-story-en.png`
- `row-operation-matrix-left-multiply-story-zh-hk.mp4`
- `row-operation-matrix-left-multiply-story-zh-hk.png`
- `row-operation-matrix-left-multiply-story-zh-cn.mp4`
- `row-operation-matrix-left-multiply-story-zh-cn.png`
- `linear-combination-span-sweep-story-en.mp4`
- `linear-combination-span-sweep-story-en.png`
- `linear-combination-span-sweep-story-zh-hk.mp4`
- `linear-combination-span-sweep-story-zh-hk.png`
- `linear-combination-span-sweep-story-zh-cn.mp4`
- `linear-combination-span-sweep-story-zh-cn.png`
- `linear-dependence-redundancy-story-en.mp4`
- `linear-dependence-redundancy-story-en.png`
- `linear-dependence-redundancy-story-zh-hk.mp4`
- `linear-dependence-redundancy-story-zh-hk.png`
- `linear-dependence-redundancy-story-zh-cn.mp4`
- `linear-dependence-redundancy-story-zh-cn.png`
- `math1090/function-map-properties-story-en.mp4`
- `math1090/function-map-properties-story-en.png`
- `math1090/function-map-properties-story-zh-hk.mp4`
- `math1090/function-map-properties-story-zh-hk.png`
- `math1090/function-map-properties-story-zh-cn.mp4`
- `math1090/function-map-properties-story-zh-cn.png`
- `math1025/complex-plane-arithmetic-story-en.mp4`
- `math1025/complex-plane-arithmetic-story-en.png`
- `math1025/complex-plane-arithmetic-story-zh-hk.mp4`
- `math1025/complex-plane-arithmetic-story-zh-hk.png`
- `math1025/complex-plane-arithmetic-story-zh-cn.mp4`
- `math1025/complex-plane-arithmetic-story-zh-cn.png`

To render a single scene during iteration, pass the class name directly:

```bash
tools/animations/manim/scripts/render_scene.sh GaussianEliminationRrefPivotStoryZhHk
```

The render script also accepts the matrix-basics and augmented-matrix scene
classes directly, for example:

```bash
tools/animations/manim/scripts/render_scene.sh MatrixBasicsPositionMapZhHk
tools/animations/manim/scripts/render_scene.sh AugmentedMatrixRowOperationSafetyZhHk
tools/animations/manim/scripts/render_scene.sh GramSchmidtProjectionStoryZhHk
tools/animations/manim/scripts/render_scene.sh MatrixProductLinearSystemStoryZhHk
tools/animations/manim/scripts/render_scene.sh RowOperationMatrixLeftMultiplyStoryZhHk
tools/animations/manim/scripts/render_scene.sh LinearCombinationSpanSweepStoryZhHk
tools/animations/manim/scripts/render_scene.sh LinearDependenceRedundancyStoryZhHk
tools/animations/manim/scripts/render_scene.sh FunctionMapPropertiesStoryZhHk
tools/animations/manim/scripts/render_scene.sh ComplexPlaneArithmeticStoryZhHk
```

Connect rendered assets through localized `videoSrc` and `posterSrc` entries in
`src/lib/textbook/video-explanations.ts`.

## Publishing Rules

- Keep videos short and attached to a nearby definition, theorem, proof idea,
  worked example, or difficult transition.
- Do not autoplay.
- Provide static frames, captions, or transcript text for export.
- Keep Manim source under version control.
- Commit rendered media only when the asset is small enough for the repo and
  has passed visual QA; otherwise record the hosting decision in `docs/`.
