"use client";

import React from "react";
import { motion } from "framer-motion";
import { CalendarCheck, CheckCircle2, Layers } from "lucide-react";
import { DashboardMetrics } from "@/types/dashboard";

interface MetricsRowProps {
  metrics: DashboardMetrics;
}

export const MetricsRow: React.FC<MetricsRowProps> = ({ metrics }) => {
  return (
    <section aria-label="Key metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-stretch">
      <motion.article
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: 0.04, ease: [0.2, 0, 0, 1] }}
        whileHover={{ y: -2 }}
        className="bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)] rounded-[12px] p-6 flex flex-col justify-between gap-2 h-full transition-colors duration-[120ms] ease-out"
      >
        <div className="flex items-center justify-between">
          <span className="text-[13px] leading-[18px] font-medium text-[var(--color-on-surface-variant)]">
            Upcoming Bookings
          </span>
          <CalendarCheck className="w-4 h-4 text-[var(--color-primary)]" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="font-display text-[28px] leading-9 tracking-[-0.5px] font-bold text-[var(--color-on-surface)] tabular-nums">
            {metrics.upcomingCount}
          </span>
          <span className="text-[12px] leading-4 tracking-[0.1px] font-medium text-[var(--color-on-success-container)] bg-[var(--color-success-container)] px-2 py-0.5 rounded-full tabular-nums">
            {metrics.upcomingDeltaLabel}
          </span>
        </div>
      </motion.article>

      <motion.article
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: 0.08, ease: [0.2, 0, 0, 1] }}
        whileHover={{ y: -2 }}
        className="bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)] rounded-[12px] p-6 flex flex-col justify-between gap-2 h-full transition-colors duration-[120ms] ease-out"
      >
        <div className="flex items-center justify-between">
          <span className="text-[13px] leading-[18px] font-medium text-[var(--color-on-surface-variant)]">
            Completed Sessions
          </span>
          <CheckCircle2 className="w-4 h-4 text-[var(--color-on-surface-variant)]" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="font-display text-[28px] leading-9 tracking-[-0.5px] font-bold text-[var(--color-on-surface)] tabular-nums">
            {metrics.completedCount}
          </span>
          <span className="text-[13px] leading-[18px] text-[var(--color-on-surface-variant)] tabular-nums">
            {metrics.attendanceRateLabel}
          </span>
        </div>
      </motion.article>

      <motion.article
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: 0.12, ease: [0.2, 0, 0, 1] }}
        whileHover={{ y: -2 }}
        className="bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)] rounded-[12px] p-6 flex flex-col justify-between gap-2 h-full transition-colors duration-[120ms] ease-out"
      >
        <div className="flex items-center justify-between">
          <span className="text-[13px] leading-[18px] font-medium text-[var(--color-on-surface-variant)]">
            Active Event Types
          </span>
          <Layers className="w-4 h-4 text-[var(--color-on-surface-variant)]" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="font-display text-[28px] leading-9 tracking-[-0.5px] font-bold text-[var(--color-on-surface)] tabular-nums">
            {metrics.activeEventTypesCount}
          </span>
          <span className="text-[13px] leading-[18px] text-[var(--color-on-surface-variant)] tabular-nums">
            {metrics.durationsSummaryLabel}
          </span>
        </div>
      </motion.article>
    </section>
  );
};
