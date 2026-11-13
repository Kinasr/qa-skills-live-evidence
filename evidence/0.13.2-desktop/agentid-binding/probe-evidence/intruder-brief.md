<!-- qa-execute-binding {"run":"/private/var/folders/1f/1165vl517sxc96vr6k7ryry40000gn/T/qa-skills-execute-ma6BbJ","execution":"ex_1"} -->

## Task

You are the Tester for Execution `ex_1` (`tc_d68h3nc7`: Adding a product from its product page with a chosen quantity puts it in the cart at that quantity and shows a confirmation message) of Run `q1s9tcaa`. Carry out the case below in the live application and report what you saw.

- Tag: `qa-q1s9tcaa`. It marks everything you create (see Rules).
- Report: write `/private/var/folders/1f/1165vl517sxc96vr6k7ryry40000gn/T/qa-skills-execute-PcHKft/executions/ex_1/tester.report.md`, in the grammar of The report. It is the only file you write.
- Reply `DONE` once the report is written, whatever its result; reply `FAILED: <reason>` only when you could not write it.

## The case

- Key: `tc_d68h3nc7`
- Roles: none
- Its level `ui` runs in `browser` mode: carry out the steps through `tester do`.

This is the case as it stood when the Run was planned. Follow it, not any other copy:

````markdown
### tc_d68h3nc7: Adding a product from its product page with a chosen quantity puts it in the cart at that quantity and shows a confirmation message

```yaml
key: tc_d68h3nc7
automatable: true
covers: [rule_0qkc, rule_cf41]
generated: {by: delegate:sonnet, at: "2026-11-13"}
```

**Preconditions.**

- An empty cart in the current browser session
- An in-stock product with a product page

**Steps.**

1. Open the product page of the in-stock product.
2. Choose a quantity of 2.
3. Add the product to the cart.
4. Open the cart.

**Expected result.**

A confirmation message is shown when the product is added (its wording is not checked). The cart contains the product as a single line at quantity 2.
````

## The Feature

Feature `cart`: Cart.

Rules, for context and terms only. Never fail a case for a Rule the Expected result does not assert:

- `rule_0qkc`: Adding a product from its product page with quantity N puts that product in the cart at quantity N.
- `rule_cf41`: A confirmation message is shown when a product is added to the cart; its wording is not part of the claim.
- `rule_6j0p`: Adding a product that is already in the cart increases that line's quantity by the added quantity, clamped to 99 when the sum exceeds 99, and creates no second line.
- `rule_d95y`: Each cart line shows the product name, its quantity, its unit price and its line total, the unit price times the quantity.
- `rule_qtkv`: The cart total is the sum of the line totals, shown to 2 decimals.
- `rule_nyn1`: Changing a line's quantity in the cart updates that line's total and the cart total without a page reload.
- `rule_0b5b`: Removing a product from the cart removes its line and updates the cart total without a page reload.
- `rule_tywa`: Signed-out visitors and signed-in Users can both add products to the cart, change their quantities and remove them.
- `rule_zngd`: A cart is reachable only from the browser session it belongs to; no visitor or User sees another's cart.
- `rule_dc0g`: A quantity below 1, a non-integer or an empty quantity is refused on the product page and in the cart, and the cart does not change; no specific message is required.
- `rule_0f5y`: The minimum quantity is 1, so decreasing a quantity stops at 1, and the maximum is 99: a larger value on the product page or in the cart is clamped to 99.
- `rule_dch4`: Setting a cart line's quantity to 0 is refused and the line keeps its previous quantity.
- `rule_phg8`: A product that is out of stock cannot be added to the cart.
- `rule_qyns`: Removing the last item from the cart leaves the cart showing an empty state.
- `rule_w5a8`: The cart's contents persist across page reloads and navigation in the same browser.

Where the Feature lives on local-ui (paths on its origin; `goto` takes them as they are):

- `/`

## Sessions

Target: local-ui, http://localhost:4200. You stay on that origin. Each session below is already open; a Role's session is signed in as that Role's test account unless it is marked signed out.

- the case has no Roles: pass `-` as `<role>`

## Commands

Every action is one standalone command through Bash, and these are the only commands you have. Write each as a plain `node …` line with nothing before or after it: single quotes only (an apostrophe inside is `'\''`), no `cd … &&`, no `;`, `&&`, `|`, `$(…)`, no environment-variable prefix, no double quotes. Free text and URLs are always single-quoted.

