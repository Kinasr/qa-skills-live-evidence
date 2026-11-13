#!/bin/bash
# Usage: collect.sh <turn-log-prefix> <label> <state.json>
# Copies one probe run's graded evidence into the evidence project under
# evidence/0.13.1-terminal/<label>/ (state, prompt, saved evidence files, the grader's capture of
# the host transcripts and Run guard/binding files, the grade line, the headless result JSON).
set -eu
R=~/.qa-runs/evidence-0.13.1
P=/Users/kinasr/projects/qa-skills-live-evidence
log="$1"; label="$2"
state="$3"
sd=$(dirname "$state")
out="$P/evidence/0.13.1-terminal/$label"
mkdir -p "$out"
cp "$sd/state.json" "$sd/prompt.txt" "$out/"
[ -f "$sd/capture.json" ] && node "$R/extract.mjs" "$sd/capture.json" "$out/transcript-extract.json"
[ -d "$sd/evidence" ] && cp -R "$sd/evidence" "$out/probe-evidence"
cp "$log.grade.txt" "$out/grade.txt"
cp "$log.json" "$out/headless-result.json"
rm -f "$out"/probe-evidence/artifacts-*.txt
if grep -rlI -i "@gmail" "$out" >/dev/null; then echo "EMAIL FOUND in $out"; exit 3; fi
if grep -rl "welcome01" "$out" >/dev/null; then echo "SECRET FOUND in $out"; exit 3; fi
du -sh "$out"
