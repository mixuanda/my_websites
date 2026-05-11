import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeMetaController } from "@/components/ThemeMetaController";
import { MainLayout } from "@/components/MainLayout";
import {
  googleSiteVerification,
  metadataBase,
  SITE_DESCRIPTION,
  SITE_NAME,
} from "@/lib/seo";
import { getSiteSurface } from "@/lib/site-surface";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: ["math notes", "math1090", "math1030", "mathematics", "course notes"],
  authors: [{ name: "Evanalysis" }],
  alternates: {
    canonical: "/",
  },
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
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: "/",
    locale: "en_US",
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
  ...(googleSiteVerification
    ? { verification: { google: googleSiteVerification } }
    : {}),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const surface = getSiteSurface();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* PWA Meta Tags */}
        <meta name="theme-color" content="#f6f0e8" />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: light)"
          content="#f6f0e8"
        />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: dark)"
          content="#1b2230"
        />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Evanalysis" />
        
        {/* App Icons */}
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
          <MainLayout surface={surface}>{children}</MainLayout>
        </ThemeProvider>
        
        {/* Service Worker Registration */}
        <script src="/sw-register.js" defer />
      </body>
    </html>
  );
}
