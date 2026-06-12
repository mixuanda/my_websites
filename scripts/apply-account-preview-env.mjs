#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

const DEFAULTS = {
  branch: "codex/account",
  developmentDomain: "https://development.evanalysis.top",
  file: ".env.codex-account.preview.local",
  scope: "mixuandahotmailcoms-projects",
};

const DEFAULT_BRANCH_VALUES = {
  APP_URL: DEFAULTS.developmentDomain,
  AUTH_REGISTRATION_ENABLED: "true",
  AUTH_REGISTRATION_REQUIRE_PERSISTENCE: "true",
  AUTH_REGISTRATION_REQUIRE_TURNSTILE: "true",
  AUTH_TRUST_HOST: "1",
  NEXTAUTH_URL: DEFAULTS.developmentDomain,
  NEXT_PUBLIC_AUTH_PROVIDERS: "credentials,github,google",
  NEXT_PUBLIC_AUTH_REGISTRATION_ENABLED: "true",
  NEXT_PUBLIC_AUTH_REGISTRATION_REQUIRE_TURNSTILE: "true",
  NEXT_PUBLIC_SITE_SURFACE: "preview",
  NEXT_PUBLIC_SITE_URL: DEFAULTS.developmentDomain,
  SITE_SURFACE: "preview",
};

const REGISTRATION_REQUIRED = [
  "AUTH_SECRET",
  "FIREBASE_PROJECT_ID",
  "FIREBASE_CLIENT_EMAIL",
  "FIREBASE_PRIVATE_KEY",
  "NEXT_PUBLIC_TURNSTILE_SITE_KEY",
  "AUTH_TURNSTILE_SECRET_KEY",
];

const BILLING_RECOMMENDED = ["NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"];

const args = parseArgs(process.argv.slice(2));
const branch = args.branch ?? DEFAULTS.branch;
const file = args.file ?? DEFAULTS.file;
const scope = args.scope ?? DEFAULTS.scope;
const apply = args.apply === true;
const allowIncomplete = args.allowIncomplete === true;
const allowPlaceholders = args.allowPlaceholders === true;
const allowMissingOauth = args.allowMissingOauth === true;
const values = {
  ...DEFAULT_BRANCH_VALUES,
  ...parseEnvFile(file),
};

const validation = validateValues(values, {
  allowIncomplete,
  allowMissingOauth,
  allowPlaceholders,
});

for (const warning of validation.warnings) {
  console.warn(`[account-env] warning: ${warning}`);
}

if (validation.errors.length > 0) {
  for (const error of validation.errors) {
    console.error(`[account-env] error: ${error}`);
  }
  process.exit(1);
}

const names = Object.keys(values).filter((name) => values[name] !== "");
names.sort();

console.log(`[account-env] file=${file}`);
console.log(`[account-env] target=Preview (${branch})`);
console.log(`[account-env] scope=${scope}`);
console.log(`[account-env] mode=${apply ? "apply" : "dry-run"}`);

for (const name of names) {
  const sensitive = isSensitive(name);
  const target = `${name} -> Preview (${branch}) ${sensitive ? "[sensitive]" : "[non-sensitive]"}`;

  if (!apply) {
    console.log(`[account-env] dry-run ${target}`);
    continue;
  }

  setVercelEnv({
    branch,
    name,
    scope,
    sensitive,
    value: values[name],
  });
  console.log(`[account-env] wrote ${target}`);
}

if (!apply) {
  console.log("[account-env] dry-run only; re-run with --apply to write Vercel env vars");
} else {
  console.log("[account-env] write complete; redeploy codex/account and run npm run auth:verify-development -- --require-ready");
}

