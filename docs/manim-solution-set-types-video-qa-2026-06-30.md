# Manim QA: Math1030 2.4 Solution-set types

Date: 2026-06-30

Unit:
`content/textbook/math1030/matrices/solution-set-types`

Video id: `math1030-solution-set-types-trichotomy-story`

## Source Boundary

- `reference/MATH1030/MATH1030-Notes.pdf` pp. 31-34 supports dependent and
  free variables, the last-column pivot consistency criterion, classification
  by pivot count, unique / no / infinitely many solution cases, and the
  underdetermined consistent-system corollary.
- `reference/MATH1030/1030gi-n02-04.pdf` pp. 1-5 supports row-equivalent
  augmented matrices preserving solution sets, the last-column pivot test, and
  reading free parameters from RREF.
- `reference/MATH1030/1030gi-n02-02.pdf` pp. 1, 3-4, and 5-10 reinforce
  pivot columns, free columns, contradiction rows, and parameterized solution
  examples.
- The clip intentionally stays within RREF reading and pivot/free-variable
  language. It does not introduce rank-theorem framing or later plane-geometry
  generalizations.

## Implementation

- Added storyboard:
  `content/textbook/math1030/matrices/solution-set-types/storyboard.json`
- Added Manim scene:
  `tools/animations/manim/scenes/math1030/solution_set_types.py`
- Added render-script registry entries for:
  `SolutionSetTypesTrichotomyStoryEn`,
  `SolutionSetTypesTrichotomyStoryZhHk`, and
  `SolutionSetTypesTrichotomyStoryZhCn`.
- Registered the localized `VideoExplanation` metadata and static export frame
  sequence in `src/lib/textbook/video-explanations.ts`.
- Embedded the video after the RREF reading habit list and before the larger
  parameterized example in the EN, zh-HK, and zh-CN note files.
- Kept the existing `solution-set-classifier` widget as the reader-controlled
  follow-up; no new widget was needed for this pass.

## Render QA

Commands:

```bash
python3 -m py_compile tools/animations/manim/scenes/math1030/solution_set_types.py
python3 -m json.tool content/textbook/math1030/matrices/solution-set-types/storyboard.json >/dev/null
bash -n tools/animations/manim/scripts/render_scene.sh
MANIM_QUALITY=ql bash tools/animations/manim/scripts/render_scene.sh \
  SolutionSetTypesTrichotomyStoryEn \
  SolutionSetTypesTrichotomyStoryZhHk \
  SolutionSetTypesTrichotomyStoryZhCn
```

Result: all passed. The EN scene was re-rendered once after shortening the
subtitle to fix word spacing in the poster.

Rendered assets:

| Locale | MP4 | Poster | Metadata |
| --- | --- | --- | --- |
| EN | `public/generated/animations/math1030/solution-set-types-trichotomy-story-en.mp4` | `...-en.png` | H.264, 854x480, 13.599678s, 516291 bytes |
| zh-HK | `public/generated/animations/math1030/solution-set-types-trichotomy-story-zh-hk.mp4` | `...-zh-hk.png` | H.264, 854x480, 13.599678s, 504446 bytes |
| zh-CN | `public/generated/animations/math1030/solution-set-types-trichotomy-story-zh-cn.mp4` | `...-zh-cn.png` | H.264, 854x480, 13.599678s, 502763 bytes |

Poster files are PNG, 854x480.

Visual inspection:

- EN poster was checked after the font-copy adjustment; title, subtitle,
  matrix, and decision boxes no longer overlap or crowd.
- zh-HK unique-solution frame was checked for localized text fit.
- zh-CN infinite-solution frame was checked for localized text fit.

## Static Site QA

Commands:

```bash
git diff --check
npm run verify:mdx-tables
npx tsc --noEmit --pretty false
npm run lint
npm run check:textbook-content
AUTH_SECRET=local-test-secret npm run build
```

Result:

