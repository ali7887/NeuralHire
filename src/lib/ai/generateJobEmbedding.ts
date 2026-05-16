// src/lib/ai/generateJobEmbedding.ts
import { getGapGPTClient } from "./client/gapgpt.client";

export async function generateJobEmbedding(text: string): Promise<number[]> {
  const client = getGapGPTClient();

  const response = await client.embeddings.create({
    model: "text-embedding-3-small",
    input: text,
  });

  return response.data[0].embedding;
}
