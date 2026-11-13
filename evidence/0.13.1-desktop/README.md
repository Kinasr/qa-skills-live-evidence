# qa-skills 0.13.1 desktop app trust-core evidence

Recorded 2026-11-13, macOS 27.2.1, in the Claude desktop app. The app bundles Claude Code
2.1.321, which every session reported. qa-skills 0.13.1 @ b550c9c was installed as
`qa-skills@qa-skills-local` at local scope. The crash and timeout runs installed a faulted copy
from a local marketplace, with the release install disabled. The target was the self-hosted
Toolshop fallback.

The probe runs were graded by `scripts/probe-trust-core.mjs` from the qa-skills workshop, run
with `--prepare-desktop` and then `--grade-desktop` on the saved desktop session. Each directory
holds the probe state and prompt, the grade line, the parent's saved evidence files (raw
inventory listings dropped) and `capture-public.json` (tool calls and results, e-mail
addresses redacted). Raw transcripts are not committed.

| Directory | Grade |
| --- | --- |
| detection-1 | PASS |
| guard-denial-3 | PASS |
| hook-crash-1 | PASS |
| hook-timeout-1 | PASS |
| artifact-placement-2 | FAIL (Chromium profiles in OS temp) |
| guard-denial-1-inconclusive, agentid-binding-1-inconclusive | INCONCLUSIVE: probe pointed at the plugin cache, not the guard's root |
| guard-denial-2-inconclusive | INCONCLUSIVE: grader gaps for the desktop host, fixed and regraded; Write still unreached |
| agentid-binding-2-inconclusive, agentid-binding-3-inconclusive | INCONCLUSIVE: the Tester declined the injected sibling call |
| artifact-placement-1-inconclusive | INCONCLUSIVE: the before-inventory ran inside a compound call |

The end-to-end macOS Run is `/qa-skills:qa-execute tc_d68h3nc7 level:ui`, from plan to ingest.
Its Execution record is `.qa/executions/2026-11-13-gr175f21.md`.
