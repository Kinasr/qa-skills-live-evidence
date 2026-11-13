---
type: bug
key: bg_gmxg9zws
status: draft
case: tc_69cebvke
feature: cart
case_digest: 369fccac73735970
run: 4x81rvzp
commit: c5c90a307f3ad26036ee87d7993b598b047ef1da
drafted_at: 2026-11-13
route: no-automation-failed
target: local-ui
record: "executions/2026-11-13-4x81rvzp.md"
---

# bg_gmxg9zws: Product page accepts quantity 0, negative, decimal or empty, coercing each to 1 and adding it to the cart

**Description.**
Each invalid quantity showed the 'Product added' toast and added 1 unit, taking the Pliers line from 3 to 7 ($36.03 to $84.07).

**Steps.**
- [checked] A product that is in stock
- [established] The cart already holds one line of that product at a known quantity, with a known cart total
1. Open that product's page.
2. Try to add the product with a quantity of 0.
3. Try to add the product with a negative quantity.
4. Try to add the product with a non-integer quantity, such as a decimal.
5. Try to add the product with an empty quantity.
6. Open the cart and compare the line quantity, line total and cart total with their known values.

**Expected.**
Each of the four attempts is refused; no specific message is required. The cart holds the same single line at its previous quantity, with the same line total and cart total, and no second line has been created.

**Actual.**
None of the four attempts was refused. Each time the field was coerced to 1 on the product page and the product was added, with a "Product added to shopping cart." toast, and the cart badge rose 3 to 4 (quantity 0), 5 (quantity -2), 6 (quantity 1.5) and 7 (empty). The cart then showed the single Pliers line at quantity 7 (previously 3), line total $84.07 and cart total $84.07 (previously $36.03). No second line was created, but the quantity and totals changed, so the clause "The cart holds the same single line at its previous quantity, with the same line total and cart total" does not hold.

**Evidence.**
The quantity field showed 1 after each attempt. Console errors on the cart page, repeated 7 times: "ERROR TypeError: Cannot read properties of undefined (reading 'cart_items') at CartComponent_Template".
1. `- do goto / → ok`
2. `- do snapshot → ok`
3. `- do goto /product/01M78VTJF83RETW1PVP9CAZ3ZG → ok`
4. `- do snapshot → ok`
5. `- do fill f2e97 <typed> → ok`
6. `- do screenshot → ok`
7. `- do click f2e103 → ok`
8. `- do goto /checkout → ok`
9. `- do screenshot → ok`
10. `- do goto /product/01M78VTJF83RETW1PVP9CAZ3ZG → ok`
11. `- do snapshot → ok`
12. `- do fill f4e103 <typed> → ok`
13. `- do click f4e109 → ok`
14. `- do screenshot → ok`
15. `- do fill f4e103 <typed> → ok`
16. `- do click f4e109 → ok`
17. `- do screenshot → ok`
18. `- do fill f4e103 <typed> → ok`
19. `- do click f4e109 → ok`
20. `- do screenshot → ok`
21. `- do fill f4e103 <typed> → ok`
22. `- do click f4e109 → ok`
23. `- do screenshot → ok`
24. `- do goto /checkout → ok`
25. `- do screenshot → ok`
26. `- do console → ok`

<details><summary>Element evidence</summary>

