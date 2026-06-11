#!/usr/bin/env bash
set -euo pipefail

QUALITY="${MANIM_QUALITY:-ql}"

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../.." && pwd)"
MEDIA_DIR="tools/animations/manim/.media"
PUBLIC_ROOT="public/generated/animations"

if [[ "$#" -gt 0 ]]; then
  TARGET_SCENES=("$@")
else
  TARGET_SCENES=(
    "GaussianEliminationRrefPivotStoryEn"
    "GaussianEliminationRrefPivotStoryZhHk"
    "GaussianEliminationRrefPivotStoryZhCn"
    "MatrixBasicsPositionMapEn"
    "MatrixBasicsPositionMapZhHk"
    "MatrixBasicsPositionMapZhCn"
    "AugmentedMatrixRowOperationSafetyEn"
    "AugmentedMatrixRowOperationSafetyZhHk"
    "AugmentedMatrixRowOperationSafetyZhCn"
    "GramSchmidtProjectionStoryEn"
    "GramSchmidtProjectionStoryZhHk"
    "GramSchmidtProjectionStoryZhCn"
    "MatrixProductLinearSystemStoryEn"
    "MatrixProductLinearSystemStoryZhHk"
    "MatrixProductLinearSystemStoryZhCn"
    "RowOperationMatrixLeftMultiplyStoryEn"
    "RowOperationMatrixLeftMultiplyStoryZhHk"
    "RowOperationMatrixLeftMultiplyStoryZhCn"
    "LinearCombinationSpanSweepStoryEn"
    "LinearCombinationSpanSweepStoryZhHk"
    "LinearCombinationSpanSweepStoryZhCn"
    "LinearDependenceRedundancyStoryEn"
    "LinearDependenceRedundancyStoryZhHk"
    "LinearDependenceRedundancyStoryZhCn"
    "FunctionMapPropertiesStoryEn"
    "FunctionMapPropertiesStoryZhHk"
    "FunctionMapPropertiesStoryZhCn"
    "ComplexPlaneArithmeticStoryEn"
    "ComplexPlaneArithmeticStoryZhHk"
    "ComplexPlaneArithmeticStoryZhCn"
    "HashTableCollisionStrategyStoryEn"
    "HashTableCollisionStrategyStoryZhHk"
    "HashTableCollisionStrategyStoryZhCn"
  )
fi

cd "$ROOT_DIR"

run_manim() {
  local scene_class="$1"
  local scene_file="$2"
  if command -v uv >/dev/null 2>&1; then
    uv run --project tools/animations/manim manim "-${QUALITY}" "$scene_file" "$scene_class" --media_dir "$MEDIA_DIR"
  else
    python3 -m manim "-${QUALITY}" "$scene_file" "$scene_class" --media_dir "$MEDIA_DIR"
  fi
}

