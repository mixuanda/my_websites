"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export interface GiscusProps {
  repo?: string;
  repoId?: string;
  category?: string;
  categoryId?: string;
}

export function Giscus({ 
  repo = process.env.NEXT_PUBLIC_GISCUS_REPO,
  repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID,
  category = process.env.NEXT_PUBLIC_GISCUS_CATEGORY || "Announcements",
  categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
}: GiscusProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  // 如果没有配置，显示提示信息
  if (!repo || !repoId || !categoryId) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p className="text-sm mb-2">评论系统尚未配置</p>
        <p className="text-xs">
          请在 <code className="bg-muted px-1 py-0.5 rounded">.env.local</code> 中设置 Giscus 相关环境变量
        </p>
        <p className="text-xs mt-2">
          访问{" "}
          <a 
            href="https://giscus.app/zh-CN" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            giscus.app
          </a>
          {" "}获取配置
        </p>
      </div>
    );
  }

  useEffect(() => {
    if (!ref.current || ref.current.hasChildNodes()) return;

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-repo", repo);
    script.setAttribute("data-repo-id", repoId);
    script.setAttribute("data-category", category);
    script.setAttribute("data-category-id", categoryId);
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute("data-theme", resolvedTheme === "dark" ? "dark" : "light");
    script.setAttribute("data-lang", "zh-CN");

    ref.current.appendChild(script);
  }, [repo, repoId, category, categoryId, resolvedTheme]);

  useEffect(() => {
    const iframe = document.querySelector<HTMLIFrameElement>(
      "iframe.giscus-frame"
    );
    if (iframe) {
      iframe.contentWindow?.postMessage(
        {
          giscus: {
            setConfig: {
              theme: resolvedTheme === "dark" ? "dark" : "light",
            },
          },
        },
        "https://giscus.app"
      );
    }
  }, [resolvedTheme]);

  return (
    <div ref={ref} className="giscus-wrapper" />
  );
}
