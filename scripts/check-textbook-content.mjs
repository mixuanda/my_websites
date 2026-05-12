#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const CONTENT_ROOT = path.join(ROOT, "content", "textbook");

const REQUIRED_BLOCKS = [
  "motivation",
  "definitions",
  "theorem/proposition",
  "proof sketch or proof idea",
  "worked examples",
  "common mistakes",
  "summary",
  "exercises",
  "solutions",
];

const LOCALE_DEPTH_TARGETS = {
  en: { min: 1800, max: 3000 },
  "zh-hk": { min: 1300, max: 2200 },
  "zh-cn": { min: 1300, max: 2200 },
};

const MIN_THEOREMS = 2;
const MIN_WORKED_EXAMPLES = 3;
const MIN_ARTICLE_SIGNALS = 5;
const MAX_WARNINGS = Number(process.env.CONTENT_CHECK_MAX_WARNINGS ?? "80");

const HEADING_ALIASES = {
  motivation: [/^motivation$/i, /^動機$/, /^动机$/],
  definitions: [/^definitions$/i, /^定義$/, /^定义$/],
  "theorem/proposition": [/^(theorem|theorem\/proposition|proposition)s?$/i, /^定理\s*\/\s*命題$/, /^定理\s*\/\s*命题$/],
  "proof sketch or proof idea": [/^proof sketch or proof idea$/i, /^證明思路(或證明)?$/, /^证明思路(或证明)?$/],
  "worked examples": [/^worked examples?$/i, /^例題(?:詳解)?$/, /^例题(?:详解)?$/],
  "common mistakes": [/^common mistakes?$/i, /^常見錯誤$/, /^常见错误$/],
  summary: [/^summary$/i, /^總結$/, /^总结$/],
  exercises: [/^exercises$/i, /^練習$/, /^练习$/],
  solutions: [/^solutions$/i, /^解答$/, /^答案與解答$/, /^答案与解答$/],
};

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, out);
    } else if (["en.mdx", "zh-hk.mdx", "zh-cn.mdx"].includes(entry.name)) {
      out.push(full);
    }
  }
  return out;
}

