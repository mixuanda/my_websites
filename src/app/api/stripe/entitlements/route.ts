import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import {
  getMembershipRecordByEmail,
  getMembershipRecordByUserId,
  getUserEntitlements,
} from "@/lib/membership/entitlements";

export async function GET() {
  const session = await auth();
  const user = session?.user as { email?: string | null; id?: string } | undefined;

  if (!user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const entitlements = await getUserEntitlements(session);
  const membership =
    (await getMembershipRecordByUserId(user.id)) ??
    (await getMembershipRecordByEmail(user.email));

  return NextResponse.json({ entitlements, membership });
}
