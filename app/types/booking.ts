export type TimeFormat = "12h" | "24h";

export type TimeZoneId =
  | "Asia/Gaza"
  | "Europe/Berlin"
  | "America/New_York"
  | "Asia/Dubai";

export type BookingStatus = "confirmed" | "cancelled" | "rescheduled";

export interface TimeSlot {
  id: string;
  label12h: string;
  label24h: string;
  offsetMinutesFromGaza: number;
}

export interface TimeZoneOption {
  value: TimeZoneId;
  label: string;
}

export interface BookingEventDetails {
  slugPath: string;
  hostName: string;
  hostRole: string;
  hostAvatar: string;
  isVerified: boolean;
  title: string;
  description: string;
  durationMinutes: number;
  locationLabel: string;
  isAcceptingBookings: boolean;
}

export interface BookingFormPayload {
  guestName: string;
  guestEmail: string;
  notes: string;
  date: string;
  slotId: string;
  timeLabel: string;
  timeZone: TimeZoneId;
}

export interface FormattedBookingSummary {
  fullDateLabel: string;
  timeRangeLabel: string;
  shortDateTimeLabel: string;
  timeZoneLabel: string;
}

export interface CalendarDayItem {
  day: number;
  dateIso: string;
  isAvailable: boolean;
  isPast: boolean;
  isToday: boolean;
}

export interface BookingSummaryData {
  dateIso: string;
  formattedDate: string;
  formattedTime: string;
  fullDateLabel: string;
  shortDateTimeLabel: string;
  timeRangeLabel: string;
  timezoneId: TimeZoneId;
  timezoneLabel: string;
  timeZoneLabel: string;
  time24: string;
  durationMinutes: number;
}