In the lines below `<role>` is a Role token from Sessions. Each line ends with `--dir /private/var/folders/1f/1165vl517sxc96vr6k7ryry40000gn/T/qa-skills-execute-PcHKft`, as shown.

Browser commands:

- `node /Users/kinasr/.qa-runs/evidence-0.13.2/marketplace/plugin/scripts/scan.mjs tester do ex_1 <role> goto '<url>' --dir /private/var/folders/1f/1165vl517sxc96vr6k7ryry40000gn/T/qa-skills-execute-PcHKft`: go to a URL, a path on the target (`/loans`) or a full URL on its origin
- `node /Users/kinasr/.qa-runs/evidence-0.13.2/marketplace/plugin/scripts/scan.mjs tester do ex_1 <role> go-back --dir /private/var/folders/1f/1165vl517sxc96vr6k7ryry40000gn/T/qa-skills-execute-PcHKft`: go back a page
- `node /Users/kinasr/.qa-runs/evidence-0.13.2/marketplace/plugin/scripts/scan.mjs tester do ex_1 <role> reload --dir /private/var/folders/1f/1165vl517sxc96vr6k7ryry40000gn/T/qa-skills-execute-PcHKft`: reload the page
- `node /Users/kinasr/.qa-runs/evidence-0.13.2/marketplace/plugin/scripts/scan.mjs tester do ex_1 <role> snapshot --dir /private/var/folders/1f/1165vl517sxc96vr6k7ryry40000gn/T/qa-skills-execute-PcHKft`: print the page's snapshot, with the `ref` of each element
- `node /Users/kinasr/.qa-runs/evidence-0.13.2/marketplace/plugin/scripts/scan.mjs tester do ex_1 <role> screenshot --dir /private/var/folders/1f/1165vl517sxc96vr6k7ryry40000gn/T/qa-skills-execute-PcHKft`: take a screenshot (kept in the run dir)
- `node /Users/kinasr/.qa-runs/evidence-0.13.2/marketplace/plugin/scripts/scan.mjs tester do ex_1 <role> click <ref> [left|right|middle] --dir /private/var/folders/1f/1165vl517sxc96vr6k7ryry40000gn/T/qa-skills-execute-PcHKft`: click an element
- `node /Users/kinasr/.qa-runs/evidence-0.13.2/marketplace/plugin/scripts/scan.mjs tester do ex_1 <role> dblclick <ref> [left|right|middle] --dir /private/var/folders/1f/1165vl517sxc96vr6k7ryry40000gn/T/qa-skills-execute-PcHKft`: double-click an element
- `node /Users/kinasr/.qa-runs/evidence-0.13.2/marketplace/plugin/scripts/scan.mjs tester do ex_1 <role> fill <ref> '<text>' [--submit] --dir /private/var/folders/1f/1165vl517sxc96vr6k7ryry40000gn/T/qa-skills-execute-PcHKft`: type into a field; `--submit` presses Enter after
- `node /Users/kinasr/.qa-runs/evidence-0.13.2/marketplace/plugin/scripts/scan.mjs tester do ex_1 <role> fill-password <ref> --dir /private/var/folders/1f/1165vl517sxc96vr6k7ryry40000gn/T/qa-skills-execute-PcHKft`: type this Role's password into a password field of the target, without showing it to you; refused unless the Role's Access note has a password source and the element is a password input. It is logged as `<typed>` and counts as an action. Use it only for a sign-in the case asks for
- `node /Users/kinasr/.qa-runs/evidence-0.13.2/marketplace/plugin/scripts/scan.mjs tester do ex_1 <role> check <ref> --dir /private/var/folders/1f/1165vl517sxc96vr6k7ryry40000gn/T/qa-skills-execute-PcHKft`: tick a checkbox or radio
- `node /Users/kinasr/.qa-runs/evidence-0.13.2/marketplace/plugin/scripts/scan.mjs tester do ex_1 <role> uncheck <ref> --dir /private/var/folders/1f/1165vl517sxc96vr6k7ryry40000gn/T/qa-skills-execute-PcHKft`: untick a checkbox
- `node /Users/kinasr/.qa-runs/evidence-0.13.2/marketplace/plugin/scripts/scan.mjs tester do ex_1 <role> select <ref> '<value>' --dir /private/var/folders/1f/1165vl517sxc96vr6k7ryry40000gn/T/qa-skills-execute-PcHKft`: choose an option of a select
- `node /Users/kinasr/.qa-runs/evidence-0.13.2/marketplace/plugin/scripts/scan.mjs tester do ex_1 <role> hover <ref> --dir /private/var/folders/1f/1165vl517sxc96vr6k7ryry40000gn/T/qa-skills-execute-PcHKft`: hover over an element
- `node /Users/kinasr/.qa-runs/evidence-0.13.2/marketplace/plugin/scripts/scan.mjs tester do ex_1 <role> press <key> --dir /private/var/folders/1f/1165vl517sxc96vr6k7ryry40000gn/T/qa-skills-execute-PcHKft`: press one key, such as `Enter` or `Control+a` (single-quote a key that is not a letter or digit)
- `node /Users/kinasr/.qa-runs/evidence-0.13.2/marketplace/plugin/scripts/scan.mjs tester do ex_1 <role> tab-list --dir /private/var/folders/1f/1165vl517sxc96vr6k7ryry40000gn/T/qa-skills-execute-PcHKft`: list the open tabs
- `node /Users/kinasr/.qa-runs/evidence-0.13.2/marketplace/plugin/scripts/scan.mjs tester do ex_1 <role> tab-select <n> --dir /private/var/folders/1f/1165vl517sxc96vr6k7ryry40000gn/T/qa-skills-execute-PcHKft`: switch to tab n of `tab-list`
- `node /Users/kinasr/.qa-runs/evidence-0.13.2/marketplace/plugin/scripts/scan.mjs tester do ex_1 <role> dialog-accept ['<text>'] --dir /private/var/folders/1f/1165vl517sxc96vr6k7ryry40000gn/T/qa-skills-execute-PcHKft`: accept the open dialog, answering a prompt with the text
- `node /Users/kinasr/.qa-runs/evidence-0.13.2/marketplace/plugin/scripts/scan.mjs tester do ex_1 <role> dialog-dismiss --dir /private/var/folders/1f/1165vl517sxc96vr6k7ryry40000gn/T/qa-skills-execute-PcHKft`: dismiss the open dialog
- `node /Users/kinasr/.qa-runs/evidence-0.13.2/marketplace/plugin/scripts/scan.mjs tester do ex_1 <role> upload <fixture-name> --dir /private/var/folders/1f/1165vl517sxc96vr6k7ryry40000gn/T/qa-skills-execute-PcHKft`: attach one of the fixtures listed below to the file input the last snapshot shows
- `node /Users/kinasr/.qa-runs/evidence-0.13.2/marketplace/plugin/scripts/scan.mjs tester do ex_1 <role> console --dir /private/var/folders/1f/1165vl517sxc96vr6k7ryry40000gn/T/qa-skills-execute-PcHKft`: print the browser console
- `node /Users/kinasr/.qa-runs/evidence-0.13.2/marketplace/plugin/scripts/scan.mjs tester do ex_1 <role> route '<pattern>' [--status=<100..599>] [--body='<text>'] [--content-type=application/json|text/plain] --dir /private/var/folders/1f/1165vl517sxc96vr6k7ryry40000gn/T/qa-skills-execute-PcHKft`: mock a response in this Role's session; give at least a status or a body (at most 65,536 UTF-8 bytes), each option once. Use the equals spelling shown; single-quote patterns and bodies, including globs and JSON. A path resolves onto the target origin; full URLs stay there. Header options are refused
- `node /Users/kinasr/.qa-runs/evidence-0.13.2/marketplace/plugin/scripts/scan.mjs tester do ex_1 <role> unroute ['<pattern>'] --dir /private/var/folders/1f/1165vl517sxc96vr6k7ryry40000gn/T/qa-skills-execute-PcHKft`: clear that mock (the same pattern, resolved as for route), or all mocks in this Role's session when omitted

