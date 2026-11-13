#!/bin/bash
# Usage: probe.sh <mode> [selection...]
# Adapted trust-core harness for #829: the terminal CLI on Claude Code 2.1.308 (private npm
# install) with qa-skills 0.13.1 installed from the local-scope marketplace `qa-skills-local`
# (no --plugin-dir). Uses the workshop probe's installed-plugin path (--prepare-desktop /
# --grade-desktop), launches the prompt headless, then grades the saved session.
set -u
R=~/.qa-runs/evidence-0.13.1
W=/Users/kinasr/projects/qa-skills/.claude/worktrees/grill-891-105fe7
P=/Users/kinasr/projects/qa-skills-live-evidence
C=$R/cc308/node_modules/.bin/claude
mode="$1"; shift
sel=("$@"); [ ${#sel[@]} -eq 0 ] && sel=(tc_d68h3nc7 level:ui)
export DISABLE_AUTOUPDATER=1 QA_LIVE_PROBE=1
export QA_LIVE_PROBE_PLUGIN_DIR=$R/marketplace/plugin
export QA_LIVE_PROBE_REVISION="0.13.1 @ b550c9c"
export QA_LIVE_PROBE_OS="macOS 27.2.1"
n=$(ls "$R/turns" | wc -l | tr -d ' ')
log="$R/turns/$(printf '%03d' "$n")-$mode"
if [ -n "${STATE:-}" ]; then
  state=$STATE; : > "$log.prepare.txt"
else
  node "$W/scripts/probe-trust-core.mjs" --prepare-desktop --mode "$mode" "$P" "${sel[@]}" > "$log.prepare.txt" || { cat "$log.prepare.txt"; exit 1; }
  state=$(sed -n 's/^state: //p' "$log.prepare.txt" | head -1)
fi
sd=$(dirname "$state")
sid=$(node -e 'console.log(JSON.parse(require("fs").readFileSync(process.argv[1])).sessionId)' "$state")
plugin=$(node -e 'console.log(JSON.parse(require("fs").readFileSync(process.argv[1])).context.pluginDir)' "$state")
echo "state $state | session $sid | plugin $plugin"
if grep -q "^Engineer steps" "$log.prepare.txt"; then
  echo "ENGINEER STEPS REQUIRED — see $log.prepare.txt; rerun with PROBE_LAUNCH=1 STATE=$state after applying"
  [ "${PROBE_LAUNCH:-}" = 1 ] || exit 2
fi
cd "$P" && "$C" -p "$(cat "$sd/prompt.txt")" --output-format json --permission-mode dontAsk \
  --allowedTools Bash Read Write Agent Task TaskOutput --session-id "$sid" \
  --add-dir "$(dirname "$sd")" --add-dir "$plugin" > "$log.json" 2> "$log.err"
echo "claude exit $?"
enc=$(echo "$P" | sed 's/[^a-zA-Z0-9]/-/g')
node "$W/scripts/probe-trust-core.mjs" --grade-desktop "$state" ~/.claude/projects/$enc/$sid.jsonl 2.1.308 | tee "$log.grade.txt"
