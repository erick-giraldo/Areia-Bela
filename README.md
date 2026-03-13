# Hospitality Platform

SaaS hospitality platform combining **Airbnb/Booking.com-style** guest experience with a **professional hotel PMS**: reservations, channel manager, calendar, pricing, check-in, finance, and AI features.

## Monorepo structure

```
apps/
  web/     → Next.js 16 (guest site + admin dashboard)
  api/     → NestJS API (auth, properties, reservations, payments, channels, etc.)
  mobile/  → (future) React Native
packages/
  types/     → Shared TypeScript types
  database/  → PostgreSQL schema & migrations
  config/    → Shared configuration
  ai-services/ → AI pricing, recommendations, chat
```

## Quick start

### Run the web app (current default)

From **repository root**:

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000). The app runs from `apps/web` (Next.js).

### Run from `apps/web` only

```bash
cd apps/web
npm install
npm run dev
```

### Run the API (NestJS)

After implementing backend modules:

```bash
cd apps/api
npm install
npm run start:dev
```

API will be at [http://localhost:3001](http://localhost:3001).

## Scripts (from root)

| Script        | Description                |
|---------------|----------------------------|
| `npm run dev` | Start Next.js (apps/web)   |
| `npm run dev:web` | Same as above          |
| `npm run dev:api` | Start NestJS API       |
| `npm run build`   | Build all workspaces   |
| `npm run build:web` | Build web app        |
| `npm run build:api` | Build API            |

## Documentation

- [Architecture](docs/ARCHITECTURE.md) — Overview, stack, schema, API modules.
- [Deployment](docs/DEPLOYMENT.md) — AWS, Docker, CI/CD.

## Roadmap (phases)

1. **Repository audit & monorepo** — Done (cleanup, structure, packages).
2. **Frontend UX/UI** — Responsive, design system, booking flow, mobile menu.
3. **Advanced calendar** — Date range, availability, seasonal pricing preview.
4. **Database** — PostgreSQL schema in `packages/database/schema/`.
5. **Backend API** — NestJS modules (Auth, Properties, Reservations, etc.).
6–18. Auth (JWT + OAuth), Channel Manager, Check-in, Email, Finance, AI Pricing, Recommendations, Chat, Mobile prep, DevOps, Performance, Admin dashboard, Docs.

## Tech stack

- **Frontend**: Next.js 16, React 19, Tailwind CSS, shadcn/ui.
- **Backend**: NestJS, TypeORM, PostgreSQL (planned).
- **Auth**: JWT + refresh tokens; Google/Microsoft OAuth (planned).
