---
type: feature
key: login
suite_key: su_1wkw5maw
coverage_digest: 1527be0d836c2dda
generated: {by: human:kinasr, at: 2026-11-08}
sources: [file:.qa/observations/2026-11-07-login-form-fields-labels-validation-error-messages.md, file:.qa/observations/2026-11-07-forgot-password-form-fields-labels-placeholders.md, file:.qa/observations/2026-11-07-entries-signed-user-menu-navigation-bar-including.md, url:http://localhost:8091/docs?api-docs.json, human:kinasr]
---

# Login

How a Toolshop user gets into and out of their account: signing in with an email address and
password, requesting a password reset, and signing out, together with the login page's password
show/hide control, its links to registration and password reset, and what a signed-in user sees on
the login page.

It comes from three Observations of the self-hosted Toolshop (the login page, the forgot-password
page and the signed-in account page), the Toolshop API's OpenAPI contract (`POST /users/login`,
`POST /users/forgot-password`, `GET /users/logout`), and behaviour settled with kinasr. Registration,
changing a password, TOTP setup and the account page belong elsewhere; token refresh and TOTP
sign-in are left for a later run.

## Rules

1. **rule_mbsv**: A registered user who submits their correct email and password is signed in.

2. **rule_w48w**: After signing in, a User lands on their account overview ("My account").

3. **rule_fzyk**: After signing in, an Admin lands on the admin dashboard.

4. **rule_das7**: Sign-in requires both an email address and a password.

5. **rule_etgj**: Sign-in rejects a malformed email address with a message.

6. **rule_4c8m**: A wrong password and an unknown email get the same generic error, so sign-in never reveals which emails are registered.

7. **rule_ccj1**: A successful sign-in returns an access token, its type (Bearer) and its lifetime.

   This Rule is about the API contract itself: the `access_token`, `token_type` and `expires_in`
   fields of the `POST /users/login` response.

8. **rule_7z2b**: Requesting a password reset requires an email address.

9. **rule_gp4k**: Requesting a password reset rejects a malformed email address with a message.

10. **rule_r84e**: Requesting a password reset for a registered email sets that account's password to `welcome02`, so the old password no longer signs in.

11. **rule_15wq**: After requesting a password reset, the user is shown a success message.

12. **rule_vhta**: Requesting a password reset sends no email.

13. **rule_k2tk**: Requesting a password reset for an unregistered email shows the same success message as for a registered one.

14. **rule_kg1z**: A signed-in user can open the password reset page.

15. **rule_b558**: A signed-in user can sign out from the menu under their name.

16. **rule_ej7w**: After signing out, the user lands on the login page.

17. **rule_5zdm**: Signing out without a valid token is refused as unauthorised.

18. **rule_pmxr**: After signing out, the token used to sign out is no longer accepted.

19. **rule_fvmj**: Signing out ends only the current session; the user's other sessions stay signed in.

20. **rule_f2an**: The password is masked by default on the login page.

21. **rule_4mm1**: The login page's show/hide control switches the password between masked and visible.

22. **rule_9gc6**: The login page offers a link to register an account.

23. **rule_j405**: The login page offers a link to reset a forgotten password.

24. **rule_pq5a**: A signed-in user who visits the login page still sees the login form.

## Boundaries

1. **boundary_rrdh**: Registering a new account is not part of this Feature; only the login page's link to registration is.
   Owner: none

2. **boundary_0wx9**: Changing a password from the account (current password to new password) is not part of this Feature.
   Owner: none

3. **boundary_wjp7**: Setting up TOTP for an account is not part of this Feature.
   Owner: none

4. **boundary_pbft**: The signed-in user's profile and account page is not part of this Feature; only landing on it after sign-in is.
   Owner: none

## Coverage

- happy-path: covered by rule_mbsv, rule_r84e, rule_15wq, rule_b558, rule_ej7w, rule_f2an, rule_4mm1, rule_9gc6, rule_j405
- variations: covered by rule_w48w, rule_fzyk, rule_k2tk; n/a for sign out: there is no other way to sign out; n/a for show or hide the password, go to registration or password reset from the login page, visit the login page while signed in: each is a single UI affordance
- results: covered by rule_ccj1; n/a for request a password reset: nothing is returned beyond the success message; n/a for sign out: the logout message is not required behaviour; n/a for show or hide the password, go to registration or password reset from the login page, visit the login page while signed in: nothing is returned
- permissions: covered by rule_4c8m, rule_k2tk, rule_kg1z, rule_5zdm, rule_pq5a; n/a for show or hide the password, go to registration or password reset from the login page: open to every visitor of the login page
- input-validation: covered by rule_das7, rule_etgj, rule_4c8m, rule_7z2b, rule_gp4k; n/a for sign out, show or hide the password, go to registration or password reset from the login page, visit the login page while signed in: they take no input
- limits: n/a: no length or size limit on the email or password is required for sign in, password reset or sign out, and the other functionalities take no input
- state: awaiting
- failures: awaiting
- concurrency: covered by rule_fvmj; n/a for sign in: signing in from two browsers is settled by rule_fvmj, other sessions stay signed in; n/a for request a password reset, show or hide the password, go to registration or password reset from the login page, visit the login page while signed in: no overlapping actions to consider
- side-effects: covered by rule_vhta; n/a for sign in: no notification or audit record is required; n/a for sign out: signing out has no side effects; n/a for show or hide the password, go to registration or password reset from the login page, visit the login page while signed in: no effects beyond the page

## Deferred

- **Refresh an access token**: token refresh, left for a later run. From: url:http://localhost:8091/docs?api-docs.json, GET /users/refresh
- **Complete sign-in with a TOTP code**: TOTP sign-in, left for a later run. From: url:http://localhost:8091/docs?api-docs.json, POST /totp/verify

## Open questions

1. [state] **How many failed sign-ins lock an account, and how is it unlocked?**: the References are silent on lockout; kinasr parked it.
2. [state] **What is the access token's lifetime, and does the session end when it expires?**: the contract's `expires_in` example is 120 but states no requirement; kinasr parked it.
3. [failures] **What does the user see when sign-in, password reset or sign-out fails because the API is unavailable?**: no Reference describes it; kinasr parked it.
