---
type: scenario
key: ts_medyh2t7
feature: login
generated: {by: script:qa-design, at: 2026-11-08}
---

# ts_medyh2t7: Sign in as a User or an Admin and land in the right place, with the token the sign-in returns

### tc_echzqdsm: A registered User signs in with the correct email and password and lands on their account overview

```yaml
key: tc_echzqdsm
automatable: true
roles: [User]
covers: [rule_mbsv, rule_w48w]
tags: [smoke]
review: {by: human:kinasr, at: 2026-11-09, commit: 729f9facd305b6b0ce24ddfe4d302c6c18767f0c, digest: 309fd80dcf273855}
generated: {by: delegate:sonnet, at: 2026-11-08}
```

**Preconditions.**

- A registered account with the User role, with a known email address and password
- The visitor is signed out and on the login page

**Steps.**

1. Enter the User account's correct email address and its correct password
2. Submit the sign-in

**Expected result.**

The sign-in succeeds and the User is signed in. The User lands on their account overview ("My account").

### tc_vwq64t4m: A registered Admin signs in with the correct email and password and lands on the admin dashboard

```yaml
key: tc_vwq64t4m
automatable: true
roles: [Admin]
covers: [rule_mbsv, rule_fzyk]
tags: [smoke]
review: {by: human:kinasr, at: 2026-11-09, commit: 729f9facd305b6b0ce24ddfe4d302c6c18767f0c, digest: 71a3749d665a36d8}
generated: {by: delegate:sonnet, at: 2026-11-08}
```

**Preconditions.**

- A registered account with the Admin role, with a known email address and password
- The visitor is signed out and on the login page

**Steps.**

1. Enter the Admin account's correct email address and its correct password
2. Submit the sign-in

**Expected result.**

The sign-in succeeds and the Admin is signed in. The Admin lands on the admin dashboard, not on the User's account overview.

### tc_n21hzm2b: A successful sign-in response carries an access token, its type Bearer and its lifetime

```yaml
key: tc_n21hzm2b
automatable: true
level: api
roles: [User]
covers: [rule_ccj1, rule_mbsv]
review: {by: human:kinasr, at: 2026-11-09, commit: 729f9facd305b6b0ce24ddfe4d302c6c18767f0c, digest: 289a68fd3319d58c}
generated: {by: delegate:sonnet, at: 2026-11-08}
```

**Preconditions.**

- A registered account with a known email address and password

**Steps.**

1. Submit a sign-in request with the account's correct email address and password
2. Read the fields of the response

**Expected result.**

The sign-in succeeds. The response contains a non-empty access token, a token type of Bearer, and a lifetime (expires_in) value.
