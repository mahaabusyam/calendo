"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { DayAvailabilityRule, UpcomingBookingItem } from "@/types/dashboard";
import {
  INITIAL_METRICS,
  INITIAL_UPCOMING_BOOKINGS,
  INITIAL_WEEK_SCHEDULE,
} from "@/lib/dashboardData";
import { MetricsRow } from "./MetricsRow";
import { WeeklyAvailabilityCard } from "./WeeklyAvailabilityCard";
import { UpcomingBookingsTable } from "./UpcomingBookingsTable";

export const AvailabilityBookingsView: React.FC = () => {
  const [schedule, setSchedule] = useState<DayAvailabilityRule[]>(INITIAL_WEEK_SCHEDULE);
  const [bookings, setBookings] = useState<UpcomingBookingItem[]>(INITIAL_UPCOMING_BOOKINGS);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const handleToggleDay = (day: DayAvailabilityRule["day"]) => {
    setSchedule((prev) =>
      prev.map((item) => (item.day === day ? { ...item, enabled: !item.enabled } : item))
    );
    setIsSaved(false);
  };

  const handleChangeTime = (
    day: DayAvailabilityRule["day"],
    field: "startTime" | "endTime",
    value: string
  ) => {
    setSchedule((prev) =>
      prev.map((item) => (item.day === day ? { ...item, [field]: value } : item))
    );
    setIsSaved(false);
  };

  const handleSaveAvailability = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleRescheduleBooking = (id: string) => {
    setBookings((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: "rescheduled",
              timeRangeLabel: "11:00 AM – 11:30 AM",
            }
          : item
      )
    );
  };

  const handleCancelBooking = (id: string) => {
    setBookings((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: "cancelled" } : item))
    );
  };

  const activeUpcomingCount = bookings.filter((b) => b.status !== "cancelled").length;

  return (
    <main className="flex-1 p-4 md:p-8 max-w-[1080px] flex flex-col gap-6">
      <motion.header
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.22, ease: [0.2, 0, 0, 1] }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="font-display text-[28px] leading-9 tracking-[-0.5px] font-bold text-[var(--color-on-surface)]">
            Availability &amp; Bookings
          </h1>
          <p className="text-[14px] leading-5 text-[var(--color-on-surface-variant)]">
            Manage your weekly consultation hours and review upcoming guest sessions.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-[8px] bg-[var(--color-surface-container-lowest)] text-[var(--color-on-surface)] border border-[var(--color-outline-variant)] hover:bg-[var(--color-surface-container)] transition-colors duration-[120ms] ease-out w-fit text-[13px] leading-[18px] font-medium"
        >
          <ExternalLink className="w-4 h-4 text-[var(--color-on-surface-variant)]" />
          <span>Preview Booking Page</span>
        </Link>
      </motion.header>

      <MetricsRow
        metrics={{
          ...INITIAL_METRICS,
          upcomingCount: INITIAL_METRICS.upcomingCount - (4 - activeUpcomingCount),
        }}
      />

      <WeeklyAvailabilityCard
        schedule={schedule}
        isSaved={isSaved}
        onToggleDay={handleToggleDay}
        onChangeTime={handleChangeTime}
        onSave={handleSaveAvailability}
      />

      <UpcomingBookingsTable
        bookings={bookings}
        onReschedule={handleRescheduleBooking}
        onCancel={handleCancelBooking}
      />
    </main>
  );
};