function extractHeadings(content) {
  const headings = [];
  const lines = content.split(/\r?\n/);
  for (let i = 0; i < lines.length; i += 1) {
    const m = lines[i].match(/^##\s+(.+)$/);
    if (m) headings.push({ text: m[1].trim(), line: i + 1 });
  }
  return headings;
}

function normalizeHeading(text) {
  return text
    .toLowerCase()
    .replace(/[：:]/g, "")
    .replace(/\(.*?\)/g, "")
    .trim();
}

function findBlockIndices(headings) {
  const indices = new Map();
  for (let i = 0; i < headings.length; i += 1) {
    const normalized = normalizeHeading(headings[i].text);
    for (const [block, patterns] of Object.entries(HEADING_ALIASES)) {
      if (indices.has(block)) continue;
      if (patterns.some((re) => re.test(normalized) || re.test(headings[i].text.trim()))) {
        indices.set(block, i);
      }
    }
  }
  return indices;
}

function depthProxy(content, locale) {
  const body = content
    .replace(/^---[\s\S]*?---\s*/m, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\$\$[\s\S]*?\$\$/g, " ")
    .replace(/`[^`]*`/g, " ");

  if (locale === "en") {
    return body.split(/\s+/).filter(Boolean).length;
  }
  const cjkChars = (body.match(/[\u3400-\u9FFF]/g) || []).length;
  const latinWords = body.split(/\s+/).filter((token) => /[A-Za-z]/.test(token)).length;
  return Math.round(cjkChars / 1.8 + latinWords);
}

function countOccurrences(content, token) {
  return (content.match(new RegExp(`<${token}(\\s|>)`, "g")) || []).length;
}

function hasBlockSignal(block, content, blockIndices) {
  if (blockIndices.has(block)) return true;

  if (block === "definitions") {
    return /<Definition(\s|>)/.test(content);
  }
  if (block === "theorem/proposition") {
    return /<TheoremCard(\s|>)/.test(content);
  }
  if (block === "proof sketch or proof idea") {
    return /<CollapsibleProof(\s|>)/.test(content);
  }
  if (block === "worked examples") {
    return /<WorkedExample(\s|>)/.test(content);
  }
  if (block === "common mistakes") {
    return /<CommonMistake(\s|>)/.test(content);
  }
  if (block === "exercises") {
    return /<QuickCheck(\s|>)/.test(content);
  }
  if (block === "solutions") {
    return /<RevealSolution(\s|>)/.test(content);
  }

  return false;
}

const files = walk(CONTENT_ROOT);
const errors = [];
const warnings = [];

for (const file of files) {
  const rel = path.relative(ROOT, file);
  const locale = path.basename(file, ".mdx");
  const raw = fs.readFileSync(file, "utf8");
  const headings = extractHeadings(raw);
  const blockIndices = findBlockIndices(headings);

  const frontmatter = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatter || !/^title:\s*.+$/m.test(frontmatter[1]) || !/^description:\s*.+$/m.test(frontmatter[1])) {
    errors.push(`${rel}: missing title or description frontmatter`);
  }

  if (headings.length < 3) {
    errors.push(`${rel}: too few article headings (${headings.length})`);
  }

  const presentBlocks = REQUIRED_BLOCKS.filter((block) =>
    hasBlockSignal(block, raw, blockIndices)
  );
  const missingBlocks = REQUIRED_BLOCKS.filter(
    (block) => !presentBlocks.includes(block)
  );
  if (presentBlocks.length < MIN_ARTICLE_SIGNALS) {
    warnings.push(
      `${rel}: article-shape signals ${presentBlocks.length}/${REQUIRED_BLOCKS.length}; missing -> ${missingBlocks.join(", ")}`
    );
  }

  const indices = REQUIRED_BLOCKS.map((block) => blockIndices.get(block));
  if (indices.every((index) => typeof index === "number")) {
    for (let i = 1; i < indices.length; i += 1) {
      if (indices[i] <= indices[i - 1]) {
        warnings.push(`${rel}: recommended block order is unusual at "${REQUIRED_BLOCKS[i]}"`);
        break;
      }
    }
  }

  const targets = LOCALE_DEPTH_TARGETS[locale] ?? LOCALE_DEPTH_TARGETS.en;
  const proxy = depthProxy(raw, locale);
  if (proxy < targets.min) {
    warnings.push(`${rel}: depth proxy ${proxy} below min ${targets.min}`);
  }
  if (proxy > targets.max) {
    warnings.push(`${rel}: depth proxy ${proxy} above recommended max ${targets.max}`);
  }

  const theoremCount = countOccurrences(raw, "TheoremCard");
  if (theoremCount > 0 && theoremCount < MIN_THEOREMS) {
    warnings.push(`${rel}: theorem/proposition count ${theoremCount} below target ${MIN_THEOREMS}`);
  }

  const exampleCount = countOccurrences(raw, "WorkedExample");
  if (exampleCount > 0 && exampleCount < MIN_WORKED_EXAMPLES) {
    warnings.push(`${rel}: worked-example count ${exampleCount} below target ${MIN_WORKED_EXAMPLES}`);
  }

  const quickCheckCount = countOccurrences(raw, "QuickCheck");
  const revealSolutionCount = countOccurrences(raw, "RevealSolution");
  if (quickCheckCount > revealSolutionCount) {
    errors.push(
      `${rel}: ${quickCheckCount} QuickCheck blocks but only ${revealSolutionCount} RevealSolution blocks`
    );
  }
}

if (warnings.length) {
  const visibleWarnings =
    process.env.CONTENT_CHECK_SHOW_ALL === "1"
      ? warnings
      : warnings.slice(0, MAX_WARNINGS);

  console.log(`[content-check] warnings (${warnings.length})`);
  for (const item of visibleWarnings) console.log(`- ${item}`);
  if (visibleWarnings.length < warnings.length) {
    console.log(
      `[content-check] ${warnings.length - visibleWarnings.length} more warnings hidden; set CONTENT_CHECK_SHOW_ALL=1 to print all.`
    );
  }
}

if (errors.length) {
  console.error("[content-check] errors");
  for (const item of errors) console.error(`- ${item}`);
  process.exit(1);
}

console.log(`[content-check] checked ${files.length} units; required structure present.`);
