"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CalendarClock } from "lucide-react";
import {
  BookingEventDetails,
  TimeFormat,
  TimeSlot,
  TimeZoneId,
} from "@/types/booking";
import {
  BASE_SLOTS_GAZA,
  formatSelectedHeading,
  toDateIso,
} from "@/lib/scheduling";
import { saveCalendoState, useCalendoState } from "@/lib/calendo-store";
import { HostSidebar } from "./HostSidebar";
import { BookingCalendar } from "./BookingCalendar";
import { TimeSlotsPanel } from "./TimeSlotsPanel";

export const PublicBookingView: React.FC = () => {
  const router = useRouter();
  const profile = useCalendoState();

  const [todayIso, setTodayIso] = useState<string | null>(null);
  const [selectedDateIso, setSelectedDateIso] = useState<string | null>(null);
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);

  // تاريخ اليوم يُحسب في المتصفح فقط لتجنب اختلاف السيرفر عن المتصفح
  useEffect(() => {
    setTodayIso(toDateIso(new Date()));
  }, []);

  const eventDetails: BookingEventDetails = profile;
  const selectedTimezone = profile.selectedTimezone as TimeZoneId;

  const headingText = selectedDateIso
    ? formatSelectedHeading(selectedDateIso)
    : "Select a date";

  const handleSelectDate = (dateIso: string) => {
    setSelectedDateIso(dateIso);
    setSelectedSlotId(null);
  };

  const handleChangeTimezone = (tz: string) => {
    saveCalendoState({ selectedTimezone: tz });
  };

  const handleChangeTimeFormat = (fmt: TimeFormat) => {
    saveCalendoState({ timeFormat: fmt });
  };

  const handleConfirmSlot = (slot: TimeSlot) => {
    if (!selectedDateIso) return;

    const query = new URLSearchParams({
      date: selectedDateIso,
      slotId: slot.id,
      time: slot.id,
      tz: profile.selectedTimezone,
    });

    router.push(`/booking-confirmation?${query.toString()}`);
  };

  return (
    <div className="w-full px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.22, ease: [0.2, 0, 0, 1] }}
        className="w-full max-w-[1160px] mx-auto bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)] rounded-[12px] shadow-[0_1px_2px_rgba(15,23,42,0.04)] overflow-hidden"
      >
        <header className="flex flex-wrap items-center justify-between gap-2 px-4 sm:px-6 py-3 border-b border-[var(--color-outline-variant)] bg-[var(--color-surface-container-low)]">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-6 h-6 rounded-[6px] bg-[var(--color-secondary)] text-[var(--color-on-secondary)] flex items-center justify-center shrink-0">
              <CalendarClock className="w-3.5 h-3.5" />
            </div>
            <span className="text-[12px] leading-4 tracking-[0.1px] font-medium text-[var(--color-on-surface)] shrink-0">
              Calendo
            </span>
            <span className="text-[var(--color-outline)] text-[12px] shrink-0">
              /
            </span>
            <span className="font-mono text-[12px] leading-4 font-medium text-[var(--color-on-surface-variant)] truncate">
              {eventDetails.slugPath}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[var(--color-on-surface-variant)] shrink-0">
            <span className="w-2 h-2 rounded-full bg-[var(--color-success)] shrink-0" />
            <span className="text-[12px] leading-4 tracking-[0.1px] font-medium whitespace-nowrap">
              {eventDetails.isAcceptingBookings ? "Accepting bookings" : "Paused"}
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-[var(--color-outline-variant)]">
            <HostSidebar
              eventDetails={eventDetails}
              selectedTimezone={selectedTimezone}
              onChangeTimezone={handleChangeTimezone}
            />
          </div>

          <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-[var(--color-outline-variant)]">
            {todayIso ? (
              <BookingCalendar
                todayIso={todayIso}
                selectedDateIso={selectedDateIso}
                onSelectDate={handleSelectDate}
              />
            ) : (
              <div className="p-6 text-[13px] text-[var(--color-on-surface-variant)]">
                Loading calendar...
              </div>
            )}
          </div>

          <div className="lg:col-span-3">
            <TimeSlotsPanel
              headingText={headingText}
              slots={selectedDateIso ? BASE_SLOTS_GAZA : []}
              selectedTimezone={selectedTimezone}
              timeFormat={profile.timeFormat}
              selectedSlotId={selectedSlotId ?? ""}
              onTimeFormatChange={handleChangeTimeFormat}
              onSelectSlot={setSelectedSlotId}
              onConfirmBooking={handleConfirmSlot}
              selectedDate={selectedDateIso ?? ""}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};