# Manim QA: Math1030 8.1 Eigenvalue Direction and Eigenspace

Date: 2026-06-21

Unit:
`content/textbook/math1030/eigenvalues/eigenvalues-eigenvectors-and-eigenspaces`

Video explanation id:
`math1030-eigenvalue-direction-eigenspace-story`

## Source Scope

- `reference/MATH1030/MATH1030-Notes.pdf`, section 8.1, pages 191-195:
  eigenvalue/eigenvector definition, `Av=λv`, the homogeneous-system
  rewrite `(A-λI)v=0`, eigenspace definition `E_A(λ)=N(A-λI)`, and
  the source matrix `C=[[3,2],[3,-2]]` with eigenvalues `4` and `-3`.
- `reference/MATH1030/1030gi-n07-01.pdf`, pages 1-7: direction-preserving
  definition, nonzero condition, scalar multiples, common-eigenvalue linear
  combinations, null-space formulation, and worked eigenspace examples.
- Excluded from this clip: complex-eigenvalue examples explicitly marked
  skip, algebraic/geometric multiplicity examples, similarity, and
  diagonalization tests.

Source note:

- `MATH1030-Notes.pdf` chooses `(-1,3)` as a basis vector for `E_C(-3)`.
  The page and video use `(1,-3)`. These differ by a nonzero scalar and span
  the same eigenspace.

## Implementation Result

- Added a trilingual Manim scene:
  `tools/animations/manim/scenes/math1030/eigenvalue_direction_eigenspace.py`.
- Rendered localized assets:
  - `public/generated/animations/math1030/eigenvalue-direction-eigenspace-story-en.mp4`
  - `public/generated/animations/math1030/eigenvalue-direction-eigenspace-story-en.png`
  - `public/generated/animations/math1030/eigenvalue-direction-eigenspace-story-zh-hk.mp4`
  - `public/generated/animations/math1030/eigenvalue-direction-eigenspace-story-zh-hk.png`
  - `public/generated/animations/math1030/eigenvalue-direction-eigenspace-story-zh-cn.mp4`
  - `public/generated/animations/math1030/eigenvalue-direction-eigenspace-story-zh-cn.png`
- Added `storyboard.json` in the unit folder.
- Registered localized `videoSrc`, `posterSrc`, frame text, transcript, and
  static export copy in `src/lib/textbook/video-explanations.ts`.
- Embedded `<VideoExplanation />` after the eigenvalue/eigenvector definition
  in English, Traditional Chinese, and Simplified Chinese MDX.
- Kept this pass Manim-only. A widget would be premature for this first
  conceptual bridge; graded eigenspace practice can be considered later.

## Render QA

Commands:

```bash
python3 -m py_compile tools/animations/manim/scenes/math1030/eigenvalue_direction_eigenspace.py
bash -n tools/animations/manim/scripts/render_scene.sh
python3 -m json.tool content/textbook/math1030/eigenvalues/eigenvalues-eigenvectors-and-eigenspaces/storyboard.json
bash tools/animations/manim/scripts/render_scene.sh EigenvalueDirectionEigenspaceStoryEn EigenvalueDirectionEigenspaceStoryZhHk EigenvalueDirectionEigenspaceStoryZhCn
```

Result: passed.

`ffprobe` metadata:

| Locale | Size | FPS | Duration |
| --- | --- | --- | --- |
| `en` | 854x480 | 15 | 11.400s |
| `zh-hk` | 854x480 | 15 | 11.400s |
| `zh-cn` | 854x480 | 15 | 11.400s |

Asset catalog check:

```json
{
  "assetRefs": 138,
  "uniqueAssets": 138,
  "videoGroups": 23,
  "missing": [],
  "incomplete": []
}
```

Visual inspection:

- English and Simplified Chinese posters were inspected directly.
- Mid-video Traditional Chinese null-space frame was inspected after fixing an
  English fallback phrase.
