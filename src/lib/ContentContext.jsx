import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { DEFAULT_CONTENT } from "./defaultContent";

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
  const [status, setStatus] = useState("loading"); // loading | saved | defaults | offline

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/content");
      if (!res.ok) throw new Error("Request failed");
      const data = await res.json();
      setContent(mergeContent(data.content));
      setStatus(data.hasSavedContent ? "saved" : "defaults");
    } catch {
      // No content API available (e.g. static production build with no
      // server behind it) — fall back to the defaults shipped in the bundle.
      setContent(DEFAULT_CONTENT);
      setStatus("offline");
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
