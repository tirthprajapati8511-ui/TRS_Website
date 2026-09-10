import { useState } from "react";

export default function AdminLogin({ onLogin }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setChecking(true);
    setError("");
    try {
      const res = await fetch("/api/content/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: password }),
      });
      const data = await res.json();
      if (data.ok) {
        onLogin(password);
      } else {
        setError("Incorrect password.");
      }
    } catch {
      setError(
        "Couldn't reach the local content API. Make sure the site is running via `npm run dev` (or `npm run preview`), not opened as a static file."
      );
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg text-ink flex items-center justify-center px-6">
      <form onSubmit={submit} className="w-full max-w-sm border border-line bg-bg-panel p-8">
        <span className="mono-label text-xs text-accent">// TRS BVM Admin</span>
        <h1 className="mt-3 font-display text-2xl font-semibold text-ink">Sign in</h1>
        <p className="mt-2 text-[13px] text-ink-dim">
          Enter the admin password to edit homepage content.
        </p>

        <label className="block mt-6">
          <span className="mono-label text-[10px] text-ink-faint">Password</span>
          <input
            type="password"
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1.5 w-full border border-line bg-bg px-3 py-2.5 text-sm text-ink outline-none focus:border-accent transition-colors"
          />
        </label>

        {error && <p className="mt-3 text-[13px] text-accent">{error}</p>}

        <button
          type="submit"
          disabled={checking}
          className="mt-6 w-full bg-accent text-on-accent py-3 text-sm font-medium hover:bg-accent-dim transition-colors disabled:opacity-60"
        >
          {checking ? "Checking…" : "Sign in"}
        </button>

        <a href="/" className="mt-4 block text-center text-[12px] text-ink-faint hover:text-ink transition-colors">
          ← Back to site
        </a>
      </form>
    </div>
  );
}
