"use client";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "subtle";
  highContrast?: boolean;
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = "default", highContrast = false, children, ...props }, ref) => {
    const baseStyles = "rounded-2xl transition-all duration-300";
    
    const variantStyles = {
      default: highContrast
        ? "bg-card border border-border shadow-lg"
        : "bg-card/80 backdrop-blur-xl border border-white/10 shadow-lg shadow-black/10",
      elevated: highContrast
        ? "bg-card border border-border shadow-xl"
        : "bg-card/90 backdrop-blur-2xl border border-white/15 shadow-xl shadow-black/20",
      subtle: highContrast
        ? "bg-card/90 border border-border/50"
        : "bg-card/60 backdrop-blur-lg border border-white/5",
    };

    return (
      <div
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassCard.displayName = "GlassCard";

export { GlassCard };
