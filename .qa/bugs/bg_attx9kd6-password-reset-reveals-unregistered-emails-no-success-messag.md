---
type: bug
key: bg_attx9kd6
status: draft
case: tc_80qdetpy
feature: login
case_digest: f798e042e0199dd5
run: p9ct7fgm
commit: cac5bd7ef03e3c0e2b3baedfe9b1ee18f78bf6bc
drafted_at: 2026-11-08
route: no-automation-failed
target: local-ui
record: "executions/2026-11-08-p9ct7fgm.md"
---

# bg_attx9kd6: Password reset reveals unregistered emails: no success message and a 422, unlike a registered email

**Description.**
A registered email gets a success alert; an unregistered one gets no message and the API answers 422, so the page discloses which emails have accounts.

**Steps.**
- [checked] The visitor is not signed in and the password reset page is open
- [established] An email address that no account is registered under
- [established] A dedicated registered account, not the shared User or Admin account, whose password may be reset
1. Request a password reset for the registered email of the dedicated account and note the message shown
2. Request a password reset for the unregistered email address and note the message shown

**Expected.**
Both requests show the success message, and the message for the unregistered email is the same as the one for the registered email. Nothing in the answer reveals that the email is unregistered.

**Actual.**
Step 1, the registered email: the page showed an alert reading "page.forgot-password.confirm". Step 2, the unregistered email: no success alert appeared and the form stayed unchanged. The console logged a 422 (Unprocessable Content) from http://localhost:8091/users/forgot-password. So the unregistered email got no success message, and the 422 reveals that the email is unregistered. Both requests were meant to show the same success message, and this one did not.

**Evidence.**
Console error-level entry after step 2: "[ERROR] Failed to load resource: the server responded with a status of 422 (Unprocessable Content) @ http://localhost:8091/users/forgot-password". The console also had a warning, not counted here, about the missing translation for 'page.forgot-password.confirm'.
1. `- do goto /auth/login → ok`
2. `- do snapshot → ok`
3. `- do goto /auth/register → ok`
4. `- do snapshot → ok`
5. `- do fill f2e75 <typed> → ok`
6. `- do fill f2e79 <typed> → ok`
7. `- do fill f2e82 <typed> → ok`
8. `- do fill f2e91 <typed> → ok`
9. `- do fill f2e95 <typed> → ok`
10. `- do fill f2e98 <typed> → ok`
11. `- do fill f2e102 <typed> → ok`
12. `- do fill f2e106 <typed> → ok`
13. `- do fill f2e109 <typed> → ok`
14. `- do fill f2e112 <typed> → ok`
15. `- do fill f2e117 <typed> → ok`
16. `- do click f2e138 → ok`
17. `- do screenshot → ok`
18. `- do snapshot → ok`
19. `- do select f2e86 Albania → ok`
20. `- do click f2e138 → ok`
21. `- do goto /auth/forgot-password → ok`
22. `- do snapshot → ok`
23. `- do fill f4e73 <typed> → ok`
24. `- do click f4e75 → ok`
25. `- do fill f4e73 <typed> → ok`
26. `- do click f4e75 → ok`
27. `- do snapshot → ok`
28. `- do console → ok`

<details><summary>Element evidence</summary>


</details>

**Environment.**
- Target: local-ui
- Failing levels: ui
- Roles: none
- Commit: cac5bd7ef03e3c0e2b3baedfe9b1ee18f78bf6bc
- Browser: 0.1.22
- Automations: none
