# Next Work Preparation: Registration, Reader-Facing Copy, CSCI2520, And Animation

Date: 2026-05-25

Status: preparation document. This is an internal planning and handoff file, not public website copy.

## Purpose

This document records the next work direction before implementation begins. The goal is to keep the public site reader-facing while preparing a focused implementation pass on registration/authentication, public copy hygiene, CSCI2520 naming/content quality, and code-generated explanatory animations.

The immediate user feedback is:

- Make the registration-related website experience complete and reliable.
- Remove or rewrite public text that reads like internal agent notes, implementation commentary, source-processing notes, or authoring instructions.
- Treat all visible public text as text written for readers.
- Correct Simplified Chinese CSCI2520 terminology: the course is Data Structures, so the visible Simplified Chinese name should be `数据结构`, not `资料结构`.
- CSCI2520 is clearly still incomplete and should be treated as an active content backlog.
- CSCI2520 is especially well suited for embedded interaction because many topics are algorithmic, trace-based, and state-changing.
- Research code-generated explanatory math animations as a major next discussion/workstream.

## Current Repository Signals

The repository already contains several relevant surfaces.

- Authentication and registration are documented in `docs/backend-auth.md`.
- The production/preview route boundary is documented in `docs/production-preview-surface.md`.
- Existing auth code includes `src/lib/auth.ts`, `src/lib/password-auth.ts`, `src/app/api/auth/register/route.ts`, `/login`, `/settings`, user profile APIs, and membership/billing APIs.
- Production currently keeps `/login` and `/api/auth/**`, but hides public registration, account settings, diary, and membership billing pages until they are deliberately production-ready.
- Public Notes content lives under `content/textbook/**` and `src/app/[locale]/notes/**`.
- CSCI2520 public content exists under `content/textbook/csci2520/**`, but it is a baseline rather than complete course coverage.
- CSCI2520 source material exists in `reference/CSCI2520/**`, with extracted text in `docs/extracted/csci2520/**`.
- Existing tracking already records that CSCI2520 needs more algorithm depth, checkpoint expansion, and embedded interaction.
- Current visible Simplified Chinese CSCI2520 wording still contains `资料结构` in some files, including course metadata and public prose. That should be corrected to `数据结构`. Traditional Chinese should remain `資料結構`.

## Non-Negotiable Public-Copy Rule

Public pages must be written for readers, not for Codex, maintainers, or internal process tracking.

Do not expose these on normal reader pages:

- source-processing notes
- authoring workflow notes
- internal QA status
- implementation explanations
- phrases like `source-backed` when they read as internal provenance labels
- agent/planning language
- references to what the model or maintainer did
- repeated source-trail blocks

Allowed public-facing exceptions:

- A lightweight missing-material notice when a page is genuinely incomplete because the relevant source material is missing or insufficient.
- A reader-friendly explanation of what content is still being expanded, only where it helps set expectations.
- Normal citations or references if they are useful to the reader and formatted as part of the learning content rather than an internal audit trail.

Internal progress belongs in `docs/`, not in public Notes pages.

## Workstream A: Registration And Account Entry

The next implementation pass should audit the full registration/account path before changing production exposure.

Primary files and routes to inspect:

- `src/app/login/**`
- `src/components/glass/GlassSidebar.tsx`
- `src/lib/site-i18n.ts`
- `src/lib/auth.ts`
- `src/lib/password-auth.ts`
- `src/app/api/auth/register/route.ts`
- `src/app/api/user/profile/route.ts`
- `src/app/api/user/accounts/route.ts`
- `src/lib/site-surface.ts`
- `docs/backend-auth.md`
- `docs/production-preview-surface.md`

Required product behavior:

- The header/sidebar entry points should make login and registration understandable in English, Traditional Chinese, and Simplified Chinese.
- Registration should not appear publicly if the environment disables registration.
- If registration is visible, the route must handle validation, duplicate email, administrator-reserved email, password requirements, loading state, and server errors without exposing internal details.
- OAuth and password-account paths should be visually coherent rather than feeling bolted together.
- Post-registration and post-login redirects must return the reader to the relevant page when a `callbackUrl` is present.
- Account settings should remain private, but the reader-facing wording should be polished if that surface is exposed in preview or production.
- Production exposure is a separate decision: the implementation pass should verify readiness before removing any production guard.

Security and data expectations:

