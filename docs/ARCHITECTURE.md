# Hospitality Platform — Architecture Overview

## Monorepo Structure

```
/
├── apps/
│   ├── web/          # Next.js 16 frontend (guest + host booking, public site)
│   ├── api/          # NestJS backend API (REST, auth, business logic)
│   └── mobile/       # React Native app (future)
├── packages/
│   ├── types/        # Shared TypeScript types (Room, Reservation, User, etc.)
│   ├── database/     # PostgreSQL schema, migrations
│   ├── config/       # Shared config and env
│   └── ai-services/  # AI pricing, recommendations, chat
└── docs/             # Architecture, API, deployment
```

## High-Level Flow

- **Guests** use **apps/web** (or future mobile) to search, book, pay, and check in.
- **Hosts/Staff** use **apps/web** admin routes for calendar, reservations, channels, finance.
- **apps/api** serves REST APIs for auth, properties, rooms, reservations, payments, channel manager, emails, finance, check-in, AI, and chat.
- **packages/types** is shared by web, api, and mobile.
- **packages/database** holds the single source of truth for PostgreSQL (schema and migrations).

## Tech Stack

| Layer     | Technology |
|----------|------------|
| Frontend  | Next.js 16, React 19, Tailwind, shadcn/ui |
| Backend  | NestJS, TypeORM, PostgreSQL |
| Auth     | JWT + refresh tokens, Google/Microsoft OAuth (planned) |
| Storage  | PostgreSQL (RDS), S3 for assets (planned) |
| Deploy   | Vercel/CloudFront (web), ECS (api), RDS (DB) — see DEPLOYMENT.md |

## Database Schema (Phase 4)

Core tables: `users`, `hosts`, `co_hosts`, `properties`, `rooms`, `room_images`, `amenities`, `availability`, `blocked_dates`, `reservations`, `reservation_guests`, `payments`, `payment_methods`, `reviews`, `coupons`, `pricing_rules`, `seasonal_prices`, `transactions`, `financial_reports`, `email_logs`, `checkins`, `channels`, `channel_reservations`, `sync_logs`.

See `packages/database/schema/001_initial.sql`.

## API Modules (Phase 5)

- **AuthModule** — Email/password, Google/Microsoft OAuth, JWT + refresh.
- **UsersModule**, **PropertiesModule**, **RoomsModule**, **ReservationsModule**, **PaymentsModule**, **ReviewsModule**, **AvailabilityModule**, **CouponsModule**, **ChannelManagerModule**, **EmailModule**, **FinanceModule**, **CheckinModule**, **AIRecommendationModule**, **AIPricingModule**, **ChatModule**.

Modules follow NestJS clean architecture (controller → service → repository/entity).

## Running the Project

- From repo root:
  - `npm install`
  - `npm run dev` — starts **apps/web** (Next.js) on port 3000.
  - `npm run dev:api` — starts **apps/api** (NestJS) on port 3001 (after `cd apps/api && npm install`).
- Web app only (no API yet): `cd apps/web && npm install && npm run dev`.
