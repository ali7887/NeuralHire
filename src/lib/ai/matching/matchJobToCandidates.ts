import { generateEmbedding } from "../embeddings/generateEmbedding"
import { cosineSimilarity } from "../embeddings/cosineSimilarity"

export interface CandidateInput {
  id: string
  resume: string
}

export interface CandidateMatchResult {
  candidateId: string
  score: number
}

export async function matchJobToCandidates(
  jobDescription: string,
  candidates: CandidateInput[]
): Promise<CandidateMatchResult[]> {

  if (!jobDescription) {
    throw new Error("Job description is required")
  }

  if (!candidates || candidates.length === 0) {
    return []
  }

  const jobEmbedding = await generateEmbedding(jobDescription)

  const results: CandidateMatchResult[] = []

  for (const candidate of candidates) {

    const resumeEmbedding = await generateEmbedding(candidate.resume)

    const score = cosineSimilarity(jobEmbedding, resumeEmbedding)

    results.push({
      candidateId: candidate.id,
      score
    })
  }

  return results
}
