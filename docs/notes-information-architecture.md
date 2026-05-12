# Notes information architecture

The public math experience now lives under **Notes**, not under a separate
top-level course or textbook product. This doc records the route model,
reader-facing framing rules, and the internal boundary between public notes
language and the still-internal `textbook` namespace in code.

## Public route model

The public IA is route-based and unit-based. Each learning unit behaves like a
note detail page.

- `/notes` is the Notes hub for the whole site. It now presents the math note
  collections first and keeps the older general-note archive in the same
  section.
- `/${locale}/notes` is the localized math notes landing page.
- `/${locale}/notes/${course}` is the localized note collection for one
  course.
- `/${locale}/notes/${course}/${chapter}/${unit}` is the note detail route for
  a single learning unit.
- `/${locale}/notes/membership` is the localized membership center for the
  Notes product.
- `/${locale}/notes/membership/success` and
  `/${locale}/notes/membership/cancel` are localized Stripe return routes.
- `/notes` remains the legacy note archive and now links back into the
  localized math notes hub.
- `/notes/membership*` remains only as compatibility redirects to the default
  locale membership routes.
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

## Course sidebar behavior

The course sidebar is a Notes navigation aid, not a separate course portal.
Its controls should help readers scan long course note collections without
changing the public framing.

- Keep the course title, language switcher, all-courses link, course overview
  link, chapter quick links, and section links inside the existing note shell.
- Keep search scoped to the current course metadata: chapter number, chapter
  title, chapter summary, unit number, unit title, and unit description.
- Keep the all-chapters / current-chapter filter generic so future courses can
  reuse it without Math1030- or Math1090-specific branching.
- Default the current chapter open on unit pages, but let readers collapse it
  when they are scanning. During active search, matched chapters can remain
  forced open if the forced-open state is exposed as non-toggleable.
- Preserve accessible relationships between search/filter controls and the
  filtered chapter list. Chapter toggles should expose their controlled panel.
- Public labels must stay localized and Notes-oriented. Do not introduce
  public “Textbook portal” or “course app” language for this sidebar.

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
- Show `MISSING_SOURCE` only when a unit lacks adequate support.
- Keep exported study copies focused on the learning material rather than raw
  source listings.

## Review checklist

Use this checklist before you land IA changes.

1. Confirm the main sidebar points to `/notes`.
2. Confirm `/notes` links into the localized note collections.
3. Confirm old `/[locale]/courses/**` paths redirect to the matching notes
   route.
4. Confirm note detail pages still render the course sidebar, TOC, progress,
   and export controls.
5. Confirm the `/notes` archive still exposes the math notes hub.
6. For course sidebar changes, confirm course search, chapter filtering,
   expansion state, language switching, and light / dark mode in a real
   browser before commit.

## Next steps

Keep future IA work inside the Notes frame, and avoid introducing new public
labels such as “Textbook” unless the product direction changes explicitly.
