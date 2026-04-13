import { redirect } from "next/navigation";
import { defaultLocale } from "@/lib/textbook/i18n";
import { getMembershipSuccessHref } from "@/lib/textbook/routes";

export default function MembershipSuccessPage() {
  redirect(getMembershipSuccessHref(defaultLocale));
}
