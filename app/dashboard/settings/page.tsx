"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, RotateCcw, Upload } from "lucide-react";
import {
  CALENDO_STATE_EVENT,
  CalendoProfileState,
  DEFAULT_CALENDO_STATE,
  fileToDataUrl,
  loadCalendoState,
  resetCalendoState,
  saveCalendoState,
} from "@/lib/calendo-store";
import { TIME_ZONES } from "@/lib/scheduling";
import { TimeFormat } from "@/types/booking";
import { HostAvatar } from "@/components/shared/HostAvatar";

export default function SettingsPage() {
  const [formState, setFormState] =
  useState<CalendoProfileState>(
    () => loadCalendoState()
  );
  const [savedNotice, setSavedNotice] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  useEffect(() => {
  const syncFromStore = () => {
    setFormState(loadCalendoState());
  };

  window.addEventListener(
    CALENDO_STATE_EVENT,
    syncFromStore
  );

  window.addEventListener(
    "storage",
    syncFromStore
  );

  return () => {
    window.removeEventListener(
      CALENDO_STATE_EVENT,
      syncFromStore
    );

    window.removeEventListener(
      "storage",
      syncFromStore
    );
  };
}, []);

  const showSavedFeedback = () => {
    setSavedNotice(true);
    window.setTimeout(() => {
      setSavedNotice(false);
    }, 2200);
  };

  const handleAvatarChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError(null);

    if (!file.type.startsWith("image/")) {
      setUploadError("Please select a valid image file.");
      return;
    }

    const maxSizeBytes = 2 * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      setUploadError("Image size is too large. Please keep it under 2MB.");
      return;
    }

    try {
      const dataUrl = await fileToDataUrl(file);
      const updated = saveCalendoState({ hostAvatar: dataUrl });
      setFormState(updated);
      showSavedFeedback();
    } catch {
      setUploadError("Could not read the selected image.");
    }
  };

  const handleResetAvatar = () => {
    setUploadError(null);
    const updated = saveCalendoState({ hostAvatar: "/avatar.svg" });
    setFormState(updated);
    showSavedFeedback();
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setUploadError(null);
    const updated = saveCalendoState({
      ...formState,
      hostName: formState.hostName.trim() || DEFAULT_CALENDO_STATE.hostName,
      hostRole: formState.hostRole.trim() || DEFAULT_CALENDO_STATE.hostRole,
      title: formState.title.trim() || DEFAULT_CALENDO_STATE.title,
      description:
        formState.description.trim() || DEFAULT_CALENDO_STATE.description,
      locationLabel:
        formState.locationLabel.trim() || DEFAULT_CALENDO_STATE.locationLabel,
      slugPath: formState.slugPath.trim() || DEFAULT_CALENDO_STATE.slugPath,
      hostAvatar: formState.hostAvatar || "/avatar.svg",
    });
    setFormState(updated);
    showSavedFeedback();
  };

  const handleResetAll = () => {
    setUploadError(null);
    const reset = resetCalendoState();
    setFormState(reset);
    showSavedFeedback();
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="w-full max-w-[920px] mx-auto bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)] rounded-[12px] p-5 sm:p-7 shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-[var(--color-outline-variant)]">
          <div>
            <h1 className="font-display text-[20px] leading-7 font-semibold text-[var(--color-on-surface)]">
              Settings
            </h1>
            <p className="text-[13px] text-[var(--color-on-surface-variant)] mt-0.5">
              Manage your profile details, avatar image, and scheduling preferences.
            </p>
          </div>

          {savedNotice && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-[var(--color-primary-container)] text-[var(--color-on-primary-container)] text-[12px] font-medium">
              <Check className="w-3.5 h-3.5" />
              <span>Saved</span>
            </div>
          )}
        </div>

        <form onSubmit={handleSaveSettings} className="mt-6 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-[10px] border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-low)]">
            <div className="flex items-center gap-4">
              <HostAvatar
                src={formState.hostAvatar}
                alt={formState.hostName}
                sizeClassName="w-16 h-16"
              />
              <div>
                <p className="text-[14px] font-semibold text-[var(--color-on-surface)]">
                  Profile Avatar
                </p>
                <p className="text-[12px] text-[var(--color-on-surface-variant)] mt-0.5">
                  Uses the default avatar until you upload an image, which persists across pages and refreshes.
                </p>
                {uploadError && (
                  <p className="text-[12px] text-red-600 mt-1">{uploadError}</p>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <label className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[8px] bg-[var(--color-primary)] text-[var(--color-on-primary)] text-[13px] font-medium hover:opacity-95 transition-opacity cursor-pointer">
                <Upload className="w-4 h-4" />
                <span>Upload Avatar</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>

              <button
                type="button"
                onClick={handleResetAvatar}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-[8px] border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] text-[var(--color-on-surface)] text-[13px] font-medium hover:bg-[var(--color-surface-container)] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Default</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-[var(--color-on-surface)]">
                Full Name
              </label>
              <input
                type="text"
                value={formState.hostName}
                onChange={(e) =>
                  setFormState((prev) => ({ ...prev, hostName: e.target.value }))
                }
                className="px-3 py-2 rounded-[8px] border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] text-[14px] text-[var(--color-on-surface)]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-[var(--color-on-surface)]">
                Role / Title
              </label>
              <input
                type="text"
                value={formState.hostRole}
                onChange={(e) =>
                  setFormState((prev) => ({ ...prev, hostRole: e.target.value }))
                }
                className="px-3 py-2 rounded-[8px] border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] text-[14px] text-[var(--color-on-surface)]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-[var(--color-on-surface)]">
                Event Title
              </label>
              <input
                type="text"
                value={formState.title}
                onChange={(e) =>
                  setFormState((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
                className="px-3 py-2 rounded-[8px] border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] text-[14px] text-[var(--color-on-surface)]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-[var(--color-on-surface)]">
                Meeting Location
              </label>
              <input
                type="text"
                value={formState.locationLabel}
                onChange={(e) =>
                  setFormState((prev) => ({
                    ...prev,
                    locationLabel: e.target.value,
                  }))
                }
                className="px-3 py-2 rounded-[8px] border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] text-[14px] text-[var(--color-on-surface)]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-[var(--color-on-surface)]">
              Event Description
            </label>
            <textarea
              rows={3}
              value={formState.description}
              onChange={(e) =>
                setFormState((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className="px-3 py-2 rounded-[8px] border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] text-[14px] text-[var(--color-on-surface)]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-[var(--color-on-surface)]">
                Default Time Zone
              </label>
              <select
                value={formState.selectedTimezone}
                onChange={(e) =>
                  setFormState((prev) => ({
                    ...prev,
                    selectedTimezone: e.target.value,
                  }))
                }
                className="px-3 py-2 rounded-[8px] border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] text-[14px] text-[var(--color-on-surface)]"
              >
                {TIME_ZONES.map((tz) => (
  <option key={tz.value} value={tz.value}>
    {tz.label}
  </option>
))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-[var(--color-on-surface)]">
                Time Format
              </label>
              <select
                value={formState.timeFormat}
                onChange={(e) =>
                  setFormState((prev) => ({
                    ...prev,
                    timeFormat: e.target.value as TimeFormat,
                  }))
                }
                className="px-3 py-2 rounded-[8px] border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] text-[14px] text-[var(--color-on-surface)]"
              >
                <option value="12h">12-Hour (AM / PM)</option>
                <option value="24h">24-Hour</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[var(--color-outline-variant)]">
            <button
              type="button"
              onClick={handleResetAll}
              className="px-4 py-2 rounded-[8px] border border-[var(--color-outline-variant)] text-[13px] font-medium text-[var(--color-on-surface-variant)] hover:bg-[var(--color-surface-container)] transition-colors cursor-pointer"
            >
              Reset All
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded-[8px] bg-[var(--color-primary)] text-[var(--color-on-primary)] text-[13px] font-semibold hover:opacity-95 transition-opacity cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
