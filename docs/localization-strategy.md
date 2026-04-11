# Localization strategy

The textbook now uses a locale-prefixed route model and a shared metadata
layer so English, Traditional Chinese, and Simplified Chinese can stay aligned
without turning the site into a literal translation shell. You write one
source-backed unit structure, then pair it with localized exposition and
localized UI labels.

## Current architecture

The current codebase uses the following localization model.

- Routes use `/[locale]/courses/[course]/[chapter]/[unit]`.
- Each finished unit has three MDX files under `content/textbook/**`:
  `en.mdx`, `zh-hk.mdx`, and `zh-cn.mdx`.
- Shared structure lives in `src/lib/textbook/catalog.ts`, including unit ids,
  prerequisites, source references, glossary references, coverage status, and
  interactive widget ids.
- Shared terminology and spoken-language-ready notes live in
  `src/lib/textbook/glossary.ts`.
- Shared UI strings live in `src/lib/textbook/i18n.ts`.
- Shared shell-level UI strings now live in `src/lib/site-i18n.ts`.

## Current UI behavior

Localization is no longer limited to textbook cards. The shell now localizes the
site-wide chrome that sits around the textbook too.

- The language switcher preserves the current textbook route while replacing
  the locale segment.
- The course sidebar, breadcrumbs, page table of contents label, export menu,
  glossary labels, and progress labels localize.
- The global sidebar now derives locale from the current route first, then from
  the stored preferred locale. This keeps `/en`, `/zh-hk`, and `/zh-cn`
  textbook pages aligned while still letting unprefixed shell pages adopt the
  learner's last textbook language.
- The global navigation, shell subtitle, theme toggle label, high-contrast
  label, footer note, and default page TOC label now localize.
- Progress state uses the canonical `unitId`, so switching language does not
  reset completion.
- The current locale and last visited unit are stored in local storage.

## Current correction focus

This phase corrected the gap between localized textbook routes and the
previously Chinese-only site shell.

- English textbook routes no longer inherit Chinese sidebar labels by default.
- zh-HK continues to prefer Hong Kong-friendly Traditional Chinese wording.
- The shell locale handoff uses a client effect for stored-preference fallback
  so unprefixed routes do not hydrate to mismatched labels.

## Writing and translation rules

The text itself must stay mathematically stable while reading naturally in each
language.

- Use English as the drafting language for prompts and internal coordination.
- Write zh-HK in Hong Kong-friendly Traditional Chinese rather than direct
  character conversion from Simplified Chinese.
- Keep notation, formulas, and symbolic structure identical across languages
  unless a notation note is genuinely necessary.
- Avoid silent fallback to English. If a unit is incomplete in one language,
  keep that state visible instead of pretending the page is finished.
- Mark unsupported material as `MISSING_SOURCE` rather than filling gaps from
  memory.

## Spoken-language readiness

The current implementation is written-language-first, but the glossary model is
already prepared for future narration and pronunciation support.

- `cantoneseNote`
- `putonghuaNote`
- `englishPronunciationNote`
- `notationNote`

Use these fields for pronunciation hooks, narration scripts, or glossary audio
later. Do not treat them as optional translation clutter.

## Current coverage

The current production-ready units are fully localized in EN, zh-HK, and
zh-CN.

- `math1090`: 1.1, 1.2, 1.3, 2.1, 2.2
- `math1030`: 1.1, 2.1, 2.2, 2.3, 2.4, 5.1

## Next steps

Tighten the zh-HK terminology pass, add more spoken-language notes where they
help, and keep every new unit aligned with the glossary before you expand the
course coverage.
