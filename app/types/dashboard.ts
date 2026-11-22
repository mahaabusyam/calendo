export type WeekdayName =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";

export interface DayAvailabilityRule {
  day: WeekdayName;
  enabled: boolean;
  startTime: string;
  endTime: string;
}

export type BookingBadgeTone = "primary" | "neutral";

export interface UpcomingBookingItem {
  id: string;
  guestName: string;
  guestEmail: string;
  eventTypeLabel: string;
  badgeTone: BookingBadgeTone;
  dateLabel: string;
  timeRangeLabel: string;
  status: "upcoming" | "rescheduled" | "cancelled";
}

export interface DashboardMetrics {
  upcomingCount: number;
  upcomingDeltaLabel: string;
  completedCount: number;
  attendanceRateLabel: string;
  activeEventTypesCount: number;
  durationsSummaryLabel: string;
}
