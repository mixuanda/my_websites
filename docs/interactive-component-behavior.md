# Interactive component behavior

The textbook is interactive-first. The live page teaches through exploration,
state changes, and guided steps. The current component set is small on purpose
so the experience stays coherent across routes and languages.

## Article-first embedding

Interactive blocks are now framed as part of the article, not as a detached
studio or mini-app.

- The unit page no longer adds a separate "Interactive studio" wrapper above
  the article body.
- `InteractiveWidget` now renders as a compact inline teaching panel with a
  localized "Try it here" label.
- The first `math1030` milestone units now add short lead-in paragraphs before
  the widget so the interaction reads as a guided pause inside the explanation.
- Widgets should sit near the paragraph, worked example, or concept they are
  meant to clarify.

## Current reusable blocks

The current reusable block set is implemented across
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

The current widget set is implemented in
`src/components/textbook/interactives.tsx`.

- `math1090`: truth-table builder, quantifier-negation stepper, set-operation
  explorer
- `math1030`: system-to-augmented-matrix explorer, row-reduction stepper,
  matrix-multiplication visualizer, solution-set classifier, invertibility
  row-reduction demo

## Behavior rules

Each interactive block must follow these rules.

- Keep the mathematical goal explicit.
- Show state changes that teach the next idea.
- Stay readable on small screens.
- Work in EN, zh-HK, and zh-CN without changing the mathematics.
- Provide a static export snapshot instead of disappearing in TXT or PDF.

## Export mapping

The export layer currently converts widgets through
`src/lib/textbook/interactive-snapshots.ts`.

- Step-based widgets export their revealed steps.
- Manipulable examples export sample states.
- Input/output style widgets export representative input and output pairs.
- Diagram-heavy widgets export a text summary or diagram note.

## Pedagogical rules

Use these rules when you author a new interactive unit.

1. Start with the concept the student is trying to understand.
2. Make the interaction expose that concept directly.
3. Embed the interaction where the learner naturally wants to test the idea,
   not in a detached section at the end.
4. Use the result to support the worked example or quick check nearby.
5. Keep the interaction short enough that the export snapshot is still useful.

## Current correction notes

This correction pass especially strengthens `math1030` article flow.

- `1.1` now leads the learner from solution-set meaning into system-to-matrix
  translation.
- `2.1` now frames matrix multiplication as a concrete row-column reading task.
- `2.2`, `2.3`, `2.4`, and `5.1` now introduce each widget with a prompt about
  what to look for before the learner starts clicking.

## Next steps

Add the next `math1030` widgets for span, basis, linear independence, and
linear transformations once the source-backed units for those topics are ready.
