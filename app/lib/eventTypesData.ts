import { ConsultationEventType, NewEventTypeInput } from "@/types/eventTypes";

export const HOST_HANDLE = "/maha";
export const BASE_SHARE_DOMAIN = "calendo.app";

export const INITIAL_EVENT_TYPES: ConsultationEventType[] = [
  {
    id: "evt-15-sync",
    title: "15-Min Quick Sync",
    durationMinutes: 15,
    locationLabel: "Google Meet",
    slug: "quick-sync",
    description:
      "Brief introductory call to scope frontend architecture needs, project timelines, or quick code review questions.",
    isActive: true,
  },
  {
    id: "evt-30-consult",
    title: "30-Min Frontend & Architecture Consultation",
    durationMinutes: 30,
    locationLabel: "Google Meet",
    slug: "consultation",
    description:
      "Focused 1:1 session covering React and Next.js architecture, design system scalability, and frontend performance bottlenecks.",
    isActive: true,
  },
  {
    id: "evt-60-deep-dive",
    title: "60-Min Deep Dive Architecture Review",
    durationMinutes: 60,
    locationLabel: "Google Meet",
    slug: "deep-dive",
    description:
      "Comprehensive codebase walkthrough, monorepo strategy, and hands-on performance profiling for engineering teams.",
    isActive: false,
  },
];

export function normalizeSlug(rawSlug: string, fallbackTitle: string): string {
  const source = rawSlug.trim() || fallbackTitle.trim();
  const slugified = source
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slugified || "consultation";
}

export function createEventTypeItem(input: NewEventTypeInput): ConsultationEventType {
  const cleanTitle = input.title.trim();
  const cleanSlug = normalizeSlug(input.slug, cleanTitle);
  const cleanDescription =
    input.description.trim() ||
    "Focused 1:1 consultation session tailored to your frontend architecture goals.";

  return {
    id: `evt-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    title: cleanTitle,
    durationMinutes: input.durationMinutes,
    locationLabel: "Google Meet",
    slug: cleanSlug,
    description: cleanDescription,
    isActive: true,
  };
}
