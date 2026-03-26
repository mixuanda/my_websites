"use client";

import Link from "next/link";
import { Download, FileText, FileType2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ExportArticleKind } from "@/lib/article-export";

interface ArticleDownloadMenuProps {
  articlePath: string;
  kind: ExportArticleKind;
  slug: string;
}

export function ArticleDownloadMenu({
  articlePath,
  kind,
  slug,
}: ArticleDownloadMenuProps) {
  const texHref = `/api/export/${kind}/${encodeURIComponent(slug)}`;
  const pdfHref = `${articlePath}?print=1&autoclose=1`;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="print-hidden shrink-0">
          <Download className="w-4 h-4" />
          下载
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem asChild>
          <a href={texHref}>
            <FileText className="w-4 h-4" />
            TeX (.tex)
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={pdfHref} target="_blank" rel="noopener noreferrer">
            <FileType2 className="w-4 h-4" />
            PDF (.pdf)
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
