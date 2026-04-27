import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { listAdminUserRows } from "@/lib/admin-users";
import { isAdminEmail } from "@/lib/membership/config";
import { notFoundApiResponseInProduction } from "@/lib/production-api-guard";

export const dynamic = "force-dynamic";

export async function GET() {
  const hiddenResponse = notFoundApiResponseInProduction();
  if (hiddenResponse) return hiddenResponse;

  const session = await auth();
  const email = session?.user?.email?.toLowerCase();

  if (!email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isAdminEmail(email)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const users = await listAdminUserRows();
  return NextResponse.json({
    count: users.length,
    users,
  });
}
