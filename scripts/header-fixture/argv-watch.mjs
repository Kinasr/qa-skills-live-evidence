#!/usr/bin/env node
// Process-list watcher for the Header-credentials live evidence (shared note).
//
// Usage: node scripts/header-fixture/argv-watch.mjs <out.json>   (stop it with SIGINT or SIGTERM)
//
// Every 100 ms it reads every process's full argv (`ps -axww -o pid=,args=`) and counts samples in
// which a `playwright-cli` process was running, and any argv holding the Header secret
// (FIXTURE_API_TOKEN from `.qa/auth`), with or without its scheme. It writes counts and the
// playwright-cli subcommands it saw to <out.json> on exit, never a value or a matching argv.
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
const out = process.argv[2];
if (!out) {
  console.error("usage: argv-watch.mjs <out.json>");
  process.exit(2);
}
const auth = readFileSync(join(ROOT, ".qa", "auth"), "utf8");
const token = /^FIXTURE_API_TOKEN=(.*)$/m.exec(auth)?.[1] ?? "";
if (token.length < 16) {
  console.error("FIXTURE_API_TOKEN must be set in .qa/auth");
  process.exit(2);
}

const state = {
  started: new Date().toISOString(),
  samples: 0,
  samples_with_playwright_cli: 0,
  playwright_cli_pids: new Set(),
  playwright_cli_subcommands: {},
  run_code_with_filename: 0,
  run_code_inline: 0,
  argv_with_secret: 0,
};

function sample() {
  let text = "";
  try {
    text = execFileSync("ps", ["-axww", "-o", "pid=,args="], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
  } catch {
    return;
  }
  state.samples += 1;
  let sawCli = false;
  for (const line of text.split("\n")) {
    if (line.includes(token)) state.argv_with_secret += 1;
    const cli = /^\s*(\d+)\s+.*?playwright-cli(?:\.js|\.mjs)?\s+(.*)$/.exec(line);
    if (!cli) continue;
    sawCli = true;
    if (state.playwright_cli_pids.has(cli[1])) continue;
    state.playwright_cli_pids.add(cli[1]);
    const words = cli[2].split(/\s+/).filter((w) => !w.startsWith("-"));
    const sub = words[0] ?? "(none)";
    state.playwright_cli_subcommands[sub] = (state.playwright_cli_subcommands[sub] ?? 0) + 1;
    if (sub === "run-code") {
      if (/\s--filename(?:\s|=)/.test(` ${cli[2]}`)) state.run_code_with_filename += 1;
      else state.run_code_inline += 1;
    }
  }
  if (sawCli) state.samples_with_playwright_cli += 1;
}

function finish() {
  const result = {
    ...state,
    stopped: new Date().toISOString(),
    playwright_cli_processes: state.playwright_cli_pids.size,
    playwright_cli_pids: undefined,
    verdict: state.argv_with_secret === 0 ? "NO_SECRET_IN_ARGV" : "SECRET_IN_ARGV",
  };
  writeFileSync(out, `${JSON.stringify(result, null, 2)}\n`);
  process.exit(0);
}
process.on("SIGINT", finish);
process.on("SIGTERM", finish);
setInterval(sample, 100);
sample();
