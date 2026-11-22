"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { EventDurationMinutes, NewEventTypeInput } from "@/types/eventTypes";
import { HOST_HANDLE } from "@/lib/eventTypesData";

interface NewEventTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (input: NewEventTypeInput) => void;
}

export const NewEventTypeModal: React.FC<NewEventTypeModalProps> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  const [title, setTitle] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [durationMinutes, setDurationMinutes] = useState<EventDurationMinutes>(30);
  const [description, setDescription] = useState<string>("");
  const [titleError, setTitleError] = useState<string>("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim()) {
      setTitleError("Please enter an event title.");
      return;
    }

    onCreate({
      title,
      slug,
      durationMinutes,
      description,
    });

    setTitle("");
    setSlug("");
    setDurationMinutes(30);
    setDescription("");
    setTitleError("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16, ease: "easeOut" }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--color-secondary)]/40 backdrop-blur-[1px]"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)] rounded-[12px] shadow-xl overflow-hidden"
          >
            <header className="px-6 py-4 border-b border-[var(--color-outline-variant)] flex items-center justify-between">
              <div>
                <h2
                  id="modal-title"
                  className="font-display text-[18px] leading-6 tracking-[-0.2px] font-semibold text-[var(--color-on-surface)]"
                >
                  Add New Event Type
                </h2>
                <p className="text-[13px] leading-[18px] text-[var(--color-on-surface-variant)]">
                  Configure a new consultation link for your public page.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="inline-flex items-center justify-center w-8 h-8 rounded-[8px] text-[var(--color-on-surface-variant)] hover:bg-[var(--color-surface-container)] hover:text-[var(--color-on-surface)] transition-colors duration-[120ms] ease-out cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </header>

            <form onSubmit={handleSubmit} noValidate className="p-6 flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="event-title-input"
                  className="text-[13px] leading-[18px] font-medium text-[var(--color-on-surface)]"
                >
                  Event Title <span className="text-[var(--color-error)]">*</span>
                </label>
                <input
                  id="event-title-input"
                  type="text"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    if (titleError) setTitleError("");
                  }}
                  placeholder="45-Min Design System Audit"
                  className={[
                    "w-full rounded-[8px] border bg-[var(--color-surface-container-lowest)] px-4 py-2 text-[14px] leading-5 text-[var(--color-on-surface)] placeholder:text-[var(--color-outline)] focus:outline-none focus:ring-2 transition-colors duration-[120ms] ease-out",
                    titleError
                      ? "border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-[var(--color-error)]/20"
                      : "border-[var(--color-outline-variant)] focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]/20",
                  ].join(" ")}
                />
                {titleError && (
                  <span className="text-[12px] leading-4 text-[var(--color-error)] mt-0.5">
                    {titleError}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="event-slug-input"
                    className="text-[13px] leading-[18px] font-medium text-[var(--color-on-surface)]"
                  >
                    URL Slug
                  </label>
                  <div className="flex items-center rounded-[8px] border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-low)] overflow-hidden focus-within:border-[var(--color-primary)] focus-within:ring-2 focus-within:ring-[var(--color-primary)]/20">
                    <span className="px-3 py-2 font-mono text-[12px] leading-4 font-medium text-[var(--color-outline)] border-r border-[var(--color-outline-variant)]">
                      {HOST_HANDLE}/
                    </span>
                    <input
                      id="event-slug-input"
                      type="text"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      placeholder="design-audit"
                      className="w-full border-0 bg-[var(--color-surface-container-lowest)] px-3 py-2 font-mono text-[12px] leading-4 font-medium text-[var(--color-on-surface)] placeholder:text-[var(--color-outline)] focus:ring-0 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="event-duration-select"
                    className="text-[13px] leading-[18px] font-medium text-[var(--color-on-surface)]"
                  >
                    Duration
                  </label>
                  <select
                    id="event-duration-select"
                    value={durationMinutes}
                    onChange={(e) =>
                      setDurationMinutes(Number(e.target.value) as EventDurationMinutes)
                    }
                    className="w-full rounded-[8px] border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] px-4 py-2 text-[13px] leading-[18px] font-medium text-[var(--color-on-surface)] tabular-nums focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 cursor-pointer"
                  >
                    <option value={15}>15 mins</option>
                    <option value={30}>30 mins</option>
                    <option value={45}>45 mins</option>
                    <option value={60}>60 mins</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label
                  htmlFor="event-description-input"
                  className="text-[13px] leading-[18px] font-medium text-[var(--color-on-surface)]"
                >
                  Description
                </label>
                <textarea
                  id="event-description-input"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe what guests can expect from this session..."
                  className="w-full rounded-[8px] border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] px-4 py-2 text-[14px] leading-5 text-[var(--color-on-surface)] placeholder:text-[var(--color-outline)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 resize-none"
                />
              </div>

              <footer className="flex items-center justify-end gap-2 pt-2 border-t border-[var(--color-outline-variant)]">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-[8px] border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] text-[13px] leading-[18px] font-medium text-[var(--color-on-surface)] hover:bg-[var(--color-surface-container)] transition-colors duration-[120ms] ease-out cursor-pointer"
                >
                  Cancel
                </button>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.12, ease: "easeOut" }}
                  className="px-4 py-2 rounded-[8px] bg-[var(--color-primary)] text-[var(--color-on-primary)] hover:bg-[var(--color-on-primary-container)] transition-colors duration-[120ms] ease-out text-[13px] leading-[18px] font-medium cursor-pointer"
                >
                  Create Event Type
                </motion.button>
              </footer>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