scene_file() {
  case "$1" in
    GaussianEliminationRrefPivotStory|GaussianEliminationRrefPivotStoryEn|GaussianEliminationRrefPivotStoryZhHk|GaussianEliminationRrefPivotStoryZhCn)
      printf '%s\n' "tools/animations/manim/scenes/math1030/gaussian_elimination_rref.py"
      ;;
    MatrixBasicsPositionMap|MatrixBasicsPositionMapEn|MatrixBasicsPositionMapZhHk|MatrixBasicsPositionMapZhCn)
      printf '%s\n' "tools/animations/manim/scenes/math1030/matrix_basics.py"
      ;;
    AugmentedMatrixRowOperationSafety|AugmentedMatrixRowOperationSafetyEn|AugmentedMatrixRowOperationSafetyZhHk|AugmentedMatrixRowOperationSafetyZhCn)
      printf '%s\n' "tools/animations/manim/scenes/math1030/augmented_matrices.py"
      ;;
    GramSchmidtProjectionStory|GramSchmidtProjectionStoryEn|GramSchmidtProjectionStoryZhHk|GramSchmidtProjectionStoryZhCn)
      printf '%s\n' "tools/animations/manim/scenes/math1030/gram_schmidt.py"
      ;;
    MatrixProductLinearSystemStory|MatrixProductLinearSystemStoryEn|MatrixProductLinearSystemStoryZhHk|MatrixProductLinearSystemStoryZhCn)
      printf '%s\n' "tools/animations/manim/scenes/math1030/matrix_multiplication_linear_systems.py"
      ;;
    RowOperationMatrixLeftMultiplyStory|RowOperationMatrixLeftMultiplyStoryEn|RowOperationMatrixLeftMultiplyStoryZhHk|RowOperationMatrixLeftMultiplyStoryZhCn)
      printf '%s\n' "tools/animations/manim/scenes/math1030/row_operation_matrices.py"
      ;;
    LinearCombinationSpanSweepStory|LinearCombinationSpanSweepStoryEn|LinearCombinationSpanSweepStoryZhHk|LinearCombinationSpanSweepStoryZhCn)
      printf '%s\n' "tools/animations/manim/scenes/math1030/linear_combinations_span.py"
      ;;
    LinearDependenceRedundancyStory|LinearDependenceRedundancyStoryEn|LinearDependenceRedundancyStoryZhHk|LinearDependenceRedundancyStoryZhCn)
      printf '%s\n' "tools/animations/manim/scenes/math1030/linear_dependence_independence.py"
      ;;
    FunctionMapPropertiesStory|FunctionMapPropertiesStoryEn|FunctionMapPropertiesStoryZhHk|FunctionMapPropertiesStoryZhCn)
      printf '%s\n' "tools/animations/manim/scenes/math1090/functions_relations.py"
      ;;
    ComplexPlaneArithmeticStory|ComplexPlaneArithmeticStoryEn|ComplexPlaneArithmeticStoryZhHk|ComplexPlaneArithmeticStoryZhCn)
      printf '%s\n' "tools/animations/manim/scenes/math1025/complex_numbers.py"
      ;;
    HashTableCollisionStrategyStory|HashTableCollisionStrategyStoryEn|HashTableCollisionStrategyStoryZhHk|HashTableCollisionStrategyStoryZhCn)
      printf '%s\n' "tools/animations/manim/scenes/csci2520/hash_table_collision_strategy.py"
      ;;
    *)
      return 1
      ;;
  esac
}

scene_locale() {
  case "$1" in
    GaussianEliminationRrefPivotStory|GaussianEliminationRrefPivotStoryEn|MatrixBasicsPositionMap|MatrixBasicsPositionMapEn|AugmentedMatrixRowOperationSafety|AugmentedMatrixRowOperationSafetyEn|GramSchmidtProjectionStory|GramSchmidtProjectionStoryEn|MatrixProductLinearSystemStory|MatrixProductLinearSystemStoryEn|RowOperationMatrixLeftMultiplyStory|RowOperationMatrixLeftMultiplyStoryEn|LinearCombinationSpanSweepStory|LinearCombinationSpanSweepStoryEn|LinearDependenceRedundancyStory|LinearDependenceRedundancyStoryEn|FunctionMapPropertiesStory|FunctionMapPropertiesStoryEn|ComplexPlaneArithmeticStory|ComplexPlaneArithmeticStoryEn|HashTableCollisionStrategyStory|HashTableCollisionStrategyStoryEn)
      printf '%s\n' "en"
      ;;
    GaussianEliminationRrefPivotStoryZhHk|MatrixBasicsPositionMapZhHk|AugmentedMatrixRowOperationSafetyZhHk|GramSchmidtProjectionStoryZhHk|MatrixProductLinearSystemStoryZhHk|RowOperationMatrixLeftMultiplyStoryZhHk|LinearCombinationSpanSweepStoryZhHk|LinearDependenceRedundancyStoryZhHk|FunctionMapPropertiesStoryZhHk|ComplexPlaneArithmeticStoryZhHk|HashTableCollisionStrategyStoryZhHk)
      printf '%s\n' "zh-hk"
      ;;
    GaussianEliminationRrefPivotStoryZhCn|MatrixBasicsPositionMapZhCn|AugmentedMatrixRowOperationSafetyZhCn|GramSchmidtProjectionStoryZhCn|MatrixProductLinearSystemStoryZhCn|RowOperationMatrixLeftMultiplyStoryZhCn|LinearCombinationSpanSweepStoryZhCn|LinearDependenceRedundancyStoryZhCn|FunctionMapPropertiesStoryZhCn|ComplexPlaneArithmeticStoryZhCn|HashTableCollisionStrategyStoryZhCn)
      printf '%s\n' "zh-cn"
      ;;
    *)
      return 1
      ;;
  esac
}

