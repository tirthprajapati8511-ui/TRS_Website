// Builds "add to calendar" data for an all-day event from ISO dates
// (YYYY-MM-DD). Calendars treat the end of an all-day event as exclusive, so
// the stored last day is moved forward by one.

const ISO = /^\d{4}-\d{2}-\d{2}$/;

export function parseEventDates(event) {
  const start = (event.startDate ?? "").trim();
  if (!ISO.test(start)) return null;
  const rawEnd = (event.endDate ?? "").trim();
  const end = ISO.test(rawEnd) && rawEnd >= start ? rawEnd : start;
  return { start, end };
}

const compact = (iso) => iso.replaceAll("-", "");

function dayAfter(iso) {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().slice(0, 10);
}

const escapeIcs = (s) =>
  String(s ?? "")
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");

export function googleCalendarUrl(event, dates, pageUrl) {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.name,
    dates: `${compact(dates.start)}/${compact(dayAfter(dates.end))}`,
    details: `${event.description ?? ""}\n\n${pageUrl}`.trim(),
    location: event.location ?? "",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function buildIcs(event, dates, pageUrl) {
  const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//TRS BVM//Events//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${event.id}@trs-bvm`,
    `DTSTAMP:${stamp}`,
    `DTSTART;VALUE=DATE:${compact(dates.start)}`,
    `DTEND;VALUE=DATE:${compact(dayAfter(dates.end))}`,
    `SUMMARY:${escapeIcs(event.name)}`,
    `LOCATION:${escapeIcs(event.location)}`,
    `DESCRIPTION:${escapeIcs(`${event.description ?? ""}\n${pageUrl}`)}`,
    `URL:${pageUrl}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.join("\r\n");
}

export function downloadIcs(event, dates, pageUrl) {
  const blob = new Blob([buildIcs(event, dates, pageUrl)], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${event.id}.ics`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
