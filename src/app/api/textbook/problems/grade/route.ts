import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { canAccessTier, getUserEntitlements } from "@/lib/membership/entitlements";
import { getProblemById } from "@/lib/textbook/problem-bank";
import { previewProblemSubmission } from "@/lib/textbook/problem-grading";
import { defaultLocale, isLocale } from "@/lib/textbook/i18n";
import type { ProblemSubmission } from "@/lib/textbook/types";

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

    const entitlements = await getUserEntitlements(await auth());
    if (!canAccessTier(entitlements, problem.accessTier)) {
      return NextResponse.json({ error: "Member access required." }, { status: 403 });
    }

    const locale = payload.locale && isLocale(payload.locale) ? payload.locale : defaultLocale;
    const preview = previewProblemSubmission(problem, payload.submission, locale);

    return NextResponse.json({
      problemId: payload.problemId,
      preview,
    });
  } catch (error) {
    console.error("Grade API error:", error);
    return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
  }
}
