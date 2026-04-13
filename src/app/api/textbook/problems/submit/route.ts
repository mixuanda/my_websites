import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getProblemById, getProblemsForUnit } from "@/lib/textbook/problem-bank";
import {
  getCheckpointSummary,
  getNextAttemptNumber,
  getProblemProgress,
  getSectionMastery,
  persistProblemAttempt,
} from "@/lib/textbook/problem-attempts";
import { gradeProblem } from "@/lib/textbook/problem-grading";
import { canAccessTier, getUserEntitlements } from "@/lib/membership/entitlements";
import { defaultLocale, getLocalizedText, isLocale } from "@/lib/textbook/i18n";
import type { ProblemAttemptRecord, ProblemSubmission } from "@/lib/textbook/types";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as {
      locale?: string;
      problemId?: string;
      submission?: ProblemSubmission;
    };

    if (!payload.problemId || !payload.submission) {
      return NextResponse.json({ error: "Missing problemId or submission" }, { status: 400 });
    }

    const problem = getProblemById(payload.problemId);
    if (!problem) {
      return NextResponse.json({ error: "Problem not found" }, { status: 404 });
    }

    const session = await auth();
    const entitlements = await getUserEntitlements(session);
    if (!canAccessTier(entitlements, problem.accessTier)) {
      return NextResponse.json({ error: "Member access required." }, { status: 403 });
    }

    const locale = payload.locale && isLocale(payload.locale) ? payload.locale : defaultLocale;
    const userId = (session?.user as { id?: string } | undefined)?.id;
    const currentProgress = await getProblemProgress(problem.id, userId, problem.maxAttempts);
    const showCorrectAnswerPolicy = problem.showCorrectAnswerPolicy ?? "after-submit";
    const showSolutionPolicy = problem.showSolutionPolicy ?? "after-submit";
    const canAccessSolutionTier = canAccessTier(
      entitlements,
      problem.solutionAccessTier ?? problem.accessTier
    );

    if (
      currentProgress.maxAttempts !== null &&
      currentProgress.attemptsUsed >= currentProgress.maxAttempts
    ) {
      const canRevealCorrectAnswer =
        showCorrectAnswerPolicy === "after-submit" ||
        (showCorrectAnswerPolicy === "after-max-attempts" &&
          currentProgress.attemptsRemaining === 0);
      const canRevealSolutionByPolicy =
        showSolutionPolicy === "after-submit" ||
        (showSolutionPolicy === "after-max-attempts" &&
          currentProgress.attemptsRemaining === 0);

      return NextResponse.json(
        {
          error: "No attempts remaining for this problem.",
          problemProgress: currentProgress,
          result: {
            correct: currentProgress.solved,
            correctAnswerPreview: canRevealCorrectAnswer
              ? problem.type === "MCQ"
                ? problem.choices.find(
                    (choice) => choice.id === problem.correctAnswer.choiceId
                  )
                  ? getLocalizedText(
                      problem.choices.find(
                        (choice) => choice.id === problem.correctAnswer.choiceId
                      )!.text,
                      locale
                    )
                  : undefined
                : problem.correctAnswer.value
              : undefined,
            normalizedAnswer: "",
            shouldShowSolution: canRevealSolutionByPolicy && canAccessSolutionTier,
            showCorrectAnswer: canRevealCorrectAnswer,
            solutionLocked: canRevealSolutionByPolicy && !canAccessSolutionTier,
          },
        },
        { status: 409 }
      );
    }

    const result = gradeProblem(problem, payload.submission, locale);
    const attemptNumber = await getNextAttemptNumber(problem.id, userId);

    const attempt: ProblemAttemptRecord = {
      attemptId: crypto.randomUUID(),
      attemptedAt: new Date().toISOString(),
      attemptNumber,
      chapterId: problem.chapterId,
      correct: result.correct,
      courseId: problem.courseId,
      normalizedAnswer: result.normalizedAnswer,
      problemId: problem.id,
      score: result.correct ? 1 : 0,
      unitId: problem.unitId,
      userId,
    };

    await persistProblemAttempt(attempt);
    const mastery = await getSectionMastery(problem.unitId, userId);
    const problemProgress = await getProblemProgress(problem.id, userId, problem.maxAttempts);
    const canRevealCorrectAnswer =
      showCorrectAnswerPolicy === "after-submit" ||
      (showCorrectAnswerPolicy === "after-max-attempts" &&
        problemProgress.attemptsRemaining === 0);
    const canRevealSolutionByPolicy =
      showSolutionPolicy === "after-submit" ||
      (showSolutionPolicy === "after-correct" && result.correct) ||
      (showSolutionPolicy === "after-max-attempts" &&
        problemProgress.attemptsRemaining === 0);
    const checkpointProblems = getProblemsForUnit(problem.unitId).filter((candidate) =>
      canAccessTier(entitlements, candidate.accessTier)
    );
    const summary = await getCheckpointSummary(problem.unitId, checkpointProblems, userId);
    const responseResult = {
      ...result,
      shouldShowSolution: canRevealSolutionByPolicy && canAccessSolutionTier,
      solutionLocked: canRevealSolutionByPolicy && !canAccessSolutionTier,
      showCorrectAnswer: canRevealCorrectAnswer,
    };

    return NextResponse.json({
      attempt,
      mastery,
      problemProgress,
      result: responseResult,
      summary,
    });
  } catch (error) {
    console.error("Submit API error:", error);
    return NextResponse.json({ error: "Unable to submit attempt" }, { status: 500 });
  }
}
