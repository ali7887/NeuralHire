/* eslint-disable no-undef */
import { NextResponse } from "next/server";
import { recommendJobsForCandidate } from "@/lib/ai/features/jobRecommendations";

export async function POST(req: Request) {
  try {
    const { resume } = await req.json();

    const jobs = await recommendJobsForCandidate(resume, []);

    return NextResponse.json({
      success: true,
      jobs,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false, error: "Recommendation failed" },
      { status: 500 }
    );
  }
}
