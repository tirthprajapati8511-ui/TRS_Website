import {
  ArrayEditor,
  Field,
  TextArea,
  SectionCard,
  ImageUploadField,
  ImageGalleryField,
} from "../fields";

export default function WorkshopsEditor({ value, onChange }) {
  const set = (partial) => onChange({ ...value, ...partial });

  return (
    <SectionCard
      title="Workshops"
      description='Use the status "Completed" for a workshop that has already happened — it then moves to "Past workshops". Registration should link directly to the relevant Google Form.'
    >
      <ArrayEditor
        items={value.items}
        onChange={(items) => set({ items })}
        addLabel="+ Add workshop"
        newItem={() => ({
          id: `workshop-${Date.now()}`,
          title: "New Workshop",
          dateLabel: "TBA",
          location: "",
          status: "Coming Soon",
          description: "",
          image: null,
          gallery: [],
          details: [],
          formHref: null,
        })}
        renderItem={(item, update) => (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Title" value={item.title} onChange={(v) => update({ title: v })} />
              <Field label="Date label" value={item.dateLabel} onChange={(v) => update({ dateLabel: v })} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Status (e.g. Coming Soon, Completed)" value={item.status} onChange={(v) => update({ status: v })} />
              <Field label="Venue" value={item.location ?? ""} onChange={(v) => update({ location: v })} />
            </div>
            <TextArea label="Short description" value={item.description} onChange={(v) => update({ description: v })} rows={2} />
            <ImageUploadField label="Cover photo" value={item.image ?? null} onChange={(path) => update({ image: path })} />
            <ImageGalleryField
              label="Gallery photos — shown on the workshop's detail page"
              value={item.gallery ?? []}
              onChange={(gallery) => update({ gallery })}
            />
            <div>
              <span className="mono-label text-[10px] text-ink-faint">
                Workshop report — sections shown on the detail page (a new line becomes a new line on the page)
              </span>
              <div className="mt-1.5">
                <ArrayEditor
                  items={item.details ?? []}
                  onChange={(details) => update({ details })}
                  addLabel="+ Add section"
                  newItem={() => ({ heading: "Heading", body: "" })}
                  renderItem={(section, updateSection) => (
                    <>
                      <Field label="Heading" value={section.heading} onChange={(v) => updateSection({ heading: v })} />
                      <TextArea label="Text" value={section.body} onChange={(v) => updateSection({ body: v })} rows={3} />
                    </>
                  )}
                />
              </div>
            </div>
            <Field
              label="Google Form link (leave blank when not needed)"
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
