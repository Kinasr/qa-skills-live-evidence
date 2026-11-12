---
type: project
key: project
schema_version: 6
stack: {language: typescript, framework: playwright, levels: [api, ui], root: .}
annotation_map: {automation_key: [tag]}
module_paths: ["tests/api", "tests/ui", "tests/support"]
roles: [Admin, User]
role_meaning: "Toolshop accounts — User is a registered customer, Admin is the shop administrator"
tags: {e2e: "Exercises a whole user flow through the UI and API together", smoke: "A critical path a release cannot ship without", regression: "Guards behaviour that has worked before against breaking again"}
concurrency_cap: 4
commit_mode: auto
tiers: {deep: opus, standard: sonnet, light: haiku}
targets: {local-ui: "http://localhost:4200", local-api: "http://localhost:8091", public-ui: "https://practicesoftwaretesting.com", public-api: "https://api.practicesoftwaretesting.com"}
execute_levels: {api: api, ui: browser}
level_targets: {api: local-api, ui: local-ui}
test_runner: {tool: playwright, dir: ., target_env: [TOOLSHOP_UI_URL]}
code_host: {tool: gh}
---

# Project

Written by `/qa-init` on 2026-11-13 from evidence in this repository, and accepted on its card.
