# Notes Improvement Tracker

Last updated: 2026-05-14

This document records the active improvement backlog raised on 2026-05-11 for
the public Notes system. It is the single progress file for this round: every
completed implementation pass must update the relevant item status, evidence,
verification result, and any remaining follow-up.

## 原始反馈摘要

本轮反馈需要长期跟踪，不能只停留在计划层面：

- Math1030 / Math1090 章节很多，左侧目录虽然完整但过长，读者需要滑动很久才能找到后面章节；需要设计更快、更合理的目录查找 UI。
- Checkpoint 字体偏小，题目数量偏少，部分数学结构渲染不正确；Math1030 应加入更多计算题型。
- Math1090 需要重新对照额外 lecture notes，检查是否有内容被省略，并补成完整的 textbook-style Notes。
- Math1030 的 Gram-Schmidt / 正交化等内容只靠公式不好理解，应加入合适的嵌入式互动，并修复现有渲染错误。
- CSCI2520 内容不完整，算法部分尤其需要代码或伪代码支撑；理想形态是代码 / 伪代码一侧、实际示范一侧，并能同步展示算法运行。
- CSCI2520 checkpoint 可以加入代码输出题、复杂度分析题、算法追踪题。
- Math1025 内容不完整且难度偏低，没有达到 lecture notes 难度；还需要修复渲染错误，并把练习答案改成默认隐藏、可展开显示。
- 这个文件必须持续记录完成进度：每完成一项，就在本文件中标注当前完成到哪里。

## Status Legend

- `Not started`: Recorded but not yet implemented.
- `In progress`: Work has started in the current or a previous round.
- `Completed`: Implemented, verified, and recorded here.
- `Blocked`: Cannot proceed without missing source material, tooling, or a
  product decision.
- `Deferred`: Intentionally postponed with a concrete reason.

## Progress Snapshot

| Area | Item | Status | Current evidence / next action |
| --- | --- | --- | --- |
| Global Notes UI | Long left-side course目录 is hard to scan for Math1030 / Math1090 | In progress | Reusable course-sidebar finder / chapter filter is committed, pushed, deployed, and HTTP-verified on `www.evanalysis.top`; required browser interaction QA is still blocked because both the in-app browser and Chrome extension connections are unavailable. |
| Checkpoint UI | Checkpoint font is too small and not readable enough | In progress | Shared checkpoint shell, prompts, choices, inputs, feedback, and solution steps now use larger typography / spacing; committed, pushed, deployed, and HTTP/API/export-verified on `www.evanalysis.top`, but mobile / theme browser QA is still blocked. |
| Checkpoint content | Math1030 needs more computational checkpoint practice | Not started | Use repository-backed MATH1030 practice / assignment sources, not generic filler. |
| Checkpoint rendering | Some checkpoint mathematical structures do not render correctly | In progress | Rich-text rendering now promotes standalone math answer choices and no longer blocks fraction-like strings such as `1/sqrt(2)` as file paths; representative MATH1030 checkpoint HTML contains KaTeX output. |
| Math1030 interactions | Gram-Schmidt / orthogonalization needs a clearer embedded interaction | Not started | Add or reuse an article-embedded stepper / visualization where it improves understanding. |
| Math1030 rendering | Existing Math1030 pages have rendering mistakes | Not started | Run page-level MDX / KaTeX / browser QA before and after changes. |
| Math1090 content | Some Math1090 material may have been omitted from extra lecture notes | Not started | Re-audit `reference/MATH1090` lecture notes against authored content before writing. |
| CSCI2520 content | CSCI2520 is incomplete, especially algorithms | Not started | Audit `reference/CSCI2520`, extracted text, and current `content/textbook/csci2520/**`. |
| CSCI2520 interactions | Algorithms need code / pseudocode plus synchronized demonstrations | Not started | Design split explanatory blocks where code or pseudocode and the demonstration advance together. |
| CSCI2520 checkpoints | Add code-output and complexity-analysis checkpoint questions | Not started | Extend problem-bank support if current checkpoint types are insufficient. |
| Math1025 content | Math1025 content is incomplete and currently too easy | Not started | Re-audit `reference/MATH1025` and raise difficulty to match lecture-note level. |
| Math1025 rendering | Math1025 has rendering mistakes | Not started | Audit page rendering and export output for affected units. |
| Math1025 exercises | Math1025 exercise / answer presentation should hide answers behind reveals | Not started | Align with the existing reveal-answer pattern used in other Notes units. |
| Tracking | Record this backlog in the repository | Completed | This file created on 2026-05-11 and linked from `docs/README.md`. |