video_basename() {
  case "$1" in
    GaussianEliminationRrefPivotStory|GaussianEliminationRrefPivotStoryEn|GaussianEliminationRrefPivotStoryZhHk|GaussianEliminationRrefPivotStoryZhCn)
      printf '%s\n' "gaussian-elimination-rref-pivot-story"
      ;;
    MatrixBasicsPositionMap|MatrixBasicsPositionMapEn|MatrixBasicsPositionMapZhHk|MatrixBasicsPositionMapZhCn)
      printf '%s\n' "matrix-basics-position-map"
      ;;
    AugmentedMatrixRowOperationSafety|AugmentedMatrixRowOperationSafetyEn|AugmentedMatrixRowOperationSafetyZhHk|AugmentedMatrixRowOperationSafetyZhCn)
      printf '%s\n' "augmented-matrix-row-operation-safety"
      ;;
    GramSchmidtProjectionStory|GramSchmidtProjectionStoryEn|GramSchmidtProjectionStoryZhHk|GramSchmidtProjectionStoryZhCn)
      printf '%s\n' "gram-schmidt-projection-story"
      ;;
    MatrixProductLinearSystemStory|MatrixProductLinearSystemStoryEn|MatrixProductLinearSystemStoryZhHk|MatrixProductLinearSystemStoryZhCn)
      printf '%s\n' "matrix-product-linear-system-story"
      ;;
    RowOperationMatrixLeftMultiplyStory|RowOperationMatrixLeftMultiplyStoryEn|RowOperationMatrixLeftMultiplyStoryZhHk|RowOperationMatrixLeftMultiplyStoryZhCn)
      printf '%s\n' "row-operation-matrix-left-multiply-story"
      ;;
    LinearCombinationSpanSweepStory|LinearCombinationSpanSweepStoryEn|LinearCombinationSpanSweepStoryZhHk|LinearCombinationSpanSweepStoryZhCn)
      printf '%s\n' "linear-combination-span-sweep-story"
      ;;
    LinearDependenceRedundancyStory|LinearDependenceRedundancyStoryEn|LinearDependenceRedundancyStoryZhHk|LinearDependenceRedundancyStoryZhCn)
      printf '%s\n' "linear-dependence-redundancy-story"
      ;;
    FunctionMapPropertiesStory|FunctionMapPropertiesStoryEn|FunctionMapPropertiesStoryZhHk|FunctionMapPropertiesStoryZhCn)
      printf '%s\n' "function-map-properties-story"
      ;;
    ComplexPlaneArithmeticStory|ComplexPlaneArithmeticStoryEn|ComplexPlaneArithmeticStoryZhHk|ComplexPlaneArithmeticStoryZhCn)
      printf '%s\n' "complex-plane-arithmetic-story"
      ;;
    HashTableCollisionStrategyStory|HashTableCollisionStrategyStoryEn|HashTableCollisionStrategyStoryZhHk|HashTableCollisionStrategyStoryZhCn)
      printf '%s\n' "hash-table-collision-strategy-story"
      ;;
    *)
      return 1
      ;;
  esac
}

