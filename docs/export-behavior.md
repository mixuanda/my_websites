# Export behavior

This project exports one learning unit at a time. A unit is the current
route-level note, such as `1.3` or `2.4`. Export exists to create clean study
copies, not whole-course dumps.

## Current export flow

The live note stays interactive. The export output is static.

- The note page exposes a localized **Export this note** control.
- TXT export is served from
  `/api/textbook-export/[locale]/[course]/[chapter]/[unit]`.
- PDF export is served from
  `/api/textbook-export/[locale]/[course]/[chapter]/[unit]/pdf`.
- The export locale always matches the current page locale.
- Export stays at the current note level even after the public Notes refactor.
  Embedded widgets still export from the current route only.

## What export keeps

Export preserves the study value of the current note.

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

The implementation builds a neutral export block list from the note MDX source,
then serializes that structure to TXT or PDF.

- `src/lib/textbook/export.ts` builds the export block list and TXT output.
- `src/lib/textbook/export-pdf.tsx` renders the same block list to PDF.
- `InteractiveWidget` blocks convert to localized static snapshots through
  `src/lib/textbook/interactive-snapshots.ts`.
- Source refs stay in TXT and PDF output even though the public note page no
  longer foregrounds raw source lists.
- The lead-in prose that introduces `math1030` widgets remains in the export
  before the snapshot, so the static study file keeps the same teaching
  transition as the live page.
- The Math1025 `2.1`, `3.1`, and `4.1` additions use static MDX note blocks
  only, so TXT and PDF exports should preserve their definitions, theorem
  statements, worked examples, quick checks, reveal solutions, exercises, and
  guided solution sections without interactive fallback rules.
- Representative local checks after the Math1025 expansion returned TXT export
  content for `en/math1025/binomial-theorem/binomial-coefficients-and-expansions`
  and a 200 `application/pdf` response for
  `zh-cn/math1025/proof-and-inequalities/mathematical-induction/pdf`.

## Current blockers

The export code exists, but the final automated verification is still partial.

- The WSL `node.exe` bridge is slow for long-running build and lint commands.
- TXT and PDF still need a manual route-by-route QA pass on all localized
  notes.

## Next steps

Finish the export QA pass, check a sample TXT and PDF for every current note,
and only then expand the export model to later source-backed chapters.
