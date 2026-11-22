import {
  DashboardMetrics,
  DayAvailabilityRule,
  UpcomingBookingItem,
} from "@/types/dashboard";

export const START_TIME_OPTIONS = ["08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM"];
export const END_TIME_OPTIONS = ["03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM"];

export const INITIAL_WEEK_SCHEDULE: DayAvailabilityRule[] = [
  { day: "Sunday", enabled: true, startTime: "09:00 AM", endTime: "05:00 PM" },
  { day: "Monday", enabled: true, startTime: "09:00 AM", endTime: "05:00 PM" },
  { day: "Tuesday", enabled: true, startTime: "09:00 AM", endTime: "05:00 PM" },
  { day: "Wednesday", enabled: true, startTime: "09:00 AM", endTime: "05:00 PM" },
  { day: "Thursday", enabled: true, startTime: "09:00 AM", endTime: "04:00 PM" },
  { day: "Friday", enabled: false, startTime: "09:00 AM", endTime: "05:00 PM" },
  { day: "Saturday", enabled: false, startTime: "09:00 AM", endTime: "05:00 PM" },
];

export const INITIAL_UPCOMING_BOOKINGS: UpcomingBookingItem[] = [
  {
    id: "bk-1",
    guestName: "Layla Al-Mansoor",
    guestEmail: "layla@northstar.io",
    eventTypeLabel: "30-Min Consultation",
    badgeTone: "primary",
    dateLabel: "Nov 24, 2026",
    timeRangeLabel: "10:00 AM – 10:30 AM",
    status: "upcoming",
  },
  {
    id: "bk-2",
    guestName: "Daniel Chen",
    guestEmail: "dchen@vergecloud.dev",
    eventTypeLabel: "45-Min System Audit",
    badgeTone: "neutral",
    dateLabel: "Nov 24, 2026",
    timeRangeLabel: "01:30 PM – 02:15 PM",
    status: "upcoming",
  },
  {
    id: "bk-3",
    guestName: "Nadia Khoury",
    guestEmail: "nadia@khourydesign.co",
    eventTypeLabel: "30-Min Consultation",
    badgeTone: "primary",
    dateLabel: "Nov 25, 2026",
    timeRangeLabel: "09:30 AM – 10:00 AM",
    status: "upcoming",
  },
  {
    id: "bk-4",
    guestName: "Jonas Lindqvist",
    guestEmail: "jonas@kestrel.se",
    eventTypeLabel: "60-Min Deep Dive",
    badgeTone: "neutral",
    dateLabel: "Nov 26, 2026",
    timeRangeLabel: "02:00 PM – 03:00 PM",
    status: "upcoming",
  },
];

export const INITIAL_METRICS: DashboardMetrics = {
  upcomingCount: 12,
  upcomingDeltaLabel: "+3 this week",
  completedCount: 48,
  attendanceRateLabel: "98% attendance",
  activeEventTypesCount: 3,
  durationsSummaryLabel: "30m · 45m · 60m",
};
