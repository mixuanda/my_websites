"use client";

import { GlassSidebar } from "@/components/glass";
import type { SiteSurface } from "@/lib/site-surface";
import { cn } from "@/lib/utils";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useSyncExternalStore,
} from "react";

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
  surface: SiteSurface;
}

const HIGH_CONTRAST_STORAGE_KEY = "site-high-contrast";
const HIGH_CONTRAST_CHANGE_EVENT = "site-high-contrast-change";

function getHighContrastSnapshot() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.localStorage.getItem(HIGH_CONTRAST_STORAGE_KEY) === "true";
}

function getHighContrastServerSnapshot() {
  return false;
}

function subscribeHighContrast(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const handleStorage = (event: StorageEvent) => {
    if (event.key === HIGH_CONTRAST_STORAGE_KEY) {
      onStoreChange();
    }
  };

  window.addEventListener("storage", handleStorage);
  window.addEventListener(HIGH_CONTRAST_CHANGE_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(HIGH_CONTRAST_CHANGE_EVENT, onStoreChange);
  };
}

export function MainLayout({ children, surface }: MainLayoutProps) {
  const highContrast = useSyncExternalStore(
    subscribeHighContrast,
    getHighContrastSnapshot,
    getHighContrastServerSnapshot
  );
  const setHighContrast = useCallback((value: boolean) => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(HIGH_CONTRAST_STORAGE_KEY, String(value));
    window.dispatchEvent(new Event(HIGH_CONTRAST_CHANGE_EVENT));
  }, []);

  useEffect(() => {
    if (typeof document === "undefined" || typeof window === "undefined") {
      return;
    }

    document.documentElement.dataset.contrast = highContrast ? "high" : "normal";
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
          surface={surface}
        />
        <main className="lg:ml-64 min-h-screen pt-16 lg:pt-0">
          <div className="p-4 md:p-6 lg:p-8">{children}</div>
        </main>
      </div>
    </LayoutContext.Provider>
  );
}
