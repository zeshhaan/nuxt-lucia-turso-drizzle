import { orm as db } from "./db";
import { sql } from "drizzle-orm";
import { generateRandomString, isWithinExpiration } from "lucia/utils";
import {
  email_verification_token,
  password_reset_token,
} from "../database/schema";

const EXPIRES_IN = 1000 * 60 * 60 * 2; // 2 hours

export const generateEmailVerificationToken = async (userId: number) => {
  const storedUserTokens = await db
    .select()
    .from(email_verification_token)
    .where(sql`user_id = ${userId}`)
    .execute();
  if (storedUserTokens.length > 0) {
    const reusableStoredToken = storedUserTokens.find((token) => {
      // check if expiration is within 1 hour
      // and reuse token if true
      return isWithinExpiration(Number(token.expires) - EXPIRES_IN / 2);
    });
    if (reusableStoredToken) return reusableStoredToken.id;
  }

  const token = generateRandomString(32);
  await db
    .insert(email_verification_token)
    .values({
      id: token,
      expires: new Date().getTime() + EXPIRES_IN,
      user_id: userId,
    })
    .returning()
    .then((s) => s[0]);

  return token;
};

export const validateEmailVerificationToken = async (token: string) => {
  const storedToken = await db.transaction(async (trx) => {
    const storedToken = await trx
      .select()
      .from(email_verification_token)
      .where(sql`id = ${token}`)
      .limit(1)
      .then((r) => r.at(0));
    if (!storedToken) throw new Error("Invalid token");
    await trx
      .delete(email_verification_token)
      .where(sql`user_id = ${storedToken.user_id}`)
      .returning()
      .then((s) => s[0]);
    return storedToken;
  });
  const tokenExpires = Number(storedToken.expires);
  if (!isWithinExpiration(tokenExpires)) {
    throw new Error("Token expired");
  }
  return storedToken.user_id;
};

export const generatePasswordResetToken = async (userId: number) => {
  const storedUserTokens = await db
    .select()
    .from(password_reset_token)
    .where(sql`user_id = ${userId}`)
    .execute();
  if (storedUserTokens.length > 0) {
    const reusableStoredToken = storedUserTokens.find((token) => {
      // check if expiration is within 1 hour
      // and reuse token if true
      return isWithinExpiration(Number(token.expires) - EXPIRES_IN / 2);
    });
    if (reusableStoredToken) return reusableStoredToken.id;
  }
  const token = generateRandomString(32);
  await db
    .insert(password_reset_token)
    .values({
      id: token,
      user_id: userId,
      expires: Date.now() + EXPIRES_IN,
    })
    .returning()
    .then((s) => s[0]);
  return token;
};

export const validatePasswordResetToken = async (token: string) => {
  const storedToken = await db.transaction(async (trx) => {
    const storedToken = await trx
      .select()
      .from(password_reset_token)
      .where(sql`id = ${token}`)
      .limit(1)
      .then((r) => r.at(0));
    if (!storedToken) throw new Error("Invalid token");
    await trx
      .delete(password_reset_token)
      .where(sql`id = ${token}`)
      .returning()
      .then((s) => s[0]);
    return storedToken;
  });
  const tokenExpires = Number(storedToken.expires);
  if (!isWithinExpiration(tokenExpires)) {
    throw new Error("Token expired");
  }
  return storedToken.user_id;
};

export const isValidPasswordResetToken = async (token: string) => {
  const storedToken = await db
    .select()
    .from(password_reset_token)
    .where(sql`id = ${token}`)
    .limit(1)
    .then((r) => r.at(0));
  if (!storedToken) return false;
  const tokenExpires = Number(storedToken.expires);
  if (!isWithinExpiration(tokenExpires)) {
    return false;
  }
  return true;
};