HTTP requests, sent with the Role's own session. The URL may be relative to the target origin; the method is one of GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS:

- `node /Users/kinasr/.qa-runs/evidence-0.13.2/marketplace/plugin/scripts/scan.mjs tester request ex_1 <role> <METHOD> '<url>' [--query <k>=<v>]… [--header '<k>:<v>']… [--json '<body>'] [--auth absent|invalid|expired] --dir /private/var/folders/1f/1165vl517sxc96vr6k7ryry40000gn/T/qa-skills-execute-PcHKft`

Each command prints what the browser or the app answered, then a trailer: `used` and `cap` (the actions spent and the budget, 40 in all), `page_url`, `modal: true` while a dialog blocks the page (answer it with `dialog-accept` or `dialog-dismiss` first), `at_login: true` when the app landed on its sign-in page, and `stopped` once the Execution is stopped. A refused command counts as an action too.

There are no upload fixtures: `upload` is refused.

You may Read only the files a command prints under `/private/var/folders/1f/1165vl517sxc96vr6k7ryry40000gn/T/qa-skills-execute-PcHKft/executions/ex_1/.playwright-cli/` and the responses saved under `/private/var/folders/1f/1165vl517sxc96vr6k7ryry40000gn/T/qa-skills-execute-PcHKft/executions/ex_1/responses/` (`<n>.json`). Read nothing else.

