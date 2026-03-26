import { allNotes, allPosts, allProjects } from "contentlayer/generated";

export type ExportArticleKind = "blog" | "notes" | "projects";

type ExportArticleSource =
  | (typeof allPosts)[number]
  | (typeof allNotes)[number]
  | (typeof allProjects)[number];

type MdxBody = {
  code: string;
  raw: string;
};

export interface ExportArticle {
  bodyCode: string;
  bodyRaw: string;
  category?: string;
  date: string;
  description: string;
  github?: string;
  kind: ExportArticleKind;
  link?: string;
  path: string;
  series?: string;
  slug: string;
  tags: string[];
  title: string;
}

function getArticlePath(kind: ExportArticleKind, slug: string) {
  return `/${kind}/${slug}`;
}

function toExportArticle(
  kind: ExportArticleKind,
  source: ExportArticleSource
): ExportArticle {
  const body = source.body as MdxBody;

  return {
    bodyCode: body.code,
    bodyRaw: body.raw,
    category: "category" in source ? source.category : undefined,
    date: source.date,
    description: source.description,
    github: "github" in source ? source.github : undefined,
    kind,
    link: "link" in source ? source.link : undefined,
    path: getArticlePath(kind, source.slug),
    series: "series" in source ? source.series : undefined,
    slug: source.slug,
    tags: source.tags,
    title: source.title,
  };
}

export function getExportArticle(
  kind: ExportArticleKind,
  slug: string
): ExportArticle | null {
  const decodedSlug = decodeURIComponent(slug);

  if (kind === "blog") {
    const post = allPosts.find((item) => item.slug === decodedSlug);
    return post ? toExportArticle(kind, post) : null;
  }

  if (kind === "notes") {
    const note = allNotes.find((item) => item.slug === decodedSlug);
    return note ? toExportArticle(kind, note) : null;
  }

  const project = allProjects.find((item) => item.slug === decodedSlug);
  return project ? toExportArticle(kind, project) : null;
}

