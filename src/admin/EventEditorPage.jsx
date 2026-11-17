import { useState } from "react";
import { useContent, useContentStatus } from "../lib/ContentContext";
import { TrsLogo } from "../components/Logo";
import { EventForm } from "./editors/EventsEditor";
import { saveEventAsEditor } from "./cms";

// What a person sees when they were given access to specific events only:
// just those events, and nothing else on the site.
export default function EventEditorPage({ eventIds, email, onLogout }) {
  const content = useContent();
  const { status, refresh } = useContentStatus();
  const events = (content.events?.items ?? []).filter((e) => eventIds.includes(e.id));
  const [pickedId, setPickedId] = useState(null);
  const [drafts, setDrafts] = useState({});
  const [saveState, setSaveState] = useState("idle");
  const [message, setMessage] = useState("");

  const activeId = pickedId ?? events[0]?.id ?? null;

  const original = events.find((e) => e.id === activeId);
  const draft = drafts[activeId] ?? original;

  const update = (partial) => {
    setDrafts((d) => ({ ...d, [activeId]: { ...(d[activeId] ?? original), ...partial } }));
    setSaveState("idle");
  };

  const save = async () => {
    setSaveState("saving");
    setMessage("");
    try {
      await saveEventAsEditor(activeId, draft);
      setSaveState("saved");
      setDrafts((d) => {
        const next = { ...d };
        delete next[activeId];
        return next;
      });
      refresh();
    } catch (err) {
      setMessage(err.message || "Could not save.");
      setSaveState("error");
    }
  };

  return (
    <div className="min-h-screen bg-bg text-ink">
      <header className="sticky top-0 z-10 border-b border-line bg-bg/95 backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between px-6 py-4 gap-3">
          <div className="flex items-center gap-3">
            <TrsLogo className="h-7 w-7" />
            <span className="font-display text-sm font-semibold">
              TRS BVM <span className="text-ink-dim">/ Event editor</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            {saveState === "saved" && <span className="mono-label text-[11px] text-accent">Saved ✓</span>}
            {saveState === "error" && <span className="mono-label text-[11px] text-accent">{message}</span>}
            <button
              onClick={save}
              disabled={saveState === "saving" || !draft}
              className="bg-accent text-on-accent px-4 py-2 text-xs font-medium tracking-wide hover:bg-accent-dim transition-colors disabled:opacity-60"
            >
              {saveState === "saving" ? "SAVING…" : "SAVE EVENT"}
            </button>
            <button onClick={onLogout} className="mono-label text-[11px] text-ink-faint hover:text-accent px-2">
              Log out{email ? ` (${email})` : ""}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-8 space-y-5">
        {status === "loading" ? (
          <p className="text-sm text-ink-dim">Loading…</p>
        ) : events.length === 0 ? (
          <p className="text-sm text-ink-dim">
            You are signed in, but no event has been assigned to you yet. Ask the TRS owner to give you access.
          </p>
        ) : (
          <>
            <p className="text-sm text-ink-dim">
              You can edit only the event{events.length > 1 ? "s" : ""} below. Everything else on the site is locked.
            </p>
            {events.length > 1 && (
              <div className="flex flex-wrap gap-2">
                {events.map((e) => (
                  <button
                    key={e.id}
                    onClick={() => setPickedId(e.id)}
                    className={`border px-3 py-1.5 text-xs ${
                      e.id === activeId ? "border-accent text-accent" : "border-line text-ink-dim"
                    }`}
                  >
                    {e.name}
                  </button>
                ))}
              </div>
            )}
            {draft && (
              <div key={activeId} className="space-y-4 border border-line p-4">
                <h2 className="font-display text-lg font-semibold">{original.name}</h2>
                <EventForm item={draft} update={update} />
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
