import { useEffect, useState } from "react";
import { addEventEditor, listEventEditors, removeEventEditor } from "./cms";

// Owner-only box on each event: who may edit this one event. Changes apply
// immediately (they are not part of "Save changes").
export default function EventAccess({ eventId }) {
  const [emails, setEmails] = useState(null);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;
    listEventEditors(eventId)
      .then((e) => alive && setEmails(e))
      .catch((e) => alive && setError(e.message));
    return () => {
      alive = false;
    };
  }, [eventId]);

  const add = async () => {
    const email = input.trim().toLowerCase();
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError("Enter a valid email address.");
    setError("");
    try {
      await addEventEditor(eventId, email);
      setEmails((prev) => [...new Set([...(prev ?? []), email])]);
      setInput("");
    } catch (e) {
      setError(e.message);
    }
  };

  const remove = async (email) => {
    setError("");
    try {
      await removeEventEditor(eventId, email);
      setEmails((prev) => (prev ?? []).filter((x) => x !== email));
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="border border-line p-3">
      <span className="mono-label text-[10px] text-ink-faint">
        People who can edit ONLY this event (they sign in at /admin with this email)
      </span>
      <ul className="mt-2 flex flex-wrap gap-2">
        {(emails ?? []).map((email) => (
          <li key={email} className="flex items-center gap-2 border border-line px-2 py-1 text-xs text-ink">
            {email}
            <button type="button" onClick={() => remove(email)} className="text-ink-faint hover:text-accent" aria-label={`Remove ${email}`}>
              ✕
            </button>
          </li>
        ))}
        {emails && emails.length === 0 && <li className="text-xs text-ink-faint">Nobody yet.</li>}
      </ul>
      <div className="mt-2 flex gap-2">
        <input
          type="email"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), add())}
          placeholder="person@example.com"
          className="flex-1 border border-line bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-accent"
        />
        <button type="button" onClick={add} className="bg-accent text-on-accent px-3 py-2 text-xs">
          GIVE ACCESS
        </button>
      </div>
      {error && <p className="mt-2 text-xs text-accent">{error}</p>}
      <p className="mt-2 text-[11px] text-ink-faint">
        First create their login in Supabase → Authentication → Users (tick Auto Confirm). Then add the same email here.
      </p>
    </div>
  );
}
