---
type: bug
key: bg_4tt9mqbb
status: draft
case: tc_vawhfbbe
feature: cart
case_digest: 26a45421958cde7e
run: 4x81rvzp
commit: c5c90a307f3ad26036ee87d7993b598b047ef1da
drafted_at: 2026-11-13
route: no-automation-failed
target: local-ui
record: "executions/2026-11-13-4x81rvzp.md"
---

# bg_4tt9mqbb: Setting a cart line's quantity to 0 is accepted and resets the line to 1 instead of being refused

**Description.**
The Pliers line went from 3 ($36.03) to 1 ($12.01) with a 'Product quantity updated.' alert. The cart page logs repeated TypeError reading 'cart_items'.

**Steps.**
- [established] The cart holds a line at quantity greater than 1, with a known line total and cart total
1. Open the cart.
2. Set that line's quantity to 0.

**Expected.**
Every one of the four attempts is refused; no specific message is required. After each attempt, and after the reload, the line is still present at its previous quantity, and its line total and the cart total are unchanged.

**Actual.**
After setting the Pliers line quantity to 0 (previous quantity 3, line total $36.03, cart total $36.03), the page showed the alert "Product quantity updated." and the line quantity became 1, line total $12.01, cart total $12.01, cart badge 1. The attempt was not refused and the line did not keep its previous quantity.

**Evidence.**
Console errors after step 2 (5, same message repeated): "ERROR TypeError: Cannot read properties of undefined (reading 'cart_items') at CartComponent_Template".
1. `- do goto / → ok`
2. `- do goto /checkout → ok`
3. `- do snapshot → ok`
4. `- do goto / → ok`
5. `- do snapshot → ok`
6. `- do goto /product/01M78VTJF83RETW1PVP9CAZ3ZG → ok`
7. `- do snapshot → ok`
8. `- do fill f4e97 <typed> → ok`
9. `- do click f4e103 → ok`
10. `- do goto /checkout → ok`
11. `- do snapshot → ok`
12. `- do fill f5e93 <typed> --submit → ok`
13. `- do snapshot → ok`
14. `- do console → ok`

<details><summary>Element evidence</summary>

```json
{
  "8": {"aria":"spinbutton \"Quantity\"","locator":"locator('[data-test=\"quantity\"]')","excerpt":{"element":{"tag":"input","attributes":{"aria-labelledby":"Quantity","class":"form-control ng-untouched ng-pristine ng-valid","data-test":"quantity","id":"quantity-input","type":"number"}},"ancestors":[{"tag":"div","attributes":{"class":"input-group quantity"}},{"tag":"div","attributes":{"class":"col-md-6"}},{"tag":"div","attributes":{"class":"row my-3"}},{"tag":"app-detail","attributes":{}},{"tag":"div","attributes":{"class":"container"}},{"tag":"app-root","attributes":{}},{"tag":"body","attributes":{}}]}},
  "9": {"aria":"button","locator":"locator('[data-test=\"add-to-cart\"]')","excerpt":{"element":{"tag":"button","attributes":{"class":"btn-success btn","data-test":"add-to-cart","id":"btn-add-to-cart"}},"ancestors":[{"tag":"div","attributes":{"class":"btn-group mt-2"}},{"tag":"div","attributes":{"class":"col-md-6"}},{"tag":"div","attributes":{"class":"row my-3"}},{"tag":"app-detail","attributes":{}},{"tag":"div","attributes":{"class":"container"}},{"tag":"app-root","attributes":{}},{"tag":"body","attributes":{}}]}},
  "12": {"aria":"table > rowgroup > row > cell > spinbutton \"Quantity for Pliers\"","locator":"locator('[data-test=\"product-quantity\"]')","excerpt":{"element":{"tag":"input","attributes":{"class":"form-control quantity ng-untouched ng-pristine ng-valid","data-test":"product-quantity","id":"quantity-01m79prweqhrt9e0c80n1h9tjr","type":"number"}},"ancestors":[{"tag":"td","attributes":{"class":"col-md-2 align-middle"}},{"tag":"tr","attributes":{}},{"tag":"tbody","attributes":{}},{"tag":"table","attributes":{"class":"table table-hover"}},{"tag":"div","attributes":{}},{"tag":"app-cart","attributes":{}},{"tag":"aw-wizard-step","attributes":{}},{"tag":"div","attributes":{"class":"wizard-steps horizontal"}}],"truncated":{"ancestors":true}},"truncated":{"excerpt":true}}
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
