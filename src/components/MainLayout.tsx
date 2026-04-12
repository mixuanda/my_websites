"use client";

import { GlassSidebar } from "@/components/glass";
import { cn } from "@/lib/utils";
import { useEffect, useState, createContext, useContext } from "react";

interface LayoutContextType {
  highContrast: boolean;
  setHighContrast: (value: boolean) => void;
}

const LayoutContext = createContext<LayoutContextType>({
  highContrast: false,
  setHighContrast: () => {},
});

export const useLayoutContext = () => useContext(LayoutContext);

interface MainLayoutProps {
  children: React.ReactNode;
}

const HIGH_CONTRAST_STORAGE_KEY = "site-high-contrast";

export function MainLayout({ children }: MainLayoutProps) {
  const [highContrast, setHighContrast] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.localStorage.getItem(HIGH_CONTRAST_STORAGE_KEY) === "true";
  });

  useEffect(() => {
    if (typeof document === "undefined" || typeof window === "undefined") {
      return;
    }

    document.documentElement.dataset.contrast = highContrast ? "high" : "normal";
    window.localStorage.setItem(HIGH_CONTRAST_STORAGE_KEY, String(highContrast));
  }, [highContrast]);

  return (
    <LayoutContext.Provider value={{ highContrast, setHighContrast }}>
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
        <GlassSidebar
          highContrast={highContrast}
          onHighContrastChange={setHighContrast}
        />
        <main className="lg:ml-64 min-h-screen pt-16 lg:pt-0">
          <div className="p-4 md:p-6 lg:p-8">{children}</div>
        </main>
      </div>
    </LayoutContext.Provider>
  );
}
