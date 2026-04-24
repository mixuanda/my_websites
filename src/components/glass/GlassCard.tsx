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
        : "bg-card/80 backdrop-blur-xl border border-border/60 shadow-lg shadow-black/10 [[data-contrast=high]_&]:bg-card [[data-contrast=high]_&]:backdrop-blur-none [[data-contrast=high]_&]:border-border",
      elevated: highContrast
        ? "bg-card border border-border shadow-xl"
        : "bg-card/90 backdrop-blur-2xl border border-border/70 shadow-xl shadow-black/20 [[data-contrast=high]_&]:bg-card [[data-contrast=high]_&]:backdrop-blur-none [[data-contrast=high]_&]:border-border",
      subtle: highContrast
        ? "bg-card/90 border border-border/50"
        : "bg-card/60 backdrop-blur-lg border border-border/50 [[data-contrast=high]_&]:bg-card [[data-contrast=high]_&]:backdrop-blur-none [[data-contrast=high]_&]:border-border",
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
