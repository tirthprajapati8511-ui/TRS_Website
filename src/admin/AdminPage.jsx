import { useEffect, useRef, useState } from "react";
import { useContent, useContentStatus } from "../lib/ContentContext";
import AdminLogin from "./AdminLogin";
import BrandEditor from "./editors/BrandEditor";
import HeroEditor from "./editors/HeroEditor";
import CommitteeEditor from "./editors/CommitteeEditor";
import FacultyEditor from "./editors/FacultyEditor";
import EventsEditor from "./editors/EventsEditor";
import ProjectsEditor from "./editors/ProjectsEditor";
import AchievementsEditor from "./editors/AchievementsEditor";
import WorkshopsEditor from "./editors/WorkshopsEditor";
import JoinEditor from "./editors/JoinEditor";
import ExploreEditor from "./editors/ExploreEditor";
import ContactEditor from "./editors/ContactEditor";
import PatentsEditor from "./editors/PatentsEditor";
import InstagramEditor from "./editors/InstagramEditor";
import FooterEditor from "./editors/FooterEditor";
import { TrsLogo } from "../components/Logo";
import { useAdminAuth } from "./useAdminAuth";
import { saveContent } from "./cms";

const TABS = [
  { key: "brand", label: "Branding", Editor: BrandEditor },
  { key: "hero", label: "Hero", Editor: HeroEditor },
  { key: "committee", label: "Executive Committee", Editor: CommitteeEditor },
  { key: "faculty", label: "Faculty Members", Editor: FacultyEditor },
  { key: "events", label: "Events", Editor: EventsEditor },
  { key: "projects", label: "Projects", Editor: ProjectsEditor },
  { key: "achievements", label: "Achievements", Editor: AchievementsEditor },
  { key: "explore", label: "Explore TRS", Editor: ExploreEditor },
  { key: "patents", label: "Patents", Editor: PatentsEditor },
  { key: "workshops", label: "Workshops", Editor: WorkshopsEditor },
  { key: "join", label: "Join TRS", Editor: JoinEditor },
  { key: "instagram", label: "Instagram feed", Editor: InstagramEditor },
  { key: "contact", label: "Contact", Editor: ContactEditor },
  { key: "footer", label: "Footer", Editor: FooterEditor },
];

export default function AdminPage() {
  const auth = useAdminAuth();

  if (!auth.ready) {
    return <div className="min-h-screen bg-bg" />;
  }
  if (!auth.loggedIn) {
    return <AdminLogin cloud={auth.cloud} onSubmit={auth.login} />;
  }
  return <AdminDashboard token={auth.token} onLogout={auth.logout} email={auth.email} />;
}

function AdminDashboard({ token, onLogout, email }) {
  const content = useContent();
  const { status, refresh } = useContentStatus();

  const [draft, setDraft] = useState(content);
  const initialized = useRef(false);
  const [activeTab, setActiveTab] = useState(TABS[0].key);
  const [saveState, setSaveState] = useState("idle"); // idle | saving | saved | error
  const [errorMessage, setErrorMessage] = useState("");

  // Sync the draft once the real content has loaded (or failed to), but
  // never again afterwards — we don't want an in-progress edit to be
  // clobbered by a background refresh.
  useEffect(() => {
    if (!initialized.current && status !== "loading") {
      setDraft(content);
      initialized.current = true;
    }
  }, [content, status]);

  const updateSection = (key, value) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
    setSaveState("idle");
  };

  const save = async () => {
    setSaveState("saving");
    setErrorMessage("");
    try {
      await saveContent(draft, token);
      setSaveState("saved");
      refresh();
    } catch (err) {
      setErrorMessage(err.message || "Something went wrong while saving.");
      setSaveState("error");
    }
  };

  const discard = () => setDraft(content);

  const ActiveEditor = TABS.find((t) => t.key === activeTab)?.Editor;

  return (
    <div className="min-h-screen bg-bg text-ink flex flex-col">
      {/* top bar */}
      <header className="sticky top-0 z-10 border-b border-line bg-bg/95 backdrop-blur-md">
        <div className="flex items-center justify-between px-6 py-4 gap-4">
          <div className="flex items-center gap-3">
            <TrsLogo className="h-7 w-7" />
            <span className="font-display text-sm font-semibold text-ink">
              TRS BVM <span className="text-ink-dim">/ Admin</span>
            </span>
            <StatusPill status={status} />
          </div>

          <div className="flex items-center gap-3">
            {saveState === "saved" && (
              <span className="mono-label text-[11px] text-accent">Saved ✓</span>
            )}
            {saveState === "error" && (
              <span className="mono-label text-[11px] text-accent">{errorMessage}</span>
            )}
            <button
              onClick={discard}
              className="mono-label text-[11px] text-ink-faint hover:text-ink transition-colors px-2"
            >
              Discard changes
            </button>
            <button
              onClick={save}
              disabled={saveState === "saving"}
              className="bg-accent text-on-accent px-4 py-2 text-xs font-medium tracking-wide hover:bg-accent-dim transition-colors disabled:opacity-60"
            >
              {saveState === "saving" ? "SAVING…" : "SAVE CHANGES"}
            </button>
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="mono-label text-[11px] text-ink-dim hover:text-ink transition-colors px-2"
            >
              View site ↗
            </a>
            <button
              onClick={onLogout}
              className="mono-label text-[11px] text-ink-faint hover:text-accent transition-colors px-2"
            >
              Log out{email ? ` (${email})` : ""}
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* sidebar */}
        <nav className="hidden md:block w-56 border-r border-line shrink-0 py-6">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`block w-full text-left px-6 py-2.5 text-sm transition-colors ${
                activeTab === tab.key
                  ? "text-accent bg-accent-soft border-r-2 border-accent"
                  : "text-ink-dim hover:text-ink"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* mobile tab select */}
        <div className="md:hidden w-full border-b border-line px-4 py-3">
          <select
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
            className="w-full border border-line bg-bg px-3 py-2 text-sm text-ink"
          >
            {TABS.map((tab) => (
              <option key={tab.key} value={tab.key}>
                {tab.label}
              </option>
            ))}
          </select>
        </div>

        {/* editor panel */}
        <main className="flex-1 px-6 py-10 max-w-3xl">
          {ActiveEditor && (
            <ActiveEditor value={draft[activeTab]} onChange={(v) => updateSection(activeTab, v)} />
          )}
        </main>
      </div>
    </div>
  );
}

function StatusPill({ status }) {
  const map = {
    loading: { text: "Loading…", cls: "text-ink-faint" },
    saved: { text: "Editing saved content", cls: "text-accent" },
    defaults: { text: "Editing defaults — nothing saved yet", cls: "text-ink-dim" },
    cloud: { text: "Editing the live online content — saving updates the website", cls: "text-accent" },
    "cloud-empty": { text: "Online database is empty — press SAVE CHANGES once to publish the current content to it", cls: "text-ink-dim" },
    bundled: { text: "No local API — viewing the last built snapshot, changes won't save", cls: "text-ink-faint" },
  };
  const { text, cls } = map[status] ?? map.loading;
  return <span className={`mono-label text-[10px] ${cls}`}>{text}</span>;
}
