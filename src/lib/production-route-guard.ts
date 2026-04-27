import { notFound } from "next/navigation";
import { isProductionSurface, isPreviewOnlyPath } from "@/lib/site-surface";

export function notFoundInProduction() {
  if (isProductionSurface()) {
    notFound();
  }
}

export function notFoundIfPreviewOnlyPath(pathname: string) {
  if (isProductionSurface() && isPreviewOnlyPath(pathname)) {
    notFound();
  }
}
