# Theme system

This project keeps the existing glass-style visual language, but theme behavior
is now corrected at the shared-system level instead of by patching individual
pages. The goal is stable light mode, stable dark mode, and a high-contrast
mode that does not fight either theme.

## Current architecture

The active theme stack now works like this.

- `src/components/ThemeProvider.tsx` still wraps the app with `next-themes`.
- The app defaults to the system theme rather than forcing dark mode first.
- `src/app/layout.tsx` now ships light-mode and dark-mode `theme-color` meta
  tags instead of assuming one fixed browser chrome color.
- `src/app/globals.css` owns the light and dark tokens, including the shared
  page background gradient variables and the shared `color-scheme` behavior.
- `src/components/MainLayout.tsx` reads those CSS variables for the decorative
  background instead of branching on the theme in JavaScript.
- High-contrast state is stored in local storage and mirrored to
  `html[data-contrast]`.

## What was corrected

The current correction pass addresses the main systemic theme problems.

- The shell no longer assumes a dark canvas as the default public reading
  surface.
- Page background decoration now follows theme-aware CSS variables rather than
  a hardcoded dark-first branch.
- Shared glass cards and panels no longer rely on theme-specific white borders
  to stay readable.
- Shared MDX rendering now uses explicit prose text and border tokens instead
  of depending on `dark:prose-invert`.

## Current review checklist

Use this checklist when you review theme changes.

1. Light mode shows a light background with readable dark text.
2. Dark mode preserves the glass atmosphere without flattening the content.
3. Note pages, glossary popovers, and interactive widgets keep enough border
   contrast in both themes.
4. The main sidebar, mobile sheet, and note-page cards all follow the same
   token set.
5. High-contrast mode removes decorative noise without breaking layout or text
   contrast.

## Next steps

Run a manual visual pass on the localized notes routes, then audit the older
non-note pages for any remaining hardcoded colors that still bypass the shared
token system.
