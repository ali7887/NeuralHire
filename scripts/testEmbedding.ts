/* eslint-disable no-undef */
import dotenv from "dotenv"
dotenv.config({ path: ".env.local" })
import { generateEmbedding } from "@/lib/ai/embeddings/generateEmbedding"

async function run() {

  const embedding = await generateEmbedding(
    "Senior React Developer with Next.js and TypeScript"
  )

  console.log("Embedding length:", embedding.length)
  console.log(embedding.slice(0, 10))
}

run()