## 2026-05-14 QA Checkpoint

This QA pass created `docs/qa-checkpoints-2026-05-14.md` as the live checkpoint
record for the current unfinished-content review.

Verified locally:

- `npm run contentlayer`
- `npm run verify:mdx-tables`
- `npm run lint`
- `npx tsc --noEmit --pretty false`
- `AUTH_SECRET=local-test-secret npm run build`
- representative local route, screenshot, TXT export, PDF export, and
  checkpoint grade-preview checks

Key result:

- The current Notes system builds and representative routes / exports work.
- `npm run check:textbook-content` still reports 363 content warnings, so the
  main unfinished work is content depth and exercise parity, not basic route
  generation.
- Math1025 is the largest unauthored source-backed backlog: chapter-slide
  families `ch7` through `ch11` are still not public Notes units.
- CSCI2520 has public baseline units but still needs serious algorithm depth,
  source-process prose cleanup, and checkpoint expansion.
- Math1030 has broad route coverage but still has five units without
  checkpoint problems and many depth / worked-example warnings.
- Math1090 has route-level and checkpoint coverage across all current units,
  but still needs broader export / rendering / theme QA and optional deeper
  practice.
- Math1010 remains future-only because no `reference/MATH1010/**` source tree
  exists.

Fixes made during this QA pass:

- Cleaned several public source-process phrases from MATH1090, Math1025,
  Math1030, and CSCI2520 prose.
- Fixed a zh-HK export prose defect in the Cantor / choice unit
  (`同一段這裏` -> `同一部分`).
- Replaced `source formula` / `來源公式` / `来源公式` wording in the Math1025
  sequences unit and its checkpoint preview text.

Blocked / incomplete verification:

- In-app Browser QA remains blocked because the browser backend returned
  `Browser is not available: iab`; fallback screenshots were taken with the
  Playwright CLI after installing Chromium into the user cache.
- Remote production QA was started with Microsoft Edge and direct remote HTTP
  checks, not localhost. The remote Notes indexes, a representative Math1030
  note route, TXT exports, PDF export, and checkpoint preview API returned 200.
- The first remote TXT export checks found that production still contained the
  pre-fix `同一段這裏` and `source formula`-style wording. After commit
  `19cfc39` deployed, the same remote export checks returned
  `stale_source_wording=no`, and Edge visual QA confirmed the zh-HK Math1090
  page now shows `同一部分`.

## 1. Global Notes Navigation / Long Course Sidebar

### Problem

Math1030 and Math1090 now contain enough chapters and sections that the left
sidebar becomes too long. Readers can technically reach later sections, but only
after excessive scrolling. The desired behavior is still a complete course
目录, but with faster scanning and jumping.

### UI Direction To Evaluate

- Keep the Notes article experience primary; do not create a separate course
  portal.
- Preserve full chapter / section visibility somewhere in the UI.
- Add a fast local finder for the current course, likely with section-title
  search and chapter filtering.
- Use collapsible chapter groups so a reader can narrow the sidebar without
  losing the complete structure.
- Keep the current note and current chapter visibly highlighted.
- Consider a compact "jump to section" control near the sidebar top for long
  courses.
- Ensure desktop and mobile behavior are both readable.
- Do not hardcode the solution only for Math1030 / Math1090; it must also work
  for Math1025, Math1010, CSCI2520, and future courses.

### Completion Criteria

- Long courses can be scanned without excessive scrolling.
- A reader can find a later section quickly from the note page.
- Current note highlighting, breadcrumbs, language switching, exports, and
  theme behavior still work.
- Verified in light mode, dark mode, desktop, and a mobile-width viewport.

## 2. Checkpoint UI Readability And Rendering

### Problem

Current checkpoint UI is too small for sustained study. Some mathematical
structures inside checkpoint prompts or answers also fail to render correctly.

### Required Changes

- Increase checkpoint typography and spacing to match the surrounding note
  article.
- Ensure prompts, choices, input labels, hints, feedback, answers, and guided
  solutions all support math rendering.
- Make calculation-heavy prompts readable, including matrices, aligned
  equations, vectors, set notation, and code snippets where relevant.
- Keep answer / solution reveal behavior clear and paired with the correct
  prompt.
