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

### 2026-04-25: Math1025 induction, inequalities, and binomial theorem

- Gap selected: Math1025 had repository sources through chapter 11, but the
  public Notes tree only exposed the chapter-0 / chapter-1 baseline.
- Reference basis: `reference/MATH1025/MATH1025_slides_ch2(2).pdf`,
  `reference/MATH1025/MATH1025_slides_ch3(5).pdf`, and
  `reference/MATH1025/MATH1025_slides_ch4(1).pdf`; extracted review text was
  stored under `docs/extracted/math1025/**`.
- Content files changed: added three EN / zh-HK / zh-CN Math1025 unit families
  for induction, inequalities / absolute value, and binomial coefficients /
  expansions; updated `src/lib/textbook/catalog.ts`.
- Visuals added: none; the selected material is primarily symbolic proof and
  algebraic method, so existing theorem / worked-example blocks were enough.
- Interactions added: none; no new widget was justified for this pass.
- Exercises added: each new unit includes quick checks, immediate reveal
  solutions, exercises, and guided solution structure.
- Verification: `npm run contentlayer`, `npm run lint`, `npm run build`, and
  `git diff --check` passed. Local smoke checks on port `3001` returned 200
  for the new Math1025 EN / zh-HK note routes, verified the EN and zh-HK
  Math1025 course overview listed the new chapter families, and confirmed TXT
  and PDF export routes for representative new units returned study material.
- Deployment: not attempted in this local content pass.
- Remaining gaps: Math1025 chapters `5` through `11` remain source-backed
  backlog, and no `CSCI2120` source tree exists in the repository.

### 2026-04-25: MATH1030 proof-language and REF/RREF appendix gap pass

- Gap selected: `reference/MATH1030` still had optional proof-language and
  REF/RREF existence appendices marked pending or partial while the public
  Notes tree already covered the core chapter sequence.
- Reference basis: `reference/MATH1030/1030gi-n01-03p.pdf`,
  `reference/MATH1030/1030gi-n01-03q.pdf`,
  `reference/MATH1030/1030gi-n01-04q.pdf`,
  `reference/MATH1030/1030gi-n02-03p.pdf`, and supporting
  `reference/MATH1030/1030gi-n02-02p.pdf`.
- Content files changed: added EN / zh-HK / zh-CN note families for `1.2
  Reading theorems and proof language` and `2.5 Existence of row-echelon
  forms`; updated `src/lib/textbook/catalog.ts`, `src/lib/textbook/problem-bank.ts`,
  and MATH1030 coverage / QA docs.
- Visuals added: none; the material is proof and theorem-structure heavy, so
  existing theorem / example / mistake blocks are the right surface.
- Interactions added: none; interactivity was not justified for this proof
  appendix pass.
- Exercises added: each new unit includes quick checks and guided exercises;
  the problem bank now has checkpoint items for contrapositive reading and
  REF-to-RREF pivot-column preservation.
- Verification: `npm run contentlayer`, `npm run lint`, `npm run build`, and
  `git diff --check` passed. Local production smoke checks on port `3000`
  returned 200 for representative EN / zh-HK / zh-CN routes and confirmed
  representative TXT / PDF exports for both new units.
- Deployment: commit `188713c` deployed successfully through Vercel production
  deployment `dpl_5xU7ZhJ1pRJxwxkzGBzqsDNTxoSy`. Production smoke checks on
  `www.evanalysis.top` returned 200 for the representative new note routes and
  TXT / PDF exports.
- Remaining gaps at that point: deeper RREF uniqueness / well-defined rank
  proof detail from `1030gi-n03-04p.pdf`, plus broader assignment /
  practice-set exercise parity. The RREF proof gap is handled in the following
  pass.

### 2026-04-25: MATH1030 RREF uniqueness and well-defined rank gap pass

- Gap selected: `reference/MATH1030/1030gi-n03-04p.pdf` still held the full
  induction proof for RREF uniqueness and the well-defined rank bridge, while
  the public notes had only summarized that material inside `5.1`.
