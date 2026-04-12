import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeMetaController } from "@/components/ThemeMetaController";
import { MainLayout } from "@/components/MainLayout";

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
    locale: "en_US",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* PWA Meta Tags */}
        <meta name="theme-color" content="#f7f3ef" />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: light)"
          content="#f7f3ef"
        />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: dark)"
          content="#11101a"
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
          <MainLayout>{children}</MainLayout>
        </ThemeProvider>
        
        {/* Service Worker Registration */}
        <script src="/sw-register.js" defer />
      </body>
    </html>
  );
}
