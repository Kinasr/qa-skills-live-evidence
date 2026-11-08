import { expect, test } from '../support/fixtures';

test.describe('Login page', () => {
  test('tc_1z0vkyhm: the password is masked by default, the toggle shows and hides it, and both links lead to their pages', async ({
    page,
    loginPage,
  }) => {
    await loginPage.goto();
    await loginPage.password.fill('Typed-secret-1');

    await expect(loginPage.password).toHaveAttribute('type', 'password');
    await loginPage.togglePasswordVisibility.click();
    await expect(loginPage.password).toHaveAttribute('type', 'text');
    await expect(loginPage.password).toHaveValue('Typed-secret-1');
    await loginPage.togglePasswordVisibility.click();
    await expect(loginPage.password).toHaveAttribute('type', 'password');

    await loginPage.registerLink.click();
    await expect(page).toHaveURL(/\/auth\/register$/);

    await page.goBack();
    await loginPage.forgotPasswordLink.click();
    await expect(page).toHaveURL(/\/auth\/forgot-password$/);
    await expect(page.getByTestId('forgot-password-form')).toBeVisible();
  });

  test('tc_37z32vw9: a signed-in User who visits the login page still sees the login form', async ({
    page,
    signInAs,
    loginPage,
  }) => {
    await signInAs('User');

    await loginPage.goto();

    await expect(page).toHaveURL(/\/auth\/login$/);
    await expect(loginPage.form).toBeVisible();
    await expect(loginPage.email).toBeVisible();
    await expect(loginPage.password).toBeVisible();
  });
});
