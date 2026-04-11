# AGENTS.md

## Project goal
Build a deeply beginner-friendly, interactive web-based mathematics book from the local `reference/` folder.
The website must cover two courses: `math1090` and `math1030`.

## Non-negotiable goals
- The site is not a blog and not a notes dump.
- The site must feel like an interactive textbook for first-time learners.
- Content must be split into many small, readable sections and routes.
- Never generate one giant page for a whole chapter.
- Every section should be easy to read, well-structured, and visually navigable.

## Source policy
- Treat `reference/` as the primary source of truth.
- Audit `reference/` before writing substantial content.
- Create `docs/source-audit.md` listing:
  - available materials
  - missing materials
  - duplicate or conflicting materials
  - weak or incomplete source coverage
- If a topic lacks source support, mark it clearly as `MISSING_SOURCE` and do not invent authoritative course-specific claims.

## Pedagogy policy
- Assume the reader has never seen the topic before.
- Prefer intuition first, then formal definition, then examples, then exercises.
- Explain symbols, notation, and hidden assumptions.
- Surface common mistakes and misconceptions.
- Use short paragraphs, clear headings, and progressive disclosure.
- Add prerequisite links whenever a section depends on earlier material.

## Website requirements
- Implement a course sidebar and page-level table of contents.
- Support chapter / section / microsection navigation.
- Support collapsible proofs, worked examples, quick checks, and revealable solutions.
- Include glossary / notation support.
- Include progress tracking via local state or localStorage.
- Make the site responsive and comfortable to read.

## Structure requirements
- Separate content for `math1090` and `math1030`.
- Keep source audit, IA planning, content authoring, UI engineering, and QA as distinct workstreams.
- Prefer route-based content organization.
- Keep traceability between written content and source materials.

## Multi-agent workflow
- Use separate agents or workstreams for:
  - source audit
  - information architecture
  - student-skeptic review
  - math1090 authoring
  - math1030 authoring
  - exercise building
  - UI / navigation
  - QA / verification
- Do not let multiple agents edit the same core files unless necessary.
- Prefer isolated branches / worktrees for parallel efforts.

## Writing standards
- Be precise but beginner-friendly.
- Avoid unexplained jargon.
- Avoid overly compressed proofs.
- Prefer explicit logical transitions.
- Use examples generously.
- When adapting from source materials, transform them into teachable explanations rather than copying lecture-note phrasing.

## Delivery expectations
- Produce working code, not just plans.
- Keep documentation updated in `docs/`.
- Maintain `docs/roadmap.md` with completed, active, and blocked items.
- Always finish a work cycle with:
  - what changed
  - what remains
  - what is blocked by missing references
  - what should be reviewed next

## Verification
Before considering a milestone complete:
- run build
- run lint if available
- run typecheck if available
- verify route structure
- verify internal navigation
- verify math rendering
- verify source coverage notes

## Existing design preservation
- The project already has an existing website style and partial UI design.
- Preserve the current visual language, layout system, interaction patterns, and overall reading experience unless there is a strong reason to refactor.
- Do not casually replace the current design direction.
- Before implementing major UI changes, inspect the existing components, route structure, style tokens, and layout conventions, then extend them consistently.

## Current project phase
- The current priority is no longer initial site ideation.
- The current priority is to continue building the learning content and interactive educational experience for:
  - `math1090`
  - `math1030`
- Focus on course content, interactivity, readability, and multilingual delivery.

## Bilingual trilingual requirement
- The website must treat “biliterate and trilingual” support as a core requirement.
- For written language support, the site must support:
  - English
  - Traditional Chinese
  - Simplified Chinese
- The UI must provide a clear language switcher.
- The language switcher must work at both interface level and content level wherever possible.

## Interpretation policy for biliterate and trilingual support
- Since this is a web-based textbook, implement written language switching first:
  - EN
  - zh-HK / Traditional Chinese
  - zh-CN / Simplified Chinese
- Also design the content system so it can support spoken-language-oriented features later:
  - Cantonese
  - Putonghua
  - English
- Spoken-language support may appear through:
  - glossary pronunciation notes,
  - audio-ready metadata,
  - read-aloud hooks,
  - optional narration scripts,
  - terminology mapping for Cantonese / Putonghua / English.

