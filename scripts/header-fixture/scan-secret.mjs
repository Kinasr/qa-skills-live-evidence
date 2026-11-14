#!/usr/bin/env node
// Literal-secret scan for the Header-credentials live evidence.
//
// Usage: node scripts/header-fixture/scan-secret.mjs <path>...
//
// Reads the fixture's Header secret (FIXTURE_API_TOKEN) and its UI password (FIXTURE_APP_PASSWORD)
// from the git-ignored Auth file `.qa/auth`, then walks every given file or directory, byte for
// byte, and counts:
//   - occurrences of the Header secret with its scheme (`Bearer <secret>`) and without it;
//   - occurrences of the UI password;
//   - leftover files under any Run's `auth/` directory (a dir named `auth` beside an
//     `execute.json`): a `request-*.js` code file is a leftover code file; any other file is listed.
// It prints counts, file paths and offsets' count only, never a value, and exits 1 on any hit or
// leftover, 2 when the secrets cannot be read, 0 when clean.
import { existsSync, lstatSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
const SCHEME = "Bearer";

function authValue(text, key) {
  for (const line of text.split("\n")) {
    if (line.startsWith("#")) continue;
    const at = line.indexOf("=");
    if (at > 0 && line.slice(0, at) === key) return line.slice(at + 1);
  }
  return "";
}

let authText = "";
try {
  authText = readFileSync(join(ROOT, ".qa", "auth"), "utf8");
} catch {
  console.error("cannot read .qa/auth");
  process.exit(2);
}
const token = authValue(authText, "FIXTURE_API_TOKEN");
const password = authValue(authText, "FIXTURE_APP_PASSWORD");
if (token.length < 16 || password.length < 8) {
  console.error("FIXTURE_API_TOKEN (>= 16 chars) and FIXTURE_APP_PASSWORD (>= 8 chars) must be set in .qa/auth");
  process.exit(2);
}

const needles = {
  secret_with_scheme: Buffer.from(`${SCHEME} ${token}`),
  secret_without_scheme: Buffer.from(token),
  ui_password: Buffer.from(password),
};

function count(haystack, needle) {
  let n = 0;
  for (let at = haystack.indexOf(needle); at !== -1; at = haystack.indexOf(needle, at + 1)) n += 1;
  return n;
}

function* files(path) {
  const stat = lstatSync(path);
  if (stat.isSymbolicLink()) return;
  if (stat.isDirectory()) {
    for (const entry of readdirSync(path)) yield* files(join(path, entry));
  } else if (stat.isFile()) yield path;
}

function* runAuthDirs(path) {
  const stat = lstatSync(path);
  if (!stat.isDirectory() || stat.isSymbolicLink()) return;
  if (existsSync(join(path, "execute.json")) && existsSync(join(path, "auth"))) yield join(path, "auth");
  for (const entry of readdirSync(path)) yield* runAuthDirs(join(path, entry));
}

const targets = process.argv.slice(2);
if (!targets.length) {
  console.error("usage: scan-secret.mjs <path>...");
  process.exit(2);
}

const report = { scheme: SCHEME, secret_length: token.length, scanned: [], hits: [], leftovers: [] };
for (const target of targets) {
  const abs = resolve(target);
  if (!existsSync(abs)) {
    report.scanned.push({ path: target, missing: true });
    continue;
  }
  let fileCount = 0;
  for (const file of files(abs)) {
    fileCount += 1;
    const bytes = readFileSync(file);
    const counts = Object.fromEntries(Object.entries(needles).map(([name, needle]) => [name, count(bytes, needle)]));
    if (Object.values(counts).some((n) => n > 0)) report.hits.push({ file: relative(process.cwd(), file) || file, ...counts });
  }
  for (const authDir of runAuthDirs(abs)) {
    for (const file of files(authDir)) {
      const name = relative(authDir, file);
      report.leftovers.push({ file: relative(process.cwd(), file) || file, code_file: /^request-.*\.js$/.test(name) });
    }
  }
  report.scanned.push({ path: target, files: fileCount });
}

const missing = report.scanned.filter((s) => s.missing).length;
report.verdict = report.hits.length || report.leftovers.length ? "HIT" : missing ? "MISSING_PATH" : "CLEAN";
console.log(JSON.stringify(report, null, 2));
process.exit(report.verdict === "CLEAN" ? 0 : 1);
