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
- Fix: change the default `build` script to `npm run build:site`. Keep
  `npm run build:cms` and `npm run tina:build:auto` for cases where `/admin`
  must be generated intentionally.
- Do not revert: if someone wants TinaCMS admin assets in production, they must
  opt into the CMS build path instead of changing the default deploy build
  back.
