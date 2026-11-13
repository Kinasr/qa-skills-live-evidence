---
type: scenario
key: ts_y6dqyj6p
feature: cart
generated: {by: script:qa-design, at: 2026-11-13}
---

# ts_y6dqyj6p: Quantity validation and limits on the product page and in the cart

### tc_69cebvke: Invalid quantities (below 1, non-integer, empty) are refused when adding from the product page and the cart does not change

```yaml
key: tc_69cebvke
automatable: true
covers: [rule_dc0g]
relies_on: [rule_0qkc]
generated: {by: delegate:sonnet, at: 2026-11-13}
```

**Preconditions.**

- A product that is in stock
- The cart already holds one line of that product at a known quantity, with a known cart total

**Steps.**

1. Open that product's page.
2. Try to add the product with a quantity of 0.
3. Try to add the product with a negative quantity.
4. Try to add the product with a non-integer quantity, such as a decimal.
5. Try to add the product with an empty quantity.
6. Open the cart and compare the line quantity, line total and cart total with their known values.

**Expected result.**

Each of the four attempts is refused; no specific message is required. The cart holds the same single line at its previous quantity, with the same line total and cart total, and no second line has been created.

### tc_vawhfbbe: Invalid quantity edits in the cart (0, negative, non-integer, empty) are refused and the line keeps its previous quantity

```yaml
key: tc_vawhfbbe
automatable: true
covers: [rule_dc0g, rule_dch4]
relies_on: [rule_nyn1]
generated: {by: delegate:sonnet, at: 2026-11-13}
```

**Preconditions.**

- The cart holds a line at quantity greater than 1, with a known line total and cart total

**Steps.**

1. Open the cart.
2. Set that line's quantity to 0.
3. Set that line's quantity to a negative number.
4. Set that line's quantity to a non-integer value, such as a decimal.
5. Set that line's quantity to empty.
6. Reload the cart page and read the line quantity, line total and cart total.

**Expected result.**

Every one of the four attempts is refused; no specific message is required. After each attempt, and after the reload, the line is still present at its previous quantity, and its line total and the cart total are unchanged.

### tc_t9vj3rsp: Decreasing a quantity stops at 1, and a very large whole quantity is accepted on the product page and in the cart

```yaml
key: tc_t9vj3rsp
automatable: true
covers: [rule_0f5y]
relies_on: [rule_0qkc, rule_nyn1, rule_d95y]
generated: {by: delegate:sonnet, at: 2026-11-13}
```

**Preconditions.**

- A product that is in stock
- The cart is empty

**Steps.**

1. Open the product's page and add it with a quantity of 1.
2. Open the cart and check the line shows quantity 1.
3. Try to decrease that line's quantity below 1.
4. Set that line's quantity to a very large whole number.
5. Open the product's page again and add it with a very large whole quantity.

**Expected result.**

At quantity 1 the line cannot go lower and stays at 1. The very large whole quantity is accepted in the cart. Adding a very large whole quantity from the product page is also accepted. No maximum quantity is enforced in either place, and the line quantity and line total reflect the quantities entered.
