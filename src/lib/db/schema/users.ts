import {
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const roleEnum = pgEnum(
  "user_role",
  [
    "admin",
    "employer",
    "job-seeker",
  ]
);

export const users = pgTable("users", {
  id: uuid("id")
    .defaultRandom()
    .primaryKey(),

  name: text("name"),

  email: text("email")
    .notNull()
    .unique(),

  passwordHash: text("password_hash")
    .notNull(),

  role: roleEnum("role")
    .default("job-seeker")
    .notNull(),

  emailVerifiedAt: timestamp(
    "email_verified_at",
    {
      withTimezone: true,
    }
  ),

  createdAt: timestamp(
    "created_at",
    {
      withTimezone: true,
    }
  ).defaultNow(),

  updatedAt: timestamp(
    "updated_at",
    {
      withTimezone: true,
    }
  ).defaultNow(),
});

export type User =
  typeof users.$inferSelect;

export type NewUser =
  typeof users.$inferInsert;

export type SafeUser =
  Omit<User, "passwordHash">;
