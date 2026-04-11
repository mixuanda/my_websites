# Export behavior

The textbook now exports one learning unit at a time. A unit is the current
route-level page, such as `1.3` or `2.4`. The export flow is built for study
copies, not for whole-course dumps.

## Current export flow

The live page stays interactive. The export output is static.

- The unit page exposes a localized **Export study copy** control.
- TXT export is served from
  `/api/textbook-export/[locale]/[course]/[chapter]/[unit]`.
- PDF export is served from
  `/api/textbook-export/[locale]/[course]/[chapter]/[unit]/pdf`.
- The export locale always matches the current page locale.
- The correction pass keeps export at the current unit level even after the
  article-flow refactor. Embedded widgets are still exported from the current
  route only.

## What export keeps

Export preserves the study value of the current unit.

- unit title and description
- section headings
- explanatory text
- formulas and math notation
- definitions and theorem statements
- worked examples
- quick checks and solutions
- prerequisite references
- glossary notes
- source references

## Static fallback rules

Interactive elements do not stay interactive after export. They degrade into
static snapshots that still teach the idea.

| Live block | Static export form |
| --- | --- |
| Step-by-step reveal | Ordered written steps |
| Guided exploration | Curated representative checkpoints |
| Manipulable matrix example | Sample states plus input and output pairs |
| Dynamic explanation | Caption-style summary or diagram note |
| Quick check | Prompt plus revealed answer content |
| Revealable solution | Visible solution text |

## Current implementation notes

The current implementation builds a neutral export block list from the unit
MDX source, then serializes that structure to TXT or PDF.

- `src/lib/textbook/export.ts` builds the export block list and TXT output.
- `src/lib/textbook/export-pdf.tsx` renders the same block list to PDF.
- `InteractiveWidget` blocks convert to localized static snapshots through
  `src/lib/textbook/interactive-snapshots.ts`.
- The inline lead-in prose that now introduces `math1030` widgets remains in
  the export before the snapshot, so the static study file keeps the same
  teaching transition as the live page.

## Current blockers

The export code exists, but the final automated verification is still partial.

- The WSL `node.exe` bridge is slow for long-running build and lint commands.
- TXT and PDF still need a manual route-by-route QA pass on all localized
  milestone units.

## Next steps

Finish the export QA pass, check a sample TXT and PDF for every current unit,
and only then expand the export model to later textbook chapters.
