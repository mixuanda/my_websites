import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { canAccessTier, getUserEntitlements } from "@/lib/membership/entitlements";
import { getUnitMeta } from "@/lib/textbook/catalog";
import { getProblemsForUnit } from "@/lib/textbook/problem-bank";
import { getCheckpointSummary, getSectionMastery } from "@/lib/textbook/problem-attempts";

export async function GET(
  _request: Request,
  context: { params: Promise<{ sectionId: string }> }
) {
  const { sectionId } = await context.params;
  const session = await auth();
  const entitlements = await getUserEntitlements(session);
  const unitMeta = getUnitMeta(sectionId);
  if (unitMeta && !canAccessTier(entitlements, unitMeta.accessTier)) {
    return NextResponse.json({ error: "Member access required." }, { status: 403 });
  }
  const userId = (session?.user as { id?: string } | undefined)?.id;
  const problems = getProblemsForUnit(sectionId).filter((problem) =>
    canAccessTier(entitlements, problem.accessTier)
  );

  const mastery = await getSectionMastery(sectionId, userId);
  const summary = await getCheckpointSummary(sectionId, problems, userId);
  return NextResponse.json({ mastery, summary });
}
