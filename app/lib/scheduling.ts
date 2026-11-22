import {
  BookingSummaryData,
  CalendarDayItem,
  TimeFormat,
  TimeSlot,
  TimeZoneOption,
} from "@/types/booking";

export const TIME_ZONES: TimeZoneOption[] = [
  { value: "Asia/Gaza", label: "Asia/Gaza (GMT+2)", offsetMinutes: 120 },
  {
    value: "Europe/Berlin",
    label: "Europe/Berlin (GMT+1)",
    offsetMinutes: 60,
  },
  {
    value: "America/New_York",
    label: "America/New_York (GMT-5)",
    offsetMinutes: -300,
  },
  { value: "Asia/Dubai", label: "Asia/Dubai (GMT+4)", offsetMinutes: 240 },
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

export const DEFAULT_AVAILABLE_DAYS: number[] = [
  1, 2, 3, 4, 8, 9, 10, 11, 15, 16, 17, 18, 22, 23, 24, 25, 26, 29, 30,
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

export function getMonthTitle(year: number, monthIndex: number): string {
  const safeMonth = ((monthIndex % 12) + 12) % 12;
  return `${MONTH_NAMES[safeMonth]} ${year}`;
}

export function getFirstDayOffset(year: number, monthIndex: number): number {
  return new Date(year, monthIndex, 1).getDay();
}

export function getDaysInMonth(year: number, monthIndex: number): number {
  return new Date(year, monthIndex + 1, 0).getDate();
}

export function buildMonthDays(
  year: number,
  monthIndex: number,
  availableDays: number[] = DEFAULT_AVAILABLE_DAYS,
  pastBeforeDay: number = 22,
  todayDay: number = 22
): CalendarDayItem[] {
  const daysInMonth = getDaysInMonth(year, monthIndex);
  const availableDaysSet = new Set<number>(
    Array.isArray(availableDays) ? availableDays : DEFAULT_AVAILABLE_DAYS
  );

  return Array.from({ length: daysInMonth }, (_, idx) => {
    const day = idx + 1;
    const isPast = day < pastBeforeDay;
    const isAvailable = !isPast && availableDaysSet.has(day);
    const isToday = day === todayDay;
    const monthStr = String(monthIndex + 1).padStart(2, "0");
    const dayStr = String(day).padStart(2, "0");

    return {
      day,
      dateIso: `${year}-${monthStr}-${dayStr}`,
      isAvailable,
      isPast,
      isToday,
    };
  });
}

export function formatSelectedHeading(
  day: number,
  monthIndex: number,
  year: number
): string {
  const dateObj = new Date(year, monthIndex, day);
  const weekday = WEEKDAY_NAMES[dateObj.getDay()] ?? "Tue";
  const monthShort = SHORT_MONTH_NAMES[monthIndex] ?? "Nov";
  return `${weekday}, ${monthShort} ${day}`;
}

function extractBaseTime24(input: unknown): string {
  if (typeof input === "string" && input.includes(":")) {
    return input;
  }
  if (typeof input === "number") {
    return `${String(input).padStart(2, "0")}:00`;
  }
  if (input && typeof input === "object") {
    const obj = input as { label24h?: string; id?: string };
    if (typeof obj.label24h === "string" && obj.label24h.includes(":")) {
      return obj.label24h;
    }
    if (typeof obj.id === "string" && obj.id.includes(":")) {
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
    ((totalMinutesRaw % minutesInDay) + minutesInDay) % minutesInDay;

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

export function formatSlotLabel(
  baseTime24: unknown,
  timezoneId: string,
  timeFormat: TimeFormat
): string {
  const rawStr = extractBaseTime24(baseTime24);
  const parts = rawStr.split(":");
  const baseHours = Number.isFinite(Number(parts[0])) ? Number(parts[0]) : 9;
  const minutes = Number.isFinite(Number(parts[1])) ? Number(parts[1]) : 0;

  const gazaOffset = 120;
  const targetTz =
    TIME_ZONES.find((tz) => tz.value === timezoneId) ?? TIME_ZONES[0];
  const diffMinutes = targetTz.offsetMinutes - gazaOffset;

  const totalMinutesRaw = baseHours * 60 + minutes + diffMinutes;
  return formatMinutesToDisplay(totalMinutesRaw, timeFormat);
}

export function formatSlotForTimezone(
  baseTime24: unknown,
  timezoneId: string,
  timeFormat: TimeFormat
): string {
  return formatSlotLabel(baseTime24, timezoneId, timeFormat);
}

export function formatTimezoneShortLabel(timezoneId: string): string {
  const found = TIME_ZONES.find((tz) => tz.value === timezoneId);
  return found ? found.label : "Asia/Gaza (GMT+2)";
}

export function buildBookingSummary(
  dateIsoOrParams?:
    | string
    | null
    | {
        dateIso?: string | null;
        slotId?: string | null;
        time24?: string | null;
        tz?: string | null;
        timeFormat?: TimeFormat;
        durationMinutes?: number;
      },
  slotIdArg?: string | null,
  tzArg?: string | null,
  durationMinutesArg?: number
): BookingSummaryData {
  const isObj = typeof dateIsoOrParams === "object" && dateIsoOrParams !== null;

  const safeDateIso =
    (isObj ? dateIsoOrParams.dateIso : dateIsoOrParams) || "2026-11-24";
  const safeTime24 =
    (isObj
      ? dateIsoOrParams.time24 || dateIsoOrParams.slotId
      : slotIdArg) || "10:00";
  const safeTz = (isObj ? dateIsoOrParams.tz : tzArg) || "Asia/Gaza";
  const safeTimeFormat = (isObj && dateIsoOrParams.timeFormat) || "12h";
  const safeDuration =
    (isObj ? dateIsoOrParams.durationMinutes : durationMinutesArg) || 30;

  const parts = safeDateIso.split("-");
  const year = Number(parts[0]) || 2026;
  const monthIndex = Math.max(0, (Number(parts[1]) || 11) - 1);
  const day = Number(parts[2]) || 24;

  const dateObj = new Date(year, monthIndex, day);
  const weekday = WEEKDAY_NAMES[dateObj.getDay()] ?? "Tue";
  const monthName = MONTH_NAMES[monthIndex] ?? "November";
  const formattedDate = `${weekday}, ${monthName} ${day}, ${year}`;

  const timeParts = safeTime24.split(":");
  const startHours = Number.isFinite(Number(timeParts[0]))
    ? Number(timeParts[0])
    : 10;
  const startMinutes = Number.isFinite(Number(timeParts[1]))
    ? Number(timeParts[1])
    : 0;

  const gazaOffset = 120;
  const targetTz =
    TIME_ZONES.find((tz) => tz.value === safeTz) ?? TIME_ZONES[0];
  const diffMinutes = targetTz.offsetMinutes - gazaOffset;

  const startTotalMinutes = startHours * 60 + startMinutes + diffMinutes;
  const endTotalMinutes = startTotalMinutes + safeDuration;

  const formattedTime = formatMinutesToDisplay(
    startTotalMinutes,
    safeTimeFormat
  );
  const endFormattedTime = formatMinutesToDisplay(
    endTotalMinutes,
    safeTimeFormat
  );
  const timezoneLabel = formatTimezoneShortLabel(safeTz);

    const shortDateTimeLabel = `${formattedDate} · ${formattedTime}`;

  return {
    dateIso: safeDateIso,
    formattedDate,
    formattedTime,
    fullDateLabel: formattedDate,
    shortDateTimeLabel,
    timeRangeLabel: `${formattedTime} – ${endFormattedTime}`,
    timezoneId: safeTz,
    timezoneLabel,
    timeZoneLabel: timezoneLabel,
    time24: safeTime24,
    durationMinutes: safeDuration,
  };

}
