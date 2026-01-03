import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

// 管理员邮箱列表（从环境变量读取）
const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || "").split(",").map((e) => e.trim().toLowerCase());

export const metadata = {
  title: "Admin - TinaCMS",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // 未登录，跳转登录页
  if (!session?.user) {
    redirect("/login?callbackUrl=/admin");
  }

  const userEmail = session.user.email?.toLowerCase() || "";

  // 检查是否为管理员
  if (ADMIN_EMAILS.length > 0 && !ADMIN_EMAILS.includes(userEmail)) {
    redirect("/unauthorized");
  }

  return <>{children}</>;
}
