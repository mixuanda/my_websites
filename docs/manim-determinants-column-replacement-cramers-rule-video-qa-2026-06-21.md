# Manim QA: Math1030 7.3 Cramer Column Replacement

Date: 2026-06-21

Unit:
`content/textbook/math1030/determinants/transpose-column-operations-and-cramers-rule`

Video explanation id:
`math1030-determinants-column-replacement-cramers-rule-story`

## Source Scope

- `reference/MATH1030/MATH1030-Notes.pdf`, pages 187-190: adjoint formula,
  Cramer's rule, and the source `3x3` worked system with
  `det(A)=6`, `det(M_1)=15`, `det(M_2)=-6`, `det(M_3)=3`.
- `reference/MATH1030/1030gi-n06-03.pdf`, pages 5-9: column-operation
  determinant rules and repeated-column cancellation support.

## Implementation Result

- Added a trilingual Manim scene:
  `tools/animations/manim/scenes/math1030/determinants_column_replacement_cramers_rule.py`.
- Rendered localized assets:
  - `public/generated/animations/math1030/determinants-column-replacement-cramers-rule-story-en.mp4`
  - `public/generated/animations/math1030/determinants-column-replacement-cramers-rule-story-en.png`
  - `public/generated/animations/math1030/determinants-column-replacement-cramers-rule-story-zh-hk.mp4`
  - `public/generated/animations/math1030/determinants-column-replacement-cramers-rule-story-zh-hk.png`
  - `public/generated/animations/math1030/determinants-column-replacement-cramers-rule-story-zh-cn.mp4`
  - `public/generated/animations/math1030/determinants-column-replacement-cramers-rule-story-zh-cn.png`
- Added `storyboard.json` in the unit folder.
- Embedded `<VideoExplanation />` after the opening motivation in English,
  Traditional Chinese, and Simplified Chinese MDX.
- Kept this pass Manim-only. A widget would mainly duplicate determinant
  calculation; the source-backed learning move is the fixed proof mechanism:
  replace one column by `b`, split by column linearity, cancel repeated-column
  determinants, and divide by `det(A)`.

## Render QA

Commands:

```bash
python3 -m py_compile tools/animations/manim/scenes/math1030/determinants_column_replacement_cramers_rule.py
bash -n tools/animations/manim/scripts/render_scene.sh
bash tools/animations/manim/scripts/render_scene.sh DeterminantsColumnReplacementCramersRuleStoryEn DeterminantsColumnReplacementCramersRuleStoryZhHk DeterminantsColumnReplacementCramersRuleStoryZhCn
```

Result: passed.

`ffprobe` metadata:

| Locale | Size | FPS | Duration |
| --- | --- | --- | --- |
| `en` | 854x480 | 15 | 11.400s |
| `zh-hk` | 854x480 | 15 | 11.399678s |
| `zh-cn` | 854x480 | 15 | 11.399678s |

Asset catalog check:

```json
{
  "assetRefs": 132,
  "uniqueAssets": 132,
  "videoGroups": 22,
  "missing": [],
  "incomplete": []
}
```

Visual inspection:

- Poster images are readable in all three locales.
- Mid-video frames were inspected for the replacement, repeated-column
  cancellation, and source-example stages.
- A pre-QA wording issue was fixed before shipping: the general formula card
  label no longer says `ratio` on every frame, and the repeated-column
  `keep` label is localized as `保留` in Chinese.

## Static QA

Commands:

```bash
npm run verify:mdx-tables
npx tsc --noEmit --pretty false
npm run lint
AUTH_SECRET=local-test-secret npm run build
npm run check:textbook-content
git diff --check
```

Result:

- `verify:mdx-tables`: passed.
- TypeScript: passed.
- ESLint: passed.
- Production build: passed.
- `check:textbook-content`: passed required structure, with the existing
  repository-wide content-depth warnings still present.
- Build warnings about `storyboard.json` files being skipped by Contentlayer
  remain expected for the current storyboard convention.

## Browser QA

Browser plugin availability: absent in this runtime, so QA used the Playwright
fallback required by the frontend testing workflow.

Local server:

```bash
AUTH_SECRET=local-test-secret PORT=3010 npm run start
```

Playwright command:

```bash
node /private/tmp/cramers_rule_video_qa.mjs
```

The first non-escalated run was blocked by the macOS Chromium Mach-port
sandbox. The same script passed after running with elevated local browser
permission.

Checked routes:

- `http://localhost:3010/en/notes/math1030/determinants/transpose-column-operations-and-cramers-rule`
- `http://localhost:3010/zh-hk/notes/math1030/determinants/transpose-column-operations-and-cramers-rule`
- `http://localhost:3010/zh-cn/notes/math1030/determinants/transpose-column-operations-and-cramers-rule`

Playwright results:

| Case | Viewport | Theme | Video src | Poster src | Playback | Overflow |
| --- | --- | --- | --- | --- | --- | --- |
| `en-light-desktop` | 1280x900 | light | `...-en.mp4` | `...-en.png` | advanced to 0.852s | none |
| `en-dark-desktop` | 1280x900 | dark | `...-en.mp4` | `...-en.png` | advanced to 0.851s | none |
| `zh-hk-light-mobile` | 390x844 | light | `...-zh-hk.mp4` | `...-zh-hk.png` | advanced to 0.852s | none |
| `zh-cn-light-desktop` | 1280x900 | light | `...-zh-cn.mp4` | `...-zh-cn.png` | advanced to 0.851s | none |

Notes:

- No unignored 4xx responses or relevant console errors were found.
- Local `next start` produces a Vercel Analytics 404 for
  `/_vercel/insights/script.js`; this is local-only and unrelated to the
  video assets.
- Screenshots saved outside the repo:
  - `/private/tmp/cramers_en_light_desktop.png`
  - `/private/tmp/cramers_en_dark_desktop.png`
  - `/private/tmp/cramers_zh_hk_light_mobile.png`
  - `/private/tmp/cramers_zh_cn_light_desktop.png`

## Export QA

TXT endpoint:

`/api/textbook-export/en/math1030/determinants/transpose-column-operations-and-cramers-rule`

Result:

- Status `200`.
- 10,474 characters.
- Includes the static video explanation title and frame text.
- Does not leak `<video>` tags or `.mp4` paths.

PDF endpoint:

`/api/textbook-export/en/math1030/determinants/transpose-column-operations-and-cramers-rule/pdf`

Result:

- Status `200`.
- `Content-Type: application/pdf`.
- `%PDF` header present.
- 40,040 bytes.

## QA Verdict

Passed for local render, asset presence, page integration, dark/light mode,
mobile layout, playback, and TXT/PDF export fallback.