scene_course() {
  case "$1" in
    GaussianEliminationRrefPivotStory|GaussianEliminationRrefPivotStoryEn|GaussianEliminationRrefPivotStoryZhHk|GaussianEliminationRrefPivotStoryZhCn|MatrixBasicsPositionMap|MatrixBasicsPositionMapEn|MatrixBasicsPositionMapZhHk|MatrixBasicsPositionMapZhCn|AugmentedMatrixRowOperationSafety|AugmentedMatrixRowOperationSafetyEn|AugmentedMatrixRowOperationSafetyZhHk|AugmentedMatrixRowOperationSafetyZhCn|GramSchmidtProjectionStory|GramSchmidtProjectionStoryEn|GramSchmidtProjectionStoryZhHk|GramSchmidtProjectionStoryZhCn|MatrixProductLinearSystemStory|MatrixProductLinearSystemStoryEn|MatrixProductLinearSystemStoryZhHk|MatrixProductLinearSystemStoryZhCn|RowOperationMatrixLeftMultiplyStory|RowOperationMatrixLeftMultiplyStoryEn|RowOperationMatrixLeftMultiplyStoryZhHk|RowOperationMatrixLeftMultiplyStoryZhCn|LinearCombinationSpanSweepStory|LinearCombinationSpanSweepStoryEn|LinearCombinationSpanSweepStoryZhHk|LinearCombinationSpanSweepStoryZhCn|LinearDependenceRedundancyStory|LinearDependenceRedundancyStoryEn|LinearDependenceRedundancyStoryZhHk|LinearDependenceRedundancyStoryZhCn)
      printf '%s\n' "math1030"
      ;;
    FunctionMapPropertiesStory|FunctionMapPropertiesStoryEn|FunctionMapPropertiesStoryZhHk|FunctionMapPropertiesStoryZhCn)
      printf '%s\n' "math1090"
      ;;
    ComplexPlaneArithmeticStory|ComplexPlaneArithmeticStoryEn|ComplexPlaneArithmeticStoryZhHk|ComplexPlaneArithmeticStoryZhCn)
      printf '%s\n' "math1025"
      ;;
    HashTableCollisionStrategyStory|HashTableCollisionStrategyStoryEn|HashTableCollisionStrategyStoryZhHk|HashTableCollisionStrategyStoryZhCn)
      printf '%s\n' "csci2520"
      ;;
    *)
      return 1
      ;;
  esac
}

for scene_class in "${TARGET_SCENES[@]}"; do
  if ! scene_file="$(scene_file "$scene_class")"; then
    echo "Unknown scene class '$scene_class'. Add it to scene_file before rendering." >&2
    exit 1
  fi

  if ! locale="$(scene_locale "$scene_class")"; then
    echo "Unknown scene class '$scene_class'. Add it to scene_locale before rendering." >&2
    exit 1
  fi

  if ! basename="$(video_basename "$scene_class")"; then
    echo "Unknown scene class '$scene_class'. Add it to video_basename before rendering." >&2
    exit 1
  fi

  if ! course="$(scene_course "$scene_class")"; then
    echo "Unknown scene class '$scene_class'. Add it to scene_course before rendering." >&2
    exit 1
  fi

  output_dir="$PUBLIC_ROOT/$course"
  mkdir -p "$output_dir"

  run_manim "$scene_class" "$scene_file"

  source_video="$(find "$MEDIA_DIR/videos" -name "${scene_class}.mp4" -print | sort | tail -n 1)"

  if [[ -z "$source_video" ]]; then
    echo "Rendered video not found under $MEDIA_DIR/videos for $scene_class" >&2
    exit 1
  fi

  output_video="$output_dir/${basename}-${locale}.mp4"
  output_poster="$output_dir/${basename}-${locale}.png"

  cp "$source_video" "$output_video"

  if command -v ffmpeg >/dev/null 2>&1; then
    ffmpeg -y -ss 2.25 -i "$output_video" -frames:v 1 "$output_poster" >/dev/null 2>&1
  fi

  echo "Wrote $output_video"
  if [[ -f "$output_poster" ]]; then
    echo "Wrote $output_poster"
  fi
done
