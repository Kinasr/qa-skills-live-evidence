import { expect, test } from '../support/fixtures';

test.describe('Sign out', () => {
  test('tc_d1xhm43c: a User signs out from the menu under their name and lands on the login page', async ({
    page,
    signInAs,
    navBar,
    loginPage,
  }) => {
    await signInAs('User');
    await page.goto('/account');

    await navBar.userMenu.click();
    await expect(navBar.signOut).toBeVisible();
    await navBar.signOut.click();

    await expect(page).toHaveURL(/\/auth\/login$/);
    await expect(loginPage.form).toBeVisible();
    await expect(navBar.userMenu).toBeHidden();
  });
});
