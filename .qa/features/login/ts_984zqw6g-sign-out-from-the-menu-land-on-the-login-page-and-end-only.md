---
type: scenario
key: ts_984zqw6g
feature: login
generated: {by: script:qa-design, at: 2026-11-08}
---

# ts_984zqw6g: Sign out from the menu, land on the login page, and end only the current session's token

### tc_d1xhm43c: A signed-in user signs out from the menu under their name and lands on the login page

```yaml
key: tc_d1xhm43c
automates: [aut_t434ff]
automatable: true
roles: [User]
covers: [rule_b558, rule_ej7w]
review: {by: human:kinasr, at: 2026-11-09, commit: 729f9facd305b6b0ce24ddfe4d302c6c18767f0c, digest: d458bf5c03607b7a, migrated: 6}
generated: {by: delegate:sonnet, at: 2026-11-08}
```

**Preconditions.**

- A registered User is signed in and viewing a page that shows the menu under their name

**Steps.**

1. Open the menu under the user's name
2. Choose to sign out from that menu

**Expected result.**

Sign-out is offered in the menu under the user's name and succeeds. The user lands on the login page.

### tc_amxer00w: Signing out without a valid token is refused as unauthorised, whether the token is missing or invalid

```yaml
key: tc_amxer00w
automates: [aut_gyg8d1]
automatable: true
level: api
covers: [rule_5zdm]
review: {by: human:kinasr, at: 2026-11-09, commit: 729f9facd305b6b0ce24ddfe4d302c6c18767f0c, digest: c2015abd98652b93, migrated: 6}
generated: {by: delegate:sonnet, at: 2026-11-08}
```

**Steps.**

1. Request sign-out presenting no token at all
2. Request sign-out presenting a token that is not valid (for example a malformed or made-up token)

**Expected result.**

Both sign-out requests are refused as unauthorised. Neither succeeds.

### tc_9v4sdn5v: After one of a user's two sessions signs out, that session's token is no longer accepted while the other session stays signed in

```yaml
key: tc_9v4sdn5v
automates: [aut_v0v7t4]
automatable: true
roles: [User]
covers: [rule_pmxr, rule_fvmj]
review: {by: human:kinasr, at: 2026-11-09, commit: 729f9facd305b6b0ce24ddfe4d302c6c18767f0c, digest: f54297d0ccedc0ab, migrated: 6}
generated: {by: delegate:sonnet, at: 2026-11-08}
```

**Preconditions.**

- A registered User has two separate signed-in sessions, A and B, each with its own token

**Steps.**

1. Sign out of session A using session A's token
2. Attempt to sign out again using session A's token
3. Using session B's token, check that session B is still signed in by signing out of session B

**Expected result.**

Signing out of session A succeeds. The repeated sign-out with session A's token is refused as unauthorised, because that token is no longer accepted. Session B was still signed in after session A signed out: its token is accepted and signing out of it succeeds.
