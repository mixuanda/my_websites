# Search Console and SEO Setup

This note records the repository-side SEO contract for the public Notes surface.

## Search Console verification

Use a Google Search Console URL-prefix property for `https://www.evanalysis.top/`.
After Google gives the HTML meta tag, copy only the `content` value and set one
of these environment variables in Vercel:

- `GOOGLE_SITE_VERIFICATION`
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`

The root metadata emits the corresponding `google-site-verification` tag when
one of those variables is present. The DNS TXT verification method also works,
but it is managed outside this repository.

## Sitemap submission

Submit this sitemap in Search Console:

```text
https://www.evanalysis.top/sitemap.xml
```

The sitemap includes the public Notes index, public course pages, and public
unit pages. Each localized Notes URL includes hreflang alternates for English,
Traditional Chinese, Simplified Chinese, and `x-default`.

## Robots policy

The public Notes pages remain crawlable. Preview-only, account, admin, billing,
API, legacy course, blog, project, and membership routes stay out of search via
`robots.txt` and page-level production guards where applicable.

## Environment assumptions

Production should keep:

```text
NEXT_PUBLIC_SITE_URL=https://www.evanalysis.top
SITE_SURFACE=production
```

If `NEXT_PUBLIC_SITE_URL` is absent, the code falls back to
`https://www.evanalysis.top`.
