// Everything the admin needs to talk to storage: the online database when it is
// configured, otherwise the local dev API (npm run dev).
import { cloudEnabled, CLOUD_URL, CLOUD_ANON_KEY, UPLOAD_BUCKET } from "../lib/cloud";

let clientPromise = null;
export function getSupabase() {
  if (!clientPromise) {
    clientPromise = import("@supabase/supabase-js").then(({ createClient }) =>
      createClient(CLOUD_URL, CLOUD_ANON_KEY, { auth: { persistSession: true, autoRefreshToken: true } })
    );
  }
  return clientPromise;
}

// ---------- sign in ----------
export async function cloudSession() {
  const sb = await getSupabase();
  const { data } = await sb.auth.getSession();
  return data.session;
}
export async function onCloudAuthChange(callback) {
  const sb = await getSupabase();
  const { data } = sb.auth.onAuthStateChange((_event, session) => callback(session));
  return () => data.subscription.unsubscribe();
}
export async function cloudSignIn(email, password) {
  const sb = await getSupabase();
  const { error } = await sb.auth.signInWithPassword({ email, password });
  return error ? error.message : null;
}
export async function cloudSignOut() {
  const sb = await getSupabase();
  await sb.auth.signOut();
}

// ---------- save content ----------
export async function saveContent(draft, localToken) {
  if (cloudEnabled) {
    const sb = await getSupabase();
    const { data: userData } = await sb.auth.getUser();
    const { error } = await sb
      .from("site_content")
      .upsert({ id: 1, data: draft, updated_at: new Date().toISOString(), updated_by: userData?.user?.email ?? null });
    if (error) throw new Error(error.message || "Could not save to the database.");
    return;
  }
  const res = await fetch("/api/content", {
    method: "PUT",
    headers: { "Content-Type": "application/json", "x-admin-token": localToken },
    body: JSON.stringify(draft),
  });
  if (res.status === 401) throw new Error("Session expired or wrong password — please sign in again.");
  if (!res.ok) throw new Error("Save failed");
}

// ---------- who may do what ----------
// Local dev: always an owner. Online: owner if listed in `admins`, otherwise an
// event editor limited to the events listed for their email.
export async function getAccess() {
  if (!cloudEnabled) return { admin: true, eventIds: [] };
  const sb = await getSupabase();
  const { data: isAdmin } = await sb.rpc("is_admin");
  if (isAdmin === true) return { admin: true, eventIds: [] };
  const { data } = await sb.from("event_editors").select("event_id");
  return { admin: false, eventIds: (data ?? []).map((r) => r.event_id) };
}

export async function listEventEditors(eventId) {
  const sb = await getSupabase();
  const { data, error } = await sb.from("event_editors").select("email").eq("event_id", eventId).order("added_at");
  if (error) throw new Error(error.message);
  return (data ?? []).map((r) => r.email);
}
export async function addEventEditor(eventId, email) {
  const sb = await getSupabase();
  const { error } = await sb.from("event_editors").upsert({ event_id: eventId, email: email.trim().toLowerCase() });
  if (error) throw new Error(error.message);
}
export async function removeEventEditor(eventId, email) {
  const sb = await getSupabase();
  const { error } = await sb.from("event_editors").delete().eq("event_id", eventId).eq("email", email);
  if (error) throw new Error(error.message);
}
export async function saveEventAsEditor(eventId, event) {
  const sb = await getSupabase();
  const { error } = await sb.rpc("save_event", { p_id: eventId, p_event: event });
  if (error) throw new Error(error.message || "Could not save this event.");
}

// ---------- upload a photo / video ----------
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",")[1]);
    reader.onerror = () => reject(new Error("Could not read that file."));
    reader.readAsDataURL(file);
  });
}

const EXT = {
  "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "image/svg+xml": "svg",
  "video/mp4": "mp4", "video/webm": "webm", "video/quicktime": "mov",
};

export async function uploadFile(file, localToken) {
  if (cloudEnabled) {
    const ext = EXT[file.type];
    if (!ext) throw new Error("Only JPG, PNG, WebP, SVG images and MP4, WebM or MOV videos can be uploaded.");
    const base = (file.name || "upload").replace(/\.[^.]+$/, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) || "upload";
    const path = `${Date.now()}-${base}.${ext}`;
    const sb = await getSupabase();
    const { error } = await sb.storage.from(UPLOAD_BUCKET).upload(path, file, { contentType: file.type, cacheControl: "31536000" });
    if (error) throw new Error(error.message || "Upload failed.");
    return sb.storage.from(UPLOAD_BUCKET).getPublicUrl(path).data.publicUrl;
  }
  const dataBase64 = await fileToBase64(file);
  const res = await fetch("/api/upload", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-admin-token": localToken },
    body: JSON.stringify({ filename: file.name, mime: file.type, dataBase64 }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Upload failed.");
  return data.path;
}
