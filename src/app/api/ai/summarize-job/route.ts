/* eslint-disable no-undef */
import { NextResponse } from "next/server"
import { summarizeJob } from "@/lib/ai/summarizeJob"
import { summarizeJobAI } from "@/lib/ai/features/jobSummaryAI"
import { getJob } from "@/lib/mockJobs"

export async function POST(req: Request) {

  try {

    const body = await req.json()
    const jobId: string | undefined = body?.jobId
    const incomingDescription: string = (body?.description ?? "").toString()

    let description = incomingDescription.trim()

    // اگر description از کلاینت نیامد، تلاش کن با jobId پیدا کنی
    if (!description && jobId) {
      const job = getJob(jobId)
      description = (job?.description ?? "").trim()
    }

    if (!description) {
      return NextResponse.json(
        { error: "Job description is empty." },
        { status: 400 }
      )
    }

    // 1) AI summary
    const aiSummary = (await summarizeJobAI(description)).trim()

    if (aiSummary) {
      return NextResponse.json({ summary: aiSummary })
    }

    // 2) fallback summary
    const fallback = summarizeJob(description)

    return NextResponse.json({
      summary: fallback || "No summary generated."
    })

  } catch (error) {

    console.error("summarize-job error:", error)

    return NextResponse.json(
      { error: "Failed to summarize job." },
      { status: 500 }
    )
  }
}
