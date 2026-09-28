# Nurdivle Portfolio

A Turkish/English portfolio built with Next.js, TypeScript, Tailwind CSS, Payload CMS, and PostgreSQL.

## Features

- Sticky desktop identity/navigation column with independently scrolling content
- Localized routes and CMS-managed anchors such as `/tr#projeler` and `/en#projects`
- CMS-managed section labels, order, visibility, and content
- CMS-managed skill groups based on the supplied card reference
- Draft/version support through Payload
- Responsive, reduced-motion-aware visual system without decorative borders
- Automated WCAG 2.x AA checks for both public locales
- Search metadata, sitemap, crawler rules, social sharing image, and structured data
- Security headers and restricted CMS origins

The full product and design specification is in [PORTFOLIO_DESIGN_DOCUMENT.md](./PORTFOLIO_DESIGN_DOCUMENT.md).

## Local setup

Requirements: Node.js 20.9+, pnpm, and Docker.

```bash
pnpm install
docker compose up -d postgres
pnpm seed
pnpm dev
```

Open:

- Turkish site: `http://localhost:3000/tr`
- English site: `http://localhost:3000/en`
- Admin panel: `http://localhost:3000/admin`

Payload will ask you to create the first administrator account the first time `/admin` is opened.

## Useful commands

```bash
pnpm dev
pnpm build
pnpm lint
pnpm generate:types
pnpm migrate:create <migration-name>
pnpm migrations:compact
pnpm migrate
pnpm migrate:status
pnpm check:lines
pnpm seed
pnpm test:int
pnpm test:e2e
```

`pnpm seed` is idempotent for sections and skill groups. It updates the starter Turkish/English records without creating duplicates.

`pnpm test:e2e` also runs axe checks against `/tr` and `/en`. The build fails when a critical or serious WCAG 2.x A/AA violation is detected.

## Content model

- `Sections`: localized label, anchor, legacy anchors, type, order, visibility
- `Profile`: identity, about copy, social links, résumé
- `Experiences`
- `Projects`
- `Skill Groups`
- `Education`
- `Hobbies`
- `Site Settings`

The public site only reads published records. The starter UI remains available as a safe fallback when the database is unavailable or has not been seeded.

## Production checklist

- Set the Neon pooled connection string as `DATABASE_URL`. On Vercel, keep `DATABASE_POOL_MAX=2`; Payload needs a second connection for administrative and migration operations.
- Set `PAYLOAD_SECRET`, `SITE_URL`, `SITE_NAME`, and `ALLOWED_ORIGINS`.
- Set a separate, random `PREVIEW_SECRET` of at least 32 characters to enable draft preview in production.
- After creating a migration, run `pnpm migrations:compact`. Run production migrations with Neon's unpooled connection string and `DATABASE_POOL_MAX=2` before starting a new release.
- Create a Neon Object Storage bucket and map its S3-compatible credentials to `S3_BUCKET`, `S3_ENDPOINT`, `S3_REGION`, `S3_ACCESS_KEY_ID`, and `S3_SECRET_ACCESS_KEY`. The adapter stays disabled locally when these variables are empty.
- Keep `S3_FORCE_PATH_STYLE=true` for Neon. Set `S3_CLIENT_UPLOADS=true` only after allowing browser `PUT` requests and the `If-None-Match` header in the bucket CORS policy.
- Configure `RESEND_API_KEY`, `RESEND_FROM_ADDRESS`, and `RESEND_FROM_NAME` before relying on password recovery.
- Back up PostgreSQL and uploaded media together.
- Run lint, type checking, tests, the line-limit check, and a production build before deployment.

Published portfolio reads are cached for one hour and invalidated after CMS writes. This reduces Neon compute wake-ups while keeping newly published content visible immediately.

The included `compose.production.yml` remains available for a single-server deployment. Vercel deployments should use Neon PostgreSQL and Neon Object Storage because Vercel's filesystem is ephemeral.

## Email

The Payload password-reset flow uses the official Resend adapter when `RESEND_API_KEY` is set. Verify `nurdivle.com` in Resend, publish the provided SPF and DKIM records in the authoritative DNS provider, and use `noreply@nurdivle.com` as `RESEND_FROM_ADDRESS`. Keep the API key in the deployment environment only; never commit it to Git.

## Health check

`GET /api/health` verifies that the application can query PostgreSQL. It returns `200` when healthy and `503` without exposing internal error details when the database is unavailable.

## Draft preview

The CMS Live Preview button opens the active Turkish or English document in Next.js Draft Mode. The preview endpoint requires both a valid administrator session and `PREVIEW_SECRET`. Production preview remains disabled when that secret is missing or shorter than 32 characters. Draft pages are marked `noindex`, and the on-page banner provides an explicit exit action.
