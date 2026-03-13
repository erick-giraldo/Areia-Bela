# API Documentation (Phase 5+)

The backend is a **NestJS** REST API in `apps/api`. Endpoints will be documented here as modules are implemented.

## Base URL

- Local: `http://localhost:3001`
- Production: TBD (e.g. `https://api.yourdomain.com`)

## Planned modules and endpoints

| Module | Prefix | Description |
|--------|--------|-------------|
| Auth | `/auth` | Login, register, refresh, OAuth (Google, Microsoft) |
| Users | `/users` | Profile, update, avatar |
| Properties | `/properties` | CRUD for host properties |
| Rooms | `/rooms` | CRUD, availability, images, amenities |
| Reservations | `/reservations` | Create, list, cancel, get by id |
| Payments | `/payments` | Payment intents, confirm, methods |
| Reviews | `/reviews` | Create, list by room, host response |
| Availability | `/availability` | Get/set availability, blocked dates |
| Coupons | `/coupons` | Validate, list (admin) |
| Channel Manager | `/channels` | Connect, sync, channel reservations |
| Email | `/email` | Triggers (confirmation, reminders, etc.) |
| Finance | `/finance` | Reports, revenue, export CSV/Excel/PDF |
| Check-in | `/checkin` | Guest check-in flow, identity, status |
| AI Recommendation | `/ai/recommendations` | Suggested rooms, offers |
| AI Pricing | `/ai/pricing` | Dynamic pricing suggestions |
| Chat | `/chat` | Guest–host messaging, support |

## Auth (Phase 6)

- `POST /auth/register` — Email/password registration.
- `POST /auth/login` — Email/password login (returns access + refresh tokens).
- `POST /auth/refresh` — Refresh access token.
- `GET /auth/google` — Redirect to Google OAuth.
- `GET /auth/google/callback` — Google OAuth callback.
- `GET /auth/microsoft` — Redirect to Microsoft OAuth.
- `GET /auth/microsoft/callback` — Microsoft OAuth callback.

All protected routes use `Authorization: Bearer <access_token>`.

## OpenAPI / Swagger

Swagger will be added to the NestJS app for interactive API docs at `/api/docs`.
