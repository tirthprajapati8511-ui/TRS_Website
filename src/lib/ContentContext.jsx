import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { DEFAULT_CONTENT } from "./defaultContent";
// Vite bundles a .json import as real data at build time — this is what
// makes the *static* build (GitHub Pages, or any host with no server behind
// it) show real saved content instead of silently falling back to the
// placeholder defaults. It's a point-in-time snapshot as of whatever commit
// was built; the live /api/content fetch below still wins whenever it's
// reachable (local dev), so editing in /admin and refreshing always shows
// the latest without needing a rebuild.
import bundledContent from "../../content.json";

const ContentContext = createContext(null);

// Shallow-merges saved content over the defaults, per top-level section, so
// that adding a new field to DEFAULT_CONTENT later doesn't require migrating
// an old content.json.
function mergeContent(saved) {
  if (!saved) return DEFAULT_CONTENT;
  const merged = { ...DEFAULT_CONTENT };
  for (const key of Object.keys(DEFAULT_CONTENT)) {
    if (saved[key] !== undefined) {
      merged[key] = Array.isArray(DEFAULT_CONTENT[key])
        ? saved[key]
        : { ...DEFAULT_CONTENT[key], ...saved[key] };
    }
  }
  return merged;
}

export function ContentProvider({ children }) {
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [status, setStatus] = useState("loading"); // loading | saved | defaults | bundled

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/content");
      if (!res.ok) throw new Error("Request failed");
      const data = await res.json();
      setContent(mergeContent(data.content));
      setStatus(data.hasSavedContent ? "saved" : "defaults");
    } catch {
      // No content API available (a static build with no server behind
      // it) — use the content.json snapshot baked in at build time rather
      // than the bare placeholder defaults, so a static deploy still shows
      // whatever was actually saved as of that build.
      setContent(mergeContent(bundledContent));
      setStatus("bundled");
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const value = useMemo(() => ({ content, status, refresh }), [content, status, refresh]);

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent must be used within a ContentProvider");
  return ctx.content;
}

export function useContentStatus() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContentStatus must be used within a ContentProvider");
  return { status: ctx.status, refresh: ctx.refresh };
}
