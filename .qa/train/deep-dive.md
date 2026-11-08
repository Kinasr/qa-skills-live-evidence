---
type: train
key: deep-dive
---

# Deep-dive

### prc_bare-api-paths: Read bare API paths given as inputs (such as `/users/login`) as operations in the Toolshop OpenAPI contract at `url:http://localhost:8091/docs?api-docs.json`; take that contract as the Reference and propose `--focus` on the named operations.

```yaml
sources: [human:kinasr]
added: 2026-11-08
```

Bare paths would otherwise be inferred as repo files and fail intake. The contract is what the
Swagger UI at `http://localhost:8091/api/documentation` loads.

```markdown
/qa-deep-dive login apis /users/login /users/logout
→ url:http://localhost:8091/docs?api-docs.json, --focus on POST /users/login and GET /users/logout
```

### prc_bare-app-url-observe: Treat a bare URL to a page of the running app (such as `http://localhost:4200/auth/login`) as an `observe:` input, never a `url:` Reference; derive the "what to look at" request from the Feature and confirm it in the plan.

```yaml
sources: [human:kinasr]
added: 2026-11-08
```

Fetching an app page as `url:` returns only the empty Angular shell.
