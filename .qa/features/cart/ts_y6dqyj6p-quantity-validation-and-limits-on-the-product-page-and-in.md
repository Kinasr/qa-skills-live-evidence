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
review: {by: human:kinasr, at: 2026-11-13, commit: 390c6440d4ef9b3d5dc5f796db6da87b17e36f7b, digest: 369fccac73735970}
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
review: {by: human:kinasr, at: 2026-11-13, commit: 390c6440d4ef9b3d5dc5f796db6da87b17e36f7b, digest: 26a45421958cde7e}
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

### tc_t9vj3rsp: Decreasing a quantity stops at 1, and a quantity above 99 ends at 99 on the product page and in the cart

```yaml
key: tc_t9vj3rsp
automatable: true
covers: [rule_0f5y]
relies_on: [rule_0qkc, rule_nyn1, rule_d95y, rule_6j0p]
review: {by: human:kinasr, at: 2026-11-13, commit: 390c6440d4ef9b3d5dc5f796db6da87b17e36f7b, digest: 17af716849b1c63c}
finding:
  - {kind: Conflict, at_commit: 689a16b1f68f4de64e3c434ea3a828db17122d40, at_digest: 40f92206ecb683df, evidence: "rule_0f5y: the case says \"No maximum quantity is enforced in either place, and the line quantity and line total reflect the quantities entered.\" but the Rule says \"the maximum is 99: a larger value on the product page or in the cart is clamped to 99.\" The case expects no maximum quantity on the product page or in the cart, but rule_0f5y sets a maximum of 99 and clamps larger values to 99 in both places."}
generated: {by: delegate:sonnet, at: 2026-11-13}
```

**Preconditions.**

- A product that is in stock
- The cart is empty

**Steps.**

1. Open the product's page and add it with a quantity of 1.
2. Open the cart and check the line shows quantity 1.
3. Try to decrease that line's quantity below 1.
4. Set that line's quantity to a whole number above 99, such as 150, and read the line quantity and line total.
5. Open the product's page again, add it with a whole quantity above 99, such as 150, then open the cart and read the line quantity and line total.

**Expected result.**

At quantity 1 the line cannot go lower and stays at 1. After setting a quantity above 99 in the cart, the cart line ends at quantity 99 with a line total of 99 × the unit price. After adding a quantity above 99 from the product page, the cart line again ends at quantity 99 with a line total of 99 × the unit price.
