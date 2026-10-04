import { CalendarPlus } from "lucide-react";
import { downloadIcs, googleCalendarUrl, parseEventDates } from "../lib/calendar";

const cls =
  "inline-flex items-center gap-2 rounded-md border border-line-strong px-3.5 py-2 text-[13px] font-medium text-ink transition-colors hover:border-accent hover:text-accent cursor-pointer";

// Shown only when the event has a start date set in the admin.
export default function AddToCalendar({ event }) {
  const dates = parseEventDates(event);
  if (!dates) return null;
  const pageUrl = window.location.href;

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <a
        href={googleCalendarUrl(event, dates, pageUrl)}
        target="_blank"
        rel="noreferrer"
        className={cls}
      >
        <CalendarPlus size={15} strokeWidth={2} />
        Google Calendar
      </a>
      <button type="button" onClick={() => downloadIcs(event, dates, pageUrl)} className={cls}>
        <CalendarPlus size={15} strokeWidth={2} />
        Apple / Outlook (.ics)
      </button>
    </div>
  );
}
