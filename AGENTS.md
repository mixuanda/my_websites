# AGENTS.md

## Mission

Continue this existing website repository in place.

Build a serious, detailed, rigorous mathematics notes system inside the existing website.

Current course focus:
- Math1090
- Math1030

Future course support must be prepared for:
- Math1025
- Math1010

Do not restart the project.
Do not casually redesign the whole site.
Do not turn the site into a playful, gamified, overly simplified learning product.

The desired direction is:
- textbook-first
- rigor-first
- completeness-first
- article-style note pages
- interactivity only when it genuinely improves understanding

---

## Repository truth

- Work only from files that are present in this repository.
- Do not assume access to any unpublished local files, local folders, desktop files, or local-only references.
- The repository version is the only guaranteed environment.
- `reference/` is expected to exist in the repository and is the primary source of truth for course materials.
- If `reference/` is missing, empty, or incomplete, stop guessing and report that clearly.
- Do not invent course-specific claims that are not supported by the repository contents.
- Prefer repository evidence over stale assumptions.

---

## Public-facing product framing

- This mathematics area must live under the public-facing **Notes** section.
- Do NOT frame it publicly as a separate top-level **Textbook** product.
- Each chapter / section / subsection should behave like an individual note detail page.
- The public reading experience should feel like browsing serious, structured, high-quality notes inside a personal website.
- It must NOT feel like entering a detached course portal, standalone app, or isolated learning platform.

Public-facing terminology should prefer:
- Notes
- Note
- Course notes
- Section notes

Avoid strong public-facing framing such as:
- Textbook portal
- Interactive studio
- Learning app
- Detached course platform

---

## Writing standard

The content must read like serious textbook-style course notes.

Required writing qualities:
- detailed
- rigorous
- logically structured
- mathematically careful
- beginner-aware without being childish
- pedagogically clear
- not entertainment-driven

Do NOT:
- write like you are entertaining a child
- overuse playful filler
- over-compress the content into thin summaries
- replace serious explanation with slogans
- add interactivity merely to look dynamic

Do:
- explain notation carefully
- explain hidden assumptions
- explain why definitions are introduced
- explain transitions between ideas
- show reasoning steps
- preserve mathematical seriousness
- prefer explicit logic over vague intuition-only writing

For important sections, when appropriate, structure the note page like this:
- title
- short introduction
- motivation / intuition
- precise definitions
- formal statement / theorem / proposition
- explanation
- worked example(s)
- common mistakes / subtle points
- embedded interaction only where helpful
- quick check
- exercises
- answers / solutions or guided solution structure
- related notes / prerequisites

---

## Detail and completeness requirement

The current content must not stay brief or incomplete.

Hard rule:
- Expand the content substantially.
- Write in much more detail than a short summary.
- Build toward completeness for every topic supported by `reference/`.
- Do not stop after only early chapters if later chapters are already supported.
- Do not treat placeholders or short blurbs as sufficient completion.

Coverage means real authored instructional content, not merely:
- page titles
- empty routes
- placeholders
- tiny summaries
- copied headings without explanation

---

## Reference coverage rule

Treat `reference/` as the master content backlog.

You must continue authoring until the content represented inside `reference/` has been fully processed.

Interpret “fully processed” strictly:
- every relevant source item in `reference/` must be reviewed
- every teachable topic supported by those materials must be incorporated into the website notes
- overlapping source files should be merged intelligently instead of duplicated
- incomplete, conflicting, unreadable, or weak source files must be explicitly recorded internally
- unsupported sections must not be silently skipped

The work is NOT complete unless every relevant item in `reference/` is in one of these states:
- incorporated into the website content
- merged into other already-authored content because it overlapped
- marked internally as insufficient / incomplete / unreadable / conflicting
- intentionally deferred with a clearly documented reason

Do not stop early while `reference/` still contains unprocessed relevant material.

Maintain an internal document:
- `docs/reference-coverage.md`

This file should track, for each source item where possible:
- course
- chapter
- section
- material type
- current status
- whether incorporated
- whether overlapping
- whether blocked by weak material
- notes about next action

---

## Missing-reference public policy

Do NOT show full source-tracing blocks on normal public pages.

Public-facing rule:
- only show a lightweight notice when the current chapter / section lacks enough support in `reference/`
- do not show “reference”, “source trail”, or similar blocks on every page
- keep well-supported pages clean

