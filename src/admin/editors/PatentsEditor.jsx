import { ArrayEditor, Field, TextArea, SectionCard, ImageUploadField } from "../fields";

export default function PatentsEditor({ value, onChange }) {
  const set = (partial) => onChange({ ...value, ...partial });

  return (
    <SectionCard
      title="Patents"
      description='Each patent is a card on the Patents page, in the order listed here. Use the status "Issued" (or "Granted") for patents that have been issued — those count towards the "patents issued" badge. Anything else, such as "Filed" or "Published", shows as a normal tag.'
    >
      <Field label="Page heading" value={value.heading} onChange={(v) => set({ heading: v })} />
      <TextArea label="Intro text (optional)" value={value.description} onChange={(v) => set({ description: v })} rows={2} />
      <div>
        <span className="mono-label text-[10px] text-ink-faint">Patents</span>
        <div className="mt-1.5">
          <ArrayEditor
            items={value.items}
            onChange={(items) => set({ items })}
            addLabel="+ Add patent"
            newItem={() => ({
              id: `patent-${Date.now()}`,
              title: "Patent title",
              number: "",
              status: "Issued",
              dateLabel: "",
              inventors: "",
              description: "",
              image: null,
              link: "",
            })}
            renderItem={(item, update) => (
              <>
                <Field label="Title" value={item.title} onChange={(v) => update({ title: v })} />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Field label="Patent / application number" value={item.number ?? ""} onChange={(v) => update({ number: v })} mono />
                  <Field label="Status (e.g. Issued, Filed)" value={item.status} onChange={(v) => update({ status: v })} />
                  <Field label="Date (e.g. 12 March 2026)" value={item.dateLabel ?? ""} onChange={(v) => update({ dateLabel: v })} />
                </div>
                <Field label="Inventors (separate with commas)" value={item.inventors ?? ""} onChange={(v) => update({ inventors: v })} />
                <TextArea label="Short description" value={item.description ?? ""} onChange={(v) => update({ description: v })} rows={3} />
                <ImageUploadField label="Certificate / photo (optional)" value={item.image ?? null} onChange={(path) => update({ image: path })} />
                <Field
                  label="Link to the official record (optional, https://…)"
                  value={item.link ?? ""}
                  onChange={(v) => update({ link: v })}
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
