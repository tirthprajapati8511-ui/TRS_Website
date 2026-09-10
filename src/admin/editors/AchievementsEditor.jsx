import { ArrayEditor, Field, TextArea, SectionCard, StringListEditor } from "../fields";

export default function AchievementsEditor({ value, onChange }) {
  const set = (partial) => onChange({ ...value, ...partial });

  return (
    <SectionCard
      title="Achievements"
      description="A compact homepage preview. The full year-by-year archive is a separate page."
    >
      <TextArea label="Intro text" value={value.description} onChange={(v) => set({ description: v })} rows={2} />

      <div>
        <span className="mono-label text-[10px] text-ink-faint">Recent highlights (homepage cards)</span>
        <div className="mt-1.5">
          <ArrayEditor
            items={value.recent}
            onChange={(recent) => set({ recent })}
            addLabel="+ Add highlight"
            newItem={() => ({ year: "PLACEHOLDER", title: "New Achievement", detail: "" })}
            renderItem={(item, update) => (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-3">
                  <Field label="Academic year" value={item.year} onChange={(v) => update({ year: v })} mono />
                  <Field label="Title" value={item.title} onChange={(v) => update({ title: v })} />
                </div>
                <TextArea label="Detail" value={item.detail} onChange={(v) => update({ detail: v })} rows={2} />
              </>
            )}
          />
        </div>
      </div>

      <div>
        <span className="mono-label text-[10px] text-ink-faint">Archive years (for the full Achievements page)</span>
        <div className="mt-1.5">
          <StringListEditor
            items={value.archiveYears}
            onChange={(v) => set({ archiveYears: v })}
            placeholder="e.g. 2025–26"
            addLabel="+ Add year"
          />
        </div>
      </div>
    </SectionCard>
  );
}
