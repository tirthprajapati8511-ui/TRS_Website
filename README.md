# TRS BVM — Technology & Robotics Society

The official website for the TRS Student Chapter at BVM Engineering College — built with React, Vite, and Tailwind CSS, with a built-in admin panel for editing content without touching code.

## Running it locally

1. Open a terminal in this folder (`trs-bvm-website/`).
2. Install dependencies (only needed once, or after pulling changes that touch `package.json`):
   ```
   npm install
   ```
3. Start the dev server:
   ```
   npm run dev
   ```
4. Open the link it prints — usually **http://localhost:5173**.
5. To stop it, go back to the terminal and press **Ctrl+C**.

### Make it reachable from your phone (same Wi-Fi)

Start it with `--host` instead:
```
npm run dev -- --host
```
It'll print extra **Network** addresses (e.g. `http://192.168.x.x:5173`) — open that one on your phone. That address changes whenever this computer reconnects to Wi-Fi, so re-check the terminal output if it stops working.

### Common snag

"Port 5173 already in use" — usually means a previous `npm run dev` is still running in another terminal window. Close that window, or `Ctrl+C` in it, then try again.

## Editing content

Go to **http://localhost:5173/admin** and log in (password: `trsbvm`, or set your own via the `TRS_ADMIN_TOKEN` environment variable — see `vite.content-api.js`).

From there you can edit branding/logos, the hero section, Executive Committee, Faculty Members, Events, Projects, Achievements, Workshops, Join TRS, and the footer — including uploading photos (click to browse, or paste an image copied from Word/a screenshot directly into the photo field).

Saved content is written to `content.json` in this folder — it's real, permanent data that survives restarts, but only on this computer until it's committed and pushed to GitHub.

**Important**: the admin panel only works while running via `npm run dev` (or `npm run preview` after a build) — it depends on a small local API (`vite.content-api.js`) that a static, publicly-hosted build won't have. See that file's comments for what a production deployment would need instead.

## Other useful commands

| Command | What it does |
|---|---|
| `npm run build` | Production build, output to `dist/` |
| `npm run preview` | Serves the production build locally, to sanity-check it before deploying |
| `npm run lint` | Runs oxlint over the codebase |

## Project structure

```
src/
  sections/     Homepage sections (Hero, FeatureStrip, Navbar, Footer, …)
  pages/        Dedicated pages (Committee, Faculty, Events, Achievements, Join, …)
  components/   Shared building blocks (Button, Container, EventCard, PhotoGallery, …)
  admin/        The /admin panel and its per-section editors
  lib/          Content context/schema, theme handling, small utilities
public/
  brand/        Official logo files (TRS mark, BVM college seal) — never redrawn
  uploads/      Photos uploaded through the admin panel
content.json    The live, saved content (created the first time something is saved in /admin)
```

## Notes

- This repo is private and intended to stay that way for now — no live public deployment exists yet.
- The eventual production home is `https://bvmengineering.ac.in/TRS/`; `vite.config.js` and the router are already set up to support being served from a subpath via the `VITE_BASE_PATH` env var when that's ready.
