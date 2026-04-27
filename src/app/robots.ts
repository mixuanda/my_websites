import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.evanalysis.top";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/about/",
          "/admin/",
          "/api/admin/",
          "/api/auth/",
          "/api/billing/",
          "/api/export/",
          "/api/user/",
          "/blog/",
          "/categories/",
          "/diary/",
          "/login/",
          "/notes/membership/",
          "/private/",
          "/projects/",
          "/settings/",
          "/tags/",
          "/unauthorized/",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
