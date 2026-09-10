import { Field, TextArea, SectionCard } from "../fields";

export default function HeroEditor({ value, onChange }) {
  const set = (partial) => onChange({ ...value, ...partial });

  return (
    <SectionCard title="Hero" description="The first thing every visitor sees, over the campus photograph.">
      <Field label="Eyebrow label" value={value.eyebrow} onChange={(v) => set({ eyebrow: v })} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Headline (line 1)" value={value.headline} onChange={(v) => set({ headline: v })} />
        <Field
          label="Headline (line 2, accent colour)"
          value={value.headlineAccent}
          onChange={(v) => set({ headlineAccent: v })}
        />
      </div>

      <Field label="Handwritten quote (top right, optional)" value={value.quote} onChange={(v) => set({ quote: v })} />
      <TextArea label="Description" value={value.description} onChange={(v) => set({ description: v })} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Primary button label" value={value.ctaPrimaryLabel} onChange={(v) => set({ ctaPrimaryLabel: v })} />
        <Field label="Primary button link" value={value.ctaPrimaryHref} onChange={(v) => set({ ctaPrimaryHref: v })} mono />
        <Field label="Secondary button label" value={value.ctaSecondaryLabel} onChange={(v) => set({ ctaSecondaryLabel: v })} />
        <Field label="Secondary button link" value={value.ctaSecondaryHref} onChange={(v) => set({ ctaSecondaryHref: v })} mono />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Location (line 1)" value={value.locationLine1} onChange={(v) => set({ locationLine1: v })} />
        <Field label="Location (line 2)" value={value.locationLine2} onChange={(v) => set({ locationLine2: v })} />
      </div>

      <Field
        label="Campus photo path"
        value={value.image}
        onChange={(v) => set({ image: v })}
        mono
        placeholder="/brand/hero-campus.jpg"
      />
      <Field label="Photo alt text" value={value.imageAlt} onChange={(v) => set({ imageAlt: v })} />
    </SectionCard>
  );
}
