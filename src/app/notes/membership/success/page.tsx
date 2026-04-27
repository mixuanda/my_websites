import { redirect } from "next/navigation";
import { notFoundInProduction } from "@/lib/production-route-guard";
import { defaultLocale } from "@/lib/textbook/i18n";
import { getMembershipSuccessHref } from "@/lib/textbook/routes";

export default function MembershipSuccessPage() {
  notFoundInProduction();

  redirect(getMembershipSuccessHref(defaultLocale));
}