- `git diff --check`, MDX table verification, TypeScript, lint, and production
  build passed.
- `npm run check:textbook-content` exited 0 with the existing warning set and
  checked 243 units.
- Contentlayer saw 26 storyboard JSON documents after this addition and skipped
  them as non-content documents, matching the current storyboard convention.

## Browser QA

Local server:

```bash
AUTH_SECRET=local-test-secret npm run start -- --hostname 127.0.0.1 --port 3010
```

Checked routes:

- `/en/notes/math1030/matrices/solution-set-types`
- `/zh-hk/notes/math1030/matrices/solution-set-types`
- `/zh-cn/notes/math1030/matrices/solution-set-types`

Browser DOM results:

- Each locale had the expected localized video title.
- Each locale included the locale-specific MP4 and poster path.
- The video element had `controls=true`, `autoplay=false`, `readyState=4`, and
  a duration of about 13.6 seconds.
- EN, zh-HK, and zh-CN browser console warning/error logs were empty for the
  checked page loads.
- The EN page included the existing `Read the shape of a solution set`
  classifier below the new video.

Interaction results:

- `Unique solution`, `Infinitely many solutions`, and `No solution` buttons
  each resolved to exactly one control.
- Clicking each button changed the classifier matrix and explanation:
  pivot-only unique solution, free-variable infinite solution, and contradiction
  row no-solution states were all observed.

Responsive results:

- Default desktop viewport: no horizontal overflow; embedded video measured
  545x306.5625 in the rendered layout.
- Mobile viewport 390x844: no horizontal overflow; embedded video measured
  291x163.6875; localized title and classifier remained present.

## Export QA

Checked TXT and PDF export endpoints for EN, zh-HK, and zh-CN.

Result:

- All TXT exports returned 200 and contained the localized static
  video-study sequence.
- All TXT exports contained the existing classifier static snapshot:
  `Read the shape of a solution set`, `讀出解集的形狀`, or `读出解集的形状`.
- TXT exports included representative frame labels such as `Read RREF` /
  `閱讀 RREF` / `阅读 RREF` and `Three outcomes` / `三個結果` / `三个结果`.
- TXT exports did not leak `<video>`, `poster=`, or `.mp4`.
- All PDF exports returned `%PDF-` magic bytes.
- Observed local export sizes:
  EN TXT 11675 bytes, EN PDF 37249 bytes;
  zh-HK TXT 10059 bytes, zh-HK PDF 161937 bytes;
  zh-CN TXT 10065 bytes, zh-CN PDF 150744 bytes.

## Production QA

After `codex/manim` commit `969cb02` was fast-forwarded into `main` and pushed,
`www.evanalysis.top` refreshed on the twelfth polling attempt.

Checked production routes:

- `https://www.evanalysis.top/en/notes/math1030/matrices/solution-set-types`
- `https://www.evanalysis.top/zh-hk/notes/math1030/matrices/solution-set-types`
- `https://www.evanalysis.top/zh-cn/notes/math1030/matrices/solution-set-types`

Result:

- All three localized note pages returned 200 and included the expected
  localized MP4 reference and video title.
- All six MP4 / PNG asset URLs returned 200 with the expected content type and
  byte size:
  EN MP4 516291, EN PNG 83112;
  zh-HK MP4 504446, zh-HK PNG 78571;
  zh-CN MP4 502763, zh-CN PNG 77237.
- All three TXT exports returned 200, included the localized static
  video-study sequence labels and classifier snapshot, and did not leak
  `<video>`, `poster=`, or `.mp4`.
- All three PDF exports returned 200 with `%PDF-` magic bytes.
- Production export sizes observed:
  EN TXT 11675 bytes, EN PDF 37249 bytes;
  zh-HK TXT 10059 bytes, zh-HK PDF 161937 bytes;
  zh-CN TXT 10065 bytes, zh-CN PDF 150744 bytes.
