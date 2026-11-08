import { test as base, request as playwrightRequest } from '@playwright/test';
import { API_URL } from '../../playwright.config';
import { account, type Credentials, type Role } from './accounts';
import { UsersApi } from './api/users-api';
import { ForgotPasswordPage } from './pages/forgot-password-page';
import { LoginPage } from './pages/login-page';
import { NavBar } from './pages/nav-bar';

interface Fixtures {
  usersApi: UsersApi;
  dedicatedUser: Credentials;
  /** Signs in through the API and stores the token where the UI reads it; later navigations see the session. */
  signInAs: (role: Role) => Promise<void>;
  loginPage: LoginPage;
  forgotPasswordPage: ForgotPasswordPage;
  navBar: NavBar;
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
});

export { expect } from '@playwright/test';
