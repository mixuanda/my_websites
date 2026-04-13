import type { ProblemSchema } from "./types";

export const textbookProblemBank: Record<string, ProblemSchema> = {
  "demo.math1030.rref-pivot-column": {
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
};

export function getProblemById(problemId: string) {
  return textbookProblemBank[problemId] ?? null;
}
