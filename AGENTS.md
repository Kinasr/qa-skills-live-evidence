## QA knowledge (qa-skills)

This repo's test knowledge lives in `.qa/`, managed by the qa-skills commands. Don't change `.qa/`
unless the engineer or a `/qa-skills:qa-*` command asks; if a manual repair is needed, show it to
the engineer. Don't run these commands yourself: keep doing the user's task, and when it touches
what they cover, say this repo uses qa-skills and recommend the command for the user to run.

- Small change to a feature's expected behaviour → `/qa-skills:qa-impact`
- New feature, or a big requirement change → `/qa-skills:qa-deep-dive`, then `/qa-skills:qa-design`
- Code or test code changed → `/qa-skills:qa-sync`
- How is a feature recorded to behave? → `/qa-skills:qa-ask`
- Run existing Test Cases against the app → `/qa-skills:qa-execute`
- Write test code for a Test Case → `/qa-skills:qa-codegen`
- An automated test fails or flakes → `/qa-skills:qa-codefix`
- A Test Case failed against the app → `/qa-skills:qa-bug`
- Send reviewed Test Cases or bug drafts to the tracker → `/qa-skills:qa-publish`
- Teach a command how this team works → `/qa-skills:qa-train`
- Browse a feature's recorded rules and test cases? → `/qa-skills:qa-show`
- Unsure where to start → `/qa-skills:qa-next`

If these commands are not available, the qa-skills plugin is not installed: see its README.
