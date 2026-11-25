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
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "13:00",
  "13:30",
  "14:00",
].map((id) => ({ id }));


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

export function parseTimeZoneId(value: string | undefined): TimeZoneId | null {
  return TIME_ZONES.find((tz) => tz.value === value)?.value ?? null;
}

const BASE_TIMEZONE: TimeZoneId = "Asia/Gaza";

// كم دقيقة يبعد توقيت منطقة معينة عن UTC في لحظة معينة
function getTimeZoneOffsetMinutes(timeZone: string, utcMs: number): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(new Date(utcMs));

  const get = (type: string) =>
    Number(parts.find((p) => p.type === type)?.value);

  const asUtc = Date.UTC(
    get("year"),
    get("month") - 1,
    get("day"),
    get("hour"),
    get("minute"),
    get("second")
  );
  return Math.round((asUtc - utcMs) / 60000);
}

// الموعد مكتوب بتوقيت غزة، فنحوّله للحظة UTC حقيقية
function slotToUtcMs(dateIso: string, time24: string): number {
  const [y, m, d] = dateIso.split("-").map(Number);
  const [h, min] = time24.split(":").map(Number);
  const guess = Date.UTC(y, m - 1, d, h, min);
  return guess - getTimeZoneOffsetMinutes(BASE_TIMEZONE, new Date(guess)) * 60000;
}

export function formatSlotLabel(
  baseTime24: string,
  timezoneId: TimeZoneId,
  timeFormat: TimeFormat,
  dateIso: string
): string {
  const utcMs = slotToUtcMs(dateIso, baseTime24);
  return new Intl.DateTimeFormat("en-US", {
    timeZone: timezoneId,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: timeFormat === "12h" ? "h12" : "h23",
  }).format(new Date(utcMs));
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
  dateIso: string,
  slotId: string,
  tz: TimeZoneId,
  durationMinutes: number,
  timeFormat: TimeFormat = "12h"
): BookingSummaryData {
  const safeDateIso = dateIso;
  const safeTime24 = slotId;
  const safeTz = tz;
  const safeTimeFormat = timeFormat;
  const safeDuration = durationMinutes;

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