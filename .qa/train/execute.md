---
type: train
key: execute
---

# Execute

### prc_cart-service-server-error: To make the cart service fail with a server error, mock its cart endpoints on the API origin by full URL

```yaml
sources: [human:kinasr]
added: 2026-11-14
features: [cart]
```

The Toolshop UI on `http://localhost:4200` calls its cart service on the API origin
`http://localhost:8091`: adding a product sends `POST http://localhost:8091/carts`, then
`POST http://localhost:8091/carts/{id}`. When a case states that the cart service answers with a
server error, mock the endpoint pattern `http://localhost:8091/carts**` with status 500 and a JSON
body `{"message":"Server Error"}`, before the step that adds the product.
