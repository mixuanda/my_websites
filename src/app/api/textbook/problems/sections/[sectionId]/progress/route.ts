import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getSectionMastery } from "@/lib/textbook/problem-attempts";

export async function GET(
  _request: Request,
  context: { params: Promise<{ sectionId: string }> }
) {
  const { sectionId } = await context.params;
  const session = await auth();
  const userId = (session?.user as { id?: string } | undefined)?.id;

  const mastery = await getSectionMastery(sectionId, userId);
  return NextResponse.json({ mastery });
}
