import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";
import { applications, jobs } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { requireUser } from "@/lib/auth/require-user";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ jobId: string }> }
) {
  try {
    const { jobId } = await params;
    const user = await requireUser();

    if (user.role === "employer") {
      const [job] = await db.select().from(jobs).where(eq(jobs.id, jobId)).limit(1);

      if (!job || job.employerId !== user.userId) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
    }

    const result = await db
      .select()
      .from(applications)
      .where(eq(applications.jobId, jobId));

    return NextResponse.json(result);
  } catch (error: any) {
    if (error?.status === 401)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    console.error("GET /api/jobs/[jobId]/applications error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ jobId: string }> }
) {
  try {
    const { jobId } = await params;
    const user = await requireUser();
    const body = await request.json();

    const [application] = await db
      .insert(applications)
      .values({
        ...body,
        jobId,
        userId: user.userId,
      })
      .returning();

    return NextResponse.json(application, { status: 201 });
  } catch (error: any) {
    if (error?.status === 401)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    console.error("POST /api/jobs/[jobId]/applications error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
