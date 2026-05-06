// src/lib/db/schema/refresh_tokens.ts
import { pgTable, text, timestamp, boolean } from "drizzle-orm/pg-core";

export const refreshTokens = pgTable("refresh_tokens", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  tokenHash: text("token_hash").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  isRevoked: boolean("is_revoked").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  revokedAt: timestamp("revoked_at"),
  replacedByTokenId: text("replaced_by_token_id"),
});
