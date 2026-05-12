import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getEntitlementsByUserId } from "@/lib/billing/store";

export async function GET() {
  const session = await auth();
  const userId = session?.user ? (session.user as { id?: string }).id : null;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const entitlements = await getEntitlementsByUserId(userId);
  return NextResponse.json({ entitlements });
}
