# Investment Tools Hub — Frontend

Frontend for the investment learning and simulation platform. Built with Next.js, TypeScript, and Tailwind CSS.

## Quick start

From repository root:

```bash
cd frontend
npm ci
npm run dev        # start development server
```

Build and test:

```bash
cd frontend
npm run build      # build for production
npm test           # run unit tests
npm run e2e        # run E2E tests (Playwright)
npm run validate   # typecheck + lint
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run validate` - Type checking and linting
- `npm run validate:all` - Comprehensive validation
- `npm run health-check` - Application health check
- `npm test` - Unit tests
- `npm run e2e` - E2E tests (Playwright)

## Environment variables

Copy `.env.example` to `.env.local` and configure.

## Documentation

See the root README.md for high-level project information.

## Deployment

Deployed to Vercel with automatic GitHub integration.