import { auth } from "@/lib/auth";
import { notFoundApiResponseInProduction } from "@/lib/production-api-guard";
import { getLinkedAccounts, getSessionProfile } from "@/lib/user-store";
import { NextResponse } from "next/server";

export async function GET() {
  const hiddenResponse = notFoundApiResponseInProduction();
  if (hiddenResponse) return hiddenResponse;

  try {
    const session = await auth();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const profile = await getSessionProfile(session);
    const accounts = await getLinkedAccounts(session);

    return NextResponse.json({
      accounts,
      userId: profile?.id,
    });
  } catch (error) {
    console.error("Error fetching accounts:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
