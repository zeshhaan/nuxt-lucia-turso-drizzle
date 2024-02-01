import type { Config } from "drizzle-kit";

export default {
  schema: "server/database/schema.ts",
  driver: "turso",
  out: "server/database/migrations",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
    authToken: process.env.DATABASE_AUTH_TOKEN,
  },
  introspect: {
    casing: "preserve",
  },
} satisfies Config;
