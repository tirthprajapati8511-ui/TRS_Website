import { ArrayEditor, Field, TextArea, SectionCard } from "../fields";

export default function WorkshopsEditor({ value, onChange }) {
  const set = (partial) => onChange({ ...value, ...partial });

  return (
    <SectionCard title="Workshops" description="Registration should link directly to the relevant Google Form.">
      <ArrayEditor
        items={value.items}
        onChange={(items) => set({ items })}
        addLabel="+ Add workshop"
        newItem={() => ({
          id: `workshop-${Date.now()}`,
          title: "New Workshop",
          dateLabel: "TBA",
          status: "Coming Soon",
          description: "",
          formHref: null,
        })}
        renderItem={(item, update) => (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Title" value={item.title} onChange={(v) => update({ title: v })} />
              <Field label="Date label" value={item.dateLabel} onChange={(v) => update({ dateLabel: v })} />
            </div>
            <Field label="Status" value={item.status} onChange={(v) => update({ status: v })} />
            <TextArea label="Description" value={item.description} onChange={(v) => update({ description: v })} rows={2} />
            <Field
              label="Google Form link (leave blank until ready)"
              value={item.formHref ?? ""}
              onChange={(v) => update({ formHref: v || null })}
              mono
            />
          </>
        )}
      />
    </SectionCard>
  );
}
