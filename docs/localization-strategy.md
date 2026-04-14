# Localization strategy

The math notes site uses a shared structure layer plus localized note prose so
English, Traditional Chinese, and Simplified Chinese stay aligned without
turning the experience into a literal translation shell. Public labels now use
the Notes frame consistently, while the internal code namespace remains
`textbook`.

## Current architecture

The current codebase uses the following localization model.

- Public routes use `/[locale]/notes/[course]/[chapter]/[unit]`.
- Membership routes use `/[locale]/notes/membership`,
  `/[locale]/notes/membership/success`, and
  `/[locale]/notes/membership/cancel`.
- Old `/[locale]/courses/**` routes redirect to the matching notes route.
- Each finished unit has three MDX files under `content/textbook/**`:
  `en.mdx`, `zh-hk.mdx`, and `zh-cn.mdx`.
- Shared structure lives in `src/lib/textbook/catalog.ts`, including unit ids,
  prerequisites, source refs, glossary refs, coverage status, and interactive
  widget ids.
- Shared terminology and spoken-language-ready notes live in
  `src/lib/textbook/glossary.ts`.
- Shared note-shell UI strings live in `src/lib/textbook/i18n.ts`.
- Shared site-shell UI strings live in `src/lib/site-i18n.ts`.

## Current UI behavior

Localization now covers both the note content and the shared chrome around it.

- The language switcher preserves the current note route while replacing the
  locale segment.
- The localized note shell includes translated breadcrumbs, sidebar labels,
  TOC labels, export labels, progress labels, glossary labels, interactive
  UI text, checkpoint UI text, and membership-center actions.
- The global sidebar derives locale from the current route first, then from the
  stored preferred locale. This keeps `/en`, `/zh-hk`, and `/zh-cn` note pages
  aligned while still letting unprefixed shell pages reuse the learner's last
  note language.
- Progress state uses the canonical `unitId`, so switching languages does not
  reset completion.

The latest three-language content rewrites also remove mixed English worksheet
or source-file phrasing from the public teaching prose. The goal is that the
localized note reads like a note in that language, not like a translation shell
wrapped around authoring-process comments.

## Writing and translation rules

The prose itself must stay mathematically stable while sounding natural in each
language.

- Use English as the drafting language for prompts and internal coordination.
- Write zh-HK as Hong Kong-friendly Traditional Chinese, not as a character
  conversion of zh-CN.
- Keep notation, formulas, and symbolic structure unchanged across languages
  unless a notation note is truly necessary.
- Avoid silent fallback to English. If one language variant is incomplete, keep
  that state visible instead of pretending the note is finished.
- Mark unsupported material as `MISSING_SOURCE` rather than filling gaps from
  memory.

## Spoken-language readiness

The current implementation is written-language-first, but the glossary model is
already prepared for later pronunciation and narration support.

- `cantoneseNote`
- `putonghuaNote`
- `englishPronunciationNote`
- `notationNote`

Use these fields for pronunciation hooks, narration scripts, or glossary audio
later. Do not treat them as translation clutter.

## Current localized coverage

The following units currently exist in EN, zh-HK, and zh-CN.

- `math1090`: 1.1, 1.2, 1.3, 2.1, 2.2, 3.1, 3.2, 3.3, 3.4, 3.5
- `math1030`: 1.1, 2.1, 2.2, 2.3, 2.4, 5.1, 6.1, 6.2, 6.3, 6.4, 6.5, 6.6,
  7.1, 7.2, 7.3

## Next steps

Keep future public wording inside the Notes frame, maintain three-language
parity whenever you expand checkpoint or billing flows, and keep future-course
architecture generic enough for Math1025 without pretending that unfinished
course families are complete.
