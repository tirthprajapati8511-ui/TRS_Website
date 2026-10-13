import { ArrayEditor, Field, TextArea, SectionCard, ImageUploadField } from "../fields";

function MembersEditor({ members, onChange }) {
  return (
    <ArrayEditor
      items={members}
      onChange={onChange}
      addLabel="+ Add member"
      newItem={() => ({
        id: `member-${Date.now()}`,
        name: "New Member",
        role: "Role",
        branch: "",
        photo: null,
        email: "",
        linkedin: "",
      })}
      renderItem={(item, update) => (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Name" value={item.name} onChange={(v) => update({ name: v })} />
            <Field
              label="Role (e.g. President, Technical Head)"
              value={item.role}
              onChange={(v) => update({ role: v })}
            />
          </div>
          <Field
            label="Branch / year (optional)"
            value={item.branch ?? ""}
            onChange={(v) => update({ branch: v })}
            placeholder="e.g. Mechanical, 3rd Year"
          />
          <ImageUploadField label="Photo" value={item.photo} onChange={(path) => update({ photo: path })} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Email (optional)" value={item.email ?? ""} onChange={(v) => update({ email: v })} mono />
            <Field
              label="LinkedIn URL (optional)"
              value={item.linkedin ?? ""}
              onChange={(v) => update({ linkedin: v })}
              mono
            />
          </div>
        </>
      )}
    />
  );
}

export default function CommitteeEditor({ value, onChange }) {
  const set = (partial) => onChange({ ...value, ...partial });

  return (
    <div className="space-y-6">
      <SectionCard
        title="Executive Committee — current year"
        description="Members appear on the Executive Committee page in the order listed here."
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Field
            label="Academic year (e.g. 2026–27)"
            value={value.year ?? ""}
            onChange={(v) => set({ year: v })}
          />
        </div>
        <TextArea label="Intro text" value={value.intro} onChange={(v) => set({ intro: v })} rows={2} />
        <div>
          <span className="mono-label text-[10px] text-ink-faint">Members</span>
          <div className="mt-1.5">
            <MembersEditor members={value.members} onChange={(members) => set({ members })} />
          </div>
        </div>
      </SectionCard>

      <SectionCard
        title="Past executive committees"
        description="One entry per earlier academic year. When there is at least one, the Executive Committee page shows a year picker so visitors can switch between years."
      >
        <ArrayEditor
          items={value.past ?? []}
          onChange={(past) => set({ past })}
          addLabel="+ Add a past committee"
          newItem={() => ({ year: "2025–26", intro: "", members: [] })}
          renderItem={(entry, update) => (
            <>
              <Field
                label="Academic year (e.g. 2025–26)"
                value={entry.year}
                onChange={(v) => update({ year: v })}
              />
              <TextArea
                label="Intro text (optional)"
                value={entry.intro ?? ""}
                onChange={(v) => update({ intro: v })}
                rows={2}
              />
              <div>
                <span className="mono-label text-[10px] text-ink-faint">Members</span>
                <div className="mt-1.5">
                  <MembersEditor members={entry.members ?? []} onChange={(members) => update({ members })} />
                </div>
              </div>
            </>
          )}
        />
      </SectionCard>
    </div>
  );
}
