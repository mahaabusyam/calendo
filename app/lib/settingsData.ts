import {
  BufferMinutesOption,
  ConnectedIntegrationItem,
  HostProfileSettings,
  MinimumNoticeHours,
  SchedulingPreferences,
} from "@/types/settings";

export const INITIAL_PROFILE_SETTINGS: HostProfileSettings = {
  fullName: "Maha Abu Syam",
  usernameSlug: "maha",
  bio: "Principal Frontend Architect specializing in React, Next.js, and scalable design systems.",
  avatarUrl:
    "https://lh3.googleusercontent.com/aida/ALJJyrBHg54wTuYi9UFNjLoH3xjKB7So25WoTmGs90A7brmjLMDYQaPBLvzKgT9w33W0R7daE8mKEUVdvUqd3ttg2IpN_LXt3NWnujst0dZl0pBC06K0ba_pkyNyJgZQyFosCE3pGhVMsWT1z5xhVOlshvOI9OHhU8euOnFAKxe0KyMuqL5qNndS6TfpMIMdSLKhCyVln9HneoSAx3ktGcmtFGoGBS5c40BCGMQYh-0jK3aKe6zf9XCH",
};

export const INITIAL_INTEGRATIONS: ConnectedIntegrationItem[] = [
  {
    id: "google-calendar",
    title: "Google Calendar",
    subtitle: "maha@abusyam.dev",
    description:
      "Two-way conflict checking enabled. New bookings are added to your primary calendar automatically.",
    status: "connected",
  },
  {
    id: "google-meet",
    title: "Google Meet",
    subtitle: "Default video platform",
    description:
      "Unique Google Meet rooms are generated automatically and attached to every confirmed consultation invite.",
    status: "connected",
  },
];

export const INITIAL_SCHEDULING_PREFERENCES: SchedulingPreferences = {
  defaultTimezone: "Asia/Gaza",
  minimumNoticeHours: 12,
  bufferBeforeMinutes: 10,
  bufferAfterMinutes: 10,
};

export const SETTINGS_TIMEZONE_OPTIONS = [
  { value: "Asia/Gaza", label: "Asia/Gaza (GMT+2)" },
  { value: "Europe/London", label: "Europe/London (GMT+0)" },
  { value: "America/New_York", label: "America/New_York (GMT-5)" },
  { value: "Asia/Dubai", label: "Asia/Dubai (GMT+4)" },
];

export const MINIMUM_NOTICE_OPTIONS: Array<{ value: MinimumNoticeHours; label: string }> = [
  { value: 2, label: "2 hours before event" },
  { value: 12, label: "12 hours before event" },
  { value: 24, label: "24 hours before event" },
];

export const BUFFER_OPTIONS: Array<{ value: BufferMinutesOption; label: string }> = [
  { value: 0, label: "No buffer" },
  { value: 5, label: "5 mins" },
  { value: 10, label: "10 mins" },
  { value: 15, label: "15 mins" },
];
