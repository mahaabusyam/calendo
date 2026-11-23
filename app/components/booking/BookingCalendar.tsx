"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  buildMonthDays,
  getFirstDayOffset,
  getMonthTitle,
  getTodayDate,
} from "@/lib/scheduling";

interface BookingCalendarProps {
  year?: number;
  monthIndex?: number;
  selectedDay: number;
  onSelectDay: (day: number) => void;
  onViewDateChange?: (
    year: number,
    monthIndex: number
  ) => void;
}

const WEEKDAY_HEADERS = [
  "SUN",
  "MON",
  "TUE",
  "WED",
  "THU",
  "FRI",
  "SAT",
];

export const BookingCalendar: React.FC<
  BookingCalendarProps
> = ({
  year: initialYear,
  monthIndex: initialMonthIndex,
  selectedDay,
  onSelectDay,
  onViewDateChange,
}) => {
  const today = getTodayDate();

  const [viewYear, setViewYear] =
    useState<number>(
      initialYear ?? today.getFullYear()
    );

  const [viewMonthIndex, setViewMonthIndex] =
    useState<number>(
      initialMonthIndex ?? today.getMonth()
    );

  const monthTitle = getMonthTitle(
    viewYear,
    viewMonthIndex
  );

  const firstDayOffset =
    getFirstDayOffset(
      viewYear,
      viewMonthIndex
    );

  const days =
    buildMonthDays(
      viewYear,
      viewMonthIndex
    );

  const updateViewDate = (
    year: number,
    monthIndex: number
  ) => {
    setViewYear(year);
    setViewMonthIndex(monthIndex);
    onViewDateChange?.(
      year,
      monthIndex
    );
  };

  const handlePrevMonth = () => {
    if (viewMonthIndex === 0) {
      updateViewDate(
        viewYear - 1,
        11
      );
    } else {
      updateViewDate(
        viewYear,
        viewMonthIndex - 1
      );
    }
  };

  const handleNextMonth = () => {
    if (viewMonthIndex === 11) {
      updateViewDate(
        viewYear + 1,
        0
      );
    } else {
      updateViewDate(
        viewYear,
        viewMonthIndex + 1
      );
    }
  };

  return (
    <div className="p-5 sm:p-6 flex flex-col justify-between gap-5 h-full">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-[16px] leading-6 tracking-[-0.1px] font-semibold text-[var(--color-on-surface)]">
            {monthTitle}
          </h2>

          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Previous month"
              onClick={handlePrevMonth}
              className="w-8 h-8 rounded-[8px] border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] text-[var(--color-on-surface-variant)] hover:bg-[var(--color-surface-container)] hover:text-[var(--color-on-surface)] flex items-center justify-center transition-colors duration-[120ms] ease-out cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              type="button"
              aria-label="Next month"
              onClick={handleNextMonth}
              className="w-8 h-8 rounded-[8px] border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] text-[var(--color-on-surface-variant)] hover:bg-[var(--color-surface-container)] hover:text-[var(--color-on-surface)] flex items-center justify-center transition-colors duration-[120ms] ease-out cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center">
          {WEEKDAY_HEADERS.map(
            (weekday) => (
              <div
                key={weekday}
                className="py-1 text-[11px] leading-4 tracking-[0.4px] font-semibold text-[var(--color-outline)]"
              >
                {weekday}
              </div>
            )
          )}

          {Array.from({
            length: Math.max(
              0,
              firstDayOffset
            ),
          }).map((_, idx) => (
            <div
              key={`empty-${idx}`}
              className="aspect-square"
            />
          ))}

          {days.map((cell) => {
            const isSelected =
              cell.day === selectedDay &&
              cell.isAvailable;

            return (
              <motion.button
                key={cell.dateIso}
                type="button"
                disabled={!cell.isAvailable}
                whileTap={
                  cell.isAvailable
                    ? { scale: 0.94 }
                    : undefined
                }
                transition={{
                  duration: 0.1,
                  ease: "easeOut",
                }}
                onClick={() =>
                  cell.isAvailable &&
                  onSelectDay(
                    cell.day
                  )
                }
                aria-label={`Day ${cell.day}${
                  cell.isAvailable
                    ? ", available"
                    : ", unavailable"
                }`}
                aria-pressed={
                  isSelected
                }
                className={[
                  "relative aspect-square rounded-[8px] text-[13px] leading-[18px] font-medium tabular-nums flex flex-col items-center justify-center transition-colors duration-[120ms] ease-out",
                  isSelected
                    ? "bg-[var(--color-primary)] text-[var(--color-on-primary)] font-semibold shadow-xs cursor-pointer"
                    : cell.isAvailable
                      ? "bg-[var(--color-surface-container-low)] text-[var(--color-on-surface)] hover:bg-[var(--color-primary-container)] hover:text-[var(--color-on-primary-container)] cursor-pointer"
                      : "text-[var(--color-outline)]/50 cursor-not-allowed",
                ].join(" ")}
              >
                <span>
                  {cell.day}
                </span>

                {cell.isAvailable &&
                  !isSelected && (
                    <span className="w-1 h-1 rounded-full bg-[var(--color-primary)] mt-0.5" />
                  )}
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-4 pt-3 border-t border-[var(--color-outline-variant)] text-[12px] leading-4 tracking-[0.1px] text-[var(--color-on-surface-variant)]">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[var(--color-primary)]" />
          <span>Selected</span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[var(--color-primary)]/40" />
          <span>Available</span>
        </div>
      </div>
    </div>
  );
};