```json
{
  "5": {"aria":"spinbutton \"Quantity\"","locator":"locator('[data-test=\"quantity\"]')","excerpt":{"element":{"tag":"input","attributes":{"aria-labelledby":"Quantity","class":"form-control ng-untouched ng-pristine ng-valid","data-test":"quantity","id":"quantity-input","type":"number"}},"ancestors":[{"tag":"div","attributes":{"class":"input-group quantity"}},{"tag":"div","attributes":{"class":"col-md-6"}},{"tag":"div","attributes":{"class":"row my-3"}},{"tag":"app-detail","attributes":{}},{"tag":"div","attributes":{"class":"container"}},{"tag":"app-root","attributes":{}},{"tag":"body","attributes":{}}]}},
  "7": {"aria":"button","locator":"locator('[data-test=\"add-to-cart\"]')","excerpt":{"element":{"tag":"button","attributes":{"class":"btn-success btn","data-test":"add-to-cart","id":"btn-add-to-cart"}},"ancestors":[{"tag":"div","attributes":{"class":"btn-group mt-2"}},{"tag":"div","attributes":{"class":"col-md-6"}},{"tag":"div","attributes":{"class":"row my-3"}},{"tag":"app-detail","attributes":{}},{"tag":"div","attributes":{"class":"container"}},{"tag":"app-root","attributes":{}},{"tag":"body","attributes":{}}]}},
  "12": {"aria":"spinbutton \"Quantity\"","locator":"locator('[data-test=\"quantity\"]')","excerpt":{"element":{"tag":"input","attributes":{"aria-labelledby":"Quantity","class":"form-control ng-untouched ng-pristine ng-valid","data-test":"quantity","id":"quantity-input","type":"number"}},"ancestors":[{"tag":"div","attributes":{"class":"input-group quantity"}},{"tag":"div","attributes":{"class":"col-md-6"}},{"tag":"div","attributes":{"class":"row my-3"}},{"tag":"app-detail","attributes":{}},{"tag":"div","attributes":{"class":"container"}},{"tag":"app-root","attributes":{}},{"tag":"body","attributes":{}}]}},
  "13": {"aria":"button","locator":"locator('[data-test=\"add-to-cart\"]')","excerpt":{"element":{"tag":"button","attributes":{"class":"btn-success btn","data-test":"add-to-cart","id":"btn-add-to-cart"}},"ancestors":[{"tag":"div","attributes":{"class":"btn-group mt-2"}},{"tag":"div","attributes":{"class":"col-md-6"}},{"tag":"div","attributes":{"class":"row my-3"}},{"tag":"app-detail","attributes":{}},{"tag":"div","attributes":{"class":"container"}},{"tag":"app-root","attributes":{}},{"tag":"body","attributes":{}}]}},
  "15": {"aria":"spinbutton \"Quantity\"","locator":"locator('[data-test=\"quantity\"]')","excerpt":{"element":{"tag":"input","attributes":{"aria-labelledby":"Quantity","class":"form-control ng-dirty ng-invalid ng-touched","data-test":"quantity","id":"quantity-input","type":"number"}},"ancestors":[{"tag":"div","attributes":{"class":"input-group quantity"}},{"tag":"div","attributes":{"class":"col-md-6"}},{"tag":"div","attributes":{"class":"row my-3"}},{"tag":"app-detail","attributes":{}},{"tag":"div","attributes":{"class":"container"}},{"tag":"app-root","attributes":{}},{"tag":"body","attributes":{}}]}},
  "16": {"aria":"button","locator":"locator('[data-test=\"add-to-cart\"]')","excerpt":{"element":{"tag":"button","attributes":{"class":"btn-success btn","data-test":"add-to-cart","id":"btn-add-to-cart"}},"ancestors":[{"tag":"div","attributes":{"class":"btn-group mt-2"}},{"tag":"div","attributes":{"class":"col-md-6"}},{"tag":"div","attributes":{"class":"row my-3"}},{"tag":"app-detail","attributes":{}},{"tag":"div","attributes":{"class":"container"}},{"tag":"app-root","attributes":{}},{"tag":"body","attributes":{}}]}},
  "18": {"aria":"spinbutton \"Quantity\"","locator":"locator('[data-test=\"quantity\"]')","excerpt":{"element":{"tag":"input","attributes":{"aria-labelledby":"Quantity","class":"form-control ng-dirty ng-invalid ng-touched","data-test":"quantity","id":"quantity-input","type":"number"}},"ancestors":[{"tag":"div","attributes":{"class":"input-group quantity"}},{"tag":"div","attributes":{"class":"col-md-6"}},{"tag":"div","attributes":{"class":"row my-3"}},{"tag":"app-detail","attributes":{}},{"tag":"div","attributes":{"class":"container"}},{"tag":"app-root","attributes":{}},{"tag":"body","attributes":{}}]}},
  "19": {"aria":"button","locator":"locator('[data-test=\"add-to-cart\"]')","excerpt":{"element":{"tag":"button","attributes":{"class":"btn-success btn","data-test":"add-to-cart","id":"btn-add-to-cart"}},"ancestors":[{"tag":"div","attributes":{"class":"btn-group mt-2"}},{"tag":"div","attributes":{"class":"col-md-6"}},{"tag":"div","attributes":{"class":"row my-3"}},{"tag":"app-detail","attributes":{}},{"tag":"div","attributes":{"class":"container"}},{"tag":"app-root","attributes":{}},{"tag":"body","attributes":{}}]}},
  "21": {"aria":"spinbutton \"Quantity\"","locator":"locator('[data-test=\"quantity\"]')","excerpt":{"element":{"tag":"input","attributes":{"aria-labelledby":"Quantity","class":"form-control ng-dirty ng-touched ng-valid","data-test":"quantity","id":"quantity-input","type":"number"}},"ancestors":[{"tag":"div","attributes":{"class":"input-group quantity"}},{"tag":"div","attributes":{"class":"col-md-6"}},{"tag":"div","attributes":{"class":"row my-3"}},{"tag":"app-detail","attributes":{}},{"tag":"div","attributes":{"class":"container"}},{"tag":"app-root","attributes":{}},{"tag":"body","attributes":{}}]}},
  "22": {"aria":"button","locator":"locator('[data-test=\"add-to-cart\"]')","excerpt":{"element":{"tag":"button","attributes":{"class":"btn-success btn","data-test":"add-to-cart","id":"btn-add-to-cart"}},"ancestors":[{"tag":"div","attributes":{"class":"btn-group mt-2"}},{"tag":"div","attributes":{"class":"col-md-6"}},{"tag":"div","attributes":{"class":"row my-3"}},{"tag":"app-detail","attributes":{}},{"tag":"div","attributes":{"class":"container"}},{"tag":"app-root","attributes":{}},{"tag":"body","attributes":{}}]}}
}
```

</details>

**Environment.**
- Target: local-ui
- Failing levels: ui
- Roles: none
- Commit: c5c90a307f3ad26036ee87d7993b598b047ef1da
- Browser: 0.1.22
- Automations: none
