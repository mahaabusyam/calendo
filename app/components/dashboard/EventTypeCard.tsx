"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Clock, Copy, ExternalLink, Video } from "lucide-react";
import { ConsultationEventType } from "@/types/eventTypes";
import { BASE_SHARE_DOMAIN, HOST_HANDLE } from "@/lib/eventTypesData";

interface EventTypeCardProps {
  eventType: ConsultationEventType;
  index: number;
  onToggleActive: (id: string) => void;
}

export const EventTypeCard: React.FC<EventTypeCardProps> = ({
  eventType,
  index,
  onToggleActive,
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  const fullPath = `${HOST_HANDLE}/${eventType.slug}`;
  const displayUrl = `${BASE_SHARE_DOMAIN}${fullPath}`;
  const copyUrl = `https://${displayUrl}`;

  const handleCopy = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(copyUrl);
      }
    } catch {
      // Fallback gracefully in restricted environments
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: eventType.isActive ? 1 : 0.72, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{
        duration: 0.2,
        delay: Math.min(index * 0.04, 0.2),
        ease: [0.2, 0, 0, 1],
      }}
      className="bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)] hover:border-[var(--color-outline)] rounded-[12px] p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-colors duration-[120ms] ease-out"
    >
      <div className="flex flex-col gap-1 max-w-xl">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-[16px] leading-6 tracking-[-0.1px] font-semibold text-[var(--color-on-surface)]">
            {eventType.title}
          </h2>

          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[var(--color-primary-container)] text-[var(--color-on-primary-container)] text-[12px] leading-4 font-medium tabular-nums">
            <Clock className="w-3 h-3" />
            <span>{eventType.durationMinutes} mins</span>
          </span>

          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[var(--color-surface-container)] text-[var(--color-on-surface-variant)] text-[12px] leading-4 font-medium">
            <Video className="w-3 h-3" />
            <span>{eventType.locationLabel}</span>
          </span>
        </div>

        <span className="font-mono text-[12px] leading-4 font-medium text-[var(--color-outline)]">
          {displayUrl}
        </span>

        <p className="text-[14px] leading-5 text-[var(--color-on-surface-variant)] text-pretty mt-0.5">
          {eventType.description}
        </p>
      </div>

      <div className="flex items-center justify-between md:justify-end gap-4 shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-[var(--color-outline-variant)]">
        <motion.button
          type="button"
          whileTap={{ scale: 0.96 }}
          transition={{ duration: 0.12, ease: "easeOut" }}
          onClick={handleCopy}
          className={[
            "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] border bg-[var(--color-surface-container-lowest)] hover:bg-[var(--color-surface-container)] transition-colors duration-[120ms] ease-out text-[13px] leading-[18px] font-medium cursor-pointer",
            copied
              ? "border-[var(--color-primary)] text-[var(--color-primary)]"
              : "border-[var(--color-outline-variant)] text-[var(--color-on-surface)]",
          ].join(" ")}
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-[var(--color-primary)]" />
          ) : (
            <Copy className="w-3.5 h-3.5 text-[var(--color-on-surface-variant)]" />
          )}
          <span>{copied ? "Copied" : "Copy Link"}</span>
        </motion.button>

        <Link
          href="/"
          aria-label={`Preview ${eventType.title}`}
          className="inline-flex items-center justify-center w-8 h-8 rounded-[8px] border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] text-[var(--color-on-surface-variant)] hover:bg-[var(--color-surface-container)] hover:text-[var(--color-on-surface)] transition-colors duration-[120ms] ease-out"
        >
          <ExternalLink className="w-4 h-4" />
        </Link>

        <button
          type="button"
          role="switch"
          aria-checked={eventType.isActive}
          aria-label={`Toggle ${eventType.title}`}
          onClick={() => onToggleActive(eventType.id)}
          className={[
            "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-[120ms] ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2",
            eventType.isActive
              ? "bg-[var(--color-primary)]"
              : "bg-[var(--color-surface-container-high)]",
          ].join(" ")}
        >
          <motion.span
            layout
            transition={{ type: "spring", stiffness: 520, damping: 32 }}
            className={[
              "pointer-events-none inline-block h-4 w-4 rounded-full bg-[var(--color-surface-container-lowest)] shadow-sm",
              eventType.isActive ? "translate-x-4" : "translate-x-0",
            ].join(" ")}
          />
        </button>
      </div>
    </motion.article>
  );
};
