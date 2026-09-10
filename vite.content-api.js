import fs from "node:fs";
import path from "node:path";

// Local-only content API used by the /admin panel.
//
// - GET  /api/content        -> current saved content (or defaults if no
//                                content.json exists yet)
// - PUT  /api/content        -> overwrite content.json, requires header
//                                "x-admin-token" to match ADMIN_TOKEN
// - POST /api/content/login  -> { token } -> { ok: true } if it matches
// - POST /api/upload         -> { filename, mime, dataBase64 } -> saves the
//                                image under public/uploads and returns the
//                                path to put straight into a content field.
//                                Requires "x-admin-token".
//
// This is intentionally simple: a single shared token, no sessions, no
// hashing. It's meant for one person editing their own club site from
// localhost — NOT for a publicly deployed admin panel. If this ever runs
// on a real server, replace it with real auth before exposing it.
const CONTENT_FILE = path.resolve(process.cwd(), "content.json");
const UPLOADS_DIR = path.resolve(process.cwd(), "public", "uploads");
const ADMIN_TOKEN = process.env.TRS_ADMIN_TOKEN || "trsbvm";
const MAX_UPLOAD_BYTES = 8 * 1024 * 1024; // 8MB, before base64 overhead
const ALLOWED_MIME_EXT = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/svg+xml": "svg",
};

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
    if (req.method === "POST" && req.url === "/api/upload") {
      const token = req.headers["x-admin-token"];
      if (token !== ADMIN_TOKEN) {
        return send(res, 401, { error: "Invalid admin token." });
      }
      try {
        const body = await readBody(req);
        const { filename, mime, dataBase64 } = body;
        const ext = ALLOWED_MIME_EXT[mime];
        if (!ext) {
          return send(res, 400, {
            error: "Unsupported image type — use JPG, PNG, WebP or SVG.",
          });
        }
        const buffer = Buffer.from(dataBase64 || "", "base64");
        if (buffer.length === 0) {
          return send(res, 400, { error: "Empty file." });
        }
        if (buffer.length > MAX_UPLOAD_BYTES) {
          return send(res, 400, { error: "Image is larger than 8MB." });
        }
        fs.mkdirSync(UPLOADS_DIR, { recursive: true });
        const safeBase = (filename || "image")
          .replace(/\.[^.]+$/, "")
          .replace(/[^a-z0-9-]+/gi, "-")
          .toLowerCase()
          .slice(0, 40);
        const savedName = `${Date.now()}-${safeBase || "image"}.${ext}`;
        fs.writeFileSync(path.join(UPLOADS_DIR, savedName), buffer);
        return send(res, 200, { path: `/uploads/${savedName}` });
      } catch (err) {
        return send(res, 400, { error: "Upload failed: " + err.message });
      }
    }

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
