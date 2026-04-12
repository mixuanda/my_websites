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
import { getCoverageLabel, getLocalizedText, uiText } from "./i18n";
import type { ExportBlock, ExportableTextbookUnit } from "./types";

const PDF_FONT_FAMILY = "NotoSansCJK";
const FONT_PATH = path.join(
  process.cwd(),
  "public/fonts/NotoSansCJKtc-Regular.otf"
);

let pdfFontRegistered = false;

const styles = StyleSheet.create({
  bodyText: {
    fontSize: 11,
    lineHeight: 1.6,
    marginBottom: 9,
  },
  card: {
    borderColor: "#d4d4d8",
    borderLeftWidth: 4,
    borderRadius: 8,
    marginBottom: 12,
    padding: 10,
  },
  cardLabel: {
    color: "#52525b",
    fontSize: 9,
    marginBottom: 4,
    textTransform: "uppercase",
  },
  cardTitle: {
    fontSize: 12,
    marginBottom: 6,
  },
  heading1: {
    fontSize: 22,
    marginBottom: 10,
    marginTop: 18,
  },
  heading2: {
    fontSize: 16,
    marginBottom: 8,
    marginTop: 14,
  },
  heading3: {
    fontSize: 13,
    marginBottom: 6,
    marginTop: 12,
  },
  math: {
    fontFamily: PDF_FONT_FAMILY,
    fontSize: 10,
    marginBottom: 10,
  },
  meta: {
    color: "#52525b",
    fontSize: 10,
    lineHeight: 1.5,
    marginBottom: 3,
  },
  page: {
    color: "#111827",
    fontFamily: PDF_FONT_FAMILY,
    padding: 38,
  },
  separator: {
    borderBottomColor: "#d4d4d8",
    borderBottomWidth: 1,
    marginBottom: 12,
    marginTop: 8,
  },
  table: {
    borderColor: "#d4d4d8",
    borderWidth: 1,
    marginBottom: 12,
  },
  tableCell: {
    flexBasis: 0,
    flexGrow: 1,
    fontSize: 10,
    padding: 6,
  },
  tableHeader: {
    backgroundColor: "#f4f4f5",
  },
  tableRow: {
    borderBottomColor: "#d4d4d8",
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

function renderBlocks(
  blocks: ExportBlock[],
  locale: ExportableTextbookUnit["locale"],
  depth = 0
): React.ReactNode[] {
  return blocks.map((block, index) => {
    if (block.type === "heading") {
      const style =
        block.level === 1
          ? styles.heading1
          : block.level === 2
            ? styles.heading2
            : styles.heading3;

      return (
        <Text key={`heading-${depth}-${index}`} style={style}>
          {block.text}
        </Text>
      );
    }

    if (block.type === "paragraph") {
      return (
        <Text key={`paragraph-${depth}-${index}`} style={styles.bodyText}>
          {block.text}
        </Text>
      );
    }

    if (block.type === "math") {
      return (
        <Text key={`math-${depth}-${index}`} style={styles.math}>
          {block.value}
        </Text>
      );
    }

    if (block.type === "separator") {
      return <View key={`separator-${depth}-${index}`} style={styles.separator} />;
    }

    if (block.type === "table") {
      const [header, ...rows] = block.rows;

      return (
        <View key={`table-${depth}-${index}`} style={styles.table}>
          <View style={styles.tableRow}>
            {header.map((cell, cellIndex) => (
              <Text
                key={`header-${cellIndex}`}
                style={[styles.tableCell, styles.tableHeader]}
              >
                {cell}
              </Text>
            ))}
          </View>
          {rows.map((row, rowIndex) => (
            <View key={`row-${rowIndex}`} style={styles.tableRow}>
              {row.map((cell, cellIndex) => (
                <Text key={`cell-${rowIndex}-${cellIndex}`} style={styles.tableCell}>
                  {cell}
                </Text>
              ))}
            </View>
          ))}
        </View>
      );
    }

    if (block.type === "checklist") {
      return (
        <View key={`checklist-${depth}-${index}`} style={styles.card}>
          <Text style={styles.cardLabel}>{block.title}</Text>
          {block.items.map((item) => (
            <Text key={item} style={styles.bodyText}>
              • {item}
            </Text>
          ))}
        </View>
      );
    }

    if (block.type === "interactiveSnapshot") {
      return (
        <View key={`interactive-${depth}-${index}`} style={styles.card}>
          <Text style={styles.cardLabel}>
            {getLocalizedText(uiText.interactiveSnapshot, locale)}
          </Text>
          <Text style={styles.cardTitle}>{block.snapshot.title}</Text>
          <Text style={styles.bodyText}>{block.snapshot.summary}</Text>
          {block.snapshot.steps?.map((step, stepIndex) => (
            <Text key={`step-${stepIndex}`} style={styles.bodyText}>
              {stepIndex + 1}. {step}
            </Text>
          ))}
          {block.snapshot.sampleStates?.map((sample) => (
            <Text key={sample.label} style={styles.bodyText}>
              • {sample.label}: {sample.value}
            </Text>
          ))}
          {block.snapshot.sampleIO?.map((pair, pairIndex) => (
            <View key={`pair-${pairIndex}`}>
              <Text style={styles.bodyText}>
                • {getLocalizedText(uiText.input, locale)}: {pair.input}
              </Text>
              <Text style={styles.bodyText}>
                {"  "}
                {getLocalizedText(uiText.output, locale)}: {pair.output}
              </Text>
            </View>
          ))}
          {block.snapshot.staticDiagramNote ? (
            <Text style={styles.bodyText}>
              • {getLocalizedText(uiText.diagramNote, locale)}: {block.snapshot.staticDiagramNote}
            </Text>
          ) : null}
        </View>
      );
    }

    return (
      <View key={`card-${depth}-${index}`} style={styles.card}>
        <Text style={styles.cardLabel}>
          {getLocalizedText(exportBlockLabels[block.type], locale)}
        </Text>
        <Text style={styles.cardTitle}>{block.title}</Text>
        {renderBlocks(block.content, locale, depth + 1)}
      </View>
    );
  });
}

function TextbookUnitPdf({ unit }: { unit: ExportableTextbookUnit }) {
  return (
    <Document title={unit.title}>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>{unit.title}</Text>
        <Text style={styles.meta}>{`${unit.course.toUpperCase()} · ${unit.unitNumber}`}</Text>
        <Text style={styles.meta}>{getCoverageLabel(unit.coverageStatus, unit.locale)}</Text>
        <Text style={styles.bodyText}>{unit.description}</Text>
        {unit.prerequisites.length > 0 ? (
          <View style={{ marginBottom: 8 }}>
            <Text style={styles.meta}>
              {getLocalizedText(uiText.prerequisites, unit.locale)}
            </Text>
            {unit.prerequisites.map((item) => (
              <Text key={item.unitId} style={styles.bodyText}>
                • {item.title[unit.locale]}
              </Text>
            ))}
          </View>
        ) : null}
        {unit.glossaryRefs.length > 0 ? (
          <View style={{ marginBottom: 8 }}>
            <Text style={styles.meta}>
              {getLocalizedText(uiText.relatedTerms, unit.locale)}
            </Text>
            {unit.glossaryRefs.map((entry) => (
              <Text key={entry.id} style={styles.bodyText}>
                • {entry.displayTerm}: {entry.displayDefinition}
              </Text>
            ))}
          </View>
        ) : null}
        {renderBlocks(unit.blocks, unit.locale)}
      </Page>
    </Document>
  );
}

export async function buildTextbookPdf(unit: ExportableTextbookUnit) {
  ensurePdfFont();
  return renderToBuffer(<TextbookUnitPdf unit={unit} />);
}
