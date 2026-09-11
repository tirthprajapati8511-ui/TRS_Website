import { Field, TextArea, SectionCard, StringListEditor, ImageUploadField } from "../fields";

export default function JoinEditor({ value, onChange }) {
  const set = (partial) => onChange({ ...value, ...partial });
  const setContact = (partial) => set({ facultyContact: { ...value.facultyContact, ...partial } });

  return (
    <SectionCard
      title="Join TRS"
      description="Membership is a physical form, not an online sign-up — keep the copy honest about that."
    >
      <Field label="Heading" value={value.heading} onChange={(v) => set({ heading: v })} />
      <TextArea label="Description" value={value.description} onChange={(v) => set({ description: v })} rows={3} />

      <div>
        <span className="mono-label text-[10px] text-ink-faint">Steps</span>
        <div className="mt-1.5">
          <StringListEditor items={value.steps} onChange={(v) => set({ steps: v })} addLabel="+ Add step" />
        </div>
      </div>

      <Field
        label="Enrollment PDF link (leave blank until the form is ready)"
        value={value.formHref ?? ""}
        onChange={(v) => set({ formHref: v || null })}
        mono
      />

      <div className="pt-2 border-t border-line space-y-4">
        <span className="mono-label text-[10px] text-ink-faint">Faculty enrollment contact</span>
        <Field label="Name" value={value.facultyContact.name} onChange={(v) => setContact({ name: v })} />
        <Field label="Role" value={value.facultyContact.role} onChange={(v) => setContact({ role: v })} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Email" value={value.facultyContact.email} onChange={(v) => setContact({ email: v })} mono />
          <Field
            label="Phone (optional)"
            value={value.facultyContact.phone ?? ""}
            onChange={(v) => setContact({ phone: v })}
            mono
          />
        </div>
        <ImageUploadField
          label="Photo"
          value={value.facultyContact.photo}
          onChange={(path) => setContact({ photo: path })}
        />
      </div>
    </SectionCard>
  );
}
