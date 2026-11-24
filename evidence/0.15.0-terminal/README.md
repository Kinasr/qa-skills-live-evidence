# 0.15.0 terminal live evidence

- qa-skills 0.15.0 @ f1a25ff (tag v0.15.0, workshop merge commit f1a25ff8), installed as `qa-skills@qa-skills-local` (local scope) from a local directory marketplace built with `git archive v0.15.0`; `installed_plugins.json` shows version 0.15.0.
- Claude Code 2.1.308 (the floor, private npm install). The system `claude` is 2.1.323; not used.
- macOS 27.2.1, terminal CLI, 2026-11-24. App: self-hosted Toolshop fallback.

| Item | Result | Dir |
| --- | --- | --- |
| Host-version detection | PASS | detection |
| agentId binding | PASS | agentid-binding |
| Guard denial | INCONCLUSIVE x3 (see below) | guard-denial-inconclusive |
| Artifact placement | INCONCLUSIVE x2 (see below) | artifact-placement-inconclusive |
| End-to-end /qa-execute Run dpdj22g3 | PASSED (tc_d68h3nc7, ui) | e2e-run |
| migration field, refusal shape | PASS | cli-checks |
| `delegate next` in retry cooldown: `wait_ms` 13899, `next_ready_at`, no dispatch, 0.115s | PASS | cli-checks |
| `execute next` in retry cooldown: `wait_ms` 14826, `next_ready_at`, no start, 0.170s | PASS | cli-checks |
| Next-command offers | PASS: the Run closed with an offer of `/qa-train` | e2e-run/confirm-turn.json |

Not exercised: hook crash and timeout faulted copies; `/qa-codefix` scope tokens.

Guard denial: three runs, all INCONCLUSIVE. Run 1: planted links not captured. Runs 2 and 3: "the parent plant.mjs execution was not captured", although the transcript shows the parent running plant.mjs. Placement: both runs saw 103 browser files, all under the own and sibling Execution dirs, then stopped on `missing: .../executions/ex_1/tester.json (ENOENT)` for the idle sibling. Neither counts as PASS or FAIL.
