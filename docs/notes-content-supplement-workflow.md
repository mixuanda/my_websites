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

### 2026-04-28: MATH1090 Worksheet 3 exercise-parity pass

- Gap selected: MATH1090 no longer had missing route-level chapter content, but
  `docs/reference-coverage.md` and `docs/chapter-coverage-map.md` still
  recorded Worksheet 3 Venn-configuration variants and the optional
  `N x N -> N` injection as exercise-depth backlog.
- Reference basis: `reference/MATH1090/MATH1090_Worksheet3.pdf`, checked with
  bundled `pypdf`, plus the existing Feb27 set / function lecture-note spine.
- Content files changed: strengthened
  `content/textbook/math1090/sets/set-operations/{en,zh-hk,zh-cn}.mdx` with
  four Venn-region condition patterns and strengthened
  `content/textbook/math1090/sets/functions-relations/{en,zh-hk,zh-cn}.mdx`
  with the prime-factorization injection `F(m,n)=2^m3^n`.
- Visuals added: none; the Venn variants are now explicit region-reading
  prose, and the injection proof is more useful as static text than as a new
  widget.
- Interactions added: none; the existing set-operation explorer remains the
  right interaction for `2.1`, while this pass is exercise / proof parity.
- Exercises added: added localized quick checks for the covered-but-not-contained
  Venn condition and for the `N x N -> N` injection; added matching problem-bank
  checkpoints `checkpoint.math1090.sets.venn-covered-not-contained` and
  `checkpoint.math1090.sets.nx-n-injection`.
- Verification: `npm run contentlayer`, `npm run lint`, `npm run build`, and
  `git diff --check` passed. Local production smoke checks on port `3005`
  returned 200 for EN / zh-HK / zh-CN `2.1` and `2.2` routes, confirmed the
  new Venn and prime-factorization text appears in rendered pages, confirmed
  representative TXT exports contain the new answer material, confirmed
  representative PDF exports return valid `%PDF` payloads, and confirmed the
  two new problem-bank checkpoints through the non-persistent preview API.
  Browser DOM QA confirmed the EN `2.1` page title, language switcher, Venn
  heading, and quick-check text, plus the zh-HK `2.2` prime-factorization text.
- Deployment: pending until this working round is committed and pushed.
- Remaining gaps: no known remaining Worksheet 3 exercise-depth backlog; next
  MATH1090 work should focus on export / rendering QA and optional checkpoint
  coverage for later authored units.

### 2026-04-27: MATH1090 set-language depth pass

- Gap selected: `docs/chapter-coverage-map.md` still marked MATH1090 `2.1`
  and `2.2` as thinner than the source density, and the Feb27 / Worksheet 3
  source audit showed missing or underdeveloped set-builder, multiset,
  Venn-counting, `B^A`, finite inverse, cardinality, operation, and poset
  material.
- Reference basis: `reference/MATH1090/MATH1090_Lecture_Notes_Feb27.pdf`
  chapter 2 and `reference/MATH1090/MATH1090_Worksheet3.pdf`.
- Content files changed: strengthened
  `content/textbook/math1090/sets/set-operations/{en,zh-hk,zh-cn}.mdx` and
  `content/textbook/math1090/sets/functions-relations/{en,zh-hk,zh-cn}.mdx`;
  updated `src/lib/textbook/problem-bank.ts` and MATH1090 coverage / QA docs.
- Visuals added: none; the existing set-operation explorer covers the
  state-changing part of `2.1`, while the new material is better represented
  as textbook prose, worked examples, and static proof / counting displays.
- Interactions added: none; no new widget was justified for the proof and
  exercise-depth material.
- Exercises added: added in-page quick checks for hiking inclusion-exclusion,
  function-set counting, and finite left-inverse logic; added matching
  problem-bank checkpoints for the same topics.
- Verification: `npm run contentlayer`, `npm run lint`, `npx tsc --noEmit
  --pretty false`, `npm run build`, and `git diff --check` passed. Local
  production smoke checks on port `3005` returned 200 for representative
  EN / zh-HK / zh-CN MATH1090 `2.1` and `2.2` routes, confirmed the new
  headings and checkpoint prompts render, confirmed no `X -&gt; X` / `h o g`
  fallback strings remain, and confirmed representative TXT / PDF exports
  return study material. Browser QA on the same local server confirmed the
  EN `2.1` page layout, zh-HK language switch, zh-HK new-section rendering,
  and dark-mode toggle state.