When a lightweight notice is needed, it should:
- be visually secondary
- say that this part is currently incomplete because the relevant reference material is missing or insufficient
- not dominate the page
- not pretend unsupported content is complete

---

## Interaction policy

The website may include interaction, but interaction is secondary to the instructional writing.

Hard rules:
- the page must still read primarily like a serious textbook section or high-quality lecture-note article
- add interaction only when it genuinely improves conceptual understanding
- do NOT add interactivity merely for decoration
- do NOT let interactivity break the logical flow
- do NOT make the page feel like a detached app

If interaction is used:
- embed it naturally inside the article flow
- treat it like a supporting figure, demonstration, or guided step
- keep it visually integrated with the note page

Especially for Math1030, selective embedded interaction is useful for:
- systems of linear equations
- matrices
- augmented matrices
- row operations
- Gaussian elimination
- RREF
- matrix multiplication
- span
- basis
- linear independence
- linear transformations
- geometric intuition where appropriate

But even on Math1030 pages:
- the note must still feel rigorous and text-led first

---

## Notes architecture and future extensibility

Keep mathematics content under Notes.

The Notes system must be extensible so that future courses can be added cleanly, including:
- Math1025
- Math1010
- other future courses

Do not hardcode the architecture only for Math1090 and Math1030.

Design the following to be extensible:
- routing
- metadata
- note listings
- course groupings
- breadcrumbs
- side navigation
- note detail pages
- export actions
- language switching

Prepare the structure now.
Do not fabricate Math1025 or Math1010 content unless their source material is actually present in the repository.

---

## i18n requirement

The site must have a clear, visible, site-level language switcher.

Support these written language modes:
- English
- Traditional Chinese
- Simplified Chinese

This switcher must work as a real site-level control, not only as scattered local replacements.

Localize:
- header
- footer
- navigation
- breadcrumbs
- sidebar
- TOC labels
- export labels
- note metadata where applicable
- interactive UI text
- course labels
- section labels

Prefer Hong Kong–friendly Traditional Chinese for the Traditional Chinese version.

Do not implement i18n as a shallow, scattered text-swap hack.
Keep terminology consistent across languages.

Maintain internal docs:
- `docs/localization-strategy.md`
- `docs/terminology-glossary.md`
- `docs/content-parity-checklist.md`

---

## Theme requirement

The dark/light theme behavior must be correct and consistent.

Audit and fix:
- theme provider logic
- CSS variables / design tokens
- dark/light class toggling
- hardcoded component colors
- contrast-mode interactions

Fix the issue systemically, not with random patches.

Both light mode and dark mode must remain readable and coherent.

---

## Rendering and formatting requirement

Audit the site for:
- broken math rendering
- malformed MDX / markdown blocks
- broken layouts
- broken headings
- broken list formatting
- callout issues
- example / theorem / proof formatting inconsistencies
- spacing problems
- content block ordering issues

Fix all rendering and formatting problems carefully.

Formulas must render correctly.
The page structure must be consistent and reliable.

---

## Exercise / answer / solution integrity

Audit all:
- quick checks
- exercises
- answers
- solutions
- reveal blocks
- guided solution blocks

Fix local logic errors such as:
- missing answers
- answer appearing in the next block
- mismatched question / answer pairing
- incomplete solution sequences
- wrong reveal content
- incorrect ordering

Each prompt must match its answer or solution block.
No answer should drift into the wrong section.

Maintain an internal QA note if helpful:
- `docs/exercise-solution-integrity.md`

---

## Export requirement

Each learning unit, such as a section or subsection, should support export to:
- TXT
- PDF

Exports are static study materials.

Do not try to preserve interactivity in exported files.
Instead, interactive blocks must degrade into static study-friendly forms.

Preserve learning value during export.

Static conversion rules:
- sliders -> export default state plus 1–2 representative states with explanation
- steppers -> export all steps as a static sequence
- click-to-reveal -> export as expanded content or clearly labeled answer sections
- matrix manipulators -> export representative matrix states and outputs
- geometric visualizations -> export static diagrams plus captions
- quizzes -> export question, options, correct answer, and brief explanation
- input/output demos -> export sample input, sample output, and rule explanation

Exports must preserve where possible:
- titles
- headings
- formulas
- worked examples
- exercises
- answers / solutions
- explanatory text

---

## Public UI simplification

Keep public pages clean.

Do NOT clutter note pages with:
- source trail sections
- repeated reference boxes
- internal authoring metadata
- excessive implementation notes

