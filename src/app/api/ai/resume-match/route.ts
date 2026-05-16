/* eslint-disable no-undef */
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getEmbedding, cosineSimilarity } from "@/app/api/ai/embeddings";
import { getCache, setCache } from "@/lib/ai/cache/aiCache";

const schema = z.object({
  resumeText: z.string().min(20),
  jobTitle: z.string().optional(),
  jobDescription: z.string().min(20),
  jobSkills: z.array(z.string()).optional(),
});

function extractMatchedSkills(resumeText: string, jobSkills: string[]) {
  const resumeLower = resumeText.toLowerCase();

  const matched: string[] = [];
  const missing: string[] = [];

  for (const skill of jobSkills) {
    if (resumeLower.includes(skill.toLowerCase())) matched.push(skill);
    else missing.push(skill);
  }

  return { matched, missing };
}

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

    const { resumeText, jobTitle, jobDescription, jobSkills = [] } =
      parsed.data;

    const cacheKey = `resumeMatch:${resumeText.slice(0, 200)}:${jobDescription.slice(
      0,
      200
    )}`;

    const cached = getCache(cacheKey);
    if (cached) {
      return NextResponse.json({ ...cached, cached: true });
    }

    const jobFullText = `
${jobTitle ?? ""}
${jobDescription}
${jobSkills.join(" ")}
`;

    const [resumeEmbedding, jobEmbedding] = await Promise.all([
      getEmbedding(resumeText),
      getEmbedding(jobFullText),
    ]);

    const similarity = cosineSimilarity(resumeEmbedding, jobEmbedding);
    const matchScore = Math.round(similarity * 100);

    const { matched, missing } = extractMatchedSkills(resumeText, jobSkills);

    const result = {
      matchScore,
      topSkillsMatch: matched.slice(0, 5),
      missingSkills: missing.slice(0, 5),
    };

    setCache(cacheKey, result, 1000 * 60 * 10);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Resume match error:", error);

    return NextResponse.json(
      { error: "Resume match failed" },
      { status: 500 }
    );
  }
}
