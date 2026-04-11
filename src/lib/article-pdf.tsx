import path from "node:path";
import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
  renderToBuffer,
} from "@react-pdf/renderer";
import { normalizeMdxSource, type ExportArticle } from "./article-export";

type PdfBlock =
  | { type: "code"; value: string }
  | { depth: number; type: "heading"; value: string }
  | { type: "math"; value: string }
  | { type: "paragraph"; value: string }
  | { type: "quote"; value: string }
  | { rows: string[][]; type: "table" }
  | { type: "separator" };

const PDF_FONT_FAMILY = "NotoSansCJK";
const FONT_PATH = path.join(
  process.cwd(),
  "public/fonts/NotoSansCJKtc-Regular.otf"
);

let pdfFontRegistered = false;

const styles = StyleSheet.create({
  code: {
    backgroundColor: "#f5f5f5",
    borderRadius: 6,
    fontSize: 9,
    lineHeight: 1.45,
    marginBottom: 12,
    padding: 10,
  },
  description: {
    color: "#555",
    fontSize: 11,
    lineHeight: 1.5,
    marginBottom: 14,
  },
  heading1: {
    fontSize: 20,
    marginBottom: 10,
    marginTop: 18,
  },
  heading2: {
    fontSize: 16,
    marginBottom: 8,
    marginTop: 16,
  },
  heading3: {
    fontSize: 13,
    marginBottom: 6,
    marginTop: 14,
  },
  heading4: {
    fontSize: 11.5,
    marginBottom: 6,
    marginTop: 12,
  },
  math: {
    fontSize: 10,
    marginBottom: 12,
    paddingLeft: 8,
  },
  meta: {
    color: "#444",
    fontSize: 10,
    marginBottom: 3,
  },
  page: {
    color: "#111",
    fontFamily: PDF_FONT_FAMILY,
    fontSize: 11,
    lineHeight: 1.6,
    padding: 40,
  },
  paragraph: {
    fontSize: 11,
    lineHeight: 1.6,
    marginBottom: 10,
  },
  quote: {
    borderLeftColor: "#888",
    borderLeftWidth: 3,
    color: "#333",
    fontSize: 10.5,
    lineHeight: 1.6,
    marginBottom: 12,
    paddingLeft: 10,
  },
  separator: {
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
    marginBottom: 12,
    marginTop: 6,
  },
  table: {
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 12,
  },
  tableCell: {
    flexBasis: 0,
    flexGrow: 1,
    fontSize: 10,
    padding: 6,
  },
  tableHeaderCell: {
    backgroundColor: "#f0f0f0",
  },
  tableRow: {
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    flexDirection: "row",
  },
  title: {
    fontSize: 24,
    marginBottom: 8,
  },
});

function ensurePdfFont() {
  if (pdfFontRegistered) {
    return;
  }

  Font.register({
    family: PDF_FONT_FAMILY,
    src: FONT_PATH,
  });
  pdfFontRegistered = true;
}

