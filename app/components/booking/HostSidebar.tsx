"use client";

import React from "react";
import { Clock, Globe, Video } from "lucide-react";
import { BookingEventDetails } from "@/types/booking";
import { TIME_ZONES } from "@/lib/scheduling";
import { HostAvatar } from "@/components/shared/HostAvatar";

interface HostSidebarProps {
  eventDetails: BookingEventDetails;
  selectedTimezone: string;
  onChangeTimezone: (tz: string) => void;
}

export const HostSidebar: React.FC<HostSidebarProps> = ({
  eventDetails,
  selectedTimezone,
  onChangeTimezone,
}) => {
  return (
    <aside className="p-6 flex flex-col justify-between gap-6 bg-[var(--color-surface-container-lowest)]">
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <HostAvatar
            src={eventDetails.hostAvatar}
            alt={eventDetails.hostName}
            sizeClassName="w-12 h-12"
          />
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[14px] leading-5 font-semibold text-[var(--color-on-surface)] truncate">
                {eventDetails.hostName}
              </span>
              {eventDetails.isVerified && (
                <span className="text-[11px] px-1.5 py-0.5 rounded-full bg-[var(--color-primary-container)] text-[var(--color-on-primary-container)] font-medium shrink-0">
                  Verified
                </span>
              )}
            </div>
            <span className="text-[12px] leading-4 text-[var(--color-on-surface-variant)] truncate">
              {eventDetails.hostRole}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="font-display text-[20px] leading-7 tracking-[-0.2px] font-semibold text-[var(--color-on-surface)]">
            {eventDetails.title}
          </h1>
          <p className="text-[13px] leading-5 text-[var(--color-on-surface-variant)]">
            {eventDetails.description}
          </p>
        </div>

        <div className="flex flex-col gap-2.5 pt-2 border-t border-[var(--color-outline-variant)] text-[13px] text-[var(--color-on-surface)]">
          <div className="flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-[var(--color-on-surface-variant)] shrink-0" />
            <span>{eventDetails.durationMinutes} min</span>
          </div>

          <div className="flex items-center gap-2.5">
            <Video className="w-4 h-4 text-[var(--color-on-surface-variant)] shrink-0" />
            <span>{eventDetails.locationLabel}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1.5 pt-4 border-t border-[var(--color-outline-variant)]">
        <label
          htmlFor="host-sidebar-timezone"
          className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[var(--color-on-surface-variant)]"
        >
          <Globe className="w-3.5 h-3.5" />
          <span>Time zone</span>
        </label>
        <select
          id="host-sidebar-timezone"
          value={selectedTimezone}
          onChange={(e) => onChangeTimezone(e.target.value)}
          className="w-full px-3 py-2 rounded-[8px] border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-low)] text-[13px] text-[var(--color-on-surface)] focus:outline-none focus:border-[var(--color-primary)]"
        >
          {TIME_ZONES.map((tz, idx) => (
            <option key={`${tz.value}-${idx}`} value={tz.value}>
              {tz.label}
            </option>
          ))}
        </select>
      </div>
    </aside>
  );
};
