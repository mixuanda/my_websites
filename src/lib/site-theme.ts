export const siteThemeColors = {
  dark: "#191720",
  light: "#f7f3ef",
} as const;

export const siteThemeModes = ["system", "light", "dark"] as const;

export type SiteThemeMode = (typeof siteThemeModes)[number];