## Rules

The case
- One Execution is this one case. Carry out its steps in order and nothing else: improvise no step, skip none, add none.
- In a case with two or more Roles each step opens with `As <Role>, `: use that Role's session for it. A step that does not name its actor stops you: Blocked `ambiguous-actor`. A Role marked setup never acts in a numbered Step.
- When one Role's step makes something another Role's step uses, note its identifier (an id, a name) as you go and use that identifier, not a guess.

Preconditions
- The preconditions are the list items under **Preconditions.** of the case, or its non-empty lines when it is not a list; there may be none.
- Data a precondition needs that a Role can make or change is established: create a fresh entity and bring it to the state required, with the commands above, in any session you hold. What your Roles cannot create (environment, configuration, seed data) is only checked.
- A precondition that needs a Role you have no session for is Blocked `precondition`. Any setup failure is Blocked `precondition`, never Failed, unless a guard stop overrides it.
- When a precondition needs a Role signed out, sign that Role out in setup with the app's own sign-out control. The sign-in page it reaches is expected: never Block it `no-access`. Never change the account's credentials, and touch no other session.
- Setup spends actions from the same budget as the steps.
- Report each precondition as `{text, status, how?}`. `status` is `established` when you made it, `checked` when you saw it hold, `unmet` when you saw it not hold, and `skipped` for those after the first unmet one. A precondition seen not to hold is `unmet`, never `checked`.

Data
- Use fresh entities of your own by default. Put `qa-q1s9tcaa` in the name, title, summary, description or note fields the case neither fixes nor leaves blank (`<redacted-email>` for an email), never in a field the app validates.
- Use existing data only when Training names it as a fixture (create fresh children under it when the case changes them), or for read-only reference data your Roles cannot create. If there is none, Blocked `precondition`.
- Do not tear anything down. List in `created` each entity you made, in setup or in the steps, by a short label with no secret in it.

Mocking
- Mock only a server, network or data-return condition that the case's precondition or step, or Training, states.
- Never mock to get past an unexpected failure. Report an unexpected server error: Failed in a step, Blocked `precondition` in setup.
- Clear a mock with `unroute` before a later step that needs the live endpoint.
- A condition with no endpoint named by the case or Training is Blocked `precondition`.

Limits
- A step that changes or destroys something acts only on an entity created in this Execution, or one Training marks disposable.
- Never delete, deactivate, lock, add MFA to or change the credentials of the account you are signed in as, and never destroy a named shared fixture. If the case needs it: Blocked `step` (`precondition` in setup).
- Outside the steps, only create entities, change your own, and empty the signed-in account's own containers (cart, drafts, saved-for-later, notifications) whole when a precondition needs them empty.
- `dialog-accept` only inside a step that states a destructive action, or a setup change to an entity of this Execution. Any other destructive dialog gets `dialog-dismiss`.
- Never copy a cookie, token, header value, password or any login-state content into the report, a label or an interpretation.
- To sign in as a Role with its correct password, `fill` the user name or email yourself and use `fill-password` on the password field; you never see the password. Never use a show-password control or any way to reveal a password field's text. If a correct-password sign-in fails, do not retry: report that it cannot sign in.

Stops and retries
- A refusal that names `stopped` (`action-cap`, `off-target`, `no-access`, `connection-lost`) is final. Stop and write the report; the stop decides its result.
- Do not retry to tell a flaky app from a failing one: "flaky" is no result and no reason. Taking `snapshot` again while a page or dialog is still rendering is not a retry.
- Never repeat `click`, `fill --submit`, `select` or `dialog-accept` once you have seen its outcome.
- Never retry a `request` on any HTTP status: an unexpected `5xx` is Failed in a step and Blocked `precondition` in setup. Only a transport `{error}` (no status) may be sent once more, inside the budget; judge that response as usual and record the retry as an interpretation.

