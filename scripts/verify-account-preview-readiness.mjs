#!/usr/bin/env node
import { execFileSync, spawnSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const DEFAULTS = {
  branch: "codex/account",
  developmentDomain: "https://development.evanalysis.top",
  productionCheckUrl: "https://www.evanalysis.top/en/notes",
  projectScope: "mixuandahotmailcoms-projects",
};

const args = parseArgs(process.argv.slice(2));
const branch = args.branch ?? DEFAULTS.branch;
const developmentDomain = args.domain ?? DEFAULTS.developmentDomain;
const expectPublic = args.expectPublic === true;
const productionCheckUrl = args.productionUrl ?? DEFAULTS.productionCheckUrl;
const requireReady = args.requireReady === true;
const scope = args.scope ?? DEFAULTS.projectScope;
const deployment = args.deployment ?? findLatestPreviewDeployment(branch, scope);

const failures = [];
const warnings = [];

console.log(`[account-preview] branch=${branch}`);
console.log(`[account-preview] deployment=${deployment}`);

const inspect = runCombined("vercel", ["inspect", deployment, "--scope", scope]);
const cleanInspect = stripAnsi(inspect);
checkPattern(cleanInspect, /target\s+preview/i, "deployment target is preview");
checkPattern(cleanInspect, /status\s+.*Ready/i, "deployment status is Ready");
checkIncludes(cleanInspect, new URL(developmentDomain).host, `${developmentDomain} is an alias of the preview deployment`);

const envOutput = run("vercel", ["env", "ls", "--scope", scope]);
const requiredBranchEnv = [
  "NEXT_PUBLIC_AUTH_PROVIDERS",
  "AUTH_REGISTRATION_ENABLED",
  "NEXT_PUBLIC_AUTH_REGISTRATION_ENABLED",
  "AUTH_REGISTRATION_REQUIRE_TURNSTILE",
  "NEXT_PUBLIC_AUTH_REGISTRATION_REQUIRE_TURNSTILE",
  "AUTH_REGISTRATION_REQUIRE_PERSISTENCE",
];
for (const name of requiredBranchEnv) {
  if (!hasBranchPreviewEnv(envOutput, name, branch)) {
    failures.push(`missing branch-scoped Preview (${branch}) env: ${name}`);
  }
}

const registrationReadiness = vercelJson("/api/auth/register");
const providers = vercelJson("/api/auth/providers");
const billingStatus = vercelJson("/api/billing/status");

const providerKeys = Object.keys(providers);
if (!providerKeys.includes("credentials")) {
  failures.push("credentials provider is not exposed on the preview deployment");
}
if (!JSON.stringify(providers).includes(new URL(developmentDomain).host)) {
  failures.push("provider callback URLs do not point at the development domain");
}

if (requireReady && !registrationReadiness.ready) {
  failures.push(
    `registration readiness is not ready: ${registrationReadiness.blockers?.join(", ") || "unknown"}`
  );
}
if (!registrationReadiness.ready) {
  warnings.push(
    `registration is not ready yet: ${registrationReadiness.blockers?.join(", ") || "unknown"}`
  );
}
if (registrationReadiness.ready && registrationReadiness.blockers?.length) {
  failures.push("registration readiness is true but blockers are still present");
}

if (!billingStatus.billingReady) {
  failures.push("billing status is not ready");
}
if (!billingStatus.stripe?.publishableKeyConfigured) {
  warnings.push("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not configured; full browser checkout QA remains incomplete");
}

const registrationPost = vercelJson("/api/auth/register", [
  "--request",
  "POST",
  "--header",
  "content-type: application/json",
  "--data",
  JSON.stringify({
    email: `verify-${Date.now()}@example.com`,
    password: "long-enough-password",
  }),
]);

if (registrationReadiness.ready) {
  warnings.push(
    `registration POST smoke returned ${registrationPost.errorCode ?? "no error code"}; use a real browser Turnstile token for final create-account QA`
  );
} else if (!registrationPost.errorCode) {
  failures.push("registration POST did not return a blocking error while readiness is false");
}

const developmentPublicStatus = httpStatus(developmentDomain);
if (!registrationReadiness.ready && developmentPublicStatus !== 401) {
  failures.push(
    `${developmentDomain} returned ${developmentPublicStatus}; keep Vercel Authentication enabled until readiness is true`
  );
}
if (expectPublic && developmentPublicStatus !== 200) {
  failures.push(`${developmentDomain} returned ${developmentPublicStatus}; expected a public 200`);
}

const productionStatus = httpStatus(productionCheckUrl);
if (productionStatus !== 200) {
  failures.push(`${productionCheckUrl} returned ${productionStatus}; expected production notes to remain public`);
}

console.log(
  JSON.stringify(
    {
      billingReady: billingStatus.billingReady,
      configuredPlanCount: billingStatus.configuredPlanCount,
      developmentPublicStatus,
      deployment,
      providers: providerKeys,
      productionStatus,
      registration: registrationReadiness,
      stripe: billingStatus.stripe,
    },
    null,
    2
  )
);

if (warnings.length > 0) {
  console.log("[account-preview] warnings");
  for (const warning of warnings) {
    console.log(`- ${warning}`);
  }
}

if (failures.length > 0) {
  console.error("[account-preview] failures");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("[account-preview] verification passed");

function parseArgs(argv) {
  const parsed = {};
  for (let index = 0; index < argv.length; index += 1) {
    const item = argv[index];
    if (item === "--branch") parsed.branch = argv[++index];
    else if (item === "--deployment") parsed.deployment = argv[++index];
    else if (item === "--domain") parsed.domain = argv[++index];
    else if (item === "--expect-public") parsed.expectPublic = true;
    else if (item === "--production-url") parsed.productionUrl = argv[++index];
    else if (item === "--require-ready") parsed.requireReady = true;
    else if (item === "--scope") parsed.scope = argv[++index];
    else {
      throw new Error(`Unknown argument: ${item}`);
    }
  }
  return parsed;
}

function run(command, commandArgs) {
  return execFileSync(command, commandArgs, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  });
}

function runCombined(command, commandArgs) {
  const result = spawnSync(command, commandArgs, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
  if (result.status !== 0) {
    throw new Error(`${command} ${commandArgs.join(" ")} failed with exit ${result.status}`);
  }
  return `${result.stdout ?? ""}\n${result.stderr ?? ""}`;
}

function findLatestPreviewDeployment(targetBranch, targetScope) {
  const out = run("vercel", [
    "list",
    "--format",
    "json",
    "--environment",
    "preview",
    "--scope",
    targetScope,
  ]);
  const parsed = JSON.parse(out);
  const deployments = Array.isArray(parsed) ? parsed : parsed.deployments;
  const match = deployments.find(
    (item) => item.meta?.githubCommitRef === targetBranch && item.state === "READY"
  );

  if (!match?.url) {
    throw new Error(`No READY preview deployment found for ${targetBranch}`);
  }

  return match.url;
}

function checkIncludes(output, needle, label) {
  if (!output.includes(needle)) {
    failures.push(`${label} check failed`);
  }
}

function checkPattern(output, pattern, label) {
  if (!pattern.test(output)) {
    failures.push(`${label} check failed`);
  }
}

function hasBranchPreviewEnv(output, name, targetBranch) {
  const escapedName = escapeRegExp(name);
  const escapedBranch = escapeRegExp(targetBranch);
  const pattern = new RegExp(`^\\s*${escapedName}\\s+Encrypted\\s+Preview \\(${escapedBranch}\\)`, "m");
  return pattern.test(output);
}

function vercelJson(apiPath, curlArgs = []) {
  const out = run("vercel", [
    "curl",
    apiPath,
    "--deployment",
    deployment,
    "--scope",
    scope,
    ...(curlArgs.length > 0 ? ["--", ...curlArgs] : []),
  ]);
  const firstBrace = out.indexOf("{");
  const lastBrace = out.lastIndexOf("}");
  if (firstBrace < 0 || lastBrace < firstBrace) {
    throw new Error(`No JSON object returned from ${apiPath}`);
  }
  return JSON.parse(out.slice(firstBrace, lastBrace + 1));
}

function httpStatus(url) {
  const dir = mkdtempSync(path.join(tmpdir(), "account-preview-"));
  const outputPath = path.join(dir, "body.txt");
  try {
    const status = run("curl", [
      "-sS",
      "-o",
      outputPath,
      "-w",
      "%{http_code}",
      url,
    ]);
    return Number.parseInt(status.trim(), 10);
  } finally {
    rmSync(dir, { force: true, recursive: true });
  }
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function stripAnsi(value) {
  return value.replace(/\u001b\[[0-9;]*m/g, "");
}
