# Generated Video Storage Policy

Date: 2026-06-11

Status: keep current Manim MP4/poster assets repo-local for the next short
pilot slices, with explicit size gates.

## Current Inventory

Checked on branch `codex/manim` after the CSCI2520 hash-table pilot:

- Directory: `public/generated/animations`
- Total size: about 18 MB
- Video units: 11
- Locale variants: 33 MP4 files and 33 poster PNG files
- MP4 size range: about 372 KB to 624 KB per file
- Poster size range: about 40 KB to 88 KB per file

This is still small enough for normal repository review and deployment. The
current short 854x480 Manim clips do not yet require external object storage.

## Current Decision

Continue committing generated assets under:

```text
public/generated/animations/<course>/
```

Use this while all of the following remain true:

- the total generated-animation directory stays under 75 MB;
- individual MP4 files stay under 5 MB;
- the clips remain short supporting figures rather than long lecture videos;
- local build, Vercel deployment, and Git operations remain practical;
- no copyright or third-party hosting requirement applies.

## Revisit Triggers

Reopen this policy before adding more videos if any of these become true:

- total `public/generated/animations` size reaches 75 MB;
- a single rendered MP4 exceeds 5 MB;
- a future clip needs audio, narration, or higher resolution;
- reviewers begin objecting to binary diffs;
- deployment transfer time becomes noticeable;
- generated assets need cache-control or CDN behavior that repository storage
  cannot provide cleanly.

## External Storage Candidate

If repo-local storage stops being appropriate, move MP4/poster assets to a
static object store or CDN and keep only source files, storyboards, and asset
manifests in Git.

Required migration steps:

1. Upload localized MP4 and poster files with stable content-addressed names.
2. Replace `videoSrc` and `posterSrc` values in
   `src/lib/textbook/video-explanations.ts`.
3. Keep Manim scene source and storyboard JSON in the repository.
4. Keep TXT/PDF export fallbacks independent of the hosted video files.
5. Add deployment verification that the remote asset URLs return 200 and use
   the expected cache headers.

## Operational Notes

- Keep current Manim quality at the low-resolution web-supporting target unless
  a page needs inspection-grade detail.
- Prefer making more short clips over increasing resolution or duration.
- Do not commit Manim `.media` intermediate render directories.
- Continue committing poster PNGs with the MP4s so the note pages render stable
  first frames without waiting for video metadata.
