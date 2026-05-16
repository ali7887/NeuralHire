import { generateEmbedding } from "../embeddings/generateEmbedding";
import { cosineSimilarity } from "../embeddings/cosineSimilarity";

export async function rankCandidates(
  jobDescription: string,
  resumes: { id: string; text: string }[]
) {
  const jobEmbedding = await generateEmbedding(jobDescription);

  const scored = await Promise.all(
    resumes.map(async (r) => {
      const emb = await generateEmbedding(r.text);

      return {
        id: r.id,
        score: cosineSimilarity(jobEmbedding, emb),
      };
    })
  );

  return scored.sort((a, b) => b.score - a.score);
}
