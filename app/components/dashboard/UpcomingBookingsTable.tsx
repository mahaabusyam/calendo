"use client";

import React from "react";
import { motion } from "framer-motion";
import { UpcomingBookingItem } from "@/types/dashboard";

interface UpcomingBookingsTableProps {
  bookings: UpcomingBookingItem[];
  onReschedule: (id: string) => void;
  onCancel: (id: string) => void;
}

export const UpcomingBookingsTable: React.FC<UpcomingBookingsTableProps> = ({
  bookings,
  onReschedule,
  onCancel,
}) => {
  return (
    <section id="bookings" className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h2 className="text-[16px] leading-6 tracking-[-0.1px] font-semibold text-[var(--color-on-surface)]">
          Upcoming Bookings
        </h2>
        <span className="text-[12px] leading-4 tracking-[0.1px] font-medium text-[var(--color-on-surface-variant)] tabular-nums">
          Showing {bookings.length} next sessions
        </span>
      </div>

      <div className="w-full overflow-x-auto bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)] rounded-[12px]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[var(--color-outline-variant)] bg-[var(--color-surface-container-low)]">
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                <span className="text-[12px] leading-4 tracking-[0.1px] font-medium text-[var(--color-on-surface-variant)]">
                  Guest
                </span>
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                <span className="text-[12px] leading-4 tracking-[0.1px] font-medium text-[var(--color-on-surface-variant)]">
                  Event Type
                </span>
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                <span className="text-[12px] leading-4 tracking-[0.1px] font-medium text-[var(--color-on-surface-variant)]">
                  Date &amp; Time
                </span>
              </th>
              <th scope="col" className="px-6 py-3 text-right whitespace-nowrap">
                <span className="text-[12px] leading-4 tracking-[0.1px] font-medium text-[var(--color-on-surface-variant)]">
                  Actions
                </span>
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[var(--color-outline-variant)]">
            {bookings.map((booking, idx) => {
              const isCancelled = booking.status === "cancelled";
              const isRescheduled = booking.status === "rescheduled";

              return (
                <motion.tr
                  key={booking.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: isCancelled ? 0.55 : 1, y: 0 }}
                  transition={{
                    duration: 0.18,
                    delay: Math.min(idx * 0.035, 0.2),
                    ease: [0.2, 0, 0, 1],
                  }}
                  className="hover:bg-[var(--color-surface-container-low)]/60 transition-colors duration-[120ms] ease-out"
                >
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span
                        className={[
                          "text-[14px] leading-5 font-semibold text-[var(--color-on-surface)]",
                          isCancelled ? "line-through" : "",
                        ].join(" ")}
                      >
                        {booking.guestName}
                      </span>
                      <span className="text-[13px] leading-[18px] text-[var(--color-on-surface-variant)]">
                        {booking.guestEmail}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={[
                          "inline-flex items-center px-2 py-1 rounded-full text-[12px] leading-4 font-medium whitespace-nowrap",
                          booking.badgeTone === "primary"
                            ? "bg-[var(--color-primary-container)] text-[var(--color-on-primary-container)]"
                            : "bg-[var(--color-surface-container)] text-[var(--color-on-surface-variant)]",
                        ].join(" ")}
                      >
                        {booking.eventTypeLabel}
                      </span>
                      {isRescheduled && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] leading-4 font-medium bg-[var(--color-warning-container)] text-[var(--color-on-warning-container)]">
                          Rescheduled
                        </span>
                      )}
                      {isCancelled && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] leading-4 font-medium bg-[var(--color-error-container)] text-[var(--color-on-error-container)]">
                          Cancelled
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-[14px] leading-5 text-[var(--color-on-surface)] tabular-nums">
                        {booking.dateLabel}
                      </span>
                      <span className="text-[13px] leading-[18px] text-[var(--color-on-surface-variant)] tabular-nums">
                        {booking.timeRangeLabel}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="inline-flex items-center gap-2">
                      <button
                        type="button"
                        disabled={isCancelled}
                        onClick={() => onReschedule(booking.id)}
                        className="px-3 py-1.5 rounded-[8px] border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] text-[12px] leading-4 tracking-[0.1px] font-medium text-[var(--color-on-surface)] hover:bg-[var(--color-surface-container)] transition-colors duration-[120ms] ease-out cursor-pointer disabled:opacity-45 disabled:cursor-not-allowed"
                      >
                        Reschedule
                      </button>
                      <button
                        type="button"
                        disabled={isCancelled}
                        onClick={() => onCancel(booking.id)}
                        className="px-3 py-1.5 rounded-[8px] border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] text-[12px] leading-4 tracking-[0.1px] font-medium text-[var(--color-error)] hover:bg-[var(--color-error-container)] transition-colors duration-[120ms] ease-out cursor-pointer disabled:opacity-45 disabled:cursor-not-allowed"
                      >
                        Cancel
                      </button>
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};
