"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, Video } from "lucide-react";
import { ConnectedIntegrationItem } from "@/types/settings";

interface ConnectedIntegrationsSectionProps {
  integrations: ConnectedIntegrationItem[];
  onToggleConnection: (id: ConnectedIntegrationItem["id"]) => void;
  onConfigure: (id: ConnectedIntegrationItem["id"]) => void;
}

export const ConnectedIntegrationsSection: React.FC<ConnectedIntegrationsSectionProps> = ({
  integrations,
  onToggleConnection,
  onConfigure,
}) => {
  return (
    <section aria-labelledby="integrations-heading" className="flex flex-col gap-2">
      <div>
        <h2
          id="integrations-heading"
          className="text-[16px] leading-6 tracking-[-0.1px] font-semibold text-[var(--color-on-surface)]"
        >
          Connected Integrations
        </h2>
        <p className="text-[13px] leading-[18px] text-[var(--color-on-surface-variant)]">
          Sync availability and automatically provision video meeting links.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
        {integrations.map((item, idx) => {
          const isConnected = item.status === "connected";
          const Icon = item.id === "google-calendar" ? Calendar : Video;

          return (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.2,
                delay: 0.08 + idx * 0.04,
                ease: [0.2, 0, 0, 1],
              }}
              whileHover={{ y: -2 }}
              className="bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)] rounded-[12px] p-6 flex flex-col justify-between gap-4 h-full transition-colors duration-[120ms] ease-out"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-[8px] bg-[var(--color-primary-container)] text-[var(--color-primary)] flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-[14px] leading-5 font-semibold text-[var(--color-on-surface)]">
                      {item.title}
                    </h3>
                    <span className="text-[13px] leading-[18px] text-[var(--color-on-surface-variant)]">
                      {item.subtitle}
                    </span>
                  </div>
                </div>

                <span
                  className={[
                    "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[12px] leading-4 tracking-[0.1px] font-medium shrink-0 transition-colors duration-[120ms]",
                    isConnected
                      ? "bg-[var(--color-success-container)] text-[var(--color-on-success-container)]"
                      : "bg-[var(--color-surface-container)] text-[var(--color-on-surface-variant)]",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "w-1.5 h-1.5 rounded-full",
                      isConnected ? "bg-[var(--color-success)]" : "bg-[var(--color-outline)]",
                    ].join(" ")}
                  />
                  <span>{isConnected ? "Connected" : "Disconnected"}</span>
                </span>
              </div>

              <p className="text-[13px] leading-[18px] text-[var(--color-on-surface-variant)]">
                {item.description}
              </p>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[var(--color-outline-variant)]">
                <button
                  type="button"
                  onClick={() => onConfigure(item.id)}
                  className="px-3 py-1.5 rounded-[8px] border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] text-[12px] leading-4 tracking-[0.1px] font-medium text-[var(--color-on-surface)] hover:bg-[var(--color-surface-container)] transition-colors duration-[120ms] ease-out cursor-pointer"
                >
                  Configure
                </button>

                {item.id === "google-calendar" && (
                  <button
                    type="button"
                    onClick={() => onToggleConnection(item.id)}
                    className={[
                      "px-3 py-1.5 rounded-[8px] border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] text-[12px] leading-4 tracking-[0.1px] font-medium transition-colors duration-[120ms] ease-out cursor-pointer",
                      isConnected
                        ? "text-[var(--color-error)] hover:bg-[var(--color-error-container)]"
                        : "text-[var(--color-primary)] hover:bg-[var(--color-primary-container)]/50",
                    ].join(" ")}
                  >
                    {isConnected ? "Disconnect" : "Connect"}
                  </button>
                )}
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
};
