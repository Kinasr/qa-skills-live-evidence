# Terminal CLI live evidence: qa-skills 0.13.1 (#829)

Recorded 2026-11-13 for [Kinasr/qa-skills-workshop#829](https://github.com/Kinasr/qa-skills-workshop/issues/829).

## Configuration

| Field | Value |
| --- | --- |
| qa-skills revision | `0.13.1 @ b550c9c` (tag `v0.13.1`) |
| Install | `git archive v0.13.1 .claude-plugin plugin`, marketplace renamed `qa-skills-local`, then `claude plugin marketplace add --scope local <copy>` and `claude plugin install --scope local qa-skills@qa-skills-local` (the support doc's "distinct name" route). `claude plugin list` reports `qa-skills@qa-skills-local`, Version `0.13.1`. No `--plugin-dir`. |
| Claude Code | 2.1.308, the floor: `@anthropic-ai/claude-code@2.1.308` from npm in a private prefix, run with `DISABLE_AUTOUPDATER=1`. |
| Surface | terminal CLI, headless `claude -p` turns |
| OS | macOS 27.2.1 |
| Application target | `local-ui` (`http://localhost:4200`), the Toolshop fallback from `npm run fallback:start` |
| Case | `tc_d68h3nc7 level:ui` (cart: add a product at quantity 2) |

## Harness

The workshop probe `scripts/probe-trust-core.mjs` at `b550c9c` builds every probe prompt and grades
every probe verdict. Its own terminal launcher always loads the plugin with `--plugin-dir`, so these
runs use its installed-plugin path instead: `--prepare-desktop`, then a headless `claude -p` launch,
then `--grade-desktop` on the saved session. That path labels the Surface `desktop app (...)`,
and the recorded rows correct the label to `terminal CLI (...)`. For the hook faults, the faulted copy
was installed from a local-scope marketplace (`qa-trust-core-fault`) with `qa-skills@qa-skills-local`
disabled. The release install was restored afterwards. See [`harness/`](harness/).

The end-to-end Run is an ordinary `/qa-skills:qa-execute tc_d68h3nc7 level:ui` in two turns:
the plan, with the Card relayed, and then the engineer's "yes".

## Results

| Directory | Condition | Verdict |
| --- | --- | --- |
| [`detection-1`](detection-1/) | host-version detection working on the floor version | PASS |
| [`guard-denial-1-inconclusive`](guard-denial-1-inconclusive/) | the Tester guard denying a call outside its allow-lists | INCONCLUSIVE (rerun, not counted) |
| [`guard-denial-2-inconclusive`](guard-denial-2-inconclusive/) | the Tester guard denying a call outside its allow-lists | INCONCLUSIVE (rerun, not counted) |
| [`agentid-binding-1`](agentid-binding-1/) | a background-launched Tester binding to its Execution (`agentId`) | PASS |
| [`artifact-placement-1-inconclusive`](artifact-placement-1-inconclusive/) | real browser-artifact placement under the Execution directory | INCONCLUSIVE (rerun, not counted) |
| [`hook-crash-1`](hook-crash-1/) | the hook blocking … — crash | PASS |
| [`hook-timeout-1`](hook-timeout-1/) | the hook blocking … — timeout | PASS |
| [`end-to-end-macos-1`](end-to-end-macos-1/) | a live Execution end-to-end … — macOS | PASS, record [`2026-11-13-xb8rw77t.md`](../../.qa/executions/2026-11-13-xb8rw77t.md) |

- **Guard denial, both runs:** the Tester declined the three injected attempts. Its agent prompt
  allows only the brief's `node` commands, so no call reached the guard to be denied. The binding held
  and the case passed. Execution records:
  [`7kxgwyqh`](../../.qa/executions/2026-11-13-7kxgwyqh.md) and
  [`dsmhh5gn`](../../.qa/executions/2026-11-13-dsmhh5gn.md).
- **Artifact placement:** the probe's before and after inventories (OS temp and home, to depth 4)
  came to 7.2 MB. The host saved them to a file instead of returning them inline, so the grader
  could not match them to a parent Bash result. The inventories list the home directory, so they
  are not committed. Only their line counts, their SHA-256 sums and the
  [new-file list](artifact-placement-1-inconclusive/new-files-observed.txt) are committed. That list
  is informal and not a verdict. Every playwright-cli artifact appears under the Execution directory,
  but two Chromium `BrowserMetrics-spare.pma` files appear in `playwright_chromiumdev_profile-*` dirs
  in the OS temp dir. Execution record: [`v4j1eerj`](../../.qa/executions/2026-11-13-v4j1eerj.md).
- **agentId binding:** Execution record [`k4mxav9y`](../../.qa/executions/2026-11-13-k4mxav9y.md).
  In the crash and timeout runs every Tester call was blocked, so ingest wrote no Execution record.

## What each directory holds

- `state.json` and `prompt.txt`: the probe state and the exact prompt it generated.
- `probe-evidence/`: the files the parent saved during the run (`run.json`, the sibling baseline,
  detection observations, hook settings).
- `transcript-extract.json`: every tool call and result from the parent and each Tester transcript,
  plus the Run files the grader read (`guard.json`, `tester.json`). It is an extract: session context
  is removed and e-mail addresses are redacted. The verdict was computed from the unredacted capture.
- `grade.txt`: the probe's printed row or INCONCLUSIVE line.
- `headless-result.json`: the `claude -p` result.
