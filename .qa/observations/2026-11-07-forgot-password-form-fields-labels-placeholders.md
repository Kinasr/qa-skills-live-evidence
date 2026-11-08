---
type: observation
observed_at: 2026-11-07
url: http://localhost:4200/auth/forgot-password
app_version: "v6.0.0 | Built 2026-07-05 | Angular 20.0.5"
request: "the forgot-password form: its fields, labels, placeholders, buttons, links and any explanatory text"
---

## Steps

1. `playwright-cli -s=qa-scout-iuL1A9 open`
2. `playwright-cli -s=qa-scout-iuL1A9 state-load login-state.json`
3. `playwright-cli -s=qa-scout-iuL1A9 goto http://localhost:4200/auth/forgot-password`
4. `playwright-cli -s=qa-scout-iuL1A9 snapshot`
5. `playwright-cli -s=qa-scout-iuL1A9 close`

## Facts

1. The forgot-password page (http://localhost:4200/auth/forgot-password) has the browser title "Forgot Password - Practice Software Testing - Toolshop - v5.0".
2. The page shows a level-1 heading "Forgot Password".
3. The form has one field, a textbox labelled "Email address *" with the placeholder "Your email".
4. The form has one button, "Set New Password".
5. The form shows no explanatory text, no link to the login page and no other links or fields.
6. The header navigation shows the links Home and Contact, buttons Categories and "Select language" (EN), and a user menu button "Jack Howe".
7. A line above the header reads "View the Documentation for this application." and links to the project documentation site.
8. The banner shows the text "Practice Black Box Testing & Bug Hunting" and a "Testing Guide" button.
9. The footer shows the links GitHub repo, Privacy Policy (/privacy), Barn Images and Unsplash, and the text "v6.0.0 | Built 2026-07-05 | Angular 20.0.5".
10. The page also shows the buttons "Open chat" and "Show live shop activity".
11. The first snapshot, taken right after the page loaded, showed no form and no user menu. A later snapshot showed both.
