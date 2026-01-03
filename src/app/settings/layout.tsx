import { SessionProvider } from "next-auth/react";

export const metadata = {
  title: "账号设置",
  description: "管理你的登录方式和绑定账号",
};

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}
