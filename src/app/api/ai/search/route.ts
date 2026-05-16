/* eslint-disable no-undef */
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getEmbedding, cosineSimilarity } from "@/app/api/ai/embeddings";
import { db } from "@/lib/db";
import { jobs } from "@/lib/db/schema";
import { getCache, setCache } from "@/lib/ai/cache/aiCache";

const schema = z.object({
  query: z.string().min(1),
  topK: z.number().int().min(1).max(50).optional().default(10),
});

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const parsed = schema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { query, topK } = parsed.data;

    const cacheKey = `search:${query}`;

    const cached = getCache(cacheKey);
    if (cached) {
      return NextResponse.json({ data: cached, cached: true });
    }

    const queryEmbedding = await getEmbedding(query);

    const jobRows = await db.select().from(jobs);

    const scored = await Promise.all(
      jobRows.map(async (job) => {
        const text = `${job.title ?? ""} ${job.description ?? ""}`;

        const embedding = await getEmbedding(text);

        const similarity = cosineSimilarity(queryEmbedding, embedding);

        return {
          job,
          score: Math.round(similarity * 100),
        };
      })
    );

    const results = scored.sort((a, b) => b.score - a.score).slice(0, topK);

    setCache(cacheKey, results, 1000 * 60 * 5);

    return NextResponse.json({ data: results });
  } catch (error) {
    console.error("AI search error:", error);

    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