- Confirm that checkpoint UI remains coherent in EN, zh-HK, and zh-CN.

### Completion Criteria

- Checkpoints are legible on desktop and mobile.
- Mathematical notation renders correctly in prompts and solution blocks.
- No answer appears under the wrong question.
- TXT / PDF export preserves static study value for checkpoint material.

## 3. Math1030 Checkpoint Expansion

### Problem

Math1030 needs more computational practice inside checkpoints. Current coverage
has improved, but there should be more calculation questions where the lecture
and assignment material supports them.

### Source Boundary

Use repository evidence first:

- `reference/MATH1030/**`
- `docs/reference-coverage.md`
- `docs/chapter-coverage-map.md`
- existing authored notes under `content/textbook/math1030/**`
- existing problem-bank entries in `src/lib/textbook/problem-bank.ts`

### Candidate Practice Types

- Row reduction and RREF calculation.
- Matrix multiplication and inverse computations.
- Solving systems from augmented matrices.
- Span / basis / linear independence calculations.
- Determinant, eigenvalue, eigenspace, and diagonalization drills when source
  material supports them.
- Inner product, projection, orthogonal basis, and Gram-Schmidt calculations.

### Completion Criteria

- New questions are source-backed and tied to existing note units.
- Fill-in answers are graded through the existing problem architecture where
  possible.
- Matrix and vector notation render correctly.
- Solutions explain the method, not only the final answer.

## 4. Math1030 Embedded Interactions

### Problem

Some Math1030 topics, especially Gram-Schmidt / orthogonalization, are hard to
understand when presented only as dense formulas.

### Interaction Direction

- Keep interaction embedded inside article flow.
- Use interaction only where it clarifies the proof or computation.
- For Gram-Schmidt, prefer a step-by-step display that shows:
  - the current input vector,
  - the projection being removed,
  - the remaining orthogonal component,
  - normalization,
  - the resulting orthogonal or orthonormal list.
- Export must degrade to a static step sequence with representative states.

### Completion Criteria

- The interaction improves the local explanation and does not dominate the
  note page.
- Static export remains useful without JavaScript.
- Light / dark themes and all supported languages remain readable.

## 5. Math1090 Lecture-Note Completeness

### Problem

Math1090 may still omit material from the extra lecture notes. The next pass
must compare the actual lecture-note sources with current authored content
instead of assuming the route spine is complete.

### Required Audit

- Re-check `reference/MATH1090/**`, especially lecture-note PDFs and extra
  notes.
- Compare against `content/textbook/math1090/**`.
- Update `docs/reference-coverage.md` and `docs/chapter-coverage-map.md`.
- Distinguish:
  - incorporated material,
  - overlapping material merged into existing units,
  - omitted but usable material,
  - weak / unreadable / conflicting material.

### Completion Criteria

- Any omitted usable topic is authored into Notes with serious, textbook-like
  prose.
- Exercises and checkpoint coverage are added where appropriate.
- Public pages remain clean and do not show source-tracing blocks.

## 6. CSCI2520 Completeness, Algorithms, And Checkpoints

### Problem

CSCI2520 content is incomplete. Algorithm-heavy units need clearer explanation,
code or pseudocode support, and embedded demonstrations.

### Required Direction

- Audit `reference/CSCI2520/**`, `docs/extracted/csci2520/**`, and
  `content/textbook/csci2520/**`.
- Prioritize algorithms and data-structure procedures where a static paragraph
  is insufficient.
- Add pseudocode or code-backed explanations for algorithm units.
- For suitable algorithms, use a split instructional block:
  - one side shows code or pseudocode,
  - the other side shows the current data-structure / algorithm state,
  - stepping the code advances the demonstration state.
- Keep this as an embedded teaching figure inside a note, not a separate app.

### Candidate Algorithm Areas

- Stack / queue operations.
- Linked-list operations.
- Hash table collision handling.
- Sorting and selection algorithms.
- Binary search trees and tree traversals.
- Heaps and heap operations.
- Huffman coding.
- Graph traversal, shortest paths, minimum spanning trees, and topological
  sorting where supported by source material.

### Checkpoint Direction

- Add code-output questions: given a small code snippet, ask for the output or
  final data-structure state.
- Add complexity questions: given code or pseudocode, ask for time complexity
  and the reasoning.
- Add algorithm-trace questions: given a small input, ask for intermediate
  states or final result.

### Completion Criteria

