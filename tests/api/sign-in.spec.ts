import { account, unregisteredEmail } from '../support/accounts';
import type { LoginBody } from '../support/api/users-api';
import { expect, test } from '../support/fixtures';

test.describe('Sign in (API)', () => {
  test('tc_kkvq91bq: sign-in is refused when the email address or the password is missing', async ({ usersApi }) => {
    const user = account('User');
    const submissions = [
      { name: 'empty email', email: '', password: user.password },
      { name: 'empty password', email: user.email, password: '' },
      { name: 'both empty', email: '', password: '' },
    ];

    for (const { name, email, password } of submissions) {
      await test.step(name, async () => {
        const response = await usersApi.login(email, password);
        expect(response.ok()).toBe(false);
        expect(await response.json()).not.toHaveProperty('access_token');
      });
    }
  });

  test('tc_8y3scbfb: a wrong password and an unknown email get the same generic error', async ({ usersApi }) => {
    const user = account('User');

    const wrongPassword = await usersApi.login(user.email, `${user.password}-wrong`);
    const unknownEmail = await usersApi.login(unregisteredEmail(), 'Any-password-1');

    expect(wrongPassword.ok()).toBe(false);
    expect(unknownEmail.ok()).toBe(false);
    expect(await wrongPassword.json()).not.toHaveProperty('access_token');
    expect(unknownEmail.status()).toBe(wrongPassword.status());
    expect(await unknownEmail.json()).toEqual(await wrongPassword.json());
  });

  test('tc_n21hzm2b: a successful sign-in response carries an access token, its type Bearer and its lifetime', async ({ usersApi }) => {
    const user = account('User');

    const response = await usersApi.login(user.email, user.password);

    expect(response.status()).toBe(200);
    const body = (await response.json()) as LoginBody;
    expect(body.access_token).toEqual(expect.any(String));
    expect(body.access_token).not.toBe('');
    // OAuth token types are case-insensitive (RFC 6749 §7.1); the API answers "bearer".
    expect(body.token_type.toLowerCase()).toBe('bearer');
    expect(body.expires_in).toEqual(expect.any(Number));
  });
});
