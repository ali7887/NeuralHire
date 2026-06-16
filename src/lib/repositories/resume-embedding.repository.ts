import { db } from "@/lib/db/db";
import { resume_embeddings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import type { ResumeEmbedding } from "@/lib/db/schema/resume_embeddings";

export type ResumeEmbeddingRecord = Omit<ResumeEmbedding, "embedding"> & {
  embedding: number[];
};

export const resumeEmbeddingRepository = {
  async upsert(
    userId: string,
    embedding: number[]
  ): Promise<ResumeEmbeddingRecord> {
    const embeddingString = JSON.stringify(embedding);

    const existing = await db
      .select()
      .from(resume_embeddings)
      .where(eq(resume_embeddings.userId, userId))
      .limit(1);

    if (existing.length > 0) {
      const updated = await db
        .update(resume_embeddings)
        .set({ embedding: embeddingString, updatedAt: new Date() })
        .where(eq(resume_embeddings.userId, userId))
        .returning();

      return { ...updated[0], embedding: JSON.parse(updated[0].embedding) };
    }

    const inserted = await db
      .insert(resume_embeddings)
      .values({ userId, embedding: embeddingString })
      .returning();

    return { ...inserted[0], embedding: JSON.parse(inserted[0].embedding) };
  },

  async findByUserId(userId: string): Promise<ResumeEmbeddingRecord | null> {
    const res = await db
      .select()
      .from(resume_embeddings)
      .where(eq(resume_embeddings.userId, userId))
      .limit(1);

    if (!res[0]) return null;

    return { ...res[0], embedding: JSON.parse(res[0].embedding) };
  },
};
