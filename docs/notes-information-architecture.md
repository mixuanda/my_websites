# Notes information architecture

The public math experience now lives under **Notes**, not under a separate
top-level course or textbook product. This doc records the route model,
reader-facing framing rules, and the internal boundary between public notes
language and the still-internal `textbook` namespace in code.

## Public route model

The public IA is route-based and unit-based. Each learning unit behaves like a
note detail page.

- `/${locale}/notes` is the localized math notes landing page.
- `/${locale}/notes/${course}` is the localized note collection for one
  course.
- `/${locale}/notes/${course}/${chapter}/${unit}` is the note detail route for
  a single learning unit.
- `/notes` remains the legacy note archive and now links back into the
  localized math notes hub.
- `/${locale}/courses/**` remains as compatibility redirects only. It is not
  the intended public entry path.

## Reader-facing rules

The public shell must feel like a personal site with a Notes section, not a
detached course portal.

- Use **Notes / 筆記 / 笔记** in headings, breadcrumbs, sidebar labels, and
  CTA copy.
- Keep note pages article-first. Interactive blocks sit inside the reading
  flow near the paragraph, example, or check they support.
- Keep the course sidebar, page TOC, prerequisite links, glossary popovers,
  progress controls, and export controls on note pages.
- Do not show large source-tracing panels in the main reader flow.
- Keep note pages small and linked. Avoid chapter-sized single pages.

## Internal model

The internal content and metadata system still uses `textbook` in filenames
and code paths. That is an implementation detail, not public product
language.

- Content source files still live under `content/textbook/**`.
- Shared metadata still lives in `src/lib/textbook/catalog.ts`.
- Shared route helpers still live in `src/lib/textbook/routes.ts`.
- Shared MDX blocks and widgets still live under `src/components/textbook/**`.
- Export APIs still live under `src/app/api/textbook-export/**`.

Keep that namespace until a deeper refactor is worth the churn. Do not rename
internal folders casually while content production is active.

## Public traceability policy

Source traceability still matters, but it now belongs to internal docs and
metadata rather than dominating note pages.

- Keep `sourceRefs` in catalog metadata.
- Keep `docs/source-audit.md` current.
- Show `MISSING_SOURCE` clearly when a unit lacks adequate support.
- Keep exported study copies focused on the learning material rather than raw
  source listings.

## Review checklist

Use this checklist before you land IA changes.

1. Confirm the main sidebar points to localized Notes routes.
2. Confirm `/[locale]/notes` is reachable in all three written languages.
3. Confirm old `/[locale]/courses/**` paths redirect to the matching notes
   route.
4. Confirm note detail pages still render the course sidebar, TOC, progress,
   and export controls.
5. Confirm the `/notes` archive still exposes the math notes hub.

## Next steps

Keep future IA work inside the Notes frame, and avoid introducing new public
labels such as “Textbook” unless the product direction changes explicitly.
