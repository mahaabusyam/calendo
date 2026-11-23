"use client";

import React from "react";
import {
  AnimatePresence,
  motion,
} from "framer-motion";
import {
  TimeFormat,
  TimeSlot,
  TimeZoneId,
} from "@/types/booking";
import {
  formatSlotForTimezone,
} from "@/lib/scheduling";

interface TimeSlotsPanelProps {
  headingText: string;
  slots: TimeSlot[];
  selectedSlotId: string;
  timeFormat: TimeFormat;
  selectedTimezone: TimeZoneId;
  selectedDate: string;
  onSelectSlot: (
    slotId: string
  ) => void;
  onTimeFormatChange: (
    fmt: TimeFormat
  ) => void;
  onConfirmBooking: (
    slot: TimeSlot,
    formattedTime: string
  ) => void;
}

export const TimeSlotsPanel: React.FC<
  TimeSlotsPanelProps
> = ({
  headingText,
  slots,
  selectedSlotId,
  timeFormat,
  selectedTimezone,
  selectedDate,
  onSelectSlot,
  onTimeFormatChange,
  onConfirmBooking,
}) => {
  return (
    <section className="p-6 flex flex-col gap-4 bg-[var(--color-surface-container-lowest)]">
      <div className="flex items-center justify-between">
        <AnimatePresence mode="wait">
          <motion.h2
            key={headingText}
            initial={{
              opacity: 0,
              x: 6,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: -6,
            }}
            transition={{
              duration: 0.16,
              ease: [0.2, 0, 0, 1],
            }}
            className="text-[14px] leading-5 font-semibold text-[var(--color-on-surface)] tabular-nums"
          >
            {headingText}
          </motion.h2>
        </AnimatePresence>

        <div
          role="group"
          aria-label="Time format toggle"
          className="relative inline-flex items-center rounded-[8px] border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-low)] p-0.5"
        >
          {(
            ["12h", "24h"] as TimeFormat[]
          ).map((fmt) => {
            const active =
              timeFormat === fmt;

            return (
              <button
                key={fmt}
                type="button"
                onClick={() =>
                  onTimeFormatChange(
                    fmt
                  )
                }
                className={[
                  "relative px-2 py-0.5 rounded-[6px] text-[12px] leading-4 tracking-[0.1px] font-medium transition-colors duration-[120ms] ease-out cursor-pointer",
                  active
                    ? "text-[var(--color-on-surface)]"
                    : "text-[var(--color-on-surface-variant)] hover:text-[var(--color-on-surface)]",
                ].join(" ")}
              >
                {active && (
                  <motion.span
                    layoutId="active-time-format-pill"
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 35,
                    }}
                    className="absolute inset-0 rounded-[6px] bg-[var(--color-surface-container-lowest)] shadow-sm"
                  />
                )}

                <span className="relative z-10">
                  {fmt}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-2 max-h-[380px] overflow-y-auto pr-1">
        {slots.map(
          (slot, index) => {
            const formattedLabel =
              formatSlotForTimezone(
                slot,
                selectedTimezone,
                timeFormat,
                selectedDate
              );

            const isSelected =
              slot.id ===
              selectedSlotId;

            return (
              <motion.div
                key={slot.id}
                layout
                initial={{
                  opacity: 0,
                  y: 6,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.16,
                  delay: Math.min(
                    index * 0.025,
                    0.2
                  ),
                  ease: [
                    0.2,
                    0,
                    0,
                    1,
                  ],
                }}
              >
                {isSelected ? (
                  <div className="grid grid-cols-[1fr_auto] gap-1.5 items-stretch">
                    <button
                      type="button"
                      onClick={() =>
                        onSelectSlot(
                          slot.id
                        )
                      }
                      className="px-4 py-2.5 rounded-[8px] bg-[var(--color-secondary)] text-[var(--color-on-secondary)] text-[13px] leading-[18px] font-medium tabular-nums text-center cursor-pointer"
                    >
                      {formattedLabel}
                    </button>

                    <motion.button
                      initial={{
                        opacity: 0,
                        scale: 0.92,
                        x: 6,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        x: 0,
                      }}
                      whileHover={{
                        scale: 1.02,
                      }}
                      whileTap={{
                        scale: 0.96,
                      }}
                      transition={{
                        duration: 0.14,
                        ease: [
                          0.2,
                          0,
                          0,
                          1,
                        ],
                      }}
                      type="button"
                      onClick={() =>
                        onConfirmBooking(
                          slot,
                          formattedLabel
                        )
                      }
                      className="inline-flex items-center justify-center px-4 py-2.5 rounded-[8px] bg-[var(--color-primary)] text-[var(--color-on-primary)] hover:bg-[var(--color-on-primary-container)] text-[13px] leading-[18px] font-medium transition-colors duration-[120ms] ease-out cursor-pointer"
                    >
                      Confirm
                    </motion.button>
                  </div>
                ) : (
                  <motion.button
                    whileHover={{
                      y: -1,
                    }}
                    whileTap={{
                      scale: 0.98,
                    }}
                    type="button"
                    onClick={() =>
                      onSelectSlot(
                        slot.id
                      )
                    }
                    className="w-full px-4 py-2.5 rounded-[8px] border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-low)] text-[var(--color-on-surface)] text-[13px] leading-[18px] font-medium tabular-nums text-center hover:bg-[var(--color-primary-container)] hover:text-[var(--color-on-primary-container)] transition-colors duration-[120ms] ease-out cursor-pointer"
                  >
                    {formattedLabel}
                  </motion.button>
                )}
              </motion.div>
            );
          }
        )}
      </div>
    </section>
  );
};