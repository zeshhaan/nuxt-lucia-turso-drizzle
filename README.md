# Nuxt 3 + Lucia Auth + Drizzle ORM + Turso

A barebone full-stack Nuxt 3 starter template with Authentication, and SQLite DB for your next SaaS app.

## Uses

[Nuxt 3](https://nuxt.com/docs/getting-started/introduction)

[Lucia Auth v2](https://lucia-auth.com/reference/lucia/interfaces/auth/)

[Drizzle ORM](orm.drizzle.team)

[Turso](https://turso.tech)

## Setup

Make sure to install the dependencies:

```bash
pnpm install
```

### Copy the .env.example file

```bash
cp .env.example .env
```

Setup turso and fill in the turso db credentials

### Update the scheme

Update the schema to fit your needs in [database/schema.ts](server/database/schema.ts) folder

### Push migration

```bash
pnpm run db:push
```

### Run migration

```bash
pnpm run db:migrate
```

### Open the database GUI

```bash
pnpm run db:studio
```

which will run drizzle kit studio

### Development Server

```bash
pnpm run dev
```
