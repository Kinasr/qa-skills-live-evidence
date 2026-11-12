---
type: train
key: access
---

# Access

### acc_local-admin: the local Toolshop UI as the Admin test account

```yaml
match: ["url:http://localhost:4200/"]
via: auth:LOCAL_ADMIN_PASSWORD
role: Admin
identifiers: {user: admin@practicesoftwaretesting.com, login_url: "http://localhost:4200/auth/login"}
credential_from: "The seeded demo accounts listed in the upstream practice-software-testing README"
sources: [human:kinasr]
added: 2026-11-13
```

A single form takes email and password on /auth/login. The API at http://localhost:8091 takes `Authorization: Bearer` with a token that POST /users/login returns per session; there is no static token to store.

### acc_local-user: the local Toolshop UI as the User test account

```yaml
match: ["url:http://localhost:4200/"]
via: auth:LOCAL_USER_PASSWORD
role: User
identifiers: {user: customer@practicesoftwaretesting.com, login_url: "http://localhost:4200/auth/login"}
credential_from: "The seeded demo accounts listed in the upstream practice-software-testing README"
sources: [human:kinasr]
added: 2026-11-13
```

A single form takes email and password on /auth/login. The API's Bearer token comes from POST /users/login per session.

### acc_local-observe: the local Toolshop UI for observe:, role-less

```yaml
match: ["url:http://localhost:4200/"]
via: auth:LOCAL_OBSERVE_PASSWORD
identifiers: {user: customer2@practicesoftwaretesting.com, login_url: "http://localhost:4200/auth/login"}
credential_from: "The seeded demo accounts listed in the upstream practice-software-testing README"
sources: [human:kinasr]
added: 2026-11-13
```

A dedicated account for `/qa-deep-dive`'s `observe:`, so exploring never touches the Role accounts' data.
