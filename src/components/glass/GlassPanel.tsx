"use client";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  highContrast?: boolean;
}

const GlassPanel = forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ className, highContrast = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl p-4 transition-all duration-300",
          highContrast
            ? "bg-card border border-border"
            : "bg-card/70 backdrop-blur-lg border border-white/10",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassPanel.displayName = "GlassPanel";

export { GlassPanel };
