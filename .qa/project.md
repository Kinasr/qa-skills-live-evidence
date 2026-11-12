---
type: project
key: project
schema_version: 6
stack: {language: typescript, framework: playwright, levels: [api, ui], root: .}
annotation_map: {automation_key: [tag]}
module_paths: [tests]
roles: [Admin, User]
tags: {e2e: "Drives a whole user journey end to end through the UI", smoke: "A critical path a release cannot ship without", regression: "Guards behaviour that already worked against breaking again"}
concurrency_cap: 4
tiers: {deep: opus, standard: sonnet, light: haiku}
targets: {local-ui: "http://localhost:4200", local-api: "http://localhost:8091", public-ui: "https://practicesoftwaretesting.com", public-api: "https://api.practicesoftwaretesting.com"}
execute_levels: {api: api, ui: browser}
level_targets: {api: local-api, ui: local-ui}
test_runner: {tool: playwright, dir: ., target_env: [TOOLSHOP_UI_URL, TOOLSHOP_API_URL]}
code_host: {tool: gh}
commit_mode: ask
---

# Project

Written by `/qa-init` on 2026-11-07 from evidence in this repository, and accepted on its card.
