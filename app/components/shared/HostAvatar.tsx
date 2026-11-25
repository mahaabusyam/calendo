"use client";

import React, { useEffect, useState } from "react";
import { CALENDO_STATE_EVENT, loadCalendoState } from "@/lib/calendo-store";

interface HostAvatarProps {
  src?: string | null;
  alt?: string;
  sizeClassName?: string;
}

export const HostAvatar: React.FC<HostAvatarProps> = ({
  src,
  alt = "Maha Abu Syam",
  sizeClassName = "w-12 h-12",
}) => {
  const fallbackSrc = "/avatar.svg";

  const [currentSrc, setCurrentSrc] = useState<string>(
    () => src?.trim() || fallbackSrc
  );

  useEffect(() => {
    const syncAvatar = () => {
      if (src && src.trim().length > 0) {
        setCurrentSrc(src.trim());
        return;
      }

      const stored = loadCalendoState().hostAvatar;

      setCurrentSrc(
        stored && stored.trim().length > 0 ? stored.trim() : fallbackSrc
      );
    };

    syncAvatar();

    window.addEventListener(CALENDO_STATE_EVENT, syncAvatar);
    window.addEventListener("storage", syncAvatar);

    return () => {
      window.removeEventListener(CALENDO_STATE_EVENT, syncAvatar);
      window.removeEventListener("storage", syncAvatar);
    };
  }, [src]);

  return (
    <img
      src={currentSrc}
      alt={alt}
      onError={() => {
        if (currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        }
      }}
      className={`${sizeClassName} rounded-full object-cover border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-low)] shrink-0`}
    />
  );
};