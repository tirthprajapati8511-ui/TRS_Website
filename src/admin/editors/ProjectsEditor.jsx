import { ArrayEditor, Field, TextArea, SectionCard, StringListEditor } from "../fields";

export default function ProjectsEditor({ value, onChange }) {
  const set = (partial) => onChange({ ...value, ...partial });

  return (
    <SectionCard title="Our Projects" description="Selected project cards, plus the Join TRS panel next to them.">
      <div>
        <span className="mono-label text-[10px] text-ink-faint">Project cards</span>
        <div className="mt-1.5">
          <ArrayEditor
            items={value.items}
            onChange={(items) => set({ items })}
            addLabel="+ Add project"
            newItem={() => ({
              id: `project-${Date.now()}`,
              name: "New Project",
              description: "",
              domains: [],
              image: null,
              href: "/projects",
            })}
            renderItem={(item, update) => (
              <>
                <Field label="Name" value={item.name} onChange={(v) => update({ name: v })} />
                <TextArea label="Description" value={item.description} onChange={(v) => update({ description: v })} rows={2} />
                <div>
                  <span className="mono-label text-[10px] text-ink-faint">Technical domains</span>
                  <div className="mt-1.5">
                    <StringListEditor
                      items={item.domains}
                      onChange={(v) => update({ domains: v })}
                      placeholder="e.g. Control Systems"
                      addLabel="+ Add domain"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Field label="Image path (optional)" value={item.image ?? ""} onChange={(v) => update({ image: v || null })} mono />
                  <Field label="Project link" value={item.href} onChange={(v) => update({ href: v })} mono />
                </div>
              </>
            )}
          />
        </div>
      </div>

      <div className="pt-2 border-t border-line">
        <span className="mono-label text-[10px] text-ink-faint">Join TRS panel</span>
        <div className="mt-3 space-y-4">
          <Field
            label="Heading"
            value={value.ctaPanel.heading}
            onChange={(v) => set({ ctaPanel: { ...value.ctaPanel, heading: v } })}
          />
          <TextArea
            label="Description"
            value={value.ctaPanel.description}
            onChange={(v) => set({ ctaPanel: { ...value.ctaPanel, description: v } })}
            rows={2}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field
              label="Button label"
              value={value.ctaPanel.buttonLabel}
              onChange={(v) => set({ ctaPanel: { ...value.ctaPanel, buttonLabel: v } })}
            />
            <Field
              label="Button link"
              value={value.ctaPanel.buttonHref}
              onChange={(v) => set({ ctaPanel: { ...value.ctaPanel, buttonHref: v } })}
              mono
            />
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
