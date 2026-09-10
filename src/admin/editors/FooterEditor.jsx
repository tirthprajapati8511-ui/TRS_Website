import { ArrayEditor, Field, TextArea, SectionCard, StringListEditor } from "../fields";

export default function FooterEditor({ value, onChange }) {
  const set = (partial) => onChange({ ...value, ...partial });

  return (
    <SectionCard title="Footer" description="Contact details and socials shown at the bottom of every page.">
      <TextArea label="Description" value={value.description} onChange={(v) => set({ description: v })} rows={2} />

      <div>
        <span className="mono-label text-[10px] text-ink-faint">Address lines</span>
        <div className="mt-1.5">
          <StringListEditor items={value.addressLines} onChange={(v) => set({ addressLines: v })} addLabel="+ Add line" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Email" value={value.email} onChange={(v) => set({ email: v })} mono />
        <Field label="Phone" value={value.phone} onChange={(v) => set({ phone: v })} mono />
      </div>

      <div>
        <span className="mono-label text-[10px] text-ink-faint">Social links</span>
        <div className="mt-1.5">
          <ArrayEditor
            items={value.socials}
            onChange={(socials) => set({ socials })}
            addLabel="+ Add social link"
            newItem={() => ({ label: "New Link", href: "#" })}
            renderItem={(item, update) => (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Label (Instagram / LinkedIn / YouTube / X)" value={item.label} onChange={(v) => update({ label: v })} />
                <Field label="URL" value={item.href} onChange={(v) => update({ href: v })} mono />
              </div>
            )}
          />
        </div>
      </div>

      <div className="pt-2 border-t border-line space-y-4">
        <span className="mono-label text-[10px] text-ink-faint">Parent organisation</span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field
            label="Affiliation note"
            value={value.parentOrg.name}
            onChange={(v) => set({ parentOrg: { ...value.parentOrg, name: v } })}
          />
          <Field
            label="Line above it"
            value={value.parentOrg.note}
            onChange={(v) => set({ parentOrg: { ...value.parentOrg, note: v } })}
          />
        </div>
      </div>
    </SectionCard>
  );
}
