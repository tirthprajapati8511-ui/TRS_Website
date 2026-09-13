import { ArrayEditor, Field, TextArea, SectionCard, ImageUploadField } from "../fields";

export default function FacultyEditor({ value, onChange }) {
  const set = (partial) => onChange({ ...value, ...partial });

  return (
    <SectionCard
      title="Faculty Members"
      description="Advisors and mentors, shown as their own section — separate from the student Executive Committee."
    >
      <TextArea label="Intro text" value={value.intro} onChange={(v) => set({ intro: v })} rows={2} />

      <div>
        <span className="mono-label text-[10px] text-ink-faint">Members</span>
        <div className="mt-1.5">
          <ArrayEditor
            items={value.members}
            onChange={(members) => set({ members })}
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
