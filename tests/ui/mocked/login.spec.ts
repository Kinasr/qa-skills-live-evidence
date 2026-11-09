import { expect, test } from '../../support/fixtures';

test.describe('Login', () => {
  test('tc_37z32vw9: a signed-in User who visits the login page still sees the login form', { tag: '@aut_ftgt8x' }, async ({ mockApi, mockSignedIn, loginPage, page }) => {
    await mockApi({ 'GET /users/me': { status: 200, json: { first_name: 'Jane', last_name: 'Doe' } } });
    await mockSignedIn('User');
    await loginPage.goto();
    await expect(loginPage.form).toBeVisible();
    await expect(loginPage.email).toBeVisible();
    await expect(loginPage.password).toBeVisible();
    await expect(page).toHaveURL(/\/auth\/login$/);
  });

  test('tc_1z0vkyhm: on the login page the password is masked by default, the show/hide control toggles it between visible and masked, and the registration and password reset links lead to their pages', { tag: '@aut_yrzcdm' }, async ({ mockApi, loginPage, page }) => {
    await mockApi({});
    await loginPage.goto();
    await loginPage.password.fill('Any-password-1');
    await expect(loginPage.password).toHaveAttribute('type', 'password');
    await loginPage.togglePasswordVisibility.click();
    await expect(loginPage.password).toHaveAttribute('type', 'text');
    await expect(loginPage.password).toHaveValue('Any-password-1');
    await loginPage.togglePasswordVisibility.click();
    await expect(loginPage.password).toHaveAttribute('type', 'password');
    await loginPage.registerLink.click();
    await expect(page).toHaveURL(/\/auth\/register$/);
    await loginPage.goto();
    await loginPage.forgotPasswordLink.click();
    await expect(page).toHaveURL(/\/auth\/forgot-password$/);
  });

  test('tc_enpmxy3k: a signed-in user can open the password reset page', { tag: '@aut_e7yhjy' }, async ({ mockApi, mockSignedIn, forgotPasswordPage, page }) => {
    await mockApi({ 'GET /users/me': { status: 200, json: { first_name: 'Jane', last_name: 'Doe' } } });
    await mockSignedIn('User');
    await forgotPasswordPage.goto();
    await expect(forgotPasswordPage.form).toBeVisible();
    await expect(forgotPasswordPage.email).toBeVisible();
    await expect(page).toHaveURL(/\/auth\/forgot-password$/);
  });

  test('tc_d1xhm43c: a signed-in user signs out from the menu under their name and lands on the login page', { tag: '@aut_t434ff' }, async ({ mockApi, mockSignedIn, accountPage, navBar, page }) => {
    await mockApi({
      'GET /users/me': { status: 200, json: { first_name: 'Jane', last_name: 'Doe' } },
      'GET /users/logout': { status: 200 },
    });
    await mockSignedIn('User');
    await accountPage.goto();
    await expect(navBar.userMenu).toContainText('Jane Doe');
    await navBar.userMenu.click();
    await expect(navBar.signOut).toBeVisible();
    await navBar.signOut.click();
    await expect(page).toHaveURL(/\/auth\/login$/);
  });
});