- Deployment: commit `dbc75fb` deployed successfully through Vercel production
  deployment `dpl_EqfRxvYh2WkSs2WeLDqigNnrtwJP`. Production smoke checks on
  `www.evanalysis.top` returned 200 for representative MATH1090 `2.1` /
  `2.2` note routes and confirmed representative TXT / PDF exports.
- Remaining gaps at the time: optional Worksheet 3 exercise-depth parity for
  the remaining Venn-configuration variants and the optional `N x N -> N`
  injection. Superseded by the April 28 parity pass above.

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

### 2026-04-25: MATH1030 homogeneous-solution assignment parity pass

- Gap selected: after the `3.1` matrix-algebra pass, `as02` still had
  assignment-style solution-structure patterns that were only summarized in
  public notes.
- Reference basis: `reference/MATH1030/1030efghi-as02.pdf` and
  `reference/MATH1030/1030efghi-as02as.pdf`.
- Content files changed: strengthened the EN / zh-HK / zh-CN `4.1
  Homogeneous systems and null space` unit and updated
  `src/lib/textbook/catalog.ts` plus `src/lib/textbook/problem-bank.ts`.
- Visuals added: none; this is a structural proof and parameter-form pass, so
  theorem, worked-example, common-mistake, quick-check, and reveal-solution
  blocks are the appropriate article surface.
- Interactions added: none; no new widget was justified for the null-space
  translation pattern.
- Exercises added: in-page quick checks now ask readers to prove that the
  difference of two particular solutions lies in the null space; the problem
  bank adds a multiple-choice checkpoint for the same pattern.
- Verification: `npm run contentlayer`, `npm run lint`, `npm run build`, and
  `git diff --check` passed. Local production smoke on port `3000` returned
  200 for the EN / zh-HK / zh-CN `4.1` note routes, EN TXT export, and zh-HK
  PDF export. Browser QA on the zh-HK route confirmed the new section,
  difference-of-solutions checkpoint, localized export control, and zero
  captured console errors.
- Deployment: commit `ddbf20e` deployed successfully through Vercel production
  deployment `dpl_H7y9BXVxtHY62bp2QuNs52ERAxgw`. Production smoke checks on
  `www.evanalysis.top` returned 200 for the EN and zh-HK `4.1` note routes,
  the EN TXT export route, and the zh-HK PDF export route.
- Remaining gaps: `as03` invertibility and set-language practice parity, plus
  broader export QA across the expanded MATH1030 sequence.

### 2026-04-25: MATH1030 as03 set-language and invertibility parity pass

- Gap selected: `as03` still had assignment-style proof templates that were
  only partially represented in public notes, especially direct set-language
  proof from definitions and determinant-free invertibility product algebra.
- Reference basis: `reference/MATH1030/1030efghi-as03.pdf` and
  `reference/MATH1030/1030efghi-as03as.pdf`.
- Content files changed: strengthened the EN / zh-HK / zh-CN `4.2 Set
  language and solution sets` unit and the EN / zh-HK / zh-CN `5.1 Invertible
  matrices` unit; updated `src/lib/textbook/catalog.ts` and
  `src/lib/textbook/problem-bank.ts`.
- Visuals added: none; the new material is proof-structural and algebraic, so
  theorem, proof, worked-example, common-mistake, quick-check, and
  reveal-solution blocks are the appropriate article surface.
- Interactions added: none; no new widget was justified for the set-inclusion
  or cyclic-product reasoning patterns.
- Exercises added: in-page quick checks now cover common-solution forcing
  `b=c` and cyclic identities from `ABCD=I`; the problem bank adds matching
  multiple-choice checkpoint items.
