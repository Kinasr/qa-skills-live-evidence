---
type: feature
key: header-fixture
suite_key: su_bq6s1t7m
generated: {by: human:kinasr, at: 2026-11-14}
sources: [file:fixture/header-api/server.mjs, human:kinasr]
---

# Header fixture

The local header-credential fixture app (`npm run fixture:start`) answers `/api/echo` only for a
call that carries its configured `Authorization: Bearer` credential, and echoes back the request
headers it received. It serves the same routes on two origins: an API origin with no login, and an
app origin with a single sign-in form that sets a session. It exists to exercise qa-skills' Header
credentials on a real host, not as an application under test in its own right.

## Rules

1. **rule_h7k2**: A call to `/api/echo` that carries the configured credential is answered 200 with `authorized: true`, and the echo lists the `authorization` header it received.
2. **rule_m4q9**: A call to `/api/echo` with a credential that is not the configured one is answered 401 with `authorized: false`.
3. **rule_p2w6**: A signed-in user's call to `/api/echo` on the app origin is answered with that user as `session_user`, alongside the credential check.
