import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getProblemById } from "@/lib/textbook/problem-bank";
import { persistProblemAttempt, getSectionMastery } from "@/lib/textbook/problem-attempts";
import { gradeProblem } from "@/lib/textbook/problem-grading";
import { canAccessTier, getUserEntitlements } from "@/lib/membership/entitlements";
import type { ProblemAttemptRecord, ProblemSubmission } from "@/lib/textbook/types";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as {
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

    const result = gradeProblem(problem, payload.submission);
    const userId = (session?.user as { id?: string } | undefined)?.id;

    const attempt: ProblemAttemptRecord = {
      attemptId: crypto.randomUUID(),
      attemptedAt: new Date().toISOString(),
      chapterId: problem.chapterId,
      correct: result.correct,
      courseId: problem.courseId,
      normalizedAnswer: result.normalizedAnswer,
      problemId: problem.id,
      unitId: problem.unitId,
      userId,
    };

    await persistProblemAttempt(attempt);
    const mastery = await getSectionMastery(problem.unitId, userId);

    return NextResponse.json({
      attempt,
      mastery,
      result,
    });
  } catch (error) {
    console.error("Submit API error:", error);
    return NextResponse.json({ error: "Unable to submit attempt" }, { status: 500 });
  }
}
