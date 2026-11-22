"use client";

import React from "react";
import { motion } from "framer-motion";
import { CalendarClock } from "lucide-react";
import { BookingEventDetails } from "@/types/booking";
import { buildBookingSummary } from "@/lib/scheduling";
import { BookingSummarySidebar } from "./BookingSummarySidebar";
import { BookingConfirmationForm } from "./BookingConfirmationForm";

const EVENT_DETAILS: BookingEventDetails = {
  slugPath: "/maha/consultation",
  hostName: "Maha Abu Syam",
  hostRole: "Principal Frontend Architect",
  hostAvatar:
    "https://lh3.googleusercontent.com/aida/ALJJyrBHg54wTuYi9UFNjLoH3xjKB7So25WoTmGs90A7brmjLMDYQaPBLvzKgT9w33W0R7daE8mKEUVdvUqd3ttg2IpN_LXt3NWnujst0dZl0pBC06K0ba_pkyNyJgZQyFosCE3pGhVMsWT1z5xhVOlshvOI9OHhU8euOnFAKxe0KyMuqL5qNndS6TfpMIMdSLKhCyVln9HneoSAx3ktGcmtFGoGBS5c40BCGMQYh-0jK3aKe6zf9XCH",
  isVerified: true,
  title: "30-Min Frontend & Architecture Consultation",
  description:
    "A focused 1:1 session covering React and Next.js architecture, design system scalability, and frontend performance bottlenecks.",
  durationMinutes: 30,
  locationLabel: "Google Meet",
  isAcceptingBookings: true,
};

interface BookingConfirmationViewProps {
  date?: string;
  slotId?: string;
  time?: string;
  tz?: string;
}

export const BookingConfirmationView: React.FC<BookingConfirmationViewProps> = ({
  date = "2026-11-24",
  slotId = "10:00",
  time = "10:00 AM",
  tz = "Asia/Gaza",
}) => {
  const summary = buildBookingSummary(date, slotId, tz, EVENT_DETAILS.durationMinutes);

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
            {EVENT_DETAILS.slugPath}
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
          <BookingSummarySidebar event={EVENT_DETAILS} summary={summary} />

          <BookingConfirmationForm
            dateParam={date}
            slotIdParam={slotId}
            timeParam={time}
            tzParam={tz}
            summary={summary}
          />
        </div>
      </motion.main>
    </div>
  );
};
