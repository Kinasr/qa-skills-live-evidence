---
type: scenario
key: ts_b56pjrcf
feature: header-fixture
generated: {by: human:kinasr, at: 2026-11-14}
---

# ts_b56pjrcf: The header credential on the fixture API, header-only and shared with a UI login

### tc_9gjc65d6: The fixture API accepts the configured credential, refuses an invalid one, and refuses it on the revoked endpoint

```yaml
key: tc_9gjc65d6
automatable: true
covers: [rule_h7k2, rule_m4q9, rule_r8v3]
generated: {by: human:kinasr, at: 2026-11-14}
```

**Steps.**

1. Send GET `/api/echo` with the default credential
2. Read the response status, its `authorized` field and the `authorization` header it lists under `received_headers`
3. Send GET `/api/echo` with an invalid credential
4. Read the response status and its `authorized` field
5. Send GET `/api/revoked` with the default credential
6. Read the response status and its `authorized` field

**Expected result.**

The first call is answered 200 with `authorized: true`, and `received_headers` lists an
`authorization` header. The call with an invalid credential is answered 401 with
`authorized: false`. The call to `/api/revoked` with the default credential is answered 401 with
`authorized: false`: that endpoint refuses every credential, so this 401 is the expected answer and
does not mean the account's access is gone.

### tc_05698sf9: A signed-in user's API call carries both the session and the configured credential

```yaml
key: tc_05698sf9
automatable: true
covers: [rule_h7k2, rule_p2w6]
generated: {by: human:kinasr, at: 2026-11-14}
```

**Preconditions.**

- Signed in to the fixture app as its test account

**Steps.**

1. Open the home page and read who it says is signed in
2. Send GET `/api/echo` with the default credential
3. Read the response status, its `authorized` and `session_user` fields, and the `authorization` header it lists under `received_headers`

**Expected result.**

The home page says the test account is signed in. The call is answered 200 with
`authorized: true` and `session_user` naming the test account, and `received_headers` lists an
`authorization` header.
