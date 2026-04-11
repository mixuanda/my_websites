"use client";

import { Mdx } from "@/components/Mdx";
import { createTextbookMdxComponents } from "./mdx-components";
import type { Locale } from "@/lib/textbook/types";

interface TextbookMdxProps {
  code: string;
  locale: Locale;
}

export function TextbookMdx({ code, locale }: TextbookMdxProps) {
  return <Mdx code={code} components={createTextbookMdxComponents(locale)} />;
}
