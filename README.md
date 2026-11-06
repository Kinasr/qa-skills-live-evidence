# qa-skills-live-evidence

The **live-evidence test project** for the [`qa-skills`](https://github.com/Kinasr/qa-skills) plugin. It is a normal repository under test: it will hold a `.qa/` knowledge directory and TypeScript Playwright code, and the maintainer runs the `/qa-*` skills in it with Claude Code on the supported floor.

The project has two jobs:

1. **Produce live evidence.** Run the plugin in this project on the Claude Code floor, in the terminal CLI and the desktop app, and record what happened as entries under *Live evidence* in `qa-skills-workshop`'s `docs/support.md`. The entries cover the five trust-core enforcement items and host-version detection on both surfaces.
2. **Watch skill behaviour.** Every skill problem met while working here — an edge case, a regression, first-run friction — is filed in [`Kinasr/qa-skills-workshop`](https://github.com/Kinasr/qa-skills-workshop) so the backlog learns from real use. The rule and its required fields are in [Filing skill problems](#filing-skill-problems).

This ticket (#825) only chooses the Application target and sets up its self-hosted fallback. The `.qa/` directory, Playwright config and test code are built by #828 with the `/qa-*` skills and are deliberately absent here.

## Application target

**Chosen application: Practice Software Testing ("Toolshop"), Sprint 5 (app version 5.0).**

| Target | URL |
| --- | --- |
| Public UI | <https://practicesoftwaretesting.com> |
| Public REST API | <https://api.practicesoftwaretesting.com> |
| Public Swagger | <https://api.practicesoftwaretesting.com/api/documentation> |
| Public API health | <https://api.practicesoftwaretesting.com/status> |
| Self-hosted fallback UI (primary) | <http://localhost:4200> |
| Self-hosted fallback API (primary) | <http://localhost:8091> |
| Self-hosted fallback Swagger | <http://localhost:8091/api/documentation> |

**Date checked: 2026-11-05.** The upstream repository is <https://github.com/testsmith-io/practice-software-testing>.

### Why the fallback is the primary target

No public candidate meets every criterion below.

* Toolshop is explicitly made for test practice and has the UI, API, documented accounts and writes we need, but its [privacy page](https://practicesoftwaretesting.com/privacy) says it **removes all user data every hour** ([source](https://github.com/testsmith-io/practice-software-testing/blob/main/sprint5/UI/src/app/privacy/privacy.component.html)). That is a scheduled reset shorter than a long evidence Run, so the public site cannot be the primary target for runs that might cross the hour.
* Toolshop's source is **source-available, not OSI open source**: its [LICENSE](https://github.com/testsmith-io/practice-software-testing/blob/main/LICENSE) grants private, internal and non-commercial use only.
* Restful-booker-platform is open source and has a UI and API, but it supports a [scheduled database reset via `dbRefresh`](https://github.com/mwinteringham/restful-booker-platform/blob/master/booking/README.md) and the public demo's reset interval is not published, so "no reset shorter than a Run" cannot be shown. Its local fallback is also a multi-service source build rather than a pinned image set.
* RealWorld/Conduit is a framework-comparison demo with a public API, not an application published for general test practice, and it publishes no fixed account credentials.

The **self-hosted Toolshop fallback is therefore the primary Application target**. It is the same application, with no hourly reset, a known seeded starting state, and image digests that make it repeatable. The public Toolshop site remains a **secondary target** for a Run that fits comfortably inside its hourly data-removal window.

## Selection criteria and scores

The criteria, in the order of the table columns:

1. **Made and published for test practice** — writes are its intended use and harm no one.
2. **A UI with a login, at least one data-writing flow and an HTTP API** — the same origin rules the Tester uses.
3. **Publicly documented test accounts** — no real person's account.
4. **Stable enough to finish a Run** — no scheduled data reset shorter than a Run, and no captcha or bot wall on login.
5. **Open source and runnable locally** (for example Docker) — so the same application can be the fallback.
6. **No terms forbidding automated use.**

Scale: **2 = meets**, **1 = partial or unverified**, **0 = fails or absent**. Maximum 12.

| Candidate | Made for test practice | UI with login, data-writing flow and HTTP API | Publicly documented test accounts | Stable: no reset shorter than a Run, no captcha | Open source and runnable locally | No terms forbidding automated use | Total |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **Practice Software Testing (Toolshop)** | **2** — [“A learning platform for software testing / test automation”](https://practicesoftwaretesting.com/robots.txt) | **2** — [UI](https://practicesoftwaretesting.com), [API](https://api.practicesoftwaretesting.com/status); login and cart writes verified 2026-11-05 | **2** — [README default accounts](https://github.com/testsmith-io/practice-software-testing#default-accounts) | **0** — [all user data removed every hour](https://github.com/testsmith-io/practice-software-testing/blob/main/sprint5/UI/src/app/privacy/privacy.component.html); no captcha in the [login component](https://github.com/testsmith-io/practice-software-testing/blob/main/sprint5/UI/src/app/auth/login/login.component.ts) | **1** — [source-available license](https://github.com/testsmith-io/practice-software-testing/blob/main/LICENSE) permits private/non-commercial runs; [Docker images](https://github.com/testsmith-io/practice-software-testing/blob/main/docker-compose.prod.yml), but not OSI open source | **2** — no terms forbid automated use; [robots.txt](https://practicesoftwaretesting.com/robots.txt) only disallows indexing of `/account`, `/admin`, `/auth`, `/checkout` | **9** |
| **Restful-booker-platform** | **2** — [“primary purpose for training others on how to explore and test web service platforms”](https://github.com/mwinteringham/restful-booker-platform#readme) | **2** — [UI](https://automationintesting.online/), [API room list](https://automationintesting.online/api/room); login verified 2026-11-05, booking API present | **2** — [README login: `admin` / `password`](https://github.com/mwinteringham/restful-booker-platform#login) | **0** — [scheduled DB reset via `dbRefresh`](https://github.com/mwinteringham/restful-booker-platform/blob/master/booking/README.md); public demo interval not published, so the no-reset criterion cannot be shown | **1** — [GPLv3](https://github.com/mwinteringham/restful-booker-platform/blob/master/LICENSE), [local build](https://github.com/mwinteringham/restful-booker-platform#building-locally); multi-service source build, not pinned images | **2** — training platform; no terms forbid automated use | **9** |
| **RealWorld / Conduit** | **0** — [a demo app for comparing frameworks, not a test-practice site](https://github.com/realworld-apps/realworld#readme) | **2** — [UI](https://demo.realworld.show/), [API](https://api.realworld.show/api/articles?limit=1); article/comment write endpoints | **1** — [seeded demo users; credentials are not published, registration is open](https://github.com/realworld-apps/realworld/blob/main/specs/e2e/helpers/config.ts) | **1** — [public API for frontend testing with data isolation](https://docs.realworld.show/specifications/frontend/api/); no reset policy published | **2** — [MIT](https://github.com/realworld-apps/realworld/blob/main/LICENSE), [official local backend](https://github.com/realworld-apps/nitro-prisma-zod-realworld-example-app) | **2** — public API is offered for testing frontends; no terms forbid automated use | **8** |

**Decision:** Toolshop and Restful-booker-platform tie on 9/12; RealWorld is lower. Toolshop wins the tie because it is the only candidate explicitly published for test practice and its fallback is reproducible from digest-pinned images with one seed command. Neither public site passes the stability criterion, so the fallback is primary as described above. If Toolshop later removes the hourly data reset or relaxes its license, this decision should be re-checked on the date of the change.

### Re-checking the choice

* Public UI and API: `curl -sS -o /dev/null -w '%{http_code}\n' https://practicesoftwaretesting.com/` and `curl -sS https://api.practicesoftwaretesting.com/status`.
* Login: `curl -sS -X POST https://api.practicesoftwaretesting.com/users/login -H 'Content-Type: application/json' --data '{"email":"customer@practicesoftwaretesting.com","password":"welcome01"}'`.
* Reset and terms: the privacy page and source link above, plus the repository [LICENSE](https://github.com/testsmith-io/practice-software-testing/blob/main/LICENSE).
* Restful-booker-platform reset: the `dbRefresh` paragraph in its [booking service README](https://github.com/mwinteringham/restful-booker-platform/blob/master/booking/README.md).

## Self-hosted fallback

The fallback runs the same Toolshop Sprint 5 application locally with Docker Compose: Angular UI, Laravel REST API, nginx, MariaDB 10.6.11 and the upstream cron container. The upstream images are `linux/amd64` only; on Apple silicon Docker runs them under emulation (verified on macOS, arm64). Upstream sources are **not** cloned into this repository; only the Compose file and the start/reset scripts are committed.

### Commands

```bash
npm run fallback:start    # start containers, wait for the DB, migrate:fresh --seed, wait for UI + API
npm run fallback:reset    # re-run migrate:fresh --seed on the running stack and wait for the API
npm run fallback:stop     # stop containers; images and named volumes are kept
```

`fallback:start` is the one command that brings the fallback up **and** puts it in its seeded state. `fallback:reset` is the one command that returns an already-running fallback to that state.

Local URLs after start: UI <http://localhost:4200>, API <http://localhost:8091>, Swagger <http://localhost:8091/api/documentation>.

### Pinned upstream version

The running fallback is pinned by image digest. Do not replace a digest with a moving tag.

| Service | Upstream image | Pinned reference |
| --- | --- | --- |
| API | `testsmith/practice-software-testing-sprint5-api:2.5` | `sha256:881cb7ecd76477994728648c0c16f6e9d2beed0f0217734843a32a7bb92553f0` |
| UI | `testsmith/practice-software-testing-sprint5-ui:2.5` | `sha256:f907d8daae32dc90ba900e964928d00bf0aabfab7067eaeeaa49f5a0f70c52e6` |
| Web / nginx | `testsmith/practice-software-testing-web` (upstream has no version tag) | `sha256:950bafdc86501002c381e35d9b70e298fe211f4ab1fbfda334b67f03dffa048d` |
| Cron | `testsmith/practice-software-testing-cron` (upstream has no version tag) | `sha256:2e0d51bd3f92c1eb2d2b21439982c8c8785bcbfa0c0fb27698f83e785337110f` |
| Database | `yobasystems/alpine-mariadb:10.6.11` | `sha256:8bb25ca2d68c81118fcf745959560de2f316a178abf9decc8bb5b6f86c929084` |

Source reference checked on 2026-11-05: upstream `main` at commit `ae7caecb811dd8952c09d997e69be7cb946ecd44` (2026-10-11). The 2.5 images are the built Sprint 5 artifacts from 2026-09-09; the commit is recorded for re-checking, not as the runtime version. The API's `/status` reports `"version":"5.0"` locally and publicly.

The upstream [LICENSE](https://github.com/testsmith-io/practice-software-testing/blob/main/LICENSE) permits running the software for private, internal and non-commercial purposes. Do not publish, publicly host or redistribute the fallback; it is a local testing environment.

### Seeded state and test accounts

`npm run fallback:start` and `npm run fallback:reset` run:

```text
php artisan migrate:fresh --seed --force
```

That drops and re-creates the schema and loads the upstream Sprint 5 seed. The verified starting state is:

* 50 products (paginated 9 per page) with their categories and brands.
* The upstream documented accounts, all four of which answered `HTTP 200` on `/users/login` after seeding:
  * `admin@practicesoftwaretesting.com` / `welcome01` (admin)
  * `customer@practicesoftwaretesting.com` / `welcome01` (user)
  * `customer2@practicesoftwaretesting.com` / `welcome01` (user)
  * `customer3@practicesoftwaretesting.com` / `pass123` (user)
* `/users` (admin token) lists the three customer accounts; the admin account is not returned by that endpoint but its login works.

These are the site's publicly documented practice accounts, not real people's accounts. They are listed **only here**; no other credential is committed. User-created accounts, carts, invoices and orders are removed by the reset.

### Verification performed (2026-11-05)

The start command was run, then:

```text
$ curl -sS -o /dev/null -w '%{http_code}\n' http://localhost:4200/
200
$ curl -sS http://localhost:8091/status
{"version":"5.0","environment":"local","app_name":"Toolshop"}
$ curl -sS -X POST http://localhost:8091/users/login ... customer@practicesoftwaretesting.com ...
HTTP 200 (bearer token)
$ curl -sS -X POST http://localhost:8091/users/register ... fallback-check-<timestamp>@example.com ...
HTTP 201 Created
$ curl -sS -X POST http://localhost:8091/users/login ... fallback-check-<timestamp>@example.com ...
HTTP 200 (bearer token)
```

After `npm run fallback:reset`:

```text
$ curl -sS -X POST http://localhost:8091/users/login ... fallback-check-<timestamp>@example.com ...
HTTP 401 {"error":"Unauthorized"}
$ curl ... /users/search?q=fallback-check-<timestamp>@example.com ...  (admin token)
total 0, data []
$ curl -sS -X POST http://localhost:8091/users/login ... customer@practicesoftwaretesting.com ...
HTTP 200
$ curl -sS http://localhost:8091/products?page=1
total 50, first "Combination Pliers"
```

The containers were then stopped with `npm run fallback:stop`. Images and named volumes were left in place.

## Filing skill problems

Every skill problem seen while working in this project is filed as an issue in [`Kinasr/qa-skills-workshop`](https://github.com/Kinasr/qa-skills-workshop), labelled **`needs-triage`**. This is the project's second job: an edge case, a regression or first-run friction is filed even when the evidence run still passes its condition. One issue per problem.

Each issue carries:

* **qa-skills revision** — the plugin version and commit the session ran.
* **Claude Code version** — the host version the session reported.
* **Surface** — terminal CLI or desktop app, with the install method used.
* **Skill and command** — for example `/qa-execute` or `/qa-deep-dive`.
* **Steps** — what was done, what happened, what was expected, and any transcript or error text needed to reproduce it.
* A link to the evidence-run entry when the problem was found during an evidence run.

Application defects of the practice site are **not** filed in that tracker. At most they become Bug drafts in this project's `.qa/bugs/`; the workshop's tracker holds framework issues only.

## Repository layout

| Path | Purpose |
| --- | --- |
| `fallback/docker-compose.yml` | Digest-pinned Toolshop fallback stack. |
| `scripts/fallback-start.sh` | Start + seed the fallback. |
| `scripts/fallback-reset.sh` | Return the fallback to its seeded state. |
| `scripts/fallback-stop.sh` | Stop containers, keeping images and volumes. |
| `scripts/fallback-common.sh` | Shared Compose, seed and readiness helpers. |
| `package.json` | `npm run fallback:*` commands; the future Playwright project will extend it. |
| `.gitignore` | Ignores `.qa/.auth/`, `.env`, Node/Playwright output, and the fallback's local clone/data. |

`.qa/`, Playwright configuration and TypeScript tests are added by #828; this ticket does not create them.
