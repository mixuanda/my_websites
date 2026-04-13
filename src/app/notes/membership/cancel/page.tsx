import { redirect } from "next/navigation";
import { defaultLocale } from "@/lib/textbook/i18n";
import { getMembershipCancelHref } from "@/lib/textbook/routes";

export default function MembershipCancelPage() {
  redirect(getMembershipCancelHref(defaultLocale));
}
