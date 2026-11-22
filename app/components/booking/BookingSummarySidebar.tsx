"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, BadgeCheck, Calendar, Clock, Globe, Video } from "lucide-react";
import { BookingEventDetails, FormattedBookingSummary } from "@/types/booking";

interface BookingSummarySidebarProps {
  event: BookingEventDetails;
  summary: FormattedBookingSummary;
}

export const BookingSummarySidebar: React.FC<BookingSummarySidebarProps> = ({
  event,
  summary,
}) => {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.24, ease: [0.2, 0, 0, 1] }}
      className="p-6 md:p-8 flex flex-col justify-between gap-6 bg-[var(--color-surface-container-low)]/50"
    >
      <div className="flex flex-col gap-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[13px] leading-[18px] font-medium text-[var(--color-on-surface-variant)] hover:text-[var(--color-on-surface)] transition-colors duration-[120ms] ease-out w-fit group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform duration-[120ms] ease-out group-hover:-translate-x-0.5" />
          <span>Back to time slots</span>
        </Link>

        <div className="flex items-center gap-4">
          <img
            src={event.hostAvatar}
            alt={event.hostName}
            className="w-11 h-11 rounded-full object-cover border border-[var(--color-outline-variant)] shrink-0"
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-[14px] leading-5 font-semibold text-[var(--color-on-surface)]">
                {event.hostName}
              </span>
              {event.isVerified && (
                <BadgeCheck className="w-4 h-4 text-[var(--color-primary)]" />
              )}
            </div>
            <span className="text-[13px] leading-[18px] text-[var(--color-on-surface-variant)]">
              {event.hostRole}
            </span>
          </div>
        </div>

        <h1 className="text-[18px] leading-6 tracking-[-0.2px] font-semibold text-[var(--color-on-surface)] text-balance">
          {event.title}
        </h1>

        <motion.div
          key={`${summary.fullDateLabel}-${summary.timeRangeLabel}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
          className="rounded-[12px] border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] p-4 flex flex-col gap-2"
        >
          <div className="flex items-start gap-2">
            <Calendar className="w-4 h-4 text-[var(--color-primary)] mt-0.5 shrink-0" />
            <div className="flex flex-col">
              <span className="text-[14px] leading-5 font-semibold text-[var(--color-on-surface)] tabular-nums">
                {summary.fullDateLabel}
              </span>
              <span className="text-[13px] leading-[18px] text-[var(--color-on-surface-variant)] tabular-nums">
                {summary.timeRangeLabel}
              </span>
            </div>
          </div>

          <div className="h-px bg-[var(--color-outline-variant)] my-1" />

          <div className="flex items-center gap-2 text-[var(--color-on-surface-variant)]">
            <Clock className="w-4 h-4 text-[var(--color-outline)] shrink-0" />
            <span className="text-[13px] leading-[18px] font-medium tabular-nums">
              {event.durationMinutes} mins
            </span>
          </div>

          <div className="flex items-center gap-2 text-[var(--color-on-surface-variant)]">
            <Video className="w-4 h-4 text-[var(--color-outline)] shrink-0" />
            <span className="text-[13px] leading-[18px] font-medium">
              {event.locationLabel}
            </span>
          </div>

          <div className="flex items-center gap-2 text-[var(--color-on-surface-variant)]">
            <Globe className="w-4 h-4 text-[var(--color-outline)] shrink-0" />
            <span className="text-[13px] leading-[18px] font-medium tabular-nums">
              {summary.timeZoneLabel}
            </span>
          </div>
        </motion.div>
      </div>

      <p className="text-[13px] leading-[18px] text-[var(--color-outline)]">
        A calendar invitation and Google Meet link will be sent immediately after confirmation.
      </p>
    </motion.aside>
  );
};
