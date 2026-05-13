# Fix log

This file records production-impacting fixes that were already applied in the
repo, so the same broken behavior does not get reintroduced later.

## April 13, 2026

### Default deploy build must not run TinaCMS

- Problem: the default `npm run build` script ran `tinacms build` before the
  site build. In this repo, TinaCMS admin generation is optional, and local
  Tina indexing can stall for a long time because the repository also contains
  large `reference/` source material.
- Impact: Vercel deployments and local production builds could appear hung even
  when the public site itself was ready to build.
- Fix at the time: change the default `build` script to `npm run build:site`.
- Current state: TinaCMS has since been removed from the repository. Do not
  reintroduce CMS build steps into the default deploy path.

## May 13, 2026

### TinaCMS removed from repository

- Problem: TinaCMS was no longer part of the current authoring workflow, but its
  dev dependency chain kept full-audit noise in the repo and older docs still
  suggested it was a supported deployment path.
- Fix: remove TinaCMS packages, scripts, config/generated files, env examples,
  and admin-page fallback behavior. `/admin` is now only the authenticated
  backend status/user-management surface for preview/development.
- Do not revert: if a CMS is needed in the future, evaluate it as a new feature
  in a separate branch instead of restoring the old Tina path casually.
