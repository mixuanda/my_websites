# Theme system

This project keeps the existing glass-style design, but the theme behavior is
now corrected at the shared-system level rather than by patching individual
pages.

## Current architecture

- `src/components/ThemeProvider.tsx` still wraps the app with `next-themes`.
- `src/components/MainLayout.tsx` now uses `resolvedTheme` to choose a dark or
  light decorative background layer.
- High-contrast state is stored in local storage and mirrored to
  `html[data-contrast]`.
- `src/components/glass/GlassCard.tsx` and
  `src/components/glass/GlassPanel.tsx` now use token-aware borders in light
  mode and keep the softer white borders only as dark-mode accents.
- `src/components/Mdx.tsx` and the diary page no longer force
  `prose-invert` in light mode.

## What was corrected

- The main background no longer stays visually dark after switching to light
  mode.
- Shared glass surfaces now rely on border tokens instead of assuming a dark
  canvas.
- The default page TOC and shell panels inherit the active theme cleanly.
- High-contrast mode now suppresses decorative background layers instead of
  fighting the active theme.

## Current review checklist

When checking theme behavior, verify the following.

1. Light mode shows a light background and readable dark text.
2. Dark mode preserves the existing glass direction and atmosphere.
3. MDX prose is readable in both light and dark mode.
4. Sidebar, course cards, glossary popovers, and interactive widgets keep
   enough border contrast in both themes.
5. High-contrast mode does not invert the page into an unreadable mixed state.
