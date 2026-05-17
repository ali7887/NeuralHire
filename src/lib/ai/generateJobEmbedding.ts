import { getGapGPTClient } from "./client/gapgpt.client";

export async function generateJobEmbedding(
  text: string
): Promise<number[]> {

  const client = getGapGPTClient();

  const response = await client.embeddings.create(text);

  if (!response?.data?.length) {
    throw new Error("Invalid embedding response");
  }

  return response.data[0].embedding;
}
