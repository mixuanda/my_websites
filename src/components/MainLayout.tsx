"use client";

import { GlassSidebar } from "@/components/glass";
import { useState, createContext, useContext } from "react";

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

export function MainLayout({ children }: MainLayoutProps) {
  const [highContrast, setHighContrast] = useState(false);

  return (
    <LayoutContext.Provider value={{ highContrast, setHighContrast }}>
      <div className="min-h-screen bg-background">
        {/* 背景装饰层 */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950/50 to-slate-950" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
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
