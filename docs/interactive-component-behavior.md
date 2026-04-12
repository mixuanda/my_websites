# Interactive component behavior

The math notes site is interactive-first. The live page teaches through
exploration, state changes, and guided steps. The component set stays small on
purpose so the experience remains coherent across routes and languages.

## Article-first embedding

Interactive blocks are part of the note, not a detached studio or mini-app.

- `InteractiveWidget` renders as a compact inline teaching panel with a
  localized label.
- Notes add lead-in paragraphs before widgets so the interaction reads as a
  guided pause inside the explanation.
- Widgets should sit near the paragraph, worked example, or quick check they
  are meant to clarify.
- Exports keep a static study snapshot instead of dropping the interaction
  entirely.

## Current reusable blocks

The current reusable note blocks live across
`src/components/textbook/mdx-blocks.tsx`,
`src/components/textbook/PrerequisiteLink.tsx`, and
`src/components/textbook/GlossaryPopover.tsx`.

- definition
- theorem card
- worked example
- common mistake
- collapsible proof
- quick check
- revealable solution
- prerequisite link
- glossary popover

## Current interactive widgets

The current widget set lives in `src/components/textbook/interactives.tsx`.

- `math1090`: truth-table builder, quantifier-negation stepper,
  set-operation explorer
- `math1030`: system-to-augmented-matrix explorer, row-reduction stepper,
  matrix-multiplication visualizer, solution-set classifier,
  invertibility row-reduction demo, subspace checker, span explorer,
  independence checker

## Behavior rules

Each widget must follow these rules.

- Keep the mathematical goal explicit.
- Show state changes that teach the next idea.
- Stay readable on small screens.
- Work in EN, zh-HK, and zh-CN without changing the mathematics.
- Provide a static export snapshot instead of disappearing in TXT or PDF.

## Export mapping

The export layer currently converts widgets through
`src/lib/textbook/interactive-snapshots.ts`.

- Step-based widgets export their revealed steps.
- Manipulable examples export representative states.
- Input/output widgets export representative input/output pairs.
- Diagram-heavy widgets export a short text summary or diagram note.

## Pedagogical rules

Use these rules when you author a new interactive note.

1. Start with the concept the learner is trying to understand.
2. Make the interaction expose that concept directly.
3. Embed the interaction where the learner naturally wants to test the idea,
   not in a detached section at the end.
4. Use the result to support the nearby worked example or quick check.
5. Keep the interaction short enough that the export snapshot stays useful.

## Current correction notes

The current pass especially strengthens the `math1030` note flow.

- `2.3` now explains the distinction between REF, RREF, and back substitution
  before the learner opens the row-reduction stepper.
- Vector-space notes already use widgets to make subspace testing, span, and
  independence visible inside the article flow.
- Public note pages now keep source tracing out of the interaction chrome so
  the widget remains focused on learning rather than documentation.

## Next steps

Add the next `math1030` widgets for linear transformations and geometry-heavy
intuition once the source audit supports those units.
