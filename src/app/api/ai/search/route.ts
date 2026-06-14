 

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { jobs } from "@/lib/db/schema";
import { getCache, setCache } from "@/lib/ai/cache/aiCache";
import { generateJobEmbedding } from "@/lib/ai/generateJobEmbedding";
import { cosineSimilarity } from "@/app/api/ai/embeddings";

const schema = z.object({
  query: z.string().min(1),
  topK: z.number().int().min(1).max(50).optional().default(10),
});

export async function POST(req: NextRequest) {
  try {

    const body = await req.json();

    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { query, topK } = parsed.data;

    const cacheKey = `ai-search:${query}:${topK}`;

    const cached = getCache(cacheKey);

    if (cached) {
      return NextResponse.json({
        data: cached,
        cached: true,
      });
    }

    /**
     * 1️⃣ Generate query embedding
     */

    const queryEmbedding = await generateJobEmbedding(query);

    /**
     * 2️⃣ Fetch jobs with stored embeddings
     */

    const jobRows = await db.select().from(jobs);

    const results: any[] = [];

    for (const job of jobRows) {

      if (!job.embedding) continue;

      const similarity = cosineSimilarity(
        queryEmbedding,
        job.embedding as number[]
      );


      results.push({
        job,
        score: Math.round(similarity * 100),
      });
    }

    /**
     * 3️⃣ Ranking
     */

    const ranked = results
      .sort((a, b) => b.score - a.score)
      .slice(0, topK);

    /**
     * 4️⃣ Cache
     */

    setCache(cacheKey, ranked, 1000 * 60 * 5);

    return NextResponse.json({
      data: ranked,
      cached: false,
    });

  } catch (error) {

    console.error("AI search error:", error);

    return NextResponse.json(
      { error: "Search failed" },
      { status: 500 }
    );
  }
}
