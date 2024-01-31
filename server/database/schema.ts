import { sqliteTable, text, integer, blob } from "drizzle-orm/sqlite-core";

export const user = sqliteTable("user", {
  id: text("id").primaryKey(),
  email: text("email").unique().notNull(),
  email_verified: integer("email_verified").notNull(),
});

export const user_key = sqliteTable("user_key", {
  id: text("id").primaryKey(),
  user_id: text("user_id")
    .references(() => user.id)
    .notNull(),
  hashed_password: text("hashed_password"),
});

export const user_session = sqliteTable("user_session", {
  id: text("id").primaryKey(),
  user_id: text("user_id")
    .notNull()
    .references(() => user.id),
  active_expires: blob("active_expires", {
    mode: "bigint",
  }).notNull(),
  idle_expires: blob("idle_expires", {
    mode: "bigint",
  }).notNull(),
});

export const email_verification_token = sqliteTable(
  "email_verification_token",
  {
    id: text("id").primaryKey(),
    user_id: text("user_id").notNull(),
    expires: blob("expires", {
      mode: "bigint",
    }).notNull(),
  }
);

export const password_reset_token = sqliteTable("password_reset_token", {
  id: text("id").primaryKey(),
  user_id: text("user_id").notNull(),
  expires: blob("expires", {
    mode: "bigint",
  }).notNull(),
});
