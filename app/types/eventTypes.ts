export type EventDurationMinutes = 15 | 30 | 45 | 60;

export interface ConsultationEventType {
  id: string;
  title: string;
  durationMinutes: EventDurationMinutes;
  locationLabel: string;
  slug: string;
  description: string;
  isActive: boolean;
}

export interface NewEventTypeInput {
  title: string;
  slug: string;
  durationMinutes: EventDurationMinutes;
  description: string;
}
