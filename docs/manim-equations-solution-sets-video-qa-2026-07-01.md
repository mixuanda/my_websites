# MATH1030 1.1 Equations and Solution Sets Video QA

Date: 2026-07-01

Branch: `codex/manim`

Unit: `math1030/systems/equations-solution-sets`

Component id: `math1030-equations-solution-sets-story`

## Source Boundary

- `reference/MATH1030/MATH1030-Notes.pdf` pp. 5-11:
  systems as simultaneous equations, solutions and solution sets, consistent
  and inconsistent systems, the three two-line geometric outcomes, equivalent
  systems, and reversible equation operations.
- `reference/MATH1030/1030gi-n01-01p.pdf` practice material:
  ordered-tuple checks, solution-set preservation under equation operations,
  equivalence misconceptions, and parameterized solution reading.

Unsupported material was not added. The clip intentionally does not claim full
RREF classification, does not generalize every inconsistent system as parallel
lines, and does not replace the later augmented-matrix treatment.

## Implementation

- Added a trilingual storyboard at
  `content/textbook/math1030/systems/equations-solution-sets/storyboard.json`.
- Added Manim scene source at
  `tools/animations/manim/scenes/math1030/equations_solution_sets.py`.
- Added render-script support for:
  - `EquationsSolutionSetsStoryEn`
  - `EquationsSolutionSetsStoryZhHk`
  - `EquationsSolutionSetsStoryZhCn`
- Added localized `VideoExplanation` metadata in
  `src/lib/textbook/video-explanations.ts`.
- Embedded the video in all three localized MDX note pages after the geometric
  solution-set figure and before the augmented-matrix explorer lead-in.
- Kept the existing `system-augmented-matrix-explorer` as the reader-controlled
  follow-up.
- Tightened the shared `VideoExplanation` mobile header layout so long labels
  and titles do not get squeezed beside the icon on narrow screens.

## Assets

Rendered assets:

- `/generated/animations/math1030/equations-solution-sets-story-en.mp4`
- `/generated/animations/math1030/equations-solution-sets-story-en.png`
- `/generated/animations/math1030/equations-solution-sets-story-zh-hk.mp4`
- `/generated/animations/math1030/equations-solution-sets-story-zh-hk.png`
- `/generated/animations/math1030/equations-solution-sets-story-zh-cn.mp4`
- `/generated/animations/math1030/equations-solution-sets-story-zh-cn.png`

Media checks:

- EN / zh-HK / zh-CN mp4: H.264, `854x480`, `13.933000s`.
- EN / zh-HK / zh-CN poster: `854x480`.
- Local HTTP asset checks returned `200 OK` for all three mp4 files and all
  three poster files.

Visual frame checks:

- Opening condition/intersection frame: equation cards, intersection diagram,
  and arrow direction are correct.
- Infinite-solution frame: coincident-line diagram and bottom caption are
  readable at 480p.
- Conclusion frame: switched from long prose to two concept-arrow rows
  (`Equations -> change`, `Solution set -> fixed`) to avoid low-resolution
  English spacing artifacts; zh-HK and zh-CN equivalents are readable.

## Local QA

Static checks passed:

- `python3 -m py_compile tools/animations/manim/scenes/math1030/equations_solution_sets.py`
- `python3 -m json.tool content/textbook/math1030/systems/equations-solution-sets/storyboard.json`
- `bash -n tools/animations/manim/scripts/render_scene.sh`
- `git diff --check`
- `npm run verify:mdx-tables`
- `npx tsc --noEmit --pretty false`
- `npm run lint`
- `npm run check:textbook-content`
- `AUTH_SECRET=local-test-secret npm run build`

Notes:

- `npm run check:textbook-content` returned exit code `0` with the existing
  full-site backlog warnings.
- `npm run build` returned exit code `0`; Contentlayer still warns that
  storyboard JSON files are skipped as non-document sidecars, which matches the
  existing storyboard pattern.

Browser QA against `http://127.0.0.1:3010` passed:

- EN route:
  `/en/notes/math1030/systems/equations-solution-sets`
  - title: `1.1 Equations and solution sets`
  - one `<video>` element
  - poster:
    `/generated/animations/math1030/equations-solution-sets-story-en.png`
  - source:
    `/generated/animations/math1030/equations-solution-sets-story-en.mp4`
  - controls present
  - no framework overlay
  - no console warnings or errors
- zh-HK route:
  `/zh-hk/notes/math1030/systems/equations-solution-sets`
  - title: `1.1 方程與解集`
  - localized mp4/poster selected
  - no framework overlay
  - no console warnings or errors
- zh-CN route:
  `/zh-cn/notes/math1030/systems/equations-solution-sets`
  - title: `1.1 方程与解集`
  - localized mp4/poster selected
  - no framework overlay
  - no console warnings or errors
- Language controls `EN`, `繁`, and `简` were present on all three locale
  routes.
- Existing `system-augmented-matrix-explorer` interaction passed: clicking
  `Example 2` changed the system to three equations and the matrix to
  `[[1,-1,1,2],[2,1,-1,1],[0,1,1,3]]`.
- Mobile viewport `390x844` passed with no horizontal overflow; the shared
  video-card header was adjusted after QA found the icon/text row too narrow on
  mobile.

Export QA passed:

- TXT export returned files for EN / zh-HK / zh-CN.
- PDF export returned valid `%PDF` files for EN / zh-HK / zh-CN.
- EN TXT export contains:
  - `[Static video-study sequence] Solution sets as intersections`
  - `Conditions intersect`
  - `Matrix bridge`
  - `[Static study snapshot] Translate one system into a matrix`
- EN TXT export contains no raw `<video>`, `.mp4`, or `poster=` leakage.

## Production Status

Ready.

Git and deployment checkpoint:

- Commit pushed to `origin/codex/manim`:
  `20dba552e744bedb1e7d8f5e65f571a677b94289`.
- `origin/main` was updated from `codex/manim` at the same commit.
- Vercel production deployment:
  `dpl_EhKC5VorvRrwmqFi9AzuSdXQmsKz`.
- Deployment target: `production`.
- Deployment state: `READY`.
- Production alias verified: `www.evanalysis.top`.

Production checks against `https://www.evanalysis.top` passed:

- EN route returned `200` and includes the `Solution sets as intersections`
  video explanation card with source
  `/generated/animations/math1030/equations-solution-sets-story-en.mp4`.
- zh-HK route returned localized page HTML pointing to
  `/generated/animations/math1030/equations-solution-sets-story-zh-hk.mp4`.
- zh-CN route returned localized page HTML pointing to
  `/generated/animations/math1030/equations-solution-sets-story-zh-cn.mp4`.
- EN / zh-HK / zh-CN mp4 assets returned `200` with `video/mp4`.
- EN / zh-HK / zh-CN poster assets returned `200` with `image/png`.
- EN TXT export returned `200`, contained
  `[Static video-study sequence] Solution sets as intersections`, and did not
  leak raw `<video>`, `.mp4`, or `poster=` markup.
- EN PDF export returned `200` with a valid `%PDF` header.
- zh-HK TXT/PDF exports returned `200`.
- zh-CN TXT/PDF exports returned `200`.
