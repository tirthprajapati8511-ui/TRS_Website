import { ArrayEditor, Field, SectionCard, StringListEditor, TextArea } from "../fields";

function Block({ label, hint, children }) {
  return (
    <div>
      <span className="mono-label text-[10px] text-ink-faint">{label}</span>
      {hint && <p className="mt-1 text-[12px] text-ink-faint">{hint}</p>}
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

export default function ExploreEditor({ value, onChange }) {
  const set = (partial) => onChange({ ...value, ...partial });

  return (
    <div className="space-y-6">
      <SectionCard
        title="Explore TRS — introduction"
        description="The page behind the Explore TRS link. Years of competing, seasons and results counters are worked out from the Achievements archive automatically."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Small label above the heading" value={value.eyebrow} onChange={(v) => set({ eyebrow: v })} />
          <Field label="Motto" value={value.motto} onChange={(v) => set({ motto: v })} />
        </div>
        <Field label="Heading" value={value.heading} onChange={(v) => set({ heading: v })} />
        <Block label="About paragraphs" hint="Each box is one paragraph.">
          <ArrayEditor
            items={value.about}
            onChange={(about) => set({ about })}
            addLabel="+ Add paragraph"
            newItem={() => ({ text: "" })}
            renderItem={(para, update) => (
              <TextArea label="Paragraph" value={para.text} onChange={(v) => update({ text: v })} rows={3} />
            )}
          />
        </Block>
      </SectionCard>

      <SectionCard title="What we do" description="Cards that link to the other pages of the site.">
        <ArrayEditor
          items={value.whatWeDo}
          onChange={(whatWeDo) => set({ whatWeDo })}
          addLabel="+ Add card"
          newItem={() => ({ title: "New card", description: "", href: "/" })}
          renderItem={(item, update) => (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Title" value={item.title} onChange={(v) => update({ title: v })} />
                <Field label="Links to (e.g. /events)" value={item.href} onChange={(v) => update({ href: v })} mono />
              </div>
              <TextArea label="Description" value={item.description} onChange={(v) => update({ description: v })} rows={2} />
            </>
          )}
        />
      </SectionCard>

      <SectionCard title="Lists" description="Two short lists shown side by side. Leave one empty to hide it.">
        <Block label="What we build">
          <StringListEditor items={value.domains} onChange={(domains) => set({ domains })} addLabel="+ Add item" />
        </Block>
        <Block label="Lab and facilities">
          <StringListEditor items={value.facilities} onChange={(facilities) => set({ facilities })} addLabel="+ Add item" />
        </Block>
      </SectionCard>

      <SectionCard
        title="Extra numbers"
        description='Shown after the automatic counters. A leading number counts up (e.g. "4" or "24/7").'
      >
        <ArrayEditor
          items={value.stats}
          onChange={(stats) => set({ stats })}
          addLabel="+ Add number"
          newItem={() => ({ value: "0", label: "Label" })}
          renderItem={(item, update) => (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Number" value={item.value} onChange={(v) => update({ value: v })} />
              <Field label="Label" value={item.label} onChange={(v) => update({ label: v })} />
            </div>
          )}
        />
      </SectionCard>

      <SectionCard title="Closing call-to-action">
        <Field label="Heading" value={value.ctaHeading} onChange={(v) => set({ ctaHeading: v })} />
        <TextArea label="Description" value={value.ctaDescription} onChange={(v) => set({ ctaDescription: v })} rows={2} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Button label" value={value.ctaLabel} onChange={(v) => set({ ctaLabel: v })} />
          <Field label="Button links to" value={value.ctaHref} onChange={(v) => set({ ctaHref: v })} mono />
        </div>
      </SectionCard>
    </div>
  );
}
