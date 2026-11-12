---
type: scenario
key: ts_jbn92pnz
feature: login
generated: {by: script:qa-design, at: 2026-11-08}
---

# ts_jbn92pnz: The login page: masked password with a show/hide control, links to registration and password reset, and the form still shown to a signed-in user

### tc_1z0vkyhm: On the login page the password is masked by default, the show/hide control toggles it between visible and masked, and the registration and password reset links lead to their pages.

```yaml
key: tc_1z0vkyhm
automates: [aut_yrzcdm]
automatable: true
covers: [rule_f2an, rule_4mm1, rule_9gc6, rule_j405]
review: {by: human:kinasr, at: 2026-11-09, commit: 729f9facd305b6b0ce24ddfe4d302c6c18767f0c, digest: fe38e3f95a3d47fb, migrated: 6}
generated: {by: delegate:sonnet, at: 2026-11-08}
```

**Preconditions.**

- No one is signed in
- The login page is open

**Steps.**

1. Type a password into the password field without using the show/hide control.
2. Observe how the typed password is displayed.
3. Use the show/hide control to reveal the password.
4. Observe how the typed password is displayed.
5. Use the show/hide control again to hide the password.
6. Observe how the typed password is displayed.
7. Follow the login page's link to register an account.
8. Observe the page that opens, then return to the login page.
9. Follow the login page's link to reset a forgotten password.
10. Observe the page that opens.

**Expected result.**

Before the control is used, the typed password is masked. After the first use of the control, the same password is shown as readable text. After the second use, it is masked again. The login page offers a link to register an account, and following it opens the registration page. It also offers a link to reset a forgotten password, and following it opens the password reset page.

### tc_37z32vw9: A signed-in User who visits the login page still sees the login form.

```yaml
key: tc_37z32vw9
automates: [aut_ftgt8x]
automatable: true
roles: [User]
covers: [rule_pq5a]
relies_on: [rule_mbsv]
review: {by: human:kinasr, at: 2026-11-09, commit: 729f9facd305b6b0ce24ddfe4d302c6c18767f0c, digest: 79e2c1159bcc685f, migrated: 6}
generated: {by: delegate:sonnet, at: 2026-11-08}
```

**Preconditions.**

- The User is signed in

**Steps.**

1. Open the login page.
2. Observe the page.

**Expected result.**

The login page is shown with its login form, including the email and password inputs. It is not replaced by a redirect away from the page.