- Firestore should remain the durable source of truth when configured.
- Password registration should keep transactional uniqueness guarantees.
- OAuth email verification and account-linking behavior must remain conservative.
- API errors should use stable error codes and user-readable localized messages.
- No secrets, admin hashes, provider secrets, or Stripe details should be surfaced to the client.
- Export and premium-feature access checks must still respect membership entitlements after registration changes.

Verification checklist:

- Local preview route smoke for `/login`, `/login?mode=register`, and protected callback redirects.
- API smoke for `POST /api/auth/register` covering invalid input, duplicate email, and disabled registration.
- Auth provider visibility with `NEXT_PUBLIC_AUTH_PROVIDERS`.
- `AUTH_REGISTRATION_ENABLED=false` and `NEXT_PUBLIC_AUTH_REGISTRATION_ENABLED=false` behavior.
- Localized labels in `en`, `zh-hk`, and `zh-cn`.
- Production-surface check confirming hidden routes remain hidden until intentionally opened.

## Workstream B: Reader-Facing Copy Cleanup

The next pass should run a targeted public-copy audit, not a blind global replacement.

Search targets:

- `source-backed`
- `source trail`
- `reference`
- `MISSING_SOURCE`
- `authoring`
- `workflow`
- `QA`
- `implementation`
- `internal`
- `Codex`
- `agent`
- `資料結構`
- `资料结构`

Important caution: words like `reference`, `source`, and `membership` can be legitimate mathematical or product words. Each occurrence must be reviewed in context.

Required outcome:

- Public pages read like serious notes for learners.
- Missing-source notices are rare, secondary, and reader-friendly.
- Internal progress information remains in `docs/`.
- TXT and PDF exports do not leak internal authoring notes.
- The cleanup preserves mathematical precision and does not flatten the notes into vague marketing copy.

## Workstream C: CSCI2520 Naming, Completeness, And Interactivity

### Course Name

Use this terminology:

- English: `Data Structures`
- Traditional Chinese: `資料結構`
- Simplified Chinese: `数据结构`

Do not use `资料结构` in Simplified Chinese public UI or Notes prose for this course. The route/course id should remain `csci2520`; this is a visible-language correction, not a content-tree rename.

### Completeness

CSCI2520 must be treated as incomplete until a new source-backed audit says otherwise.

Next audit inputs:

- `reference/CSCI2520/**`
- `docs/extracted/csci2520/**`
- `content/textbook/csci2520/**`
- `src/lib/textbook/catalog.ts`
- `src/lib/textbook/problem-bank.ts`
- `docs/reference-coverage.md`
- `docs/chapter-coverage-map.md`
- `docs/exercise-solution-integrity.md`
- `docs/interactive-component-behavior.md`

Likely missing or thin areas:

- C pointer and memory traces as they relate to node structures.
- ADT contracts and implementation boundaries.
- Stack and queue operation traces.
- Hash-table collision strategies and probing traces.
- Linked-list insertion, deletion, reversal, and recursion.
- Asymptotic growth and recurrence-style reasoning.
- Sorting and selection traces.
- Binary tree traversals, reconstruction, BST insert/delete, and AVL rotations.
- Graph traversal, BFS/DFS state, MST, shortest paths, and topological order.
- Heap operations and priority queues.
- Huffman coding.
- Exam-style code-output and complexity-analysis practice.

### Interaction Opportunities

CSCI2520 is a strong candidate for embedded interaction because algorithms naturally expose state.

High-value widgets should be article-embedded and exportable as static study sequences:

- pointer and struct memory tracer
- stack/queue operation stepper
- open-addressing hash-table probe tracer
- linked-list pointer update visualizer
- recursion call-stack trace
- sorting trace with comparisons and swaps
- quickselect partition trace
- tree traversal highlighter
- BST insert/delete trace
- AVL rotation demonstrator
- BFS/DFS queue/stack frontier trace
- Dijkstra or MST state table trace
- topological-sort indegree queue trace
- heap push/pop trace
- Huffman tree construction trace

The public page should still be a serious note page. The widget should clarify a nearby definition, theorem, worked example, or exercise; it should not become a detached algorithm playground.

## Workstream D: Manim-Based Explanatory Animation Research

This workstream should be discussed and scoped before implementation. The likely goal is to create reusable explanatory video or GIF assets for mathematical and algorithmic ideas, while keeping live note pages article-first.

The project to treat as the main line is Manim, specifically Manim Community Edition. A deeper research note now lives in `docs/manim-animation-integration-research.md`.

### Manim

