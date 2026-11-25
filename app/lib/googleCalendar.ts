import {
  BookingEventDetails,
  TimeZoneId,
} from "@/types/booking";

interface GoogleCalendarEventInput {
  event: BookingEventDetails;
  dateIso: string;
  slotId: string;
  timeZone?: TimeZoneId;
  guestName?: string;
  guestEmail?: string;
  notes?: string;
}

function getTimeZoneOffsetMinutes(
  timeZone: TimeZoneId,
  date: Date
): number {
  const parts = new Intl.DateTimeFormat(
    "en-US",
    {
      timeZone,
      timeZoneName: "longOffset",
      hour: "2-digit",
      minute: "2-digit",
    }
  ).formatToParts(date);

  const offsetPart =
    parts.find(
      (part) =>
        part.type === "timeZoneName"
    )?.value;

  if (
    !offsetPart ||
    offsetPart === "GMT"
  ) {
    return 0;
  }

  const match =
    offsetPart.match(
      /^GMT([+-])(\d{1,2})(?::(\d{2}))?$/
    );

  if (!match) {
    return 0;
  }

  const sign =
    match[1] === "+"
      ? 1
      : -1;

  const hours =
    Number(match[2]);

  const minutes =
    Number(match[3] ?? 0);

  return (
    sign *
    (hours * 60 + minutes)
  );
}

export function buildGoogleCalendarUrl({
  event,
  dateIso,
  slotId,
  timeZone = "Asia/Gaza",
  guestName,
  guestEmail,
  notes,
}: GoogleCalendarEventInput): string {
    
    // الصفحة تتحقق من الصيغة قبل الوصول إلى هنا
  const [year, month, day] = dateIso.split("-").map(Number);
  const [hours, minutes] = slotId.split(":").map(Number);
  const localWallClockAsUtc =
    new Date(
      Date.UTC(
        year,
        month - 1,
        day,
        hours,
        minutes,
        0
      )
    );


  const sourceOffset =
    getTimeZoneOffsetMinutes(
      timeZone,
      localWallClockAsUtc
    );

  const startUtcMs =
    localWallClockAsUtc.getTime() -
    sourceOffset *
      60 *
      1000;

  const endUtcMs =
    startUtcMs +
    event.durationMinutes *
      60 *
      1000;

  const formatUtcCompact = (
    ms: number
  ) => {
    const d =
      new Date(ms);

    const pad = (
      value: number
    ) =>
      String(value)
        .padStart(2, "0");

    return `${d.getUTCFullYear()}${pad(
      d.getUTCMonth() + 1
    )}${pad(
      d.getUTCDate()
    )}T${pad(
      d.getUTCHours()
    )}${pad(
      d.getUTCMinutes()
    )}${pad(
      d.getUTCSeconds()
    )}Z`;
  };

  const detailsLines = [
    event.description,
    guestName
      ? `Attendee: ${guestName}`
      : "",
    guestEmail
      ? `Email: ${guestEmail}`
      : "",
    notes
      ? `Notes: ${notes}`
      : "",
  ].filter(Boolean);

  const params =
    new URLSearchParams({
      action: "TEMPLATE",
      text: event.title,
      dates:
        `${formatUtcCompact(
          startUtcMs
        )}/${formatUtcCompact(
          endUtcMs
        )}`,
      details:
        detailsLines.join(
          "\n"
        ),
      location:
        event.locationLabel,
    });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}