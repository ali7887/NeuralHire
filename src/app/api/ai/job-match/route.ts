/* eslint-disable no-undef */
import { NextResponse } from "next/server"
import { getJob } from "@/lib/mockJobs"
import { extractSkills } from "@/lib/nlp/extractSkills"

export async function POST(req: Request) {

  try {

    const bodyText = await req.text()

    if (!bodyText) {
      return NextResponse.json(
        { error: "Empty request body" },
        { status: 400 }
      )
    }

    const { jobId, resumeText } = JSON.parse(bodyText)

    if (!jobId) {
      return NextResponse.json(
        { error: "Missing jobId" },
        { status: 400 }
      )
    }

    const job = getJob(jobId)

    if (!job) {
      return NextResponse.json(
        { error: "Job not found" },
        { status: 404 }
      )
    }

    const jobText =
      (job.title || "") + " " + (job.description || "")

    const jobSkills = extractSkills(jobText)
    const resumeSkills = extractSkills(resumeText || "")

    const resumeSet = new Set(resumeSkills)

    const matched = jobSkills.filter(skill =>
      resumeSet.has(skill)
    )

    const score =
      jobSkills.length === 0
        ? 0
        : Math.round((matched.length / jobSkills.length) * 100)

    return NextResponse.json({
      score,
      matchedSkills: matched,
      jobSkills
    })

  } catch (error) {

    console.error("Job match error:", error)

    return NextResponse.json(
      { error: "Match failed" },
      { status: 500 }
    )

  }

}
