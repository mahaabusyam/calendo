"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { ConsultationEventType, NewEventTypeInput } from "@/types/eventTypes";
import { createEventTypeItem, INITIAL_EVENT_TYPES } from "@/lib/eventTypesData";
import { EventTypeCard } from "./EventTypeCard";
import { NewEventTypeModal } from "./NewEventTypeModal";

export const EventTypesDashboardView: React.FC = () => {
  const [eventTypes, setEventTypes] = useState<ConsultationEventType[]>(INITIAL_EVENT_TYPES);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleToggleActive = (id: string) => {
    setEventTypes((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isActive: !item.isActive } : item))
    );
  };

  const handleCreateEventType = (input: NewEventTypeInput) => {
    const created = createEventTypeItem(input);
    setEventTypes((prev) => [created, ...prev]);
  };

  return (
    <>
      <main className="flex-1 p-4 md:p-8 max-w-[1080px] flex flex-col gap-6">
        <motion.header
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, ease: [0.2, 0, 0, 1] }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div>
            <h1 className="font-display text-[28px] leading-9 tracking-[-0.5px] font-bold text-[var(--color-on-surface)]">
              Event Types
            </h1>
            <p className="text-[14px] leading-5 text-[var(--color-on-surface-variant)]">
              Create and manage shareable consultation links for your public booking page.
            </p>
          </div>

          <motion.button
            type="button"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.12, ease: "easeOut" }}
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-[8px] bg-[var(--color-primary)] text-[var(--color-on-primary)] shadow-sm hover:bg-[var(--color-on-primary-container)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 transition-colors duration-[120ms] ease-out cursor-pointer w-fit"
          >
            <Plus className="w-4 h-4" aria-hidden="true" />
            <span className="text-[14px] leading-5 font-medium whitespace-nowrap">
              New Event Type
            </span>
          </motion.button>
        </motion.header>

        <section aria-label="Consultation event types" className="flex flex-col gap-4">
          {eventTypes.map((item, idx) => (
            <EventTypeCard
              key={item.id}
              eventType={item}
              index={idx}
              onToggleActive={handleToggleActive}
            />
          ))}
        </section>
      </main>

      <NewEventTypeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateEventType}
      />
    </>
  );
};
