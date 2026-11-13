---
type: bug
key: bg_c1ymjvt2
status: draft
case: tc_t9vj3rsp
feature: cart
case_digest: 17af716849b1c63c
run: 4x81rvzp
commit: c5c90a307f3ad26036ee87d7993b598b047ef1da
drafted_at: 2026-11-13
route: no-automation-failed
target: local-ui
record: "executions/2026-11-13-4x81rvzp.md"
---

# bg_c1ymjvt2: Large quantities are silently capped at 99 in the cart and on the product page, though no maximum should apply

**Description.**
Setting the cart line to 1000000 left it at 99 ($1,188.99); adding 1000000 from the product page raised the cart badge only from 99 to 198.

**Steps.**
- [checked] A product that is in stock
- [checked] The cart is empty
1. Open the product's page and add it with a quantity of 1.
2. Open the cart and check the line shows quantity 1.
3. Try to decrease that line's quantity below 1.
4. Set that line's quantity to a very large whole number.
5. Open the product's page again and add it with a very large whole quantity.

**Expected.**
At quantity 1 the line cannot go lower and stays at 1. The very large whole quantity is accepted in the cart. Adding a very large whole quantity from the product page is also accepted. No maximum quantity is enforced in either place, and the line quantity and line total reflect the quantities entered.

**Actual.**
The decrease held at 1, so that clause holds. The clause that failed is "The very large whole quantity is accepted in the cart" together with "No maximum quantity is enforced in either place, and the line quantity and line total reflect the quantities entered". In the cart I set the line quantity to 1000000. The field then showed 99, the line total $1,188.99 (99 x $12.01) and the cart total $1,188.99. On the product page I entered 1000000 and added it. The cart badge went from 99 to 198, so that add was also capped at 99. The quantities entered were not kept, which points to a maximum of 99.

**Evidence.**
The cart badge showed 99 before the product-page add and 198 after it. The console had 7 errors on the cart page. All were the same TypeError, "Cannot read properties of undefined (reading 'cart_items')", thrown at CartComponent_Template. The console was read after the last step.
1. `- do goto / → ok`
2. `- do snapshot → ok`
3. `- do goto /product/01M78VTJF83RETW1PVP9CAZ3ZG → ok`
4. `- do snapshot → ok`
5. `- do click f2e103 → ok`
6. `- do goto /checkout → ok`
7. `- do snapshot → ok`
8. `- do click f3e93 → ok`
9. `- do press ArrowDown → ok`
10. `- do snapshot → ok`
11. `- do fill f3e93 <typed> --submit → ok`
12. `- do goto /product/01M78VTJF83RETW1PVP9CAZ3ZG → ok`
13. `- do snapshot → ok`
14. `- do fill f4e79 <typed> → ok`
15. `- do click f4e85 → ok`
16. `- do goto /checkout → ok`
17. `- do screenshot → ok`
18. `- do console → ok`

<details><summary>Element evidence</summary>

```json
{
  "5": {"aria":"button","locator":"locator('[data-test=\"add-to-cart\"]')","excerpt":{"element":{"tag":"button","attributes":{"class":"btn-success btn","data-test":"add-to-cart","id":"btn-add-to-cart"}},"ancestors":[{"tag":"div","attributes":{"class":"btn-group mt-2"}},{"tag":"div","attributes":{"class":"col-md-6"}},{"tag":"div","attributes":{"class":"row my-3"}},{"tag":"app-detail","attributes":{}},{"tag":"div","attributes":{"class":"container"}},{"tag":"app-root","attributes":{}},{"tag":"body","attributes":{}}]}},
  "8": {"aria":"table > rowgroup > row > cell > spinbutton \"Quantity for Pliers\"","locator":"locator('[data-test=\"product-quantity\"]')","excerpt":{"element":{"tag":"input","attributes":{"class":"form-control quantity ng-untouched ng-pristine ng-valid","data-test":"product-quantity","id":"quantity-01m79pwt6fb6dv0fa10y0np7xq","type":"number"}},"ancestors":[{"tag":"td","attributes":{"class":"col-md-2 align-middle"}},{"tag":"tr","attributes":{}},{"tag":"tbody","attributes":{}},{"tag":"table","attributes":{"class":"table table-hover"}},{"tag":"div","attributes":{}},{"tag":"app-cart","attributes":{}},{"tag":"aw-wizard-step","attributes":{}},{"tag":"div","attributes":{"class":"wizard-steps horizontal"}}],"truncated":{"ancestors":true}},"truncated":{"excerpt":true}},
  "9": {"target":"none"},
  "11": {"aria":"table > rowgroup > row > cell > spinbutton \"Quantity for Pliers\"","locator":"locator('[data-test=\"product-quantity\"]')","excerpt":{"element":{"tag":"input","attributes":{"class":"form-control quantity ng-untouched ng-pristine ng-valid","data-test":"product-quantity","id":"quantity-01m79pwt6fb6dv0fa10y0np7xq","type":"number"}},"ancestors":[{"tag":"td","attributes":{"class":"col-md-2 align-middle"}},{"tag":"tr","attributes":{}},{"tag":"tbody","attributes":{}},{"tag":"table","attributes":{"class":"table table-hover"}},{"tag":"div","attributes":{}},{"tag":"app-cart","attributes":{}},{"tag":"aw-wizard-step","attributes":{}},{"tag":"div","attributes":{"class":"wizard-steps horizontal"}}],"truncated":{"ancestors":true}},"truncated":{"excerpt":true}},
  "14": {"aria":"spinbutton \"Quantity\"","locator":"locator('[data-test=\"quantity\"]')","excerpt":{"element":{"tag":"input","attributes":{"aria-labelledby":"Quantity","class":"form-control ng-untouched ng-pristine ng-valid","data-test":"quantity","id":"quantity-input","type":"number"}},"ancestors":[{"tag":"div","attributes":{"class":"input-group quantity"}},{"tag":"div","attributes":{"class":"col-md-6"}},{"tag":"div","attributes":{"class":"row my-3"}},{"tag":"app-detail","attributes":{}},{"tag":"div","attributes":{"class":"container"}},{"tag":"app-root","attributes":{}},{"tag":"body","attributes":{}}]}},
  "15": {"aria":"button","locator":"locator('[data-test=\"add-to-cart\"]')","excerpt":{"element":{"tag":"button","attributes":{"class":"btn-success btn","data-test":"add-to-cart","id":"btn-add-to-cart"}},"ancestors":[{"tag":"div","attributes":{"class":"btn-group mt-2"}},{"tag":"div","attributes":{"class":"col-md-6"}},{"tag":"div","attributes":{"class":"row my-3"}},{"tag":"app-detail","attributes":{}},{"tag":"div","attributes":{"class":"container"}},{"tag":"app-root","attributes":{}},{"tag":"body","attributes":{}}]}}
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
