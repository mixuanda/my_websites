# Manim QA: Math1030 9.4 Cauchy-Schwarz and triangle inequalities

Date: 2026-06-30

Unit:
`content/textbook/math1030/inner-products/cauchy-schwarz-and-triangle-inequalities`

Video id: `math1030-cauchy-schwarz-triangle-inequalities-story`

## Source Boundary

- `reference/MATH1030/MATH1030-Notes.pdf` pp. 225-226 supports the
  Cauchy-Schwarz theorem, its nonnegative-quadratic proof, the zero-vector
  branch, equality as linear dependence, the triangle inequality, and the
  equality condition.
- `reference/MATH1030/1030gi-n08-01.pdf` pp. 1-5 supports the same real
  column-vector inner product and norm setting, plus reverse triangle
  inequality context.
- The clip intentionally keeps the scope to the Cauchy-Schwarz proof chain and
  the triangle inequality. Reverse triangle inequality remains article /
  exercise material, not a required first video state.

## Implementation

- Added storyboard:
  `content/textbook/math1030/inner-products/cauchy-schwarz-and-triangle-inequalities/storyboard.json`
- Added Manim scene:
  `tools/animations/manim/scenes/math1030/cauchy_schwarz_triangle_inequalities.py`
- Added render-script registry entries for:
  `CauchySchwarzTriangleInequalitiesStoryEn`,
  `CauchySchwarzTriangleInequalitiesStoryZhHk`, and
  `CauchySchwarzTriangleInequalitiesStoryZhCn`.
- Registered the localized `VideoExplanation` metadata and static export frame
  sequence in `src/lib/textbook/video-explanations.ts`.
- Embedded the video after the Cauchy-Schwarz proof and before the numerical
  worked example in the EN, zh-HK, and zh-CN note files.

## Render QA

Commands:

```bash
python3 -m py_compile tools/animations/manim/scenes/math1030/cauchy_schwarz_triangle_inequalities.py
python3 -m json.tool content/textbook/math1030/inner-products/cauchy-schwarz-and-triangle-inequalities/storyboard.json >/dev/null
bash -n tools/animations/manim/scripts/render_scene.sh
MANIM_QUALITY=ql bash tools/animations/manim/scripts/render_scene.sh \
  CauchySchwarzTriangleInequalitiesStoryEn \
  CauchySchwarzTriangleInequalitiesStoryZhHk \
  CauchySchwarzTriangleInequalitiesStoryZhCn
```

Result: all passed.

Rendered assets:

| Locale | MP4 | Poster | Metadata |
| --- | --- | --- | --- |
| EN | `public/generated/animations/math1030/cauchy-schwarz-triangle-inequalities-story-en.mp4` | `...-en.png` | H.264, 854x480, 13.600000s, 558708 bytes |
| zh-HK | `public/generated/animations/math1030/cauchy-schwarz-triangle-inequalities-story-zh-hk.mp4` | `...-zh-hk.png` | H.264, 854x480, 13.599678s, 601897 bytes |
| zh-CN | `public/generated/animations/math1030/cauchy-schwarz-triangle-inequalities-story-zh-cn.mp4` | `...-zh-cn.png` | H.264, 854x480, 13.599678s, 591825 bytes |

Poster files are PNG, 854x480, RGB, non-interlaced.

Visual inspection:

- EN poster and late equality frame were checked after shortening the font copy
  for better word spacing.
- zh-HK equality frame was checked for localized text fit.
- zh-CN proof frame was checked for localized text fit.
- Desktop and mobile screenshots of the embedded page video block were checked;
  no clipping or horizontal overflow was visible.

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
- Contentlayer saw 25 storyboard JSON documents after this addition, which is
  expected.

## Browser QA

Local server:

```bash
AUTH_SECRET=local-test-secret npm run start -- --hostname 127.0.0.1 --port 3010
```

Checked routes:

- `/en/notes/math1030/inner-products/cauchy-schwarz-and-triangle-inequalities`
- `/zh-hk/notes/math1030/inner-products/cauchy-schwarz-and-triangle-inequalities`
- `/zh-cn/notes/math1030/inner-products/cauchy-schwarz-and-triangle-inequalities`

Browser DOM results:

- Each locale had the expected localized page title.
- Each locale included the locale-specific MP4 and poster path.
- The video element had `controls=true`, `autoplay=false`, `readyState=4`, and
  a duration of about 13.6 seconds.
- The export button label localized correctly.
- Export menu interaction exposed TXT and PDF actions.
- The EN page had no horizontal overflow in the in-app browser DOM check.

System-Chrome responsive checks:

- Desktop viewport 1280x900: video block rendered, `overflowX=0`, video size
  560x315.
- Mobile viewport 390x844: video block rendered, `overflowX=0`, video size
  306x172.
- Console output only contained local preview Vercel analytics 404 / notice and
  Service Worker registration logs; no framework overlay or video-component
  error was captured.

## Export QA

Checked TXT and PDF export endpoints for EN, zh-HK, and zh-CN.

Result:

- All TXT exports returned `HTTP/1.1 200 OK` with `text/plain; charset=utf-8`.
- All PDF exports returned `HTTP/1.1 200 OK`, `application/pdf`, and `%PDF`
  magic bytes.
- TXT exports included the static video-study sequence and frame explanations:
  `Static video-study sequence`, `Inner-product bound`, `Triangle equality`
  for EN; the corresponding localized labels appeared in zh-HK and zh-CN.
- TXT exports did not leak `<video>`, `<source>`, `poster=`, or `.mp4`.
- PDF page counts: EN 8 pages, zh-HK 8 pages, zh-CN 8 pages.

## Production QA

Pending until the branch is merged into `main`, pushed, and the production
deployment for `www.evanalysis.top` has refreshed.
