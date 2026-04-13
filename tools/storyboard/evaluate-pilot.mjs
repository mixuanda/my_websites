#!/usr/bin/env node
import { promises as fs } from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const thresholdsPath = path.join(ROOT, 'data', 'storyboard', 'pilot-thresholds.json');
const metricsPath = path.join(ROOT, 'data', 'storyboard', 'pilot-metrics.json');

const [thresholdsRaw, metricsRaw] = await Promise.all([
  fs.readFile(thresholdsPath, 'utf8'),
  fs.readFile(metricsPath, 'utf8'),
]);

const thresholds = JSON.parse(thresholdsRaw);
const metrics = JSON.parse(metricsRaw);

const checks = [
  {
    key: 'completionRate',
    pass: metrics.completionRate >= thresholds.minCompletionRate,
    label: `completionRate >= ${thresholds.minCompletionRate}`,
    value: metrics.completionRate,
  },
  {
    key: 'errorReportsPer100Sessions',
    pass: metrics.errorReportsPer100Sessions <= thresholds.maxErrorReportsPer100Sessions,
    label: `errorReportsPer100Sessions <= ${thresholds.maxErrorReportsPer100Sessions}`,
    value: metrics.errorReportsPer100Sessions,
  },
  {
    key: 'notationQaPassRate',
    pass: metrics.notationQaPassRate >= thresholds.minNotationQaPassRate,
    label: `notationQaPassRate >= ${thresholds.minNotationQaPassRate}`,
    value: metrics.notationQaPassRate,
  },
  {
    key: 'localeQaPassRate',
    pass: metrics.localeQaPassRate >= thresholds.minLocaleQaPassRate,
    label: `localeQaPassRate >= ${thresholds.minLocaleQaPassRate}`,
    value: metrics.localeQaPassRate,
  },
];

const failed = checks.filter((check) => !check.pass);

console.log(`Pilot units: ${metrics.units.join(', ')}`);
for (const check of checks) {
  console.log(`- [${check.pass ? 'PASS' : 'FAIL'}] ${check.label} (actual=${check.value})`);
}

if (failed.length > 0) {
  console.error('Quality gate failed: keep pilot scope and fix issues before scaling.');
  process.exitCode = 1;
} else {
  console.log('Quality gate passed: safe to scale storyboard generation to additional units.');
}
