# Roadmap

This roadmap tracks the interactive textbook implementation that now exists in
the workspace. It records what is already live in code, what is still active,
and what remains blocked by source coverage or environment issues.

## Completed

The following milestone items are implemented in the current codebase.

- Locale-prefixed textbook routes under
  `/[locale]/courses/[course]/[chapter]/[unit]`.
- A shared textbook catalog, glossary model, route helpers, and localized UI
  text utilities in `src/lib/textbook/`.
- Unit-level TXT and PDF export endpoints under
  `/api/textbook-export/[locale]/[course]/[chapter]/[unit]`.
- Reusable localized learning blocks for definitions, theorem cards, worked
  examples, quick checks, revealable solutions, collapsible proofs, and common
  mistakes.
- Reusable interactive widgets for the first `math1090` and `math1030`
  milestone units.
- The first complete source-backed unit packs in EN, zh-HK, and zh-CN for:
  `math1090` 1.1, 1.2, 1.3, 2.1, 2.2 and `math1030` 1.1, 2.1, 2.2, 2.3, 2.4,
  5.1.
- A textbook course sidebar, localized breadcrumbs, a language switcher, a
  page-level table of contents, glossary popovers, and local progress state.
- Shell-level localization now covers the global sidebar navigation, theme
  controls, high-contrast label, footer note, and fallback page TOC label.
- Textbook widgets now sit inside the article flow without a detached
  "interactive studio" wrapper.
- Theme handling now uses a shared light/dark background path and token-aware
  glass borders instead of assuming a permanently dark canvas.

## Active

The following work is in progress and still needs follow-through.

- QA for the new textbook routes in all three written languages.
- QA for TXT and PDF export formatting, especially on units with interactive
  widgets and tables.
- Hong Kong terminology review for zh-HK wording beyond the current early-unit
  glossary.
- Manual theme QA for light mode, dark mode, and high-contrast mode across
  both legacy pages and textbook routes.
- Additional `math1030` interactive units for span, basis, linear
  independence, and linear transformations once the source-backed scaffolding
  is ready.
- Additional `math1090` units after the early logic and set-theory spine.

## Blocked or partial

These items are currently limited by source availability or local tooling.

- `MISSING_SOURCE`: `math1090` content beyond the current local boundary after
  `§4.7` remains unsupported by the audited references.
- `MISSING_SOURCE`: later `math1030` topics must stay conservative until the
  local notes and exercises are mapped more tightly to each subsection.
- Full automated verification remains partial because the WSL `node.exe`
  bridge is slow and inconsistent for long-running `contentlayer`, `tsc`,
  `eslint`, and `next build` runs in this workspace.

## Review gate

Use this review gate before you mark a textbook milestone complete.

1. Confirm the target route resolves under `en`, `zh-hk`, and `zh-cn`.
2. Confirm the course sidebar, breadcrumbs, and page table of contents
   localize correctly.
3. Confirm the page content exists in all three written languages or is marked
   `MISSING_SOURCE`.
4. Confirm the interactive widget has a readable static export snapshot.
5. Confirm TXT and PDF export only the current unit.
6. Confirm the terminology matches `docs/terminology-glossary.md`.
7. Confirm the page cites the local `reference/` sources in its unit metadata.

## Next steps

Finish the textbook QA pass, tighten the zh-HK terminology review, and expand
the next source-backed `math1030` units before authoring later unsupported
chapters.
