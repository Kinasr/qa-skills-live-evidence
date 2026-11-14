# Header-credential fixture app

A small local app for qa-skills' **Header credentials** live evidence. It needs only Node (no
Docker, no dependencies).

```bash
npm run fixture:start    # serves http://localhost:8095 (API origin) and http://localhost:8096 (app origin); Ctrl-C stops it
```

| Route | What it does |
| --- | --- |
| `GET /` | A page saying who is signed in, or linking to `/login` |
| `GET /login`, `POST /login` | A single form of user name and password; a correct pair sets a `fixture_session` cookie |
| `GET /api/echo` | `200 {authorized: true, …}` when `Authorization: Bearer <FIXTURE_API_TOKEN>` arrives, `401 {authorized: false, …}` otherwise; always echoes the request headers it received (the session cookie as `<session of …>` or `<no session>`) and `session_user` |
| `GET /api/revoked` | Always `401 {authorized: false, …}`, as if the configured key had been revoked, with the same echo |

Each echo carries the headers twice: `received_headers` (name to value) and `raw_headers`
(`"name: value"` lines), so a credential is also echoed under no header-named key and the literal
`<credential>` mask is visible where key-named redaction would otherwise replace it. `echoed`
lists the `Authorization` value as received and the same value without its scheme, under a key
that names no credential, as an API that echoes a key back in an ordinary field would: there the
CLI's literal mask, not the key-name or `Bearer` pattern scrub, is what hides the secret.

## Secrets

Both values are throwaway and live only in the git-ignored Auth file `.qa/auth`, the file the
Access notes' `auth:` keys name (ADR-0060). The template `.qa/auth.example` lists the keys:

```
FIXTURE_API_TOKEN=<any random value, at least 16 characters>
FIXTURE_APP_PASSWORD=<any random value, at least 8 characters>
```

The user name is `fixture-tester`. For example, to generate both without printing them:

```bash
printf 'FIXTURE_API_TOKEN=fx%s\nFIXTURE_APP_PASSWORD=pw%s\n' "$(openssl rand -hex 20)" "$(openssl rand -hex 8)" >> .qa/auth
```

## Access notes

`.qa/train/access.md` has one note per shape:

- `acc_fixture-api` (header-only): `header_via: auth:FIXTURE_API_TOKEN`, no `via`, on
  `http://localhost:8095/`. An Execution opens no browser.
- `acc_fixture-app` (shared): `via: auth:FIXTURE_APP_PASSWORD` plus the same `header_via`, on
  `http://localhost:8096/`. The CLI logs in through the form; `tester request` carries the session
  and the injected header.

Cases: `tc_9gjc65d6` (header-only, `target:fixture-api level:api`) and `tc_05698sf9` (shared,
`target:fixture-app level:ui`) in `.qa/features/header-fixture/`.

## Checks

- `npm run scan:header -- <path>...` (`scripts/header-fixture/scan-secret.mjs`) reads both secrets
  from `.qa/auth`, prints only counts and file names, and exits 1 on any occurrence of the Header
  secret with or without its `Bearer` scheme, of the UI password, or on any file left under a Run's
  `auth/` directory (a `request-*.js` file there is a leftover code file).
- `node scripts/header-fixture/argv-watch.mjs <out.json>` samples every process's argv each 100 ms
  until stopped with Ctrl-C, and records how many `playwright-cli` processes it saw and whether any
  argv held the Header secret.
