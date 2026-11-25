# Calendo — Scheduling & Booking (Front-end Prototype)

A Calendly-style scheduling app built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS v4**, and **Framer Motion**.

> **Status:** front-end prototype. There is no backend or database yet.
> Only the host profile (name, avatar, timezone, time format…) is persisted, in the browser's `localStorage`.
> Event types, availability, and the bookings table use mock data and reset on refresh.

## Features

- **Public booking flow:** host profile, monthly calendar, time slots, confirmation form, success page, and "Add to Google Calendar" link.
- **Time zones:** slots are defined in Asia/Gaza and converted with `Intl.DateTimeFormat`, so daylight saving time is handled per date. 12h / 24h toggle.
- **Dashboard:** event types, weekly availability, upcoming bookings, and a settings page (profile, avatar upload, timezone, time format).
- **Shared profile store:** `app/lib/calendo-store.ts` + the `useCalendoState` hook keep all pages in sync through a custom event and the `storage` event.

## Routes

| Route | Purpose |
|---|---|
| `/` | Public booking page |
| `/booking-confirmation` | Guest details form (requires valid `date`, `slotId`, `tz` query params) |
| `/booking-success` | Confirmation + add to calendar |
| `/dashboard/event-types` | Event types (mock data) |
| `/dashboard/availability` | Weekly availability + bookings (mock data) |
| `/dashboard/settings` | Host profile & preferences (persisted locally) |

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Project structure

```text
app/
├── page.tsx, booking-confirmation/, booking-success/   # public routes
├── dashboard/            # layout.tsx holds the sidebar; event-types, availability, settings
├── components/
│   ├── booking/          # calendar, time slots, confirmation, success views
│   ├── dashboard/        # sidebar, event type cards, availability, bookings table
│   └── shared/           # HostAvatar
├── lib/
│   ├── calendo-store.ts  # localStorage-backed profile store + useCalendoState
│   ├── scheduling.ts     # calendar and time zone helpers
│   ├── googleCalendar.ts # builds the Google Calendar link
│   └── *Data.ts          # mock data
└── types/                # shared TypeScript types
```

The `@/` import alias points to the `app/` folder (see `tsconfig.json`).

## Known limitations

- Bookings are not stored; guest details travel through URL query params.
- Availability and event types do not affect the public booking page yet.
- No authentication.

## Roadmap

- PostgreSQL + ORM for hosts, event types, availability, and bookings
- Authentication and per-host public pages
- Server-side validation (Zod) and email notifications
- Tests