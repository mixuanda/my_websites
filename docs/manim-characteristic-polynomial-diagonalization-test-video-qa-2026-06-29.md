# Manim QA: Math1030 8.3 Characteristic Polynomials and Diagonalization Tests

Date: 2026-06-29

Unit:
`content/textbook/math1030/eigenvalues/characteristic-polynomials-and-diagonalization-tests`

Video explanation id:
`math1030-characteristic-polynomial-diagonalization-test-story`

## Source Scope

- `reference/MATH1030/MATH1030-Notes.pdf`, pages 202-206:
  diagonalization criterion, distinct-eigenvalue theorem, algebraic/geometric
  multiplicity remarks, corollary for `n` distinct eigenvalues, the
  non-diagonalizable repeated-root example `B=[[2,3],[0,2]]`, and
  diagonalizable repeated-eigenvalue examples.
- `reference/MATH1030/1030gi-n07-03.pdf`, pages 1-5:
  characteristic polynomial definition `p_A(x)=det(A-xI)`, root/eigenvalue
  equivalence, degree / leading-coefficient / constant-term shape, source
  characteristic-polynomial examples, distinct-eigenvalue test, and eigenspace
  dimension-sum criterion.
- `reference/MATH1030/1030gi-n07-02.pdf`, pages 2-5:
  diagonalizability examples and the full-eigenbasis criterion.
- Excluded from this clip: Cayley-Hamilton proof and power-reduction
  applications, complex eigenvalue examples, and a general symbolic
  characteristic-polynomial calculator.

## Implementation Result

- Added a trilingual Manim scene:
  `tools/animations/manim/scenes/math1030/characteristic_polynomials_diagonalization_tests.py`.
- Rendered localized assets:
  - `public/generated/animations/math1030/characteristic-polynomial-diagonalization-test-story-en.mp4`
  - `public/generated/animations/math1030/characteristic-polynomial-diagonalization-test-story-en.png`
  - `public/generated/animations/math1030/characteristic-polynomial-diagonalization-test-story-zh-hk.mp4`
  - `public/generated/animations/math1030/characteristic-polynomial-diagonalization-test-story-zh-hk.png`
  - `public/generated/animations/math1030/characteristic-polynomial-diagonalization-test-story-zh-cn.mp4`
  - `public/generated/animations/math1030/characteristic-polynomial-diagonalization-test-story-zh-cn.png`
- Added `storyboard.json` in the unit folder.
- Registered localized `videoSrc`, `posterSrc`, frame text, transcript, and
  static export copy in `src/lib/textbook/video-explanations.ts`.
- Embedded `<VideoExplanation />` after the root/eigenvalue equivalence in
  English, Traditional Chinese, and Simplified Chinese MDX.
- Tightened the dimension-sum theorem wording so the listed real eigenvalues
  are explicitly all distinct eigenvalues of the matrix.
- Kept this pass Manim-only. A widget would mainly become a symbolic
  characteristic-polynomial calculator; the source-backed learning move is a
  fixed determinant-to-multiplicity-to-diagonalizability decision chain.

## Render QA

Commands:

```bash
python3 -m py_compile tools/animations/manim/scenes/math1030/characteristic_polynomials_diagonalization_tests.py
bash -n tools/animations/manim/scripts/render_scene.sh
python3 -m json.tool content/textbook/math1030/eigenvalues/characteristic-polynomials-and-diagonalization-tests/storyboard.json
bash tools/animations/manim/scripts/render_scene.sh CharacteristicPolynomialDiagonalizationTestStoryEn CharacteristicPolynomialDiagonalizationTestStoryZhHk CharacteristicPolynomialDiagonalizationTestStoryZhCn
```

Result: passed.

`ffprobe` metadata:

| Locale | Size | FPS | Duration |
| --- | --- | --- | --- |
| `en` | 854x480 | 15 | 14.733s |
| `zh-hk` | 854x480 | 15 | 14.733s |
| `zh-cn` | 854x480 | 15 | 14.733s |

