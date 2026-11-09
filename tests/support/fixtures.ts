import { test as base, request as playwrightRequest } from '@playwright/test';
import { API_URL } from '../../playwright.config';
import { account, type Credentials, type Role } from './accounts';
import { UsersApi } from './api/users-api';
import { ForgotPasswordPage } from './pages/forgot-password-page';
import { LoginPage } from './pages/login-page';
import { NavBar } from './pages/nav-bar';
import { AccountPage } from './pages/account-page';

/** A mocked API answer, keyed in `mockApi` by 'METHOD /path'. */
export interface MockResponse {
  status: number;
  json?: unknown;
}

interface Fixtures {
  usersApi: UsersApi;
  dedicatedUser: Credentials;
  /** Signs in through the API and stores the token where the UI reads it; later navigations see the session. */
  signInAs: (role: Role) => Promise<void>;
  loginPage: LoginPage;
  forgotPasswordPage: ForgotPasswordPage;
  navBar: NavBar;
  accountPage: AccountPage;
  /** Routes every request to the API origin: declared ones are fulfilled, the rest aborted. */
  mockApi: (routes: Record<string, MockResponse>) => Promise<void>;
  /** Stores a placeholder token where the UI reads it, without signing in. */
  mockSignedIn: (role: Role) => Promise<void>;
}

export const test = base.extend<Fixtures>({
  usersApi: async ({}, use) => {
    // Its own context, so UI tests can reach the API whatever their baseURL.
    const context = await playwrightRequest.newContext({
      baseURL: API_URL,
      extraHTTPHeaders: { Accept: 'application/json' },
    });
    await use(new UsersApi(context));
    await context.dispose();
  },

  dedicatedUser: async ({ usersApi }, use) => {
    await use(await usersApi.registerDedicatedUser());
  },

  signInAs: async ({ page, usersApi }, use) => {
    await use(async (role) => {
      const token = await usersApi.token(account(role));
      // Set once rather than via addInitScript, so a sign-out followed by a reload stays signed out.
      await page.goto('/');
      await page.evaluate((value) => window.localStorage.setItem('auth-token', value), token);
    });
  },

  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  forgotPasswordPage: async ({ page }, use) => use(new ForgotPasswordPage(page)),
  navBar: async ({ page }, use) => use(new NavBar(page)),
  accountPage: async ({ page }, use) => use(new AccountPage(page)),

  mockApi: async ({ page }, use) => {
    await use(async (routes) => {
      await page.route(`${API_URL}/**`, async (route) => {
        const request = route.request();
        const answer = routes[`${request.method()} ${new URL(request.url()).pathname}`];
        if (answer === undefined) return route.abort();
        return route.fulfill({ status: answer.status, json: answer.json ?? {} });
      });
    });
  },

  mockSignedIn: async ({ page }, use) => {
    await use(async (role) => {
      const payload = Buffer.from(JSON.stringify({ role: role.toLowerCase(), exp: 4102444800 })).toString('base64url');
      await page.goto('/');
      await page.evaluate((value) => window.localStorage.setItem('auth-token', value), `placeholder.${payload}.placeholder`);
    });
  },
});

export { expect } from '@playwright/test';
