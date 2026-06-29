# Manim QA: Math1030 8.2 Diagonalization and Similarity

Date: 2026-06-29

Unit:
`content/textbook/math1030/eigenvalues/diagonalization-and-similarity`

Video explanation id:
`math1030-diagonalization-similarity-eigenbasis-story`

## Source Scope

- `reference/MATH1030/MATH1030-Notes.pdf`, sections 8.2-8.3, pages 199-204:
  similarity definition, characteristic-polynomial preservation theorem,
  diagonalizable matrix definition, the diagonalization characterization
  `AS=SD` / `S^{-1}AS=D`, and the source matrix
  `C=[[3,2],[3,-2]]` with eigenvectors `(2,1)` and `(-1,3)`.
- `reference/MATH1030/1030gi-n07-02.pdf`, pages 1-6: diagonalization and
  diagonalizability definitions, `AU=UD` column-package theorem, examples of
  diagonalizable and non-diagonalizable matrices, and powers of diagonalizable
  matrices.
- `reference/MATH1030/1030gi-n07-03.pdf`, pages 4-5: eigenspace-dimension
  criterion and the relationship between a full eigenbasis and
  diagonalizability.
- Excluded from this clip: the full characteristic-polynomial pipeline,
  algebraic/geometric multiplicity tests, and complex diagonalization examples.
  These belong to the next 8.3 slice or later examples.

## Implementation Result

- Added a trilingual Manim scene:
  `tools/animations/manim/scenes/math1030/diagonalization_similarity.py`.
- Rendered localized assets:
  - `public/generated/animations/math1030/diagonalization-similarity-eigenbasis-story-en.mp4`
  - `public/generated/animations/math1030/diagonalization-similarity-eigenbasis-story-en.png`
  - `public/generated/animations/math1030/diagonalization-similarity-eigenbasis-story-zh-hk.mp4`
  - `public/generated/animations/math1030/diagonalization-similarity-eigenbasis-story-zh-hk.png`
  - `public/generated/animations/math1030/diagonalization-similarity-eigenbasis-story-zh-cn.mp4`
  - `public/generated/animations/math1030/diagonalization-similarity-eigenbasis-story-zh-cn.png`
- Added `storyboard.json` in the unit folder.
- Registered localized `videoSrc`, `posterSrc`, frame text, transcript, and
  static export copy in `src/lib/textbook/video-explanations.ts`.
- Embedded `<VideoExplanation />` after the `AS=SD` explanation in English,
  Traditional Chinese, and Simplified Chinese MDX.
- Kept this pass Manim-only. A widget would be premature here because the
  source-backed move is a fixed eigenbasis-to-similarity bridge, not an
  open-ended diagonalization calculator.

## Render QA

Commands:

```bash
python3 -m py_compile tools/animations/manim/scenes/math1030/diagonalization_similarity.py
bash -n tools/animations/manim/scripts/render_scene.sh
python3 -m json.tool content/textbook/math1030/eigenvalues/diagonalization-and-similarity/storyboard.json
bash tools/animations/manim/scripts/render_scene.sh DiagonalizationSimilarityEigenbasisStoryEn DiagonalizationSimilarityEigenbasisStoryZhHk DiagonalizationSimilarityEigenbasisStoryZhCn
```

Result: passed.

`ffprobe` metadata:

| Locale | Size | FPS | Duration |
| --- | --- | --- | --- |
| `en` | 854x480 | 15 | 14.333s |
| `zh-hk` | 854x480 | 15 | 14.332s |
| `zh-cn` | 854x480 | 15 | 14.333s |

Asset catalog check:

```json
{
  "assetRefs": 144,
  "uniqueAssets": 144,
  "videoGroups": 24,
  "missing": [],
  "incomplete": []
}
```

Visual inspection:

- English poster was inspected directly.
- Simplified Chinese mid-video and Traditional Chinese late-video frames were
  inspected after fixing English fallback card text in the Chinese renders.
- Page-level screenshot of the embedded video section:
  `/private/tmp/diagonalization_video_section_en.png`.

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

- Contentlayer now reports 21 skipped `storyboard.json` files, including the
  new 8.2 storyboard. This is expected for the current storyboard storage
  convention.
- `check:textbook-content` still reports existing repository-wide depth and
  article-shape warnings; these are not introduced by this 8.2 video pass.

## Browser QA

Browser plugin availability: absent in this runtime, so QA used the Playwright
fallback required by the frontend testing workflow.

Local server:

```bash
AUTH_SECRET=local-test-secret PORT=3010 npm run start
```

Playwright command:

```bash
NODE_PATH=/Users/evan/.npm/_npx/420ff84f11983ee5/node_modules node /private/tmp/diagonalization_similarity_video_qa.cjs
```

Checked routes:

- `http://localhost:3010/en/notes/math1030/eigenvalues/diagonalization-and-similarity`
- `http://localhost:3010/zh-hk/notes/math1030/eigenvalues/diagonalization-and-similarity`
- `http://localhost:3010/zh-cn/notes/math1030/eigenvalues/diagonalization-and-similarity`

Playwright results:

| Case | Viewport | Theme | Video src | Poster src | Playback | Overflow |
| --- | --- | --- | --- | --- | --- | --- |
| `en-light-desktop` | 1280x900 | light | `...-en.mp4` | `...-en.png` | advanced to 1.206s | none |
| `en-dark-desktop` | 1280x900 | dark | `...-en.mp4` | `...-en.png` | advanced to 1.209s | none |
| `zh-hk-light-mobile` | 390x844 | light | `...-zh-hk.mp4` | `...-zh-hk.png` | advanced to 1.209s | none |
| `zh-cn-light-desktop` | 1280x900 | light | `...-zh-cn.mp4` | `...-zh-cn.png` | advanced to 1.210s | none |

Notes:

- Framework-overlay check passed.
- No relevant console errors or request failures remained after filtering
  expected Next `_rsc` prefetch aborts and media aborts caused by context close.
- Screenshots saved outside the repo:
  - `/private/tmp/diagonalization_en-light-desktop.png`
  - `/private/tmp/diagonalization_en-dark-desktop.png`
  - `/private/tmp/diagonalization_zh-hk-light-mobile.png`
  - `/private/tmp/diagonalization_zh-cn-light-desktop.png`
  - `/private/tmp/diagonalization_video_section_en.png`

## Export QA

TXT endpoint:

`/api/textbook-export/en/math1030/eigenvalues/diagonalization-and-similarity`

Result:

- Status `200`.
- 12,225 characters.
- Includes static video explanation title and frame text, including
  `Source eigenbasis`, `CS=SD`, and `S^{-1}CS=D`.
- Does not leak `<video>` tags or `.mp4` paths.

PDF endpoint:

`/api/textbook-export/en/math1030/eigenvalues/diagonalization-and-similarity/pdf`

Result:

- Status `200`.
- `%PDF` header present.
- 40,171 bytes.

## QA Verdict

Passed for local render, trilingual asset presence, poster/frame quality, page
integration, dark/light mode, mobile layout, playback, and TXT/PDF export
fallback.
