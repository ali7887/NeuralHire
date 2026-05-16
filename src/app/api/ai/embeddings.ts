//ok
import { getGapGPTClient } from "@/lib/ai/client/gapgpt.client";

export async function getEmbedding(text: string): Promise<number[]> {
  const client = getGapGPTClient();

  // 1. پاکسازی متن برای کاهش مصرف توکن و نویز
  const cleanText = text.replace(/\n/g, " ").trim();
  
  if (!cleanText) return [];

  const response = await client.embeddings.create({
    model: "text-embedding-3-small",
    input: cleanText,
  });

  return response.data[0].embedding;
}

/**
 * محاسبه Cosine Similarity با مدیریت خطا
 */
export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) {
    throw new Error("Vector dimensions must match for cosine similarity");
  }

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  const magnitude = Math.sqrt(normA) * Math.sqrt(normB);
  
  // 🟢 جلوگیری از تقسیم بر صفر
  if (magnitude === 0) return 0;

  return dotProduct / magnitude;
}
