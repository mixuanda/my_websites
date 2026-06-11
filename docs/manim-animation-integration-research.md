# Manim Animation Integration Research

Date: 2026-05-25

Status: internal research note for future Notes work. Do not surface this document as public reader copy.

## Summary

The animation project to treat as the main line is Manim, specifically Manim Community Edition.

Manim should be considered a good fit for the site's mathematics courses because it produces precise, code-authored explanatory animations: formulas, coordinate systems, transformations, geometric constructions, sequences, graphs, and algorithm states can be represented as version-controlled scenes rather than as hand-edited video timelines.

The right integration model for this website is not to turn note pages into a video portal. The public page should remain article-first. Manim assets should appear as supporting figures, short clips, or optional visual explanations attached to a definition, theorem, proof idea, worked example, or difficult transition.

## Sources Checked

- Manim Community: <https://www.manim.community/>
- Manim Community documentation: <https://docs.manim.community/>
- Manim plugin directory: <https://www.manim.community/plugin/>
- Manim Slides: <https://www.manim.community/plugin/manim-slides/>
- Manim Voiceover: <https://github.com/ManimCommunity/manim-voiceover>
- Manim Editor: <https://docs.editor.manim.community/en/stable/index.html>
- LLM2Manim paper: <https://arxiv.org/abs/2604.05266>
- Manimator paper: <https://arxiv.org/abs/2507.14306>
- ManimML project: <https://github.com/helblazer811/ManimML>

## Local Environment Snapshot

Checked on 2026-05-25 in `/Users/evan/Documents/code/my_websites`:

- `manim`: not installed on PATH.
- `ffmpeg`: available at `/opt/homebrew/bin/ffmpeg`.
- `xelatex`: available at `/opt/homebrew/bin/xelatex`.
- `python3`: `Python 3.14.4`.

This means the machine is close to being able to render Manim scenes, but the first implementation pass still needs a repo-local Python environment and an explicit Manim install. Use `uv` or an isolated virtual environment rather than installing Manim globally.

## What Manim Gives This Site

Manim's strongest value is precise visual sequencing.

Good fits for current and future Notes:

- formula transformations where each algebraic step should visibly correspond to a visual change;
- coordinate geometry and linear transformations;
- row-reduction and matrix operations;
- function limits, continuity, and graph deformation;
- set operations, maps, relations, and quotient constructions;
- sequences, recurrence relations, and convergence pictures;
- proof diagrams where the same object is transformed or reinterpreted;
- algorithm traces for data structures when a polished explanatory clip is better than a live widget.

Manim is less suitable for:

- reader-controlled practice where the learner changes inputs repeatedly;
- full interactive algorithm sandboxes;
- content that must be generated instantly at request time;
- large numbers of tiny videos with no editorial review.

For CSCI2520, React-based embedded widgets are still likely better for reader-controlled algorithm traces. Manim is better for curated explainer clips such as AVL rotations, heapify, Huffman tree construction, graph traversal states, or sorting invariants.

## Related Manim Ecosystem

### Manim Slides

Manim Slides lets Manim scenes become presentation-like slide sequences. It is useful if the site later wants lecture-style decks or step-by-step exported presentations.

Fit for this repo:

- useful for future review decks or course summary slides;
- useful if one animation should double as a presentation;
- not needed for the first website integration pilot.

### Manim Voiceover

Manim Voiceover adds narration timing and voiceover workflows to Manim scenes.

Fit for this repo:

- useful for future narrated explainer videos;
- interesting for bilingual or trilingual scripts;
- should not be used before the visual scene workflow is stable;
- voice generation, captions, and translation need a clear editorial policy.

### Manim Editor

Manim Editor is a post-processing / presentation tool for Manim-generated animations.

Fit for this repo:

- useful later if Manim scenes become presentation assets;
- probably not necessary for the first static video pilot.

### Manim Plugins

The official plugin directory shows a broader ecosystem: automata, code-block animation, physics, circuits, chemistry, and other domain extensions.

Fit for this repo:

- `manim-code-blocks`-style tooling may help CSCI2520 code-highlight animation;
- automata-related plugins may be useful for future CS/theory content;
- plugin use should stay conservative because every plugin adds build and maintenance risk.

