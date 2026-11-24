"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  BadgeCheck,
  Calendar,
  CalendarClock,
  CalendarPlus,
  CheckCircle2,
  Globe,
  Video,
} from "lucide-react";
import { buildBookingSummary } from "@/lib/scheduling";
import { buildGoogleCalendarUrl } from "@/lib/googleCalendar";
import { DEFAULT_EVENT_DETAILS } from "@/lib/eventData";
import { TimeZoneId } from "@/types/booking";

interface BookingSuccessViewProps {
  date?: string;
  slotId?: string;
  tz?: string;
  guestName?: string;
  guestEmail?: string;
  notes?: string;
}

export const BookingSuccessView: React.FC<
  BookingSuccessViewProps
> = ({
  date,
  slotId = "10:00",
  tz = "Asia/Gaza",
  guestName = "",
  guestEmail = "",
  notes = "",
}) => {
  const [calendarPrepared, setCalendarPrepared] =
    useState<boolean>(false);

  const dateValue =
    date ?? new Date().toISOString().slice(0, 10);

  const timeZone = tz as TimeZoneId;

  const summary = buildBookingSummary(
    dateValue,
    slotId,
    timeZone,
    DEFAULT_EVENT_DETAILS.durationMinutes
  );

  const googleCalendarUrl = buildGoogleCalendarUrl({
    event: DEFAULT_EVENT_DETAILS,
    dateIso: dateValue,
    slotId,
    guestName,
    guestEmail,
    notes,
  });

  const handleAddToGoogleCalendar = () => {
    setCalendarPrepared(true);
    window.open(
      googleCalendarUrl,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-[540px] flex items-center justify-between mb-4 px-1">
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

        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.2,
            ease: [0.2, 0, 0, 1],
          }}
          className="text-[12px] leading-4 tracking-[0.1px] font-medium text-[var(--color-on-success-container)] bg-[var(--color-success-container)] px-2 py-0.5 rounded-full"
        >
          Confirmed
        </motion.span>
      </div>

      <motion.main
        initial={{ opacity: 0, y: 14, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.26,
          ease: [0.2, 0, 0, 1],
        }}
        style={{ boxShadow: "var(--shadow-booking-card)" }}
        className="w-full max-w-[540px] bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)] rounded-[12px] p-6 md:p-8 flex flex-col gap-6"
      >
        <div className="flex flex-col items-center text-center gap-2 pt-1">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 420,
              damping: 24,
              delay: 0.06,
            }}
            className="w-12 h-12 rounded-full bg-[var(--color-success-container)] text-[var(--color-success)] flex items-center justify-center mb-1"
          >
            <CheckCircle2 className="w-6 h-6" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.2,
              delay: 0.1,
              ease: [0.2, 0, 0, 1],
            }}
            className="text-[22px] leading-7 tracking-[-0.3px] font-semibold text-[var(--color-on-surface)] text-balance"
          >
            This meeting is scheduled
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.2,
              delay: 0.14,
              ease: [0.2, 0, 0, 1],
            }}
            className="text-[14px] leading-5 text-[var(--color-on-surface-variant)] text-pretty max-w-md"
          >
            We sent a calendar invitation and Google Meet link to{" "}
            <span className="font-medium text-[var(--color-on-surface)]">
              {guestEmail}
            </span>
            .
          </motion.p>
        </div>

        <motion.section
          aria-label="Meeting summary"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.22,
            delay: 0.16,
            ease: [0.2, 0, 0, 1],
          }}
          className="rounded-[12px] border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-low)]/60 p-6 flex flex-col gap-4"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-[12px] leading-4 tracking-[0.1px] font-medium text-[var(--color-on-surface-variant)]">
                Consultation
              </span>

              <h2 className="text-[16px] leading-6 tracking-[-0.1px] font-semibold text-[var(--color-on-surface)]">
                {DEFAULT_EVENT_DETAILS.title}
              </h2>
            </div>

            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[var(--color-primary-container)] text-[var(--color-on-primary-container)] text-[12px] leading-4 font-medium tabular-nums shrink-0">
              {DEFAULT_EVENT_DETAILS.durationMinutes} mins
            </span>
          </div>

          <div className="h-px bg-[var(--color-outline-variant)]" />

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <img
                src={DEFAULT_EVENT_DETAILS.hostAvatar}
                alt={DEFAULT_EVENT_DETAILS.hostName}
                className="w-6 h-6 rounded-full object-cover border border-[var(--color-outline-variant)] shrink-0"
              />

              <div className="flex items-center gap-1.5">
                <span className="text-[14px] leading-5 font-medium text-[var(--color-on-surface)]">
                  {DEFAULT_EVENT_DETAILS.hostName}
                </span>

                {DEFAULT_EVENT_DETAILS.isVerified && (
                  <BadgeCheck className="w-4 h-4 text-[var(--color-primary)]" />
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 text-[var(--color-on-surface)]">
              <Calendar className="w-4 h-4 text-[var(--color-outline)] shrink-0" />

              <span className="text-[14px] leading-5 tabular-nums">
                {summary.fullDateLabel} ·{" "}
                {summary.timeRangeLabel}
              </span>
            </div>

            <div className="flex items-center gap-2 text-[var(--color-on-surface-variant)]">
              <Globe className="w-4 h-4 text-[var(--color-outline)] shrink-0" />

              <span className="text-[13px] leading-[18px] tabular-nums">
                {summary.timeZoneLabel}
              </span>
            </div>

            <div className="flex items-center gap-2 text-[var(--color-on-surface-variant)]">
              <Video className="w-4 h-4 text-[var(--color-outline)] shrink-0" />

              <span className="text-[13px] leading-[18px]">
                {DEFAULT_EVENT_DETAILS.locationLabel} (link attached to
                calendar invite)
              </span>
            </div>
          </div>
        </motion.section>

        <div className="flex flex-col sm:flex-row items-center gap-2">
          <motion.button
            type="button"
            onClick={handleAddToGoogleCalendar}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            transition={{
              duration: 0.12,
              ease: "easeOut",
            }}
            className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-6 py-2 rounded-[8px] bg-[var(--color-primary)] text-[var(--color-on-primary)] shadow-sm hover:bg-[var(--color-on-primary-container)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 transition-colors duration-[120ms] ease-out text-[14px] leading-5 font-medium cursor-pointer"
          >
            <CalendarPlus
              className="w-4 h-4"
              aria-hidden="true"
            />

            <span>Add to Google Calendar</span>
          </motion.button>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 rounded-[8px] bg-[var(--color-surface-container-lowest)] text-[var(--color-on-surface)] border border-[var(--color-outline-variant)] hover:bg-[var(--color-surface-container)] transition-colors duration-[120ms] ease-out text-[14px] leading-5 font-medium"
          >
            Done
          </Link>
        </div>

        <AnimatePresence>
          {calendarPrepared && (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{
                duration: 0.18,
                ease: [0.2, 0, 0, 1],
              }}
              role="status"
              className="text-center text-[13px] leading-[18px] text-[var(--color-on-success-container)] bg-[var(--color-success-container)] rounded-[8px] py-1.5 px-2"
            >
              Event details prepared for Google Calendar.
            </motion.p>
          )}
        </AnimatePresence>
      </motion.main>
    </div>
  );
};