import { ArrayEditor, Field, TextArea, SectionCard, ImageUploadField } from "../fields";

function YearItemsEditor({ items, onChange }) {
  return (
    <ArrayEditor
      items={items}
      onChange={onChange}
      addLabel="+ Add achievement"
      newItem={() => ({ title: "New Achievement", detail: "", image: null })}
      renderItem={(item, update) => (
        <>
          <Field label="Title" value={item.title} onChange={(v) => update({ title: v })} />
          <TextArea label="Detail" value={item.detail} onChange={(v) => update({ detail: v })} rows={2} />
          <ImageUploadField label="Photo (optional)" value={item.image} onChange={(path) => update({ image: path })} />
        </>
      )}
    />
  );
}

export default function AchievementsEditor({ value, onChange }) {
  const set = (partial) => onChange({ ...value, ...partial });

  return (
    <SectionCard
      title="Achievements"
      description="Recent highlights show on the homepage; the archive below is the full Achievements page, organised by academic year."
    >
      <TextArea label="Intro text" value={value.description} onChange={(v) => set({ description: v })} rows={2} />

      <div>
        <span className="mono-label text-[10px] text-ink-faint">Recent highlights (homepage cards)</span>
        <div className="mt-1.5">
          <ArrayEditor
            items={value.recent}
            onChange={(recent) => set({ recent })}
            addLabel="+ Add highlight"
            newItem={() => ({ year: "PLACEHOLDER", title: "New Achievement", detail: "", image: null })}
            renderItem={(item, update) => (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-3">
                  <Field label="Academic year" value={item.year} onChange={(v) => update({ year: v })} mono />
                  <Field label="Title" value={item.title} onChange={(v) => update({ title: v })} />
                </div>
                <TextArea label="Detail" value={item.detail} onChange={(v) => update({ detail: v })} rows={2} />
                <ImageUploadField label="Photo (optional)" value={item.image} onChange={(path) => update({ image: path })} />
              </>
            )}
          />
        </div>
      </div>

      <div className="pt-2 border-t border-line">
        <span className="mono-label text-[10px] text-ink-faint">Archive, by academic year</span>
        <div className="mt-1.5">
          <ArrayEditor
            items={value.archive}
            onChange={(archive) => set({ archive })}
            addLabel="+ Add year"
            newItem={() => ({ year: "New Year", items: [] })}
            renderItem={(yearEntry, update) => (
              <>
                <Field
                  label="Academic year"
                  value={yearEntry.year}
                  onChange={(v) => update({ year: v })}
                  placeholder="e.g. 2025–26"
                  mono
                />
                <div>
                  <span className="mono-label text-[10px] text-ink-faint">
                    Achievements for {yearEntry.year || "this year"}
                  </span>
                  <div className="mt-1.5">
                    <YearItemsEditor items={yearEntry.items} onChange={(items) => update({ items })} />
                  </div>
                </div>
              </>
            )}
          />
        </div>
      </div>
    </SectionCard>
  );
}
