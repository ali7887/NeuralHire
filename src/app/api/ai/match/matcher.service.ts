import { getEmbedding, cosineSimilarity } from "@/app/api/ai/embeddings";
import type { MatchableJob, MatchResult } from "./matcher.types";

export class MatcherService {
  async findMatchingJobs(
    skills: string[],
    jobList: MatchableJob[],
    limit = 5
  ): Promise<MatchResult[]> {

    if (!skills.length || jobList.length === 0) {
      return [];
    }

    const queryText = skills.join(" ");
    const queryEmbedding = await getEmbedding(queryText);

    const scored = await Promise.all(
      jobList.map(async (job) => {

        const jobText = `${job.title ?? ""} ${job.description ?? ""}`;

        const jobEmbedding = await getEmbedding(jobText);

        const similarity = cosineSimilarity(queryEmbedding, jobEmbedding);

        return {
          jobId: job.id,
          jobTitle: job.title ?? "",
          score: Math.round(similarity * 100),
          reasons: [],
          missingSkills: [],
        };
      })
    );

    const sorted = scored
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);

    return sorted;
  }
}

export const matcherService = new MatcherService();
