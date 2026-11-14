```yaml
result: passed
reached: 6
interpretations:
  - "step 5: the trailer marked auth_rejected true on /api/revoked → the case says this 401 is the expected answer and the default credential got 200 on /api/echo in step 1, so I did not treat it as lost access"
  - "expected: console not read → the session allows tester request only, and the Expected result says nothing about the console"
```

**Evidence.** GET /api/echo with the default credential: 200, authorized true, received_headers lists an authorization header (value redacted). GET /api/echo with an invalid credential: 401, authorized false. GET /api/revoked with the default credential: 401, authorized false.
