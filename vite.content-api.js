import fs from "node:fs";
import path from "node:path";

// Local-only content API used by the /admin panel.
//
// - GET  /api/content        -> current saved content (or defaults if no
//                                content.json exists yet)
// - PUT  /api/content        -> overwrite content.json, requires header
//                                "x-admin-token" to match ADMIN_TOKEN
// - POST /api/content/login  -> { token } -> { ok: true } if it matches
//
// This is intentionally simple: a single shared token, no sessions, no
// hashing. It's meant for one person editing their own club site from
// localhost — NOT for a publicly deployed admin panel. If this ever runs
// on a real server, replace it with real auth before exposing it.
const CONTENT_FILE = path.resolve(process.cwd(), "content.json");
const ADMIN_TOKEN = process.env.TRS_ADMIN_TOKEN || "trsbvm";

function readContent() {
  if (fs.existsSync(CONTENT_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(CONTENT_FILE, "utf-8"));
    } catch {
      return null;
    }
  }
  return null;
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => (data += chunk));
    req.on("end", () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch (err) {
        reject(err);
      }
    });
    req.on("error", reject);
  });
}

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
}

function attachMiddleware(server) {
  server.middlewares.use(async (req, res, next) => {
    if (!req.url.startsWith("/api/content")) return next();

    if (req.method === "GET" && req.url === "/api/content") {
      const content = readContent();
      return send(res, 200, { content, hasSavedContent: content !== null });
    }

    if (req.method === "PUT" && req.url === "/api/content") {
      const token = req.headers["x-admin-token"];
      if (token !== ADMIN_TOKEN) {
        return send(res, 401, { error: "Invalid admin token." });
      }
      try {
        const body = await readBody(req);
        fs.writeFileSync(CONTENT_FILE, JSON.stringify(body, null, 2), "utf-8");
        return send(res, 200, { ok: true });
      } catch (err) {
        return send(res, 400, { error: "Invalid JSON body: " + err.message });
      }
    }

    if (req.method === "POST" && req.url === "/api/content/login") {
      try {
        const body = await readBody(req);
        return send(res, 200, { ok: body.token === ADMIN_TOKEN });
      } catch (err) {
        return send(res, 400, { error: "Invalid JSON body: " + err.message });
      }
    }

    return next();
  });
}

export function contentApiPlugin() {
  return {
    name: "trs-content-api",
    configureServer: attachMiddleware,
    configurePreviewServer: attachMiddleware,
  };
}
