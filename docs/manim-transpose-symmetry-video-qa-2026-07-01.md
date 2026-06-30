# MATH1030 Transpose / Symmetry Video QA

Date: 2026-07-01

Component id: `math1030-transpose-symmetry-story`

Shared units:

- `math1030/matrix-algebra/transpose-and-special-matrices`
- `math1030/matrix-algebra/transposes-and-symmetric-matrices`

## Source Boundary

This pass uses the shared source-backed overlap between the two transpose
units:

- transpose as index swap `(A^T)_{ji}=a_{ij}`;
- square-matrix transpose as reflection across the main diagonal;
- symmetric matrices `A^T=A`;
- skew-symmetric matrices `A^T=-A`;
- zero diagonal entries for skew-symmetric matrices;
- product-order reversal `(AB)^T=B^T A^T`;
- the decomposition
  `A=1/2(A+A^T)+1/2(A-A^T)`.

Reference evidence used:

- `reference/MATH1030/MATH1030-Notes.pdf` pp. 47-50;
- `reference/MATH1030/1030gi-n01-03.pdf` pp. 1-4;
- `reference/MATH1030/1030efghi-tutorial-week04.pdf` p. 1;
- `reference/MATH1030/1030gi-n01-se0304.pdf` pp. 1-4;
- Practice Set 3 transpose / symmetry exercises.

Explicit exclusions:

- full diagonal / triangular / identity / elementary matrix family
  recognition;
- orthogonal matrices and commuting-matrix extensions;
- block matrices;
- determinant transpose / column-operation material.

Those remain separate roadmap items where source-backed.

## Files Added Or Updated

- `tools/animations/manim/scenes/math1030/transpose_symmetry.py`
- `tools/animations/manim/scripts/render_scene.sh`
- `content/textbook/math1030/matrix-algebra/transpose-and-special-matrices/storyboard.json`
- `src/lib/textbook/video-explanations.ts`
- `content/textbook/math1030/matrix-algebra/transpose-and-special-matrices/{en,zh-hk,zh-cn}.mdx`
- `content/textbook/math1030/matrix-algebra/transposes-and-symmetric-matrices/{en,zh-hk,zh-cn}.mdx`
- `docs/video-explanation-implementation-roadmap.md`
- `docs/reference-coverage.md`
- `docs/notes-content-supplement-workflow.md`
- `docs/interactive-component-behavior.md`
- `docs/rendering-formatting-qa.md`
- `docs/exercise-solution-integrity.md`
- `docs/notes-improvement-tracker.md`
- `docs/manim-workstream-checkpoint-2026-05-25.md`

## Generated Assets

- `/generated/animations/math1030/transpose-symmetry-story-en.mp4`
- `/generated/animations/math1030/transpose-symmetry-story-en.png`
- `/generated/animations/math1030/transpose-symmetry-story-zh-hk.mp4`
- `/generated/animations/math1030/transpose-symmetry-story-zh-hk.png`
- `/generated/animations/math1030/transpose-symmetry-story-zh-cn.mp4`
- `/generated/animations/math1030/transpose-symmetry-story-zh-cn.png`

Media metadata:

| Locale | Duration | MP4 size | Poster size |
| --- | ---: | ---: | ---: |
| EN | 8.20s | 458K | 89K |
| zh-HK | 8.20s | 444K | 78K |
| zh-CN | 8.20s | 434K | 77K |

Generated animation directory size after this pass:

- `public/generated/animations`: 61M
- `public/generated/animations/math1030`: 48M

## Visual QA

Initial poster extraction at the default `2.25s` landed on a transition frame,
leaving crossfade residue. The render script now pins this scene's poster time
to `1.6s`.

Verified poster and representative frame paths:

- `/tmp/transpose-video-frames/en-1.6.png`
- `/tmp/transpose-video-frames/zh-hk-1.6.png`
- `/tmp/transpose-video-frames/zh-cn-1.6.png`
- `/tmp/transpose-video-frames/en-5.8.png`
- `/tmp/transpose-video-frames/en-7.0.png`

