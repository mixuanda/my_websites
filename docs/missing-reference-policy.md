# Missing-reference policy

This policy keeps the public notes clean while still being honest about gaps in
the local source set. The reader should only see a warning when a specific note
is genuinely incomplete because the repository does not yet contain enough
reference support.

## Public behavior

The public site now follows these rules.

- Do not show source-trace or coverage labels on normal source-backed notes.
- Do not show a generic reference block on every note page.
- Show a lightweight notice only when the current unit is marked
  `MISSING_SOURCE`.
- Keep the notice secondary to the note content.
- Explain that the current note remains incomplete because the relevant
  reference materials in the repository are still missing or too thin.

## Collection-page behavior

Collection pages must also stay quiet by default.

- Do not label every unit as source-backed.
- Only show a coverage badge for units that are marked `MISSING_SOURCE`.
- Keep raw `sourceRefs` internal.

## Authoring rules

Use the following rules before you set a unit to `SOURCE_BACKED`.

1. Confirm the main concept appears directly in a local reference.
2. Confirm the unit has enough material for intuition, formal statements,
   explanations, and worked examples.
3. Confirm at least one supporting exercise, worksheet, tutorial, or review
   packet exists when the topic needs practice-driven exposition.
4. If the support is thin, keep the route visible only if that helps navigation,
   but mark the unit `MISSING_SOURCE`.

## Current implementation note

The public UI now treats `coverageStatus` as an exception flag.

- `SOURCE_BACKED` stays silent in the reader UI.
- `MISSING_SOURCE` shows a short badge and an inline note-level warning.
- TXT and PDF export still carry the coverage state internally for QA and
  study-material metadata.