- Algorithm explanations have code / pseudocode where appropriate.
- Interactive demonstrations are synchronized with the displayed procedure.
- Checkpoint prompts and answers are paired correctly.
- Export provides static traces and pseudocode, not broken interactive shells.

## 7. Math1025 Completeness, Difficulty, Rendering, And Answers

### Problem

Math1025 is incomplete, too easy compared with the lecture notes, and contains
rendering issues. Exercise and answer presentation also needs to match the
reveal-answer pattern used elsewhere.

### Required Audit

- Re-check `reference/MATH1025/**` and `docs/extracted/math1025/**`.
- Compare source difficulty against authored `content/textbook/math1025/**`.
- Identify missing or underdeveloped chapters beyond the current authored
  baseline.

### Required Changes

- Raise the level of exercises and exposition to match lecture-note difficulty.
- Fix math rendering and malformed content blocks.
- Make exercise answers hidden by default and revealed on demand, following the
  existing Notes pattern.
- Keep solutions pedagogically useful: show method and reasoning, not only the
  answer.

### Completion Criteria

- Content depth matches the repository lecture-note sources.
- Exercise / answer behavior is consistent with other Notes units.
- Rendering and exports pass QA.

## 8. Cross-Cutting QA Requirements

Every implementation pass that touches the items above should verify:

- public pages still live under Notes;
- route structure remains future-course extensible;
- EN / zh-HK / zh-CN language switching still works;
- dark and light themes are readable;
- math rendering is correct;
- checkpoint grading and reveal behavior are correct;
- TXT and PDF exports preserve study value;
- no public page is cluttered with internal source-tracking metadata;
- internal coverage / QA docs are updated when source-backed content changes.

## Completion Log

### 2026-05-11: Global Notes sidebar finder blocked on Chrome QA

- Status: Blocked; not yet a completed checkpoint.
- Gap selected: long Math1030 / Math1090 course sidebars require faster
  section lookup without moving Notes into a detached course app.
- Files changed so far: `src/components/textbook/TextbookCourseSidebar.tsx`,
  `src/components/textbook/TextbookCourseSidebarClient.tsx`,
  `src/lib/textbook/i18n.ts`, `docs/notes-information-architecture.md`,
  `docs/localization-strategy.md`, plus the tracker link in `docs/README.md`.
- Implementation state: the sidebar now has a localized course search input,
  current-chapter / all-chapters filter buttons, chapter expansion state, a
  sticky scrollable sidebar region, and a no-match empty state. The change is
  reusable across courses because it reads the existing course metadata rather
  than hardcoding Math1030 or Math1090. The current chapter opens by default
  but is not forced open, so readers can still collapse it while scanning. The
  server wrapper keys the client sidebar by locale, course, and current unit so
  client-side route transitions reinitialize the default expanded chapter. The
  search input, chapter filter buttons, and chapter toggle buttons now expose
  explicit `aria-controls` relationships, and dynamic result / empty states use
  polite status semantics. While a search is active, matching chapters are
  forced open and their collapse buttons are disabled so the UI does not offer
  a no-op toggle.
- Verification completed: `git diff --check`, `npm run lint`,
  `npm run contentlayer`, `npm run build`, local HTTP checks for EN Math1030
  and zh-HK Math1090 note pages, and TXT / PDF export header checks passed.
  A read-only comparison of `.contentlayer/generated/TextbookUnit/_index.json`
  against `HEAD` found the same 210 unit ids with no body or metadata changes,
  so the generated diff is currently only ordering churn.
- Verification blocked: real Chrome QA could not be completed. Chrome is
  installed and running, the Codex Chrome Extension is installed / enabled,
  and the native host manifest is correct, but the Chrome plugin still returns
  `Browser is not available: extension` after opening the configured Chrome
  profile window and retrying once. A later fresh browser-connection runtime
  retry also returned no available extension client, so this is not stale
  runtime state.
- Maintenance check: after recording this as blocked, `git diff --check`
  passed. A follow-up `npx tsc --noEmit --pretty false` static type check also
  passed. A later targeted `npx eslint
  src/components/textbook/TextbookCourseSidebarClient.tsx
  src/components/textbook/TextbookCourseSidebar.tsx` check passed after the
  current-chapter collapse behavior was tightened. After that adjustment,
  full `npm run lint`, `npm run build`, `git diff --check`, local EN Math1030
  / zh-HK Math1090 page smoke checks, and local TXT / PDF export header checks
  all passed again. The local `next start` smoke still emits the existing
  Auth.js `MissingSecret` warning in this shell, but public note and export
  routes returned the expected 200 responses.
