# Roadmap

This roadmap tracks the current interactive math notes implementation in the
workspace. It records what is already live in code, what remains active, and
what is blocked by source availability or local tooling.

## Completed

The following milestone items are already implemented in the current codebase.

- Localized public notes routes under
  `/[locale]/notes/[course]/[chapter]/[unit]`.
- Compatibility redirects from `/${locale}/courses/**` to the matching notes
  routes.
- A shared catalog, glossary model, route helper layer, and localized UI text
  utilities under `src/lib/textbook/`.
- Unit-level TXT and PDF export endpoints under
  `/api/textbook-export/[locale]/[course]/[chapter]/[unit]`.
- Reusable localized note blocks for definitions, theorem cards, worked
  examples, quick checks, revealable solutions, collapsible proofs, and common
  mistakes.
- Reusable interactive widgets for `math1090` logic and sets, and for
  `math1030` systems, elimination, matrix multiplication, invertibility,
  subspaces, span, and independence.
- Source-backed EN, zh-HK, and zh-CN note packs for:
  `math1090` 1.1, 1.2, 1.3, 2.1, 2.2, 3.1, 3.2, 3.3, 3.4, 3.5
  and `math1030` 1.1, 2.1, 2.2, 2.3, 2.4, 5.1, 6.1, 6.2, 6.3, 6.4, 6.5.
- A localized sidebar, breadcrumbs, page-level TOC, glossary popovers,
  progress tracking, and unit export controls on note pages.
- Public note pages now keep source traceability internal instead of showing
  large source-list panels in the main reading flow.

## Active

The following work is still active and needs follow-through.

- QA for the localized notes routes in EN, zh-HK, and zh-CN.
- Manual TXT and PDF export QA on units with tables, math blocks, and
  interactive snapshots.
- zh-HK terminology review for the newer vector-space and number-system units.
- Manual theme QA in light mode, dark mode, and high-contrast mode across both
  legacy pages and localized notes routes.
- Additional `math1030` work on linear transformations and later geometry-rich
  interactions once source mapping is tighter.
- Additional `math1090` work only if stronger local references are added.

## Blocked or partial

The following items remain limited by source availability or the local
environment.

- `MISSING_SOURCE`: MATH1090 topics beyond the current `3.5` boundary do not
  yet have enough local support for detailed public notes.
- `MISSING_SOURCE`: later MATH1030 topics after the current basis and
  dimension pack still need subsection-level source mapping.
- Automated verification remains partial because the local Node setup is
  inconsistent inside this WSL workspace and some `npm`-driven commands fall
  back to the Windows bridge.

## Review gate

Use this gate before you mark a note milestone complete.

1. Confirm the target note resolves under `en`, `zh-hk`, and `zh-cn`.
2. Confirm the sidebar, breadcrumbs, and page TOC localize correctly.
3. Confirm the note content exists in all three languages or is marked
   `MISSING_SOURCE`.
4. Confirm the interactive widget has a readable static export snapshot.
5. Confirm TXT and PDF export only the current note.
6. Confirm terminology matches `docs/terminology-glossary.md`.
7. Confirm source refs remain accurate in metadata and docs.

## Next steps

Finish the QA pass on the new Notes routes, verify export output on the newer
vector-space units, and only then expand into the next source-backed topics.
