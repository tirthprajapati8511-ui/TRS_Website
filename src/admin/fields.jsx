// Small, shared form building blocks for the admin editors. Kept plain and
// unstyled-fancy on purpose — this panel is a utility, not a showcase.

import { useState } from "react";
import { ImageIcon, Loader2, X } from "lucide-react";
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

  // Copying an image out of Word (or a browser, or Snipping Tool) puts it on
  // the clipboard as image data, not a file — a plain <input type="file">
  // never sees that. Catching paste here means Ctrl+V just works instead of
  // needing "save the image somewhere first, then browse to it".
  const handlePaste = (e) => {
    const item = Array.from(e.clipboardData?.items ?? []).find((it) => it.type.startsWith("image/"));
    if (!item) return;
    e.preventDefault();
    processFile(item.getAsFile());
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
