# Calendo — Scheduling & Booking Platform

A modern, responsive scheduling and booking web application built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**, featuring client-side state persistence via `localStorage`, real-time cross-component synchronization, multi-timezone slot formatting (`12h` / `24h`), and a host management dashboard.

---

## Key Features

- **Public Booking Flow:**
  - Interactive host profile sidebar displaying avatar, role, verification status, consultation details, session duration, and meeting location.
  - Interactive monthly calendar for selecting available dates.
  - Dynamic time-slot selection panel with live `12h` / `24h` format toggling and timezone conversion.
  - Booking confirmation and success views with formatted date, time range, and timezone summaries.
- **Dashboard & Settings Management:**
  - Responsive dashboard sidebar with desktop and mobile drawer navigation.
  - Settings page (`/dashboard/settings`) for updating host profile details, event title/description, default timezone, time format (`12h` / `24h`), and profile avatar.
- **Local State Persistence & Sync:**
  - Centralized client-side store (`app/lib/calendo-store.ts`) backed by `localStorage`.
  - Reactive updates across components using a custom event (`calendo:state-updated`) and `storage` event listeners.
  - Avatar upload support converted to Data URL (`Base64`) with a local `/avatar.svg` fallback.
  - Hydration-safe initialization (`DEFAULT_CALENDO_STATE` and `/avatar.svg` on initial render, synced after mount via `useEffect`) to prevent SSR/client hydration mismatches in Next.js.

---

## Tech Stack

- **Framework:** Next.js (App Router & Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS with CSS custom properties (`--color-*`)
- **Animations:** Framer Motion
- **Icons:** Lucide React

---

## Project Structure

```text
calendo/
├── app/
│   ├── components/
│   │   ├── booking/
│   │   │   ├── BookingCalendar.tsx
│   │   │   ├── BookingConfirmationForm.tsx
│   │   │   ├── BookingConfirmationView.tsx
│   │   │   ├── BookingSuccessView.tsx
│   │   │   ├── BookingSummarySidebar.tsx
│   │   │   ├── HostSidebar.tsx
│   │   │   ├── PublicBookingView.tsx
│   │   │   └── TimeSlotsPanel.tsx
│   │   ├── dashboard/
│   │   │   └── DashboardSidebar.tsx
│   │   └── shared/
│   │       └── HostAvatar.tsx
│   ├── dashboard/
│   │   ├── availability/
│   │   ├── event-types/
│   │   └── settings/
│   │       └── page.tsx
│   ├── lib/
│   │   ├── calendo-store.ts
│   │   └── scheduling.ts
│   └── types/
│       └── booking.ts
├── public/
│   └── avatar.svg
├── .gitignore
├── package.json
└── tsconfig.json
