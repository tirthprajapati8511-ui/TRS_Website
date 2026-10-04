// GitHub Pages has no server-side router, so a direct visit to /events or
// /contact would answer with a "404" status (the page still loads, but link
// previews and search engines treat it as missing). Writing a copy of
// index.html at every route makes each one a real page that answers 200 —
// and lets each page carry its own title and link-preview text.
import fs from "node:fs";
import path from "node:path";
import { getPageMeta } from "../src/lib/pageMeta.js";

const dist = "dist";
const template = fs.readFileSync(path.join(dist, "index.html"), "utf-8");
const content = JSON.parse(fs.readFileSync("content.json", "utf-8"));

// Where the site will live. Set SITE_URL when building for another address
// (for example https://www.bvmengineering.ac.in/TRS/).
let siteUrl = process.env.SITE_URL || "https://tirthprajapati8511-ui.github.io/TRS_Website/";
if (!siteUrl.endsWith("/")) siteUrl += "/";

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function setMeta(html, attr, key, value) {
  const re = new RegExp(`(<meta ${attr}="${key}" content=")[^"]*(")`);
  return html.replace(re, `$1${esc(value)}$2`);
}

function render(route) {
  const urlPath = route === "" ? "" : route + "/";
  const meta = getPageMeta("/" + route, content);
  const image = meta.image ? siteUrl + meta.image.replace(/^\//, "") : siteUrl + "brand/og-card.png";
  let html = template.replace(/<title>[^<]*<\/title>/, `<title>${esc(meta.title)}</title>`);
  html = setMeta(html, "name", "description", meta.description);
  html = setMeta(html, "property", "og:title", meta.title);
  html = setMeta(html, "property", "og:description", meta.description);
  html = setMeta(html, "property", "og:image", image);
  html = setMeta(html, "property", "og:url", siteUrl + urlPath);
  html = setMeta(html, "name", "twitter:title", meta.title);
  html = setMeta(html, "name", "twitter:description", meta.description);
  html = setMeta(html, "name", "twitter:image", image);
  return html;
}

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

fs.writeFileSync(path.join(dist, "index.html"), render(""));
for (const route of routes) {
  fs.mkdirSync(path.join(dist, route), { recursive: true });
  fs.writeFileSync(path.join(dist, route, "index.html"), render(route));
}
// Anything else (a mistyped address) still falls back to the app's own
// "page not found" screen.
fs.writeFileSync(path.join(dist, "404.html"), template);

console.log(`Wrote ${routes.length} route pages + 404.html for ${siteUrl}`);
