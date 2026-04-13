# Storyboard Generation Workflow (Internal)

This workflow converts note units into deterministic storyboard packages for
internal media production, while preserving textbook-first instructional rigor.

## 1) Metadata source of truth (human editable)

Each unit can include a `storyboard.json` (or `.yaml`) file stored alongside
MDX content, for example:

- `content/textbook/math1030/matrices/matrix-basics/storyboard.json`
- `content/textbook/math1030/matrices/augmented-matrices-row-operations/storyboard.json`
- `content/textbook/math1030/matrices/gaussian-elimination-rref/storyboard.json`

Required segment taxonomy per locale:

1. `concept_intro`
2. `theorem_statement`
3. `example_walkthrough`
4. `recap_checkpoints`

The metadata is designed for deterministic generation:

- fixed segment types
- explicit ordering
- explicit beats, voiceover lines, and math blocks
- explicit animation intent labels

## 2) Deterministic package generation

Run:

```bash
npm run storyboard:generate
```

The generator validates each metadata file and then outputs a fingerprinted
package under `internal/storyboards/`:

- `manifest.json` (source trace + workflow stage manifest)
- `script-draft.md` (segment-structured narrative script)
- `narration-lines.txt` (clean lines for TTS/narration tools)
- `slide-plan.json` (segment-to-frame assembly plan)
- `qa-checklist.md` (internal QA gate)

Fingerprinting uses stable JSON serialization so the same metadata always yields
repeatable package output locations and content.

## 3) Internal production stages

The generated artifacts support this internal pipeline:

1. **Script drafting**
   - author edits `script-draft.md`
   - checks theorem wording against MDX theorem/definition blocks
2. **Narration generation**
   - use `narration-lines.txt` as canonical narration source
   - keep locale variants separate by folder
3. **Slide/animation assembly**
   - translate `slide-plan.json` into timeline scenes
   - preserve fixed segment order and math focus lists
4. **QA gate**
   - complete `qa-checklist.md`
   - block publish if notation/terminology/locale checks fail

## 4) QA checklist standards

Every locale package must pass:

- math notation correctness
- theorem statement fidelity to note content
- terminology consistency with `docs/terminology-glossary.md`
- locale correctness (`en`, `zh-hk`, `zh-cn`), with Hong Kong wording in
  Traditional Chinese
- storyboard order consistency
- recap alignment with quick checks/exercises

## 5) Scaling policy

Use pilot metrics gate first, then scale only after thresholds pass:

```bash
npm run storyboard:pilot-evaluate
```

Threshold and current pilot metrics are tracked in:

- `data/storyboard/pilot-thresholds.json`
- `data/storyboard/pilot-metrics.json`

If the gate fails, keep scope at pilot units and fix quality issues before
expanding to more units.
