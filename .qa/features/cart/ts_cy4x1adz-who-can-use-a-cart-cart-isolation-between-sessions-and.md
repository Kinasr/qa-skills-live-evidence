---
type: scenario
key: ts_cy4x1adz
feature: cart
generated: {by: script:qa-design, at: 2026-11-13}
---

# ts_cy4x1adz: Who can use a cart, cart isolation between sessions and persistence

### tc_pqyf26fg: A signed-out visitor adds a product, changes its quantity and removes it

```yaml
key: tc_pqyf26fg
automatable: true
covers: [rule_tywa]
generated: {by: delegate:sonnet, at: 2026-11-13}
```

**Preconditions.**

- The browser session is signed out
- A product that is in stock

**Steps.**

1. Open the product's page and add it to the cart with a valid quantity
2. Open the cart
3. Change the line's quantity to another valid value
4. Remove the line from the cart

**Expected result.**

The visitor can add the product, and it appears in the cart. The quantity change is accepted and the line shows the new quantity. Removing the line succeeds and the line is gone from the cart.

### tc_afg65s72: A signed-in User adds a product, changes its quantity and removes it

```yaml
key: tc_afg65s72
automatable: true
roles: [User]
covers: [rule_tywa]
generated: {by: delegate:sonnet, at: 2026-11-13}
```

**Preconditions.**

- A User is signed in
- A product that is in stock

**Steps.**

1. Open the product's page and add it to the cart with a valid quantity
2. Open the cart
3. Change the line's quantity to another valid value
4. Remove the line from the cart

**Expected result.**

The User can add the product, and it appears in the cart. The quantity change is accepted and the line shows the new quantity. Removing the line succeeds and the line is gone from the cart.

### tc_nef6kbkv: A signed-out visitor's cart is not visible to a signed-in User in a separate session, and vice versa

```yaml
key: tc_nef6kbkv
automatable: true
level: ui
roles: [User]
covers: [rule_zngd]
relies_on: [rule_tywa]
generated: {by: delegate:sonnet, at: 2026-11-13}
```

**Preconditions.**

- A signed-out browser session (the visitor) and a separate signed-in User session
- A product that is in stock, and a different product that is in stock

**Steps.**

1. In the visitor session, add the first product to the cart and open the cart
2. add the second product to the cart and open the cart
3. In the visitor session, reload the cart
4. reload the cart

**Expected result.**

The visitor's cart shows only the first product, and the User's cart shows only the second product, before and after the reloads. Neither shopper sees the other's lines.

### tc_q2xwdeh5: A cart cannot be reached directly by a session it does not belong to

```yaml
key: tc_q2xwdeh5
automatable: true
manual: false
level: api
roles: [User]
covers: [rule_zngd]
generated: {by: delegate:sonnet, at: 2026-11-13}
```

**Preconditions.**

- A cart that belongs to a signed-out visitor session and has at least one line
- A separate signed-in User session that does not own that cart

**Steps.**

1. request the visitor's cart directly by its identifier
2. try to change a line quantity of the visitor's cart directly by its identifier
3. try to remove a line from the visitor's cart directly by its identifier

**Expected result.**

The visitor's cart is not returned to the User and none of the changes is applied. The visitor's cart remains unchanged when viewed from its own session.

### tc_9qh7edff: Cart contents persist across page reloads and navigation in the same browser

```yaml
key: tc_9qh7edff
automatable: true
covers: [rule_w5a8]
relies_on: [rule_tywa]
generated: {by: delegate:sonnet, at: 2026-11-13}
```

**Preconditions.**

- A browser session with a cart holding at least two lines of different products

**Steps.**

1. Open the cart and note its lines and quantities
2. Reload the page
3. Navigate to the home page and then to another product's page
4. Return to the cart
5. Close the tab, open a new tab in the same browser and open the cart

**Expected result.**

After the reload, after navigating away and back, and in the new tab of the same browser, the cart shows the same lines and quantities as noted at the start.
