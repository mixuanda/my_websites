import type {
  FillInBlankAnswer,
  FillInBlankProblem,
  Locale,
  ProblemPreviewResult,
  ProblemSchema,
  ProblemSubmission,
  ProblemSubmissionResult,
} from "./types";
import { getLocalizedText } from "./i18n";

function gcd(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);

  while (y !== 0) {
    const temp = y;
    y = x % y;
    x = temp;
  }

  return x || 1;
}

function normalizeWhitespace(input: string) {
  return input
    .trim()
    .replace(/[−–—]/g, "-")
    .replace(/\s+/g, " ");
}

function stripOuterParentheses(input: string) {
  let value = input.trim();

  while (value.startsWith("(") && value.endsWith(")")) {
    let depth = 0;
    let wrapped = true;

    for (let i = 0; i < value.length; i += 1) {
      if (value[i] === "(") depth += 1;
      if (value[i] === ")") depth -= 1;
      if (depth === 0 && i < value.length - 1) {
        wrapped = false;
        break;
      }
    }

    if (!wrapped) {
      break;
    }

    value = value.slice(1, -1).trim();
  }

  return value;
}

function reduceFraction(input: string) {
  const match = input.match(/^([+-]?\d+)\s*\/\s*([+-]?\d+)$/);

  if (!match) {
    return null;
  }

  const numerator = Number.parseInt(match[1], 10);
  const denominator = Number.parseInt(match[2], 10);

  if (denominator === 0) {
    return null;
  }

  const divisor = gcd(numerator, denominator);
  let n = numerator / divisor;
  let d = denominator / divisor;

  if (d < 0) {
    n = -n;
    d = -d;
  }

  return `${n}/${d}`;
}

function parseNumberLike(input: string) {
  const compact = input.replace(/,/g, "").trim();

  const reducedFraction = reduceFraction(compact);
  if (reducedFraction) {
    const [num, den] = reducedFraction.split("/").map(Number);
    return num / den;
  }

  if (/^[+-]?(\d+(\.\d+)?|\.\d+)(e[+-]?\d+)?$/i.test(compact)) {
    const value = Number(compact);
    if (Number.isFinite(value)) {
      return value;
    }
  }

  return null;
}

function normalizeSymbolic(input: string) {
  const base = stripOuterParentheses(normalizeWhitespace(input)).replace(/\s/g, "");

  if (!base) {
    return "";
  }

  const terms = base
    .replace(/-/g, "+-")
    .split("+")
    .filter(Boolean)
    .map((term) => term.replace(/^\+/, ""));

  if (!terms.length) {
    return base;
  }

  return terms.sort().join("+");
}

function equivalentByRule(answer: string, target: string, rules: FillInBlankAnswer["equivalence"] = []) {
  for (const rule of rules) {
    if (rule.type === "exact" && answer === target) {
      return true;
    }

    if (rule.type === "case-insensitive" && answer.toLowerCase() === target.toLowerCase()) {
      return true;
    }

    if (rule.type === "trimmed" && answer.trim() === target.trim()) {
      return true;
    }

    if (rule.type === "symbolic" && normalizeSymbolic(answer) === normalizeSymbolic(target)) {
      return true;
    }
  }

  return false;
}

function buildFillBlankPreview(problem: FillInBlankProblem, answer: string, locale: Locale): ProblemPreviewResult {
  const normalized = normalizeWhitespace(answer);
  const symbolicEnabled = problem.correctAnswer.equivalence?.some(
    (rule) => rule.type === "symbolic"
  );
  const fraction = reduceFraction(normalized);
  const previewValue = fraction
    ? fraction
    : symbolicEnabled
      ? normalizeSymbolic(normalized)
      : normalized;

  return {
    normalizedAnswer: previewValue,
    parsedSuccessfully: Boolean(previewValue),
    previewText: previewValue || undefined,
    syntaxGuidance: problem.syntaxGuidance
      ? getLocalizedText(problem.syntaxGuidance, locale)
      : undefined,
  };
}

function getCorrectAnswerPreview(problem: ProblemSchema, locale: Locale) {
  if (problem.type === "MCQ") {
    const correctChoice = problem.choices.find(
      (choice) => choice.id === problem.correctAnswer.choiceId
    );
    return correctChoice ? getLocalizedText(correctChoice.text, locale) : undefined;
  }

  return problem.correctAnswer.value;
}

function gradeFillBlank(
  problem: FillInBlankProblem,
  submission: ProblemSubmission,
  locale: Locale
): ProblemSubmissionResult {
  const answer = normalizeWhitespace(submission.answer ?? "");
  const expected = normalizeWhitespace(problem.correctAnswer.value);
  const numericAnswer = parseNumberLike(answer);
  const numericExpected = parseNumberLike(expected);

  const tolerance = problem.correctAnswer.tolerance;

  const acceptedValues = [
    expected,
    ...(problem.correctAnswer.equivalentValues ?? []),
  ];

  let isCorrect = acceptedValues.some((candidate) => normalizeWhitespace(candidate) === answer);

  if (!isCorrect && numericAnswer !== null && numericExpected !== null) {
    const effectiveTolerance = tolerance?.absolute ?? 1e-9;
    isCorrect = Math.abs(numericAnswer - numericExpected) <= effectiveTolerance;
  }

  if (!isCorrect) {
    isCorrect = acceptedValues.some((candidate) =>
      equivalentByRule(answer, normalizeWhitespace(candidate), problem.correctAnswer.equivalence)
    );
  }

  return {
    correct: isCorrect,
    correctAnswerPreview: getCorrectAnswerPreview(problem, locale),
    hint: isCorrect ? undefined : getLocalizedText(problem.hints[0], locale),
    normalizedAnswer: answer,
    previewText: buildFillBlankPreview(problem, answer, locale).previewText,
    shouldShowSolution: false,
    solutionLocked: false,
    showCorrectAnswer: false,
  };
}

export function previewProblemSubmission(
  problem: ProblemSchema,
  submission: ProblemSubmission,
  locale: Locale
): ProblemPreviewResult {
  if (problem.type === "MCQ") {
    const correctChoice = submission.choiceId
      ? problem.choices.find((choice) => choice.id === submission.choiceId)
      : null;

    return {
      normalizedAnswer: submission.choiceId ?? "",
      parsedSuccessfully: Boolean(correctChoice),
      previewText: correctChoice
        ? getLocalizedText(correctChoice.text, locale)
        : undefined,
      syntaxGuidance: problem.syntaxGuidance
        ? getLocalizedText(problem.syntaxGuidance, locale)
        : undefined,
    };
  }

  return buildFillBlankPreview(problem, submission.answer ?? "", locale);
}

export function gradeProblem(
  problem: ProblemSchema,
  submission: ProblemSubmission,
  locale: Locale
): ProblemSubmissionResult {
  if (problem.type === "MCQ") {
    const selectedChoice = submission.choiceId ?? "";
    const isCorrect = selectedChoice === problem.correctAnswer.choiceId;

    return {
      correct: isCorrect,
      correctAnswerPreview: getCorrectAnswerPreview(problem, locale),
      hint: isCorrect ? undefined : getLocalizedText(problem.hints[0], locale),
      normalizedAnswer: selectedChoice,
      previewText: previewProblemSubmission(problem, submission, locale).previewText,
      shouldShowSolution: false,
      solutionLocked: false,
      showCorrectAnswer: false,
    };
  }

  return gradeFillBlank(problem, submission, locale);
}