- Poster timestamp was changed to `1.45s` because the default `2.25s` landed
  during a transition frame.
- Page-level screenshot of the embedded video section:
  `/private/tmp/eigenvalue_video_section_en.png`.

## Static QA

Commands:

```bash
git diff --check
npm run verify:mdx-tables
npx tsc --noEmit --pretty false
npm run lint
AUTH_SECRET=local-test-secret npm run build
npm run check:textbook-content
```

Result:

- `git diff --check`: passed.
- `verify:mdx-tables`: passed.
- TypeScript: passed.
- ESLint: passed.
- Production build: passed.
- `check:textbook-content`: exited 0 and checked 243 units with required
  structure present.

Notes:

- Contentlayer now reports 20 skipped `storyboard.json` files, including the
  new 8.1 storyboard. This is expected for the current storyboard storage
  convention.
- `check:textbook-content` still reports existing repository-wide depth and
  article-shape warnings; these are not introduced by this 8.1 video pass.

## Browser QA

Browser plugin availability: absent in this runtime, so QA used the Playwright
fallback required by the frontend testing workflow.

Local server:

```bash
AUTH_SECRET=local-test-secret PORT=3010 npm run start
```

Playwright command:

```bash
node /private/tmp/eigenvalue_direction_video_qa.mjs
```

The first browser launch was blocked by the macOS Chromium Mach-port sandbox.
The same script passed after running with elevated local browser permission.

Checked routes:

- `http://localhost:3010/en/notes/math1030/eigenvalues/eigenvalues-eigenvectors-and-eigenspaces`
- `http://localhost:3010/zh-hk/notes/math1030/eigenvalues/eigenvalues-eigenvectors-and-eigenspaces`
- `http://localhost:3010/zh-cn/notes/math1030/eigenvalues/eigenvalues-eigenvectors-and-eigenspaces`

Playwright results:

| Case | Viewport | Theme | Video src | Poster src | Playback | Overflow |
| --- | --- | --- | --- | --- | --- | --- |
| `en-light-desktop` | 1280x900 | light | `...-en.mp4` | `...-en.png` | advanced to 0.952s | none |
| `en-dark-desktop` | 1280x900 | dark | `...-en.mp4` | `...-en.png` | advanced to 0.952s | none |
| `zh-hk-light-mobile` | 390x844 | light | `...-zh-hk.mp4` | `...-zh-hk.png` | advanced to 0.950s | none |
| `zh-cn-light-desktop` | 1280x900 | light | `...-zh-cn.mp4` | `...-zh-cn.png` | advanced to 0.952s | none |

Notes:

- Framework-overlay check passed.
- No relevant console errors remained after filtering local-only 404 noise and
  expected Next `_rsc` prefetch aborts.
- Video request aborts produced by closing the Playwright context after
  playback were filtered only after playback had advanced successfully.
- Screenshots saved outside the repo:
  - `/private/tmp/eigenvalue_en_light_desktop.png`
  - `/private/tmp/eigenvalue_en_dark_desktop.png`
  - `/private/tmp/eigenvalue_zh_hk_light_mobile.png`
  - `/private/tmp/eigenvalue_zh_cn_light_desktop.png`
  - `/private/tmp/eigenvalue_video_section_en.png`

## Export QA

TXT endpoint:

`/api/textbook-export/en/math1030/eigenvalues/eigenvalues-eigenvectors-and-eigenspaces`

Result:

- Status `200`.
- 12,411 characters.
- Includes static video explanation title and frame text.
- Does not leak `<video>` tags or `.mp4` paths.

PDF endpoint:

`/api/textbook-export/en/math1030/eigenvalues/eigenvalues-eigenvectors-and-eigenspaces/pdf`

Result:

- Status `200`.
- `%PDF` header present.
- 42,791 bytes.

## QA Verdict

Passed for local render, trilingual asset presence, poster quality, page
integration, dark/light mode, mobile layout, playback, and TXT/PDF export
fallback.
