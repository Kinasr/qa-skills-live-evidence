```yaml
result: passed
reached: 4
preconditions:
  - text: An empty cart in the current browser session
    status: checked
    how: the cart page showed no lines and the header had no cart badge before adding
  - text: An in-stock product with a product page
    status: checked
    how: Pliers had no Out of stock label on the listing and its page showed Add to cart
interpretations:
  - "step 2: the text did not say how to choose the quantity → I typed 2 into the Quantity field"
  - "setup: the session was already signed in as a user although the case has no Roles → I used it as is"
```

**Evidence.** After Add to cart a toast "Product added to shopping cart." appeared and the cart badge showed 2. The cart page showed a single line, Pliers, quantity 2, price $12.01, total $24.02. Console error-level entries after the last step: repeated "ERROR TypeError: Cannot read properties of undefined (reading 'cart_items') at CartComponent_Template" (5 times, during the cart page's first render). They did not change what the cart showed.