Result: localized posters are stable, readable, and free of transition
residue. Mid-video stable frames for product-order reversal and the
symmetric/skew split are readable.

## Static Checks

Passed:

- `python3 -m py_compile tools/animations/manim/scenes/math1030/transpose_symmetry.py`
- `python3 -m json.tool content/textbook/math1030/matrix-algebra/transpose-and-special-matrices/storyboard.json`
- `bash -n tools/animations/manim/scripts/render_scene.sh`
- `git diff --check`
- `npm run verify:mdx-tables`
- `npx tsc --noEmit --pretty false`
- `npm run lint`
- `npm run check:textbook-content`
- `AUTH_SECRET=local-test-secret npm run build`

Notes:

- `npm run check:textbook-content` still reports the existing cross-course
  depth / structure warnings, but exits successfully with `required structure
  present`.
- `npm run build` reports the expected Contentlayer warning that storyboard
  JSON files are skipped as non-document files; the build succeeds and
  generates 328 static pages.

## Browser QA

Environment:

- Local production server: `http://localhost:3013`
- Browser path: in-app Browser plugin
- Desktop viewport: default `1280 x 720`
- Mobile viewport: `390 x 844`

Route checks:

| Route | Video count | Expected MP4 | Expected poster | Overlay | Console |
| --- | ---: | --- | --- | --- | --- |
| `/en/notes/math1030/matrix-algebra/transpose-and-special-matrices` | 1 | pass | pass | none | clean |
| `/zh-hk/notes/math1030/matrix-algebra/transpose-and-special-matrices` | 1 | pass | pass | none | clean |
| `/zh-cn/notes/math1030/matrix-algebra/transpose-and-special-matrices` | 1 | pass | pass | none | clean |
| `/en/notes/math1030/matrix-algebra/transposes-and-symmetric-matrices` | 1 | pass | pass | none | clean |
| `/zh-hk/notes/math1030/matrix-algebra/transposes-and-symmetric-matrices` | 1 | pass | pass | none | clean |
| `/zh-cn/notes/math1030/matrix-algebra/transposes-and-symmetric-matrices` | 1 | pass | pass | none | clean |

Interaction proof:

- On EN `transposes-and-symmetric-matrices`, clicked the
  `Skew-symmetric` button in the existing `transpose-symmetry-lab`.
- Verified exactly one target button.
- Verified the lab changed to the skew-symmetric explanation and displayed
  `A^T = -A`.

Responsive / theme proof:

- Mobile zh-CN `390 x 844`: `scrollWidth` equals `clientWidth` (`390`), video
  width is `306px`, and the localized poster / MP4 are present.
- Dark-mode EN page: clicked `Switch to dark mode`; `html.dark` was applied,
  video and lab remained visible, and no horizontal overflow or console issues
  appeared.

Screenshot artifacts:

- `/tmp/transpose-symmetry-desktop-en.png`
- `/tmp/transpose-symmetry-mobile-video-zh-cn.png`
- `/tmp/transpose-symmetry-dark-en.png`

## Export QA

Checked TXT and PDF exports for both units in EN, zh-HK, and zh-CN.

| Locale | Unit | TXT bytes | PDF bytes |
| --- | --- | ---: | ---: |
| EN | `transpose-and-special-matrices` | 15480 | 50778 |
| zh-HK | `transpose-and-special-matrices` | 13764 | 179302 |
| zh-CN | `transpose-and-special-matrices` | 13767 | 166048 |
| EN | `transposes-and-symmetric-matrices` | 7127 | 28254 |
| zh-HK | `transposes-and-symmetric-matrices` | 6740 | 145751 |
| zh-CN | `transposes-and-symmetric-matrices` | 6840 | 135618 |

Export checks passed:

- every PDF begins with `%PDF`;
- every TXT export includes the localized static video-study title;
- no TXT export leaks `<video`, `.mp4`, `math1030-transpose-symmetry-story`,
  or `transpose-symmetry-lab`.

## Result

Local QA passed. The same shared video can be shipped on both target pages.
`special-matrices` remains the next unresolved Math1030 matrix-algebra video
slice.
