import { NextResponse } from "next/server";
import { isProductionSurface } from "@/lib/site-surface";

export function notFoundApiResponseInProduction() {
  if (!isProductionSurface()) {
    return null;
  }

  return NextResponse.json({ error: "Not found" }, { status: 404 });
}
