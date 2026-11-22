"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2, Mail } from "lucide-react";
import { BookingFormPayload, FormattedBookingSummary } from "@/types/booking";

interface BookingConfirmationFormProps {
  dateParam: string;
  slotIdParam: string;
  timeParam: string;
  tzParam: string;
  summary: FormattedBookingSummary;
}

interface FormErrors {
  guestName?: string;
  guestEmail?: string;
}

export const BookingConfirmationForm: React.FC<BookingConfirmationFormProps> = ({
  dateParam,
  slotIdParam,
  timeParam,
  tzParam,
  summary,
}) => {
  const router = useRouter();
  const [guestName, setGuestName] = useState<string>("");
  const [guestEmail, setGuestEmail] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const validateForm = (): FormErrors => {
    const nextErrors: FormErrors = {};
    const trimmedName = guestName.trim();
    const trimmedEmail = guestEmail.trim();

    if (!trimmedName) {
      nextErrors.guestName = "Please enter your full name.";
    } else if (trimmedName.length < 2) {
      nextErrors.guestName = "Name must be at least 2 characters.";
    }

    if (!trimmedEmail) {
      nextErrors.guestEmail = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      nextErrors.guestEmail = "Please enter a valid email address.";
    }

    return nextErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    const validationErrors = validateForm();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);

    const payload: BookingFormPayload = {
      guestName: guestName.trim(),
      guestEmail: guestEmail.trim(),
      notes: notes.trim(),
      date: dateParam,
      slotId: slotIdParam,
      timeLabel: timeParam,
      timeZone: tzParam,
    };

    await new Promise((resolve) => setTimeout(resolve, 400));

    const query = new URLSearchParams({
      date: payload.date,
      slotId: payload.slotId,
      tz: payload.timeZone,
      guestName: payload.guestName,
      guestEmail: payload.guestEmail,
      ...(payload.notes ? { notes: payload.notes } : {}),
    });

    router.push(`/booking-success?${query.toString()}`);
  };

  return (
    <section className="p-6 md:p-8 flex flex-col justify-between bg-[var(--color-surface-container-lowest)]">
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
        >
          <h2 className="text-[22px] leading-7 tracking-[-0.3px] font-semibold text-[var(--color-on-surface)] mb-1">
            Confirm your details
          </h2>
          <p className="text-[14px] leading-5 text-[var(--color-on-surface-variant)]">
            Please provide your contact information to finalize this consultation.
          </p>
        </motion.div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="guest-name"
            className="text-[13px] leading-[18px] font-medium text-[var(--color-on-surface)]"
          >
            Full Name <span className="text-[var(--color-error)]">*</span>
          </label>
          <input
            id="guest-name"
            type="text"
            value={guestName}
            disabled={isSubmitting}
            onChange={(e) => {
              setGuestName(e.target.value);
              if (errors.guestName) {
                setErrors((prev) => ({ ...prev, guestName: undefined }));
              }
            }}
            placeholder="Layla Al-Mansoor"
            className={[
              "w-full rounded-[8px] border bg-[var(--color-surface-container-lowest)] px-4 py-2 text-[14px] leading-5 text-[var(--color-on-surface)] placeholder:text-[var(--color-outline)] focus:outline-none focus:ring-2 transition-colors duration-[120ms] ease-out disabled:opacity-60",
              errors.guestName
                ? "border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-[var(--color-error)]/20"
                : "border-[var(--color-outline-variant)] focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]/20",
            ].join(" ")}
          />
          <AnimatePresence>
            {errors.guestName && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.14 }}
                className="text-[12px] leading-4 text-[var(--color-error)] mt-0.5"
              >
                {errors.guestName}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="guest-email"
            className="text-[13px] leading-[18px] font-medium text-[var(--color-on-surface)]"
          >
            Email Address <span className="text-[var(--color-error)]">*</span>
          </label>
          <div className="relative flex items-center">
            <span
              aria-hidden="true"
              className="absolute left-3 text-[var(--color-outline)] pointer-events-none flex items-center"
            >
              <Mail className="w-4 h-4" />
            </span>
            <input
              id="guest-email"
              type="email"
              inputMode="email"
              value={guestEmail}
              disabled={isSubmitting}
              onChange={(e) => {
                setGuestEmail(e.target.value);
                if (errors.guestEmail) {
                  setErrors((prev) => ({ ...prev, guestEmail: undefined }));
                }
              }}
              placeholder="layla@northstar.io"
              className={[
                "w-full rounded-[8px] border bg-[var(--color-surface-container-lowest)] pl-9 pr-4 py-2 text-[14px] leading-5 text-[var(--color-on-surface)] placeholder:text-[var(--color-outline)] focus:outline-none focus:ring-2 transition-colors duration-[120ms] ease-out disabled:opacity-60",
                errors.guestEmail
                  ? "border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-[var(--color-error)]/20"
                  : "border-[var(--color-outline-variant)] focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]/20",
              ].join(" ")}
            />
          </div>
          <AnimatePresence>
            {errors.guestEmail && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.14 }}
                className="text-[12px] leading-4 text-[var(--color-error)] mt-0.5"
              >
                {errors.guestEmail}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="guest-notes"
            className="text-[13px] leading-[18px] font-medium text-[var(--color-on-surface)]"
          >
            Additional Notes
          </label>
          <textarea
            id="guest-notes"
            rows={4}
            value={notes}
            disabled={isSubmitting}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Share topics, repository context, or specific questions you'd like to cover..."
            className="w-full rounded-[8px] border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] px-4 py-2 text-[14px] leading-5 text-[var(--color-on-surface)] placeholder:text-[var(--color-outline)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 transition-colors duration-[120ms] ease-out resize-none disabled:opacity-60"
          />
        </div>

        <div className="rounded-[8px] border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-low)]/60 px-3.5 py-2.5 flex items-center gap-2 text-[12px] leading-4 text-[var(--color-on-surface-variant)] tabular-nums">
          <CheckCircle2 className="w-4 h-4 text-[var(--color-primary)] shrink-0" />
          <span>
            Selected slot: {summary.fullDateLabel} · {summary.timeRangeLabel}
          </span>
        </div>

        <div className="flex items-center justify-end gap-2 pt-1">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-4 py-2 rounded-[8px] bg-[var(--color-surface-container-lowest)] text-[var(--color-on-surface)] border border-[var(--color-outline-variant)] hover:bg-[var(--color-surface-container)] transition-colors duration-[120ms] ease-out text-[14px] leading-5 font-medium"
          >
            Cancel
          </Link>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={!isSubmitting ? { scale: 1.01 } : undefined}
            whileTap={!isSubmitting ? { scale: 0.98 } : undefined}
            transition={{ duration: 0.12, ease: "easeOut" }}
            className="inline-flex items-center justify-center gap-2 px-6 py-2 rounded-[8px] bg-[var(--color-primary)] text-[var(--color-on-primary)] shadow-sm hover:bg-[var(--color-on-primary-container)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 transition-colors duration-[120ms] ease-out text-[14px] leading-5 font-medium cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
            <span>{isSubmitting ? "Confirming..." : "Confirm Booking"}</span>
          </motion.button>
        </div>
      </form>
    </section>
  );
};
