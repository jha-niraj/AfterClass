# AfterClass Main App

Main Next.js application for AfterClass.

AfterClass is a campus-focused platform for live student rooms, social discovery, and study collaboration.

## Features

- OTP-backed email authentication flow
- Existing verified-user direct sign-in path
- New/unverified user verification flow
- Onboarding form for student profile completion
- Main navigation with Home and Spaces
- Shared design system components from the monorepo UI package
- Dark/light theming support

## Local Development

1. Install dependencies at repo root:

```bash
pnpm install
```

2. Set env variables using the template below.

3. From repo root, prepare database client/schema:

```bash
pnpm --filter @repo/prisma db:generate
pnpm --filter @repo/prisma db:push
```

4. Start this app:

```bash
pnpm --filter main dev
```

The app runs at `http://localhost:3000`.

## Environment Variables Example

Create your app `.env` with placeholder values like this:

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

1. Create a branch from `main` for your feature/fix.
2. Keep auth, UI, and DB changes scoped and documented.
3. Validate before PR:

```bash
pnpm lint
pnpm build
```

4. If schema changes are included, document how reviewers should sync DB.
5. Open a PR with screenshots for UI changes and test notes for behavior changes.

## Security Note

Never commit real credentials or API keys. Use placeholders in docs and examples.
