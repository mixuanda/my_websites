# Math Notes Authoring Memory

This project-level memory records durable expectations for future Math1090 and
Math1030 authoring work. It does not replace `reference/`; source-backed
coverage still has priority over preference notes.

## Durable standard

- Keep the public product inside Notes, with each unit reading as a serious
  course note rather than a detached learning app.
- Every authored unit should move toward textbook-style depth: motivation,
  precise definitions, theorem statements where appropriate, worked examples,
  subtle points, exercises, and guided solutions.
- Interactivity is useful only when it clarifies a mathematical idea. Embed it
  as a supporting figure or guided step inside the article flow.
- Add visual support where it helps the concept. A generated or illustrated
  figure is appropriate for geometric, matrix, row-operation, span, basis,
  eigenvalue, and inner-product ideas, but decorative images should be avoided.
- Every MATH1030 unit should have checkpoint practice where possible. Prefer a
  WebWork-like mix of multiple-choice, true/false-as-choice, and fill-in
  questions backed by lecture notes, tutorials, assignments, or practice sets.
- Math text in prompts, answer choices, hints, and solutions should render as
  mathematics, not as raw backtick strings.
- Page-level tables of contents should stay useful: show major article
  headings, not every definition, theorem, example, proof, or exercise title.
- Public pages should stay clean. Source tracing, weak-source notes, and
  authoring progress belong in `docs/`, except for lightweight missing-source
  notices when content is genuinely unsupported.

## Default unit shape

For substantial course notes, especially MATH1030 linear algebra units, use a
natural course-like arc:

1. a short introduction that tells the reader what problem the unit solves;
2. a "Before you start" section listing prerequisite habits and older skills;
3. the main textbook-style development, with definitions and examples placed
   where the notation is first needed;
4. a problem-solving routine that shows how a beginner should approach common
   question types;
5. diagrams or generated-style figures where they clarify structure, not as
   decoration;
6. an embedded interaction only when it supports a real conceptual move;
7. quick checks, checkpoint questions, and guided solutions that match the
   article's examples.

The result should feel like a complete section note that a student can read
before class, during review, and while practising problems.

## Current MATH1030 checkpoint direction

As of 2026-04-25, the immediate MATH1030 exercise target is that every public
unit has at least one checkpoint problem, with thin units getting priority for
new exercises and explanatory text. Later passes should increase from one
problem per unit toward fuller exercise sets per chapter.
