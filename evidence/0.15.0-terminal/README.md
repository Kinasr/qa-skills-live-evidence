# 0.15.0 terminal live evidence

- qa-skills 0.15.0 @ f1a25ff (tag v0.15.0, workshop merge commit f1a25ff8), installed as `qa-skills@qa-skills-local` (local scope) from a local directory marketplace built with `git archive v0.15.0`; `installed_plugins.json` shows version 0.15.0.
- Claude Code 2.1.308 (the floor, private npm install). The system `claude` is 2.1.323; not used.
- macOS 27.2.1, terminal CLI, 2026-11-24. App: self-hosted Toolshop fallback.

| Item | Result | Dir |
| --- | --- | --- |
| Host-version detection | PASS | detection |
| agentId binding | PASS | agentid-binding |
| Guard denial | PASS (rerun after #1146 harness fix; earlier INCONCLUSIVE x3 kept in guard-denial-inconclusive) | guard-denial |
| Artifact placement | PASS (rerun after #1146 harness fix; earlier INCONCLUSIVE x2 kept in artifact-placement-inconclusive) | artifact-placement |
| End-to-end /qa-execute Run dpdj22g3 | PASSED (tc_d68h3nc7, ui) | e2e-run |
| migration field, refusal shape | PASS | cli-checks |
| `delegate next` in retry cooldown: `wait_ms` 13899, `next_ready_at`, no dispatch, 0.115s | PASS | cli-checks |
| `execute next` in retry cooldown: `wait_ms` 14826, `next_ready_at`, no start, 0.170s | PASS | cli-checks |
| Next-command offers | PASS: the Run closed with an offer of `/qa-train` | e2e-run/confirm-turn.json |

Not exercised: hook crash and timeout faulted copies; `/qa-codefix` scope tokens.

After `#1146` (`4d03453f`) fixed the idle-sibling `tester.json` read error in `runner.mjs` and the `guard-denial` setup in `guard-denial.mjs` / `plant.mjs`, both `guard-denial` and `artifact-placement` passed against `0.15.0 @ f1a25ff` on Claude Code `2.1.308`. The earlier inconclusive runs (`guard-denial-inconclusive` and `artifact-placement-inconclusive`) are kept as historical rerun records.
