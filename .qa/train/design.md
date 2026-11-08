---
type: train
key: design
---

# Design

### cnv_dedicated-account-for-state-changes: A case whose steps permanently change an account's state, such as its credentials, uses a dedicated account set up for that case alone, never the shared test account for a role, and says so in its preconditions.

```yaml
sources: [tc_8tqwxf5a, tc_80qdetpy, human:kinasr]
added: 2026-11-08
```

A case that changes a shared account breaks every later case that signs in with it. Naming the
dedicated account in the preconditions makes the setup visible to whoever runs the case.

```markdown
Preconditions: A dedicated registered account used only for this case, not the shared account for its role
```
