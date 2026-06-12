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
  "NEXT_PUBLIC_FIREBASE_API_KEY",
  "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
  "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
  "NEXT_PUBLIC_FIREBASE_APP_ID",
  "NEXT_PUBLIC_TURNSTILE_SITE_KEY",
  "AUTH_TURNSTILE_SECRET_KEY",
];

const BILLING_RECOMMENDED = ["NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"];
const DEVELOPMENT_URL_NAMES = ["APP_URL", "NEXTAUTH_URL", "NEXT_PUBLIC_SITE_URL"];
const SURFACE_NAMES = ["SITE_SURFACE", "NEXT_PUBLIC_SITE_SURFACE"];
const BOOLEAN_TRUE_NAMES = [
  "AUTH_REGISTRATION_ENABLED",
  "AUTH_REGISTRATION_REQUIRE_PERSISTENCE",
  "AUTH_REGISTRATION_REQUIRE_TURNSTILE",
  "NEXT_PUBLIC_AUTH_REGISTRATION_ENABLED",
  "NEXT_PUBLIC_AUTH_REGISTRATION_REQUIRE_TURNSTILE",
];
const ALLOWED_AUTH_PROVIDERS = new Set(["credentials", "github", "google"]);

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

    parsed[key] = unquoteEnvValue(key, value);
  }

  return parsed;
}

function unquoteEnvValue(key, value) {
  if (value.startsWith('"') && value.endsWith('"')) {
    const unquoted = value
      .slice(1, -1)
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, "\\");

    if (key === "FIREBASE_PRIVATE_KEY") {
      return unquoted.replace(/\n/g, "\\n");
    }

    return unquoted.replace(/\\n/g, "\n");
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

  for (const name of DEVELOPMENT_URL_NAMES) {
    if (envValues[name] !== DEFAULTS.developmentDomain) {
      errors.push(`${name} must be ${DEFAULTS.developmentDomain} for codex/account preview`);
    }
  }

  for (const name of SURFACE_NAMES) {
    if (envValues[name] !== "preview") {
      errors.push(`${name} must be preview for codex/account`);
    }
  }

  for (const name of BOOLEAN_TRUE_NAMES) {
    if (envValues[name] !== "true") {
      errors.push(`${name} must be true for public development registration`);
    }
  }

  if (!["1", "true"].includes(envValues.AUTH_TRUST_HOST)) {
    errors.push("AUTH_TRUST_HOST must be 1 or true for codex/account preview");
  }

  for (const provider of providers) {
    if (!ALLOWED_AUTH_PROVIDERS.has(provider)) {
      errors.push(`unsupported auth provider for this branch: ${provider}`);
    }
  }

  if (
    !options.allowMissingOauth &&
    [
      envValues.GITHUB_CLIENT_ID,
      envValues.GITHUB_CLIENT_SECRET,
      envValues.GOOGLE_CLIENT_ID,
      envValues.GOOGLE_CLIENT_SECRET,
    ].some((value) => value && !looksLikePlaceholder(value))
  ) {
    warnings.push(
      "Auth.js OAuth env vars are present but github/google login on this branch uses Firebase Client Auth",
    );
  }

  const productionOriginValues = Object.entries(envValues).filter(([, value]) =>
    containsProductionOrigin(value),
  );
  for (const [name] of productionOriginValues) {
    errors.push(`${name} contains a production origin; use ${DEFAULTS.developmentDomain}`);
  }

  validateStripePublishableKey({
    errors,
    name: "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
    value: envValues.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  });
  validateStripeServerKey({
    errors,
    name: "STRIPE_SECRET_KEY",
    value: envValues.STRIPE_SECRET_KEY,
  });
  validateStripeServerKey({
    errors,
    name: "STRIPE_RESTRICTED_KEY",
    value: envValues.STRIPE_RESTRICTED_KEY,
  });
  validateStripeWebhookSecret({
    errors,
    name: "STRIPE_WEBHOOK_SECRET",
    value: envValues.STRIPE_WEBHOOK_SECRET,
  });

  const privateKey = envValues.FIREBASE_PRIVATE_KEY;
  if (
    privateKey &&
    (!privateKey.includes("-----BEGIN PRIVATE KEY-----") ||
      !privateKey.includes("-----END PRIVATE KEY-----"))
  ) {
    errors.push("FIREBASE_PRIVATE_KEY must be a complete PEM private key");
  }

  if (
    envValues.FIREBASE_PROJECT_ID &&
    envValues.NEXT_PUBLIC_FIREBASE_PROJECT_ID &&
    !looksLikePlaceholder(envValues.FIREBASE_PROJECT_ID) &&
    !looksLikePlaceholder(envValues.NEXT_PUBLIC_FIREBASE_PROJECT_ID) &&
    envValues.FIREBASE_PROJECT_ID !== envValues.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  ) {
    errors.push("NEXT_PUBLIC_FIREBASE_PROJECT_ID must match FIREBASE_PROJECT_ID");
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

function containsProductionOrigin(value) {
  const normalized = String(value ?? "").toLowerCase();
  return (
    normalized.includes("https://www.evanalysis.top") ||
    normalized.includes("https://evanalysis.top")
  );
}

function validateStripePublishableKey({ errors, name, value }) {
  if (!value) return;
  if (looksLikePlaceholder(value)) return;

  if (!value.startsWith("pk_test_")) {
    errors.push(`${name} must use a pk_test_ value for codex/account preview`);
  }
}

function validateStripeServerKey({ errors, name, value }) {
  if (!value) return;
  if (looksLikePlaceholder(value)) return;

  if (!value.startsWith("sk_test_") && !value.startsWith("rk_test_")) {
    errors.push(`${name} must use an sk_test_ or rk_test_ value for codex/account preview`);
  }
}

function validateStripeWebhookSecret({ errors, name, value }) {
  if (!value) return;
  if (looksLikePlaceholder(value)) return;

  if (!value.startsWith("whsec_")) {
    errors.push(`${name} must use a whsec_ value`);
  }
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
