import { extractSkills } from "@/lib/nlp/extractSkills";
import { calcMatchScore } from "@/lib/scoring/matchScore";
import { generateEmbedding } from "../embeddings/generateEmbedding";
import { cosineSimilarity } from "../embeddings/cosineSimilarity";

export async function jobMatchAI(
  jobDescription: string,
  resumeText: string
) {
  const jobSkills = extractSkills(jobDescription);
  const userSkills = extractSkills(resumeText);

  const ruleScore = calcMatchScore(jobSkills, userSkills);

  const jobEmbedding = await generateEmbedding(jobDescription);
  const userEmbedding = await generateEmbedding(resumeText);

  const semanticScore = cosineSimilarity(
    jobEmbedding,
    userEmbedding
  );

  const finalScore = Math.round(
    ruleScore * 0.4 + semanticScore * 100 * 0.6
  );

  return {
    ruleScore,
    semanticScore,
    finalScore,
  };
}