- Verification: `npm run contentlayer`, `npm run lint`, `npm run build`, and
  `git diff --check` passed. Local production smoke on port `3000` returned
  200 for the EN / zh-HK `4.2` and `5.1` note routes, EN TXT export for
  `4.2`, and zh-HK PDF export for `5.1`. Browser QA on the zh-HK routes
  confirmed the new set-language section, cyclic-product section, checkpoint
  prompts, localized export controls, and zero captured console errors.
- Deployment: commit `94fd6bd` deployed successfully through Vercel
  production deployment `dpl_9gVqM1iwDGR1vTm3xcFRnLKXtWCP`. Production smoke
  checks on `www.evanalysis.top` returned 200 for the EN / zh-HK `4.2` and
  `5.1` note routes, the EN `4.2` TXT export route, and the zh-HK `5.1` PDF
  export route; production content greps confirmed the new set-language and
  cyclic-product sections are live.
- Remaining gaps: full `as03` row-reduction tables, parameterized inverse
  computations, and longer polynomial identity proof exercises remain
  exercise-depth backlog; broader MATH1030 export QA should continue.

### 2026-04-26: MATH1030 RREF numerical drill parity pass

- Gap selected: after earlier MATH1030 passes, the remaining early-chapter
  gap was not a missing route but `as02`-style long RREF / row-reduction
  practice that had not been fully converted into public article and
  checkpoint depth.
- Reference basis: `reference/MATH1030/1030efghi-as02.pdf` and
  `reference/MATH1030/1030efghi-as02as.pdf`, especially the Q5 one-step RREF
  cleanup patterns and Q7 augmented-system reduction / parametric solution.
- Content files changed: strengthened
  `content/textbook/math1030/matrices/gaussian-elimination-rref/{en,zh-hk,zh-cn}.mdx`;
  updated `src/lib/textbook/catalog.ts`, `src/lib/textbook/problem-bank.ts`,
  and the MATH1030 coverage / QA docs.
- Visuals added: none; the existing row-reduction stepper already covers the
  state-changing interaction, while this pass needed static, export-friendly
  worked reductions.
- Interactions added: none; the new material is a longer computation and
  solution-reading pass that works best as article text, display math, quick
  checks, and guided exercises.
- Exercises added: added in-page quick checks and exercises for free-variable
  reading, one-step RREF cleanup, and parametric-coordinate extraction; added
  two problem-bank checkpoints for the cleanup operation and scalar
  substitution into an RREF solution.
- Verification: `npm run contentlayer`, `npx tsc --noEmit --pretty false`,
  `npm run lint`, `npm run build`, and `git diff --check` passed. Local
  production smoke on `127.0.0.1:3000` returned 200 for EN / zh-HK / zh-CN
  `2.3` note routes, representative TXT exports, and representative PDF
  exports. Browser QA on the zh-HK route confirmed the new long reduction,
  near-RREF example, checkpoint prompts, language links, and zero captured
  console errors.
- Deployment: committed as `d873d4c`, pushed to `origin/main`, and verified on
  Vercel production deployment `dpl_5nQ1SWt5PBD7f3Hvr21Sz6qLffjG`. Production
  smoke checks on `www.evanalysis.top` returned 200 for the EN and zh-HK `2.3`
  note routes, EN TXT export, and EN PDF export; content checks confirmed the
  new long RREF drill is live.
- Remaining gaps: `as03` inverse-by-row-reduction, parameterized inverse
  computations, and longer polynomial-identity proof exercises remain later
  exercise-depth backlog; broader MATH1030 export QA should continue.

### 2026-04-26: MATH1030 as03 invertibility-depth pass

- Gap selected: after the RREF drill pass, `as03` still had invertibility
  practice that was not represented in public article depth: parameterized
  inverse computation and determinant-free polynomial identity proofs.
- Reference basis: `reference/MATH1030/1030efghi-as03.pdf` and
  `reference/MATH1030/1030efghi-as03as.pdf`, especially Q7 and Q10.
- Content files changed: strengthened
  `content/textbook/math1030/invertibility/invertible-matrices/{en,zh-hk,zh-cn}.mdx`;
  updated `src/lib/textbook/catalog.ts`, `src/lib/textbook/problem-bank.ts`,
  and the MATH1030 coverage / QA docs.
