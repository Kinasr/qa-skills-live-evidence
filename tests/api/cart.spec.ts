import { test, expect } from '../support/fixtures';

test.describe('cart', () => {
  test("adding a product already in the cart increases that line's quantity by the added quantity without creating a second line", { tag: "@aut_kbz1m8" }, async ({ cartsApi, productsApi }) => {
    const product = await productsApi.firstWhere(true);
    expect(product.in_stock).toBe(true);
    const cartId = await cartsApi.createCart();
    const first = await cartsApi.addItem(cartId, product.id, 2);
    expect(first.ok(), await first.text()).toBe(true);
    expect(await cartsApi.lines(cartId)).toEqual([expect.objectContaining({ product_id: product.id, quantity: 2 })]);

    const again = await cartsApi.addItem(cartId, product.id, 3);
    expect(again.ok(), await again.text()).toBe(true);

    const merged = await cartsApi.lines(cartId);
    const productLines = merged.filter((line) => line.product_id === product.id);
    expect(productLines).toHaveLength(1);
    expect(productLines[0].quantity).toBe(5);
    expect(merged).toHaveLength(1);
  });

  test('a signed-in user adds a product, changes its quantity and removes it', { tag: '@aut_714tas' }, async ({ usersApi, cartsApi, productsApi, dedicatedUser }) => {
    const signIn = await usersApi.login(dedicatedUser.email, dedicatedUser.password);
    expect(signIn.status()).toBe(200);
    const { access_token: token } = (await signIn.json()) as { access_token: string };
    expect(token).toBeTruthy();
    const product = await productsApi.firstWhere(true);
    expect(product.in_stock).toBe(true);
    const cartId = await cartsApi.createCart(token);

    const added = await cartsApi.addItem(cartId, product.id, 2, token);
    expect(added.ok(), await added.text()).toBe(true);
    const afterAdd = await cartsApi.lines(cartId, token);
    expect(afterAdd).toEqual([expect.objectContaining({ product_id: product.id, quantity: 2 })]);

    const changed = await cartsApi.updateQuantity(cartId, product.id, 3, token);
    expect(changed.ok(), await changed.text()).toBe(true);
    const afterChange = await cartsApi.lines(cartId, token);
    expect(afterChange).toEqual([expect.objectContaining({ product_id: product.id, quantity: 3 })]);

    const removal = await cartsApi.removeItem(cartId, product.id, token);
    expect(removal.ok(), await removal.text()).toBe(true);
    const remainingLines = await cartsApi.lines(cartId, token);
    expect(remainingLines).toEqual([]);
  });

  test('a signed-out visitor adds a product, changes its quantity and removes it', { tag: '@aut_4fn721' }, async ({ cartsApi, productsApi }) => {
    // Signed out: no token is passed to any cart call.
    const product = await productsApi.firstWhere(true);
    expect(product.in_stock).toBe(true);
    const cartId = await cartsApi.createCart();

    const added = await cartsApi.addItem(cartId, product.id, 2);
    expect(added.ok(), await added.text()).toBe(true);
    const afterAdd = await cartsApi.lines(cartId);
    expect(afterAdd).toEqual([expect.objectContaining({ product_id: product.id, quantity: 2 })]);

    const changed = await cartsApi.updateQuantity(cartId, product.id, 3);
    expect(changed.ok(), await changed.text()).toBe(true);
    const afterChange = await cartsApi.lines(cartId);
    expect(afterChange).toEqual([expect.objectContaining({ product_id: product.id, quantity: 3 })]);

    const removed = await cartsApi.removeItem(cartId, product.id);
    expect(removed.ok(), await removed.text()).toBe(true);
    const afterRemove = await cartsApi.lines(cartId);
    expect(afterRemove).toEqual([]);
  });
});
