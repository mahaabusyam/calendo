"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import {
  ConnectedIntegrationItem,
  HostProfileSettings,
  SchedulingPreferences,
} from "@/types/settings";
import {
  INITIAL_INTEGRATIONS,
  INITIAL_PROFILE_SETTINGS,
  INITIAL_SCHEDULING_PREFERENCES,
} from "@/lib/settingsData";
import { ProfileDetailsCard } from "./ProfileDetailsCard";
import { ConnectedIntegrationsSection } from "./ConnectedIntegrationsSection";
import { SchedulingPreferencesCard } from "./SchedulingPreferencesCard";

export const SettingsDashboardView: React.FC = () => {
  const [profile, setProfile] = useState<HostProfileSettings>(INITIAL_PROFILE_SETTINGS);
  const [integrations, setIntegrations] =
    useState<ConnectedIntegrationItem[]>(INITIAL_INTEGRATIONS);
  const [preferences, setPreferences] = useState<SchedulingPreferences>(
    INITIAL_SCHEDULING_PREFERENCES
  );
  const [profileSaved, setProfileSaved] = useState<boolean>(false);
  const [prefsSaved, setPrefsSaved] = useState<boolean>(false);

  const handleSaveProfile = (updated: HostProfileSettings) => {
    setProfile(updated);
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2200);
  };

  const handleToggleConnection = (id: ConnectedIntegrationItem["id"]) => {
    setIntegrations((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const nextConnected = item.status !== "connected";
        return {
          ...item,
          status: nextConnected ? "connected" : "disconnected",
          description: nextConnected
            ? "Two-way conflict checking enabled. New bookings are added to your primary calendar automatically."
            : "Calendar sync paused. Reconnect to check conflicts and add new bookings automatically.",
        };
      })
    );
  };

  const handleConfigureIntegration = (id: ConnectedIntegrationItem["id"]) => {
    setIntegrations((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "connected" } : item
      )
    );
  };

  const handleSavePreferences = (updated: SchedulingPreferences) => {
    setPreferences(updated);
    setPrefsSaved(true);
    setTimeout(() => setPrefsSaved(false), 2200);
  };

  return (
    <main className="flex-1 p-4 md:p-8 max-w-[1080px] flex flex-col gap-6">
      <motion.header
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.22, ease: [0.2, 0, 0, 1] }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="font-display text-[28px] leading-9 tracking-[-0.5px] font-bold text-[var(--color-on-surface)]">
            Settings
          </h1>
          <p className="text-[14px] leading-5 text-[var(--color-on-surface-variant)]">
            Manage your public profile, connected calendar integrations, and scheduling defaults.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-[8px] bg-[var(--color-surface-container-lowest)] text-[var(--color-on-surface)] border border-[var(--color-outline-variant)] hover:bg-[var(--color-surface-container)] transition-colors duration-[120ms] ease-out w-fit text-[13px] leading-[18px] font-medium"
        >
          <ExternalLink className="w-4 h-4 text-[var(--color-on-surface-variant)]" />
          <span>View Public Page</span>
        </Link>
      </motion.header>

      <ProfileDetailsCard
        profile={profile}
        isSaved={profileSaved}
        onSaveProfile={handleSaveProfile}
      />

      <ConnectedIntegrationsSection
        integrations={integrations}
        onToggleConnection={handleToggleConnection}
        onConfigure={handleConfigureIntegration}
      />

      <SchedulingPreferencesCard
        preferences={preferences}
        isSaved={prefsSaved}
        onSavePreferences={handleSavePreferences}
      />
    </main>
  );
};
