export type TimeFormat = "12h" | "24h";

export interface TimeSlot {
  id: string;
  label12h: string;
  label24h: string;
  offsetMinutesFromGaza: number;
}

export interface TimeZoneOption {
  value: string;
  label: string;
  offsetMinutes: number; // relative to UTC
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
  timeZone: string;
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
  timezoneId: string;
  timezoneLabel: string;
  timeZoneLabel: string;
  time24: string;
  durationMinutes: number;
}