### ManimML

ManimML is a Manim-based project for machine-learning architecture animations.

Fit for this repo:

- useful as a design reference for higher-level animation abstractions;
- directly useful only if future Notes include ML/neural-network content;
- less relevant to Math1090, Math1030, Math1025, and CSCI2520 core coverage.

## AI + Manim Direction

Recent work is moving toward LLM-assisted Manim generation rather than replacing Manim.

Relevant examples:

- LLM2Manim presents a human-in-the-loop pipeline for generating STEM animations with Manim.
- Manimator describes a pipeline where an LLM turns papers or prompts into scene descriptions, then executable Manim code.

The practical lesson for this repo:

- AI can draft Manim scene code, but reviewed source code should be the durable artifact.
- A human/editorial QA pass is mandatory because generated animations can be mathematically wrong, visually crowded, or poorly timed.
- The best workflow is likely: source-backed note section -> storyboard -> Manim scene draft -> render -> visual QA -> transcript/caption -> website embed -> export fallback.
- Do not depend on a black-box hosted Manim generator for production content unless the scene code and rendered output can be reviewed and reproduced locally.

## Website Integration Model

Recommended repo shape:

```text
tools/animations/manim/
  pyproject.toml
  README.md
  scenes/
    math1030/
    math1090/
    math1025/
    csci2520/
  scripts/
    render_scene.sh
  storyboards/
public/generated/animations/
  math1030/
  math1090/
  math1025/
  csci2520/
```

Recommended metadata for each animation:

```json
{
  "id": "math1030-row-reduction-pivots",
  "course": "math1030",
  "unitId": "math1030.linear-systems.row-reduction",
  "sourceScene": "tools/animations/manim/scenes/math1030/row_reduction.py",
  "video": {
    "en": "/generated/animations/math1030/row-reduction-pivots-en.mp4",
    "zh-hk": "/generated/animations/math1030/row-reduction-pivots-zh-hk.mp4",
    "zh-cn": "/generated/animations/math1030/row-reduction-pivots-zh-cn.mp4"
  },
  "poster": {
    "en": "/generated/animations/math1030/row-reduction-pivots-en.png",
    "zh-hk": "/generated/animations/math1030/row-reduction-pivots-zh-hk.png",
    "zh-cn": "/generated/animations/math1030/row-reduction-pivots-zh-cn.png"
  },
  "durationSeconds": 45,
  "hasNarration": false,
  "languages": ["en", "zh-hk", "zh-cn"],
  "exportFallback": "storyboard"
}
```

Public page rules:

- Embed only when the animation directly clarifies nearby content.
- Use a poster image and controls; avoid autoplay.
- Provide transcript or captions when narration exists.
- Provide a text alternative for accessibility.
- Keep dark/light mode coherent around the media frame.
- Keep videos short enough to serve as study figures, not lectures detached from the note.

Export rules:

- TXT/PDF export should not try to preserve video behavior.
- Export a storyboard: title, short purpose, key frames, captions, and the final mathematical conclusion.
- For narrated videos, include the transcript.
- For animations with formula transformations, include the ordered formula sequence.

## Candidate Pilot Animations

Start with one or two pilots, not a full animation system.

### Pilot 1: Math1030 Row-Reduction Pivot Story

Why:

- Linear systems and RREF already exist in the Notes system.
- A short animation can show pivot selection, row replacement, elimination, and the meaning of a pivot column.
- It connects naturally to existing React row-reduction interaction, but offers a more polished visual explanation.

Output:

- one 30-60 second silent MP4;
- one poster frame;
- one storyboard fallback;
- one note-page embed in a representative Math1030 unit.

### Pilot 2: Math1090 Set Operation Or Function Mapping

Why:

- Manim can make abstract set/function language less static without making the note playful.
- A visual sequence can show domain, codomain, image, preimage, injection, or composition.

Output:

- one short clip tied to a current Math1090 unit;
- static export frames;
- no narration in the first pass.

### Pilot 3: CSCI2520 AVL Rotation Or Heapify

Why:

