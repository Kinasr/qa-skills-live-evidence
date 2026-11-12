---
type: bug
key: bg_fhyrbyn3
status: draft
case: tc_mkefzd55
feature: login
case_digest: 2ffd85b870ab36a3
run: hv1q19be
commit: b1b64afd5d52fb0306a929f57ad1ec51df61d189
drafted_at: 2026-11-13
route: no-automation-failed
target: local-ui
record: "executions/2026-11-13-hv1q19be.md"
roles: [User]
---

# bg_fhyrbyn3: Sign-in with a malformed email shows the generic "Invalid email or password" error instead of an email-format message

**Description.**
The malformed email reaches the API, which answers 401; no client-side or server-side email-format message is shown.

**Steps.**
- [established] The user is not signed in
1. Submit sign-in with an email address that is not well formed (for example, missing the domain part) and any password

**Expected.**
The submission is rejected with a message about the email address, and the user is not signed in.

**Actual.**
The submission was rejected and the user stayed signed out, but the message shown was "Invalid email or password", which is not about the email address. The login request returned 401 and no email-format message appeared.

**Evidence.**
The page stayed on /auth/login. Console errors: 401 on /users/me (twice), 500 on /users/refresh, 401 on /users/login, and ERROR {message: Unauthorized}.
1. `User do goto /account → ok`
2. `User do click f1e40 → ok`
3. `User do click f1e75 → ok`
4. `User do click f1e40 → ok`
5. `User do click f1e79 → ok`
6. `User do fill f2e55 <typed> → ok`
7. `User do fill f2e60 <typed> → ok`
8. `User do click f2e67 → ok`
9. `User do console → ok`

<details><summary>Element evidence</summary>

