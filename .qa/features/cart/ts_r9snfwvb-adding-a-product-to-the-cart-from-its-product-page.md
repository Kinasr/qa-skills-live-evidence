---
type: scenario
key: ts_r9snfwvb
feature: cart
generated: {by: script:qa-design, at: 2026-11-13}
---

# ts_r9snfwvb: Adding a product to the cart from its product page

### tc_d68h3nc7: Adding a product from its product page with a chosen quantity puts it in the cart at that quantity and shows a confirmation message

```yaml
key: tc_d68h3nc7
automatable: true
covers: [rule_0qkc, rule_cf41]
review: {by: human:kinasr, at: 2026-11-13, commit: 390c6440d4ef9b3d5dc5f796db6da87b17e36f7b, digest: b3dff40ba0f2f720}
generated: {by: delegate:sonnet, at: 2026-11-13}
```

**Preconditions.**

- An empty cart in the current browser session
- An in-stock product with a product page

**Steps.**

1. Open the product page of the in-stock product.
2. Choose a quantity of 2.
3. Add the product to the cart.
4. Open the cart.

**Expected result.**

A confirmation message is shown when the product is added (its wording is not checked). The cart contains the product as a single line at quantity 2.

### tc_wvs3mkze: Adding a product already in the cart increases that line's quantity by the added quantity without creating a second line

```yaml
key: tc_wvs3mkze
automatable: true
covers: [rule_6j0p]
relies_on: [rule_0qkc]
review: {by: human:kinasr, at: 2026-11-13, commit: 390c6440d4ef9b3d5dc5f796db6da87b17e36f7b, digest: cdb805d4b9fb1b7b}
generated: {by: delegate:sonnet, at: 2026-11-13}
```

**Preconditions.**

- The cart in the current browser session holds one line for an in-stock product at quantity 2

**Steps.**

1. Open the product page of the product already in the cart.
2. Choose a quantity of 3.
3. Add the product to the cart.
4. Open the cart.

**Expected result.**

The cart still has exactly one line for that product, and its quantity is 5 (2 plus 3). No second line for the product exists.

### tc_az5xje7b: A product that is out of stock cannot be added to the cart

```yaml
key: tc_az5xje7b
automatable: true
covers: [rule_phg8]
review: {by: human:kinasr, at: 2026-11-13, commit: 390c6440d4ef9b3d5dc5f796db6da87b17e36f7b, digest: 3cbb78695af43181}
generated: {by: delegate:sonnet, at: 2026-11-13}
```

**Preconditions.**

- An empty cart in the current browser session
- A product that is out of stock, with a product page

**Steps.**

1. Open the product page of the out-of-stock product.
2. Try to add the product to the cart with a valid quantity.
3. Open the cart.

**Expected result.**

The product cannot be added to the cart. The cart does not contain the product and remains empty.