- Data Structures is state-changing by nature.
- An animation can show an invariant-preserving transformation more cleanly than prose alone.

Output:

- one curated animation clip;
- static frame sequence for export;
- later compare against a reader-controlled React widget for the same concept.

## Build And Verification Plan

First pass:

1. Add `tools/animations/manim/pyproject.toml` with Manim Community Edition.
2. Add a minimal scene under `tools/animations/manim/scenes/smoke_test.py`.
3. Render a low-quality smoke video.
4. Confirm local output path, video playback, and poster extraction.
5. Add one real pilot storyboard before writing full scene code.
6. Render the pilot and embed it only in a preview/local route at first.

## 2026-05-25 MATH1030 Pilot Implementation

The first website-facing pilot is scoped to MATH1030 `2.3 Gaussian elimination
and RREF`.

Implemented source and integration points:

- `tools/animations/manim/pyproject.toml` defines an isolated Manim project.
- `tools/animations/manim/scenes/math1030/gaussian_elimination_rref.py`
  contains the first Manim scene source and three locale-specific scene
  classes:
  `GaussianEliminationRrefPivotStoryEn`,
  `GaussianEliminationRrefPivotStoryZhHk`, and
  `GaussianEliminationRrefPivotStoryZhCn`.
- `tools/animations/manim/scripts/render_scene.sh` is the repo-local render
  entrypoint, also exposed through `npm run animation:manim:render`; by
  default it renders all three locale variants.
- `src/lib/textbook/video-explanations.ts` registers the public explanation id
  `math1030-gaussian-elimination-rref-pivot-story`.
- `src/components/textbook/mdx-blocks.tsx` and
  `src/components/textbook/mdx-components.tsx` expose a `VideoExplanation`
  MDX component.
- `src/lib/textbook/export.ts` and `src/lib/textbook/export-pdf.tsx` degrade
  video explanations into static storyboard sequences for TXT/PDF export.
- `content/textbook/math1030/matrices/gaussian-elimination-rref/{en,zh-hk,zh-cn}.mdx`
  embeds the pilot after the worked RREF example.

Current status:

- The first real MP4 render has completed locally for all three languages.
- Rendered assets live under `public/generated/animations/math1030/`:
  - `gaussian-elimination-rref-pivot-story-en.mp4`
  - `gaussian-elimination-rref-pivot-story-en.png`
  - `gaussian-elimination-rref-pivot-story-zh-hk.mp4`
  - `gaussian-elimination-rref-pivot-story-zh-hk.png`
  - `gaussian-elimination-rref-pivot-story-zh-cn.mp4`
  - `gaussian-elimination-rref-pivot-story-zh-cn.png`
- MP4 metadata checked with `ffprobe`: H.264, 854 x 480, 15 fps,
  16.333 seconds; sizes are about 424-458 KB each.
- Poster images checked as PNG, 854 x 480.
- Visual poster QA confirmed that English, Traditional Chinese, and Simplified
  Chinese text render without tofu boxes or obvious overflow.
- `src/lib/textbook/video-explanations.ts` now resolves localized `videoSrc`
  and `posterSrc` for this explanation id.
- Remaining QA still needs to verify page rendering, mobile layout, dark/light
  theme, TXT export, and PDF export fallback.

Render command:

```bash
npm run animation:manim:render
```

Do not scale this to many generated assets until size, caching, and deployment
behavior are checked.

## Open Decisions

- Should generated MP4 files be committed, generated in CI, or stored outside Git?
- Should future public integrations use silent clips only, or include captions
  from the start?
- For clips with visible explanatory text, the current pilot uses separate
  locale-rendered videos. For language-neutral clips, decide case by case
  whether one video plus localized surrounding prose is enough.
- What is the maximum allowed file size per animation and per course?
- Should Manim output be part of normal CI, or only a manual authoring workflow?

## Recommendation

Adopt Manim as the main code-generated animation tool for mathematical explainer assets, but keep it separate from the live React interaction system.

Use Manim for polished, curated, source-backed clips. Use React widgets for learner-controlled experimentation. Use AI-assisted Manim generation only as a drafting aid, with version-controlled scene code and strict mathematical/visual review before anything appears on a public note page.