```json
{
  "2": {"aria":"navigation > menubar \"Main menu\" > menuitem > button \"Jane Doe\"","locator":"locator('[data-test=\"nav-menu\"]')","excerpt":{"element":{"tag":"button","attributes":{"aria-expanded":"false","class":"nav-link dropdown-toggle btn-link-style","data-bs-toggle":"dropdown","data-test":"nav-menu","id":"menu","type":"button"}},"ancestors":[{"tag":"li","attributes":{"class":"nav-item dropdown","role":"menuitem"}},{"tag":"ul","attributes":{"aria-label":"Main menu","class":"navbar-nav ms-auto mb-2 mb-lg-0","role":"menubar"}},{"tag":"div","attributes":{"class":"collapse navbar-collapse","id":"navbarSupportedContent"}},{"tag":"div","attributes":{"class":"container"}},{"tag":"nav","attributes":{"class":"navbar navbar-expand-lg navbar-light bg-light"}},{"tag":"app-header","attributes":{}},{"tag":"app-root","attributes":{}},{"tag":"body","attributes":{}}]}},
  "3": {"aria":"navigation > menubar \"Main menu\" > menuitem \"Jane Doe My account My favorites My profile My invoices My messages Sign out\" > list \"Jane Doe\" > listitem > link \"My messages\"","locator":"locator('[data-test=\"nav-my-messages\"]')","excerpt":{"element":{"tag":"a","attributes":{"class":"dropdown-item","data-test":"nav-my-messages","href":"/account/messages"}},"ancestors":[{"tag":"li","attributes":{}},{"tag":"ul","attributes":{"aria-labelledby":"menu","class":"dropdown-menu show","data-bs-popper":"static"}},{"tag":"li","attributes":{"class":"nav-item dropdown","role":"menuitem"}},{"tag":"ul","attributes":{"aria-label":"Main menu","class":"navbar-nav ms-auto mb-2 mb-lg-0","role":"menubar"}},{"tag":"div","attributes":{"class":"collapse navbar-collapse","id":"navbarSupportedContent"}},{"tag":"div","attributes":{"class":"container"}},{"tag":"nav","attributes":{"class":"navbar navbar-expand-lg navbar-light bg-light"}},{"tag":"app-header","attributes":{}}],"truncated":{"ancestors":true}},"truncated":{"excerpt":true}},
  "4": {"aria":"navigation > menubar \"Main menu\" > menuitem > button \"Jane Doe\"","locator":"locator('[data-test=\"nav-menu\"]')","excerpt":{"element":{"tag":"button","attributes":{"aria-expanded":"false","class":"nav-link dropdown-toggle btn-link-style","data-bs-toggle":"dropdown","data-test":"nav-menu","id":"menu","type":"button"}},"ancestors":[{"tag":"li","attributes":{"class":"nav-item dropdown","role":"menuitem"}},{"tag":"ul","attributes":{"aria-label":"Main menu","class":"navbar-nav ms-auto mb-2 mb-lg-0","role":"menubar"}},{"tag":"div","attributes":{"class":"collapse navbar-collapse","id":"navbarSupportedContent"}},{"tag":"div","attributes":{"class":"container"}},{"tag":"nav","attributes":{"class":"navbar navbar-expand-lg navbar-light bg-light"}},{"tag":"app-header","attributes":{}},{"tag":"app-root","attributes":{}},{"tag":"body","attributes":{}}]}},
  "5": {"aria":"navigation > menubar \"Main menu\" > menuitem \"Jane Doe My account My favorites My profile My invoices My messages Sign out\" > list \"Jane Doe\" > listitem > generic","locator":"locator('[data-test=\"nav-sign-out\"]')","excerpt":{"element":{"tag":"a","attributes":{"class":"dropdown-item","data-test":"nav-sign-out"}},"ancestors":[{"tag":"li","attributes":{}},{"tag":"ul","attributes":{"aria-labelledby":"menu","class":"dropdown-menu show","data-bs-popper":"static"}},{"tag":"li","attributes":{"class":"nav-item dropdown","role":"menuitem"}},{"tag":"ul","attributes":{"aria-label":"Main menu","class":"navbar-nav ms-auto mb-2 mb-lg-0","role":"menubar"}},{"tag":"div","attributes":{"class":"collapse navbar-collapse","id":"navbarSupportedContent"}},{"tag":"div","attributes":{"class":"container"}},{"tag":"nav","attributes":{"class":"navbar navbar-expand-lg navbar-light bg-light"}},{"tag":"app-header","attributes":{}}],"truncated":{"ancestors":true}},"truncated":{"excerpt":true}},
  "6": {"aria":"textbox \"Email address *\"","locator":"locator('[data-test=\"email\"]')","excerpt":{"element":{"tag":"input","attributes":{"aria-invalid":"false","aria-required":"true","class":"form-control ng-untouched ng-pristine ng-invalid","data-test":"email","id":"email","placeholder":"Your email","type":"email"}},"ancestors":[{"tag":"div","attributes":{"class":"mb-3"}},{"tag":"form","attributes":{"class":"ng-untouched ng-pristine ng-invalid","data-test":"login-form"}},{"tag":"div","attributes":{"class":"col-lg-6 auth-form"}},{"tag":"div","attributes":{"class":"row justify-content-md-center"}},{"tag":"div","attributes":{"class":"container auth-container"}},{"tag":"app-login","attributes":{}},{"tag":"div","attributes":{"class":"container"}},{"tag":"app-root","attributes":{}}],"truncated":{"ancestors":true}},"truncated":{"excerpt":true}},
  "7": {"aria":"textbox \"Password *\"","locator":"locator('[data-test=\"password\"]')","excerpt":{"element":{"tag":"input","attributes":{"aria-invalid":"false","class":"form-control","data-test":"password","id":"password","placeholder":"Your password","type":"password"}},"ancestors":[{"tag":"div","attributes":{"class":"input-group"}},{"tag":"app-password-input","attributes":{"class":"ng-untouched ng-pristine ng-invalid"}},{"tag":"div","attributes":{"class":"mb-3"}},{"tag":"form","attributes":{"class":"ng-untouched ng-invalid ng-dirty","data-test":"login-form"}},{"tag":"div","attributes":{"class":"col-lg-6 auth-form"}},{"tag":"div","attributes":{"class":"row justify-content-md-center"}},{"tag":"div","attributes":{"class":"container auth-container"}},{"tag":"app-login","attributes":{}}],"truncated":{"ancestors":true}},"truncated":{"excerpt":true}},
  "8": {"aria":"button \"Login\"","locator":"locator('[data-test=\"login-submit\"]')","excerpt":{"element":{"tag":"input","attributes":{"aria-label":"Login","class":"btnSubmit","data-test":"login-submit","type":"submit"}},"ancestors":[{"tag":"div","attributes":{"class":"input-group mb-3"}},{"tag":"form","attributes":{"class":"ng-dirty ng-touched ng-valid","data-test":"login-form"}},{"tag":"div","attributes":{"class":"col-lg-6 auth-form"}},{"tag":"div","attributes":{"class":"row justify-content-md-center"}},{"tag":"div","attributes":{"class":"container auth-container"}},{"tag":"app-login","attributes":{}},{"tag":"div","attributes":{"class":"container"}},{"tag":"app-root","attributes":{}}],"truncated":{"ancestors":true}},"truncated":{"excerpt":true}}
}
```

</details>

**Environment.**
- Target: local-ui
- Failing levels: ui
- Roles: User
- Commit: b1b64afd5d52fb0306a929f57ad1ec51df61d189
- Browser: 0.1.22
- Automations: none
