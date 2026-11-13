---
type: feature
key: cart
suite_key: su_dsrya1d0
coverage_digest: 53ee911c544bfd88
generated: {by: human:kinasr, at: 2026-11-13}
sources: [file:.qa/observations/2026-11-13-user-adds-product-cart-from-product-page-changes.md, "url:http://localhost:8091/docs?api-docs.json", human:kinasr]
---

# Cart

The cart holds the products a shopper means to buy. A shopper adds a product to it from that
product's page with a chosen quantity, changes the quantity of a line in the cart, removes a line,
and sees each line total and the cart total follow. Both signed-out visitors and signed-in Users
use it; an Admin's use of the cart is not required.

This Feature comes from an Observation of the Toolshop app (v6.0.0), which reached the product page
and the empty cart step of checkout but could not add a product, from the Toolshop API contract's
Cart operations, and from what kinasr settled in conversation. Placing an order from the cart is
outside it, and deleting a whole cart is left for a later run.

## Rules

1. **rule_0qkc**: Adding a product from its product page with quantity N puts that product in the cart at quantity N.
2. **rule_cf41**: A confirmation message is shown when a product is added to the cart; its wording is not part of the claim.
3. **rule_6j0p**: Adding a product that is already in the cart increases that line's quantity by the added quantity and creates no second line.

   For example, adding 2 and then 3 of the same product leaves one line at quantity 5.
4. **rule_d95y**: Each cart line shows the product name, its quantity, its unit price and its line total, the unit price times the quantity.
5. **rule_qtkv**: The cart total is the sum of the line totals, shown to 2 decimals.
6. **rule_nyn1**: Changing a line's quantity in the cart updates that line's total and the cart total without a page reload.
7. **rule_0b5b**: Removing a product from the cart removes its line and updates the cart total without a page reload.
8. **rule_tywa**: Signed-out visitors and signed-in Users can both add products to the cart, change their quantities and remove them.
9. **rule_zngd**: A cart is reachable only from the browser session it belongs to; no visitor or User sees another's cart.
10. **rule_dc0g**: A quantity below 1, a non-integer or an empty quantity is refused on the product page and in the cart, and the cart does not change; no specific message is required.
11. **rule_0f5y**: The minimum quantity is 1, so decreasing a quantity stops at 1, and no maximum quantity is set.
12. **rule_dch4**: Setting a cart line's quantity to 0 is refused and the line keeps its previous quantity.
13. **rule_phg8**: A product that is out of stock cannot be added to the cart.
14. **rule_qyns**: Removing the last item from the cart leaves the cart showing an empty state.
15. **rule_w5a8**: The cart's contents persist across page reloads and navigation in the same browser.

## Boundaries

1. **boundary_8eq1**: Placing an order from the cart (the sign-in, billing address and payment steps of checkout) is not part of this Feature.
   Owner: none

## Coverage

- happy-path: covered by rule_0qkc, rule_nyn1, rule_0b5b
- variations: covered by rule_6j0p, rule_qyns
- results: awaiting
- permissions: covered by rule_tywa, rule_zngd; n/a for Admin use of the cart: not required
- input-validation: covered by rule_dc0g
- limits: covered by rule_0f5y, rule_dch4, rule_phg8, rule_qtkv
- state: awaiting
- failures: awaiting
- concurrency: n/a: changes to the same cart in two tabs need no live sync; a reload shows the current cart
- side-effects: covered by rule_cf41; n/a for effects outside the cart: none until checkout (boundary_8eq1)

## Deferred

- **Delete the whole cart**: not in this run's request. From: url:http://localhost:8091/docs?api-docs.json, DELETE /carts/{cartId}

## Proposed Rules

1. A quantity that is whitespace only or contains letters is refused and the cart does not change.
   Why: rule_dc0g names non-integer and empty, but non-numeric text and whitespace are not explicitly partitioned.
   Scenario: ts_y6dqyj6p

## Open questions

1. [results] **Does a cart link with a count appear in the menu once the cart has items, and does it count lines or the sum of quantities?**: The Observation (fact 5) shows no cart link or count while the cart is empty; kinasr needs to check the badge.
2. [state] **Is a signed-out visitor's cart kept when they sign in?**: No Reference says; kinasr parked it.
3. [failures] **When adding, changing or removing fails (an expired cart, a server error), what does the shopper see, and is the cart left unchanged?**: The contract lists 404 and 422 responses on the Cart operations but no behaviour; kinasr parked it.
