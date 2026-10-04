import { Field, SectionCard, TextArea } from "../fields";

export default function InstagramEditor({ value, onChange }) {
  const set = (partial) => onChange({ ...value, ...partial });

  return (
    <SectionCard
      title="Instagram feed (homepage)"
      description="Shows your account's latest posts straight from Instagram, so you never have to update it. The account must be public."
    >
      <label className="flex items-center gap-2.5 text-sm text-ink">
        <input
          type="checkbox"
          checked={!!value.show}
          onChange={(e) => set({ show: e.target.checked })}
          className="h-4 w-4 accent-[var(--color-accent)]"
        />
        Show this section on the homepage
      </label>
      <Field label="Instagram username (without @)" value={value.username} onChange={(v) => set({ username: v })} mono />
      <Field label="Heading" value={value.heading} onChange={(v) => set({ heading: v })} />
      <TextArea label="Short text" value={value.description} onChange={(v) => set({ description: v })} rows={2} />
    </SectionCard>
  );
}
