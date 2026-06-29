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
    "BasisDimensionJustRightStoryEn"
    "BasisDimensionJustRightStoryZhHk"
    "BasisDimensionJustRightStoryZhCn"
    "ColumnRowSpaceRankStoryEn"
    "ColumnRowSpaceRankStoryZhHk"
    "ColumnRowSpaceRankStoryZhCn"
    "MatrixSubspaceBasisDimensionStoryEn"
    "MatrixSubspaceBasisDimensionStoryZhHk"
    "MatrixSubspaceBasisDimensionStoryZhCn"
    "BasisExtensionChangeOfBasisStoryEn"
    "BasisExtensionChangeOfBasisStoryZhHk"
    "BasisExtensionChangeOfBasisStoryZhCn"
    "DeterminantsCofactorExpansionStoryEn"
    "DeterminantsCofactorExpansionStoryZhHk"
    "DeterminantsCofactorExpansionStoryZhCn"
    "DeterminantsRowOperationEffectsStoryEn"
    "DeterminantsRowOperationEffectsStoryZhHk"
    "DeterminantsRowOperationEffectsStoryZhCn"
    "DeterminantsColumnReplacementCramersRuleStoryEn"
    "DeterminantsColumnReplacementCramersRuleStoryZhHk"
    "DeterminantsColumnReplacementCramersRuleStoryZhCn"
    "EigenvalueDirectionEigenspaceStoryEn"
    "EigenvalueDirectionEigenspaceStoryZhHk"
    "EigenvalueDirectionEigenspaceStoryZhCn"
    "DiagonalizationSimilarityEigenbasisStoryEn"
    "DiagonalizationSimilarityEigenbasisStoryZhHk"
    "DiagonalizationSimilarityEigenbasisStoryZhCn"
    "CharacteristicPolynomialDiagonalizationTestStoryEn"
    "CharacteristicPolynomialDiagonalizationTestStoryZhHk"
    "CharacteristicPolynomialDiagonalizationTestStoryZhCn"
    "InnerProductNormAngleStoryEn"
    "InnerProductNormAngleStoryZhHk"
    "InnerProductNormAngleStoryZhCn"
    "FunctionMapPropertiesStoryEn"
    "FunctionMapPropertiesStoryZhHk"
    "FunctionMapPropertiesStoryZhCn"
    "ComplexPlaneArithmeticStoryEn"
    "ComplexPlaneArithmeticStoryZhHk"
    "ComplexPlaneArithmeticStoryZhCn"
    "EuclideanBezoutIntegerEquationStoryEn"
    "EuclideanBezoutIntegerEquationStoryZhHk"
    "EuclideanBezoutIntegerEquationStoryZhCn"
    "RationalIrrationalRootProofStoryEn"
    "RationalIrrationalRootProofStoryZhHk"
    "RationalIrrationalRootProofStoryZhCn"
    "PolynomialDivisionRemainderStoryEn"
    "PolynomialDivisionRemainderStoryZhHk"
    "PolynomialDivisionRemainderStoryZhCn"
    "PolynomialGcdIrreducibilityStoryEn"
    "PolynomialGcdIrreducibilityStoryZhHk"
    "PolynomialGcdIrreducibilityStoryZhCn"
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
    BasisDimensionJustRightStory|BasisDimensionJustRightStoryEn|BasisDimensionJustRightStoryZhHk|BasisDimensionJustRightStoryZhCn)
      printf '%s\n' "tools/animations/manim/scenes/math1030/basis_dimension.py"
      ;;
    ColumnRowSpaceRankStory|ColumnRowSpaceRankStoryEn|ColumnRowSpaceRankStoryZhHk|ColumnRowSpaceRankStoryZhCn)
      printf '%s\n' "tools/animations/manim/scenes/math1030/column_row_space_rank.py"
      ;;
    MatrixSubspaceBasisDimensionStory|MatrixSubspaceBasisDimensionStoryEn|MatrixSubspaceBasisDimensionStoryZhHk|MatrixSubspaceBasisDimensionStoryZhCn)
      printf '%s\n' "tools/animations/manim/scenes/math1030/matrix_subspaces_basis_dimension.py"
      ;;
    BasisExtensionChangeOfBasisStory|BasisExtensionChangeOfBasisStoryEn|BasisExtensionChangeOfBasisStoryZhHk|BasisExtensionChangeOfBasisStoryZhCn)
      printf '%s\n' "tools/animations/manim/scenes/math1030/basis_extension_change_of_basis.py"
      ;;
    DeterminantsCofactorExpansionStory|DeterminantsCofactorExpansionStoryEn|DeterminantsCofactorExpansionStoryZhHk|DeterminantsCofactorExpansionStoryZhCn)
      printf '%s\n' "tools/animations/manim/scenes/math1030/determinants_cofactor_expansion.py"
      ;;
    DeterminantsRowOperationEffectsStory|DeterminantsRowOperationEffectsStoryEn|DeterminantsRowOperationEffectsStoryZhHk|DeterminantsRowOperationEffectsStoryZhCn)
      printf '%s\n' "tools/animations/manim/scenes/math1030/determinants_row_operation_effects.py"
      ;;
    DeterminantsColumnReplacementCramersRuleStory|DeterminantsColumnReplacementCramersRuleStoryEn|DeterminantsColumnReplacementCramersRuleStoryZhHk|DeterminantsColumnReplacementCramersRuleStoryZhCn)
      printf '%s\n' "tools/animations/manim/scenes/math1030/determinants_column_replacement_cramers_rule.py"
      ;;
    EigenvalueDirectionEigenspaceStory|EigenvalueDirectionEigenspaceStoryEn|EigenvalueDirectionEigenspaceStoryZhHk|EigenvalueDirectionEigenspaceStoryZhCn)
      printf '%s\n' "tools/animations/manim/scenes/math1030/eigenvalue_direction_eigenspace.py"
      ;;
    DiagonalizationSimilarityEigenbasisStory|DiagonalizationSimilarityEigenbasisStoryEn|DiagonalizationSimilarityEigenbasisStoryZhHk|DiagonalizationSimilarityEigenbasisStoryZhCn)
      printf '%s\n' "tools/animations/manim/scenes/math1030/diagonalization_similarity.py"
      ;;
    CharacteristicPolynomialDiagonalizationTestStory|CharacteristicPolynomialDiagonalizationTestStoryEn|CharacteristicPolynomialDiagonalizationTestStoryZhHk|CharacteristicPolynomialDiagonalizationTestStoryZhCn)
      printf '%s\n' "tools/animations/manim/scenes/math1030/characteristic_polynomials_diagonalization_tests.py"
      ;;
    InnerProductNormAngleStory|InnerProductNormAngleStoryEn|InnerProductNormAngleStoryZhHk|InnerProductNormAngleStoryZhCn)
      printf '%s\n' "tools/animations/manim/scenes/math1030/inner_products_norms_angles.py"
      ;;
    FunctionMapPropertiesStory|FunctionMapPropertiesStoryEn|FunctionMapPropertiesStoryZhHk|FunctionMapPropertiesStoryZhCn)
      printf '%s\n' "tools/animations/manim/scenes/math1090/functions_relations.py"
      ;;
    ComplexPlaneArithmeticStory|ComplexPlaneArithmeticStoryEn|ComplexPlaneArithmeticStoryZhHk|ComplexPlaneArithmeticStoryZhCn)
      printf '%s\n' "tools/animations/manim/scenes/math1025/complex_numbers.py"
      ;;
    EuclideanBezoutIntegerEquationStory|EuclideanBezoutIntegerEquationStoryEn|EuclideanBezoutIntegerEquationStoryZhHk|EuclideanBezoutIntegerEquationStoryZhCn)
      printf '%s\n' "tools/animations/manim/scenes/math1025/euclidean_bezout_integer_equations.py"
      ;;
    RationalIrrationalRootProofStory|RationalIrrationalRootProofStoryEn|RationalIrrationalRootProofStoryZhHk|RationalIrrationalRootProofStoryZhCn)
      printf '%s\n' "tools/animations/manim/scenes/math1025/rational_irrational_roots.py"
      ;;
    PolynomialDivisionRemainderStory|PolynomialDivisionRemainderStoryEn|PolynomialDivisionRemainderStoryZhHk|PolynomialDivisionRemainderStoryZhCn)
      printf '%s\n' "tools/animations/manim/scenes/math1025/polynomial_division.py"
      ;;
    PolynomialGcdIrreducibilityStory|PolynomialGcdIrreducibilityStoryEn|PolynomialGcdIrreducibilityStoryZhHk|PolynomialGcdIrreducibilityStoryZhCn)
      printf '%s\n' "tools/animations/manim/scenes/math1025/polynomial_gcds.py"
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
    ColumnRowSpaceRankStory|ColumnRowSpaceRankStoryEn)
      printf '%s\n' "en"
      ;;
    ColumnRowSpaceRankStoryZhHk)
      printf '%s\n' "zh-hk"
      ;;
    ColumnRowSpaceRankStoryZhCn)
      printf '%s\n' "zh-cn"
      ;;
    MatrixSubspaceBasisDimensionStory|MatrixSubspaceBasisDimensionStoryEn)
      printf '%s\n' "en"
      ;;
    MatrixSubspaceBasisDimensionStoryZhHk)
      printf '%s\n' "zh-hk"
      ;;
    MatrixSubspaceBasisDimensionStoryZhCn)
      printf '%s\n' "zh-cn"
      ;;
    BasisExtensionChangeOfBasisStory|BasisExtensionChangeOfBasisStoryEn)
      printf '%s\n' "en"
      ;;
    BasisExtensionChangeOfBasisStoryZhHk)
      printf '%s\n' "zh-hk"
      ;;
    BasisExtensionChangeOfBasisStoryZhCn)
      printf '%s\n' "zh-cn"
      ;;
    DeterminantsCofactorExpansionStory|DeterminantsCofactorExpansionStoryEn)
      printf '%s\n' "en"
      ;;
    DeterminantsCofactorExpansionStoryZhHk)
      printf '%s\n' "zh-hk"
      ;;
    DeterminantsCofactorExpansionStoryZhCn)
      printf '%s\n' "zh-cn"
      ;;
    DeterminantsRowOperationEffectsStory|DeterminantsRowOperationEffectsStoryEn)
      printf '%s\n' "en"
      ;;
    DeterminantsRowOperationEffectsStoryZhHk)
      printf '%s\n' "zh-hk"
      ;;
    DeterminantsRowOperationEffectsStoryZhCn)
      printf '%s\n' "zh-cn"
      ;;
    DeterminantsColumnReplacementCramersRuleStory|DeterminantsColumnReplacementCramersRuleStoryEn)
      printf '%s\n' "en"
      ;;
    DeterminantsColumnReplacementCramersRuleStoryZhHk)
      printf '%s\n' "zh-hk"
      ;;
    DeterminantsColumnReplacementCramersRuleStoryZhCn)
      printf '%s\n' "zh-cn"
      ;;
    EigenvalueDirectionEigenspaceStory|EigenvalueDirectionEigenspaceStoryEn)
      printf '%s\n' "en"
      ;;
    EigenvalueDirectionEigenspaceStoryZhHk)
      printf '%s\n' "zh-hk"
      ;;
    EigenvalueDirectionEigenspaceStoryZhCn)
      printf '%s\n' "zh-cn"
      ;;
    DiagonalizationSimilarityEigenbasisStory|DiagonalizationSimilarityEigenbasisStoryEn)
      printf '%s\n' "en"
      ;;
    DiagonalizationSimilarityEigenbasisStoryZhHk)
      printf '%s\n' "zh-hk"
      ;;
    DiagonalizationSimilarityEigenbasisStoryZhCn)
      printf '%s\n' "zh-cn"
      ;;
    CharacteristicPolynomialDiagonalizationTestStory|CharacteristicPolynomialDiagonalizationTestStoryEn)
      printf '%s\n' "en"
      ;;
    CharacteristicPolynomialDiagonalizationTestStoryZhHk)
      printf '%s\n' "zh-hk"
      ;;
    CharacteristicPolynomialDiagonalizationTestStoryZhCn)
      printf '%s\n' "zh-cn"
      ;;
    InnerProductNormAngleStory|InnerProductNormAngleStoryEn)
      printf '%s\n' "en"
      ;;
    InnerProductNormAngleStoryZhHk)
      printf '%s\n' "zh-hk"
      ;;
    InnerProductNormAngleStoryZhCn)
      printf '%s\n' "zh-cn"
      ;;
    GaussianEliminationRrefPivotStory|GaussianEliminationRrefPivotStoryEn|MatrixBasicsPositionMap|MatrixBasicsPositionMapEn|AugmentedMatrixRowOperationSafety|AugmentedMatrixRowOperationSafetyEn|GramSchmidtProjectionStory|GramSchmidtProjectionStoryEn|MatrixProductLinearSystemStory|MatrixProductLinearSystemStoryEn|RowOperationMatrixLeftMultiplyStory|RowOperationMatrixLeftMultiplyStoryEn|LinearCombinationSpanSweepStory|LinearCombinationSpanSweepStoryEn|LinearDependenceRedundancyStory|LinearDependenceRedundancyStoryEn|BasisDimensionJustRightStory|BasisDimensionJustRightStoryEn|FunctionMapPropertiesStory|FunctionMapPropertiesStoryEn|ComplexPlaneArithmeticStory|ComplexPlaneArithmeticStoryEn|EuclideanBezoutIntegerEquationStory|EuclideanBezoutIntegerEquationStoryEn|RationalIrrationalRootProofStory|RationalIrrationalRootProofStoryEn|PolynomialDivisionRemainderStory|PolynomialDivisionRemainderStoryEn|PolynomialGcdIrreducibilityStory|PolynomialGcdIrreducibilityStoryEn|HashTableCollisionStrategyStory|HashTableCollisionStrategyStoryEn)
      printf '%s\n' "en"
      ;;
    GaussianEliminationRrefPivotStoryZhHk|MatrixBasicsPositionMapZhHk|AugmentedMatrixRowOperationSafetyZhHk|GramSchmidtProjectionStoryZhHk|MatrixProductLinearSystemStoryZhHk|RowOperationMatrixLeftMultiplyStoryZhHk|LinearCombinationSpanSweepStoryZhHk|LinearDependenceRedundancyStoryZhHk|BasisDimensionJustRightStoryZhHk|FunctionMapPropertiesStoryZhHk|ComplexPlaneArithmeticStoryZhHk|EuclideanBezoutIntegerEquationStoryZhHk|RationalIrrationalRootProofStoryZhHk|PolynomialDivisionRemainderStoryZhHk|PolynomialGcdIrreducibilityStoryZhHk|HashTableCollisionStrategyStoryZhHk)
      printf '%s\n' "zh-hk"
      ;;
    GaussianEliminationRrefPivotStoryZhCn|MatrixBasicsPositionMapZhCn|AugmentedMatrixRowOperationSafetyZhCn|GramSchmidtProjectionStoryZhCn|MatrixProductLinearSystemStoryZhCn|RowOperationMatrixLeftMultiplyStoryZhCn|LinearCombinationSpanSweepStoryZhCn|LinearDependenceRedundancyStoryZhCn|BasisDimensionJustRightStoryZhCn|FunctionMapPropertiesStoryZhCn|ComplexPlaneArithmeticStoryZhCn|EuclideanBezoutIntegerEquationStoryZhCn|RationalIrrationalRootProofStoryZhCn|PolynomialDivisionRemainderStoryZhCn|PolynomialGcdIrreducibilityStoryZhCn|HashTableCollisionStrategyStoryZhCn)
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
    BasisDimensionJustRightStory|BasisDimensionJustRightStoryEn|BasisDimensionJustRightStoryZhHk|BasisDimensionJustRightStoryZhCn)
      printf '%s\n' "basis-dimension-just-right-story"
      ;;
    ColumnRowSpaceRankStory|ColumnRowSpaceRankStoryEn|ColumnRowSpaceRankStoryZhHk|ColumnRowSpaceRankStoryZhCn)
      printf '%s\n' "column-row-space-rank-story"
      ;;
    MatrixSubspaceBasisDimensionStory|MatrixSubspaceBasisDimensionStoryEn|MatrixSubspaceBasisDimensionStoryZhHk|MatrixSubspaceBasisDimensionStoryZhCn)
      printf '%s\n' "matrix-subspace-basis-dimension-story"
      ;;
    BasisExtensionChangeOfBasisStory|BasisExtensionChangeOfBasisStoryEn|BasisExtensionChangeOfBasisStoryZhHk|BasisExtensionChangeOfBasisStoryZhCn)
      printf '%s\n' "basis-extension-change-of-basis-story"
      ;;
    DeterminantsCofactorExpansionStory|DeterminantsCofactorExpansionStoryEn|DeterminantsCofactorExpansionStoryZhHk|DeterminantsCofactorExpansionStoryZhCn)
      printf '%s\n' "determinants-cofactor-expansion-story"
      ;;
    DeterminantsRowOperationEffectsStory|DeterminantsRowOperationEffectsStoryEn|DeterminantsRowOperationEffectsStoryZhHk|DeterminantsRowOperationEffectsStoryZhCn)
      printf '%s\n' "determinants-row-operation-effects-story"
      ;;
    DeterminantsColumnReplacementCramersRuleStory|DeterminantsColumnReplacementCramersRuleStoryEn|DeterminantsColumnReplacementCramersRuleStoryZhHk|DeterminantsColumnReplacementCramersRuleStoryZhCn)
      printf '%s\n' "determinants-column-replacement-cramers-rule-story"
      ;;
    EigenvalueDirectionEigenspaceStory|EigenvalueDirectionEigenspaceStoryEn|EigenvalueDirectionEigenspaceStoryZhHk|EigenvalueDirectionEigenspaceStoryZhCn)
      printf '%s\n' "eigenvalue-direction-eigenspace-story"
      ;;
    DiagonalizationSimilarityEigenbasisStory|DiagonalizationSimilarityEigenbasisStoryEn|DiagonalizationSimilarityEigenbasisStoryZhHk|DiagonalizationSimilarityEigenbasisStoryZhCn)
      printf '%s\n' "diagonalization-similarity-eigenbasis-story"
      ;;
    CharacteristicPolynomialDiagonalizationTestStory|CharacteristicPolynomialDiagonalizationTestStoryEn|CharacteristicPolynomialDiagonalizationTestStoryZhHk|CharacteristicPolynomialDiagonalizationTestStoryZhCn)
      printf '%s\n' "characteristic-polynomial-diagonalization-test-story"
      ;;
    InnerProductNormAngleStory|InnerProductNormAngleStoryEn|InnerProductNormAngleStoryZhHk|InnerProductNormAngleStoryZhCn)
      printf '%s\n' "inner-product-norm-angle-story"
      ;;
    FunctionMapPropertiesStory|FunctionMapPropertiesStoryEn|FunctionMapPropertiesStoryZhHk|FunctionMapPropertiesStoryZhCn)
      printf '%s\n' "function-map-properties-story"
      ;;
    ComplexPlaneArithmeticStory|ComplexPlaneArithmeticStoryEn|ComplexPlaneArithmeticStoryZhHk|ComplexPlaneArithmeticStoryZhCn)
      printf '%s\n' "complex-plane-arithmetic-story"
      ;;
    EuclideanBezoutIntegerEquationStory|EuclideanBezoutIntegerEquationStoryEn|EuclideanBezoutIntegerEquationStoryZhHk|EuclideanBezoutIntegerEquationStoryZhCn)
      printf '%s\n' "euclidean-bezout-integer-equation-story"
      ;;
    RationalIrrationalRootProofStory|RationalIrrationalRootProofStoryEn|RationalIrrationalRootProofStoryZhHk|RationalIrrationalRootProofStoryZhCn)
      printf '%s\n' "rational-irrational-root-proof-story"
      ;;
    PolynomialDivisionRemainderStory|PolynomialDivisionRemainderStoryEn|PolynomialDivisionRemainderStoryZhHk|PolynomialDivisionRemainderStoryZhCn)
      printf '%s\n' "polynomial-division-remainder-story"
      ;;
    PolynomialGcdIrreducibilityStory|PolynomialGcdIrreducibilityStoryEn|PolynomialGcdIrreducibilityStoryZhHk|PolynomialGcdIrreducibilityStoryZhCn)
      printf '%s\n' "polynomial-gcd-irreducibility-story"
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
    ColumnRowSpaceRankStory|ColumnRowSpaceRankStoryEn|ColumnRowSpaceRankStoryZhHk|ColumnRowSpaceRankStoryZhCn)
      printf '%s\n' "math1030"
      ;;
    MatrixSubspaceBasisDimensionStory|MatrixSubspaceBasisDimensionStoryEn|MatrixSubspaceBasisDimensionStoryZhHk|MatrixSubspaceBasisDimensionStoryZhCn)
      printf '%s\n' "math1030"
      ;;
    BasisExtensionChangeOfBasisStory|BasisExtensionChangeOfBasisStoryEn|BasisExtensionChangeOfBasisStoryZhHk|BasisExtensionChangeOfBasisStoryZhCn)
      printf '%s\n' "math1030"
      ;;
    DeterminantsCofactorExpansionStory|DeterminantsCofactorExpansionStoryEn|DeterminantsCofactorExpansionStoryZhHk|DeterminantsCofactorExpansionStoryZhCn)
      printf '%s\n' "math1030"
      ;;
    DeterminantsRowOperationEffectsStory|DeterminantsRowOperationEffectsStoryEn|DeterminantsRowOperationEffectsStoryZhHk|DeterminantsRowOperationEffectsStoryZhCn)
      printf '%s\n' "math1030"
      ;;
    DeterminantsColumnReplacementCramersRuleStory|DeterminantsColumnReplacementCramersRuleStoryEn|DeterminantsColumnReplacementCramersRuleStoryZhHk|DeterminantsColumnReplacementCramersRuleStoryZhCn)
      printf '%s\n' "math1030"
      ;;
    EigenvalueDirectionEigenspaceStory|EigenvalueDirectionEigenspaceStoryEn|EigenvalueDirectionEigenspaceStoryZhHk|EigenvalueDirectionEigenspaceStoryZhCn)
      printf '%s\n' "math1030"
      ;;
    DiagonalizationSimilarityEigenbasisStory|DiagonalizationSimilarityEigenbasisStoryEn|DiagonalizationSimilarityEigenbasisStoryZhHk|DiagonalizationSimilarityEigenbasisStoryZhCn)
      printf '%s\n' "math1030"
      ;;
    CharacteristicPolynomialDiagonalizationTestStory|CharacteristicPolynomialDiagonalizationTestStoryEn|CharacteristicPolynomialDiagonalizationTestStoryZhHk|CharacteristicPolynomialDiagonalizationTestStoryZhCn)
      printf '%s\n' "math1030"
      ;;
    InnerProductNormAngleStory|InnerProductNormAngleStoryEn|InnerProductNormAngleStoryZhHk|InnerProductNormAngleStoryZhCn)
      printf '%s\n' "math1030"
      ;;
    GaussianEliminationRrefPivotStory|GaussianEliminationRrefPivotStoryEn|GaussianEliminationRrefPivotStoryZhHk|GaussianEliminationRrefPivotStoryZhCn|MatrixBasicsPositionMap|MatrixBasicsPositionMapEn|MatrixBasicsPositionMapZhHk|MatrixBasicsPositionMapZhCn|AugmentedMatrixRowOperationSafety|AugmentedMatrixRowOperationSafetyEn|AugmentedMatrixRowOperationSafetyZhHk|AugmentedMatrixRowOperationSafetyZhCn|GramSchmidtProjectionStory|GramSchmidtProjectionStoryEn|GramSchmidtProjectionStoryZhHk|GramSchmidtProjectionStoryZhCn|MatrixProductLinearSystemStory|MatrixProductLinearSystemStoryEn|MatrixProductLinearSystemStoryZhHk|MatrixProductLinearSystemStoryZhCn|RowOperationMatrixLeftMultiplyStory|RowOperationMatrixLeftMultiplyStoryEn|RowOperationMatrixLeftMultiplyStoryZhHk|RowOperationMatrixLeftMultiplyStoryZhCn|LinearCombinationSpanSweepStory|LinearCombinationSpanSweepStoryEn|LinearCombinationSpanSweepStoryZhHk|LinearCombinationSpanSweepStoryZhCn|LinearDependenceRedundancyStory|LinearDependenceRedundancyStoryEn|LinearDependenceRedundancyStoryZhHk|LinearDependenceRedundancyStoryZhCn|BasisDimensionJustRightStory|BasisDimensionJustRightStoryEn|BasisDimensionJustRightStoryZhHk|BasisDimensionJustRightStoryZhCn)
      printf '%s\n' "math1030"
      ;;
    FunctionMapPropertiesStory|FunctionMapPropertiesStoryEn|FunctionMapPropertiesStoryZhHk|FunctionMapPropertiesStoryZhCn)
      printf '%s\n' "math1090"
      ;;
    ComplexPlaneArithmeticStory|ComplexPlaneArithmeticStoryEn|ComplexPlaneArithmeticStoryZhHk|ComplexPlaneArithmeticStoryZhCn|EuclideanBezoutIntegerEquationStory|EuclideanBezoutIntegerEquationStoryEn|EuclideanBezoutIntegerEquationStoryZhHk|EuclideanBezoutIntegerEquationStoryZhCn|RationalIrrationalRootProofStory|RationalIrrationalRootProofStoryEn|RationalIrrationalRootProofStoryZhHk|RationalIrrationalRootProofStoryZhCn|PolynomialDivisionRemainderStory|PolynomialDivisionRemainderStoryEn|PolynomialDivisionRemainderStoryZhHk|PolynomialDivisionRemainderStoryZhCn|PolynomialGcdIrreducibilityStory|PolynomialGcdIrreducibilityStoryEn|PolynomialGcdIrreducibilityStoryZhHk|PolynomialGcdIrreducibilityStoryZhCn)
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

poster_timestamp() {
  case "$1" in
    DeterminantsRowOperationEffectsStory|DeterminantsRowOperationEffectsStoryEn|DeterminantsRowOperationEffectsStoryZhHk|DeterminantsRowOperationEffectsStoryZhCn|DeterminantsColumnReplacementCramersRuleStory|DeterminantsColumnReplacementCramersRuleStoryEn|DeterminantsColumnReplacementCramersRuleStoryZhHk|DeterminantsColumnReplacementCramersRuleStoryZhCn)
      printf '%s\n' "1.0"
      ;;
    EigenvalueDirectionEigenspaceStory|EigenvalueDirectionEigenspaceStoryEn|EigenvalueDirectionEigenspaceStoryZhHk|EigenvalueDirectionEigenspaceStoryZhCn)
      printf '%s\n' "1.45"
      ;;
    *)
      printf '%s\n' "2.25"
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
    ffmpeg -y -ss "$(poster_timestamp "$scene_class")" -i "$output_video" -frames:v 1 "$output_poster" >/dev/null 2>&1
  fi

  echo "Wrote $output_video"
  if [[ -f "$output_poster" ]]; then
    echo "Wrote $output_poster"
  fi
done
