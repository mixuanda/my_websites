"use client";

import React from "react";

// Callout 组件 - 用于显示提示框
export interface CalloutProps {
  type?: "info" | "warning" | "error" | "success";
  title?: string;
  body?: React.ReactNode;
  children?: React.ReactNode;
}

export function Callout({ type = "info", title, body, children }: CalloutProps) {
  const styles = {
    info: "border-[var(--callout-info-border)] bg-[var(--callout-info-bg)] text-[var(--callout-info-foreground)]",
    warning:
      "border-[var(--callout-warning-border)] bg-[var(--callout-warning-bg)] text-[var(--callout-warning-foreground)]",
    error:
      "border-[var(--callout-error-border)] bg-[var(--callout-error-bg)] text-[var(--callout-error-foreground)]",
    success:
      "border-[var(--callout-success-border)] bg-[var(--callout-success-bg)] text-[var(--callout-success-foreground)]",
  };

  const icons = {
    info: "ℹ️",
    warning: "⚠️",
    error: "❌",
    success: "✅",
  };

  return (
    <div className={`my-6 p-4 border-l-4 rounded-r-lg ${styles[type]}`}>
      {title && (
        <div className="font-semibold mb-2 flex items-center gap-2">
          <span>{icons[type]}</span>
          {title}
        </div>
      )}
      <div className="text-sm">{body || children}</div>
    </div>
  );
}

export default Callout;
