---
name: ppt-reference-reader
description: Use this skill when you need to extract usable teaching text from repository PowerPoint files (.ppt/.pptx) to support source-backed note authoring.
---

# PPT reference reader

Use this workflow when course source material is primarily PowerPoint slides.

## Workflow

1. Run `scripts/extract_ppt_text.py <input> <output>` for `.pptx` files.
2. For legacy `.ppt` files, first try `strings` fallback:
   - `strings <input.ppt> > <output.txt>`
3. If extraction quality is weak, mark the source item as `blocked` in `docs/reference-coverage.md` and do not fabricate details.
4. Keep extracted text under `docs/extracted/` and cite the original slide path in catalog source refs.

## Quality checks

- Confirm chapter title, operation names, and example statements are readable.
- Reject extraction if only binary fragments remain.
- For weak files, author only high-confidence content and flag remaining gaps.
