# AfterClass

AfterClass is a campus-first social and study platform where students can discover live rooms, hang out after lectures, and stay connected with their college community.

This repository is a Turborepo monorepo with shared packages for auth, UI, Prisma, ESLint, and TypeScript configuration.

## Platform Features

- Email + password auth with OTP verification
- Existing verified-user sign-in flow without forcing OTP each time
- Onboarding flow for profile setup (name, college, semester, stream)
- Spaces discovery and room-based campus interactions
- Role-aware user model (user/admin)
- Shared UI component package for consistent design across apps
- Prisma + PostgreSQL data layer
- Image/media integration via Cloudinary

## Monorepo Structure

- apps/main: Main AfterClass app
- apps/admin: Admin app
- packages/auth: Shared NextAuth setup and auth utilities
- packages/prisma: Shared Prisma client and schema
- packages/ui: Shared component library
- packages/eslint-config: Shared linting rules
- packages/typescript-config: Shared TS configs

## Getting Started

1. Install dependencies:

```bash
pnpm install
```

2. Create env files from the example section below.

3. Generate Prisma client and sync schema:

```bash
pnpm --filter @repo/prisma db:generate
pnpm --filter @repo/prisma db:push
```

4. Start development:

```bash
pnpm dev
```

## Environment Variables Example

Create your own `.env` file and use the following template values.

```dotenv
DATABASE_URL="postgresql://<db_user>:<db_password>@<db_host>/<db_name>?sslmode=require&channel_binding=require"

NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="<your_nextauth_secret>"

RESEND_API_KEY="<your_resend_api_key>"

CLOUDINARY_CLOUD_NAME="<your_cloudinary_cloud_name>"
CLOUDINARY_API_KEY="<your_cloudinary_api_key>"
CLOUDINARY_API_SECRET="<your_cloudinary_api_secret>"
```

## Contributing

1. Fork the repository and create a feature branch.
2. Keep changes focused and scoped to one problem.
3. Run local checks before opening a PR:

```bash
pnpm lint
pnpm build
```

4. For DB changes, update Prisma schema and include migration/sync notes in your PR.
5. Open a PR with:
- A concise summary
- Screenshots or recordings for UI changes
- Testing notes

## Notes

- Never commit real API keys or production secrets.
- Prefer placeholders in examples and docs.
