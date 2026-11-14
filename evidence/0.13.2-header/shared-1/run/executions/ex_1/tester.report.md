```yaml
result: blocked
reason: step
reached: 3
preconditions:
  - text: Signed in to the fixture app as its test account
    status: checked
    how: the home page showed a signed-in user and the API call was answered with a session
```

**Why.** The home page said "Signed in as fixture-tester". GET /api/echo was answered 200 with authorized true, and received_headers listed an authorization header. But the value of session_user came back as "<redacted>" in both the command output and the saved response, so I could not see that it names the test account. That clause cannot be judged from what the tester shows, so the case is Blocked rather than guessed.

**Evidence.** Console showed 0 messages, 0 errors.