- Reference basis: `reference/MATH1030/1030gi-n03-04p.pdf`, with
  `reference/MATH1030/1030gi-n03-04.pdf` for the preserved-column-relation
  theorem used in the proof.
- Content files changed: added and strengthened the EN / zh-HK / zh-CN
  `5.2 RREF uniqueness and well-defined rank` unit family and registered it in
  `src/lib/textbook/catalog.ts`.
- Visuals added: none; this is a proof-heavy appendix where theorem,
  collapsible-proof, mistake, and guided-solution blocks are the appropriate
  instructional surface.
- Interactions added: none; no new widget was justified for this proof pass.
- Exercises added: in-page quick checks and guided exercises now cover
  uniqueness, pivot-count rank, free-column relations, and the difference
  between REF and RREF uniqueness; the problem bank adds MCQ and fill-in
  checkpoint items for the new unit.
- Verification: `npm run contentlayer`, `npm run lint`, `npm run build`, and
  `git diff --check` passed. Local production smoke checks on port `3000`
  returned 200 for the EN / zh-HK / zh-CN note routes, EN and zh-HK TXT
  exports, and EN / zh-CN PDF exports. Browser QA confirmed the EN and zh-HK
  pages render with the proof section, language links, export control, and no
  captured console errors.
- Deployment: commit `921be62` deployed successfully through Vercel production
  deployment `dpl_GPKkupx7yYxd1HeyhPSN1K9W6YMS`. Production smoke checks on
  `www.evanalysis.top` returned 200 for the EN and zh-HK note routes, the EN
  TXT export route, and the EN PDF export route.
- Remaining gaps: broader assignment / tutorial exercise parity and export /
  rendering QA across the expanded MATH1030 sequence.

### 2026-04-25: MATH1030 matrix-algebra practice parity pass

- Gap selected: MATH1030 no longer lacked a core chapter route, but `3.1`
  still had less assignment-style practice depth than the checked-in matrix
  algebra packets.
- Reference basis: `reference/MATH1030/1030efghi-as01.pdf`,
  `reference/MATH1030/1030efghi-as01as.pdf`,
  `reference/MATH1030/Practice Set 2_Matrix Algebra.pdf`, and
  `reference/MATH1030/Practice Set 2_Solutions.pdf`.
- Content files changed: strengthened the EN / zh-HK / zh-CN `3.1 Matrix
  multiplication and identity matrices` unit and updated
  `src/lib/textbook/catalog.ts` plus `src/lib/textbook/problem-bank.ts`.
- Visuals added: none; the added material is symbolic matrix algebra and
  theorem / worked-example blocks are the appropriate surface.
- Interactions added: none; the existing matrix-multiplication visualizer is
  still the relevant embedded interaction for this unit.
- Exercises added: in-page quick checks and guided exercises now cover
  unknown recovery from a partial product, noncommutative expansion, and lower
  triangular closure; the problem bank adds checkpoint items for parameter
  recovery and noncommuting product expansion.
- Verification: `npm run contentlayer`, `npm run lint`, `npm run build`, and
  `git diff --check` passed. Local production smoke on port `3000` returned
  200 for the EN / zh-HK / zh-CN `3.1` note routes, EN TXT export, and zh-HK
  PDF export. Browser QA on the zh-HK route confirmed the new practice
  section, lower-triangular theorem, parameter-recovery checkpoint,
  noncommuting-expansion checkpoint, localized language control, and zero
  captured console errors.
- Deployment: commit `f865e4a` deployed successfully through Vercel production
  deployment `dpl_D2m7puHGfJAX1eDwvL9nkiDKL2RQ`. Production smoke checks on
  `www.evanalysis.top` returned 200 for the EN and zh-HK `3.1` note routes,
  the EN TXT export route, and the zh-HK PDF export route.
- Remaining gaps: `as02` / `as03` assignment parity and higher-chapter export
  QA should continue after this pass.
