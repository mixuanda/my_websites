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
    info: "bg-blue-500/10 border-blue-500 text-blue-200",
    warning: "bg-yellow-500/10 border-yellow-500 text-yellow-200",
    error: "bg-red-500/10 border-red-500 text-red-200",
    success: "bg-green-500/10 border-green-500 text-green-200",
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
