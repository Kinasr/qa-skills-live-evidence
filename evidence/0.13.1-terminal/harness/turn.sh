#!/bin/bash
# Usage: turn.sh <label> <prompt> [session-id]
# Runs one headless Claude Code turn in the evidence project with the installed qa-skills@qa-skills-local 0.13.1 on Claude Code 2.1.308,
# logs the JSON result, and prints session id + result text.
set -u
R=~/.qa-runs/evidence-0.13.1
P=/Users/kinasr/projects/qa-skills-live-evidence
label="$1"; prompt="$2"; sid="${3:-}"
n=$(ls "$R/turns" | wc -l | tr -d ' ')
out="$R/turns/$(printf '%03d' "$n")-$label.json"
args=(-p "$prompt" 
  --permission-mode acceptEdits --output-format json --add-dir /var/folders/1f/1165vl517sxc96vr6k7ryry40000gn/T /private/tmp/claude-501
  --allowedTools "Read" "Edit" "Write" "Glob" "Grep" "Agent" "Task" "Skill" "TodoWrite"
  "Bash(node:*)" "Bash(npm:*)" "Bash(npx:*)" "Bash(git:*)" "Bash(playwright-cli:*)" "Bash(curl:*)"
  "Bash(ls:*)" "Bash(cat:*)" "Bash(cd:*)" "Bash(echo:*)" "Bash(mkdir:*)" "Bash(python3:*)" "Bash(grep:*)" "Bash(head:*)" "Bash(tail:*)" "Bash(wc:*)")
[ -n "$sid" ] && args+=(--resume "$sid")
cd "$P" && DISABLE_AUTOUPDATER=1 $R/cc308/node_modules/.bin/claude "${args[@]}" > "$out" 2> "$out.err"
code=$?
python3 - "$out" "$code" <<'PY'
import json,sys
p,code=sys.argv[1],sys.argv[2]
try:
    d=json.load(open(p))
except Exception as e:
    print(f"EXIT {code}; unparsable output ({e})"); sys.exit()
print(f"EXIT {code} | session {d.get('session_id')} | turns {d.get('num_turns')} | {d.get('duration_ms',0)//1000}s | cost ${d.get('total_cost_usd',0):.2f} | denials {len(d.get('permission_denials',[]))}")
for x in d.get('permission_denials',[]):
    print("  DENIED", x.get('tool_name'), json.dumps(x.get('tool_input'))[:200])
print("----"); print(d.get('result',''))
PY
