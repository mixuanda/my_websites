import { redirect } from "next/navigation";
import { defaultLocale } from "@/lib/textbook/i18n";
import { getMembershipHref } from "@/lib/textbook/routes";

export default function MembershipPage() {
  redirect(getMembershipHref(defaultLocale));
}
