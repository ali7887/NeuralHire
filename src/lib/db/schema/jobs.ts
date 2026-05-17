import {
  pgTable,
  text,
  varchar,
  integer,
  boolean,
  uuid,
  timestamp,
  pgEnum,
  index,
  jsonb
} from "drizzle-orm/pg-core";

import { companies } from "./companies";
import { users } from "./users";

/* =======================
   ENUMS
======================= */

export const jobLevelEnum = pgEnum("job_level", [
  "intern",
  "junior",
  "mid",
  "senior",
  "lead",
]);

export const jobStatusEnum = pgEnum("job_status", [
  "draft",
  "open",
  "closed",
  "archived",
]);

/* =======================
   JOBS TABLE
======================= */

export const jobs = pgTable(
  "jobs",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    title: varchar("title", { length: 255 }).notNull(),

    description: text("description"),

    location: varchar("location", { length: 255 }),

    salary: integer("salary"),

    isRemote: boolean("is_remote").default(false),

    type: varchar("type", { length: 50 }),

    level: jobLevelEnum("level"),

    embedding: jsonb("embedding")
  .$type<number[] | null>()
  .default(null),


    companyId: uuid("company_id").references(() => companies.id),

    employerId: uuid("employer_id").references(() => users.id),

    isActive: boolean("is_active").default(true),

    published: boolean("published").default(false),

    status: jobStatusEnum("status").default("open").notNull(),

    createdAt: timestamp("created_at").defaultNow(),

    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => ({
    statusIdx: index("jobs_status_idx").on(table.status),
    companyIdx: index("jobs_company_idx").on(table.companyId),
    createdIdx: index("jobs_created_idx").on(table.createdAt),
    employerIdx: index("jobs_employer_idx").on(table.employerId),
  })
);

/* =======================
   TYPES
======================= */

export type Job = typeof jobs.$inferSelect;
export type NewJob = typeof jobs.$inferInsert;

export type JobStatus =
  (typeof jobStatusEnum.enumValues)[number];
