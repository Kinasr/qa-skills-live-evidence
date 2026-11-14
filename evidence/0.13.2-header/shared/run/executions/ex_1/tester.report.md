```yaml
result: passed
reached: 3
preconditions:
  - text: Signed in to the fixture app as its test account
    status: checked
    how: home page showed the test account signed in
```

**Evidence.** Home page said "Signed in as fixture-tester". GET /api/echo answered 200 with authorized true, signed_in_as fixture-tester, and received_headers listing an authorization header. Console showed no errors.
