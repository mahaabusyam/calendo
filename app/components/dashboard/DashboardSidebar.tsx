"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Calendar,
  CalendarClock,
  CalendarDays,
  Clock,
  Link2,
  Menu,
  Settings,
  X,
} from "lucide-react";
import { HostAvatar } from "@/components/shared/HostAvatar";

const NAV_ITEMS = [
  {
    id: "booking-page",
    label: "Booking Page",
    href: "/",
    icon: Calendar,
  },
  {
    id: "event-types",
    label: "Event Types",
    href: "/dashboard/event-types",
    icon: Link2,
  },
  {
    id: "bookings",
    label: "Bookings",
    href: "/dashboard/availability#bookings",
    icon: CalendarDays,
  },
  {
    id: "availability",
    label: "Availability",
    href: "/dashboard/availability",
    icon: Clock,
  },
  {
    id: "settings",
    label: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

interface SidebarContentProps {
  pathname: string;
  onNavigate?: () => void;
  onCloseMobile?: () => void;
  showCloseButton?: boolean;
}

const SidebarContent: React.FC<
  SidebarContentProps
> = ({
  pathname,
  onNavigate,
  onCloseMobile,
  showCloseButton = false,
}) => {
  return (
    <div className="h-full flex flex-col justify-between p-4">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between px-2 pt-1">
          <Link
            href="/"
            onClick={onNavigate}
            className="flex items-center gap-2"
          >
            <div className="w-7 h-7 rounded-[8px] bg-[var(--color-secondary)] text-[var(--color-on-secondary)] flex items-center justify-center">
              <CalendarClock className="w-4 h-4" />
            </div>

            <span className="font-display text-[16px] leading-6 tracking-[-0.1px] font-semibold text-[var(--color-on-surface)]">
              Calendo
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="text-[12px] leading-4 tracking-[0.1px] font-medium px-2 py-0.5 rounded-full bg-[var(--color-primary-container)] text-[var(--color-on-primary-container)]">
              Pro
            </span>

            {showCloseButton &&
              onCloseMobile && (
                <button
                  type="button"
                  aria-label="Close navigation menu"
                  onClick={onCloseMobile}
                  className="p-1.5 rounded-[8px] text-[var(--color-on-surface-variant)] hover:bg-[var(--color-surface-container)] hover:text-[var(--color-on-surface)] transition-colors duration-[120ms] ease-out cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
          </div>
        </div>

        <nav
          aria-label="Dashboard navigation"
          className="flex flex-col gap-1"
        >
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const baseHref =
              item.href.split("#")[0];

            const isActive =
              pathname === baseHref &&
              item.id !== "bookings";

            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={onNavigate}
                aria-current={
                  isActive
                    ? "page"
                    : undefined
                }
                className={[
                  "relative flex items-center gap-2.5 px-3 py-2 rounded-[8px] text-[14px] leading-5 font-medium transition-colors duration-[120ms] ease-out whitespace-nowrap",
                  isActive
                    ? "text-[var(--color-on-primary-container)]"
                    : "text-[var(--color-on-surface-variant)] hover:bg-[var(--color-surface-container)] hover:text-[var(--color-on-surface)]",
                ].join(" ")}
              >
                {isActive && (
                  <motion.span
                    layoutId="dashboard-active-nav"
                    transition={{
                      type: "spring",
                      stiffness: 460,
                      damping: 34,
                    }}
                    className="absolute inset-0 rounded-[8px] bg-[var(--color-primary-container)]"
                  />
                )}

                <Icon
                  className={[
                    "relative z-10 w-4 h-4 shrink-0",
                    isActive
                      ? "text-[var(--color-primary)]"
                      : "",
                  ].join(" ")}
                />

                <span className="relative z-10">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-2.5 px-2 pt-4 border-t border-[var(--color-outline-variant)]">
        <HostAvatar
          alt="Maha Abu Syam"
          sizeClassName="w-9 h-9"
        />

        <div className="flex flex-col min-w-0">
          <span className="text-[14px] leading-5 font-semibold text-[var(--color-on-surface)] truncate">
            Maha Abu Syam
          </span>

          <span className="font-mono text-[12px] leading-4 font-medium text-[var(--color-outline)] truncate">
            /maha
          </span>
        </div>
      </div>
    </div>
  );
};

export const DashboardSidebar: React.FC = () => {
  const pathname = usePathname();

  const [isMobileOpen, setIsMobileOpen] =
    useState<boolean>(false);

  useEffect(() => {
    if (!isMobileOpen) return;

    const handleKeyDown = (
      e: KeyboardEvent
    ) => {
      if (e.key === "Escape") {
        setIsMobileOpen(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
  }, [isMobileOpen]);

  const closeMobileMenu = () => {
    setIsMobileOpen(false);
  };

  return (
    <>
      <div className="lg:hidden sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-[var(--color-surface-container-lowest)] border-b border-[var(--color-outline-variant)]">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            aria-label={
              isMobileOpen
                ? "Close menu"
                : "Open menu"
            }
            aria-expanded={
              isMobileOpen
            }
            onClick={() =>
              setIsMobileOpen(
                (prev) => !prev
              )
            }
            className="inline-flex items-center justify-center w-9 h-9 rounded-[8px] border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] text-[var(--color-on-surface)] hover:bg-[var(--color-surface-container)] transition-colors duration-[120ms] ease-out cursor-pointer"
          >
            {isMobileOpen ? (
              <X className="w-4 h-4" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
          </button>

          <Link
            href="/"
            className="flex items-center gap-2"
          >
            <div className="w-7 h-7 rounded-[8px] bg-[var(--color-secondary)] text-[var(--color-on-secondary)] flex items-center justify-center">
              <CalendarClock className="w-4 h-4" />
            </div>

            <span className="font-display text-[16px] leading-6 tracking-[-0.1px] font-semibold text-[var(--color-on-surface)]">
              Calendo
            </span>
          </Link>
        </div>

        <span className="text-[12px] leading-4 tracking-[0.1px] font-medium px-2 py-0.5 rounded-full bg-[var(--color-primary-container)] text-[var(--color-on-primary-container)]">
          Pro
        </span>
      </div>

      <AnimatePresence>
        {isMobileOpen && (
          <div className="lg:hidden fixed inset-0 z-40 flex">
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 0.16,
                ease: "easeOut",
              }}
              onClick={
                closeMobileMenu
              }
              className="fixed inset-0 bg-[var(--color-secondary)]/40 backdrop-blur-[1px]"
              aria-hidden="true"
            />

            <motion.aside
              initial={{
                x: "-100%",
              }}
              animate={{
                x: 0,
              }}
              exit={{
                x: "-100%",
              }}
              transition={{
                type: "spring",
                stiffness: 420,
                damping: 36,
              }}
              className="relative z-10 w-72 max-w-[82vw] h-full bg-[var(--color-surface-container-lowest)] border-r border-[var(--color-outline-variant)] shadow-lg"
            >
              <SidebarContent
                pathname={pathname}
                onNavigate={
                  closeMobileMenu
                }
                onCloseMobile={
                  closeMobileMenu
                }
                showCloseButton
              />
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      <aside className="hidden lg:block w-60 shrink-0 bg-[var(--color-surface-container-lowest)] border-r border-[var(--color-outline-variant)] min-h-screen">
        <SidebarContent
          pathname={pathname}
        />
      </aside>
    </>
  );
};