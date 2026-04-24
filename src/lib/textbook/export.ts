import { getInteractiveSnapshot } from "./interactive-snapshots";
import { getLocalizedText, localeNames, uiText } from "./i18n";
import type {
  ExportBlock,
  ExportableTextbookUnit,
  Locale,
  TextbookUnitMeta,
} from "./types";

const blockTagMap = [
  { name: "Definition", titleAttr: "title", type: "definition" },
  { name: "QuickCheck", titleAttr: "prompt", type: "exercise" },
  { name: "RevealSolution", titleAttr: "title", type: "solution" },
  { name: "TheoremCard", titleAttr: "title", type: "theorem" },
  { name: "WorkedExample", titleAttr: "title", type: "example" },
] as const;

const checklistTitle = {
  en: "Checklist",
  "zh-cn": "检查清单",
  "zh-hk": "檢查清單",
} as const;

const tagAttributesPattern = `((?:"[^"]*"|'[^']*'|[^'">])*)`;

function extractAttribute(attributes: string, attribute: string) {
  return (
    attributes.match(new RegExp(`${attribute}="([^"]+)"`))?.[1] ??
    attributes.match(new RegExp(`${attribute}='([^']+)'`))?.[1] ??
    ""
  );
}

function stripInlineMarkdown(value: string) {
  return value
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1 ($2)")
    .replace(/`([^`]*)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/__([^_]+)__/g, "$1")
    .replace(/~~([^~]+)~~/g, "$1")
    .trim();
}

function parseTableRow(value: string) {
  return value
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => stripInlineMarkdown(cell));
}

function isTableDivider(value: string) {
  return /^\s*\|?(?:\s*:?-{3,}:?\s*\|)+\s*:?-{3,}:?\s*\|?\s*$/.test(value);
}

function normalizeTextbookMdxSource(source: string): string {
  let normalized = source.replace(/^\s*import .*$/gm, "").trim();

  for (const tag of blockTagMap) {
    const matcher = new RegExp(
      `<${tag.name}\\s+${tagAttributesPattern}>([\\s\\S]*?)<\\/${tag.name}>`,
      "g"
    );

    normalized = normalized.replace(
      matcher,
      (_, attributes: string, body: string) => {
        const title = extractAttribute(attributes, tag.titleAttr) || tag.name;
        return `[[BLOCK:${tag.type}|${title}]]\n${body.trim()}\n[[/BLOCK]]`;
      }
    );
  }

  normalized = normalized.replace(
    new RegExp(
      `<CommonMistake\\s+${tagAttributesPattern}>([\\s\\S]*?)<\\/CommonMistake>`,
      "g"
    ),
    (_, attributes: string, body: string) => {
      const title = extractAttribute(attributes, "title") || "Common mistake";
      return `### ${title}\n${body.trim()}`;
    }
  );

  normalized = normalized.replace(
    new RegExp(
      `<CollapsibleProof\\s+${tagAttributesPattern}>([\\s\\S]*?)<\\/CollapsibleProof>`,
      "g"
    ),
    (_, attributes: string, body: string) => {
      const title = extractAttribute(attributes, "title") || "Proof";
      return `[[BLOCK:solution|${title}]]\n${body.trim()}\n[[/BLOCK]]`;
    }
  );

  normalized = normalized.replace(
    new RegExp(
      `<Callout\\s+${tagAttributesPattern}>([\\s\\S]*?)<\\/Callout>`,
      "g"
    ),
    (_, attributes: string, body: string) => {
      const title =
        extractAttribute(attributes, "title") ||
        extractAttribute(attributes, "type") ||
        "Callout";
      return `### ${title}\n${body.trim()}`;
    }
  );

  normalized = normalized.replace(
    new RegExp(`<InteractiveWidget\\s+${tagAttributesPattern}\\s*\\/>`, "g"),
    (_, attributes: string) => {
      const id = extractAttribute(attributes, "id");
      return `[[INTERACTIVE:${id}]]`;
    }
  );

  normalized = normalized.replace(
    new RegExp(
      `<InteractiveWidget\\s+${tagAttributesPattern}><\\/InteractiveWidget>`,
      "g"
    ),
    (_, attributes: string) => {
      const id = extractAttribute(attributes, "id");
      return `[[INTERACTIVE:${id}]]`;
    }
  );

  return normalized;
}

