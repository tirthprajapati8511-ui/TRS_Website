// Small, shared form building blocks for the admin editors. Kept plain and
// unstyled-fancy on purpose — this panel is a utility, not a showcase.

import { useState } from "react";
import { ChevronDown, ChevronUp, ImageIcon, Loader2, X } from "lucide-react";
import { ADMIN_TOKEN_KEY } from "./tokenKey";

const MAX_UPLOAD_MB = 8;

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",")[1] ?? "");
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/** Uploads an image file to the local content API and returns its saved path. */
async function uploadImage(file) {
  const token = sessionStorage.getItem(ADMIN_TOKEN_KEY) || "";
  const dataBase64 = await fileToBase64(file);
  const res = await fetch("/api/upload", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-admin-token": token },
    body: JSON.stringify({ filename: file.name, mime: file.type, dataBase64 }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Upload failed.");
  return data.path;
}

/**
 * A photo field backed by real file upload — not a path you have to know or
 * type. Pick a file, it uploads to /public/uploads, and the field's value
 * becomes that path automatically.
 */
export function ImageUploadField({ label, value, onChange }) {
  const [status, setStatus] = useState("idle"); // idle | uploading | error
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);

  const processFile = async (file) => {
    if (!file) return;
    if (file.size > MAX_UPLOAD_MB * 1024 * 1024) {
      setStatus("error");
      setError(`That file is over ${MAX_UPLOAD_MB}MB — use a smaller one.`);
      return;
    }
    setStatus("uploading");
    setError("");
    try {
      const path = await uploadImage(file);
      onChange(path);
      setStatus("idle");
    } catch (err) {
      setStatus("error");
      setError(err.message || "Upload failed.");
    }
  };

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow re-picking the same file later
    processFile(file);
  };

  // Copying an image out of Word (or a browser, or Snipping Tool) usually
  // puts it on the clipboard as image data, not a file — a plain
  // <input type="file"> never sees that. Word in particular is inconsistent
  // about *which* format it puts on the clipboard depending on version, so
  // this checks both places a browser might expose it, and says something
  // useful if neither has a usable image instead of failing silently.
  const handlePaste = (e) => {
    const clipboardData = e.clipboardData;
    if (!clipboardData) return;

    const item = Array.from(clipboardData.items ?? []).find((it) => it.type.startsWith("image/"));
    const file = item ? item.getAsFile() : Array.from(clipboardData.files ?? []).find((f) => f.type.startsWith("image/"));

    if (!file) {
      // Something was pasted, just not a plain image the browser can read
      // (common with Word, which sometimes copies pictures as an embedded
      // object or a metafile instead of a bitmap) — don't stay silent.
      e.preventDefault();
      setStatus("error");
      setError(
        'Couldn\'t read an image from that paste. In Word, right-click the picture → "Save as Picture...", then use "Upload photo" below instead.'
      );
      return;
    }
    e.preventDefault();
    processFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    processFile(e.dataTransfer.files?.[0]);
  };

  return (
    <div
      tabIndex={0}
      onPaste={handlePaste}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      className={`rounded-md outline-none focus-visible:ring-2 focus-visible:ring-accent ${dragOver ? "ring-2 ring-accent" : ""}`}
    >
      <span className="mono-label text-[10px] text-ink-faint">{label}</span>
      <div className="mt-1.5 flex items-center gap-3">
        {value ? (
          <img src={value} alt="" className="h-14 w-14 rounded object-cover border border-line" />
        ) : (
          <span className="flex h-14 w-14 items-center justify-center rounded border border-dashed border-line text-ink-faint">
            <ImageIcon size={18} strokeWidth={1.5} />
          </span>
        )}

        <label className="inline-flex items-center gap-2 border border-line px-3 py-2 text-[12.5px] text-ink-dim hover:border-accent hover:text-accent transition-colors cursor-pointer">
          {status === "uploading" && <Loader2 size={13} className="animate-spin" />}
          {status === "uploading" ? "Uploading…" : value ? "Change photo" : "Upload photo"}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/svg+xml"
            onChange={handleFile}
            className="hidden"
            disabled={status === "uploading"}
          />
        </label>

        {value && (
          <button
            type="button"
            onClick={() => onChange(null)}
            className="text-ink-faint hover:text-accent transition-colors"
            aria-label="Remove photo"
          >
            <X size={16} strokeWidth={2} />
          </button>
        )}
      </div>
      <p className="mt-1.5 text-[11px] text-ink-faint">
        Click to browse, or click here and paste (Ctrl+V) an image copied from Word or anywhere else.
      </p>
      {status === "error" && <p className="mt-1.5 text-[12px] text-warn">{error}</p>}
    </div>
  );
}

/**
 * Same upload/paste/drag mechanics as ImageUploadField, but for a whole set
 * of photos rather than one — an event with a stack of photos from the day,
 * not just a single cover image. Each upload appends to the list; existing
 * ones can be reordered or removed the same way as any other list here.
 */
