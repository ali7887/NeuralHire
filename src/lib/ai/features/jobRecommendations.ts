import { db } from "@/lib/db/db";
import { jobs as jobsTable, job_embeddings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { generateEmbedding } from "../embeddings/generateEmbedding";
import { cosineSimilarity } from "../embeddings/cosineSimilarity";

type JobInput = {
  id: string;
  title: string;
  description: string;
};

type JobWithScore = JobInput & {
  score: number;
};

export async function recommendJobsForCandidate(
  resumeText: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  jobList: JobInput[]
): Promise<JobWithScore[]> {

  const userEmbedding = await generateEmbedding(resumeText);

  const rows = await db
    .select({
      id: jobsTable.id,
      title: jobsTable.title,
      description: jobsTable.description,
      embedding: job_embeddings.embedding,
    })
    .from(jobsTable)
    .leftJoin(job_embeddings, eq(job_embeddings.jobId, jobsTable.id));

  const valid = rows.filter((r) => r.embedding);

  const scored: JobWithScore[] = valid.map((r) => {
    const vector = JSON.parse(r.embedding as string);

    return {
      id: r.id,
      title: r.title ?? "",
      description: r.description ?? "",
      score: cosineSimilarity(userEmbedding, vector),
    };
  });

  return scored.sort((a, b) => b.score - a.score);
}
