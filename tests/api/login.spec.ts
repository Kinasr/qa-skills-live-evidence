import { account } from '../support/accounts';
import { unregisteredEmail } from '../support/accounts';
import type { LoginBody } from '../support/api/users-api';
import { expect, test } from '../support/fixtures';

test.describe('Login', () => {
  test('tc_38cdgs0y: requesting a password reset with no email address, then with a malformed one, is refused with a message', { tag: '@aut_434y82' }, async ({ usersApi }) => {
    const variants = [
      { name: 'no email address', email: '' },
      { name: 'malformed email address', email: 'not-an-email@' },
    ];
    for (const variant of variants) {
      await test.step(variant.name, async () => {
        const response = await usersApi.forgotPassword(variant.email);
        expect(response.ok()).toBe(false);
        expect(await response.text()).toMatch(/email/i);
      });
    }
  });

  test('tc_9v4sdn5v: after one of a user\'s two sessions signs out, that session\'s token is no longer accepted while the other session stays signed in', { tag: '@aut_v0v7t4' }, async ({ usersApi, dedicatedUser }) => {
    const sessionA = await usersApi.token(dedicatedUser);
    const sessionB = await usersApi.token(dedicatedUser);
    const signOutA = await usersApi.logout(sessionA);
    expect(signOutA.status()).toBe(200);
    const repeatedSignOutA = await usersApi.logout(sessionA);
    expect(repeatedSignOutA.status()).toBe(401);
    const signOutB = await usersApi.logout(sessionB);
    expect(signOutB.status()).toBe(200);
  });

  test('tc_amxer00w: signing out without a valid token is refused as unauthorised, whether the token is missing or invalid', { tag: '@aut_gyg8d1' }, async ({ usersApi }) => {
    const variants = [
      { name: 'no token', presented: undefined },
      { name: 'made-up token', presented: 'made-up' },
    ];
    for (const variant of variants) {
      await test.step(variant.name, async () => {
        const response = await usersApi.logout(variant.presented);
        expect(response.status()).toBe(401);
        expect(response.ok()).toBe(false);
      });
    }
  });

  test('tc_8y3scbfb: a wrong password and an unknown email get the same generic error', { tag: '@aut_h6179m' }, async ({ usersApi }) => {
    const user = account('User');
    const wrongPassword = await usersApi.login(user.email, 'Wrong-password-1');
    const unknownEmail = await usersApi.login(unregisteredEmail(), 'Any-password-1');
    expect(wrongPassword.status()).toBe(401);
    expect(unknownEmail.status()).toBe(401);
    const wrongPasswordBody = (await wrongPassword.json()) as Partial<LoginBody>;
    const unknownEmailBody = (await unknownEmail.json()) as Partial<LoginBody>;
    expect(wrongPasswordBody.access_token).toBeUndefined();
    expect(unknownEmailBody.access_token).toBeUndefined();
    expect(unknownEmailBody).toEqual(wrongPasswordBody);
  });

  test('tc_kkvq91bq: sign-in is refused when the email address or the password is missing', { tag: '@aut_0t1d34' }, async ({ usersApi }) => {
    const user = account('User');
    const variants = [
      { name: 'empty email address', email: '', password: user.password },
      { name: 'empty password', email: user.email, password: '' },
      { name: 'both empty', email: '', password: '' },
    ];
    for (const variant of variants) {
      await test.step(variant.name, async () => {
        const response = await usersApi.login(variant.email, variant.password);
        expect(response.ok()).toBe(false);
        const body = (await response.json()) as Partial<LoginBody>;
        expect(body.access_token).toBeUndefined();
      });
    }
  });
});
