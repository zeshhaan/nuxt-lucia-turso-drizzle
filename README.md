# Uses

[Nuxt 3](https://nuxt.com/docs/getting-started/introduction)

[Lucia Auth](https://lucia-auth.com/reference/lucia/interfaces/auth/)

[Drizzle ORM](orm.drizzle.team)

[Turso](https://turso.tech)

## Setup

Make sure to install the dependencies:

```bash
pnpm install
```

## Copy the .env.example file

```bash
cp .env.example .env
```

Setup turso and fill in the turso db credentials

## Update the scheme

Update the schema to fit your needs in [database/schema.ts](server/database/schema.ts) folder

## Run migration

```bash
pnpm run db:migrate
```

## Push migration

```bash
pnpm run db:push
```

## Open the database GUI

```bash
pnpm run db:studio
```

which will run drizzle kit studio

## Development Server

```bash
pnpm run dev
```

Make changes and watch the magic happen
