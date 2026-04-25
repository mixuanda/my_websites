# Notes Content Supplement Workflow

This document records the default operating procedure for future Notes content
supplement rounds. It applies to mathematics notes and to other related Notes
content in this repository.

## Purpose

Every content supplement round should start from a real gap in the repository
and end with authored notes, supporting visuals or interactions where useful,
gradable practice when appropriate, QA, updated tracking records, a pushed
commit, and a verified production deployment.

Do not add content just because a topic sounds plausible. The chosen unit must
be supported by `reference/`, existing authored notes, or an explicit internal
coverage decision.

## Required round sequence

1. Inspect missing content.
   - Review current authored notes under `content/textbook/**` and any other
     Notes content paths involved in the task.
   - Review the relevant `reference/**` material.
   - Check `docs/reference-coverage.md`,
     `docs/chapter-coverage-map.md`, and any topic-specific QA notes.
   - Identify thin, missing, weakly supported, overlapping, or deferred units.

2. Choose one supported target.
   - Prefer the highest-value gap in the current Notes scope.
   - Do not fabricate course or topic content unless repository material
     exists.
   - Record why this target was selected.

3. Run parallel workstreams when the task is large enough.
   - Content authoring: expands the article text with motivation,
     definitions, statements, examples, common mistakes, exercises, and
     guided solutions where suitable.
   - Visual reference: prepares GPT Image 2 prompts and generates clear
     pedagogical images only when a figure helps understanding.
   - Interaction: adds or reuses embedded interactive components that support
     the local explanation without turning the page into a separate app.
   - Exercise authoring: adds WebWork-like practice, including
     multiple-choice and fill-in problems with correctness checks, attempts,
     feedback, and robust math rendering when mathematical notation is used.
   - QA: reviews the integrated result after the other streams land.

4. Integrate the result.
   - Keep the public page under Notes.
   - Keep the article text primary.
   - Place visuals and interactions near the explanation they support.
   - Ensure TXT and PDF exports degrade interactive content into static
     study-friendly explanations.
   - Keep EN, zh-HK, and zh-CN content and UI terminology coherent when the
     route is localized.

5. Verify.
   - Check math rendering, MDX structure, headings, callouts, spacing, and
     responsive layout.
   - Check dark mode and light mode readability.
   - Check language switching for public labels and exercise UI.
   - Check all quick checks, exercises, answers, reveal blocks, and guided
     solutions line up correctly.
   - Check fill-in answers are parsed and graded correctly, especially
     mathematical expressions.
   - Check TXT and PDF exports for the changed unit when exports apply.

6. Record the pass.
   - Update `docs/reference-coverage.md` when the changed content is
     reference-backed.
   - Update `docs/exercise-solution-integrity.md` for new or changed
     questions.
   - Update `docs/interactive-component-behavior.md` for new widgets or static
     export mappings.
   - Add a short entry to this document with target, files changed,
     verification, deployment status, and remaining gaps.

7. Ship the pass.
   - Stage only the intended files.
   - Commit the completed round.
   - Push the branch to the remote repository.
   - Confirm that the deployment for `www.evanalysis.top` succeeds before
     declaring the round complete.

## Visual reference rules

Use GPT Image 2 only for images that make the content easier to understand:
matrix geometry, row operations, span, bases, linear transformations, set
operations, proof structure, diagrams for non-math explanations, or other
concepts where a static visual can reduce confusion.

Generated images must be treated as instructional figures, not decoration. Each
image should have a nearby caption or explanation, should not replace the proof,
derivation, or article explanation, and should have a useful static export
description when exports apply.

## Exercise rules

Practice should behave like a lightweight WeBWorK-style layer where assessment
is useful.

- Include multiple-choice questions where choices reveal common
  misconceptions.
- Include fill-in questions when the reader should produce a number, vector,
  matrix, equation, set, symbolic expression, or concise textual answer.
- Render prompts, choices, feedback, hints, and solutions as math-aware content
  when mathematics is involved.
- Grade fill-in answers through the existing problem-grading architecture
  instead of ad hoc string checks when possible.
- Keep solution explanations adjacent to the matching question.
- Do not let a correct answer appear in the wrong reveal or solution block.

## QA record template

Use this shape for future entries:

```md
### YYYY-MM-DD: note target

- Gap selected:
- Reference basis:
- Content files changed:
- Visuals added:
- Interactions added:
- Exercises added:
- Verification:
- Deployment:
- Remaining gaps:
```

## Current log

No content supplement round has been recorded in this file yet. Future rounds
should append entries here after QA and deployment verification.
