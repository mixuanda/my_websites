import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.mixuanda.top";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/diary/", "/private/", "/api/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
