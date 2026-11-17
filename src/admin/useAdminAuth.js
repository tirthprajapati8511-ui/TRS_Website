import { useCallback, useEffect, useState } from "react";
import { cloudEnabled } from "../lib/cloud";
import { cloudSession, cloudSignIn, cloudSignOut, onCloudAuthChange } from "./cms";
import { ADMIN_TOKEN_KEY } from "./tokenKey";

// One hook for both ways of signing in:
//  - online database: email + password (Supabase Auth)
//  - local dev API:   a single admin password
export function useAdminAuth() {
  const [token, setToken] = useState(() => (cloudEnabled ? "" : sessionStorage.getItem(ADMIN_TOKEN_KEY) || ""));
  const [session, setSession] = useState(null);
  const [ready, setReady] = useState(!cloudEnabled);

  useEffect(() => {
    if (!cloudEnabled) return;
    let unsub = () => {};
    let alive = true;
    cloudSession().then((s) => {
      if (!alive) return;
      setSession(s);
      setReady(true);
    });
    onCloudAuthChange((s) => alive && setSession(s)).then((u) => (unsub = u));
    return () => {
      alive = false;
      unsub();
    };
  }, []);

  const loggedIn = cloudEnabled ? Boolean(session) : Boolean(token);

  // resolves to an error message, or null on success
  const login = useCallback(async (emailOrPassword, password) => {
    if (cloudEnabled) return cloudSignIn(emailOrPassword, password);
    try {
      const res = await fetch("/api/content/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: emailOrPassword }),
      });
      const data = await res.json();
      if (!data.ok) return "Incorrect password.";
      sessionStorage.setItem(ADMIN_TOKEN_KEY, emailOrPassword);
      setToken(emailOrPassword);
      return null;
    } catch {
      return "Couldn't reach the local content API. Make sure the site is running via `npm run dev`, not opened as a static file.";
    }
  }, []);

  const logout = useCallback(async () => {
    if (cloudEnabled) {
      await cloudSignOut();
      setSession(null);
    } else {
      sessionStorage.removeItem(ADMIN_TOKEN_KEY);
      setToken("");
    }
  }, []);

  return { cloud: cloudEnabled, ready, loggedIn, token, email: session?.user?.email ?? "", login, logout };
}
