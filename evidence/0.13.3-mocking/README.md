# Mocking live evidence, qa-skills 0.13.3

qa-skills 0.13.3 @ 8bc7f64, installed as `qa-skills@qa-skills-local` at local scope; Claude Code
2.1.308, terminal CLI (headless `claude -p`); macOS 27.2.1; the self-hosted Toolshop fallback (UI
`http://localhost:4200`, API `http://localhost:8091`). Only redacted extracts are here: tool calls and
results, with e-mail addresses and the home path redacted. Raw transcripts are not committed.

- `guarded/`: an ordinary `/qa-skills:qa-execute tc_5e7vr0rs level:ui` Run (plan, confirm, one bound
  Tester Execution, ingest). Its Execution record is `.qa/executions/2026-11-14-1yfbqn8k.md`.
  `run/execute.json` pins `route_origins` and `route_sign_in_urls`; `run/executions/ex_1/guard.json`
  logs the admitted route; `after-close.txt` shows no browser and no route left once ingest closed
  the session.
- `boundary/`: the same case planned, confirmed and opened through the CLI inside a 2.1.308 host
  session (guarded admission), then a `route` with `--header` (refused `route_header`) and the
  same route without it (admitted). `routes-open-and-closed.txt` shows the route listed while the
  session was open and gone after `execute close`. Its saved login state was removed before commit.