function parseArgs(argv) {
  const parsed = {};
  for (let index = 0; index < argv.length; index += 1) {
    const item = argv[index];
    if (item === "--allow-incomplete") parsed.allowIncomplete = true;
    else if (item === "--allow-missing-oauth") parsed.allowMissingOauth = true;
    else if (item === "--allow-placeholders") parsed.allowPlaceholders = true;
    else if (item === "--apply") parsed.apply = true;
    else if (item === "--branch") parsed.branch = argv[++index];
    else if (item === "--dry-run") parsed.apply = false;
    else if (item === "--file") parsed.file = argv[++index];
    else if (item === "--scope") parsed.scope = argv[++index];
    else {
      throw new Error(`Unknown argument: ${item}`);
    }
  }
  return parsed;
}

function parseEnvFile(envFile) {
  const content = readFileSync(envFile, "utf8");
  const parsed = {};

  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;

    const equalsIndex = line.indexOf("=");
    if (equalsIndex < 1) {
      throw new Error(`Invalid env line: ${rawLine}`);
    }

    const key = line.slice(0, equalsIndex).trim();
    const value = line.slice(equalsIndex + 1).trim();
    if (!/^[A-Z0-9_]+$/.test(key)) {
      throw new Error(`Invalid env key: ${key}`);
    }

    parsed[key] = unquoteEnvValue(value);
  }

  return parsed;
}

function unquoteEnvValue(value) {
  if (value.startsWith('"') && value.endsWith('"')) {
    return value
      .slice(1, -1)
      .replace(/\\n/g, "\n")
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, "\\");
  }

  if (value.startsWith("'") && value.endsWith("'")) {
    return value.slice(1, -1);
  }

  return value;
}

function validateValues(envValues, options) {
  const errors = [];
  const warnings = [];
  const required = [...REGISTRATION_REQUIRED];
  const providers = splitCsv(envValues.NEXT_PUBLIC_AUTH_PROVIDERS);

  if (!options.allowMissingOauth && providers.includes("github")) {
    required.push("GITHUB_CLIENT_ID", "GITHUB_CLIENT_SECRET");
  }
  if (!options.allowMissingOauth && providers.includes("google")) {
    required.push("GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET");
  }

  for (const name of required) {
    if (!envValues[name]) {
      const message = `missing required value: ${name}`;
      if (options.allowIncomplete) warnings.push(message);
      else errors.push(message);
    }
  }

  for (const name of BILLING_RECOMMENDED) {
    if (!envValues[name]) {
      warnings.push(`missing recommended value for full checkout QA: ${name}`);
    }
  }

  if (!options.allowPlaceholders) {
    for (const [name, value] of Object.entries(envValues)) {
      if (value && looksLikePlaceholder(value)) {
        errors.push(`placeholder value still present: ${name}`);
      }
    }
  }

  return { errors, warnings };
}

function splitCsv(value) {
  return String(value ?? "")
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
}

function looksLikePlaceholder(value) {
  const normalized = value.toLowerCase();
  return (
    normalized.includes("replace-with") ||
    normalized.includes("your-") ||
    normalized.includes("_replace") ||
    normalized.includes("xxx") ||
    normalized.includes("placeholder")
  );
}

function isSensitive(name) {
  if (name.startsWith("NEXT_PUBLIC_")) return false;
  return ![
    "APP_URL",
    "AUTH_REGISTRATION_ENABLED",
    "AUTH_REGISTRATION_REQUIRE_PERSISTENCE",
    "AUTH_REGISTRATION_REQUIRE_TURNSTILE",
    "AUTH_TRUST_HOST",
    "NEXTAUTH_URL",
    "NOTES_MEMBERSHIP_GATING",
    "SITE_SURFACE",
  ].includes(name);
}

function setVercelEnv({ branch, name, scope, sensitive, value }) {
  const commandArgs = [
    "env",
    "add",
    name,
    "preview",
    branch,
    "--yes",
    "--force",
    "--scope",
    scope,
  ];

  if (!sensitive) {
    commandArgs.push("--no-sensitive");
  }

  const result = spawnSync("vercel", commandArgs, {
    encoding: "utf8",
    input: value,
    stdio: ["pipe", "pipe", "pipe"],
  });

  if (result.status !== 0) {
    throw new Error(`vercel env add failed for ${name}: ${result.stderr || result.stdout}`);
  }
}
