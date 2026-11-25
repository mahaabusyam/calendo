"use client";
import { useEffect, useState } from "react";
import { TimeFormat } from "@/types/booking";

export interface CalendoProfileState {
  hostName: string;
  hostRole: string;
  hostAvatar: string;
  isVerified: boolean;
  title: string;
  description: string;
  durationMinutes: number;
  locationLabel: string;
  slugPath: string;
  isAcceptingBookings: boolean;
  selectedTimezone: string;
  timeFormat: TimeFormat;
}

const STORAGE_KEY = "calendo_state_v1";
export const CALENDO_STATE_EVENT = "calendo:state-updated";

export const DEFAULT_CALENDO_STATE: CalendoProfileState = {
  hostName: "Maha Abu Syam",
  hostRole: "Principal Frontend Architect",
  hostAvatar: "/avatar.svg",
  isVerified: true,
  title: "30-Min Frontend & Architecture Consultation",
  description:
    "Focused 1:1 session covering React and Next.js architecture, design system scalability, and frontend performance bottlenecks.",
  durationMinutes: 30,
  locationLabel: "Google Meet",
  slugPath: "/maha/consultation",
  isAcceptingBookings: true,
  selectedTimezone: "Asia/Gaza",
  timeFormat: "12h",
};

export function loadCalendoState(): CalendoProfileState {
  if (typeof window === "undefined") {
    return DEFAULT_CALENDO_STATE;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_CALENDO_STATE;

    const parsed = JSON.parse(raw) as Partial<CalendoProfileState>;
    return {
      ...DEFAULT_CALENDO_STATE,
      ...parsed,
      hostAvatar:
        typeof parsed.hostAvatar === "string" &&
        parsed.hostAvatar.trim().length > 0
          ? parsed.hostAvatar
          : "/avatar.svg",
    };
  } catch {
    return DEFAULT_CALENDO_STATE;
  }
}

export function saveCalendoState(
  updater:
    | Partial<CalendoProfileState>
    | ((prev: CalendoProfileState) => CalendoProfileState)
): CalendoProfileState {
  const current = loadCalendoState();
  const next =
    typeof updater === "function"
      ? updater(current)
      : { ...current, ...updater };

  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      window.dispatchEvent(
        new CustomEvent(CALENDO_STATE_EVENT, { detail: next })
      );
    } catch {
      window.dispatchEvent(
        new CustomEvent(CALENDO_STATE_EVENT, { detail: next })
      );
    }
  }

  return next;
}

export function useCalendoState(): CalendoProfileState {
  const [state, setState] = useState<CalendoProfileState>(DEFAULT_CALENDO_STATE);

  useEffect(() => {
    const sync = () => setState(loadCalendoState());
    sync();
    window.addEventListener(CALENDO_STATE_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(CALENDO_STATE_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return state;
}

export function resetCalendoState(): CalendoProfileState {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(
      new CustomEvent(CALENDO_STATE_EVENT, { detail: DEFAULT_CALENDO_STATE })
    );
  }
  return DEFAULT_CALENDO_STATE;
}

export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Failed to read image file"));
      }
    };
    reader.onerror = () => reject(reader.error ?? new Error("FileReader error"));
    reader.readAsDataURL(file);
  });
}
