import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "登录",
  description: "登录以访问私密内容",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