Asset catalog check:

```json
{
  "assetRefs": 150,
  "uniqueAssets": 150,
  "videoGroups": 25,
  "missing": [],
  "incomplete": []
}
```

Visual inspection:

- English poster frame was inspected directly.
- Simplified Chinese repeated-root mid-video frame was inspected after fixing
  an English fallback phrase.
- Traditional Chinese late-video decision-test frame was inspected after the
  same localization fix.
- Page-level screenshot of the embedded video section:
  `/private/tmp/characteristic_en-light-desktop.png`.

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

- Contentlayer now reports 22 skipped `storyboard.json` files, including the
  new 8.3 storyboard. This is expected for the current storyboard storage
  convention.
- `check:textbook-content` still reports existing repository-wide depth and
  article-shape warnings; these are not introduced by this 8.3 video pass.

## Browser QA

Browser plugin availability: absent in this runtime, so QA used the Playwright
fallback required by the frontend testing workflow.

Local server:

```bash
AUTH_SECRET=local-test-secret PORT=3010 npm run start
```

Playwright command:

```bash
NODE_PATH=/Users/evan/.npm/_npx/420ff84f11983ee5/node_modules node <inline characteristic-polynomial QA script>
```

Checked routes:

- `http://localhost:3010/en/notes/math1030/eigenvalues/characteristic-polynomials-and-diagonalization-tests`
- `http://localhost:3010/zh-hk/notes/math1030/eigenvalues/characteristic-polynomials-and-diagonalization-tests`
- `http://localhost:3010/zh-cn/notes/math1030/eigenvalues/characteristic-polynomials-and-diagonalization-tests`

Playwright results:

| Case | Viewport | Theme | Video src | Poster src | Playback | Overflow / console |
| --- | --- | --- | --- | --- | --- | --- |
| `en-light-desktop` | 1280x900 | light | `...-en.mp4` | `...-en.png` | advanced to 1.202s | none |
| `en-dark-desktop` | 1280x900 | dark | `...-en.mp4` | `...-en.png` | advanced to 1.202s | none |
| `zh-hk-light-mobile` | 390x844 | light | `...-zh-hk.mp4` | `...-zh-hk.png` | advanced to 1.203s | none |
| `zh-cn-light-desktop` | 1280x900 | light | `...-zh-cn.mp4` | `...-zh-cn.png` | advanced to 1.202s | none |

Notes:

- A first strict overflow script counted horizontally scrollable KaTeX display
  math and empty decorative background elements. The refined QA script ignored
  scrollable math containers and empty absolute decoration, then passed with no
  real layout overflow.
- No relevant console errors, bad HTTP responses, or request failures remained
  after filtering expected local-only analytics / favicon noise.
- Screenshots saved outside the repo:
  - `/private/tmp/characteristic_refined_en-light-desktop.png`
  - `/private/tmp/characteristic_refined_en-dark-desktop.png`
  - `/private/tmp/characteristic_refined_zh-hk-light-mobile.png`
  - `/private/tmp/characteristic_refined_zh-cn-light-desktop.png`

## Export QA

TXT endpoint:

`/api/textbook-export/en/math1030/eigenvalues/characteristic-polynomials-and-diagonalization-tests`

Result:

- Status `200`.
- 11,541 characters.
- Includes static video explanation title and frame text, including
  `From characteristic roots to diagonalization tests`,
  `Determinant pipeline`, and `Dimension-sum test`.
- Does not leak `<video>` tags or `.mp4` paths.

PDF endpoint:

`/api/textbook-export/en/math1030/eigenvalues/characteristic-polynomials-and-diagonalization-tests/pdf`

Result:

- Status `200`.
- `%PDF` header present.
- 40,248 bytes.

## QA Verdict

Passed for local render, trilingual asset presence, poster/frame quality, page
integration, dark/light mode, mobile layout, playback, and TXT/PDF export
fallback.
