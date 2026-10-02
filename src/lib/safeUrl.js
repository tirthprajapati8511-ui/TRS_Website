// Only http(s) links are rendered as links — a typo or a pasted "javascript:"
// string in the admin can't become a clickable script.
export function safeUrl(value) {
  const url = (value ?? "").trim();
  return /^https?:\/\//i.test(url) ? url : null;
}
