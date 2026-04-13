# Missing-reference policy

This document defines how the public Notes system should behave when a topic is
only weakly supported or not supported at all by the repository sources. The
goal is to keep the site academically honest without turning each page into a
source-audit memo.

## Public rule

Public note pages must stay focused on the mathematics itself. Do not add large
source-tracing panels, long audit notes, or repeated "source trail" sections to
normal teaching pages.

When a page is well supported by `reference/`, say nothing about the source
status in the public teaching flow.

## When to show a public notice

Show a small public notice only when one of the following is true:

- the current note page exists, but the relevant local source support is known
  to be incomplete;
- the note intentionally stops short because the repository materials are weak,
  conflicting, or unreadable;
- the page is a bridge section that explains a boundary and explicitly marks
  what remains unsupported.

## What the public notice should say

The notice must be visually secondary and concise. It should communicate only
what the learner needs to know:

- this section is currently incomplete;
- the limitation is caused by missing or insufficient local reference material;
- later expansion depends on stronger repository sources.

The notice must not dominate the page, list raw filenames, or read like process
documentation.

## What belongs only in internal docs

Keep the detailed source-trace and backlog state in internal docs, not in the
public note body. This includes:

- exact filenames and page ranges;
- overlap decisions;
- extraction-quality problems;
- blocked or conflicting sources;
- next-step authoring priorities.

Use these docs for that work:

- `docs/reference-coverage.md`
- `docs/source-audit.md`
- `docs/chapter-coverage-map.md`

## What not to do

Do not:

- add a "References" or "Source trail" section to every note page;
- mention worksheet, handout, or PDF filenames inside the main exposition unless
  the file itself is the mathematical object under discussion;
- pretend unsupported detail is complete;
- fill gaps from memory when the repository does not support the claim.

## Next steps

Use the public notice sparingly, keep source details in the internal coverage
docs, and prefer adding real source-backed teaching content over adding process
copy to the public page.
