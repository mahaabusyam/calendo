export interface HostProfileSettings {
  fullName: string;
  usernameSlug: string;
  bio: string;
  avatarUrl: string;
}

export type IntegrationStatus = "connected" | "disconnected" | "configuring";

export interface ConnectedIntegrationItem {
  id: "google-calendar" | "google-meet";
  title: string;
  subtitle: string;
  description: string;
  status: IntegrationStatus;
}

export type BufferMinutesOption = 0 | 5 | 10 | 15;
export type MinimumNoticeHours = 2 | 12 | 24;

export interface SchedulingPreferences {
  defaultTimezone: string;
  minimumNoticeHours: MinimumNoticeHours;
  bufferBeforeMinutes: BufferMinutesOption;
  bufferAfterMinutes: BufferMinutesOption;
}
