# TRS BVM — The Robotics Society

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

### Online database (edit the live site from the browser)

With the two settings in `.env.example` filled in, the website reads its content from an online **Supabase** database and the admin panel works on the live site at `/admin` — you sign in with an email and password and press **Save changes**; no VS Code, no `npm`, no deploy. Photos and videos you upload go to Supabase Storage.

One-time setup:

1. Create a free project at supabase.com.
2. In **SQL Editor**, paste and run `supabase/setup.sql` (creates the content table, the photo bucket, and the rules: everyone can read, only signed-in admins can write).
3. In **Authentication → Users**, add your admin user (email + password, tick "Auto confirm"). In **Authentication → Providers → Email**, switch **off** "Allow new users to sign up".
4. In **Project Settings → API** copy the *Project URL* and the *anon public* key into Netlify (**Site configuration → Environment variables**: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) and redeploy. Put the same two in `.env.local` to use the database when running locally.
5. Open `/admin` on the live site, sign in, and press **Save changes** once — that copies the current content into the database. After that the database is the source of truth.

### Giving one person access to one event

1. Run `supabase/access-control.sql` once in the SQL Editor (everyone who already has a login becomes an owner).
2. Create the person's login in **Authentication → Users** (tick Auto confirm).
3. In `/admin` → Events, open the event and add their email under *People who can edit ONLY this event*. It applies immediately.
4. They sign in at `/admin` and see only that event; the database itself refuses anything else.

Without those two settings everything works as before: content comes from `content.json`, and the admin only runs locally via `npm run dev` (it uses the small local API in `vite.content-api.js`).

Things to know: the per-page browser titles and link-preview text are generated when the site is built, so they follow `content.json` until the next deploy. `content.json` stays in the repo as the built-in copy shown while the database loads and as a fallback if it is unreachable.

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

- **Hosting:** the site is deployed on Netlify (settings in `netlify.toml`). Netlify builds it from this repo whenever `main` is pushed, and serves it from the root of its own address — no `VITE_BASE_PATH` is needed there. The admin panel (`/admin`) only works locally with `npm run dev`; on Netlify the public site shows whatever was last saved to `content.json`.
- The eventual production home is `https://bvmengineering.ac.in/TRS/`; `vite.config.js` and the router are already set up to support being served from a subpath via the `VITE_BASE_PATH` env var when that's ready.
- **Building for another address** (for example the college server): set both `VITE_BASE_PATH` (the sub-folder, e.g. `/TRS/`) and `SITE_URL` (the full address, e.g. `https://bvmengineering.ac.in/TRS/`), run `npm run build`, then `node scripts/spa-routes.mjs`. The script writes a page for every route and fills in each page's title and link-preview text using `SITE_URL`.
- Photos and videos live in `public/uploads/`. Keep photos under about 1800 px wide and videos around 720p so the site stays quick on phones.
