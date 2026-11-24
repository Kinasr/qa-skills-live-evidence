---
type: execution
run: dpdj22g3
executed_at: "2026-11-24T11:52:22+02:00"
target: local-ui
url: "http://localhost:4200"
commit: dc73f90df02f044d9eb767ccd618996696acb97c
playwright_cli: 0.1.22
selection: {scope: [tc_d68h3nc7], tags: [], levels: [ui]}
---

### tc_d68h3nc7: Adding a product from its product page with a chosen quantity puts it in the cart at that quantity and shows a confirmation message

```yaml
key: tc_d68h3nc7
level: ui
bound_levels: []
selected_levels: [ui]
omitted_levels: []
feature: cart
result: passed
digest: b3dff40ba0f2f720
review: fresh
roles: []
access: [acc_local-observe]
reached: 4
actions: {used: 10, cap: 40}
created: ["Cart line for Pliers at quantity 2"]
preconditions:
  - {text: "An empty cart in the current browser session", status: checked, how: "the main menu showed no cart link or count before adding"}
  - {text: "An in-stock product with a product page", status: checked, how: "Pliers was listed without an Out of stock label and its product page opened"}
interpretations: ["step 4: the text did not say how to open the cart → I opened the cart page at /checkout, which the cart link in the menu points to", "step 3: the Add to cart button has no accessible name in the snapshot → I identified it by screenshot as the first of three buttons"]
```

**Evidence.**
After Add to cart a message containing "added" appeared (expect.seen true). The cart page showed one row, Pliers, quantity 2, price $12.01, line total $24.02, cart total $24.02, and the cart icon showed 2. The console had 7 repeated error-level entries on the cart page: "ERROR TypeError: Cannot read properties of undefined (reading 'cart_items')" at CartComponent_Template. They did not affect the cart display, and the Expected result does not mention the console.

**Trace.**
1. `- do goto / → ok`
2. `- do snapshot → ok`
3. `- do click f1e268 → ok`
4. `- do snapshot → ok`
5. `- do fill f1e451 <typed> → ok`
6. `- do screenshot → ok`
7. `- do click f1e457 --expect="added" → ok, seen`
8. `- do goto /checkout → ok`
9. `- do snapshot → ok`
10. `- do console → ok`

<details><summary>Element evidence</summary>

```json
{
  "3": {"aria":"unavailable","locator":"locator('[data-test=\"product-01M86DJY9W6AMZPSBD8WZ25KZ2\"]')","excerpt":{"element":{"tag":"a","attributes":{"class":"card","data-test":"product-01M86DJY9W6AMZPSBD8WZ25KZ2","href":"/product/01M86DJY9W6AMZPSBD8WZ25KZ2"}},"ancestors":[{"tag":"div","attributes":{"class":"container"}},{"tag":"div","attributes":{"class":"col-md-9"}},{"tag":"div","attributes":{"class":"row"}},{"tag":"app-overview","attributes":{}},{"tag":"div","attributes":{"class":"container"}},{"tag":"app-root","attributes":{}},{"tag":"body","attributes":{}}]}},
  "5": {"aria":"spinbutton \"Quantity\"","locator":"locator('[data-test=\"quantity\"]')","excerpt":{"element":{"tag":"input","attributes":{"aria-labelledby":"Quantity","class":"form-control ng-untouched ng-pristine ng-valid","data-test":"quantity","id":"quantity-input","type":"number"}},"ancestors":[{"tag":"div","attributes":{"class":"input-group quantity"}},{"tag":"div","attributes":{"class":"col-md-6"}},{"tag":"div","attributes":{"class":"row my-3"}},{"tag":"app-detail","attributes":{}},{"tag":"div","attributes":{"class":"container"}},{"tag":"app-root","attributes":{}},{"tag":"body","attributes":{}}]}},
  "7": {"aria":"button","locator":"locator('[data-test=\"add-to-cart\"]')","excerpt":{"element":{"tag":"button","attributes":{"class":"btn-success btn","data-test":"add-to-cart","id":"btn-add-to-cart"}},"ancestors":[{"tag":"div","attributes":{"class":"btn-group mt-2"}},{"tag":"div","attributes":{"class":"col-md-6"}},{"tag":"div","attributes":{"class":"row my-3"}},{"tag":"app-detail","attributes":{}},{"tag":"div","attributes":{"class":"container"}},{"tag":"app-root","attributes":{}},{"tag":"body","attributes":{}}]}}
}
```

</details>
