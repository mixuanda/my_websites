import { auth } from "@/lib/auth";
import { firestore } from "@/lib/firebase-admin";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!firestore) {
      return NextResponse.json({ accounts: [], message: "Database not configured" });
    }

    // 查找用户
    const usersSnapshot = await firestore
      .collection("users")
      .where("email", "==", session.user.email)
      .limit(1)
      .get();

    if (usersSnapshot.empty) {
      return NextResponse.json({ accounts: [] });
    }

    const userId = usersSnapshot.docs[0].id;

    // 获取用户绑定的所有账号
    const accountsSnapshot = await firestore
      .collection("accounts")
      .where("userId", "==", userId)
      .get();

    const accounts = accountsSnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        provider: data.provider,
        providerAccountId: data.providerAccountId,
        type: data.type,
      };
    });

    return NextResponse.json({ accounts, userId });
  } catch (error) {
    console.error("Error fetching accounts:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