export function ImageGalleryField({ label, value = [], onChange }) {
  const [status, setStatus] = useState("idle"); // idle | uploading | error
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);

  const addFile = async (file) => {
    if (!file) return;
    if (file.size > MAX_UPLOAD_MB * 1024 * 1024) {
      setStatus("error");
      setError(`That file is over ${MAX_UPLOAD_MB}MB — use a smaller one.`);
      return;
    }
    setStatus("uploading");
    setError("");
    try {
      const path = await uploadImage(file);
      onChange([...value, path]);
      setStatus("idle");
    } catch (err) {
      setStatus("error");
      setError(err.message || "Upload failed.");
    }
  };

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    addFile(file);
  };

  const handlePaste = (e) => {
    const clipboardData = e.clipboardData;
    if (!clipboardData) return;
    const item = Array.from(clipboardData.items ?? []).find((it) => it.type.startsWith("image/"));
    const file = item ? item.getAsFile() : Array.from(clipboardData.files ?? []).find((f) => f.type.startsWith("image/"));

    if (!file) {
      e.preventDefault();
      setStatus("error");
      setError(
        'Couldn\'t read an image from that paste. In Word, right-click the picture → "Save as Picture...", then use "+ Add photo" below instead.'
      );
      return;
    }
    e.preventDefault();
    addFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    Array.from(e.dataTransfer.files ?? []).forEach((f) => {
      if (f.type.startsWith("image/")) addFile(f);
    });
  };

  const remove = (i) => onChange(value.filter((_, idx) => idx !== i));
  const move = (i, dir) => onChange(moveItem(value, i, dir));

  return (
    <div
      tabIndex={0}
      onPaste={handlePaste}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      className={`rounded-md outline-none focus-visible:ring-2 focus-visible:ring-accent ${dragOver ? "ring-2 ring-accent" : ""}`}
    >
      <span className="mono-label text-[10px] text-ink-faint">{label}</span>

      {value.length > 0 && (
        <div className="mt-2 grid grid-cols-3 sm:grid-cols-4 gap-2">
          {value.map((path, i) => (
            <div key={i} className="relative group">
              <img src={path} alt="" className="h-16 w-full rounded object-cover border border-line" />
              <div className="absolute top-1 right-1 flex items-center gap-0.5 rounded bg-bg/85 px-0.5">
                <MoveButtons index={i} count={value.length} onMove={move} />
                <button
                  type="button"
                  onClick={() => remove(i)}
                  className="text-ink-faint hover:text-accent transition-colors"
                  aria-label="Remove photo"
                >
                  <X size={13} strokeWidth={2} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <label className="mt-2 inline-flex items-center gap-2 border border-line px-3 py-2 text-[12.5px] text-ink-dim hover:border-accent hover:text-accent transition-colors cursor-pointer">
        {status === "uploading" && <Loader2 size={13} className="animate-spin" />}
        {status === "uploading" ? "Uploading…" : "+ Add photo"}
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/svg+xml"
          onChange={handleFile}
          className="hidden"
          disabled={status === "uploading"}
        />
      </label>
      <p className="mt-1.5 text-[11px] text-ink-faint">
        Add as many as you like — browse, paste (Ctrl+V), or drag photos in.
      </p>
      {status === "error" && <p className="mt-1.5 text-[12px] text-warn">{error}</p>}
    </div>
  );
}

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

/** Swaps an array item with its neighbour — the reordering primitive both
 * list editors below share. Returns the reordered array, or the same
 * reference if the move is out of bounds (first item moving up, etc). */
function moveItem(items, index, direction) {
  const target = index + direction;
  if (target < 0 || target >= items.length) return items;
  const next = [...items];
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}

function MoveButtons({ index, count, onMove }) {
  return (
    <>
      <button
        type="button"
        onClick={() => onMove(index, -1)}
        disabled={index === 0}
        aria-label="Move up"
        className="text-ink-faint hover:text-accent disabled:opacity-25 disabled:hover:text-ink-faint transition-colors"
      >
        <ChevronUp size={15} strokeWidth={2} />
      </button>
      <button
        type="button"
        onClick={() => onMove(index, 1)}
        disabled={index === count - 1}
        aria-label="Move down"
        className="text-ink-faint hover:text-accent disabled:opacity-25 disabled:hover:text-ink-faint transition-colors"
      >
        <ChevronDown size={15} strokeWidth={2} />
      </button>
    </>
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
  const move = (i, dir) => onChange(moveItem(items, i, dir));

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
          <MoveButtons index={i} count={items.length} onMove={move} />
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
  const move = (i, dir) => onChange(moveItem(items, i, dir));

  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <div key={i} className="relative border border-line bg-bg p-4 space-y-3">
          <div className="absolute top-3 right-3 flex items-center gap-2">
            <MoveButtons index={i} count={items.length} onMove={move} />
            <RemoveButton onClick={() => remove(i)} />
          </div>
          {renderItem(item, (partial) => updateAt(i, { ...item, ...partial }), i)}
        </div>
      ))}
      <AddButton onClick={add} label={addLabel ?? "+ Add item"} />
    </div>
  );
}