function stripInlineMarkdown(value: string) {
  return value
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1 ($2)")
    .replace(/[*_~`]/g, "")
    .trim();
}

function isTableDivider(value: string) {
  return /^\s*\|?(?:\s*:?-{3,}:?\s*\|)+\s*:?-{3,}:?\s*\|?\s*$/.test(value);
}

function parseTableRow(value: string) {
  return value
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => stripInlineMarkdown(cell));
}

function markdownToPdfBlocks(markdown: string): PdfBlock[] {
  const lines = normalizeMdxSource(markdown).split(/\r?\n/);
  const blocks: PdfBlock[] = [];
  const paragraph: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length === 0) {
      return;
    }

    blocks.push({
      type: "paragraph",
      value: stripInlineMarkdown(paragraph.join(" ").trim()),
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

    if (line.startsWith("```")) {
      flushParagraph();

      const codeLines: string[] = [];
      index += 1;

      while (index < lines.length && !lines[index].startsWith("```")) {
        codeLines.push(lines[index]);
        index += 1;
      }

      blocks.push({ type: "code", value: codeLines.join("\n") });
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

      blocks.push({ type: "math", value: mathLines.join("\n") });
      continue;
    }

    if (line.includes("|") && index + 1 < lines.length && isTableDivider(lines[index + 1])) {
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
        depth: headingMatch[1].length,
        type: "heading",
        value: stripInlineMarkdown(headingMatch[2]),
      });
      continue;
    }

    if (/^\s*>/.test(line)) {
      flushParagraph();

      const quoteLines = [line.replace(/^\s*>\s?/, "")];
      let nextIndex = index + 1;

      while (nextIndex < lines.length && /^\s*>/.test(lines[nextIndex])) {
        quoteLines.push(lines[nextIndex].replace(/^\s*>\s?/, ""));
        nextIndex += 1;
      }

      blocks.push({
        type: "quote",
        value: stripInlineMarkdown(quoteLines.join(" ").trim()),
      });
      index = nextIndex - 1;
      continue;
    }

    const unorderedListMatch = line.match(/^(\s*)[-*+]\s+(.*)$/);
    if (unorderedListMatch) {
      flushParagraph();
      const depth = Math.floor(unorderedListMatch[1].length / 2);
      blocks.push({
        type: "paragraph",
        value: `${"  ".repeat(depth)}• ${stripInlineMarkdown(unorderedListMatch[2])}`,
      });
      continue;
    }

    const orderedListMatch = line.match(/^(\s*)(\d+)\.\s+(.*)$/);
    if (orderedListMatch) {
      flushParagraph();
      const depth = Math.floor(orderedListMatch[1].length / 2);
      blocks.push({
        type: "paragraph",
        value: `${"  ".repeat(depth)}${orderedListMatch[2]}. ${stripInlineMarkdown(orderedListMatch[3])}`,
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

function renderBlock(block: PdfBlock, index: number) {
  if (block.type === "heading") {
    const style =
      block.depth === 1
        ? styles.heading1
        : block.depth === 2
          ? styles.heading2
          : block.depth === 3
            ? styles.heading3
            : styles.heading4;

    return (
      <Text key={`heading-${index}`} style={style}>
        {block.value}
      </Text>
    );
  }

  if (block.type === "code") {
    return (
      <Text key={`code-${index}`} style={styles.code}>
        {block.value}
      </Text>
    );
  }

  if (block.type === "math") {
    return (
      <Text key={`math-${index}`} style={styles.math}>
        {block.value}
      </Text>
    );
  }

  if (block.type === "quote") {
    return (
      <Text key={`quote-${index}`} style={styles.quote}>
        {block.value}
      </Text>
    );
  }

  if (block.type === "separator") {
    return <View key={`separator-${index}`} style={styles.separator} />;
  }

  if (block.type === "table") {
    const [header, ...rows] = block.rows;

    return (
      <View key={`table-${index}`} style={styles.table}>
        <View style={styles.tableRow}>
          {header.map((cell, cellIndex) => (
            <Text
              key={`table-${index}-header-${cellIndex}`}
              style={[styles.tableCell, styles.tableHeaderCell]}
            >
              {cell}
            </Text>
          ))}
        </View>
        {rows.map((row, rowIndex) => (
          <View key={`table-${index}-row-${rowIndex}`} style={styles.tableRow}>
            {row.map((cell, cellIndex) => (
              <Text
                key={`table-${index}-row-${rowIndex}-cell-${cellIndex}`}
                style={styles.tableCell}
              >
                {cell}
              </Text>
            ))}
          </View>
        ))}
      </View>
    );
  }

  return (
    <Text key={`paragraph-${index}`} style={styles.paragraph}>
      {block.value}
    </Text>
  );
}

function ArticlePdfDocument({ article }: { article: ExportArticle }) {
  const blocks = markdownToPdfBlocks(article.bodyRaw);
  const metadata = [
    `Source: https://www.mixuanda.top${article.path}`,
    `Published: ${article.date}`,
  ];

  if (article.category) {
    metadata.push(`Category: ${article.category}`);
  }

  if (article.series) {
    metadata.push(`Series: ${article.series}`);
  }

  if (article.tags.length > 0) {
    metadata.push(`Tags: ${article.tags.join(", ")}`);
  }

  if (article.link) {
    metadata.push(`Link: ${article.link}`);
  }

  if (article.github) {
    metadata.push(`GitHub: ${article.github}`);
  }

  return (
    <Document title={article.title}>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>{article.title}</Text>
        <Text style={styles.description}>{article.description}</Text>
        {metadata.map((line) => (
          <Text key={line} style={styles.meta}>
            {line}
          </Text>
        ))}
        <View style={{ marginBottom: 14 }} />
        {blocks.map(renderBlock)}
      </Page>
    </Document>
  );
}

export async function buildArticlePdf(article: ExportArticle) {
  ensurePdfFont();
  return renderToBuffer(<ArticlePdfDocument article={article} />);
}
