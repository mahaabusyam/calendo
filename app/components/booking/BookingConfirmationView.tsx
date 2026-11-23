"use client";

import React from "react";
import { motion } from "framer-motion";
import { CalendarClock } from "lucide-react";
import { buildBookingSummary } from "@/lib/scheduling";
import { BookingSummarySidebar } from "./BookingSummarySidebar";
import { BookingConfirmationForm } from "./BookingConfirmationForm";
import { DEFAULT_EVENT_DETAILS } from "@/lib/eventData";
import { TimeZoneId } from "@/types/booking";

interface BookingConfirmationViewProps {
  date?: string;
  slotId?: string;
  time?: string;
  tz?: string;
}

export const BookingConfirmationView: React.FC<
  BookingConfirmationViewProps
> = ({
  date,
  slotId = "10:00",
  time = "10:00 AM",
  tz = "Asia/Gaza",
}) => {
  const dateValue = date ?? new Date().toISOString().slice(0, 10);
  const timeZone = tz as TimeZoneId;

  const summary = buildBookingSummary(
    dateValue,
    slotId,
    timeZone,
    DEFAULT_EVENT_DETAILS.durationMinutes
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-[880px] flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-[6px] bg-[var(--color-secondary)] text-[var(--color-on-secondary)] flex items-center justify-center">
            <CalendarClock className="w-3.5 h-3.5" />
          </div>

          <span className="text-[13px] leading-[18px] font-medium text-[var(--color-on-surface-variant)]">
            Calendo
          </span>

          <span className="text-[var(--color-outline)]">/</span>

          <span className="font-mono text-[12px] leading-4 font-medium text-[var(--color-outline)]">
            {DEFAULT_EVENT_DETAILS.slugPath}
          </span>
        </div>

        <span className="text-[12px] leading-4 tracking-[0.1px] font-medium text-[var(--color-on-surface-variant)]">
          Step 2 of 2
        </span>
      </div>

      <motion.main
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.24, ease: [0.2, 0, 0, 1] }}
        style={{ boxShadow: "var(--shadow-booking-card)" }}
        className="w-full max-w-[880px] bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)] rounded-[12px] overflow-hidden"
      >
        <div className="grid grid-cols-1 md:grid-cols-[340px_1fr] divide-y md:divide-y-0 md:divide-x divide-[var(--color-outline-variant)]">
          <BookingSummarySidebar
            event={DEFAULT_EVENT_DETAILS}
            summary={summary}
          />

          <BookingConfirmationForm
            dateParam={dateValue}
            slotIdParam={slotId}
            timeParam={time}
            tzParam={timeZone}
            summary={summary}
          />
        </div>
      </motion.main>
    </div>
  );
};