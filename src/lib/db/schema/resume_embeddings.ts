import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";

export const resume_embeddings = pgTable("resume_embeddings", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  embedding: text("embedding").notNull(),

  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type ResumeEmbedding = typeof resume_embeddings.$inferSelect;
export type NewResumeEmbedding = typeof resume_embeddings.$inferInsert;
