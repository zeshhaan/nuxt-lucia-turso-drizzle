import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

export const database = createClient({
  url: process.env.DATABASE_URL!,
  authToken: process.env.DATABASE_AUTH_TOKEN!,
});

export const orm = drizzle(database);