function parseBlocks(markdown: string, locale: Locale): ExportBlock[] {
  const lines = markdown.split(/\r?\n/);
  const blocks: ExportBlock[] = [];
  const paragraph: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length === 0) {
      return;
    }

    blocks.push({
      text: stripInlineMarkdown(paragraph.join(" ").trim()),
      type: "paragraph",
    });
    paragraph.length = 0;
  };

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      continue;
    }

    const blockStart = trimmed.match(/^\[\[BLOCK:([a-z]+)\|(.+)\]\]$/);
    if (blockStart) {
      flushParagraph();
      const [, type, title] = blockStart;
      const nested: string[] = [];
      index += 1;

      while (index < lines.length && lines[index].trim() !== "[[/BLOCK]]") {
        nested.push(lines[index]);
        index += 1;
      }

      blocks.push({
        content: parseBlocks(nested.join("\n"), locale),
        title,
        type: type as Extract<
          ExportBlock["type"],
          "definition" | "theorem" | "example" | "exercise" | "solution"
        >,
      });
      continue;
    }

    const interactiveMatch = trimmed.match(/^\[\[INTERACTIVE:(.+)\]\]$/);
    if (interactiveMatch) {
      flushParagraph();
      const id = interactiveMatch[1];
      const snapshot = getInteractiveSnapshot(id, locale);

      if (snapshot) {
        blocks.push({
          id,
          snapshot,
          type: "interactiveSnapshot",
        });
      }
      continue;
    }

    const imageMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imageMatch) {
      flushParagraph();
      let caption: string | undefined;
      let lookahead = index + 1;

      while (lookahead < lines.length && !lines[lookahead].trim()) {
        lookahead += 1;
      }

      const captionMatch = lines[lookahead]?.trim().match(/^\*([^*]+)\*$/);
      if (captionMatch) {
        caption = stripInlineMarkdown(captionMatch[1]);
        index = lookahead;
      }

      blocks.push({
        alt: stripInlineMarkdown(imageMatch[1]),
        caption,
        src: imageMatch[2],
        type: "image",
      });
      continue;
    }

    if (trimmed === "$$") {
      flushParagraph();
      const mathLines: string[] = [];
      index += 1;

      while (index < lines.length && lines[index].trim() !== "$$") {
        mathLines.push(lines[index]);
        index += 1;
      }

      blocks.push({
        display: true,
        type: "math",
        value: mathLines.join("\n"),
      });
      continue;
    }

    if (
      line.includes("|") &&
      index + 1 < lines.length &&
      isTableDivider(lines[index + 1])
    ) {
      flushParagraph();
      const tableLines = [line];
      index += 2;

      while (index < lines.length && lines[index].includes("|")) {
        tableLines.push(lines[index]);
        index += 1;
      }

      index -= 1;
      blocks.push({
        rows: tableLines.map(parseTableRow),
        type: "table",
      });
      continue;
    }

    const headingMatch = line.match(/^(#{1,4})\s+(.*)$/);
    if (headingMatch) {
      flushParagraph();
      blocks.push({
        level: headingMatch[1].length,
        text: stripInlineMarkdown(headingMatch[2]),
        type: "heading",
      });
      continue;
    }

    const checklistMatch = line.match(/^-\s\[( |x)\]\s+(.*)$/i);
    if (checklistMatch) {
      flushParagraph();
      const items = [stripInlineMarkdown(checklistMatch[2])];
      let nextIndex = index + 1;

      while (nextIndex < lines.length) {
        const nextMatch = lines[nextIndex].match(/^-\s\[( |x)\]\s+(.*)$/i);

        if (!nextMatch) {
          break;
        }

        items.push(stripInlineMarkdown(nextMatch[2]));
        nextIndex += 1;
      }

      blocks.push({
        items,
        title: getLocalizedText(checklistTitle, locale),
        type: "checklist",
      });
      index = nextIndex - 1;
      continue;
    }

    const unorderedListMatch = line.match(/^(\s*)[-*+]\s+(.*)$/);
    if (unorderedListMatch) {
      flushParagraph();
      const depth = Math.floor(unorderedListMatch[1].length / 2);
      blocks.push({
        text: `${"  ".repeat(depth)}• ${stripInlineMarkdown(unorderedListMatch[2])}`,
        type: "paragraph",
      });
      continue;
    }

    const orderedListMatch = line.match(/^(\s*)(\d+)\.\s+(.*)$/);
    if (orderedListMatch) {
      flushParagraph();
      const depth = Math.floor(orderedListMatch[1].length / 2);
      blocks.push({
        text: `${"  ".repeat(depth)}${orderedListMatch[2]}. ${stripInlineMarkdown(orderedListMatch[3])}`,
        type: "paragraph",
      });
      continue;
    }

    if (/^---+$/.test(trimmed)) {
      flushParagraph();
      blocks.push({ type: "separator" });
      continue;
    }

    paragraph.push(trimmed);
  }

  flushParagraph();
  return blocks;
}

function collectInteractiveIds(blocks: ExportBlock[], ids = new Set<string>()) {
  for (const block of blocks) {
    if (block.type === "interactiveSnapshot") {
      ids.add(block.id);
    }

    if (
      block.type === "definition" ||
      block.type === "example" ||
      block.type === "exercise" ||
      block.type === "solution" ||
      block.type === "theorem"
    ) {
      collectInteractiveIds(block.content, ids);
    }
  }

  return ids;
}

