import { getGapGPTClient } from "../client/gapgpt.client";

export async function generateEmbedding(
  text: string
): Promise<number[]> {

  const clean = text.trim();

  const client = getGapGPTClient();

  const response = await client.embeddings.create(clean);

  if (!response?.data?.length) {
    throw new Error("Invalid embedding response");
  }

  return response.data[0].embedding;
}
