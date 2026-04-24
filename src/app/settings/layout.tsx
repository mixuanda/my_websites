import { auth } from "@/lib/auth";
import { SessionProvider } from "next-auth/react";
import { redirect } from "next/navigation";

export const metadata = {
  title: "账号设置",
  description: "管理你的登录方式和绑定账号",
};

export default async function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login?callbackUrl=/settings");
  }

  return <SessionProvider session={session}>{children}</SessionProvider>;
}
