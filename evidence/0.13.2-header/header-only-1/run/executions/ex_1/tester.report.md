```yaml
result: passed
reached: 4
interpretations:
  - "expected: console read after the last step → skipped because the case was api-mode request-only, with no browser page"
```

**Evidence.** GET /api/echo with the default credential returned 200, authorized true, and received_headers listed an authorization header (value redacted). GET /api/echo with an invalid credential returned 401 with authorized false.
