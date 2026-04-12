"use client";

import { SitePreferencesProvider, useSitePreferences } from "@/components/SitePreferencesProvider";
import { GlassSidebar } from "@/components/glass";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: React.ReactNode;
}

function MainLayoutShell({ children }: MainLayoutProps) {
  const { highContrast } = useSitePreferences();

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors">
      <div
        aria-hidden="true"
        className={cn(
          "fixed inset-0 -z-10 transition-opacity duration-500",
          highContrast && "opacity-0"
        )}
      >
        <div
          className="absolute inset-0 transition-colors duration-500"
          style={{
            background:
              "linear-gradient(135deg, var(--page-gradient-start) 0%, var(--page-gradient-mid) 50%, var(--page-gradient-end) 100%)",
          }}
        />
        <div
          className="absolute top-0 left-1/4 h-96 w-96 rounded-full blur-3xl transition-colors duration-500"
          style={{ background: "var(--page-orb-1)" }}
        />
        <div
          className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full blur-3xl transition-colors duration-500"
          style={{ background: "var(--page-orb-2)" }}
        />
      </div>
      <GlassSidebar />
      <main className="lg:ml-64 min-h-screen pt-16 lg:pt-0">
        <div className="p-4 md:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <SitePreferencesProvider>
      <MainLayoutShell>{children}</MainLayoutShell>
    </SitePreferencesProvider>
  );
}
