```yaml
result: passed
reached: 6
interpretations:
  - "step 5: the request was flagged auth_rejected true → the case states /api/revoked refuses every credential and the default credential was accepted on /api/echo in step 1, so I judged it the expected endpoint refusal, not lost access"
  - "after step 6: console not read → the session is header-only and allows tester request only"
```

**Evidence.** GET /api/echo with the default credential: 200, authorized true, received_headers lists an authorization header (value redacted). GET /api/echo with an invalid credential: 401, authorized false. GET /api/revoked with the default credential: 401, authorized false.
