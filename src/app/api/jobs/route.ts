import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { jobs } from "@/lib/db/schema";
import { eq, and, desc } from "drizzle-orm";
import { requireUser } from "@/lib/auth/require-user";

// -----------------------------------------------------------------------------
// GET /api/jobs
// -----------------------------------------------------------------------------
export async function GET(req: Request) {
  try {
    const user = await requireUser();
    const { searchParams } = new URL(req.url);

    const isActiveParam = searchParams.get("isActive");
    const publishedParam = searchParams.get("published");

    const conditions = [];

    if (user.role === "employer") {
      conditions.push(eq(jobs.employerId, user.userId));
    }

    if (isActiveParam !== null) {
      conditions.push(eq(jobs.isActive, isActiveParam === "true"));
    }

    if (publishedParam !== null) {
      conditions.push(eq(jobs.published, publishedParam === "true"));
    }

    const result = await db
      .select()
      .from(jobs)
      .where(conditions.length ? and(...conditions) : undefined)
      .orderBy(desc(jobs.createdAt));

    return NextResponse.json(result);
  } catch (error: any) {
    if (error?.status === 401)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    console.error("GET /api/jobs error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// -----------------------------------------------------------------------------
// POST /api/jobs
// -----------------------------------------------------------------------------
export async function POST(req: Request) {
  try {
    const user = await requireUser();

    if (user.role !== "employer") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();

    const [job] = await db
      .insert(jobs)
      .values({ ...body, employerId: user.userId })
      .returning();

    return NextResponse.json(job, { status: 201 });
  } catch (error: any) {
    if (error?.status === 401)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    console.error("POST /api/jobs error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
