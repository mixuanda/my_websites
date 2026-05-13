import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { defaultLocale } from "@/lib/textbook/i18n";
import { getMembershipHref } from "@/lib/textbook/routes";
import { getSessionProfile } from "@/lib/user-store";

export default async function BillingPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect(`/login?callbackUrl=${encodeURIComponent(getMembershipHref(defaultLocale))}`);
  }

  const profile = await getSessionProfile(session);
  redirect(getMembershipHref(profile?.preferredLocale ?? defaultLocale));
}
