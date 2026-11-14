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

### acc_fixture-api: the header-credential fixture's API origin, header-only

```yaml
match: ["url:http://localhost:8095/"]
header_via: auth:FIXTURE_API_TOKEN
identifiers: {header: Authorization, scheme: Bearer}
credential_from: "A throwaway value the maintainer generates for the local fixture app; see fixture/header-api/README.md"
sources: [human:kinasr]
added: 2026-11-14
```

The local fixture app (`npm run fixture:start`) for the Header-credentials live evidence. This origin has no login: a header-only session sends `tester request` calls with the CLI-injected `Authorization: Bearer` header, and `/api/echo` echoes back the headers it received.

### acc_fixture-app: the header-credential fixture's app origin, UI login plus header

```yaml
match: ["url:http://localhost:8096/"]
via: auth:FIXTURE_APP_PASSWORD
header_via: auth:FIXTURE_API_TOKEN
identifiers: {user: fixture-tester, login_url: "http://localhost:8096/login", header: Authorization, scheme: Bearer}
credential_from: "A throwaway value the maintainer generates for the local fixture app; see fixture/header-api/README.md"
sources: [human:kinasr]
added: 2026-11-14
```

The same fixture app on its app origin. A single form takes user name and password on /login and sets a session cookie; `tester request` calls carry that session and the CLI-injected `Authorization: Bearer` header.