- Visuals added: none; the new material is algebraic row-reduction output and
  proof practice, which is clearer as display math and worked examples than
  as a generated illustration.
- Interactions added: none; no new widget was justified beyond the existing
  row-reduction support already present on the page.
- Exercises added: added in-page quick checks for parameter substitution in
  `A_alpha^{-1}` and the vector-identity inverse pattern; added a guided
  commutativity exercise from `(A-B)A=I`; added two problem-bank checkpoints.
- Verification: `npm run contentlayer`, `npx tsc --noEmit --pretty false`,
  `npm run lint`, `npm run build`, and `git diff --check` passed. Local
  production smoke on `127.0.0.1:3001` returned 200 for EN / zh-HK / zh-CN
  `5.1` note routes, the three TXT exports, and the EN PDF export. Browser QA
  on the zh-HK route confirmed the new parameterized inverse section,
  determinant-free proof section, language links, light/dark mode rendering,
  and zero captured console errors.
- Deployment: committed, pushed to `origin/main`, and verified on Vercel
  production. Production smoke checks on `www.evanalysis.top` returned 200 for
  the EN / zh-HK / zh-CN `5.1` note routes, representative TXT exports, and
  the EN PDF export; production content greps confirmed the parameterized
  inverse and determinant-free proof sections are live.
- Remaining gaps after this pass: the Q5 / Q6 / Q8 numerical row-reduction
  table material was addressed by the following row-reduction-table pass;
  broader MATH1030 export QA should continue.

### 2026-04-26: MATH1030 as03 row-reduction table parity pass

- Gap selected: after the parameterized-inverse pass, the remaining as03
  content gap was the Q5 / Q6 / Q8 numerical inverse-table material: reading
  `[A | I] -> [I | D]`, deciding invertibility from pivot columns, using
  transpose-inverse information, and translating one shared row-operation
  product into a matrix-polynomial identity.
- Reference basis: `reference/MATH1030/1030efghi-as03.pdf` and
  `reference/MATH1030/1030efghi-as03as.pdf`, especially Q5, Q6, and Q8.
- Content files changed: strengthened
  `content/textbook/math1030/invertibility/invertible-matrices/{en,zh-hk,zh-cn}.mdx`;
  updated `src/lib/textbook/catalog.ts`, `src/lib/textbook/problem-bank.ts`,
  and the MATH1030 coverage / QA docs.
- Visuals added: none; the new material is best represented as static
  row-reduction tables and matrix identities, and the existing row-reduction
  widgets already cover state-changing interaction.
- Interactions added: none; the article now uses worked examples, display
  math, quick checks, and problem-bank checkpoints so TXT/PDF export preserves
  the same study value.
- Exercises added: added in-page quick checks for the right block in
  `[A | I] -> [I | D]` and for interpreting a row-operation product `H`;
  added two problem-bank checkpoints for the same concepts.
- Verification: `npm run contentlayer`, `npx tsc --noEmit --pretty false`,
  `npm run lint`, `npm run build`, and `git diff --check` passed. Local
  production smoke on `127.0.0.1:3002` returned 200 for EN / zh-HK / zh-CN
  `5.1` note routes, the three TXT exports, and the EN PDF export. Browser QA
  confirmed the zh-HK route renders the new supplied-table section, the
  language switcher reaches the zh-CN route, dark mode renders coherently, and
  zero console errors were captured.
- Deployment: committed, pushed to `origin/main`, and verified on Vercel
  production. Production smoke checks on `www.evanalysis.top` returned 200 for
  the EN / zh-HK / zh-CN `5.1` note routes, representative TXT exports, and
  the EN PDF export; production content greps confirmed the supplied
  row-reduction table section is live.
- Remaining gaps: broader MATH1030 export QA and optional exhaustive
  reproduction of every intermediate numerical row-operation table remain
  later QA-depth work.

### 2026-04-26: MATH1030 as02 row-operation product parity pass

- Gap selected: the MATH1030 core chapter map was complete, but the coverage
  ledger still marked `as02` as partial and explicitly pointed the remaining
  row-operation-matrix composition material toward `3.3`.