Official project: [Manim Community](https://www.manim.community/)

Manim is the strongest candidate for code-generated mathematical explainer animations. It is Python-based, designed for precise mathematical animation, and has strong support for formulas and diagrammatic transformations. It is well aligned with the style of explanatory videos associated with 3Blue1Brown-style mathematics communication.

Practical platform notes:

- Source is Python scene code.
- It renders videos from named scene classes.
- It can use TeX/LaTeX for mathematical formulas.
- It typically depends on a local media/rendering stack such as FFmpeg and a TeX installation for formula-heavy scenes.
- Generated outputs can be committed as small static assets only when size is acceptable, or stored externally if they become large.
- TXT/PDF export should degrade to storyboard frames, captions, and a transcript rather than embedding video behavior.

Potential repo shape:

```text
tools/animations/manim/
  scenes/
  scripts/
  README.md
public/generated/animations/
```

Example local command shape to evaluate during a pilot:

```bash
manim -qm tools/animations/manim/scenes/example.py ExampleScene --media_dir public/generated/animations
```

### Manim Ecosystem To Track

The useful surrounding projects are mostly Manim extensions, not replacements:

- Manim Slides for turning Manim scenes into presentation-like slide sequences.
- Manim Voiceover for narration timing and future multilingual voice/caption workflows.
- Manim Editor for post-processing and presentation-oriented use.
- Manim plugins for domain-specific extensions such as code highlighting, automata, physics, and scientific visuals.
- LLM2Manim and Manimator-style research for human-reviewed AI-assisted Manim scene drafting.

### Initial Recommendation

Use a small Manim pilot before committing to a full animation pipeline.

Recommended first pilot:

1. Create one Manim scene for a Math1030 or Math1090 concept where formula transformation matters.
2. Create one CSCI2520 web-native interactive trace using the existing React component pattern.
3. Compare output quality, build friction, asset size, localization effort, and export behavior.

Prefer Manim for polished explanatory mathematical video assets. Prefer React/TypeScript embedded widgets for reader-controlled CSCI2520 algorithm traces. Treat AI-based Manim generators as drafting aids only; the durable artifact should be reviewed Manim source code plus rendered output.

Open decisions:

- Should generated animation assets be committed to the repository or hosted separately?
- Should animations be localized by captions/transcripts, by separate rendered videos, or by language-neutral visuals plus localized page text?
- What maximum asset size is acceptable for `public/`?
- Should animation source code be part of the normal build/test pipeline?
- Should videos be optional enhancements with static diagram fallbacks for exports and low-bandwidth readers?

## Workstream E: Internal Tracking Updates

Future implementation should update the internal docs that match the actual work completed.

Likely docs:

- `docs/notes-improvement-tracker.md`
- `docs/reference-coverage.md`
- `docs/chapter-coverage-map.md`
- `docs/interactive-component-behavior.md`
- `docs/exercise-solution-integrity.md`
- `docs/rendering-formatting-qa.md`
- `docs/localization-strategy.md`
- `docs/terminology-glossary.md`
- `docs/production-preview-surface.md`
- `docs/backend-auth.md`

Do not create public-facing status sections just to show that implementation work happened.

## Suggested Implementation Order

1. Audit auth/registration routes and current production guards.
2. Fix visible registration/login copy and flow issues in preview first.
3. Decide whether public registration should remain hidden in production or be opened.
4. Run the public-copy leakage audit across `content/textbook/**`, note components, and export routes.
5. Correct Simplified Chinese CSCI2520 `资料结构` to `数据结构`.
6. Audit CSCI2520 source coverage and current note depth.
7. Add one narrow CSCI2520 interactive trace where source support is strongest.
8. Research and run a small Manim animation pilot outside public pages.
9. Verify route rendering, export output, i18n labels, dark/light theme, and auth boundary behavior.
10. Update internal docs with evidence and remaining backlog.

## Completion Criteria For The Next Round

The next implementation round should not be reported as complete unless:

- Registration/account entry behavior has been audited and either fixed or clearly blocked.
- Production exposure for registration is explicitly decided or intentionally deferred.
- Public reader pages no longer contain obvious internal agent/process copy in touched areas.
- CSCI2520 Simplified Chinese visible naming uses `数据结构`.
- CSCI2520 incompleteness is recorded as active backlog, not hidden by optimistic wording.
- At least one concrete CSCI2520 interaction candidate is specified with export behavior.
- Animation tooling research is translated into a small pilot plan, not only a list of tools.
- Internal docs are updated; public pages remain reader-focused.
