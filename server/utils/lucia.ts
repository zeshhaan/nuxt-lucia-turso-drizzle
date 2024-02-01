import { lucia } from "lucia";
import { h3 } from "lucia/middleware";
import { libsql } from "@lucia-auth/adapter-sqlite";
import { database } from "./db";

export const auth = lucia({
  middleware: h3(),
  env: import.meta.dev ? "DEV" : "PROD",
  adapter: libsql(database, {
    user: "user",
    key: "user_key",
    session: "user_session",
  }),
  csrfProtection: false,
  experimental: {
    debugMode: true,
  },
  getUserAttributes: (data) => {
    return {
      email: data.email,
      emailVerified: Boolean(data.email_verified),
    };
  },
});

export type Auth = typeof auth;
