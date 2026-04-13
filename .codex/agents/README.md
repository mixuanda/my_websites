---
name: repo-agent-team
description: Repo-specific agent roster and ownership boundaries for the mathematics Notes system.
---

# Repo agent team

Use these agents to keep work bounded and non-overlapping.

## Shared rules

- The main agent owns final integration, validation, and commits.
- Do not let two write-heavy agents edit the same file family at once.
- If a task touches shared route, catalog, entitlement, or localization files,
  return a draft or patch summary unless the main agent explicitly assigns the
  file for direct editing.

## Current agents

- `article-writer`: deepens one specific note unit at a time.
- `interactive-builder`: works only on quizzes, checkpoints, grading, and
  assessment UI.
- `billing-membership`: works only on Stripe, entitlement, and membership
  surfaces.
- `coverage-auditor`: audits `reference/`, coverage docs, and authored-note
  gaps; default is read-only.
- `docs-integrator`: keeps `README.md` and `docs/**` aligned with the actual
  implementation.
- `ui-ia-refiner`: refines public shell framing, note-page information
  architecture, and navigation clarity without rewriting the whole site.
