---
type: scenario
key: ts_7mqk3e5r
feature: cart
generated: {by: human:kinasr, at: 2026-11-14}
---

# ts_7mqk3e5r: Adding a product to the cart when the cart service fails

### tc_5e7vr0rs: When the cart service answers with a server error, adding a product shows an error message and puts nothing in the cart

```yaml
key: tc_5e7vr0rs
automatable: true
generated: {by: human:kinasr, at: 2026-11-14}
```

**Preconditions.**

- An empty cart in the current browser session
- An in-stock product with a product page
- The cart service answers every request to add a product to a cart with a server error

**Steps.**

1. Open the product page of the in-stock product.
2. Add the product to the cart with the default quantity.
3. Read the message the page shows after adding.
4. Read the cart item count in the navigation bar.

**Expected result.**

The page shows an error message after adding (its wording is not checked) and no confirmation that
the product was added. The navigation bar shows no cart item count, so the cart is still empty.
