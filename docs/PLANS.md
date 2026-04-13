# Plans

This file is the active milestone ledger for the current local session. Work
must proceed milestone by milestone, and each milestone must be small enough to
finish and verify before the next one starts.

## Stop-and-fix rule

If any validation command fails, stop the milestone immediately, fix the
failure in the same session, rerun validation, and only then continue.

## Global authoring floor (effective immediately)

For every unit in `content/textbook/**/{en,zh-hk,zh-cn}.mdx`, authoring and
revision passes must satisfy the shared structure and depth floor:

- required block order: motivation -> definitions -> theorem/proposition ->
  proof sketch or proof idea -> worked examples -> common mistakes -> summary
  -> exercises -> solutions;
- EN depth target: 1800-3000 English-word proxy;
- zh-HK depth target: 1300-2200 English-equivalent proxy;
- zh-CN depth target: 1300-2200 English-equivalent proxy;
- minimum `<TheoremCard />` count: 2;
- minimum `<WorkedExample />` count: 3.

Validation command added for each milestone:

- `npm run check:textbook-content`

Depth shortfalls are triaged warnings, while missing/out-of-order required
blocks are hard failures.

## Active milestones

### Milestone 1: run-control docs and first thin-unit rewrite

Status: done

Scope:

- create the required run-control docs;
- deepen `math1090` unit `3.4`;
- deepen `math1030` unit `2.4`;
- update the internal coverage and QA docs to match the real repo state.

Acceptance criteria:

- the rewritten units read like serious textbook sections rather than summaries;
- localized variants exist and keep the same structure;
- augmented-matrix notation in `2.4` uses robust LaTeX;
- `npm run build:site` passes;
- `npm run lint`
- `npm run check:textbook-content` passes or only reports pre-existing warnings that are then
  resolved before moving on.

Validation commands:

- `npm run build:site`
- `npm run lint`
- `npm run check:textbook-content`

### Milestone 2: deepen thin MATH1030 chapter 6 notes

Status: done

Scope:

- rewrite `math1030` unit `6.1 Vector spaces` in EN, zh-HK, and zh-CN;
- keep the writing textbook-first and theorem-led;
- remove summary-only treatment and add stronger definitions, examples,
  theorem-level consequences, and exercises.

Acceptance criteria:

- `6.1` explains the axioms, examples, non-obvious examples, and the standard
  uniqueness / cancellation facts;
- the localized files remain structurally parallel;
- no malformed math or display-math punctuation warnings are introduced;
- local build and lint remain clean.

Validation commands:

- `npm run build:site`
- `npm run lint`
- `npm run check:textbook-content`

### Milestone 3: notes-shell coherence fix

Status: done

Scope:

- remove the hardcoded `/notes` link on the localized Notes landing page;
- keep Notes-first public wording coherent in the localized shell;
- ensure the route helper layer remains future-course friendly.

Acceptance criteria:

- localized Notes pages use route helpers rather than hardcoded archive paths;
- public Notes framing remains intact;
- build and lint remain clean.

Validation commands:

- `npm run build:site`
- `npm run lint`
- `npm run check:textbook-content`

### Milestone 4: next thin-unit rewrite batch

Status: in progress

Scope:

- deepen the next thin public units, with priority:
  `math1030` `6.3`, `math1030` `6.2`, then `math1090` chapter 4.

Acceptance criteria:

- each rewritten unit is book-like in depth, not summary-like;
- answers and reveal blocks stay aligned;
- source-process phrasing stays out of the public exposition;
- build and lint remain clean.

Validation commands:

- `npm run build:site`
- `npm run lint`
- `npm run check:textbook-content`

Current sub-status:

- `math1030` `6.3`, `6.2`, and `6.4` are now rewritten in EN, zh-HK, and
  zh-CN with parity-preserving structure.
- next target inside this milestone: deepen `math1030` `6.5` to the same
  fixed block template and depth floor, then continue to the first Math1090
  chapter-4 bridge note from the April 10 lecture packet and review notes.

### Milestone 5: future-course preparation

Status: ready

Scope:

- keep the type / catalog / docs layer ready for `math1025`;
- continue documenting `math1010` as structurally reserved but source-blocked
  until repo material exists.

Acceptance criteria:

- the internal docs clearly distinguish authored, mapped, deferred, weak, and
  blocked future-course areas;
- no public route is exposed without source-backed content;
- build and lint remain clean.

Validation commands:

- `npm run build:site`
- `npm run lint`
- `npm run check:textbook-content`
