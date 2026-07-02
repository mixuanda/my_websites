# MATH1030 Set Language Video QA - 2026-07-02

## Scope

- Unit: MATH1030 `4.2 Set language and solution sets`
- Public component id: `math1030-set-language-solution-sets-story`
- Branch: `codex/manim`
- Workspace: `/Users/evan/.codex/worktrees/0258/my_websites`

## Source Boundary

Included:

- membership versus subset language;
- set-builder notation as ambient space plus condition;
- `S(A,b)={x in R^n : Ax=b}` as a solution-set statement;
- `N(A)` and `Span` as whole sets;
- subset proof grammar by taking one arbitrary element;
- set equality as two inclusions.

Reference basis:

- `reference/MATH1030/1030gi-n04-01.pdf` pp. 1-7;
- `reference/MATH1030/1030gi-n04-02.pdf` pp. 1-8;
- `reference/MATH1030/MATH1030-Notes.pdf` §1.1 / §2.3 / §4.1-§4.2 / §6.3;
- `reference/MATH1030/1030efghi-as03.pdf`;
- `reference/MATH1030/1030efghi-as03as.pdf`.

Deferred:

- nonsingular / invertible matrix theory;
- rank-nullity and eigenspaces;
- long induction for repeated redundant vectors;
- assignment-only invertibility / nilpotence examples.

## Assets

Rendered with:

```bash
npm run animation:manim:render -- SetLanguageSolutionSetsStoryEn SetLanguageSolutionSetsStoryZhHk SetLanguageSolutionSetsStoryZhCn
```

Final assets:

| Locale | MP4 | Poster | Duration | Size |
| --- | --- | --- | --- | --- |
| EN | `public/generated/animations/math1030/set-language-solution-sets-story-en.mp4` | `public/generated/animations/math1030/set-language-solution-sets-story-en.png` | 7.666667s | 456835 bytes |
| zh-HK | `public/generated/animations/math1030/set-language-solution-sets-story-zh-hk.mp4` | `public/generated/animations/math1030/set-language-solution-sets-story-zh-hk.png` | 7.666667s | 416022 bytes |
| zh-CN | `public/generated/animations/math1030/set-language-solution-sets-story-zh-cn.mp4` | `public/generated/animations/math1030/set-language-solution-sets-story-zh-cn.png` | 7.666667s | 406344 bytes |

Storage policy check:

- `public/generated/animations`: about 67 MB after this slice.
- Individual MP4 files are all below 5 MB.
- Current repo-local policy remains valid because the total is still below the
  75 MB revisit gate.

## Local Static QA

Passed:

```bash
python3 -m py_compile tools/animations/manim/scenes/math1030/set_language_solution_sets.py
python3 -m json.tool content/textbook/math1030/solution-structure/set-language-and-solution-sets/storyboard.json >/dev/null
bash -n tools/animations/manim/scripts/render_scene.sh
git diff --check
npm run verify:mdx-tables
npx tsc --noEmit --pretty false
npm run lint
npm run check:textbook-content
AUTH_SECRET=local-test-secret npm run build
```

Notes:

- `npm run check:textbook-content` passed with the existing 373 content-depth
  warnings.
- `AUTH_SECRET=local-test-secret npm run build` passed. Contentlayer still
  warns that storyboard JSON files are skipped document types; this is existing
  generated-content behavior.
- `.contentlayer/generated/**` was restored after the build.

## Local Browser QA

Server:

```bash
AUTH_SECRET=local-test-secret npm run start -- --hostname 127.0.0.1 --port 3000
```

Browser path:

- In-app Browser was available and used.
- The runtime does not support `networkidle`; QA used the supported `load`
  state instead.
- Desktop route checks covered EN / zh-HK / zh-CN.
- Mobile check used a temporary `390 x 844` viewport and then reset it.

Passed:

- EN route: `/en/notes/math1030/solution-structure/set-language-and-solution-sets`
- zh-HK route: `/zh-hk/notes/math1030/solution-structure/set-language-and-solution-sets`
- zh-CN route: `/zh-cn/notes/math1030/solution-structure/set-language-and-solution-sets`
- one video per locale route;
- locale-specific `videoSrc` / `posterSrc` values;
- video controls present;
- no visible raw `math1030-set-language-solution-sets-story` id;
- no framework error overlay;
- no console errors or warnings on checked routes;
- no horizontal overflow on desktop or mobile;
- desktop video size about `545 x 306.6`;
- mobile video size about `291 x 163.7`;
- local route and asset HTTP smoke returned 200 for the three note pages and
  all six MP4 / PNG assets.

## Local Export QA

Passed for:

- `/api/textbook-export/en/math1030/solution-structure/set-language-and-solution-sets`
- `/api/textbook-export/zh-hk/math1030/solution-structure/set-language-and-solution-sets`
- `/api/textbook-export/zh-cn/math1030/solution-structure/set-language-and-solution-sets`
- matching `/pdf` endpoints

TXT markers found:

- EN: `[Static video-study sequence] Set language and solution sets`
- zh-HK: `[靜態影片學習序列] 集合語言與解集`
- zh-CN: `[静态视频学习序列] 集合语言与解集`

TXT leak checks passed:

- no `<video`;
- no `.mp4`;
- no `poster=`;
- no `math1030-set-language-solution-sets-story`.

PDF checks:

- EN / zh-HK / zh-CN responses start with `%PDF`.

## Production QA

Deployment:

- Commit: `6c30cbb` (`Add Math1030 set language video`)
- Deployment id: `dpl_FBYthS5mCHZfdAz9u3PSdTkF3wik`
- Production alias: `https://www.evanalysis.top`
- Status: Ready

Passed:

- `https://www.evanalysis.top/en/notes/math1030/solution-structure/set-language-and-solution-sets`
- `https://www.evanalysis.top/zh-hk/notes/math1030/solution-structure/set-language-and-solution-sets`
- `https://www.evanalysis.top/zh-cn/notes/math1030/solution-structure/set-language-and-solution-sets`
- production page HTML contains the localized title and new
  `set-language-solution-sets-story` asset references;
- all six production MP4 / PNG assets returned HTTP 200;
- EN / zh-HK / zh-CN TXT exports contain the localized static video-study
  sequence markers;
- production TXT exports do not leak `<video`, `.mp4`, `poster=`, or the
  internal video id;
- EN / zh-HK / zh-CN PDF export responses start with `%PDF`;
- `vercel logs dpl_FBYthS5mCHZfdAz9u3PSdTkF3wik --no-follow --level error
  --since 15m --limit 20` returned no logs.
