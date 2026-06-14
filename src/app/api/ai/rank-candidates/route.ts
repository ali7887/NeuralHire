 
import { NextResponse } from "next/server";
import { rankCandidates } from "@/lib/ai/features/candidateRanking";

export async function POST(req: Request) {
  try {
    const { job, resumes } = await req.json();

    const ranked = await rankCandidates(job, resumes);

    return NextResponse.json({
      success: true,
      ranked,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false, error: "Ranking failed" },
      { status: 500 }
    );
  }
}
