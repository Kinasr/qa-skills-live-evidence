---
type: train
key: codegen
pr: on-request
codegen_repeats: 3
codegen_attempts: 3
trained_stacks: [.]
approaches:
  - {approach: api, level: api, path: tests/api/**/*.spec.ts}
  - {approach: mocked-ui, level: ui, path: tests/ui/mocked/**/*.spec.ts}
  - {approach: full-ui, level: ui, path: tests/ui/journeys/**/*.spec.ts}
---

# Codegen

### cnv_spec-per-feature-by-approach: One spec file per Feature, named `<feature-key>.spec.ts`, in `tests/api/` for API, `tests/ui/mocked/` for mocked UI and `tests/ui/journeys/` for full UI.

```yaml
sources: [human:kinasr]
added: 2026-11-13
stack: .
facet: placement
refs: [tests/api, tests/ui]
```

The directory follows the approach, so an Automation's level resolves from its path.

```text
tests/api/login.spec.ts
tests/ui/mocked/login.spec.ts
tests/ui/journeys/login.spec.ts
```

### cnv_describe-per-rule: Each spec holds one top-level `test.describe` named for the Feature; each test is one Test Case, with no shared mutable state between tests.

```yaml
sources: [human:kinasr]
added: 2026-11-13
stack: .
facet: structure
```

Tests run fully parallel, so each must stand alone.

```ts
test.describe('login', () => {
  test('…', async ({ loginPage }) => { /* … */ });
});
```

### cnv_name-is-case-summary: The test title is the Test Case's summary in lowercase sentence form, never prefixed with a key or a level.

```yaml
sources: [human:kinasr]
added: 2026-11-13
stack: .
facet: test-naming
```

The key travels in the tag and the level in the path, so the title stays readable.

```ts
test('a registered user signs in with valid credentials', async () => {});
```

Wrong form:

```ts
test('TC-12 API: login ok', async () => {});
```

### cnv_key-as-tag: The Automation key is carried as a Playwright `tag` on the test; write the test unkeyed and let verify mint it.

```yaml
sources: [human:kinasr]
added: 2026-11-13
stack: .
facet: key-carrier
signal: {id: key-carrier, value: "tag on test", corpus: "0/0"}
```

Matches the project's `annotation_map`.

```ts
test('…', { tag: '@<key>' }, async () => {});
```

### cnv_page-objects-and-api-clients: UI tests act through the page objects in `tests/support/pages/` and API tests through the clients in `tests/support/api/`; a missing control or call is added there, never inlined in the spec.

```yaml
sources: [human:kinasr]
added: 2026-11-13
stack: .
facet: interaction-layer
refs: [tests/support/pages/login-page.ts, tests/support/api/users-api.ts]
```

Keeps page and endpoint knowledge in one place.

```ts
await loginPage.signIn(email, password);
const response = await usersApi.forgotPassword(email);
```

Wrong form:

```ts
await page.getByTestId('email').fill(email);
const response = await request.post('/users/forgot-password', { data: { email } });
```

### cnv_testid-first-locators: Locators are `readonly` fields on the page object, preferring `getByTestId`, then `getByRole`; never CSS or XPath chains in a spec.

```yaml
sources: [human:kinasr]
added: 2026-11-13
stack: .
facet: addressing
refs: [tests/support/pages/login-page.ts]
```

The config sets `testIdAttribute`, so test ids are the stable hook.

```ts
this.submit = page.getByTestId('login-submit');
```

Wrong form:

```ts
await page.locator('div > form button.btn').click();
```

### cnv_extended-test-fixtures: Take `test` from `tests/support/fixtures.ts` and get page objects, `usersApi`, `signInAs`, `mockApi` and `mockSignedIn` as fixtures; a test that changes an account's state, a failed sign-in included, uses `dedicatedUser`.

```yaml
sources: [human:kinasr]
added: 2026-11-13
stack: .
facet: fixtures
refs: [tests/support/fixtures.ts]
```

Shared accounts must not be mutated by parallel tests.

```ts
test('…', async ({ loginPage, dedicatedUser }) => {
  await loginPage.goto();
  await loginPage.signIn(dedicatedUser.email, 'wrong');
});
```

### cnv_generated-unique-data: Credentials come from `account(role)` and data the test creates is generated unique (`unregisteredEmail()`, `randomUUID`); never hard-code a shared account or a literal secret.

```yaml
sources: [human:kinasr]
added: 2026-11-13
stack: .
facet: test-data
refs: [tests/support/accounts.ts]
```

Secrets stay in env vars; unique data keeps parallel runs independent.

```ts
const email = unregisteredEmail();
```

Wrong form:

```ts
await loginPage.signIn('customer@example.com', 'welcome01');
```

### cnv_shared-helpers-in-support: A step more than one test needs becomes a method on its page object or client, or a fixture in `fixtures.ts`; never a helper function local to a spec.

```yaml
sources: [human:kinasr]
added: 2026-11-13
stack: .
facet: helpers
refs: [tests/support/fixtures.ts]
```

One home for reuse keeps specs thin.

```ts
async signOutFromUserMenu(): Promise<void> {
  await this.userMenu.click();
  await this.signOut.click();
}
```

Wrong form:

```ts
// in a spec file
async function signOut(page: Page) { /* … */ }
```

### cnv_web-first-waits-only: Rely on Playwright auto-waiting and web-first `expect`; never `waitForTimeout` or a manual polling loop.

```yaml
sources: [human:kinasr]
added: 2026-11-13
stack: .
facet: waits
```

Fixed sleeps are slow and flaky.

```ts
await expect(forgotPasswordPage.result).toBeVisible();
```

Wrong form:

```ts
await page.waitForTimeout(1000);
```

### cnv_web-first-expect: Assert with `expect` from `fixtures.ts`: web-first matchers on locators for UI, and the response status plus its body for API, with an explicit assertion per Expected sentence.

```yaml
sources: [human:kinasr]
added: 2026-11-13
stack: .
facet: assertions
```

Each Expected sentence must map to a line that fails when it is false.

```ts
await expect(loginPage.loginError).toHaveText(expectedText);
expect(response.status()).toBe(expectedStatus);
expect(await response.json()).toMatchObject(expectedBody);
```

### cnv_imports-from-support: Specs import `test` and `expect` from `tests/support/fixtures` only, never from `@playwright/test` directly; types use `import type`.

```yaml
sources: [human:kinasr]
added: 2026-11-13
stack: .
facet: imports
refs: [tests/support/fixtures.ts]
```

The extended `test` carries the project's fixtures.

```ts
import { test, expect } from '../support/fixtures';
```

Wrong form:

```ts
import { test, expect } from '@playwright/test';
```

### prc_full-ui-for-cross-rule-journeys: Pyramid threshold: allow full UI for cross-Rule journeys after considering API and mocked UI.

```yaml
sources: [human:kinasr]
added: 2026-11-13
```

API first and mocked UI next stay the order; a journey that spans several Rules may earn full UI.

### prc_extend-page-objects: Extend the existing page object when the page already has one; add a new page object only for a page that has none.

```yaml
sources: [human:kinasr]
added: 2026-11-13
```

Avoids two page objects describing the same page.
