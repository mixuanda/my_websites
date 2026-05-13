import { auth } from "@/lib/auth";
import { isAdminEmail } from "@/lib/membership/config";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Admin",
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
  const userEmail = session?.user?.email?.toLowerCase() || "";

  if (!userEmail || !isAdminEmail(userEmail)) {
    notFound();
  }

  return <>{children}</>;
}
