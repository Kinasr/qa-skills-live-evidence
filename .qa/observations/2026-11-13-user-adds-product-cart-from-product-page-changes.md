---
type: observation
observed_at: 2026-11-13
url: http://localhost:4200/
app_version: "v6.0.0"
request: "a User adds a product to the cart from its product page, changes the quantity in the cart, removes it, and sees the total update"
---

## Steps

1. `playwright-cli -s=qa-scout-RwQsYn open`
2. `playwright-cli -s=qa-scout-RwQsYn state-load login-state.json`
3. `playwright-cli -s=qa-scout-RwQsYn goto http://localhost:4200/`
4. `playwright-cli -s=qa-scout-RwQsYn snapshot`
5. `playwright-cli -s=qa-scout-RwQsYn click e202`
6. `playwright-cli -s=qa-scout-RwQsYn snapshot`
7. `playwright-cli -s=qa-scout-RwQsYn goto http://localhost:4200/checkout`
8. `playwright-cli -s=qa-scout-RwQsYn snapshot`
9. `playwright-cli -s=qa-scout-RwQsYn close`

## Facts

1. The home page (http://localhost:4200/) shows the main menu Home, Categories, Contact and a user menu button named "Jack Howe", plus a language button "EN".
2. The home page lists products as links, 9 on page 1, each showing name, a CO₂ rating A to E, a price and a Compare button, with pagination pages 1 to 5.
3. On the home page the product "Long Nose Pliers" ($14.24) shows an "Out of stock" label; "Combination Pliers" is $14.15.
4. The home page footer shows "v6.0.0 | Built 2026-07-05 | Angular 20.0.5".
5. The main menu on the home page and the product page shows no cart link or cart count.
6. Clicking the "Combination Pliers" link on the home page led to http://localhost:4200/product/01M78VTJF7NGRCTM7QGS2923DT, titled "Combination Pliers - Practice Software Testing - Toolshop - v5.0".
7. The product page shows heading "Combination Pliers", category Pliers, brand ForgeFlex Tools, price $14.15, and the CO₂ rating A to E.
8. The product page has a "Decrease quantity" button, a "Quantity" number field showing 1, and an "Increase quantity" button.
9. The product page has three unlabelled buttons below the quantity control; none has an accessible name in the snapshot.
10. The product page shows a Specifications table (Handle Material Bi-component, Length 200mm, Material Chrome Vanadium Steel, Warranty 2years, Weight 340g) and a "Related products" section with four product links.
11. Going to http://localhost:4200/checkout shows the page titled "Checkout - Practice Software Testing - Toolshop - v5.0" with a step list Cart (1), Sign in (2), Billing Address (3), Payment (4).
12. The /checkout page showed no cart line items, quantity fields, remove controls or total in its snapshot; the browser console reported 14 errors on this page.

## Not seen

1. Adding the product to the cart: it needs a click on the product page's add-to-cart button, which the read-only rule forbids.
2. Changing the quantity in the cart, removing the item and the updated total: they need cart contents, which exist only after adding a product.
