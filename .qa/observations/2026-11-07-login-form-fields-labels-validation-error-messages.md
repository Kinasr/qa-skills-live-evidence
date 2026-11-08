---
type: observation
observed_at: 2026-11-07
url: http://localhost:4200/auth/login
app_version: "v6.0.0"
request: "the login form: its fields, labels, validation and error messages, the links to forgot-password and register, any social or alternative sign-in options, and where a signed-in user lands"
---

## Steps

1. `playwright-cli -s=qa-scout-CvANrQ open`
2. `playwright-cli -s=qa-scout-CvANrQ state-load login-state.json`
3. `playwright-cli -s=qa-scout-CvANrQ goto http://localhost:4200/auth/login`
4. `playwright-cli -s=qa-scout-CvANrQ snapshot`
5. `playwright-cli -s=qa-scout-CvANrQ console`
6. `playwright-cli -s=qa-scout-CvANrQ goto http://localhost:4200/account`
7. `playwright-cli -s=qa-scout-CvANrQ snapshot`
8. `playwright-cli -s=qa-scout-CvANrQ close`

## Facts

1. The footer on every page seen shows "v6.0.0 | Built 2026-07-05 | Angular 20.0.5".
2. On http://localhost:4200/auth/login the page title is "Login - Practice Software Testing - Toolshop - v5.0".
3. The login page has the heading "Login" (level 3).
4. The login page has a text field labelled "Email address *" with the placeholder "Your email".
5. The login page has a text field labelled "Password *" with the placeholder "Your password", and an unlabelled button beside it (presumably the show/hide toggle).
6. The login page has a "Login" button, shown enabled.
7. The login page shows the text "Not yet an account?" followed by a link "Register your account" to /auth/register.
8. The login page has a link "Forgot your Password?" to /auth/forgot-password.
9. The login page shows no social or alternative sign-in option.
10. With the saved login state loaded, the navigation bar on the login page shows a "Jack Howe" menu button, and the login page still renders its form at /auth/login.
11. The navigation bar shows "Home" (link to /), "Categories" (button), "Contact" (link to /contact), "Jack Howe" (button) and a language button "EN".
12. Going to http://localhost:4200/account with the saved state shows the page titled "Overview - Practice Software Testing - Toolshop - v5.0" with the heading "My account" and the text "Here you can manage your profile, favorites and orders.", followed by four unlabelled buttons.
13. The console on the login page shows 0 errors, a warning about a preloaded image (barn-2400x1600.avif) not used, and a verbose notice that input elements should have autocomplete attributes (suggested "current-password").

## Not seen

1. The validation and error messages of the login form: they appear only after typing into or focusing the fields and submitting, which the read-only rule forbids.
2. Where a user lands right after submitting the login form: it needs a fill and a click on Login, which the rules forbid.
