import type { ProblemSchema } from "./types";

export const textbookProblemBank: Record<string, ProblemSchema> = {
  "demo.math1030.rref-pivot-column": {
    accessTier: "FREE",
    id: "demo.math1030.rref-pivot-column",
    type: "MCQ",
    courseId: "math1030",
    chapterId: "matrices",
    unitId: "math1030.matrices.gaussian-elimination-rref",
    prompt:
      "In RREF, which statement is always true about pivot columns of a matrix A?",
    choices: [
      { id: "a", text: "They form a basis for the null space of A." },
      { id: "b", text: "They correspond to leading 1 positions in nonzero rows." },
      { id: "c", text: "Every column is a pivot column." },
      { id: "d", text: "Pivot columns can only appear in the last two columns." },
    ],
    correctAnswer: {
      choiceId: "b",
    },
    hints: [
      "Track where each leading 1 appears after row-reduction. Pivot columns are determined by those leading entries.",
    ],
    solutionSteps: [
      "Compute the reduced row echelon form and identify each nonzero row.",
      "In each nonzero row, find its first nonzero entry: this is a leading 1 in RREF.",
      "The columns containing these leading 1 entries are pivot columns.",
      "Therefore the defining property is that pivot columns correspond to leading 1 positions in nonzero rows.",
    ],
    skillTags: ["rref", "pivot-columns", "row-reduction"],
  },
  "demo.math1090.quantifier-negation": {
    accessTier: "FREE",
    id: "demo.math1090.quantifier-negation",
    type: "FILL_IN_BLANK",
    courseId: "math1090",
    chapterId: "logic",
    unitId: "math1090.logic.quantifiers-negation",
    prompt:
      "Fill in the blank: The negation of \"for all x, P(x)\" is \"there exists x such that ____\".",
    correctAnswer: {
      value: "not P(x)",
      equivalentValues: ["¬P(x)", "~P(x)", "!P(x)"],
      equivalence: [{ type: "trimmed" }, { type: "symbolic" }, { type: "case-insensitive" }],
    },
    hints: [
      "When negating a universal quantifier, switch ∀ to ∃ and negate the predicate.",
    ],
    solutionSteps: [
      "Start with the statement ∀x P(x).",
      "Apply quantifier negation rule: ¬(∀x P(x)) ≡ ∃x ¬P(x).",
      "So inside the blank, the predicate must be negated.",
      "Hence the blank is \"not P(x)\" (equivalently ¬P(x)).",
    ],
    skillTags: ["quantifiers", "negation", "logic-equivalence"],
  },
  "checkpoint.math1030.invertible-rank": {
    id: "checkpoint.math1030.invertible-rank",
    type: "MCQ",
    accessTier: "MEMBER",
    courseId: "math1030",
    chapterId: "invertibility",
    unitId: "math1030.invertibility.invertible-matrices",
    prompt: "If A is invertible n×n, which statement must hold?",
    choices: [
      { id: "a", text: "rank(A)=n and Ax=b has a unique solution for every b in R^n." },
      { id: "b", text: "rank(A)=n-1 and Ax=b always has infinitely many solutions." },
      { id: "c", text: "A must have two identical rows." },
      { id: "d", text: "det(A)=0." },
    ],
    correctAnswer: { choiceId: "a" },
    hints: ["Use the equivalent statements for invertibility: full rank, pivots in each row and column, and unique solvability."],
    solutionSteps: [
      "For an n×n matrix, invertibility implies full rank n.",
      "Full rank means no free variables in Ax=b for any b, so each system is uniquely solvable.",
      "Therefore statement (a) is the only one consistent with invertibility.",
    ],
    skillTags: ["invertible-matrix", "rank", "equivalent-statements"],
  },
  "checkpoint.math1030.null-space-dimension": {
    id: "checkpoint.math1030.null-space-dimension",
    type: "FILL_IN_BLANK",
    accessTier: "MEMBER",
    courseId: "math1030",
    chapterId: "vector-spaces",
    unitId: "math1030.vector-spaces.column-space-row-space-rank",
    prompt: "Fill in the blank: For an m×n matrix A, rank(A) + nullity(A) = ____.",
    correctAnswer: {
      value: "n",
      equivalentValues: ["number of columns", "the number of columns of A"],
      equivalence: [{ type: "trimmed" }, { type: "case-insensitive" }],
    },
    hints: ["Use the rank-nullity theorem and identify which size parameter appears on the right-hand side."],
    solutionSteps: [
      "Rank-nullity says dimension(column space) + dimension(null space) equals the number of variables.",
      "For A with n columns, there are n variables in Ax=0.",
      "So rank(A) + nullity(A) = n.",
    ],
    skillTags: ["rank-nullity", "null-space", "dimension"],
  },
};

export function getProblemById(problemId: string) {
  return textbookProblemBank[problemId] ?? null;
}

export function getProblemsForUnit(unitId: string) {
  return Object.values(textbookProblemBank).filter((problem) => problem.unitId === unitId);
}