function escapeLatexText(value: string) {
  return value
    .replace(/\\/g, "\\textbackslash{}")
    .replace(/([#$%&_{}])/g, "\\$1")
    .replace(/~/g, "\\textasciitilde{}")
    .replace(/\^/g, "\\textasciicircum{}");
}

function convertInlineMarkdown(value: string): string {
  const replacements: string[] = [];
  const placeholder = (content: string) => {
    const id = replacements.push(content) - 1;
    return `LATEXPLACEHOLDER${id}TOKEN`;
  };

  const withTokens = value
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label: string, href: string) =>
      placeholder(`\\href{${href}}{${convertInlineMarkdown(label)}}`)
    )
    .replace(/~~([^~]+)~~/g, (_, content: string) =>
      placeholder(`\\sout{${convertInlineMarkdown(content)}}`)
    )
    .replace(/\*\*([^*]+)\*\*/g, (_, content: string) =>
      placeholder(`\\textbf{${convertInlineMarkdown(content)}}`)
    )
    .replace(/\*([^*]+)\*/g, (_, content: string) =>
      placeholder(`\\emph{${convertInlineMarkdown(content)}}`)
    );

  const parts = withTokens.split(/(`[^`]+`|\$[^$\n]+\$)/g);
  const converted = parts
    .map((part) => {
      if (!part) {
        return "";
      }

      if (part.startsWith("`") && part.endsWith("`")) {
        return `\\texttt{${escapeLatexText(part.slice(1, -1))}}`;
      }

      if (part.startsWith("$") && part.endsWith("$")) {
        return part;
      }

      return escapeLatexText(part);
    })
    .join("");

  return converted.replace(
    /LATEXPLACEHOLDER(\d+)TOKEN/g,
    (_, index: string) => replacements[Number(index)]
  );
}

function normalizeMdxSource(value: string) {
  const withoutImports = value.replace(/^\s*import .*$/gm, "").trim();

  return withoutImports.replace(
    /<Callout\s+([^>]*)>([\s\S]*?)<\/Callout>/g,
    (_, attributes: string, body: string) => {
      const title =
        attributes.match(/title="([^"]+)"/)?.[1] ||
        attributes.match(/type="([^"]+)"/)?.[1] ||
        "Callout";
      const lines = body
        .trim()
        .split("\n")
        .map((line) => line.trimEnd());

      return [
        `> **${title}**`,
        ...lines.map((line) => (line ? `> ${line}` : ">")),
      ].join("\n");
    }
  );
}

function isTableDivider(value: string) {
  return /^\s*\|?(?:\s*:?-{3,}:?\s*\|)+\s*:?-{3,}:?\s*\|?\s*$/.test(value);
}

function parseTableRow(value: string) {
  const trimmed = value.trim().replace(/^\|/, "").replace(/\|$/, "");
  return trimmed.split("|").map((cell) => cell.trim());
}

function convertTable(lines: string[]) {
  const rows = lines.map(parseTableRow);
  const [header, , ...body] = rows;
  const spec = `|${"X|".repeat(header.length)}`;

  return [
    "\\begin{center}",
    `\\begin{tabularx}{\\textwidth}{${spec}}`,
    "\\hline",
    `${header.map((cell) => `\\textbf{${convertInlineMarkdown(cell)}}`).join(" & ")} \\\\`,
    "\\hline",
    ...body.map(
      (row) =>
        `${row.map((cell) => convertInlineMarkdown(cell)).join(" & ")} \\\\`
    ),
    "\\hline",
    "\\end{tabularx}",
    "\\end{center}",
  ].join("\n");
}

function markdownToLatex(markdown: string): string {
  const lines = normalizeMdxSource(markdown).split(/\r?\n/);
  const output: string[] = [];
  const paragraph: string[] = [];
  const listStack: Array<"itemize" | "enumerate"> = [];

  const closeLists = (targetDepth = 0) => {
    while (listStack.length > targetDepth) {
      output.push(`\\end{${listStack.pop()!}}`);
    }
  };

  const flushParagraph = () => {
    if (paragraph.length === 0) {
      return;
    }

    output.push(convertInlineMarkdown(paragraph.join(" ").trim()));
    paragraph.length = 0;
  };

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      closeLists();
      continue;
    }

    if (line.startsWith("```")) {
      flushParagraph();
      closeLists();

      const codeLines: string[] = [];
      index += 1;

      while (index < lines.length && !lines[index].startsWith("```")) {
        codeLines.push(lines[index]);
        index += 1;
      }

      output.push(
        "\\begin{Verbatim}[breaklines=true,fontsize=\\small]",
        codeLines.join("\n"),
        "\\end{Verbatim}"
      );
      continue;
    }

    if (trimmed === "$$") {
      flushParagraph();
      closeLists();

      const mathLines: string[] = [];
      index += 1;

      while (index < lines.length && lines[index].trim() !== "$$") {
        mathLines.push(lines[index]);
        index += 1;
      }

      output.push("\\[", mathLines.join("\n"), "\\]");
      continue;
    }

    if (line.includes("|") && index + 1 < lines.length && isTableDivider(lines[index + 1])) {
      flushParagraph();
      closeLists();

      const tableLines = [line, lines[index + 1]];
      index += 2;

      while (index < lines.length && lines[index].includes("|")) {
        tableLines.push(lines[index]);
        index += 1;
      }

      index -= 1;
      output.push(convertTable(tableLines));
      continue;
    }

    const headingMatch = line.match(/^(#{1,4})\s+(.*)$/);
    if (headingMatch) {
      flushParagraph();
      closeLists();

      const headingLevel = headingMatch[1].length;
      const headingText = convertInlineMarkdown(headingMatch[2].trim());

      if (headingLevel === 1) {
        output.push(`\\section{${headingText}}`);
      } else if (headingLevel === 2) {
        output.push(`\\subsection{${headingText}}`);
      } else if (headingLevel === 3) {
        output.push(`\\subsubsection{${headingText}}`);
      } else {
        output.push(`\\paragraph{${headingText}}`);
      }
      continue;
    }

    if (/^\s*>/.test(line)) {
      flushParagraph();
      closeLists();

      const quoteLines = [line.replace(/^\s*>\s?/, "")];
      let nextIndex = index + 1;

      while (nextIndex < lines.length && /^\s*>/.test(lines[nextIndex])) {
        quoteLines.push(lines[nextIndex].replace(/^\s*>\s?/, ""));
        nextIndex += 1;
      }

      output.push("\\begin{quote}", markdownToLatex(quoteLines.join("\n")), "\\end{quote}");
      index = nextIndex - 1;
      continue;
    }

    const listMatch =
      line.match(/^(\s*)([-*+])\s+(.*)$/) ||
      line.match(/^(\s*)(\d+)\.\s+(.*)$/);
    if (listMatch) {
      flushParagraph();

      const depth = Math.floor(listMatch[1].length / 2);
      const type =
        /^[0-9]+$/.test(listMatch[2]) ? "enumerate" : "itemize";
      const content = listMatch[3];

      if (listStack.length > depth + 1) {
        closeLists(depth + 1);
      }

      if (listStack.length === depth + 1 && listStack[depth] !== type) {
        closeLists(depth);
      }

      while (listStack.length < depth + 1) {
        listStack.push(type);
        output.push(`\\begin{${type}}`);
      }

      output.push(`\\item ${convertInlineMarkdown(content)}`);
      continue;
    }

    if (/^---+$/.test(trimmed)) {
      flushParagraph();
      closeLists();
      output.push("\\medskip\\hrule\\medskip");
      continue;
    }

    paragraph.push(trimmed);
  }

  flushParagraph();
  closeLists();

  return output.join("\n\n");
}

export function buildArticleTex(article: ExportArticle) {
  const metadataLines = [
    `\\textbf{Source} \\href{https://www.mixuanda.top${article.path}}{https://www.mixuanda.top${article.path}}`,
    `\\textbf{Published} ${escapeLatexText(article.date)}`,
  ];

  if (article.category) {
    metadataLines.push(`\\textbf{Category} ${escapeLatexText(article.category)}`);
  }

  if (article.series) {
    metadataLines.push(`\\textbf{Series} ${escapeLatexText(article.series)}`);
  }

  if (article.tags.length > 0) {
    metadataLines.push(
      `\\textbf{Tags} ${article.tags.map((tag) => escapeLatexText(tag)).join(", ")}`
    );
  }

  if (article.link) {
    metadataLines.push(`\\textbf{Link} \\url{${article.link}}`);
  }

  if (article.github) {
    metadataLines.push(`\\textbf{GitHub} \\url{${article.github}}`);
  }

  return [
    "% Generated by mixuanda.top",
    "% Compile with xelatex for the best Unicode/CJK support.",
    "\\documentclass[11pt]{article}",
    "\\usepackage[a4paper,margin=1in]{geometry}",
    "\\usepackage{fontspec}",
    "\\usepackage{xeCJK}",
    "\\usepackage{amsmath,amssymb}",
    "\\usepackage{hyperref}",
    "\\usepackage{tabularx}",
    "\\usepackage{array}",
    "\\usepackage{fancyvrb}",
    "\\usepackage[normalem]{ulem}",
    "\\usepackage{enumitem}",
    "\\setCJKmainfont{FandolSong-Regular}",
    "\\setlength{\\parskip}{0.8em}",
    "\\setlength{\\parindent}{0pt}",
    `\\title{${escapeLatexText(article.title)}}`,
    `\\date{${escapeLatexText(article.date)}}`,
    "\\begin{document}",
    "\\maketitle",
    `\\begin{quote}\n${convertInlineMarkdown(article.description)}\n\\end{quote}`,
    metadataLines.join("\\\\\n"),
    "\\tableofcontents",
    "\\newpage",
    markdownToLatex(article.bodyRaw),
    "\\end{document}",
    "",
  ].join("\n");
}
