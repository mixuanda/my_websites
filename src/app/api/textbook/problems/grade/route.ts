import { NextResponse } from "next/server";
import { getProblemById } from "@/lib/textbook/problem-bank";
import { gradeProblem } from "@/lib/textbook/problem-grading";
import type { ProblemSubmission } from "@/lib/textbook/types";

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

    const result = gradeProblem(problem, payload.submission);

    return NextResponse.json({
      problemId: payload.problemId,
      result,
    });
  } catch (error) {
    console.error("Grade API error:", error);
    return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
  }
}
