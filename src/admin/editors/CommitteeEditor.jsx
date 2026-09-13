import { ArrayEditor, Field, TextArea, SectionCard, ImageUploadField } from "../fields";

export default function CommitteeEditor({ value, onChange }) {
  const set = (partial) => onChange({ ...value, ...partial });

  return (
    <SectionCard
      title="Executive Committee"
      description="Members appear on the Executive Committee page in the order listed here."
    >
      <TextArea label="Intro text" value={value.intro} onChange={(v) => set({ intro: v })} rows={2} />

      <div>
        <span className="mono-label text-[10px] text-ink-faint">Members</span>
        <div className="mt-1.5">
          <ArrayEditor
            items={value.members}
            onChange={(members) => set({ members })}
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
                  <Field
                    label="Email (optional)"
                    value={item.email ?? ""}
                    onChange={(v) => update({ email: v })}
                    mono
                  />
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
        </div>
      </div>

      <div className="pt-2 border-t border-line">
        <span className="mono-label text-[10px] text-ink-faint">Faculty Members</span>
        <div className="mt-1.5">
          <ArrayEditor
            items={value.facultyMembers}
            onChange={(facultyMembers) => set({ facultyMembers })}
            addLabel="+ Add faculty member"
            newItem={() => ({
              id: `faculty-${Date.now()}`,
              name: "New Faculty Member",
              role: "",
              photo: null,
              email: "",
            })}
            renderItem={(item, update) => (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Field label="Name" value={item.name} onChange={(v) => update({ name: v })} />
                  <Field
                    label="Role (optional)"
                    value={item.role ?? ""}
                    onChange={(v) => update({ role: v })}
                    placeholder="e.g. Faculty Advisor"
                  />
                </div>
                <ImageUploadField label="Photo" value={item.photo} onChange={(path) => update({ photo: path })} />
                <Field
                  label="Email (optional)"
                  value={item.email ?? ""}
                  onChange={(v) => update({ email: v })}
                  mono
                />
              </>
            )}
          />
        </div>
      </div>
    </SectionCard>
  );
}
