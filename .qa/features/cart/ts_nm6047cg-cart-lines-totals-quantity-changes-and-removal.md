---
type: scenario
key: ts_nm6047cg
feature: cart
generated: {by: script:qa-design, at: 2026-11-13}
---

# ts_nm6047cg: Cart lines, totals, quantity changes and removal

### tc_m2p6txkz: Each cart line shows product name, quantity, unit price and line total, and the cart total is the sum of the line totals shown to 2 decimals

```yaml
key: tc_m2p6txkz
automatable: true
covers: [rule_d95y, rule_qtkv]
relies_on: [rule_0qkc]
review: {by: human:kinasr, at: 2026-11-13, commit: 390c6440d4ef9b3d5dc5f796db6da87b17e36f7b, digest: f3790cc6c18a6ef0}
generated: {by: delegate:sonnet, at: 2026-11-13}
```

**Preconditions.**

- A cart holds two different products at different quantities, one at a quantity above 1, and the unit prices make the cart total need two decimals

**Steps.**

1. Open the cart
2. Read each line's product name, quantity, unit price and line total
3. Read the cart total

**Expected result.**

Each line shows its product name, its quantity, its unit price and a line total equal to the unit price times the quantity. The cart total equals the sum of the line totals and is shown to 2 decimals.

### tc_c0syc29v: Increasing and decreasing a line's quantity in the cart updates that line total and the cart total without a page reload

```yaml
key: tc_c0syc29v
automatable: true
covers: [rule_nyn1, rule_qtkv]
relies_on: [rule_0qkc]
review: {by: human:kinasr, at: 2026-11-13, commit: 390c6440d4ef9b3d5dc5f796db6da87b17e36f7b, digest: 081a7969a89cf5f0}
generated: {by: delegate:sonnet, at: 2026-11-13}
```

**Preconditions.**

- A cart holds two different products, each at a quantity of at least 2

**Steps.**

1. Open the cart and note each line total and the cart total
2. Increase the quantity of the first line to a higher valid whole number
3. Observe the first line total and the cart total without reloading the page
4. Decrease the quantity of the first line to a lower valid whole number
5. Observe the first line total and the cart total again without reloading the page

**Expected result.**

After each change, with no page reload, the first line's total is its unit price times the new quantity. The second line is unchanged. The cart total equals the sum of the line totals, shown to 2 decimals.

### tc_1738p8v7: Removing a line updates the cart total without a page reload, and removing the last line leaves the cart showing an empty state

```yaml
key: tc_1738p8v7
automatable: true
covers: [rule_0b5b, rule_qyns]
relies_on: [rule_0qkc, rule_qtkv]
review: {by: human:kinasr, at: 2026-11-13, commit: 390c6440d4ef9b3d5dc5f796db6da87b17e36f7b, digest: 4c28b1aa77beb8ee}
generated: {by: delegate:sonnet, at: 2026-11-13}
```

**Preconditions.**

- A cart holds two different products

**Steps.**

1. Open the cart and note both lines and the cart total
2. Remove the first product from the cart
3. Observe the cart without reloading the page
4. Remove the remaining product from the cart
5. Observe the cart

**Expected result.**

After the first removal, with no page reload, that product's line is gone, the other line remains, and the cart total equals the remaining line total. After the last item is removed, the cart shows an empty state with no lines.
