 
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { matcherService } from "./matcher.service";
import { db } from "@/lib/db";
import { jobs } from "@/lib/db/schema";

const schema = z.object({
  skills: z.array(z.string()).min(1).max(20),
});

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

    const { skills } = parsed.data;

    const jobRows = await db.select().from(jobs);

    const jobList = jobRows.map((j) => ({
      id: j.id as string,
      title: j.title ?? "",
      description: j.description ?? "",
    }));

    const matches = await matcherService.findMatchingJobs(
      skills,
      jobList,
      5
    );

    return NextResponse.json({ data: matches });

  } catch (error) {

    console.error("AI match error:", error);

    return NextResponse.json(
      { error: "AI matching failed" },
      { status: 500 }
    );
  }
}
