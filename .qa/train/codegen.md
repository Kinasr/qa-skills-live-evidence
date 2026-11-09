---
type: train
key: codegen
pr: on-request
trained_stacks: [.]
codegen_repeats: 3
codegen_attempts: 3
approaches:
  - {approach: api, level: api, path: tests/api/*.spec.ts}
  - {approach: full-ui, level: ui, path: tests/ui/*.spec.ts}
  - {approach: mocked-ui, level: ui, path: tests/ui/mocked/*.spec.ts}
---

# Codegen

### cnv_placement-by-level: API-level tests live in `tests/api/<area>.spec.ts`, full UI tests in `tests/ui/<area>.spec.ts` and mocked UI tests in `tests/ui/mocked/<area>.spec.ts`, added to the existing file for that area when one exists.

```yaml
sources: [human:kinasr]
added: 2026-11-09
stack: .
facet: placement
refs: [tests/api, tests/ui]
```

The runner config gives each level its own project and test directory, so the directory decides the level; mocked UI sits under the UI project's directory so that project runs it.

```text
tests/api/<area>.spec.ts
tests/ui/<area>.spec.ts
tests/ui/mocked/<area>.spec.ts
```

### cnv_describe-per-file: Each spec file holds one `test.describe('<Area>')` block, and a case's data variants are `test.step`s inside its one test rather than separate tests.

```yaml
sources: [human:kinasr]
added: 2026-11-09
stack: .
facet: structure
```

One describe per area keeps the file the unit of placement; steps keep one case per Automation.

```ts
test.describe('<Area>', () => {
  test('<case key>: <summary>', async ({ client }) => {
    for (const variant of variants) {
      await test.step(variant.name, async () => { /* ... */ });
    }
  });
});
```

### cnv_title-case-key-summary: A test title is the case key, a colon, then the case summary starting with a lower-case word.

```yaml
sources: [human:kinasr]
added: 2026-11-09
stack: .
facet: test-naming
```

The key in the title lets a reader find the case from a report line.

```ts
test('tc_xxxxxxxx: <summary in lower case>', async () => { /* ... */ });
```

### cnv_key-as-playwright-tag: The Automation key is carried as a Playwright tag in the test's details object, next to the case's other tags.

```yaml
sources: [human:kinasr]
added: 2026-11-09
stack: .
facet: key-carrier
```

The project's annotation map names the tag as the Automation key carrier.

```ts
test('<case key>: <summary>', { tag: ['@smoke', '@<automation-key>'] }, async () => { /* ... */ });
```

### cnv_page-objects-and-clients: Specs interact only through page objects under `tests/support/pages` and API clients under `tests/support/api`; a missing locator or call is added to that class, never written inline in a spec.

```yaml
sources: [code:tests/support/pages/login-page.ts#L16@1342ea4, human:kinasr]
added: 2026-11-09
stack: .
facet: interaction-layer
refs: [tests/support/pages, tests/support/api]
```

One place per screen or endpoint group keeps locators and requests reusable.

```ts
await somePage.goto();
await somePage.someField.fill(value);
```

### cnv_testid-then-role: Locators use `getByTestId` on the `data-test` attribute, falling back to `getByRole` scoped inside a test-id container; never CSS or XPath selectors.

```yaml
sources: [code:playwright.config.ts#L15@1342ea4, code:tests/support/pages/login-page.ts#L19@1342ea4, human:kinasr]
added: 2026-11-09
stack: .
facet: addressing
```

The runner config sets `testIdAttribute: 'data-test'`.

```ts
this.form = page.getByTestId('<form-id>');
this.result = this.form.getByRole('alert');
```

Wrong form:

```ts
this.submit = page.locator('form > button.btn-primary');
```

### cnv_shared-fixtures: Specs take `test` and `expect` from `tests/support/fixtures.ts`, new page objects and clients are registered there as fixtures, sessions come from `signInAs(role)` and state-changing tests use the `dedicatedUser` fixture.

```yaml
sources: [code:tests/support/fixtures.ts#L34@1342ea4, code:tests/support/fixtures.ts#L30@1342ea4, human:kinasr]
added: 2026-11-09
stack: .
facet: fixtures
refs: [tests/support/fixtures.ts]
```

UI state is prepared through the API by the fixture, so a UI test drives only the behaviour it checks.

```ts
test('<case key>: <summary>', async ({ signInAs, somePage }) => {
  await signInAs('User');
  await somePage.goto();
});
```

### cnv_mocked-api-routes: A mocked UI test gets its API answers from a `mockApi` fixture in `tests/support/fixtures.ts` that routes every request to the API origin through `page.route`, fulfilling the ones the test declares and aborting the rest, so it never reaches the live API.

```yaml
sources: [human:kinasr]
added: 2026-11-09
stack: .
facet: fixtures
refs: [tests/support/fixtures.ts]
```

Aborting undeclared calls keeps a mocked test from silently depending on the live API.

```ts
test('<case key>: <summary>', async ({ mockApi, somePage }) => {
  await mockApi({ 'GET /some/path': { status: 200, json: { field: 'value' } } });
  await somePage.goto();
});
```

### cnv_mocked-session: A mocked UI test that needs a signed-in user stores a placeholder token where the UI reads it, through a fixture, and never signs in for real.

```yaml
sources: [human:kinasr]
added: 2026-11-09
stack: .
facet: fixtures
refs: [tests/support/fixtures.ts]
```

The session is test state, not the behaviour under test; the API answers that depend on it are mocked.

```ts
test('<case key>: <summary>', async ({ mockSignedIn, somePage }) => {
  await mockSignedIn('User');
  await somePage.goto();
});
```

Wrong form:

```ts
await signInAs('User'); // a real API sign-in inside a mocked UI test
```

### cnv_mocked-bodies-minimal: A mocked response body holds only the fields the page needs to render or the test asserts, with values taken from the case's prose or a Passed Execution's evidence.

```yaml
sources: [human:kinasr]
added: 2026-11-09
stack: .
facet: test-data
```

Minimal bodies keep the stub honest about what the test depends on.

```ts
await mockApi({ 'GET /some/path': { status: 200, json: { name: 'Value from the case' } } });
```

### cnv_accounts-module-data: Role accounts come from `account(role)`, which reads env vars, and unknown emails from `unregisteredEmail()`; invalid inputs stay inline as literals and no credential is ever written as a literal.

```yaml
sources: [code:tests/support/accounts.ts#L14@1342ea4, code:tests/support/accounts.ts#L20@1342ea4, human:kinasr]
added: 2026-11-09
stack: .
facet: test-data
refs: [tests/support/accounts.ts]
```

Credentials stay in the environment; generated values keep tests independent.

```ts
const user = account('User');
const response = await client.login(unregisteredEmail(), 'Any-password-1');
```

Wrong form:

```ts
await client.login('someone@example.com', 'TheirRealPassword');
```

### cnv_multistep-as-methods: An action of several steps is a method on its page object or API client; spec files define no helper functions of their own.

```yaml
sources: [code:tests/support/pages/nav-bar.ts#L12@1342ea4, code:tests/support/pages/login-page.ts#L32@1342ea4, human:kinasr]
added: 2026-11-09
stack: .
facet: helpers
refs: [tests/support/pages]
```

Methods sit next to the locators they use.

```ts
async signIn(email: string, password: string): Promise<void> {
  await this.email.fill(email);
  await this.password.fill(password);
  await this.submit.click();
}
```

### cnv_auto-wait-only: Tests rely on Playwright auto-waiting and web-first assertions; never a fixed sleep.

```yaml
sources: [human:kinasr]
added: 2026-11-09
stack: .
facet: waits
```

Web-first assertions retry until their timeout, so no explicit wait is needed.

```ts
await expect(somePage.result).toBeVisible();
```

Wrong form:

```ts
await page.waitForTimeout(2000);
```

### cnv_web-first-and-exact-status: UI checks use `await expect(locator)` or `await expect(page).toHaveURL` with a `$`-anchored regex; API checks assert the exact `status()` or `ok()` and read bodies through a typed interface.

```yaml
sources: [human:kinasr]
added: 2026-11-09
stack: .
facet: assertions
```

Anchored URLs and exact statuses keep a check from passing on a neighbouring outcome.

```ts
await expect(page).toHaveURL(/\/some\/path$/);
expect(response.status()).toBe(401);
const body = (await response.json()) as SomeBody;
```

### cnv_relative-support-imports: Specs import from `../support/...` with relative paths and `import type` for types, and never import `@playwright/test` directly.

```yaml
sources: [human:kinasr]
added: 2026-11-09
stack: .
facet: imports
```

The fixtures module re-exports `test` and `expect`.

```ts
import type { SomeBody } from '../support/api/some-api';
import { expect, test } from '../support/fixtures';
```

Wrong form:

```ts
import { expect, test } from '@playwright/test';
```
