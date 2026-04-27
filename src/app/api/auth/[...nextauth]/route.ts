import { handlers } from "@/lib/auth";
import { notFoundApiResponseInProduction } from "@/lib/production-api-guard";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  return notFoundApiResponseInProduction() ?? handlers.GET(request);
}

export async function POST(request: NextRequest) {
  return notFoundApiResponseInProduction() ?? handlers.POST(request);
}