The public page should focus on:
- content
- logic
- examples
- exercises
- necessary interaction
- clean navigation

Internal progress tracking belongs in `docs/`, not on public-facing pages.

---

## Recommended internal work documents

Maintain and update these as needed:
- `docs/reference-coverage.md`
- `docs/chapter-coverage-map.md`
- `docs/notes-content-supplement-workflow.md`
- `docs/missing-reference-policy.md`
- `docs/localization-strategy.md`
- `docs/terminology-glossary.md`
- `docs/content-parity-checklist.md`
- `docs/theme-notes.md`
- `docs/rendering-formatting-qa.md`
- `docs/exercise-solution-integrity.md`

These are internal maintenance documents.
Do not surface them prominently on public pages.

---

## Work loop

When starting work, do this in order:

1. Inspect the current repository structure.
2. Inspect the current Notes architecture.
3. Inspect current theme behavior.
4. Inspect existing i18n behavior and the language switcher.
5. Inspect export behavior.
6. Audit `reference/` thoroughly.
7. Build or update the reference coverage map.
8. Identify the highest-value architectural and content corrections.
9. Fix the highest-impact structural issues first.
10. Continue expanding detailed content.
11. Re-scan `reference/` after major passes.
12. Continue until all usable reference-backed material is processed.

Do not stop at planning only.
Do real implementation work.

---

## Notes content supplement workflow

For every future content supplement round, use a gap-first, multi-agent
workflow. This applies to mathematics notes and to other related Notes content.
Do not treat it as Math1090 / Math1030 only.

Required sequence:

1. Inspect the currently missing or thin content by checking authored notes,
   `reference/`, and the relevant internal coverage documents.
2. Choose the highest-value missing content slice that is actually supported by
   repository evidence.
3. Run parallel agent workstreams where the scope is large enough and write
   ownership is non-conflicting:
   - a content authoring agent expands the note text into serious,
     article-style prose;
   - a visual reference agent prepares GPT Image 2 prompts and generated
     pedagogical images when a figure materially improves understanding;
   - an interactive component agent adds or reuses embedded components only
     when they clarify the idea;
   - an exercise authoring agent adds WebWork-like practice, including
     multiple-choice and fill-in questions with correctness checks and proper
     math rendering where mathematical notation is involved;
   - a QA agent reviews content accuracy, rendering, exercise grading,
     answer-solution pairing, export behavior, i18n, and dark/light mode.
4. Integrate the work under the existing Notes architecture, keeping public
   pages article-first and avoiding detached app-like experiences.
5. Update the relevant internal tracking documents, especially
   `docs/reference-coverage.md`,
   `docs/notes-content-supplement-workflow.md`,
   `docs/exercise-solution-integrity.md`, and
   `docs/interactive-component-behavior.md`.
6. Before ending the round, commit the completed work, push it to the remote
   repository, and verify that the production deployment for
   `www.evanalysis.top` succeeds.

The QA pass must run after integration. It should record what was added, what
was verified, and what remains missing or intentionally deferred.

---

## Completion standard

Do NOT consider the work complete merely because a few chapters have been written.

The work is only complete when:
- all relevant materials in `reference/` have been audited
- all usable content has been authored into the Notes system
- overlapping materials have been merged intelligently
- unsupported or incomplete parts are explicitly documented internally
- public pages only show lightweight missing-reference notices where truly needed
- the writing is detailed, rigorous, and textbook-like
- interaction is embedded and pedagogically justified
- formatting and rendering are correct
- exercise / answer / solution logic is correct
- dark mode and light mode both work
- global language switching works
- exports work
- the Notes system is ready for future course addition

---

## Verification before declaring progress

Check all of the following:

- the public-facing math area lives under Notes
- pages feel like serious course notes, not playful mini-lessons
- the writing is substantially more detailed
- coverage is not artificially limited to only early chapters
- all reference-supported chapters / sections are represented
- unsupported areas are handled with lightweight missing-reference notices only where needed
- interactivity is secondary, embedded, and pedagogically justified
- math rendering works
- layout and formatting are correct
- exercise / answer / solution logic is correct
- no answer is misplaced into the wrong block
- dark mode and light mode both render correctly
- the global language switcher works
- English / Traditional Chinese / Simplified Chinese are coherent
- exports to TXT and PDF still work
- future-course extensibility remains intact
