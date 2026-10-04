import { ArrayEditor, Field, SectionCard, TextArea } from "../fields";

export default function ContactEditor({ value, onChange }) {
  const set = (partial) => onChange({ ...value, ...partial });

  return (
    <div className="space-y-6">
      <SectionCard
        title="Contact page"
        description="The email, phone, address and social links shown on this page are edited in the Footer tab, so they stay the same everywhere."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Small label above the heading" value={value.eyebrow} onChange={(v) => set({ eyebrow: v })} />
          <Field label="Heading" value={value.heading} onChange={(v) => set({ heading: v })} />
        </div>
        <TextArea label="Intro" value={value.intro} onChange={(v) => set({ intro: v })} rows={2} />
        <Field
          label="Map search text — leave blank to hide the map"
          value={value.mapQuery}
          onChange={(v) => set({ mapQuery: v })}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Email button label" value={value.messageLabel} onChange={(v) => set({ messageLabel: v })} />
          <Field label="Email subject line" value={value.messageSubject} onChange={(v) => set({ messageSubject: v })} />
        </div>
      </SectionCard>

      <SectionCard title="Who to contact" description="One card per topic. Phone / email are shown as tap-to-call and mail links.">
        <ArrayEditor
          items={value.contacts}
          onChange={(contacts) => set({ contacts })}
          addLabel="+ Add contact"
          newItem={() => ({ topic: "Topic", person: "Placeholder", role: "", email: "", phone: "" })}
          renderItem={(c, update) => (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Topic" value={c.topic} onChange={(v) => update({ topic: v })} />
                <Field label="Person" value={c.person} onChange={(v) => update({ person: v })} />
              </div>
              <Field label="Role" value={c.role ?? ""} onChange={(v) => update({ role: v })} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Email" value={c.email ?? ""} onChange={(v) => update({ email: v })} />
                <Field label="Phone" value={c.phone ?? ""} onChange={(v) => update({ phone: v })} />
              </div>
            </>
          )}
        />
      </SectionCard>

      <SectionCard title="Frequently asked questions">
        <ArrayEditor
          items={value.faqs}
          onChange={(faqs) => set({ faqs })}
          addLabel="+ Add question"
          newItem={() => ({ q: "Question", a: "" })}
          renderItem={(f, update) => (
            <>
              <Field label="Question" value={f.q} onChange={(v) => update({ q: v })} />
              <TextArea label="Answer" value={f.a} onChange={(v) => update({ a: v })} rows={2} />
            </>
          )}
        />
      </SectionCard>
    </div>
  );
}
