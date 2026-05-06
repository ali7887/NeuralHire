import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { jobs } from "@/lib/db/schema/jobs";
import { applications } from "@/lib/db/schema/applications";
import { eq, and } from "drizzle-orm";
import { requireUser } from "@/lib/auth/require-user";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ jobId: string }> }
) {
  try {
    const { jobId } = await params;
    const user = await requireUser();

    const job = await db.query.jobs.findFirst({
      where: eq(jobs.id, jobId),
    });

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    if (!job.isActive) {
      return NextResponse.json(
        { error: "Job is not active" },
        { status: 400 }
      );
    }

    const existingApplication = await db.query.applications.findFirst({
      where: and(
        eq(applications.jobId, jobId),
        eq(applications.userId, user.userId)
      ),
    });

    if (existingApplication) {
      return NextResponse.json(
        { error: "You have already applied to this job" },
        { status: 400 }
      );
    }

    const body = await request.json();

    const [application] = await db
      .insert(applications)
      .values({
        jobId,
        userId: user.userId,
        resumePath: body.resumePath || body.resumeUrl,
        coverLetter: body.coverLetter,
      })
      .returning();

    return NextResponse.json(application, { status: 201 });
  } catch (error: any) {
    if (error?.status === 401) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    console.error("Error applying to job:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
