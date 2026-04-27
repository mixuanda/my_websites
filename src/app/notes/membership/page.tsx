import { redirect } from "next/navigation";
import { notFoundInProduction } from "@/lib/production-route-guard";
import { defaultLocale } from "@/lib/textbook/i18n";
import { getMembershipHref } from "@/lib/textbook/routes";

export default function MembershipPage() {
  notFoundInProduction();

  redirect(getMembershipHref(defaultLocale));
}
