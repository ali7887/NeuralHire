// src/app/api/admin/jobs/[id]/route.ts
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { db } from "@/lib/db/db";
import {
  jobs,
  type JobStatus,
  type NewJob,
} from "@/lib/db/schema/jobs";

// GET /api/admin/jobs/[id]
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; 

  const result = await db
    .select()
    .from(jobs)
    .where(eq(jobs.id, id))
    .limit(1);

  const job = result[0];

  if (!job) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(job);
}

// PUT /api/admin/jobs/[id]
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const data = await req.json();

  const status: JobStatus = data.status ?? "open";

  const updatePayload: Partial<NewJob> = {
    title: data.title,
    description: data.description,
    location: data.location,
    salary: data.salary,
    isRemote: data.isRemote,
    type: data.type,
    level: data.level,
    companyId: data.companyId,
    employerId: data.employerId,
    isActive: data.isActive,
    published: data.published,
    status,
  };

  const updated = await db
    .update(jobs)
    .set(updatePayload)
    .where(eq(jobs.id, id))
    .returning();

  if (!updated[0]) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(updated[0]);
}


// DELETE /api/admin/jobs/[id]
export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  const deleted = await db
    .delete(jobs)
    .where(eq(jobs.id, id))
    .returning();

  if (!deleted[0]) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Deleted", id });
}
