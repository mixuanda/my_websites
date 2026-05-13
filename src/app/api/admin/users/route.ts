import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { listAdminUserRows } from "@/lib/admin-users";
import { isAdminEmail } from "@/lib/membership/config";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await auth();
  const email = session?.user?.email?.toLowerCase();

  if (!email) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (!isAdminEmail(email)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const users = await listAdminUserRows();
  return NextResponse.json({
    count: users.length,
    users,
  });
}
