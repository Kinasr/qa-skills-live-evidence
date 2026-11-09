---
type: scenario
key: ts_0ybc0nye
feature: login
generated: {by: script:qa-design, at: 2026-11-08}
---

# ts_0ybc0nye: Sign-in refuses missing, malformed and wrong credentials without revealing which emails are registered

### tc_kkvq91bq: Sign-in is refused when the email address or the password is missing

```yaml
key: tc_kkvq91bq
automatable: true
roles: [User]
covers: [rule_das7]
review: {by: human:kinasr, at: 2026-11-09, commit: 729f9facd305b6b0ce24ddfe4d302c6c18767f0c, digest: 976c583abc4751ac}
generated: {by: delegate:sonnet, at: 2026-11-08}
```

**Preconditions.**

- A registered user exists with a known email and password
- The user is not signed in

**Steps.**

1. Submit sign-in with an empty email address and the registered user's correct password
2. Submit sign-in with the registered user's email address and an empty password
3. Submit sign-in with both the email address and the password empty

**Expected result.**

Each of the three submissions is rejected and the user is not signed in. The user stays on the login page, or receives a rejection from the sign-in request, and no access token is issued.

### tc_mkefzd55: Sign-in rejects a malformed email address with a message

```yaml
key: tc_mkefzd55
automatable: true
roles: [User]
covers: [rule_etgj]
review: {by: human:kinasr, at: 2026-11-09, commit: 729f9facd305b6b0ce24ddfe4d302c6c18767f0c, digest: 2ffd85b870ab36a3}
generated: {by: delegate:sonnet, at: 2026-11-08}
```

**Preconditions.**

- The user is not signed in

**Steps.**

1. Submit sign-in with an email address that is not well formed (for example, missing the domain part) and any password

**Expected result.**

The submission is rejected with a message about the email address, and the user is not signed in.

### tc_8y3scbfb: A wrong password and an unknown email get the same generic error

```yaml
key: tc_8y3scbfb
automatable: true
roles: [User]
covers: [rule_4c8m]
relies_on: [rule_mbsv]
review: {by: human:kinasr, at: 2026-11-09, commit: 729f9facd305b6b0ce24ddfe4d302c6c18767f0c, digest: 652fbea38dfdd5e3}
generated: {by: delegate:sonnet, at: 2026-11-08}
```

**Preconditions.**

- A registered user exists with a known email and password
- An email address that is well formed and not registered
- The user is not signed in

**Steps.**

1. Submit sign-in with the registered user's email and a wrong password, and note the error shown
2. Submit sign-in with the unregistered email and any password, and note the error shown
3. Compare the two errors

**Expected result.**

Both submissions are rejected and the user is not signed in. The two errors are the same generic error, so nothing shows whether the email is registered.
