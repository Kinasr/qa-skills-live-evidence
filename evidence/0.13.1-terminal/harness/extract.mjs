// Usage: node extract.mjs <capture.json> <out.json>
// Reduces a probe capture (full host transcripts) to what a reader needs to re-check the verdict:
// every tool call and its result, per transcript (parent and each subagent), plus the captured Run
// files. Drops session context and redacts any e-mail address, so it can be committed publicly.
import { readFileSync, writeFileSync } from "node:fs";
const [input, output] = process.argv.slice(2);
const capture = JSON.parse(readFileSync(input, "utf8"));
const EMAIL = /[A-Za-z0-9._%+-]+@(?!practicesoftwaretesting\.com)[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g;
const redact = (text) => text.replace(EMAIL, "<redacted-email>");
const clip = (text, n = 4000) => (text.length > n ? `${text.slice(0, n)}…[${text.length - n} more chars]` : text);
function toolEvents(jsonl) {
  const events = [];
  for (const line of (jsonl || "").split("\n")) {
    if (!line.trim()) continue;
    let entry;
    try { entry = JSON.parse(line); } catch { continue; }
    const content = entry?.message?.content;
    if (!Array.isArray(content)) continue;
    for (const part of content) {
      if (part.type === "tool_use")
        events.push({ at: entry.timestamp, use: part.id, tool: part.name, input: part.input });
      if (part.type === "tool_result") {
        const text = typeof part.content === "string" ? part.content : JSON.stringify(part.content);
        events.push({ at: entry.timestamp, result: part.tool_use_id, is_error: !!part.is_error, content: clip(text) });
      }
    }
  }
  return events;
}
const out = {
  note: "Redacted extract of the probe capture: tool calls and results only; session context removed, e-mail addresses redacted. The verdict in grade.txt was computed from the unredacted capture.",
  readErrors: capture.readErrors,
  files: capture.files,
  parent: toolEvents(capture.parentTranscript),
  children: Object.fromEntries(Object.entries(capture.children || {}).map(([id, t]) => [id, toolEvents(t)])),
};
writeFileSync(output, redact(JSON.stringify(out, null, 2)) + "\n");
