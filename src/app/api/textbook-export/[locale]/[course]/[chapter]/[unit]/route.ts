import { buildTextbookTxt } from "@/lib/textbook/export";
import { getLocalizedTextbookUnitExport } from "@/lib/textbook/content";
import { isLocale } from "@/lib/textbook/i18n";
import { getUnitMetaByRoute, textbookCatalog } from "@/lib/textbook/catalog";
import { auth } from "@/lib/auth";
import { canAccessTier, getUserEntitlements } from "@/lib/membership/entitlements";
import type { CourseId } from "@/lib/textbook/types";

interface RouteContext {
  params: Promise<{
    chapter: string;
    course: string;
    locale: string;
    unit: string;
  }>;
}

export async function GET(_: Request, { params }: RouteContext) {
  const { chapter, course, locale, unit } = await params;

  if (!isLocale(locale) || !(course in textbookCatalog)) {
    return new Response("Unsupported textbook export route", { status: 400 });
  }

  const exportableUnit = getLocalizedTextbookUnitExport(
    locale,
    course as CourseId,
    chapter,
    unit
  );

  if (!exportableUnit) {
    return new Response("Textbook unit not found", { status: 404 });
  }

  const unitMeta = getUnitMetaByRoute(course as CourseId, chapter, unit);
  const entitlements = await getUserEntitlements(await auth());

  if (unitMeta && !canAccessTier(entitlements, unitMeta.accessTier)) {
    return new Response("This note export is not available for this account.", {
      status: 403,
    });
  }

  const txt = buildTextbookTxt(exportableUnit);

  return new Response(txt, {
    headers: {
      "Content-Disposition": `attachment; filename="${unit}-${locale}.txt"`,
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
