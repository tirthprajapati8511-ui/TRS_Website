import { ArrayEditor, Field, TextArea, SectionCard, ImageUploadField, ImageGalleryField } from "../fields";

const STATUS_TONES = ["accent", "good", "neutral"];

function RolesEditor({ roles, onChange }) {
  return (
    <ArrayEditor
      items={roles}
      onChange={onChange}
      addLabel="+ Add role"
      newItem={() => ({ title: "Role Title", person: "Placeholder" })}
      renderItem={(role, update) => (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Role title" value={role.title} onChange={(v) => update({ title: v })} />
          <Field label="Person" value={role.person} onChange={(v) => update({ person: v })} />
        </div>
      )}
    />
  );
}

function TeamsEditor({ structure, teams, onChange }) {
  return (
    <ArrayEditor
      items={teams}
      onChange={onChange}
      addLabel="+ Add team"
      newItem={() =>
        structure === "multi-team"
          ? { name: "New Team", category: "", leader: "", facultyAdvisor: "" }
          : { name: "Team", roles: [], facultyAdvisor: "" }
      }
      renderItem={(team, update) => (
        <>
          <Field label="Team name" value={team.name} onChange={(v) => update({ name: v })} />
          {structure === "multi-team" ? (
            <>
              <Field label="Category" value={team.category ?? ""} onChange={(v) => update({ category: v })} />
              <Field label="Team leader" value={team.leader ?? ""} onChange={(v) => update({ leader: v })} />
            </>
          ) : (
            <div>
              <span className="mono-label text-[10px] text-ink-faint">Internal leadership roles</span>
              <div className="mt-1.5">
                <RolesEditor roles={team.roles ?? []} onChange={(roles) => update({ roles })} />
              </div>
            </div>
          )}
          <Field
            label="Faculty advisor"
            value={team.facultyAdvisor ?? ""}
            onChange={(v) => update({ facultyAdvisor: v })}
          />
        </>
      )}
    />
  );
}

export default function EventsEditor({ value, onChange }) {
  const set = (partial) => onChange({ ...value, ...partial });

  return (
    <SectionCard
      title="Upcoming Events"
      description='Supports both event structures: "multi-team" (several independent teams, e.g. RoboFest) and "single-team" (one team with internal leadership roles, e.g. Robocon, SAUVC).'
    >
      <ArrayEditor
        items={value.items}
        onChange={(items) => set({ items })}
        addLabel="+ Add event"
        newItem={() => ({
          id: `event-${Date.now()}`,
          name: "New Event",
          dateLabel: "TBA",
          status: "Coming Soon",
          statusTone: "neutral",
          location: "",
          description: "",
          image: null,
          gallery: [],
          href: "/events",
          structure: "single-team",
          teams: [],
        })}
        renderItem={(item, update) => (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Event name" value={item.name} onChange={(v) => update({ name: v })} />
              <Field label="Date label" value={item.dateLabel} onChange={(v) => update({ dateLabel: v })} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Field label="Status label" value={item.status} onChange={(v) => update({ status: v })} />
              <label className="block">
                <span className="mono-label text-[10px] text-ink-faint">Status colour</span>
                <select
                  value={item.statusTone}
                  onChange={(e) => update({ statusTone: e.target.value })}
                  className="mt-1.5 w-full border border-line bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-accent"
                >
                  {STATUS_TONES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </label>
              <Field label="Location" value={item.location} onChange={(v) => update({ location: v })} />
            </div>
            <TextArea label="Short description" value={item.description} onChange={(v) => update({ description: v })} rows={2} />
            <ImageUploadField label="Cover photo" value={item.image} onChange={(path) => update({ image: path })} />
            <ImageGalleryField
              label="Gallery photos (optional) — shown on the event's detail page"
              value={item.gallery ?? []}
              onChange={(gallery) => update({ gallery })}
            />
            <Field label="View details link" value={item.href} onChange={(v) => update({ href: v })} mono />

            <label className="block">
              <span className="mono-label text-[10px] text-ink-faint">Structure</span>
              <select
                value={item.structure}
                onChange={(e) => update({ structure: e.target.value })}
                className="mt-1.5 w-full border border-line bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-accent"
              >
                <option value="multi-team">Multi-team (independent teams)</option>
                <option value="single-team">Single team (internal roles)</option>
              </select>
            </label>

            <div>
              <span className="mono-label text-[10px] text-ink-faint">Teams</span>
              <div className="mt-1.5">
                <TeamsEditor
                  structure={item.structure}
                  teams={item.teams ?? []}
                  onChange={(teams) => update({ teams })}
                />
              </div>
            </div>
          </>
        )}
      />
    </SectionCard>
  );
}
