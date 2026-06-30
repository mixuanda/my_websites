# Math1030 2.5 REF / RREF Existence Video QA - 2026-06-30

Branch: `codex/manim`

Target unit:
`content/textbook/math1030/matrices/existence-of-row-echelon-forms`

Video id: `math1030-existence-of-row-echelon-forms-story`

## Source Boundary

- Primary source: `reference/MATH1030/1030gi-n02-03p.pdf` pp. 1-3.
  - REF existence is proved by induction on row count.
  - RREF existence is proved by first reaching REF and then cleaning REF to
    RREF by induction on rank.
  - Pivot columns are preserved during the REF-to-RREF cleanup.
- Supporting source: `reference/MATH1030/1030gi-n02-03.pdf` pp. 1-6 and
  `reference/MATH1030/MATH1030-Notes.pdf` pp. 21-25.
  - These provide the surrounding REF/RREF definitions, Gaussian elimination
    algorithm, and theorem context.
- Explicitly not claimed in this clip:
  - ordinary REF uniqueness;
  - the later theorem that the RREF of a matrix is unique;
  - pivot-column preservation across arbitrary row-reduction paths before an
    REF has been reached.

## Implementation Summary

- Added trilingual storyboard:
  `content/textbook/math1030/matrices/existence-of-row-echelon-forms/storyboard.json`.
- Added Manim scene:
  `tools/animations/manim/scenes/math1030/existence_of_row_echelon_forms.py`.
- Added render-script entries for EN, zh-HK, and zh-CN.
- Added localized `VideoExplanation` metadata, transcript frames, `videoSrc`,
  and `posterSrc` in `src/lib/textbook/video-explanations.ts`.
- Embedded `<VideoExplanation id="math1030-existence-of-row-echelon-forms-story" />`
  in all three localized MDX files after the pivot-column preservation theorem.
- Deepened the 2.5 article with two source-backed worked examples and a short
  section on how the existence theorem is used later. The target unit now has
  no `check:textbook-content` warnings.

## Rendered Assets

All three assets were regenerated with:

```bash
MANIM_QUALITY=ql bash tools/animations/manim/scripts/render_scene.sh \
  ExistenceOfRowEchelonFormsStoryEn \
  ExistenceOfRowEchelonFormsStoryZhHk \
  ExistenceOfRowEchelonFormsStoryZhCn
```

Final `ffprobe` result for each MP4:

| Locale | MP4 | Codec | Size | Duration |
| --- | --- | --- | --- | --- |
| EN | `public/generated/animations/math1030/existence-of-row-echelon-forms-story-en.mp4` | H.264 | 854x480 | 16.266667s |
| zh-HK | `public/generated/animations/math1030/existence-of-row-echelon-forms-story-zh-hk.mp4` | H.264 | 854x480 | 16.266667s |
| zh-CN | `public/generated/animations/math1030/existence-of-row-echelon-forms-story-zh-cn.mp4` | H.264 | 854x480 | 16.266667s |

Poster PNGs were checked with `sips` and are all 854x480.

Visual inspection covered posters plus representative frames at approximately
4s, 8s, 12s, and 15s. Fixes made during visual QA:

- removed intro-arrow labels that overlapped the opening cards;
- shortened dense English caption text in the REF-to-RREF cleanup frame;
- localized the final English-only card subtitles in zh-HK and zh-CN;
- separated final pivot-column markers from the existence / uniqueness cards.

## Local Verification

Static / build checks:

- `python3 -m py_compile tools/animations/manim/scenes/math1030/existence_of_row_echelon_forms.py`
- `python3 -m json.tool content/textbook/math1030/matrices/existence-of-row-echelon-forms/storyboard.json`
- `bash -n tools/animations/manim/scripts/render_scene.sh`
- `git diff --check`
- `npm run verify:mdx-tables`
- `npx tsc --noEmit --pretty false`
- `npm run lint`
- `npm run check:textbook-content`
- `AUTH_SECRET=local-test-secret npm run build`

Results:

- all commands above passed;
- `npm run check:textbook-content` still reports 373 existing warnings across
  other units, but `existence-of-row-echelon-forms` no longer appears in the
  warning list;
- `npm run build` passed. Contentlayer still warns that storyboard JSON files
  are skipped because they are not Contentlayer document types; this is an
  existing expected warning pattern for storyboard sidecars.

## Browser QA

Local server:

```bash
AUTH_SECRET=local-test-secret npm run start -- --hostname 127.0.0.1 --port 3010
```

Routes checked:

- `http://127.0.0.1:3010/en/notes/math1030/matrices/existence-of-row-echelon-forms`
- `http://127.0.0.1:3010/zh-hk/notes/math1030/matrices/existence-of-row-echelon-forms`
- `http://127.0.0.1:3010/zh-cn/notes/math1030/matrices/existence-of-row-echelon-forms`

Browser DOM checks passed for all three locales:

