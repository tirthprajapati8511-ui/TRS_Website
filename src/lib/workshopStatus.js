// Workshop status is free text in the admin; pick the pill colour from it.
export function workshopTone(status) {
  const s = String(status ?? "").toLowerCase();
  if (/(complet|past|done|concluded|finished)/.test(s)) return "neutral";
  if (/(ongoing|live|in progress|open)/.test(s)) return "good";
  return "accent";
}
