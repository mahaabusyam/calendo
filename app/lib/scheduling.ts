import {
  BookingSummaryData,
  CalendarDayItem,
  TimeFormat,
  TimeSlot,
  TimeZoneId,
  TimeZoneOption,
} from "@/types/booking";

export const TIME_ZONES: TimeZoneOption[] = [
  { value: "Asia/Gaza", label: "Asia/Gaza" },
  { value: "Europe/Berlin", label: "Europe/Berlin" },
  { value: "America/New_York", label: "America/New_York" },
  { value: "Asia/Dubai", label: "Asia/Dubai" },
];

export const BASE_SLOTS_GAZA: TimeSlot[] = [
  {
    id: "09:00",
    label12h: "09:00 AM",
    label24h: "09:00",
    offsetMinutesFromGaza: 0,
  },
  {
    id: "09:30",
    label12h: "09:30 AM",
    label24h: "09:30",
    offsetMinutesFromGaza: 0,
  },
  {
    id: "10:00",
    label12h: "10:00 AM",
    label24h: "10:00",
    offsetMinutesFromGaza: 0,
  },
  {
    id: "10:30",
    label12h: "10:30 AM",
    label24h: "10:30",
    offsetMinutesFromGaza: 0,
  },
  {
    id: "11:00",
    label12h: "11:00 AM",
    label24h: "11:00",
    offsetMinutesFromGaza: 0,
  },
  {
    id: "13:00",
    label12h: "01:00 PM",
    label24h: "13:00",
    offsetMinutesFromGaza: 0,
  },
  {
    id: "13:30",
    label12h: "01:30 PM",
    label24h: "13:30",
    offsetMinutesFromGaza: 0,
  },
  {
    id: "14:00",
    label12h: "02:00 PM",
    label24h: "14:00",
    offsetMinutesFromGaza: 0,
  },
];


const WEEKDAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const SHORT_MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function getTodayDate(): Date {
  return new Date();
}

