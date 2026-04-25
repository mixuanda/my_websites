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
  set-operation explorer, integer-equivalence explorer,
  rational-representative lab
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

- `math1090` `3.3` now has an integer-equivalence explorer that keeps the
  quotient-class definition visible while readers change representatives and
  test the cross-sum condition.
- `math1090` `3.4` now has a rational-representative lab that compares
  candidate formulas for relations on `Q` against legal changes of fraction
  representative.
- `2.3` now explains the distinction between REF, RREF, and back substitution
  before the learner opens the row-reduction stepper.
- Vector-space notes already use widgets to make subspace testing, span, and
  independence visible inside the article flow.
- Public note pages now keep source tracing out of the interaction chrome so
  the widget remains focused on learning rather than documentation.

## Next steps

The `math1030` `5.2 RREF uniqueness and well-defined rank` appendix pass did
not add a widget. The material is proof-structural, and the existing theorem,
collapsible-proof, quick-check, and reveal-solution blocks preserve the
article-first reading flow better than a detached interaction.

The later `math1030` `3.1` matrix-algebra practice parity pass also did not add
a new widget. The existing `matrix-multiplication-visualizer` remains the
right interaction for the unit; the new material is better represented as
worked examples, common mistakes, and static guided exercises so exports keep
the same learning value.

The later `math1030` `4.1` homogeneous-solution assignment parity pass also
did not add a new widget. The new material is the structural identity
`S(A,b)=p+N(A)`, the proof that `v-u in N(A)`, and static parameter-form
reading. Existing theorem, proof, worked-example, quick-check, and reveal
blocks preserve the article-first flow and export cleanly.

Add the next `math1030` widgets only for geometry-heavy or state-changing
topics once the source audit supports those units.
