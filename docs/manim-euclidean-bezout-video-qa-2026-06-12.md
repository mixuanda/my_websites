# Manim Euclidean-Bézout Video QA - 2026-06-12

## Scope

- Unit: `math1025/integer-methods/divisibility-gcd-and-integer-equations`
- Video id: `math1025-euclidean-bezout-integer-equation-story`
- Mode: Manim
- Local branch: `codex/manim`

This slice adds a trilingual Math1025 `VideoExplanation` after the
back-substitution worked example and before the formal Bézout identity theorem.
The clip explains the same Euclidean division equations in two directions:
downward to find the last nonzero remainder and upward to obtain a concrete
Bézout combination.

## Source Support

The read-only scout and local checks confirmed source support in:

- `docs/reference-coverage.md`
  - Math1025 chapter 7 is incorporated from `MATH1025_slides_ch7.pdf`.
- `docs/extracted/math1025/MATH1025_slides_ch7.txt`
  - division algorithm
  - gcd preservation under the Euclidean step
  - worked Euclidean example for `7224` and `1290`
  - coefficient recurrence / back-substitution
  - Bézout identity
  - Diophantine solvability condition

Deferred from this short clip:

- full proof of the division algorithm
- prime-factor exponent form of the gcd
- Euclid's lemma and the fundamental theorem of arithmetic
- full solution-family parameterization for `ax+by=c`
- rational / irrational number proof sequences from Math1025 `7.2`

## Assets

Rendered with:

```bash
bash tools/animations/manim/scripts/render_scene.sh EuclideanBezoutIntegerEquationStoryEn EuclideanBezoutIntegerEquationStoryZhHk EuclideanBezoutIntegerEquationStoryZhCn
```

Generated assets:

- `public/generated/animations/math1025/euclidean-bezout-integer-equation-story-en.mp4`
- `public/generated/animations/math1025/euclidean-bezout-integer-equation-story-en.png`
- `public/generated/animations/math1025/euclidean-bezout-integer-equation-story-zh-hk.mp4`
- `public/generated/animations/math1025/euclidean-bezout-integer-equation-story-zh-hk.png`
- `public/generated/animations/math1025/euclidean-bezout-integer-equation-story-zh-cn.mp4`
- `public/generated/animations/math1025/euclidean-bezout-integer-equation-story-zh-cn.png`

Final `ffprobe` results:

| Locale | Codec | Size | Duration | File size |
| --- | --- | --- | --- | --- |
| EN | h264 | 854x480 | 11.066344s | 585663 bytes |
| zh-HK | h264 | 854x480 | 11.066344s | 528987 bytes |
| zh-CN | h264 | 854x480 | 11.066344s | 525473 bytes |

## Visual QA

Inspected frames:

- `/tmp/my_websites_euclidean_bezout_video_qa/en-start.png`
- `/tmp/my_websites_euclidean_bezout_video_qa/en-chain.png`
- `/tmp/my_websites_euclidean_bezout_video_qa/zh-hk-start-rerender.png`
- `/tmp/my_websites_euclidean_bezout_video_qa/zh-hk-reverse-final.png`
- `/tmp/my_websites_euclidean_bezout_video_qa/zh-cn-bezout-clean.png`
- `/tmp/my_websites_euclidean_bezout_video_qa/zh-cn-diophantine-final.png`

Result:

- EN, zh-HK, and zh-CN videos are readable at 854x480.
- The Chinese title was localized to `Bézout 恆等式` / `Bézout 恒等式`.
- The reverse-substitution title was moved and reduced so it no longer overlaps
  the first equation.
- Redundant coefficient labels were removed from the Bézout frame because the
  final equation already shows the coefficients.
- The Diophantine test frame no longer has summary text colliding with the
  explanation card.

## Static QA

Passed:

```bash
python3 -m py_compile tools/animations/manim/scenes/math1025/euclidean_bezout_integer_equations.py
python3 -m json.tool content/textbook/math1025/integer-methods/divisibility-gcd-and-integer-equations/storyboard.json
bash -n tools/animations/manim/scripts/render_scene.sh
git diff --check
npm run verify:mdx-tables
npx tsc --noEmit --pretty false
npm run lint
AUTH_SECRET=local-test-secret npm run build
```

Build warning:

- Contentlayer skipped 9 storyboard JSON files as unknown document types.
- This is expected for the current storyboard sidecar workflow.

## Browser And Export QA

Browser plugin status:

- Browser plugin not available in this session.
- Used Playwright 1.60.0 fallback.
- The first sandboxed Chromium launch failed with macOS Mach port permission
  denial; the same script passed in the approved non-sandboxed run.

Local server:

```bash
AUTH_SECRET=local-test-secret PORT=3010 npm run start
```

QA script:

```bash
node /private/tmp/euclidean_bezout_video_qa.mjs
```

Routes checked:

- `/en/notes/math1025/integer-methods/divisibility-gcd-and-integer-equations`
- `/zh-hk/notes/math1025/integer-methods/divisibility-gcd-and-integer-equations`
- `/zh-cn/notes/math1025/integer-methods/divisibility-gcd-and-integer-equations`

Page results:

| Scenario | Title | Theme class | Video duration | Playback delta | Overflow |
| --- | --- | --- | --- | --- | --- |
| EN light desktop | `7.1 Divisibility, gcd, and integer equations` | `light` | 11.066344s | 0.894024s | 0 |
| EN dark desktop | `7.1 Divisibility, gcd, and integer equations` | `dark` | 11.066344s | 0.897049s | 0 |
| zh-HK light mobile | `7.1 整除、最大公因數與整數方程` | `light` | 11.066344s | 0.897261s | 0 |
| zh-CN light desktop | `7.1 整除、最大公因数与整数方程` | `light` | 11.066344s | 0.896610s | 0 |

All page checks confirmed:

- page identity matched the expected localized title
- no framework error overlay
- no relevant console or page errors
- video element reached `readyState: 4`
- poster path resolved to the localized Math1025 asset
- video dimensions were 854x480
- the local article text around the new embed remained visible

Export results:

| Locale | TXT | PDF | PDF bytes | Video static frame | `.mp4` absent |
| --- | --- | --- | --- | --- | --- |
| EN | 200 | 200 | 46495 | yes | yes |
| zh-HK | 200 | 200 | 176580 | yes | yes |
| zh-CN | 200 | 200 | 163597 | yes | yes |

Screenshots saved outside the repository:

- `/tmp/my_websites_euclidean_bezout_video_qa/en-light-desktop-video-block.png`
- `/tmp/my_websites_euclidean_bezout_video_qa/en-dark-desktop-video-block.png`
- `/tmp/my_websites_euclidean_bezout_video_qa/zh-hk-light-mobile-video-block.png`
- `/tmp/my_websites_euclidean_bezout_video_qa/zh-cn-light-desktop-video-block.png`
