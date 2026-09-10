// Small, shared form building blocks for the admin editors. Kept plain and
// unstyled-fancy on purpose — this panel is a utility, not a showcase.

export function Field({ label, value, onChange, placeholder, mono = false }) {
  return (
    <label className="block">
      <span className="mono-label text-[10px] text-ink-faint">{label}</span>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`mt-1.5 w-full border border-line bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-accent transition-colors ${
          mono ? "font-mono" : ""
        }`}
      />
    </label>
  );
}

export function TextArea({ label, value, onChange, rows = 3 }) {
  return (
    <label className="block">
      <span className="mono-label text-[10px] text-ink-faint">{label}</span>
      <textarea
        value={value}
        rows={rows}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full resize-y border border-line bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-accent transition-colors"
      />
    </label>
  );
}

export function SectionCard({ title, description, children }) {
  return (
    <div className="border border-line bg-bg-panel p-6">
      <h3 className="font-display text-base font-semibold text-ink">{title}</h3>
      {description && (
        <p className="mt-1 text-[13px] text-ink-dim">{description}</p>
      )}
      <div className="mt-5 space-y-4">{children}</div>
    </div>
  );
}

export function RemoveButton({ onClick, label = "Remove" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mono-label text-[10px] text-ink-faint hover:text-accent transition-colors"
    >
      {label} ✕
    </button>
  );
}

export function AddButton({ onClick, label = "+ Add item" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mono-label text-[11px] border border-line px-3 py-2 text-ink-dim hover:border-accent hover:text-accent transition-colors"
    >
      {label}
    </button>
  );
}

/** Editor for an array of plain strings (headline lines, tags, marquee items…). */
export function StringListEditor({ items, onChange, placeholder, addLabel }) {
  const update = (i, next) => onChange(items.map((it, idx) => (idx === i ? next : it)));
  const remove = (i) => onChange(items.filter((_, idx) => idx !== i));
  const add = () => onChange([...items, ""]);

  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <input
            type="text"
            value={item}
            placeholder={placeholder}
            onChange={(e) => update(i, e.target.value)}
            className="flex-1 border border-line bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-accent transition-colors"
          />
          <RemoveButton onClick={() => remove(i)} />
        </div>
      ))}
      <AddButton onClick={add} label={addLabel ?? "+ Add"} />
    </div>
  );
}

/**
 * Editor for an array of objects. `renderItem(item, updateItem)` renders the
 * fields for one entry — call `updateItem(partial)` to merge changes into it.
 */
export function ArrayEditor({ items, onChange, renderItem, newItem, addLabel }) {
  const updateAt = (i, next) => onChange(items.map((it, idx) => (idx === i ? next : it)));
  const remove = (i) => onChange(items.filter((_, idx) => idx !== i));
  const add = () => onChange([...items, newItem()]);

  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <div key={i} className="relative border border-line bg-bg p-4 space-y-3">
          <div className="absolute top-3 right-3">
            <RemoveButton onClick={() => remove(i)} />
          </div>
          {renderItem(item, (partial) => updateAt(i, { ...item, ...partial }), i)}
        </div>
      ))}
      <AddButton onClick={add} label={addLabel ?? "+ Add item"} />
    </div>
  );
}
