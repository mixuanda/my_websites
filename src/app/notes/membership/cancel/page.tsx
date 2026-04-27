import { redirect } from "next/navigation";
import { notFoundInProduction } from "@/lib/production-route-guard";
import { defaultLocale } from "@/lib/textbook/i18n";
import { getMembershipCancelHref } from "@/lib/textbook/routes";

export default function MembershipCancelPage() {
  notFoundInProduction();

  redirect(getMembershipCancelHref(defaultLocale));
}
