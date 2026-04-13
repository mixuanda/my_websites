#!/usr/bin/env node
import { promises as fs } from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import YAML from 'yaml';

const ROOT = process.cwd();
const CONTENT_ROOT = path.join(ROOT, 'content', 'textbook');
const OUTPUT_ROOT = path.join(ROOT, 'internal', 'storyboards');
const REQUIRED_SEGMENT_TYPES = [
  'concept_intro',
  'theorem_statement',
  'example_walkthrough',
  'recap_checkpoints',
];

function stableStringify(value) {
  if (Array.isArray(value)) {
    return `[${value.map((item) => stableStringify(item)).join(',')}]`;
  }
  if (value && typeof value === 'object') {
    const keys = Object.keys(value).sort();
    return `{${keys
      .map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`)
      .join(',')}}`;
  }
  return JSON.stringify(value);
}

function toHeading(type) {
  return type
    .split('_')
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(' ');
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
      continue;
    }

    if (!entry.isFile()) continue;

    if (/storyboard\.(json|ya?ml)$/u.test(entry.name)) {
      files.push(fullPath);
    }
  }

  return files;
}

async function readStoryboard(filePath) {
  const raw = await fs.readFile(filePath, 'utf8');
  if (filePath.endsWith('.json')) {
    return JSON.parse(raw);
  }
  return YAML.parse(raw);
}

function validateStoryboard(filePath, doc) {
  const requiredFields = ['course', 'chapter', 'unit', 'unitTitle', 'locales'];
  for (const field of requiredFields) {
    if (!(field in doc)) {
      throw new Error(`Missing required field "${field}" in ${filePath}`);
    }
  }

  const localeEntries = Object.entries(doc.locales);
  if (localeEntries.length === 0) {
    throw new Error(`No locales found in ${filePath}`);
  }

  for (const [locale, payload] of localeEntries) {
    const segmentTypes = payload.segments?.map((segment) => segment.type) ?? [];
    for (const type of REQUIRED_SEGMENT_TYPES) {
      if (!segmentTypes.includes(type)) {
        throw new Error(
          `Locale ${locale} in ${filePath} is missing segment type ${type}`,
        );
      }
    }
  }
}

function renderScript(locale, localePayload) {
  const lines = [
    `# Script Draft (${locale})`,
    '',
    `Audience: ${localePayload.audienceLevel}`,
    '',
  ];

  for (const segmentType of REQUIRED_SEGMENT_TYPES) {
    const segment = localePayload.segments.find((item) => item.type === segmentType);
    lines.push(`## ${toHeading(segment.type)}`);
    lines.push(`Goal: ${segment.goal}`);
    lines.push('');

    for (const bullet of segment.beats) {
      lines.push(`- ${bullet}`);
    }

    if (segment.mathBlocks?.length) {
      lines.push('', 'Math blocks:');
      for (const block of segment.mathBlocks) {
        lines.push(`- \`${block}\``);
      }
    }

    lines.push('');
  }

  return `${lines.join('\n').trimEnd()}\n`;
}

function renderNarration(localePayload) {
  const lines = [];
  for (const segmentType of REQUIRED_SEGMENT_TYPES) {
    const segment = localePayload.segments.find((item) => item.type === segmentType);
    lines.push(`[${segmentType}]`);
    lines.push(...segment.voiceover);
    lines.push('');
  }
  return `${lines.join('\n').trimEnd()}\n`;
}

function buildSlidePlan(localePayload) {
  return REQUIRED_SEGMENT_TYPES.map((segmentType, index) => {
    const segment = localePayload.segments.find((item) => item.type === segmentType);
    return {
      animation: segment.animation,
      cardTitle: segment.cardTitle,
      frame: index + 1,
      mathFocus: segment.mathBlocks ?? [],
      segmentType,
    };
  });
}

function renderQaChecklist(locale) {
  return [
    `# QA Checklist (${locale})`,
    '',
    '- [ ] Math notation correctness verified against MDX source equations.',
    '- [ ] Theorem wording matches the unit definition/theorem blocks exactly.',
    '- [ ] Matrix/vector terminology is consistent with docs/terminology-glossary.md.',
    '- [ ] Locale-specific wording is natural and technically accurate.',
    '- [ ] Traditional Chinese output uses Hong Kong-friendly terminology.',
    '- [ ] Slide order matches concept -> theorem -> example -> recap flow.',
    '- [ ] Recap checkpoints align with quick-check prompts in the note unit.',
    '- [ ] Exports degrade interactive blocks into static explanatory states.',
    '',
  ].join('\n');
}

async function main() {
  const storyboardFiles = await walk(CONTENT_ROOT);

  if (storyboardFiles.length === 0) {
    console.log('No storyboard metadata files found.');
    return;
  }

  for (const filePath of storyboardFiles.sort()) {
    const doc = await readStoryboard(filePath);
    validateStoryboard(filePath, doc);

    const fingerprint = crypto
      .createHash('sha256')
      .update(stableStringify(doc))
      .digest('hex')
      .slice(0, 16);

    const unitRoot = path.join(
      OUTPUT_ROOT,
      doc.course,
      doc.chapter,
      doc.unit,
      fingerprint,
    );

    await fs.mkdir(unitRoot, { recursive: true });

    const manifest = {
      chapter: doc.chapter,
      course: doc.course,
      fingerprint,
      generatedAt: new Date().toISOString(),
      locales: {},
      sourceFile: path.relative(ROOT, filePath),
      unit: doc.unit,
      unitTitle: doc.unitTitle,
      workflowStages: ['drafting', 'narration', 'slide_assembly', 'qa'],
    };

    for (const [locale, localePayload] of Object.entries(doc.locales)) {
      const localeRoot = path.join(unitRoot, locale);
      await fs.mkdir(localeRoot, { recursive: true });

      const scriptDraft = renderScript(locale, localePayload);
      const narration = renderNarration(localePayload);
      const slidePlan = buildSlidePlan(localePayload);
      const qaChecklist = renderQaChecklist(locale);

      await Promise.all([
        fs.writeFile(path.join(localeRoot, 'script-draft.md'), scriptDraft),
        fs.writeFile(path.join(localeRoot, 'narration-lines.txt'), narration),
        fs.writeFile(
          path.join(localeRoot, 'slide-plan.json'),
          `${JSON.stringify(slidePlan, null, 2)}\n`,
        ),
        fs.writeFile(path.join(localeRoot, 'qa-checklist.md'), qaChecklist),
      ]);

      manifest.locales[locale] = {
        files: ['script-draft.md', 'narration-lines.txt', 'slide-plan.json', 'qa-checklist.md'],
        segmentCount: localePayload.segments.length,
      };
    }

    await fs.writeFile(
      path.join(unitRoot, 'manifest.json'),
      `${JSON.stringify(manifest, null, 2)}\n`,
    );

    console.log(`Generated storyboard package: ${path.relative(ROOT, unitRoot)}`);
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
