"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Globe } from "lucide-react";
import {
  BufferMinutesOption,
  MinimumNoticeHours,
  SchedulingPreferences,
} from "@/types/settings";
import {
  BUFFER_OPTIONS,
  MINIMUM_NOTICE_OPTIONS,
  SETTINGS_TIMEZONE_OPTIONS,
} from "@/lib/settingsData";

interface SchedulingPreferencesCardProps {
  preferences: SchedulingPreferences;
  isSaved: boolean;
  onSavePreferences: (updated: SchedulingPreferences) => void;
}

export const SchedulingPreferencesCard: React.FC<SchedulingPreferencesCardProps> = ({
  preferences,
  isSaved,
  onSavePreferences,
}) => {
  const [defaultTimezone, setDefaultTimezone] = useState<string>(preferences.defaultTimezone);
  const [minimumNoticeHours, setMinimumNoticeHours] = useState<MinimumNoticeHours>(
    preferences.minimumNoticeHours
  );
  const [bufferBeforeMinutes, setBufferBeforeMinutes] = useState<BufferMinutesOption>(
    preferences.bufferBeforeMinutes
  );
  const [bufferAfterMinutes, setBufferAfterMinutes] = useState<BufferMinutesOption>(
    preferences.bufferAfterMinutes
  );

  const handleSave = () => {
    onSavePreferences({
      defaultTimezone,
      minimumNoticeHours,
      bufferBeforeMinutes,
      bufferAfterMinutes,
    });
  };

  return (
    <motion.section
      aria-labelledby="preferences-heading"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: 0.14, ease: [0.2, 0, 0, 1] }}
      className="bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)] rounded-[12px] overflow-hidden"
    >
      <header className="px-6 py-4 border-b border-[var(--color-outline-variant)]">
        <h2
          id="preferences-heading"
          className="text-[16px] leading-6 tracking-[-0.1px] font-semibold text-[var(--color-on-surface)]"
        >
          Scheduling Preferences
        </h2>
        <p className="text-[13px] leading-[18px] text-[var(--color-on-surface-variant)]">
          Default timezone and protective buffer windows between sessions.
        </p>
      </header>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label
            htmlFor="pref-default-tz"
            className="text-[13px] leading-[18px] font-medium text-[var(--color-on-surface)]"
          >
            Default Timezone
          </label>
          <div className="relative flex items-center">
            <span
              aria-hidden="true"
              className="absolute left-3 text-[var(--color-outline)] pointer-events-none flex items-center"
            >
              <Globe className="w-4 h-4" />
            </span>
            <select
              id="pref-default-tz"
              value={defaultTimezone}
              onChange={(e) => setDefaultTimezone(e.target.value)}
              className="w-full rounded-[8px] border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] pl-9 pr-8 py-2 text-[13px] leading-[18px] font-medium text-[var(--color-on-surface)] tabular-nums focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 cursor-pointer"
            >
              {SETTINGS_TIMEZONE_OPTIONS.map((tz) => (
                <option key={tz.value} value={tz.value}>
                  {tz.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="pref-min-notice"
            className="text-[13px] leading-[18px] font-medium text-[var(--color-on-surface)]"
          >
            Minimum Notice
          </label>
          <select
            id="pref-min-notice"
            value={minimumNoticeHours}
            onChange={(e) => setMinimumNoticeHours(Number(e.target.value) as MinimumNoticeHours)}
            className="w-full rounded-[8px] border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] px-4 py-2 text-[13px] leading-[18px] font-medium text-[var(--color-on-surface)] tabular-nums focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 cursor-pointer"
          >
            {MINIMUM_NOTICE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="pref-buffer-before"
            className="text-[13px] leading-[18px] font-medium text-[var(--color-on-surface)]"
          >
            Buffer Before Event
          </label>
          <select
            id="pref-buffer-before"
            value={bufferBeforeMinutes}
            onChange={(e) =>
              setBufferBeforeMinutes(Number(e.target.value) as BufferMinutesOption)
            }
            className="w-full rounded-[8px] border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] px-4 py-2 text-[13px] leading-[18px] font-medium text-[var(--color-on-surface)] tabular-nums focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 cursor-pointer"
          >
            {BUFFER_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="pref-buffer-after"
            className="text-[13px] leading-[18px] font-medium text-[var(--color-on-surface)]"
          >
            Buffer After Event
          </label>
          <select
            id="pref-buffer-after"
            value={bufferAfterMinutes}
            onChange={(e) =>
              setBufferAfterMinutes(Number(e.target.value) as BufferMinutesOption)
            }
            className="w-full rounded-[8px] border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] px-4 py-2 text-[13px] leading-[18px] font-medium text-[var(--color-on-surface)] tabular-nums focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 cursor-pointer"
          >
            {BUFFER_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <footer className="px-6 py-4 bg-[var(--color-surface-container-low)] border-t border-[var(--color-outline-variant)] flex items-center justify-between">
        <div className="min-h-[24px] flex items-center">
          <AnimatePresence>
            {isSaved && (
              <motion.span
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.16, ease: [0.2, 0, 0, 1] }}
                className="text-[12px] leading-4 tracking-[0.1px] font-medium text-[var(--color-on-success-container)] bg-[var(--color-success-container)] px-2 py-1 rounded-full"
              >
                Preferences saved
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <motion.button
          type="button"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.12, ease: "easeOut" }}
          onClick={handleSave}
          className="inline-flex items-center justify-center px-4 py-2 rounded-[8px] bg-[var(--color-primary)] text-[var(--color-on-primary)] shadow-sm hover:bg-[var(--color-on-primary-container)] transition-colors duration-[120ms] ease-out text-[13px] leading-[18px] font-medium cursor-pointer"
        >
          Save Preferences
        </motion.button>
      </footer>
    </motion.section>
  );
};
