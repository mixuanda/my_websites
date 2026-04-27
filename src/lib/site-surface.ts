export type SiteSurface = "production" | "preview";

const previewOnlyPathPatterns = [
  /^\/about(?:\/|$)/,
  /^\/admin(?:\/|$)/,
  /^\/api\/admin(?:\/|$)/,
  /^\/api\/auth(?:\/|$)/,
  /^\/api\/billing(?:\/|$)/,
  /^\/api\/export(?:\/|$)/,
  /^\/api\/user(?:\/|$)/,
  /^\/blog(?:\/|$)/,
  /^\/categories(?:\/|$)/,
  /^\/diary(?:\/|$)/,
  /^\/login(?:\/|$)/,
  /^\/notes\/(?!membership(?:\/|$))(?:[^/]+)(?:\/|$)/,
  /^\/notes\/membership(?:\/|$)/,
  /^\/private(?:\/|$)/,
  /^\/projects(?:\/|$)/,
  /^\/settings(?:\/|$)/,
  /^\/tags(?:\/|$)/,
  /^\/unauthorized(?:\/|$)/,
  /^\/(?:en|zh-hk|zh-cn)\/notes\/membership(?:\/|$)/,
];

function normalizeSurface(value?: string | null): SiteSurface | null {
  if (!value) return null;

  if (value === "production") {
    return "production";
  }

  if (value === "preview" || value === "development" || value === "dev") {
    return "preview";
  }

  return null;
}

export function getSiteSurface(): SiteSurface {
  const explicitSurface =
    normalizeSurface(process.env.SITE_SURFACE) ??
    normalizeSurface(process.env.NEXT_PUBLIC_SITE_SURFACE);

  if (explicitSurface) {
    return explicitSurface;
  }

  const vercelSurface = normalizeSurface(process.env.VERCEL_ENV);

  if (vercelSurface) {
    return vercelSurface;
  }

  return process.env.NODE_ENV === "production" ? "production" : "preview";
}

export function isProductionSurface(surface: SiteSurface = getSiteSurface()) {
  return surface === "production";
}

export function isPreviewOnlyPath(pathname: string) {
  return previewOnlyPathPatterns.some((pattern) => pattern.test(pathname));
}
