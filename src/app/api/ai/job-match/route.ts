 
import { NextResponse } from "next/server"
// import { prisma } from "@/lib/prisma" // اگر Prisma داری

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const jobId = body?.jobId
    const resumeText = body?.resumeText ?? ""

    if (!jobId || typeof jobId !== "string") {
      return NextResponse.json(
        { error: "Missing jobId" },
        { status: 400 }
      )
    }

    // ✅ اگر از DB واقعی استفاده می‌کنی
    // const job = await prisma.job.findUnique({
    //   where: { id: jobId }
    // })

    // ✅ اگر فعلاً mock داری
    const jobs = [
      {
        id: "2890fc0d-853e-4a98-a984-7f5be040e207",
        title: "Frontend Developer",
        description: "React, Next.js, TypeScript"
      }
    ]

    const job = jobs.find((j) => j.id === jobId)

    if (!job) {
      return NextResponse.json(
        { error: "Job not found", receivedJobId: jobId },
        { status: 404 }
      )
    }

    // نمونه match خیلی ساده
    let score = 50

    if (
      resumeText.toLowerCase().includes("react") &&
      job.description.toLowerCase().includes("react")
    ) {
      score += 20
    }

    if (
      resumeText.toLowerCase().includes("next") &&
      job.description.toLowerCase().includes("next")
    ) {
      score += 15
    }

    if (
      resumeText.toLowerCase().includes("typescript") &&
      job.description.toLowerCase().includes("typescript")
    ) {
      score += 15
    }

    return NextResponse.json({
      score: Math.min(score, 100),
      job: {
        id: job.id,
        title: job.title
      }
    })
  } catch (error) {
    console.error("job-match route error:", error)

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
