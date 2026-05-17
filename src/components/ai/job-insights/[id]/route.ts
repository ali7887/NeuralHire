// src/app/api/ai/job-insights/[id]/route.ts

import { NextResponse } from "next/server"

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const jobId = params.id

  // later: call OpenAI + resume analysis + vector search

  return NextResponse.json({
    summary: "This role focuses on scalable frontend systems using React and TypeScript...",
    matchScore: 82,
  })
}
