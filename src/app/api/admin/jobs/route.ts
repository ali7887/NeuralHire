import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/require-admin";
import { authErrorResponse } from "@/lib/api/auth-error-response";
import { db } from "@/lib/db";
import { jobs, type NewJob, jobStatusEnum } from "@/lib/db/schema/jobs";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req);

  if (!auth.ok) {
    return authErrorResponse(auth.error, auth.status);
  }

  try {
    const allJobs = await db.select().from(jobs);
    return NextResponse.json(allJobs);
  } catch (error) {
    console.error("ADMIN_JOBS_GET_ERROR:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin(req);

  if (!auth.ok) {
    return authErrorResponse(auth.error, auth.status);
  }

  try {
    const data = await req.json();

    const payload: NewJob = {
      title: data.title,
      description: data.description ?? null,
      location: data.location ?? null,
      salary: data.salary ?? null,
      isRemote: data.isRemote ?? false,
      type: data.type ?? null,
      level: data.level ?? null,
      companyId: data.companyId ?? null,
      employerId: data.employerId ?? null,
      isActive: data.isActive ?? true,
      published: data.published ?? false,
      status: (data.status as (typeof jobStatusEnum.enumValues)[number]) ?? "open",
    };

    const inserted = await db.insert(jobs).values(payload).returning();
    return NextResponse.json(inserted[0], { status: 201 });
  } catch (error) {
    console.error("ADMIN_JOBS_POST_ERROR:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
