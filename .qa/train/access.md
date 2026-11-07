---
type: train
key: access
---

# Access

### acc_local-admin: the self-hosted Toolshop UI and API as the Admin test account

```yaml
match: ["url:http://localhost:4200/", "url:http://localhost:8091/"]
via: file:.qa/.auth/local-admin.password
host: localhost
identifiers: {user: admin@practicesoftwaretesting.com, login_url: "http://localhost:4200/auth/login"}
role: Admin
credential_from: "Publicly documented Toolshop practice account, README 'Seeded state and test accounts' / upstream README 'Default accounts'"
sources: [human:kinasr]
added: 2026-11-07
```

Self-hosted fallback (primary target); start it with `npm run fallback:start`, return it to the seeded state with `npm run fallback:reset`. The API takes the bearer token returned by POST /users/login, obtained by logging in per run.

### acc_local-user: the self-hosted Toolshop UI and API as the User test account

```yaml
match: ["url:http://localhost:4200/", "url:http://localhost:8091/"]
via: file:.qa/.auth/local-user.password
host: localhost
identifiers: {user: customer@practicesoftwaretesting.com, login_url: "http://localhost:4200/auth/login"}
role: User
credential_from: "Publicly documented Toolshop practice account, README 'Seeded state and test accounts' / upstream README 'Default accounts'"
sources: [human:kinasr]
added: 2026-11-07
```

Self-hosted fallback (primary target); start it with `npm run fallback:start`, return it to the seeded state with `npm run fallback:reset`. The API takes the bearer token returned by POST /users/login, obtained by logging in per run.

### acc_local-observer: the self-hosted Toolshop UI and API as the role-less account observe: uses

```yaml
match: ["url:http://localhost:4200/", "url:http://localhost:8091/"]
via: file:.qa/.auth/local-observer.password
host: localhost
identifiers: {user: customer2@practicesoftwaretesting.com, login_url: "http://localhost:4200/auth/login"}
credential_from: "Publicly documented Toolshop practice account, README 'Seeded state and test accounts' / upstream README 'Default accounts'"
sources: [human:kinasr]
added: 2026-11-07
```

Self-hosted fallback (primary target); start it with `npm run fallback:start`, return it to the seeded state with `npm run fallback:reset`. The API takes the bearer token returned by POST /users/login, obtained by logging in per run.

### acc_public-admin: the public Toolshop UI and API as the Admin test account

```yaml
match: ["url:https://practicesoftwaretesting.com/", "url:https://api.practicesoftwaretesting.com/"]
via: file:.qa/.auth/public-admin.password
host: practicesoftwaretesting.com
identifiers: {user: admin@practicesoftwaretesting.com, login_url: "https://practicesoftwaretesting.com/auth/login"}
role: Admin
credential_from: "Publicly documented Toolshop practice account, README 'Seeded state and test accounts' / upstream README 'Default accounts'"
sources: [human:kinasr]
added: 2026-11-07
```

Public site removes all user data every hour; use only for a Run that fits inside that window. The API takes the bearer token returned by POST /users/login, obtained by logging in per run.

### acc_public-user: the public Toolshop UI and API as the User test account

```yaml
match: ["url:https://practicesoftwaretesting.com/", "url:https://api.practicesoftwaretesting.com/"]
via: file:.qa/.auth/public-user.password
host: practicesoftwaretesting.com
identifiers: {user: customer@practicesoftwaretesting.com, login_url: "https://practicesoftwaretesting.com/auth/login"}
role: User
credential_from: "Publicly documented Toolshop practice account, README 'Seeded state and test accounts' / upstream README 'Default accounts'"
sources: [human:kinasr]
added: 2026-11-07
```

Public site removes all user data every hour; use only for a Run that fits inside that window. The API takes the bearer token returned by POST /users/login, obtained by logging in per run.

### acc_public-observer: the public Toolshop UI and API as the role-less account observe: uses

```yaml
match: ["url:https://practicesoftwaretesting.com/", "url:https://api.practicesoftwaretesting.com/"]
via: file:.qa/.auth/public-observer.password
host: practicesoftwaretesting.com
identifiers: {user: customer2@practicesoftwaretesting.com, login_url: "https://practicesoftwaretesting.com/auth/login"}
credential_from: "Publicly documented Toolshop practice account, README 'Seeded state and test accounts' / upstream README 'Default accounts'"
sources: [human:kinasr]
added: 2026-11-07
```

Public site removes all user data every hour; use only for a Run that fits inside that window. The API takes the bearer token returned by POST /users/login, obtained by logging in per run.

