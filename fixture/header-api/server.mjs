#!/usr/bin/env node
// Header-credential fixture app for the qa-skills live evidence (Header credentials row).
//
// One process, two origins, so each Access note shape covers an origin of its own:
//   http://localhost:8095  the API origin, for the header-only note (header_via, no via)
//   http://localhost:8096  the app origin, for the shared note (via plus header_via)
// Both serve the same routes:
//   GET  /            a page; on the app origin it says who is signed in, or links to /login
//   GET  /login       a single form of user name and password
//   POST /login       sets a session cookie and redirects to /
//   GET  /api/echo    requires `Authorization: Bearer <FIXTURE_API_TOKEN>`; echoes the request
//                     headers it received (200 when the header matches, 401 otherwise)
//   GET  /api/revoked always 401, as if the configured key had been revoked; echoes the same way
// Each echo carries the headers twice: `received_headers` as an object (name -> value) and
// `raw_headers` as "name: value" lines, so a credential is also echoed under no header-named key.
//
// The secrets are throwaway values read from the git-ignored Auth file `.qa/auth`
// (FIXTURE_API_TOKEN, FIXTURE_APP_PASSWORD). This server never prints them.
import { createServer } from "node:http";
import { randomUUID } from "node:crypto";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const API_PORT = Number(process.env.FIXTURE_API_PORT ?? 8095);
const APP_PORT = Number(process.env.FIXTURE_APP_PORT ?? 8096);
const USER = "fixture-tester";

function authValue(key) {
  let text;
  try {
    text = readFileSync(join(ROOT, ".qa", "auth"), "utf8");
  } catch {
    return "";
  }
  for (const line of text.split("\n")) {
    if (line.startsWith("#")) continue;
    const at = line.indexOf("=");
    if (at > 0 && line.slice(0, at) === key) return line.slice(at + 1);
  }
  return "";
}

const TOKEN = authValue("FIXTURE_API_TOKEN");
const PASSWORD = authValue("FIXTURE_APP_PASSWORD");
if (!TOKEN || !PASSWORD) {
  console.error("Set FIXTURE_API_TOKEN and FIXTURE_APP_PASSWORD in .qa/auth (see fixture/header-api/README.md).");
  process.exit(2);
}

const sessions = new Map(); // session id -> user

function cookieSession(req) {
  const match = /(?:^|;\s*)fixture_session=([^;]+)/.exec(req.headers.cookie ?? "");
  return match ? sessions.get(match[1]) ?? null : null;
}

function page(res, status, title, body) {
  res.writeHead(status, { "content-type": "text/html; charset=utf-8" });
  res.end(`<!doctype html><html><head><meta charset="utf-8"><title>${title}</title></head><body>${body}</body></html>`);
}

function json(res, status, data) {
  res.writeHead(status, { "content-type": "application/json" });
  res.end(`${JSON.stringify(data, null, 2)}\n`);
}

function readBody(req) {
  return new Promise((resolve) => {
    let data = "";
    req.on("data", (chunk) => (data += chunk));
    req.on("end", () => resolve(data));
  });
}

async function handle(req, res, origin) {
  const url = new URL(req.url ?? "/", `http://${req.headers.host}`);
  const user = cookieSession(req);
  if (req.method === "GET" && url.pathname === "/") {
    return user
      ? page(res, 200, "Fixture home", `<h1>Fixture home</h1><p id="who">Signed in as ${user}</p><p>Origin: ${origin}</p>`)
      : page(res, 200, "Fixture home", `<h1>Fixture home</h1><p id="who">Not signed in</p><p><a href="/login">Sign in</a></p>`);
  }
  if (req.method === "GET" && url.pathname === "/login") {
    return page(res, 200, "Sign in", `<h1>Sign in</h1><form method="post" action="/login">
<label>User name <input name="username" autocomplete="username"></label>
<label>Password <input name="password" type="password" autocomplete="current-password"></label>
<button type="submit">Sign in</button></form>`);
  }
  if (req.method === "POST" && url.pathname === "/login") {
    const form = new URLSearchParams(await readBody(req));
    if (form.get("username") === USER && form.get("password") === PASSWORD) {
      const id = randomUUID();
      sessions.set(id, USER);
      res.writeHead(303, { location: "/", "set-cookie": `fixture_session=${id}; Path=/; HttpOnly; SameSite=Lax` });
      return res.end();
    }
    return page(res, 401, "Sign in", `<h1>Sign in</h1><p role="alert">Wrong user name or password</p><p><a href="/login">Try again</a></p>`);
  }
  if (url.pathname === "/api/echo" || url.pathname === "/api/revoked") {
    // Echo every header received, the session cookie's value replaced by whether it named a session.
    const received = { ...req.headers };
    if (received.cookie !== undefined) received.cookie = user ? `<session of ${user}>` : "<no session>";
    const raw = [];
    for (let i = 0; i < req.rawHeaders.length; i += 2) {
      const name = req.rawHeaders[i].toLowerCase();
      raw.push(`${name}: ${name === "cookie" ? received.cookie : req.rawHeaders[i + 1]}`);
    }
    const authorized = url.pathname === "/api/echo" && req.headers.authorization === `Bearer ${TOKEN}`;
    return json(res, authorized ? 200 : 401, {
      authorized,
      origin,
      method: req.method,
      session_user: user,
      received_headers: received,
      raw_headers: raw,
      // The Authorization value as received, and without its first word, under a key that names no
      // credential: an API that echoes the key back in an ordinary field.
      echoed: req.headers.authorization === undefined ? [] : [req.headers.authorization, req.headers.authorization.replace(/^\S+\s+/, "")],
    });
  }
  return json(res, 404, { error: "not found", path: url.pathname });
}

for (const [port, origin] of [[API_PORT, `http://localhost:${API_PORT}`], [APP_PORT, `http://localhost:${APP_PORT}`]]) {
  // Loopback only, on both address families, so `localhost` reaches it however it resolves.
  for (const host of ["127.0.0.1", "::1"]) {
    createServer((req, res) => {
      handle(req, res, origin).catch(() => json(res, 500, { error: "fixture error" }));
    }).listen(port, host, () => console.log(`fixture listening on ${origin} (${host})`));
  }
}
