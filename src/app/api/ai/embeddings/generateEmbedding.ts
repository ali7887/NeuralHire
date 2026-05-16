import { getGapGPTClient } from "@/lib/ai/client/gapgpt.client";
import { getCache, setCache } from "@/lib/ai/cache/aiCache";

const EMBEDDING_MODEL = "text-embedding-3-small";

export async function getEmbedding(text: string): Promise<number[]> {

  const clean = text.trim().slice(0, 4000);

  const cacheKey = `embedding:${clean}`;

  const cached = getCache(cacheKey);
  if (cached) {
    return cached;
  }

  const client = getGapGPTClient();

  const response = await client.embeddings.create({
    model: EMBEDDING_MODEL,
    input: clean,
  });

  const embedding = response.data[0].embedding;

  setCache(cacheKey, embedding, 1000 * 60 * 60);

  return embedding;
}
