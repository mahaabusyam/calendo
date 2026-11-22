import { BookingEventDetails } from "@/types/booking";

interface GoogleCalendarEventInput {
  event: BookingEventDetails;
  dateIso: string; // YYYY-MM-DD
  slotId: string; // HH:MM (base Asia/Gaza)
  guestName?: string;
  guestEmail?: string;
  notes?: string;
}

const GAZA_OFFSET_MINUTES = 120;

export function buildGoogleCalendarUrl({
  event,
  dateIso,
  slotId,
  guestName,
  guestEmail,
  notes,
}: GoogleCalendarEventInput): string {
  const safeDate = /^\d{4}-\d{2}-\d{2}$/.test(dateIso) ? dateIso : "2026-11-24";
  const [year, month, day] = safeDate.split("-").map(Number);

  const safeSlot = /^\d{2}:\d{2}$/.test(slotId) ? slotId : "10:00";
  const [hours, minutes] = safeSlot.split(":").map(Number);

  // Convert local Gaza time to UTC for Google Calendar `dates` parameter (YYYYMMDDTHHMMSSZ)
  const startUtcMs =
    Date.UTC(year, month - 1, day, hours, minutes, 0) - GAZA_OFFSET_MINUTES * 60 * 1000;
  const endUtcMs = startUtcMs + event.durationMinutes * 60 * 1000;

  const formatUtcCompact = (ms: number) => {
    const d = new Date(ms);
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(
      d.getUTCHours()
    )}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`;
  };

  const detailsLines = [
    event.description,
    guestName ? `Attendee: ${guestName}` : "",
    guestEmail ? `Email: ${guestEmail}` : "",
    notes ? `Notes: ${notes}` : "",
  ].filter(Boolean);

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${formatUtcCompact(startUtcMs)}/${formatUtcCompact(endUtcMs)}`,
    details: detailsLines.join("\n"),
    location: event.locationLabel,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
