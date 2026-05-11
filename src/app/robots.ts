import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/about/",
          "/admin/",
          "/api/",
          "/blog/",
          "/categories/",
          "/courses/",
          "/diary/",
          "/en/courses/",
          "/login/",
          "/notes/membership/",
          "/private/",
          "/projects/",
          "/settings/",
          "/tags/",
          "/unauthorized/",
          "/zh-cn/courses/",
          "/zh-hk/courses/",
          "/en/notes/membership/",
          "/zh-cn/notes/membership/",
          "/zh-hk/notes/membership/",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
