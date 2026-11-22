"use client";

import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HostProfileSettings } from "@/types/settings";

interface ProfileDetailsCardProps {
  profile: HostProfileSettings;
  isSaved: boolean;
  onSaveProfile: (updated: HostProfileSettings) => void;
}

export const ProfileDetailsCard: React.FC<ProfileDetailsCardProps> = ({
  profile,
  isSaved,
  onSaveProfile,
}) => {
  const [fullName, setFullName] = useState<string>(profile.fullName);
  const [usernameSlug, setUsernameSlug] = useState<string>(profile.usernameSlug);
  const [bio, setBio] = useState<string>(profile.bio);
  const [avatarUrl, setAvatarUrl] = useState<string>(profile.avatarUrl);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setAvatarUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile({
      fullName: fullName.trim() || profile.fullName,
      usernameSlug:
        usernameSlug
          .trim()
          .toLowerCase()
          .replace(/[^a-z0-9-_]/g, "") || profile.usernameSlug,
      bio: bio.trim(),
      avatarUrl,
    });
  };

  return (
    <motion.section
      aria-labelledby="profile-heading"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: 0.04, ease: [0.2, 0, 0, 1] }}
      className="bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)] rounded-[12px] overflow-hidden"
    >
      <header className="px-6 py-4 border-b border-[var(--color-outline-variant)]">
        <h2
          id="profile-heading"
          className="text-[16px] leading-6 tracking-[-0.1px] font-semibold text-[var(--color-on-surface)]"
        >
          Profile Details
        </h2>
        <p className="text-[13px] leading-[18px] text-[var(--color-on-surface-variant)]">
          Information displayed on your public consultation booking pages.
        </p>
      </header>

      <form id="profile-form" onSubmit={handleSave} className="p-6 flex flex-col gap-6">
        <div className="flex items-center gap-6">
          <motion.img
            key={avatarUrl}
            initial={{ scale: 0.94, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.18, ease: [0.2, 0, 0, 1] }}
            src={avatarUrl}
            alt={fullName}
            className="w-16 h-16 rounded-full object-cover border border-[var(--color-outline-variant)] shrink-0"
          />

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg"
                onChange={handlePhotoChange}
                className="hidden"
              />
              <motion.button
                type="button"
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.12, ease: "easeOut" }}
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 rounded-[8px] border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] text-[13px] leading-[18px] font-medium text-[var(--color-on-surface)] hover:bg-[var(--color-surface-container)] transition-colors duration-[120ms] ease-out cursor-pointer"
              >
                Change Photo
              </motion.button>
            </div>
            <span className="text-[13px] leading-[18px] text-[var(--color-on-surface-variant)]">
              JPG or PNG, square 1:1 recommended.
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="settings-full-name"
              className="text-[13px] leading-[18px] font-medium text-[var(--color-on-surface)]"
            >
              Full Name
            </label>
            <input
              id="settings-full-name"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-[8px] border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] px-4 py-2 text-[14px] leading-5 text-[var(--color-on-surface)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 transition-colors duration-[120ms] ease-out"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="settings-username-slug"
              className="text-[13px] leading-[18px] font-medium text-[var(--color-on-surface)]"
            >
              Username Slug
            </label>
            <div className="flex items-center rounded-[8px] border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-low)] overflow-hidden focus-within:border-[var(--color-primary)] focus-within:ring-2 focus-within:ring-[var(--color-primary)]/20">
              <span className="px-3 py-2 font-mono text-[12px] leading-4 font-medium text-[var(--color-outline)] border-r border-[var(--color-outline-variant)] whitespace-nowrap">
                calendo.app/
              </span>
              <input
                id="settings-username-slug"
                type="text"
                value={usernameSlug}
                onChange={(e) => setUsernameSlug(e.target.value)}
                className="w-full border-0 bg-[var(--color-surface-container-lowest)] px-3 py-2 font-mono text-[12px] leading-4 font-medium text-[var(--color-on-surface)] focus:ring-0 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="settings-bio"
            className="text-[13px] leading-[18px] font-medium text-[var(--color-on-surface)]"
          >
            Bio
          </label>
          <textarea
            id="settings-bio"
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full rounded-[8px] border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] px-4 py-2 text-[14px] leading-5 text-[var(--color-on-surface)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 transition-colors duration-[120ms] ease-out resize-none"
          />
        </div>
      </form>

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
                Profile updated
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <motion.button
          type="submit"
          form="profile-form"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.12, ease: "easeOut" }}
          className="inline-flex items-center justify-center px-4 py-2 rounded-[8px] bg-[var(--color-primary)] text-[var(--color-on-primary)] shadow-sm hover:bg-[var(--color-on-primary-container)] transition-colors duration-[120ms] ease-out text-[13px] leading-[18px] font-medium cursor-pointer"
        >
          Save Profile
        </motion.button>
      </footer>
    </motion.section>
  );
};
