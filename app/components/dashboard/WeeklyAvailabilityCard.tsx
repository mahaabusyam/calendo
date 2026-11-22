"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DayAvailabilityRule } from "@/types/dashboard";
import { END_TIME_OPTIONS, START_TIME_OPTIONS } from "@/lib/dashboardData";

interface WeeklyAvailabilityCardProps {
  schedule: DayAvailabilityRule[];
  isSaved: boolean;
  onToggleDay: (day: DayAvailabilityRule["day"]) => void;
  onChangeTime: (
    day: DayAvailabilityRule["day"],
    field: "startTime" | "endTime",
    value: string
  ) => void;
  onSave: () => void;
}

export const WeeklyAvailabilityCard: React.FC<WeeklyAvailabilityCardProps> = ({
  schedule,
  isSaved,
  onToggleDay,
  onChangeTime,
  onSave,
}) => {
  return (
    <section
      id="availability"
      className="bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)] rounded-[12px] overflow-hidden"
    >
      <header className="px-6 py-4 border-b border-[var(--color-outline-variant)] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-[16px] leading-6 tracking-[-0.1px] font-semibold text-[var(--color-on-surface)]">
            Weekly Availability
          </h2>
          <p className="text-[13px] leading-[18px] text-[var(--color-on-surface-variant)]">
            Working hours in Asia/Gaza (GMT+2) for public consultation bookings.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <AnimatePresence>
            {isSaved && (
              <motion.span
                initial={{ opacity: 0, scale: 0.92, x: 6 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.92, x: 6 }}
                transition={{ duration: 0.16, ease: [0.2, 0, 0, 1] }}
                className="text-[12px] leading-4 tracking-[0.1px] font-medium text-[var(--color-on-success-container)] bg-[var(--color-success-container)] px-2 py-1 rounded-full"
              >
                Saved
              </motion.span>
            )}
          </AnimatePresence>

          <motion.button
            type="button"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.12, ease: "easeOut" }}
            onClick={onSave}
            className="inline-flex items-center justify-center px-4 py-2 rounded-[8px] bg-[var(--color-primary)] text-[var(--color-on-primary)] shadow-sm hover:bg-[var(--color-on-primary-container)] transition-colors duration-[120ms] ease-out text-[13px] leading-[18px] font-medium cursor-pointer"
          >
            Save Changes
          </motion.button>
        </div>
      </header>

      <div className="divide-y divide-[var(--color-outline-variant)]">
        {schedule.map((item) => (
          <div
            key={item.day}
            className="px-6 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
          >
            <div className="flex items-center gap-4 w-44">
              <button
                type="button"
                role="switch"
                aria-checked={item.enabled}
                aria-label={`Enable ${item.day}`}
                onClick={() => onToggleDay(item.day)}
                className={[
                  "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-[120ms] ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]",
                  item.enabled
                    ? "bg-[var(--color-primary)]"
                    : "bg-[var(--color-surface-container-high)]",
                ].join(" ")}
              >
                <motion.span
                  layout
                  transition={{ type: "spring", stiffness: 520, damping: 32 }}
                  className={[
                    "pointer-events-none inline-block h-4 w-4 rounded-full bg-[var(--color-surface-container-lowest)] shadow-sm",
                    item.enabled ? "translate-x-4" : "translate-x-0",
                  ].join(" ")}
                />
              </button>

              <span
                className={[
                  "text-[14px] leading-5 font-medium transition-colors duration-[120ms]",
                  item.enabled
                    ? "text-[var(--color-on-surface)]"
                    : "text-[var(--color-outline)]",
                ].join(" ")}
              >
                {item.day}
              </span>
            </div>

            <div className="flex items-center gap-2 min-h-[34px]">
              <AnimatePresence mode="wait" initial={false}>
                {item.enabled ? (
                  <motion.div
                    key="active-hours"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.14, ease: "easeOut" }}
                    className="flex items-center gap-2"
                  >
                    <select
                      aria-label={`${item.day} start time`}
                      value={item.startTime}
                      onChange={(e) => onChangeTime(item.day, "startTime", e.target.value)}
                      className="rounded-[8px] border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] px-3 py-1.5 text-[13px] leading-[18px] font-medium text-[var(--color-on-surface)] tabular-nums focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 cursor-pointer"
                    >
                      {START_TIME_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>

                    <span className="text-[var(--color-outline)] text-[14px] leading-5">–</span>

                    <select
                      aria-label={`${item.day} end time`}
                      value={item.endTime}
                      onChange={(e) => onChangeTime(item.day, "endTime", e.target.value)}
                      className="rounded-[8px] border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] px-3 py-1.5 text-[13px] leading-[18px] font-medium text-[var(--color-on-surface)] tabular-nums focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 cursor-pointer"
                    >
                      {END_TIME_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </motion.div>
                ) : (
                  <motion.span
                    key="unavailable"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.14 }}
                    className="text-[14px] leading-5 text-[var(--color-outline)]"
                  >
                    Unavailable
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