- Staging note: when Chrome QA passes, stage only
  `docs/README.md`, `docs/localization-strategy.md`,
  `docs/notes-information-architecture.md`,
  `docs/notes-improvement-tracker.md`,
  `src/components/textbook/TextbookCourseSidebar.tsx`,
  `src/components/textbook/TextbookCourseSidebarClient.tsx`, and
  `src/lib/textbook/i18n.ts`. Keep the current `.contentlayer/generated`
  index diff out of the checkpoint unless a later source change makes it
  semantically necessary. A post-build read-only comparison still found 210
  matching unit ids, zero changed bodies, and zero changed metadata fields.
- Route-state check: after keying the client sidebar to the current route,
  targeted `npx eslint src/components/textbook/TextbookCourseSidebar.tsx
  src/components/textbook/TextbookCourseSidebarClient.tsx`,
  `npx tsc --noEmit --pretty false`, and `git diff --check` all passed. Full
  `npm run lint`, `npm run build`, local EN Math1030 / zh-HK Math1090 page
  smoke checks, and local TXT / PDF export header checks also passed again
  after this route-state adjustment.
- Accessibility relationship check: after adding `aria-controls` and polite
  result status semantics, targeted `npx eslint`, `npx tsc --noEmit --pretty
  false`, full `npm run lint`, full `npm run build`, local EN Math1030 /
  zh-HK Math1090 page smoke checks, and local TXT / PDF export header checks
  passed. The page smoke output includes the expected localized sidebar labels
  and `aria-controls` attributes.
- Search-state toggle check: after disabling chapter collapse buttons while
  search is forcing matched chapters open, targeted `npx eslint
  src/components/textbook/TextbookCourseSidebar.tsx
  src/components/textbook/TextbookCourseSidebarClient.tsx`,
  `npx tsc --noEmit --pretty false`, and `git diff --check` passed. Full
  `npm run lint`, full `npm run build`, local EN Math1030 / zh-HK Math1090
  page smoke checks, and local TXT / PDF export header checks also passed
  after this search-state toggle adjustment. The disabled forced-open behavior
  still needs real Chrome interaction QA because the HTTP smoke checks only
  verify the initial server-rendered page and export responses.
- Maintenance cleanup: after extracting the total section count from JSX into
  a reusable local value, targeted `npx eslint
  src/components/textbook/TextbookCourseSidebar.tsx
  src/components/textbook/TextbookCourseSidebarClient.tsx`,
  `npx tsc --noEmit --pretty false`, and `git diff --check` passed.
- Durable architecture notes: after recording the sidebar finder behavior in
  `docs/notes-information-architecture.md` and localization expectations in
  `docs/localization-strategy.md`, `git diff --check`, targeted `rg` checks
  for the new doc anchors, and targeted sidebar `npx eslint` passed.
- 2026-05-11 continuation check: the in-app Browser backend returned
  unavailable before any tab could be opened. The Chrome backend also returned
  unavailable after the lightweight connection retry. Chrome itself is
  installed and running, the Codex Chrome Extension is installed and enabled
  in the selected profile, and the native host manifest is present with the
  expected extension origin, so the remaining blocker is extension
  communication rather than missing browser files. Local fallback verification
  passed: `npm run lint`, `npx tsc --noEmit --pretty false`,
  `git diff --check`, `npm run build`, EN Math1030 and zh-HK Math1090 note
  route HTML checks for localized sidebar labels / `aria-controls`, EN
  Math1030 TXT export, and zh-HK Math1090 PDF export.
- Remaining before completion: reinstall or repair the Chrome plugin from the
  Codex plugin UI, then rerun desktop and mobile-width Chrome QA for search,
  chapter filtering, expansion, language switching, light / dark mode, and
  console health. Only after that should this checkpoint be committed, pushed,
  and production-verified.
- Chrome QA checklist after plugin recovery:
  1. Open the EN Math1030 Gram-Schmidt unit and the zh-HK Math1090 sequences
     unit in the real Chrome profile.
  2. Confirm the sidebar renders nonblank with localized search, all-chapter /
     current-chapter filters, chapter controls, current-section label, and no
     framework error overlay.
  3. Search for representative terms such as `basis` and a localized zh-HK
     section title fragment; confirm result counts update and no-result state
     is understandable.
  4. Toggle all-chapters / current-chapter, expand and collapse a chapter when
     search is empty, and confirm forced-open search results expose disabled
     chapter controls instead of no-op toggles.
  5. Use the language switcher and light / dark mode controls, then inspect
     console errors and a desktop plus mobile-width screenshot before commit.

