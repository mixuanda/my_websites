import { auth } from "@/lib/auth";
import { isAdminEmail } from "@/lib/membership/config";
import { notFoundInProduction } from "@/lib/production-route-guard";
import { redirect } from "next/navigation";

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
  notFoundInProduction();

  const session = await auth();

  // 未登录，跳转登录页
  if (!session?.user) {
    redirect("/login?callbackUrl=/admin");
  }

  const userEmail = session.user.email?.toLowerCase() || "";

  // 检查是否为管理员
  if (!isAdminEmail(userEmail)) {
    redirect("/unauthorized");
  }

  return <>{children}</>;
}
