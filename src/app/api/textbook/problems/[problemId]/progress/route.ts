import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { canAccessTier, getUserEntitlements } from "@/lib/membership/entitlements";
import { getProblemById } from "@/lib/textbook/problem-bank";
import { getProblemProgress } from "@/lib/textbook/problem-attempts";

export async function GET(
  _request: Request,
  context: { params: Promise<{ problemId: string }> }
) {
  const { problemId } = await context.params;
  const session = await auth();
  const entitlements = await getUserEntitlements(session);
  const problem = getProblemById(problemId);

  if (!problem) {
    return NextResponse.json({ error: "Problem not found" }, { status: 404 });
  }

  if (!canAccessTier(entitlements, problem.accessTier)) {
    return NextResponse.json({ error: "Member access required." }, { status: 403 });
  }

  const userId = (session?.user as { id?: string } | undefined)?.id;
  const progress = await getProblemProgress(problemId, userId, problem.maxAttempts);

  return NextResponse.json({ progress });
}
