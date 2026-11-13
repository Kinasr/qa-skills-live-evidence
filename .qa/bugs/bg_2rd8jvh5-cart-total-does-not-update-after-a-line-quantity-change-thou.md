---
type: bug
key: bg_2rd8jvh5
status: draft
case: tc_c0syc29v
feature: cart
case_digest: 081a7969a89cf5f0
run: 4x81rvzp
commit: c5c90a307f3ad26036ee87d7993b598b047ef1da
drafted_at: 2026-11-13
route: no-automation-failed
target: local-ui
record: "executions/2026-11-13-4x81rvzp.md"
---

# bg_2rd8jvh5: Cart total does not update after a line quantity change, though the line total does

**Description.**
Raising Pliers from 3 to 5 updated its line total to $60.05, but the cart Total stayed at the old $132.85 instead of $156.87. The cart page logs repeated TypeError reading 'cart_items'.

**Steps.**
- [established] A cart holds two different products, each at a quantity of at least 2
1. Open the cart and note each line total and the cart total
2. Increase the quantity of the first line to a higher valid whole number
3. Observe the first line total and the cart total without reloading the page

**Expected.**
After each change, with no page reload, the first line's total is its unit price times the new quantity. The second line is unchanged. The cart total equals the sum of the line totals, shown to 2 decimals.

**Actual.**
At step 3, after Pliers (unit $12.01) went from 3 to 5, the first line total updated to $60.05 and the Bolt Cutters line stayed $96.82. The cart Total still showed $132.85 (the old sum 36.03 + 96.82) in the snapshot and in a screenshot taken afterwards, instead of $156.87 (60.05 + 96.82). The clause that failed is "The cart total equals the sum of the line totals". Step 4 was not started.

**Evidence.**
Before the change: Pliers $36.03, Bolt Cutters $96.82, Total $132.85. After setting Pliers to 5: Pliers $60.05, Bolt Cutters $96.82, Total $132.85. Console errors, shortened: repeated "ERROR TypeError: Cannot read properties of undefined (reading 'cart_items') at CartComponent_Template" (7 errors in all).
1. `- do goto / → ok`
2. `- do goto /checkout → ok`
3. `- do goto / → ok`
4. `- do snapshot → ok`
5. `- do goto /product/01M78VTJF83RETW1PVP9CAZ3ZG → ok`
6. `- do snapshot → ok`
7. `- do fill f4e97 <typed> → ok`
8. `- do click f4e103 → ok`
9. `- do goto /product/01M78VTJF9KGZZNR4AX555687R → ok`
10. `- do snapshot → ok`
11. `- do fill f5e103 <typed> → ok`
12. `- do click f5e109 → ok`
13. `- do goto /checkout → ok`
14. `- do snapshot → ok`
15. `- do fill f6e93 <typed> → ok`
16. `- do snapshot → ok`
17. `- do screenshot → ok`
18. `- do console → ok`

<details><summary>Element evidence</summary>

```json
{
  "7": {"aria":"spinbutton \"Quantity\"","locator":"locator('[data-test=\"quantity\"]')","excerpt":{"element":{"tag":"input","attributes":{"aria-labelledby":"Quantity","class":"form-control ng-untouched ng-pristine ng-valid","data-test":"quantity","id":"quantity-input","type":"number"}},"ancestors":[{"tag":"div","attributes":{"class":"input-group quantity"}},{"tag":"div","attributes":{"class":"col-md-6"}},{"tag":"div","attributes":{"class":"row my-3"}},{"tag":"app-detail","attributes":{}},{"tag":"div","attributes":{"class":"container"}},{"tag":"app-root","attributes":{}},{"tag":"body","attributes":{}}]}},
  "8": {"aria":"button","locator":"locator('[data-test=\"add-to-cart\"]')","excerpt":{"element":{"tag":"button","attributes":{"class":"btn-success btn","data-test":"add-to-cart","id":"btn-add-to-cart"}},"ancestors":[{"tag":"div","attributes":{"class":"btn-group mt-2"}},{"tag":"div","attributes":{"class":"col-md-6"}},{"tag":"div","attributes":{"class":"row my-3"}},{"tag":"app-detail","attributes":{}},{"tag":"div","attributes":{"class":"container"}},{"tag":"app-root","attributes":{}},{"tag":"body","attributes":{}}]}},
  "11": {"aria":"spinbutton \"Quantity\"","locator":"locator('[data-test=\"quantity\"]')","excerpt":{"element":{"tag":"input","attributes":{"aria-labelledby":"Quantity","class":"form-control ng-untouched ng-pristine ng-valid","data-test":"quantity","id":"quantity-input","type":"number"}},"ancestors":[{"tag":"div","attributes":{"class":"input-group quantity"}},{"tag":"div","attributes":{"class":"col-md-6"}},{"tag":"div","attributes":{"class":"row my-3"}},{"tag":"app-detail","attributes":{}},{"tag":"div","attributes":{"class":"container"}},{"tag":"app-root","attributes":{}},{"tag":"body","attributes":{}}]}},
  "12": {"aria":"button","locator":"locator('[data-test=\"add-to-cart\"]')","excerpt":{"element":{"tag":"button","attributes":{"class":"btn-success btn","data-test":"add-to-cart","id":"btn-add-to-cart"}},"ancestors":[{"tag":"div","attributes":{"class":"btn-group mt-2"}},{"tag":"div","attributes":{"class":"col-md-6"}},{"tag":"div","attributes":{"class":"row my-3"}},{"tag":"app-detail","attributes":{}},{"tag":"div","attributes":{"class":"container"}},{"tag":"app-root","attributes":{}},{"tag":"body","attributes":{}}]}},
  "15": {"aria":"table > rowgroup > row > cell > spinbutton \"Quantity for Pliers\"","locator":"getByRole('spinbutton', { name: 'Quantity for Pliers' })","excerpt":{"element":{"tag":"input","attributes":{"class":"form-control quantity ng-untouched ng-pristine ng-valid","data-test":"product-quantity","id":"quantity-01m79nynbdbgyhz86d2fq0xrkx","type":"number"}},"ancestors":[{"tag":"td","attributes":{"class":"col-md-2 align-middle"}},{"tag":"tr","attributes":{}},{"tag":"tbody","attributes":{}},{"tag":"table","attributes":{"class":"table table-hover"}},{"tag":"div","attributes":{}},{"tag":"app-cart","attributes":{}},{"tag":"aw-wizard-step","attributes":{}},{"tag":"div","attributes":{"class":"wizard-steps horizontal"}}],"truncated":{"ancestors":true}},"truncated":{"excerpt":true}}
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
