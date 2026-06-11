# Manim Hash-Table Collision Video QA - 2026-06-11

## Scope

- Unit: `csci2520/adt-and-operations/hash-tables-and-collision-strategies`
- Video id: `csci2520-hash-table-collision-strategy-story`
- Mode: Manim + existing widget
- Existing widget preserved: `hash-bucket-lab`
- Local branch: `codex/manim`

This slice adds the first CSCI2520 Manim `VideoExplanation`. The video is an
invariant-focused bridge between the collision definition and the chaining
section. It does not replace the existing hash-bucket lab; the widget remains
the reader-controlled surface for changing keys and bucket counts.

## Source Support

The read-only scout and local checks confirmed source support in:

- `docs/extracted/csci2520/lecture-04a-hashtable-raw.txt`
  - hashtable as an ADT and dictionary operation set
  - `Enter`, `Lookup`, and bucket-array implementation
  - collision definition and chaining
  - open addressing, probing, clustering, quadratic probing, and rehashing
- `docs/extracted/csci2520/tuto3-hashtable.txt`
  - tutorial support for hash-table collision exercises

Deferred from this short clip:

- full quadratic probing walkthrough
- double hashing formula detail
- deletion and tombstone behavior
- load-factor / rehashing deep dive
- a probing-specific interactive widget

## Assets

Rendered with:

```bash
bash tools/animations/manim/scripts/render_scene.sh HashTableCollisionStrategyStoryEn HashTableCollisionStrategyStoryZhHk HashTableCollisionStrategyStoryZhCn
```

Generated assets:

- `public/generated/animations/csci2520/hash-table-collision-strategy-story-en.mp4`
- `public/generated/animations/csci2520/hash-table-collision-strategy-story-en.png`
- `public/generated/animations/csci2520/hash-table-collision-strategy-story-zh-hk.mp4`
- `public/generated/animations/csci2520/hash-table-collision-strategy-story-zh-hk.png`
- `public/generated/animations/csci2520/hash-table-collision-strategy-story-zh-cn.mp4`
- `public/generated/animations/csci2520/hash-table-collision-strategy-story-zh-cn.png`

Final `ffprobe` results:

| Locale | Codec | Size | Duration | File size |
| --- | --- | --- | --- | --- |
| EN | h264 | 854x480 | 11.466344s | 533421 bytes |
| zh-HK | h264 | 854x480 | 11.466344s | 498537 bytes |
| zh-CN | h264 | 854x480 | 11.466667s | 496015 bytes |

## Visual QA

Inspected frames:

- `/tmp/my_websites_hash_table_video_qa/en-poster-frame.png`
- `/tmp/my_websites_hash_table_video_qa/en-collision-frame-stable.png`
- `/tmp/my_websites_hash_table_video_qa/zh-hk-poster-frame-rerender.png`
- `/tmp/my_websites_hash_table_video_qa/zh-hk-chaining-frame-rerender.png`
- `/tmp/my_websites_hash_table_video_qa/zh-cn-probing-frame-rerender.png`

Result:

- EN, zh-HK, and zh-CN videos are readable at 854x480.
- Chinese labels were shortened in the probing frame to avoid overlap.
- The explanation card was moved upward so browser video controls do not
  obscure the key sentence in the embedded page.
- The clip states that collision means same bucket, not equality of keys.

## Static QA

Passed:

```bash
python3 -m py_compile tools/animations/manim/scenes/csci2520/hash_table_collision_strategy.py
python3 -m json.tool content/textbook/csci2520/adt-and-operations/hash-tables-and-collision-strategies/storyboard.json
bash -n tools/animations/manim/scripts/render_scene.sh
git diff --check
npm run verify:mdx-tables
npx tsc --noEmit --pretty false
npm run lint
AUTH_SECRET=local-test-secret npm run build
```

Build warning:

- Contentlayer skipped 8 storyboard JSON files as unknown document types.
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
node /private/tmp/hash_table_video_qa.mjs
```

Routes checked:

- `/en/notes/csci2520/adt-and-operations/hash-tables-and-collision-strategies`
- `/zh-hk/notes/csci2520/adt-and-operations/hash-tables-and-collision-strategies`
- `/zh-cn/notes/csci2520/adt-and-operations/hash-tables-and-collision-strategies`

Page results:

| Scenario | Title | Theme class | Video duration | Playback delta | Overflow |
| --- | --- | --- | --- | --- | --- |
| EN light desktop | `1.2 Hash tables and collision strategies` | `light` | 11.466344s | 0.899400s | 0 |
| EN dark desktop | `1.2 Hash tables and collision strategies` | `dark` | 11.466344s | 0.899036s | 0 |
| zh-HK light mobile | `1.2 Hash table 與 collision 策略` | `light` | 11.466344s | 0.899415s | 0 |
| zh-CN light desktop | `1.2 Hash table 与 collision 策略` | `light` | 11.466667s | 0.899175s | 0 |

All page checks confirmed:

- page identity matched the expected localized title
- no framework error overlay
- no relevant console or page errors
- video element reached `readyState: 4`
- poster path resolved to the localized CSCI2520 asset
- video dimensions were 854x480
- `hash-bucket-lab` remained visible via bucket count and collision count text

Export results:

| Locale | TXT | PDF | PDF bytes | Video static frame | Widget snapshot | `.mp4` absent |
| --- | --- | --- | --- | --- | --- | --- |
| EN | 200 | 200 | 53077 | yes | yes | yes |
| zh-HK | 200 | 200 | 218415 | yes | yes | yes |
| zh-CN | 200 | 200 | 197832 | yes | yes | yes |

Screenshots saved outside the repository:

- `/tmp/my_websites_hash_table_video_qa/en-light-desktop-video-block.png`
- `/tmp/my_websites_hash_table_video_qa/en-dark-desktop-video-block.png`
- `/tmp/my_websites_hash_table_video_qa/zh-hk-light-mobile-video-block.png`
- `/tmp/my_websites_hash_table_video_qa/zh-cn-light-desktop-video-block.png`
