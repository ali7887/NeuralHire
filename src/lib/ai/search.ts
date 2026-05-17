import { generateEmbedding } from "./embeddings/generateEmbedding"
import { getJobs } from "@/lib/mockJobs"
import type { Job } from "@/lib/types/job.types"

/* =========================================
   Cosine Similarity
========================================= */

function cosineSimilarity(a: number[], b: number[]) {

  if (a.length !== b.length) return 0

  let dot = 0
  let normA = 0
  let normB = 0

  for (let i = 0; i < a.length; i++) {

    dot += a[i] * b[i]

    normA += a[i] * a[i]

    normB += b[i] * b[i]
  }

  normA = Math.sqrt(normA)
  normB = Math.sqrt(normB)

  if (normA === 0 || normB === 0) return 0

  return dot / (normA * normB)
}

/* =========================================
   Semantic Job Search
========================================= */

export async function semanticJobSearch(
  query: string,
  topK: number = 5
) {

  const queryEmbedding = await generateEmbedding(query)

  const jobs = getJobs()

  const results = jobs
    .filter((job) => job.embedding)
    .map((job) => {

      const similarity = cosineSimilarity(
        queryEmbedding,
        job.embedding as number[]
      )

      return {
        job,
        score: similarity
      }
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)

  return results
}
