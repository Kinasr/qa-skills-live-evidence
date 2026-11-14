# Header credentials live evidence, qa-skills 0.13.2

- **Install:** `qa-skills@qa-skills-local` 0.13.2 @ `e8822f0`, local scope (`claude plugin list`:
  `Version: 0.13.2`), served from a local marketplace under the distinct name.
- **Host:** Claude Code 2.1.308, terminal CLI, headless `claude -p` turns (plan, then `yes`),
  macOS 27.2.1, 2026-11-14.
- **Fixture:** `fixture/header-api/` (`npm run fixture:start`). Secrets: `FIXTURE_API_TOKEN` and
  `FIXTURE_APP_PASSWORD` in the git-ignored Auth file `.qa/auth`, named by `auth:` keys.
- **Notes:** `acc_fixture-api` (header-only: `header_via`, no `via`) and `acc_fixture-app` (shared:
  `via` plus `header_via`), both `Authorization` with scheme `Bearer`.

`setup/train-check-access.json` is `train check access` on the notes: `ok: true`, `access_files: []`
(no named file is unignored). `setup/train-check-access-control-unignored.json` is the same check with
`/.qa/auth` removed from `.gitignore`: refused, `credential_auth_not_ignored`.

Each run directory holds `transcript-extract.json` (tool calls and results of the main session and the
Tester, e-mail addresses and the home path redacted; raw transcripts are not committed), `run/` (the
Run dir after `execute ingest`, the Chromium profile directory left out), `argv-watch.json`
(`scripts/header-fixture/argv-watch.mjs`, every process's argv sampled each 100 ms for the whole
Run) and `scan.json` (`scripts/header-fixture/scan-secret.mjs` over the live Run dir, the committed
Execution record, `tester.report.md` and the run's evidence directory).

## Recorded runs

| Run | Shape | Record | Result | What it shows |
| --- | --- | --- | --- | --- |
| [`header-only/`](header-only) | header-only | [`2026-11-14-argehbes`](../../.qa/executions/2026-11-14-argehbes.md) | passed | Default `GET /api/echo`: 200, echoed key `<credential>` with and without its scheme. `--auth invalid`: 401, no `auth_rejected`. Default `GET /api/revoked`: 401, `auth_rejected: true`. No browser opened (`kind: header-only`). No argv held the secret. Scan CLEAN, no file left under `auth/`. |
| [`shared/`](shared) | shared | [`2026-11-14-8eba4tz2`](../../.qa/executions/2026-11-14-8eba4tz2.md) | passed | CLI login through the form; the home page says the test account is signed in. `GET /api/echo` through the browser session: 200, `signed_in_as: fixture-tester`, echoed key `<credential>`. The one credential-bearing call ran as `playwright-cli run-code --filename` (no inline `run-code`), and none of the 18 `playwright-cli` argvs held the secret. Scan CLEAN, no file left under `auth/`. |

## Superseded runs (fixture fixes, kept for the record)

| Run | Record | Result | Why it was rerun |
| --- | --- | --- | --- |
| [`header-only-1/`](header-only-1) | [`2026-11-14-nkm71bt2`](../../.qa/executions/2026-11-14-nkm71bt2.md) | passed | The echo carried the key only under `authorization`, which key-named redaction shows as `<redacted>`, so the literal `<credential>` mask was not visible; no default call got a 401. Scan CLEAN. |
| [`header-only-2/`](header-only-2) | [`2026-11-14-p37k17qm`](../../.qa/executions/2026-11-14-p37k17qm.md) | passed | `auth_rejected` behaved as designed, but the raw `authorization: …` lines are pattern-scrubbed too, so `<credential>` was still not visible. Scan CLEAN. |
| [`shared-1/`](shared-1) | [`2026-11-14-x0jr86nt`](../../.qa/executions/2026-11-14-x0jr86nt.md) | blocked `step` | The fixture named its account field `session_user`; `session` is a credential word, so it was redacted and the Tester could not check the account. The header leg already held. Scan CLEAN. |

## Two departures from the issue's wording

- **Secret location:** the issue put the secret in the repo root's `.env` (`env:NAME`). Since 0.11.0
  (ADR-0060) `/qa-train access` proposes `auth:KEY` in `.qa/auth` for Header credentials, so the
  fixture uses that; the scan reads `.qa/auth`.
- **`auth_rejected`:** the issue expected it on the `--auth invalid` 401. ADR-0058 and the code set
  it only on a 401 from a default call that carried the configured credential, so the case adds a
  default call to `/api/revoked`, which always answers 401. The invalid call's 401 carries none.
