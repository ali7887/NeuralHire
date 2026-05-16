/* eslint-disable no-undef */
import { getGapGPTClient } from "../client/gapgpt.client"

export async function generateEmbedding(text: string): Promise<number[]> {

  if (!text || text.trim().length === 0) {
    throw new Error("generateEmbedding: text is empty")
  }

  const client = getGapGPTClient()

  try {

    const response = await client.embeddings.create({
      model: "text-embedding-3-small",
      input: text.trim()
    })

    const embedding = response.data?.[0]?.embedding

    if (!embedding) {
      throw new Error("Embedding response invalid")
    }

    return embedding

  } catch (error) {
    console.error("Embedding generation failed:", error)
    throw error
  }
}
