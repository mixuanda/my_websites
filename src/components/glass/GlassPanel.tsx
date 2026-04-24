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
            : "bg-card/70 backdrop-blur-lg border border-border/60 [[data-contrast=high]_&]:bg-card [[data-contrast=high]_&]:backdrop-blur-none [[data-contrast=high]_&]:border-border",
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