| Locale | Video count | `sourcePath` | `posterPath` | Duration | Console | Overflow |
| --- | ---: | --- | --- | ---: | --- | --- |
| EN | 1 | `/generated/animations/math1030/existence-of-row-echelon-forms-story-en.mp4` | `/generated/animations/math1030/existence-of-row-echelon-forms-story-en.png` | 16.266667 | none | no |
| zh-HK | 1 | `/generated/animations/math1030/existence-of-row-echelon-forms-story-zh-hk.mp4` | `/generated/animations/math1030/existence-of-row-echelon-forms-story-zh-hk.png` | 16.266667 | none | no |
| zh-CN | 1 | `/generated/animations/math1030/existence-of-row-echelon-forms-story-zh-cn.mp4` | `/generated/animations/math1030/existence-of-row-echelon-forms-story-zh-cn.png` | 16.266667 | none | no |

Additional browser checks:

- `controls=true`, `autoplay=false`, `readyState=4` for the local video in all
  three locales.
- The new worked-example section and the "how this theorem is used later"
  section render in all three locales.
- EN -> zh-CN language switch interaction passed; after clicking the visible
  Simplified Chinese link, the URL, heading, aria label, MP4, and poster all
  changed to zh-CN.
- Dark mode passed on the EN note page: `html.dark`, `color-scheme: dark`,
  no horizontal overflow, and the video remained visible.
- Mobile viewport check at 390x844 passed with no horizontal overflow and a
  correctly scaled zh-CN video block.

Automation limitation:

- Native media play/pause controls focused correctly but did not trigger
  playback in the in-app browser automation layer. The media file itself was
  still verified by `ffprobe`, DOM `duration`, `readyState=4`, and successful
  browser asset loading.

## Export QA

TXT and PDF exports passed for EN, zh-HK, and zh-CN:

- TXT exports include the static video-study sequence.
- TXT exports include the first and last frame labels:
  - EN: `Target guarantee`, `Pivots stay`
  - zh-HK: `目標保證`, `樞軸欄保持`
  - zh-CN: `目标保证`, `主元列保持`
- TXT exports include the new worked example and the new later-use section.
- TXT exports do not contain `<video>`, `.mp4`, or `poster=`.
- PDF exports returned valid `%PDF-` files:
  - EN: 9 pages
  - zh-HK: 8 pages
  - zh-CN: 8 pages

## Production Status

Verified on production after pushing `codex/manim` and advancing `main`.

Deployment:

- Vercel project: `my-websites` (`prj_wzgmN4OzwyHUYg3AsmdAsLRncgzF`)
- Production deployment: `dpl_Cz8sBepyfuceem7Ur4ZcACAFAWfe`
- Deployment URL:
  `https://my-websites-5vk21v89w-mixuandahotmailcoms-projects.vercel.app`
- Production branch / commit: `main` at
  `0949917411a39d3281760f9f3c5c0f0f129f573a`
- Vercel state: `READY`

Production route checks passed:

- `https://www.evanalysis.top/en/notes/math1030/matrices/existence-of-row-echelon-forms`
- `https://www.evanalysis.top/zh-hk/notes/math1030/matrices/existence-of-row-echelon-forms`
- `https://www.evanalysis.top/zh-cn/notes/math1030/matrices/existence-of-row-echelon-forms`

Each route returned HTTP 200 and contained:

- `math1030-existence-of-row-echelon-forms-story`;
- the new source-backed worked example;
- the new section explaining how the theorem is used later.

Production asset checks passed:

| Locale | MP4 status | MP4 type | MP4 size | Poster status | Poster type | Poster size |
| --- | ---: | --- | ---: | ---: | --- | ---: |
| EN | 200 | `video/mp4` | 569920 bytes | 200 | `image/png` | 82240 bytes |
| zh-HK | 200 | `video/mp4` | 555217 bytes | 200 | `image/png` | 77188 bytes |
| zh-CN | 200 | `video/mp4` | 544772 bytes | 200 | `image/png` | 74579 bytes |

Downloaded production MP4s were checked with `ffprobe` and remain H.264,
854x480, 16.266667s. Downloaded production posters were checked with `sips`
and remain 854x480.

Production export checks passed:

| Locale | TXT | PDF |
| --- | --- | --- |
| EN | HTTP 200, `text/plain; charset=utf-8`, 14888 bytes | HTTP 200, `application/pdf`, 39618 bytes |
| zh-HK | HTTP 200, `text/plain; charset=utf-8`, 12793 bytes | HTTP 200, `application/pdf`, 179288 bytes |
| zh-CN | HTTP 200, `text/plain; charset=utf-8`, 12802 bytes | HTTP 200, `application/pdf`, 163076 bytes |

TXT exports include the static video-study sequence, the first / last frame
labels, the new worked example, and the later-use section. TXT exports do not
contain `<video>`, `.mp4`, or `poster=`.

PDF exports returned valid `%PDF-` files.

Production runtime error scan:

- Vercel runtime errors over the last hour: none found.
