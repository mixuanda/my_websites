import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeMetaController } from "@/components/ThemeMetaController";
import { MainLayout } from "@/components/MainLayout";
import { siteThemeColors } from "@/lib/site-theme";
import {
  defaultLocale,
  isLocale,
  toHtmlLang,
  toOpenGraphLocale,
} from "@/lib/textbook/i18n";
import { TEXTBOOK_PREFERRED_LOCALE_COOKIE_NAME } from "@/lib/textbook/storage";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata: Metadata = {
  title: {
    default: "Evanalysis",
    template: "%s | Evanalysis",
  },
  description: "Interactive mathematics notes, projects, and articles.",
  keywords: ["math notes", "math1090", "math1030", "mathematics", "notes", "projects"],
  authors: [{ name: "Evanalysis" }],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Evanalysis",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: toOpenGraphLocale(defaultLocale),
    siteName: "Evanalysis",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get(
    TEXTBOOK_PREFERRED_LOCALE_COOKIE_NAME
  )?.value;
  const initialLocale =
    localeCookie && isLocale(localeCookie) ? localeCookie : defaultLocale;

  return (
    <html lang={toHtmlLang(initialLocale)} suppressHydrationWarning>
      <head>
        <meta name="theme-color" content={siteThemeColors.light} />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: light)"
          content={siteThemeColors.light}
        />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: dark)"
          content={siteThemeColors.dark}
        />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Evanalysis" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <link rel="icon" type="image/png" href="/icon-192.png" />
      </head>
      <body className="bg-background text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableColorScheme
          enableSystem
          disableTransitionOnChange
        >
          <ThemeMetaController />
          <MainLayout>{children}</MainLayout>
        </ThemeProvider>
        <script src="/sw-register.js" defer />
      </body>
    </html>
  );
}
