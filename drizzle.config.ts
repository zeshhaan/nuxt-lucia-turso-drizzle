import type { Config } from "drizzle-kit";

export default {
  schema: "server/database/schema.ts",
  driver: "turso",
  out: "server/database/migrations",
  dbCredentials: {
    url: import.meta.env.DATABASE_URL!,
    authToken: import.meta.env.DATABASE_AUTH_TOKEN,
  },
  introspect: {
    casing: "preserve",
  },
} satisfies Config;