## Localization requirements
- Do not treat localization as a literal machine translation layer only.
- Preserve mathematical meaning, pedagogy, terminology consistency, and beginner readability across all supported written variants.
- Keep math notation identical across languages unless a notation note is necessary.
- Maintain a terminology map for:
  - English term
  - Traditional Chinese term
  - Simplified Chinese term
  - optional Cantonese phrasing note
  - optional Putonghua phrasing note
- Avoid inconsistent translation of core mathematical terms across pages.

## Content architecture
- Structure content so each section can have parallel localized versions.
- Prefer a content model that supports:
  - shared mathematical structure,
  - localized exposition text,
  - localized examples and notes,
  - shared exercises when possible,
  - localized hints and explanations where necessary.
- Keep the route structure coherent and avoid duplication chaos.

## Interaction requirements
- Every important section should remain easy for first-time learners.
- Use reusable interactive blocks that support localization:
  - definitions
  - theorem cards
  - worked examples
  - collapsible proofs
  - quick checks
  - revealable solutions
  - common mistakes
  - prerequisite links
  - glossary popovers

## Translation quality policy
- Do not produce awkward or overly literal Chinese that sounds machine-generated.
- Do not produce overly compressed English that loses pedagogical clarity.
- Prefer Hong Kong–friendly Traditional Chinese for zh-HK content.
- Preserve beginner-friendliness in every language variant.
- When exact equivalent terms differ by region, record the decision in the terminology guide.

## Required docs
- Maintain:
  - `docs/localization-strategy.md`
  - `docs/terminology-glossary.md`
  - `docs/content-parity-checklist.md`
- These docs should record:
  - language architecture
  - terminology decisions
  - missing localized sections
  - content parity gaps between languages

## Verification for multilingual delivery
- Check that the language switcher works.
- Check that each completed section exists in the intended language variants.
- Check that terminology stays consistent across English, Traditional Chinese, and Simplified Chinese.
- Check that math rendering is stable in every language view.
- Check that navigation, sidebar labels, and page TOC localize correctly.

- English is the drafting source language for prompts and agent instructions.
- However, the final website content must not be English-only.
- Every production-ready section must be designed with multilingual parity in mind.
- No section should be considered complete if it breaks the language-switching experience.


## Core product principle
- The website must be interactive-first.
- Interactivity is a core learning mechanism, not a decorative extra.
- The goal is to help first-time learners understand concepts through active exploration, especially in `math1030`.

## Interactive learning requirement
- Build the site as an interactive educational website.
- Each important topic should include interactive learning elements whenever pedagogically useful.
- Especially for `math1030`, prioritize interactive demonstrations for:
  - matrix operations
  - row operations
  - Gaussian elimination
  - systems of linear equations
  - span / basis / linear independence
  - linear transformations
  - geometric intuition where applicable

## Export requirement
- Users must be able to export the current learning unit, such as a section or subsection (for example `1.3` or `1.4`), as:
  - TXT
  - PDF
- Exported files are static study materials derived from the current interactive page.
- The exported file does not need to preserve interactivity.

## Static degradation policy for exports
- Interactive elements must degrade gracefully into static study content during export.
- When exporting:
  - preserve explanatory text
  - preserve formulas
  - preserve examples
  - preserve exercises
  - preserve solutions where applicable
  - convert interactive widgets into simple static representations
- Static representations may include:
  - fixed example states
  - step-by-step snapshots
  - simplified diagrams
  - textual descriptions of what the interaction demonstrates
  - representative outputs

## Authoring policy
- Do not design the website as a plain static notes viewer.
- Do not remove meaningful interactivity merely to simplify export.
- Instead, keep the website interactive and make export a clean static learning snapshot.

## UX requirement
- Add clear export controls on each relevant section/subsection page.
- The user should be able to export the currently viewed unit directly, without unnecessary steps.

## Verification
- Check that the website remains interactive-first.
- Check that exported TXT and PDF files correspond to the current section/subsection.
- Check that interactive modules degrade cleanly into static readable content in exports.
- Check that `math1030` includes genuinely useful interactive learning experiences rather than superficial UI motion.