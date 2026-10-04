// GitHub Pages has no server-side router, so a direct visit to /events or
// /contact would answer with a "404" status (the page still loads, but link
// previews and search engines treat it as missing). Writing a copy of
// index.html at every route makes each one a real page that answers 200.
import fs from "node:fs";
import path from "node:path";

const dist = "dist";
const html = fs.readFileSync(path.join(dist, "index.html"), "utf-8");
const content = JSON.parse(fs.readFileSync("content.json", "utf-8"));

const routes = [
  "explore",
  "committee",
  "faculty",
  "events",
  "projects",
  "achievements",
  "workshops",
  "join",
  "contact",
  ...(content.events?.items ?? []).map((e) => `events/${e.id}`),
  ...(content.projects?.items ?? []).map((p) => `projects/${p.id}`),
];

for (const route of routes) {
  fs.mkdirSync(path.join(dist, route), { recursive: true });
  fs.writeFileSync(path.join(dist, route, "index.html"), html);
}
// Anything else (a mistyped address) still falls back to the app's own
// "page not found" screen.
fs.writeFileSync(path.join(dist, "404.html"), html);

console.log(`Wrote ${routes.length} route pages + 404.html`);
