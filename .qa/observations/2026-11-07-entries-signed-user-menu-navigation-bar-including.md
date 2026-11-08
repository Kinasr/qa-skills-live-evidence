---
type: observation
observed_at: 2026-11-07
url: http://localhost:4200/account
app_version: "v6.0.0"
request: "the entries in the signed-in user's menu in the navigation bar, including sign out, and where each entry leads"
---

## Steps

1. `playwright-cli -s=qa-scout-2eYmVI open`
2. `playwright-cli -s=qa-scout-2eYmVI state-load login-state.json`
3. `playwright-cli -s=qa-scout-2eYmVI goto http://localhost:4200/account`
4. `playwright-cli -s=qa-scout-2eYmVI snapshot`
5. `playwright-cli -s=qa-scout-2eYmVI hover e63`
6. `playwright-cli -s=qa-scout-2eYmVI snapshot`
7. `playwright-cli -s=qa-scout-2eYmVI close`

## Facts

1. On /account the page title is "Overview - Practice Software Testing - Toolshop - v5.0" and the heading is "My account" with the text "Here you can manage your profile, favorites and orders."
2. On /account the footer shows "v6.0.0 | Built 2026-07-05 | Angular 20.0.5".
3. On /account the navigation bar's main menu holds the link "Home" (to /), the button "Categories", the link "Contact" (to /contact) and a menu item with the button "Jack Howe"; a button "Select language" showing "EN" sits beside the menu.
4. On /account the page body shows four buttons with no accessible name under the "My account" heading.
5. On /account hovering the "Jack Howe" button showed no menu: the snapshot taken after the hover lists no entries under it.

## Not seen

1. The entries of the "Jack Howe" user menu, sign out included, and where each leads: the menu is a button that opens only on a click, and the read-only rules allow clicking only links, tabs and comboboxes.
