import { expect, test } from '../support/fixtures';

test.describe('Sign out (API)', () => {
  test('tc_amxer00w: signing out without a valid token is refused as unauthorised', async ({ usersApi }) => {
    await test.step('no token', async () => {
      expect((await usersApi.logout()).status()).toBe(401);
    });
    await test.step('made-up token', async () => {
      expect((await usersApi.logout('not.a.valid-token')).status()).toBe(401);
    });
  });

  test("tc_9v4sdn5v: signing out of one session ends only that session's token", async ({ usersApi, dedicatedUser }) => {
    const sessionA = await usersApi.token(dedicatedUser);
    const sessionB = await usersApi.token(dedicatedUser);

    expect((await usersApi.logout(sessionA)).status()).toBe(200);
    expect((await usersApi.logout(sessionA)).status()).toBe(401);
    expect((await usersApi.logout(sessionB)).status()).toBe(200);
  });
});