- Reference basis: `reference/MATH1030/1030efghi-as02.pdf` and
  `reference/MATH1030/1030efghi-as02as.pdf`, especially Q1 on identifying
  row-operation matrices, forming `J=H_6...H_1`, and reversing the chain.
- Content files changed: strengthened
  `content/textbook/math1030/matrix-algebra/row-operation-matrices/{en,zh-hk,zh-cn}.mdx`;
  updated `src/lib/textbook/catalog.ts`, `src/lib/textbook/problem-bank.ts`,
  and the MATH1030 coverage / QA docs.
- Visuals added: none; the material is a matrix-product reading task, and the
  display-math sequence is clearer and more export-friendly than a generated
  illustration.
- Interactions added: none; no new widget was justified. The new section is a
  static worked example with an immediate quick check, so TXT / PDF export can
  preserve the full study value.
- Exercises added: added an in-page quick check for `KJ=I_4` / `JK=I_4` and a
  matching problem-bank checkpoint on reverse row-operation products.
- Verification: `npm run contentlayer`, `npx tsc --noEmit --pretty false`,
  `npm run lint`, `npm run build`, and `git diff --check` passed. Local
  production smoke on `127.0.0.1:3002` returned 200 for EN / zh-HK / zh-CN
  `3.3` note routes, the three TXT exports, and the EN PDF export. Browser QA
  confirmed the zh-HK route renders the new six-step row-operation product
  section in dark mode, clicking the language switcher reaches the zh-CN route,
  and zero console errors were captured.
- Remaining gaps: the parameterized `G/H` construction from `as02` Q2 remains
  optional exercise-depth backlog; broader MATH1030 export QA should continue.

### 2026-04-26: MATH1030 as02 parameterized row-operation product pass

- Gap selected: after the Q1-style `3.3` row-operation-product pass, the
  remaining documented `as02` gap was Q2's parameterized `G/H` construction:
  applying a chain with `alpha_1`, `alpha_2`, `beta_1`, and `beta_2` to
  `I_5`, then reversing it.
- Reference basis: `reference/MATH1030/1030efghi-as02.pdf` and
  `reference/MATH1030/1030efghi-as02as.pdf`, especially Q2.
- Content files changed: strengthened
  `content/textbook/math1030/matrix-algebra/row-operation-matrices/{en,zh-hk,zh-cn}.mdx`;
  updated `src/lib/textbook/problem-bank.ts` and the MATH1030 coverage / QA
  docs.
- Visuals added: none; the material is a symbolic row-operation product and
  is clearer as static display math.
- Interactions added: none; no new widget was justified. The exercises use
  existing `QuickCheck` and `RevealSolution` blocks so TXT / PDF exports keep
  the full study value.
- Exercises added: added two in-page guided exercises for constructing `G`
  and reversing it to obtain `H=G^{-1}`; added two problem-bank checkpoints
  for the `(3,2)` entry `alpha_2 beta_1` and the relationship `H=G^{-1}`.
- Verification: `npm run contentlayer`, `npx tsc --noEmit --pretty false`,
  `npm run lint`, `npm run build`, and local production smoke on
  `127.0.0.1:3003` passed. Local note routes rendered the new EN / zh-HK /
  zh-CN parameterized exercises, EN TXT export contained the new `G/H`
  material, and zh-HK PDF export returned `application/pdf`. Browser DOM QA
  confirmed the zh-HK page exposes the new exercises, checkpoint section,
  zh-CN language links, and no captured console errors; browser screenshot
  capture timed out in the in-app browser.
- Deployment: content implementation committed as `c5d60a9`, pushed to
  `origin/main`, and verified on Vercel production deployment
  `dpl_4tDQK1t7oyDTxKNufHNUf3u3jYcZ`. Production smoke checks on
  `www.evanalysis.top` returned 200 for EN / zh-HK / zh-CN note routes, 200
  for the EN TXT export, and `application/pdf` for the zh-HK PDF export;
  production content greps confirmed the new `alpha_2` and `G^{-1}` material.
- Remaining gaps: broader MATH1030 export QA remains; exhaustive reproduction
  of every intermediate numerical assignment table remains intentionally
  optional.
