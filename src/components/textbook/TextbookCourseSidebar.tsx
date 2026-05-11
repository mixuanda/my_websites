import { isMembershipGatingEnabled } from "@/lib/membership/entitlements";
import type { Locale, TextbookCourseMeta } from "@/lib/textbook/types";
import { TextbookCourseSidebarClient } from "./TextbookCourseSidebarClient";

interface TextbookCourseSidebarProps {
  courseMeta: TextbookCourseMeta;
  currentUnitId?: string;
  locale: Locale;
}

export function TextbookCourseSidebar({
  courseMeta,
  currentUnitId,
  locale,
}: TextbookCourseSidebarProps) {
  const membershipGatingEnabled = isMembershipGatingEnabled();

  return (
    <TextbookCourseSidebarClient
      key={`${locale}:${courseMeta.id}:${currentUnitId ?? "overview"}`}
      courseMeta={courseMeta}
      currentUnitId={currentUnitId}
      locale={locale}
      membershipGatingEnabled={membershipGatingEnabled}
    />
  );
}