export function buildUnitExportBlocks(
  meta: TextbookUnitMeta,
  locale: Locale,
  source: string
) {
  const normalized = normalizeTextbookMdxSource(source);
  const blocks = parseBlocks(normalized, locale);
  const seenInteractiveIds = collectInteractiveIds(blocks);
  const missingInteractiveBlocks = meta.interactiveIds
    .filter((id) => !seenInteractiveIds.has(id))
    .map((id) => {
      const snapshot = getInteractiveSnapshot(id, locale);
      return snapshot
        ? ({
            id,
            snapshot,
            type: "interactiveSnapshot" as const,
          } satisfies ExportBlock)
        : null;
    })
    .filter((block): block is Extract<ExportBlock, { type: "interactiveSnapshot" }> =>
      Boolean(block)
    );

  return [...blocks, ...missingInteractiveBlocks];
}

const exportBlockLabels = {
  definition: {
    en: "Definition",
    "zh-cn": "定义",
    "zh-hk": "定義",
  },
  example: {
    en: "Worked example",
    "zh-cn": "例题",
    "zh-hk": "例題",
  },
  exercise: {
    en: "Exercise",
    "zh-cn": "练习",
    "zh-hk": "練習",
  },
  solution: {
    en: "Solution",
    "zh-cn": "解答",
    "zh-hk": "解答",
  },
  theorem: {
    en: "Theorem",
    "zh-cn": "定理",
    "zh-hk": "定理",
  },
} as const;

function renderBlockToText(block: ExportBlock, locale: Locale, depth = 0): string {
  if (block.type === "heading") {
    return `${"#".repeat(Math.max(1, block.level))} ${block.text}`;
  }

  if (block.type === "paragraph") {
    return block.text;
  }

  if (block.type === "math") {
    return block.display ? `$$\n${block.value}\n$$` : block.value;
  }

  if (block.type === "image") {
    return [
      `[Image] ${block.alt || block.src}`,
      block.src,
      ...(block.caption ? [block.caption] : []),
    ].join("\n");
  }

  if (block.type === "separator") {
    return "----------------------------------------";
  }

  if (block.type === "table") {
    return block.rows.map((row) => row.join(" | ")).join("\n");
  }

  if (block.type === "checklist") {
    return [`${block.title}:`, ...block.items.map((item) => `- ${item}`)].join("\n");
  }

  if (block.type === "interactiveSnapshot") {
    return [
      `[${getLocalizedText(uiText.interactiveSnapshot, locale)}] ${block.snapshot.title}`,
      block.snapshot.summary,
      ...(block.snapshot.steps?.map((step, index) => `${index + 1}. ${step}`) ?? []),
      ...(block.snapshot.sampleStates?.map(
        (state) => `- ${state.label}: ${state.value}`
      ) ?? []),
      ...(block.snapshot.sampleIO?.flatMap((item) => [
        `- ${getLocalizedText(uiText.input, locale)}: ${item.input}`,
        `  ${getLocalizedText(uiText.output, locale)}: ${item.output}`,
      ]) ?? []),
      ...(block.snapshot.staticDiagramNote
        ? [`- ${getLocalizedText(uiText.diagramNote, locale)}: ${block.snapshot.staticDiagramNote}`]
        : []),
    ].join("\n");
  }

  const blockLabel = getLocalizedText(exportBlockLabels[block.type], locale);
  const heading =
    depth > 0
      ? `${"  ".repeat(depth - 1)}- ${blockLabel}: ${block.title}`
      : `## ${blockLabel}: ${block.title}`;

  return [
    heading,
    ...block.content.map((child) => renderBlockToText(child, locale, depth + 1)),
  ].join("\n\n");
}

export function buildTextbookTxt(unit: ExportableTextbookUnit) {
  const metadataLines = [
    unit.title,
    `${unit.course.toUpperCase()} · ${unit.unitNumber}`,
    getLocalizedText(localeNames[unit.locale], unit.locale),
    "",
    unit.description,
  ];

  if (unit.coverageStatus === "MISSING_SOURCE") {
    metadataLines.splice(3, 0, getLocalizedText(uiText.missingSource, unit.locale));
  }

  if (unit.prerequisites.length > 0) {
    metadataLines.push(
      "",
      `${getLocalizedText(uiText.prerequisites, unit.locale)}:`,
      ...unit.prerequisites.map((item) => `- ${item.title[unit.locale]}`)
    );
  }

  if (unit.glossaryRefs.length > 0) {
    metadataLines.push(
      "",
      `${getLocalizedText(uiText.relatedTerms, unit.locale)}:`,
      ...unit.glossaryRefs.map((entry) => {
        return `- ${entry.displayTerm}: ${entry.displayDefinition}`;
      })
    );
  }

  return [
    ...metadataLines,
    "",
    ...unit.blocks.map((block) => renderBlockToText(block, unit.locale)),
    "",
  ].join("\n");
}
