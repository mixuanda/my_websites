# MATH1030 Homogeneous Systems and Null Space Video QA

Date: 2026-07-01

Scope: Math1030 `4.1 Homogeneous systems and null space`.

Video id: `math1030-homogeneous-systems-null-space-story`.

## Source Boundary

Reviewed source material:

- `reference/MATH1030/MATH1030-Notes.pdf` §4.1 pp. 62-68.
- `reference/MATH1030/MATH1030-Notes.pdf` §4.2 pp. 69-70.
- `reference/MATH1030/1030gi-n02-04.pdf` pp. 7-8.
- `reference/MATH1030/1030gi-n04-01.pdf` pp. 4-7.
- `reference/MATH1030/1030gi-n04-03.pdf` pp. 1-5.

Included in the clip:

- `Ax=0` is always consistent;
- `x=0` is the trivial solution;
- the zero augmented column remains zero during row operations;
- RREF free variables become null-space direction vectors;
- `N(A)={x:Ax=0}` as the full solution set;
- a nonhomogeneous solution set is `x_p + N(A)` when one particular solution
  exists;
- null-space size controls uniqueness versus freedom.

Deferred intentionally:

- singular/nonsingular invertibility theory;
- rank-nullity;
- eigenspace applications;
- full set-language equality, subset, and intersection proofs;
- open-ended null-space solver widgets.

## Assets

Generated files:

- `public/generated/animations/math1030/homogeneous-systems-null-space-story-en.mp4`
- `public/generated/animations/math1030/homogeneous-systems-null-space-story-en.png`
- `public/generated/animations/math1030/homogeneous-systems-null-space-story-zh-hk.mp4`
- `public/generated/animations/math1030/homogeneous-systems-null-space-story-zh-hk.png`
- `public/generated/animations/math1030/homogeneous-systems-null-space-story-zh-cn.mp4`
- `public/generated/animations/math1030/homogeneous-systems-null-space-story-zh-cn.png`

Media metadata:

| Locale | MP4 size | Poster size | Duration | Dimensions |
| --- | ---: | ---: | ---: | --- |
| EN | 416909 bytes | 85933 bytes | 7.933s | 854 x 480 |
| zh-HK | 356377 bytes | 70616 bytes | 7.933s | 854 x 480 |
| zh-CN | 349701 bytes | 69964 bytes | 7.933s | 854 x 480 |

Poster extraction uses `2.35s`, which lands on the stable RREF/free-variable
frame. Visual inspection of EN / zh-HK / zh-CN posters showed no crossfade
residue, text overflow, or label overlap.

## Local Verification

Static checks passed:

- `python3 -m py_compile tools/animations/manim/scenes/math1030/homogeneous_systems_null_space.py`
- `python3 -m json.tool content/textbook/math1030/solution-structure/homogeneous-systems-and-null-space/storyboard.json`
- `bash -n tools/animations/manim/scripts/render_scene.sh`
- `git diff --check`
- `npm run verify:mdx-tables`
- `npx tsc --noEmit --pretty false`
- `npm run lint`
- `npm run check:textbook-content`
- `AUTH_SECRET=local-test-secret npm run build`

Manim render passed:

- `npm run animation:manim:render -- HomogeneousSystemsNullSpaceStoryEn HomogeneousSystemsNullSpaceStoryZhHk HomogeneousSystemsNullSpaceStoryZhCn`

## Browser QA

The Codex in-app Browser was listed, but its Playwright browser handle was
disconnected and could not create a page/context. Browser QA therefore used the
bundled Playwright package with headless Chrome against `http://127.0.0.1:3000`.

Local route checks passed for:

| Locale | Route | Video count | Video size | Mobile size | Overflow | Actionable console errors |
| --- | --- | ---: | --- | --- | ---: | ---: |
| EN | `/en/notes/math1030/solution-structure/homogeneous-systems-and-null-space` | 1 | 560 x 315 | 306 x 172 | 0 | 0 |
| zh-HK | `/zh-hk/notes/math1030/solution-structure/homogeneous-systems-and-null-space` | 1 | 560 x 315 | 306 x 172 | 0 | 0 |
| zh-CN | `/zh-cn/notes/math1030/solution-structure/homogeneous-systems-and-null-space` | 1 | 560 x 315 | 306 x 172 | 0 | 0 |

Each route exposed the expected locale-specific MP4 and PNG:

- `homogeneous-systems-null-space-story-en`
- `homogeneous-systems-null-space-story-zh-hk`
- `homogeneous-systems-null-space-story-zh-cn`

The video card is embedded after the first null-space worked example and
before the nonhomogeneous-solution theorem. No quick-check, exercise, or
reveal-solution block was reordered. The local-only
`/_vercel/insights/script.js` 404 from `next start` was observed and ignored as
existing analytics noise; no page error, framework overlay, video asset error,
or layout overflow was found.

## Export QA

Local TXT/PDF checks passed for:

- `/api/textbook-export/en/math1030/solution-structure/homogeneous-systems-and-null-space`
- `/api/textbook-export/en/math1030/solution-structure/homogeneous-systems-and-null-space/pdf`
- `/api/textbook-export/zh-hk/math1030/solution-structure/homogeneous-systems-and-null-space`
- `/api/textbook-export/zh-hk/math1030/solution-structure/homogeneous-systems-and-null-space/pdf`
- `/api/textbook-export/zh-cn/math1030/solution-structure/homogeneous-systems-and-null-space`
- `/api/textbook-export/zh-cn/math1030/solution-structure/homogeneous-systems-and-null-space/pdf`

TXT exports contain the localized static video-study sequence markers:

- `[Static video-study sequence] Homogeneous systems and null space`
- `[靜態影片學習序列] 齊次方程組與零空間`
- `[静态视频学习序列] 齐次方程组与零空间`

TXT exports do not leak raw `<video>`, `.mp4`, poster attributes, or the
internal video id. PDF exports returned valid `%PDF` headers.

Local export sizes:

| Locale | TXT bytes | PDF bytes |
| --- | ---: | ---: |
| EN | 15801 | 48859 |
| zh-HK | 13751 | 183175 |
| zh-CN | 13762 | 168426 |

## Production Verification

Pending after the branch is committed, pushed to `codex/manim`, and
fast-forwarded to `main`.
