import { unregisteredEmail } from '../support/accounts';
import { expect, test } from '../support/fixtures';

const RESET_PASSWORD = 'welcome02';

test.describe('Password reset', () => {
  test('tc_38cdgs0y: a reset request with no email, then a malformed one, is refused with a message', async ({
    forgotPasswordPage,
  }) => {
    await forgotPasswordPage.goto();

    await test.step('no email address', async () => {
      await forgotPasswordPage.request('');
      await expect(forgotPasswordPage.emailError).toHaveText('Email is required');
    });

    await test.step('malformed email address', async () => {
      await forgotPasswordPage.request('someone@');
      await expect(forgotPasswordPage.emailError).toBeVisible();
      await expect(forgotPasswordPage.emailError).not.toBeEmpty();
    });

    await expect(forgotPasswordPage.result).toBeHidden();
  });

  test('tc_8tqwxf5a: a reset shows success, the old password is refused, and welcome02 signs in', async ({
    page,
    forgotPasswordPage,
    loginPage,
    usersApi,
    dedicatedUser,
  }) => {
    // The "no email is sent" check needs a mailbox the fallback stack does not run; it is not automated here.
    const genericError = await (await usersApi.login(`${dedicatedUser.email}x`, 'Any-password-1')).json();

    await forgotPasswordPage.goto();
    await forgotPasswordPage.request(dedicatedUser.email);
    await expect(forgotPasswordPage.result).toHaveClass(/alert-success/);

    const oldPassword = await usersApi.login(dedicatedUser.email, dedicatedUser.password);
    expect(oldPassword.ok()).toBe(false);
    expect(await oldPassword.json()).toEqual(genericError);

    await loginPage.goto();
    await loginPage.signIn(dedicatedUser.email, RESET_PASSWORD);
    await expect(page).toHaveURL(/\/account$/);
  });

  test('tc_80qdetpy: an unregistered email gets the same success message as a registered one', async ({
    forgotPasswordPage,
    dedicatedUser,
  }) => {
    await forgotPasswordPage.goto();
    await forgotPasswordPage.request(dedicatedUser.email);
    await expect(forgotPasswordPage.result).toHaveClass(/alert-success/);
    const registeredMessage = await forgotPasswordPage.result.innerText();

    await forgotPasswordPage.goto();
    await forgotPasswordPage.request(unregisteredEmail());

    await expect(forgotPasswordPage.result).toHaveClass(/alert-success/);
    await expect(forgotPasswordPage.result).toHaveText(registeredMessage);
  });

  test('tc_enpmxy3k: a signed-in user can open the password reset page', async ({
    page,
    signInAs,
    forgotPasswordPage,
  }) => {
    await signInAs('User');

    await forgotPasswordPage.goto();

    await expect(page).toHaveURL(/\/auth\/forgot-password$/);
    await expect(forgotPasswordPage.form).toBeVisible();
    await expect(forgotPasswordPage.email).toBeVisible();
  });
});
