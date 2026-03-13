# Deployment (Phase 15 — DevOps & Cloud)

## Target Architecture

| Component   | Target              | Notes                    |
|------------|---------------------|---------------------------|
| Frontend   | Vercel or CloudFront| Next.js from `apps/web`   |
| Backend API| AWS ECS             | NestJS from `apps/api`    |
| Database   | AWS RDS PostgreSQL  | Schema in `packages/database` |
| Storage    | AWS S3              | Images, documents         |
| CDN        | CloudFront          | Static assets + API proxy |

## Docker

- **apps/web**: Dockerfile for Next.js (standalone output).
- **apps/api**: Dockerfile for NestJS (node dist/main).
- Optional: `docker-compose.yml` for local API + DB + web.

## Environment Variables

- **Web**: `NEXT_PUBLIC_API_URL`, feature flags, analytics.
- **API**: `DATABASE_URL`, `JWT_SECRET`, `REFRESH_SECRET`, `GOOGLE_CLIENT_ID`, `MICROSOFT_CLIENT_ID`, `CORS_ORIGIN`, etc.

## CI/CD (recommended)

- Build and test on push/PR.
- Deploy web to Vercel (or S3 + CloudFront).
- Build API image and deploy to ECS (e.g. from `apps/api`).
