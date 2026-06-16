import { getEmbedding } from "@/app/api/ai/embeddings";
import { resumeEmbeddingRepository } from "@/lib/repositories/resume-embedding.repository";
import type { ResumeEmbeddingRecord } from "@/lib/repositories/resume-embedding.repository";

export const resumeEmbeddingService = {
  async generateAndStore(
    userId: string,
    text: string
  ): Promise<ResumeEmbeddingRecord> {
    const embedding = await getEmbedding(text);
    return resumeEmbeddingRepository.upsert(userId, embedding);
  },

  async getByUserId(userId: string): Promise<ResumeEmbeddingRecord | null> {
    return resumeEmbeddingRepository.findByUserId(userId);
  },
};