### 2026-05-11: Checkpoint readability and standalone math rendering pass

- Status: In progress; component-level implementation and local HTML checks
  passed, but browser visual QA is still blocked by the same browser
  connection issue recorded above.
- Gap selected: checkpoint text was too small for sustained study, and some
  short answer choices such as inner-product equations were plain text rather
  than KaTeX-rendered math because they were not wrapped in backticks or
  `$...$`.
- Files changed:
  `src/components/textbook/UnitCheckpoint.tsx`,
  `src/components/textbook/PracticeQuestion.tsx`,
  `src/components/textbook/AttemptInput.tsx`,
  `src/components/textbook/FeedbackPanel.tsx`,
  `src/components/textbook/SolutionSteps.tsx`, and
  `src/components/textbook/mdx-blocks.tsx`.
- Implementation state: checkpoint containers now use larger section headings,
  larger prompt text, more generous choice spacing, larger fill-in inputs,
  readable preview / feedback blocks, and larger solution-step typography.
  MCQ choices also expose an explicit fieldset label derived from the localized
  prompt. The shared inline rich-text renderer now treats standalone short math
  strings as math when they match a conservative math-only shape, and the
  file-like guard no longer rejects fraction-like expressions such as
  `1/sqrt(2)`.
- Verification completed: targeted `npx eslint` for the touched components,
  full `npm run lint`, `npx tsc --noEmit --pretty false`,
  `git diff --check`, full `npm run build`, local HTML checks against EN
  MATH1030 `9.1 Inner products, norms, and angles` plus `9.3 Gram-Schmidt
  orthogonalization`, a zh-HK MATH1090 sidebar-label HTML check, and EN
  MATH1030 `9.1` TXT / PDF export checks. The representative checkpoint HTML
  includes the larger text classes and KaTeX output.
- Remaining before completion: browser visual QA in light and dark mode,
  mobile-width checkpoint layout inspection, and at least one real checkpoint
  preview / submit interaction once browser automation is available.

### 2026-05-11: Production deployment and remote verification

- Status: Completed for commit / push / production HTTP verification; browser
  visual QA remains externally blocked as noted above.
- Commit: `8587ef5` (`Improve notes sidebar and checkpoint readability`).
- Deployment: Vercel production deployment
  `dpl_GrsQEiqWdMma7umi3stZdhJoFzRy` reached `Ready` and aliases include
  `https://www.evanalysis.top`.
- Production checks on `www.evanalysis.top`:
  - EN MATH1030 `9.1 Inner products, norms, and angles` returned `200` and
    contained the larger checkpoint classes, `inline-katex-rich`, preview
    labels, fieldset aria label, and course-search sidebar marker.
  - EN MATH1030 `9.3 Gram-Schmidt orthogonalization` returned `200` and
    contained the localized course finder, all/current chapter controls,
    larger checkpoint prompt class, and KaTeX output.
  - zh-HK MATH1090 sequence note returned `200` and contained the zh-HK course
    finder labels `搜尋小節標題或主題`, `全部章節`, `目前章節`, and `課程目錄`.
  - EN MATH1030 `9.1` TXT export returned `HTTP/2 200` with
    `text/plain; charset=utf-8`.
  - EN MATH1030 `9.1` PDF export returned `HTTP/2 200`,
    `application/pdf`, and a valid 8-page PDF.
  - Production checkpoint preview API returned `200` for the free problem
    `checkpoint.math1030.matrix-product-size`, with normalized answer `a` and
    preview text `2×4`.
  - `vercel logs dpl_GrsQEiqWdMma7umi3stZdhJoFzRy --no-follow --level error
    --since 15m --limit 20` returned no error logs.

### 2026-05-11: Backlog captured

- Status: Completed.
- Files changed: `docs/notes-improvement-tracker.md`,
  `docs/README.md`.
- Verification: document creation only; implementation and browser QA not yet
  started.
- Remaining gaps: all product, content, checkpoint, interaction, rendering,
  export, and deployment work above remains open until implemented and marked
  here.
