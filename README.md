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
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

Required values:

```bash
AUTH_SECRET=
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=
DATABASE_URL=postgres://postgres:postgres@localhost:5432/dev_snippet
```

## Useful Commands

```bash
make help
make start
make stop
make db-migrate
make db-studio
pnpm lint
pnpm build
pnpm db:generate
pnpm db:migrate
pnpm db:studio
```

`make stop` will stop the app process, stop Drizzle Studio, and run `docker compose down -v`.

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
