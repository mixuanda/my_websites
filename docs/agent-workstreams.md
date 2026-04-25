# Agent workstreams

This project uses separate workstreams so the Notes system can keep moving
without constant merge conflicts in the same core files. The supervisor agent
keeps the route model, export flow, and localization architecture coherent
across these workstreams.

## Current responsibilities

Use the following ownership boundaries unless the supervisor explicitly changes
them.

- **Supervisor / coordinator agent** owns shared architecture, shared route
  files, shared note-shell UI, and final integration.
- **Source audit agent** owns `reference/**` review and
  `docs/source-audit.md`.
- **Localization agent** owns `src/lib/textbook/i18n.ts`,
  `src/lib/textbook/glossary.ts`, `docs/localization-strategy.md`,
  `docs/terminology-glossary.md`, and `docs/content-parity-checklist.md`.
- **Math1090 content agent** owns `content/textbook/math1090/**`.
- **Math1030 content agent** owns `content/textbook/math1030/**`.
- **General Notes content agent** owns non-math note expansion when a future
  content supplement round targets adjacent Notes content.
- **Visual reference agent** owns GPT Image 2 prompts, generated instructional
  figure assets, figure captions, and export-friendly static descriptions.
- **Interactive learning agent** owns `src/components/textbook/mdx-*.tsx` and
  `src/components/textbook/interactives.tsx`.
- **Exercise authoring agent** owns new WebWork-like question design,
  fill-in answer expectations, multiple-choice distractors, and problem-bank
  entries that require correctness checks.
- **Export / static conversion agent** owns
  `src/app/api/textbook-export/**`, `src/lib/textbook/export.ts`, and
  `src/lib/textbook/export-pdf.tsx`.
- **QA / consistency agent** owns verification notes, parity checks, and route
  audits after implementation lands.

## Shared files

Some files remain shared and need supervisor coordination before parallel
editing.

- `src/lib/textbook/catalog.ts`
- `src/lib/textbook/types.ts`
- `src/app/[locale]/notes/**`
- `src/app/[locale]/courses/**`
- `src/components/textbook/TextbookCourseSidebar.tsx`

If you need to change one of these files from a side workstream, isolate the
change narrowly and avoid touching unrelated behavior.

## Current status

The current milestone used separate content workstreams for `math1090` and
`math1030`, then merged them into the shared note shell and export layer. That
split remains the default workflow for future units.

## Next steps

Keep future unit authoring isolated by course or Notes topic, keep visual
generation and interactive implementation in their own streams, keep
exercise-grading changes coordinated with the existing problem-bank
architecture, keep later export work inside the export workstream, and let the
supervisor handle shared route or catalog changes. At the end of each completed
round, commit, push, and verify the `www.evanalysis.top` production deployment.