export function getTodayIso(): string {
  const today = getTodayDate();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function getMonthTitle(year: number, monthIndex: number): string {
  const safeMonth = ((monthIndex % 12) + 12) % 12;

  return `${MONTH_NAMES[safeMonth]} ${year}`;
}

export function getFirstDayOffset(
  year: number,
  monthIndex: number
): number {
  return new Date(year, monthIndex, 1).getDay();
}

export function getDaysInMonth(
  year: number,
  monthIndex: number
): number {
  return new Date(year, monthIndex + 1, 0).getDate();
}

function isSameMonth(
  year: number,
  monthIndex: number,
  date: Date
): boolean {
  return (
    year === date.getFullYear() &&
    monthIndex === date.getMonth()
  );
}

function isMonthBeforeToday(
  year: number,
  monthIndex: number,
  today: Date
): boolean {
  return (
    year < today.getFullYear() ||
    (year === today.getFullYear() && monthIndex < today.getMonth())
  );
}

function isMonthAfterToday(
  year: number,
  monthIndex: number,
  today: Date
): boolean {
  return (
    year > today.getFullYear() ||
    (year === today.getFullYear() && monthIndex > today.getMonth())
  );
}

export const AVAILABLE_WEEKDAYS = [0, 1, 2, 3, 4];

export function toDateIso(d: Date): string {
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mm}-${dd}`;
}

export function buildMonthDays(
  year: number,
  monthIndex: number,
  todayIso: string
): CalendarDayItem[] {
  return Array.from(
    { length: getDaysInMonth(year, monthIndex) },
    (_, idx) => {
      const day = idx + 1;
      const date = new Date(year, monthIndex, day);
      const dateIso = toDateIso(date);
      const isPast = dateIso < todayIso; // نص ISO يُقارَن أبجدياً بشكل صحيح
      return {
        day,
        dateIso,
        isPast,
        isToday: dateIso === todayIso,
        isAvailable: !isPast && AVAILABLE_WEEKDAYS.includes(date.getDay()),
      };
    }
  );
}

export function formatSelectedHeading(dateIso: string): string {
  const [y, m, d] = dateIso.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return `${WEEKDAY_NAMES[date.getDay()]}, ${SHORT_MONTH_NAMES[m - 1]} ${d}`;
}

function extractBaseTime24(input: unknown): string {
  if (typeof input === "string" && input.includes(":")) {
    return input;
  }

  if (typeof input === "number") {
    return `${String(input).padStart(2, "0")}:00`;
  }

  if (input && typeof input === "object") {
    const obj = input as {
      label24h?: string;
      id?: string;
    };

    if (
      typeof obj.label24h === "string" &&
      obj.label24h.includes(":")
    ) {
      return obj.label24h;
    }

    if (
      typeof obj.id === "string" &&
      obj.id.includes(":")
    ) {
      return obj.id;
    }
  }

  return "09:00";
}

function formatMinutesToDisplay(
  totalMinutesRaw: number,
  timeFormat: TimeFormat
): string {
  const minutesInDay = 24 * 60;

  const normalizedMinutes =
    ((totalMinutesRaw % minutesInDay) + minutesInDay) %
    minutesInDay;

  const finalHours24 = Math.floor(normalizedMinutes / 60);
  const finalMinutes = normalizedMinutes % 60;

  const mm = String(finalMinutes).padStart(2, "0");

  if (timeFormat === "24h") {
    const hh24 = String(finalHours24).padStart(2, "0");

    return `${hh24}:${mm}`;
  }

  const period = finalHours24 >= 12 ? "PM" : "AM";

  const hours12Raw = finalHours24 % 12;
  const hours12 = hours12Raw === 0 ? 12 : hours12Raw;

  const hh12 = String(hours12).padStart(2, "0");

  return `${hh12}:${mm} ${period}`;
}

function getTimeZoneOffsetMinutes(
  timeZone: TimeZoneId,
  date: Date
): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: "longOffset",
    hour: "2-digit",
    minute: "2-digit",
  }).formatToParts(date);

  const offsetPart = parts.find(
    (part) => part.type === "timeZoneName"
  )?.value;

  if (!offsetPart || offsetPart === "GMT") {
    return 0;
  }

  const match = offsetPart.match(
    /^GMT([+-])(\d{1,2})(?::(\d{2}))?$/
  );

  if (!match) {
    return 0;
  }

  const sign = match[1] === "+" ? 1 : -1;
  const hours = Number(match[2]);
  const minutes = Number(match[3] ?? 0);

  return sign * (hours * 60 + minutes);
}

function getDateParts(dateIso: string): {
  year: number;
  month: number;
  day: number;
} {
  const [year, month, day] = dateIso.split("-").map(Number);

  const current = new Date();

  return {
    year: Number.isFinite(year) ? year : current.getFullYear(),
    month: Number.isFinite(month)
      ? Math.max(1, Math.min(12, month))
      : current.getMonth() + 1,
    day: Number.isFinite(day)
      ? Math.max(1, Math.min(31, day))
      : current.getDate(),
  };
}

function getTimeZoneDifferenceMinutes(
  dateIso: string,
  sourceTimeZone: TimeZoneId,
  targetTimeZone: TimeZoneId
): number {
  const { year, month, day } = getDateParts(dateIso);

  const sourceWallClockAsUtc = new Date(
    Date.UTC(year, month - 1, day)
  );

  const sourceOffset = getTimeZoneOffsetMinutes(
    sourceTimeZone,
    sourceWallClockAsUtc
  );

  const actualUtc = new Date(
    sourceWallClockAsUtc.getTime() -
      sourceOffset * 60 * 1000
  );

  const targetOffset = getTimeZoneOffsetMinutes(
    targetTimeZone,
    actualUtc
  );

  return targetOffset - sourceOffset;
}

export function formatSlotLabel(
  baseTime24: unknown,
  timezoneId: TimeZoneId,
  timeFormat: TimeFormat,
  dateIso: string = getTodayIso()
): string {
  const rawStr = extractBaseTime24(baseTime24);

  const parts = rawStr.split(":");

  const baseHours = Number.isFinite(Number(parts[0]))
    ? Number(parts[0])
    : 9;

  const minutes = Number.isFinite(Number(parts[1]))
    ? Number(parts[1])
    : 0;

  const diffMinutes = getTimeZoneDifferenceMinutes(
    dateIso,
    "Asia/Gaza",
    timezoneId
  );

  const totalMinutesRaw =
    baseHours * 60 + minutes + diffMinutes;

  return formatMinutesToDisplay(
    totalMinutesRaw,
    timeFormat
  );
}

export function formatSlotForTimezone(
  baseTime24: unknown,
  timezoneId: TimeZoneId,
  timeFormat: TimeFormat,
  dateIso: string = getTodayIso()
): string {
  return formatSlotLabel(
    baseTime24,
    timezoneId,
    timeFormat,
    dateIso
  );
}

export function formatTimezoneShortLabel(
  timezoneId: TimeZoneId,
  date: Date = new Date()
): string {
  const found = TIME_ZONES.find(
    (tz) => tz.value === timezoneId
  );

  const offsetMinutes = getTimeZoneOffsetMinutes(
    timezoneId,
    date
  );

  const sign = offsetMinutes >= 0 ? "+" : "-";
  const absoluteOffset = Math.abs(offsetMinutes);

  const hours = Math.floor(absoluteOffset / 60);
  const minutes = absoluteOffset % 60;

  const formattedOffset =
    minutes === 0
      ? `${sign}${hours}`
      : `${sign}${hours}:${String(minutes).padStart(2, "0")}`;

  return `${found?.label ?? timezoneId} (GMT${formattedOffset})`;
}

export function buildBookingSummary(
  dateIsoOrParams?:
    | string
    | null
    | {
        dateIso?: string | null;
        slotId?: string | null;
        time24?: string | null;
        tz?: TimeZoneId | null;
        timeFormat?: TimeFormat;
        durationMinutes?: number;
      },
  slotIdArg?: string | null,
  tzArg?: TimeZoneId | null,
  durationMinutesArg?: number
): BookingSummaryData {
  const isObj =
    typeof dateIsoOrParams === "object" &&
    dateIsoOrParams !== null;

  const safeDateIso =
    (isObj ? dateIsoOrParams.dateIso : dateIsoOrParams) ||
    getTodayIso();

  const safeTime24 =
    (isObj
      ? dateIsoOrParams.time24 ||
        dateIsoOrParams.slotId
      : slotIdArg) || "10:00";

  const safeTz =
    (isObj ? dateIsoOrParams.tz : tzArg) ||
    "Asia/Gaza";

  const safeTimeFormat =
    (isObj && dateIsoOrParams.timeFormat) ||
    "12h";

  const safeDuration =
    (isObj
      ? dateIsoOrParams.durationMinutes
      : durationMinutesArg) || 30;

  const { year, month, day } =
    getDateParts(safeDateIso);

  const dateObj = new Date(
    year,
    month - 1,
    day
  );

  const weekday =
    WEEKDAY_NAMES[dateObj.getDay()] ??
    WEEKDAY_NAMES[0];

  const monthName =
    MONTH_NAMES[month - 1] ??
    MONTH_NAMES[0];

  const formattedDate =
    `${weekday}, ${monthName} ${day}, ${year}`;

  const timeParts = safeTime24.split(":");

  const startHours = Number.isFinite(
    Number(timeParts[0])
  )
    ? Number(timeParts[0])
    : 10;

  const startMinutes = Number.isFinite(
    Number(timeParts[1])
  )
    ? Number(timeParts[1])
    : 0;

  const diffMinutes =
    getTimeZoneDifferenceMinutes(
      safeDateIso,
      "Asia/Gaza",
      safeTz
    );

  const startTotalMinutes =
    startHours * 60 +
    startMinutes +
    diffMinutes;

  const endTotalMinutes =
    startTotalMinutes + safeDuration;

  const formattedTime =
    formatMinutesToDisplay(
      startTotalMinutes,
      safeTimeFormat
    );

  const endFormattedTime =
    formatMinutesToDisplay(
      endTotalMinutes,
      safeTimeFormat
    );

  const timezoneLabel =
    formatTimezoneShortLabel(
      safeTz,
      dateObj
    );

  const shortDateTimeLabel =
    `${formattedDate} · ${formattedTime}`;

  return {
    dateIso: safeDateIso,
    formattedDate,
    formattedTime,
    fullDateLabel: formattedDate,
    shortDateTimeLabel,
    timeRangeLabel:
      `${formattedTime} – ${endFormattedTime}`,
    timezoneId: safeTz,
    timezoneLabel,
    timeZoneLabel: timezoneLabel,
    time24: safeTime24,
    durationMinutes: safeDuration,
  };
}