# Dev Snippet Manager

A small App Router side project for practicing:

- GitHub OAuth with Auth.js v5
- database-backed session management
- protected routes
- server-side authorization
- user-owned snippet CRUD
- Drizzle ORM + PostgreSQL
- Zod server-side validation

## Getting Started

1. Copy environment variables:

```bash
cp .env.example .env
```

2. Start PostgreSQL:

```bash
docker compose up -d
```

3. Run migrations:

```bash
pnpm db:generate
pnpm db:migrate
```

4. Start the development server:

```bash
pnpm dev
```

Or use the Makefile helpers:

```bash
make help
make start
make stop
ENV_FILE=.env.production make db-migrate
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

Required values:

```bash
AUTH_SECRET=
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=
DATABASE_URL=postgres://postgres:postgres@localhost:5432/local
DIRECT_DATABASE_URL=
```

Notes:

- `DATABASE_URL` is the runtime connection string used by the app.
- `DIRECT_DATABASE_URL` is optional and is used by Drizzle tooling when you want migrations or Studio to connect through a direct database URL instead of the runtime URL.
- For local development, using only `DATABASE_URL` is fine.
- For Vercel + Supabase, prefer:
  - `DATABASE_URL` = Supabase pooler / transaction connection string for the deployed app
  - `DIRECT_DATABASE_URL` = Supabase direct Postgres connection string for Drizzle migrations and admin tooling

## Useful Commands

```bash
make help
make start
make stop
make db-migrate
make db-studio
ENV_FILE=.env.production make db-migrate
ENV_FILE=.env.production make db-studio
pnpm lint
pnpm build
pnpm db:generate
pnpm db:migrate
pnpm db:studio
```

`make stop` will stop the app process, stop Drizzle Studio, and run `docker compose down -v`.

Makefile env behavior:

- Default: `make <target>` uses `.env`
- Override: `ENV_FILE=.env.production make <target>` uses `.env.production`
- When `ENV_FILE=.env`, DB targets will bootstrap the local Docker PostgreSQL service
- When `ENV_FILE` is a non-local file such as `.env.production`, DB targets skip local Docker startup and use the connection string from that env file

## Deployment Notes

Target deployment:

- App: Vercel
- Database: Supabase Postgres

Recommended production setup:

1. Keep the application code Postgres-provider agnostic.
2. Use `DATABASE_URL` for the Vercel runtime connection.
3. Use `DIRECT_DATABASE_URL` for Drizzle migrations if the provider offers a separate direct connection.
4. Keep `prepare: false` in the Postgres client for compatibility with pooled/serverless connection patterns.
5. Continue treating Auth.js, Zod validation, and ownership checks as server-side concerns.

Suggested Vercel environment variables:

```bash
AUTH_SECRET=
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=
DATABASE_URL=<supabase-pooler-url>
DIRECT_DATABASE_URL=<supabase-direct-url>
```

Suggested deploy flow:

1. Create the Supabase project and obtain both connection strings.
2. Set the Vercel environment variables.
3. Run Drizzle migrations against `DIRECT_DATABASE_URL`.
4. Deploy the app to Vercel.
5. Verify GitHub login, protected dashboard access, snippet CRUD, and ownership behavior in production.

## Current Scope

Included in MVP:

- GitHub login/logout
- protected dashboard
- user-owned snippets
- create, edit, delete flows
- server-side ownership checks
- database-backed sessions

Deferred:

- tags
- search
- admin
- sharing