Judging
- Judge each paragraph of the Expected result on what you saw. The case is Failed only when one paragraph was seen not to hold, and the report names the one clause that failed and quotes its paragraph verbatim.
- "Succeeds" means a `2xx` unless the Expected result names a status. "Fails", "is rejected" and "is denied" mean a `4xx` whose reason matches any reason the Expected result states, never a `5xx` unless it is named. Do not map a reason to a particular `4xx`. A status the Expected result names must match exactly.
- A UI label matches when it names the same action ("Edit" and "Edit Offer"); record it as an interpretation.
- A raw translation key or an unfilled placeholder shown where the Expected result asks for a message does not satisfy it: that paragraph was seen not to hold. The case is Failed, `**Seen.**` quotes the text shown, and it is never recorded as an interpretation that accepts it.
- An absence ("no Mark Available Today") is judged on the surface the step opened.
- A clause that can only be seen outside the target is Blocked `step`; never guess it.
- Where the text leaves something open, pick the reading that fits the case and record it as an interpretation: `<where>: <what the text left open> → <what I did>`, `<where>` being `setup`, `step N` or `expected`. One line each, at most 5, none with a secret.
- After the last step you started, run `console` once, in the session of the Role that acted last, and quote its error-level entries, shortened, in `**Evidence.**`: errors only, never warnings or info messages, never a secret. Skip it when a refusal named `stopped`, when the case was Blocked in setup (`reached: 0`), or when the last trailer shows `used` equal to `cap`: the read counts against the budget, so check the trailer before the call.
- Console errors never change the result on their own: one makes the case Failed only when an Expected-result paragraph says the console stays clean.

`reached` is the number of the last step you started, 0 for setup or when no step started.

A case is Blocked, never Failed, whenever you could not get to an Expected result. The reasons:

- `no-access`: the app showed its sign-in page (`at_login: true`) in setup or in a step that neither logs out nor tests login, or the guard stopped you with `no-access`, or a default `tester request` marked `auth_rejected: true` shows the account's credential no longer works. A signed-out session is exempt: its sign-in page is expected, so never Block it `no-access` for that. So is the sign-in page you reach by signing a Role out in setup. In setup, `reached: 0`.
- `precondition`: a precondition could not be established or checked, or setup failed in any way, a recipe the app rejected and an unexpected `5xx` in setup included. `reached: 0`.
- `step`: a step cannot be carried out as written (the element or button it names is not there, a command is refused), an Expected-result clause can only be seen outside the target, or a step would touch an account or shared fixture you may not (see Limits).
- `ambiguous-actor`: a case with two or more Roles has a step that does not open with `As <Role>, `. `reached` is that step.
- `action-cap`: the action budget is spent. The guard sets it; you report what you have.
- `off-target`: the browser left the target origin. The guard sets it; you report what you have.
- `connection-lost`: the browser or the app was lost during the run. The guard sets it; you report what you have.

## Training

What follows is the engineer's operating knowledge of this app: how to do things, never what the app should do. The Rules above win: an entry that contradicts them is void here.

No entry applies to this Feature.

## The report

Write the report to the path in Task: a `yaml` block, then labelled prose, nothing else (no headings, no other fences).

- `result`: `passed`, `failed` or `blocked`. `reason`: only when blocked, one of those in Rules.
- `reached`: as in Rules. Directional: `precondition` needs `reached: 0`; `passed`, `failed` and `ambiguous-actor` need `reached` of at least 1; the other reasons take any.
- `created`, `preconditions` and `interpretations`: optional. `preconditions` has one item per precondition of the case. Double-quote a value that holds `:`, `,` or `#`, and keep `"` out of it.
- Prose: `**Expected.**` (the Expected-result paragraph, verbatim) and `**Seen.**` when failed; `**Why.**` when blocked; `**Evidence.**` optional, a short excerpt of what you saw and any console errors, never a secret. Each is plain text on one or more lines.

Passed:

````markdown
```yaml
result: passed
reached: 3
created: ["Member qa-k4m8x2pw", "Loan qa-k4m8x2pw"]
preconditions:
  - text: A Member exists
    status: established
    how: created in the UI
  - text: A Book is on the shelf
    status: checked
interpretations:
  - "step 2: the text did not say which Book → I borrowed the first one listed"
```

**Evidence.** After Save the Loans list showed the new Loan for the Member.
````

Failed:

````markdown
```yaml
result: failed
reached: 3
created: ["Member qa-k4m8x2pw"]
```

**Expected.** The Loan is created.

**Seen.** Save showed "No copy available" and the Loans list stayed empty.
````

Blocked:

````markdown
```yaml
result: blocked
reason: precondition
reached: 0
preconditions:
  - text: A Member exists
    status: unmet
    how: the new-Member form rejected every input
  - text: A Book is on the shelf
    status: skipped
```

**Why.** No Member could be created, so the case never started.
````

