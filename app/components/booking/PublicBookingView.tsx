"use client";

import React, {
  useEffect,
  useMemo,
  useState,
} from "react";
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
  getTodayDate,
} from "@/lib/scheduling";
import {
  CALENDO_STATE_EVENT,
  CalendoProfileState,
  loadCalendoState,
  saveCalendoState,
} from "@/lib/calendo-store";
import { HostSidebar } from "./HostSidebar";
import { BookingCalendar } from "./BookingCalendar";
import { TimeSlotsPanel } from "./TimeSlotsPanel";

export const PublicBookingView: React.FC = () => {
  const router = useRouter();

  const [today, setToday] = useState<Date | null>(null);

  const [profile, setProfile] =
  useState<CalendoProfileState>(
    () => loadCalendoState()
  );

const [selectedDay, setSelectedDay] =
  useState<number>(1);

const [selectedSlotId, setSelectedSlotId] =
  useState<string | null>("10:00");

const [calendarYear, setCalendarYear] =
  useState<number>(1970);

const [calendarMonthIndex, setCalendarMonthIndex] =
  useState<number>(0);

const [isCalendarReady, setIsCalendarReady] =
  useState<boolean>(false);

useEffect(() => {
  const timer = window.setTimeout(() => {
    const currentDate = getTodayDate();

    setSelectedDay(currentDate.getDate());
    setCalendarYear(currentDate.getFullYear());
    setCalendarMonthIndex(currentDate.getMonth());
    setIsCalendarReady(true);
  }, 0);

  return () => {
    window.clearTimeout(timer);
  };
}, []);

useEffect(() => {
  const syncState = () => {
    setProfile(loadCalendoState());
  };

  window.addEventListener(
    CALENDO_STATE_EVENT,
    syncState
  );

  window.addEventListener(
    "storage",
    syncState
  );

  return () => {
    window.removeEventListener(
      CALENDO_STATE_EVENT,
      syncState
    );

    window.removeEventListener(
      "storage",
      syncState
    );
  };
}, []);

  const eventDetails: BookingEventDetails =
    useMemo(
      () => ({
        slugPath: profile.slugPath,
        hostName: profile.hostName,
        hostRole: profile.hostRole,
        hostAvatar:
          profile.hostAvatar || "/avatar.svg",
        isVerified: profile.isVerified,
        title: profile.title,
        description: profile.description,
        durationMinutes:
          profile.durationMinutes,
        locationLabel:
          profile.locationLabel,
        isAcceptingBookings:
          profile.isAcceptingBookings,
      }),
      [profile]
    );

  const headingText = useMemo(
    () =>
      formatSelectedHeading(
        selectedDay,
        calendarMonthIndex,
        calendarYear
      ),
    [
      selectedDay,
      calendarMonthIndex,
      calendarYear,
    ]
  );

  const handleChangeTimezone = (
    tz: string
  ) => {
    const updated = saveCalendoState({
      selectedTimezone: tz,
    });

    setProfile(updated);
  };

  const handleChangeTimeFormat = (
    fmt: TimeFormat
  ) => {
    const updated = saveCalendoState({
      timeFormat: fmt,
    });

    setProfile(updated);
  };

  const handleSelectDay = (
    day: number
  ) => {
    setSelectedDay(day);
    setSelectedSlotId(null);
  };

  const handleConfirmSlot = (
    slot: TimeSlot
  ) => {
    const monthStr = String(
      calendarMonthIndex + 1
    ).padStart(2, "0");

    const dayStr = String(
      selectedDay
    ).padStart(2, "0");

    const dateIso =
      `${calendarYear}-${monthStr}-${dayStr}`;

    const query =
      new URLSearchParams({
        date: dateIso,
        slotId: slot.id,
        time: slot.id,
        tz: profile.selectedTimezone,
      });

    router.push(
      `/booking-confirmation?${query.toString()}`
    );
  };

  const selectedTimezone =
    profile.selectedTimezone as TimeZoneId;

  if (!isCalendarReady) {
    return (
      <div className="w-full min-h-[400px] flex items-center justify-center">
        <div className="text-sm text-[var(--color-on-surface-variant)]">
          Loading calendar...
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
      <motion.div
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.22,
          ease: [0.2, 0, 0, 1],
        }}
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
              {eventDetails.isAcceptingBookings
                ? "Accepting bookings"
                : "Paused"}
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-[var(--color-outline-variant)]">
            <HostSidebar
              eventDetails={eventDetails}
              selectedTimezone={selectedTimezone}
              onChangeTimezone={
                handleChangeTimezone
              }
            />
          </div>

          <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-[var(--color-outline-variant)]">
            <BookingCalendar
              year={calendarYear}
              monthIndex={
                calendarMonthIndex
              }
              selectedDay={selectedDay}
              onSelectDay={
                handleSelectDay
              }
              onViewDateChange={(
                year,
                monthIndex
              ) => {
                setCalendarYear(year);
                setCalendarMonthIndex(
                  monthIndex
                );

                if (
                  year !== calendarYear ||
                  monthIndex !==
                    calendarMonthIndex
                ) {
                  setSelectedDay(1);
                  setSelectedSlotId(null);
                }
              }}
            />
          </div>

          <div className="lg:col-span-3">
            <TimeSlotsPanel
              headingText={headingText}
              slots={BASE_SLOTS_GAZA}
              selectedTimezone={
                selectedTimezone
              }
              timeFormat={
                profile.timeFormat
              }
              selectedSlotId={
                selectedSlotId ?? ""
              }
              onTimeFormatChange={
                handleChangeTimeFormat
              }
              onSelectSlot={
                setSelectedSlotId
              }
              onConfirmBooking={
                handleConfirmSlot
              }
              selectedDate={`${calendarYear}-${String(
                calendarMonthIndex + 1
              ).padStart(2, "0")}-${String(
                selectedDay
              ).padStart(2, "0")}`}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};