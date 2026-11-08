import { account } from '../support/accounts';
import { expect, test } from '../support/fixtures';

test.describe('Sign in', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test(
    'tc_echzqdsm: a User signs in and lands on their account overview',
    { tag: '@smoke' },
    async ({ page, loginPage }) => {
      const user = account('User');

      await loginPage.signIn(user.email, user.password);

      await expect(page).toHaveURL(/\/account$/);
      await expect(page.getByTestId('page-title')).toHaveText('My account');
    },
  );

  test(
    'tc_vwq64t4m: an Admin signs in and lands on the admin dashboard',
    { tag: '@smoke' },
    async ({ page, loginPage }) => {
      const admin = account('Admin');

      await loginPage.signIn(admin.email, admin.password);

      await expect(page).toHaveURL(/\/admin\/dashboard$/);
    },
  );

  test('tc_mkefzd55: sign-in rejects a malformed email address with a message', async ({ page, loginPage }) => {
    await loginPage.signIn('customer@', 'Any-password-1');

    await expect(loginPage.emailError).toHaveText('Email format is invalid');
    await expect(page).toHaveURL(/\/auth\/login$/);
  });
});
