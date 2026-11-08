---
type: scenario
key: ts_9xabrdmh
feature: login
generated: {by: script:qa-design, at: 2026-11-08}
---

# ts_9xabrdmh: Request a password reset: validation, the success message, the fixed new password and the same answer for unregistered emails

### tc_38cdgs0y: Requesting a password reset with no email address, then with a malformed one, is refused with a message

```yaml
key: tc_38cdgs0y
automatable: true
covers: [rule_7z2b, rule_gp4k]
generated: {by: delegate:sonnet, at: 2026-11-08}
```

**Preconditions.**

- The visitor is not signed in and the password reset page is open

**Steps.**

1. Request a password reset leaving the email address empty
2. Request a password reset with a malformed email address

**Expected result.**

The request with no email address is rejected: the email address is required. The request with a malformed email address is rejected with a message about the email address. In neither case is a password reset carried out.

### tc_8tqwxf5a: After a password reset the user sees a success message, the old password gets the generic sign-in error, welcome02 signs in, and no email is sent

```yaml
key: tc_8tqwxf5a
automatable: true
roles: [User]
covers: [rule_r84e, rule_15wq, rule_vhta]
relies_on: [rule_4c8m, rule_mbsv]
generated: {by: delegate:sonnet, at: 2026-11-08}
```

**Preconditions.**

- A dedicated registered User account used only for this case, not the shared User or Admin account, whose current password is not welcome02
- The user is not signed in and the password reset page is open

**Steps.**

1. Request a password reset for the dedicated account's registered email address
2. Note the message shown and check the account's mailbox for any email
3. Try to sign in with the dedicated account's email and its old password
4. Sign in with the dedicated account's email and the password welcome02

**Expected result.**

A success message is shown after the reset request. No email arrives in the account's mailbox. Signing in with the old password is refused with the generic sign-in error. Signing in with welcome02 succeeds, because the reset set the account's password to welcome02.

### tc_80qdetpy: A password reset request for an unregistered email shows the same success message as for a registered email

```yaml
key: tc_80qdetpy
automatable: true
covers: [rule_k2tk]
relies_on: [rule_15wq]
generated: {by: delegate:sonnet, at: 2026-11-08}
```

**Preconditions.**

- The visitor is not signed in and the password reset page is open
- An email address that no account is registered under
- A dedicated registered account, not the shared User or Admin account, whose password may be reset

**Steps.**

1. Request a password reset for the registered email of the dedicated account and note the message shown
2. Request a password reset for the unregistered email address and note the message shown

**Expected result.**

Both requests show the success message, and the message for the unregistered email is the same as the one for the registered email. Nothing in the answer reveals that the email is unregistered.

### tc_enpmxy3k: A signed-in user can open the password reset page

```yaml
key: tc_enpmxy3k
automatable: true
covers: [rule_kg1z]
relies_on: [rule_mbsv]
generated: {by: delegate:sonnet, at: 2026-11-08}
```

**Preconditions.**

- A registered user is signed in

**Steps.**

1. Open the password reset page

**Expected result.**

The password reset page opens and shows its request form. The signed-in user is not blocked or redirected away from it.
