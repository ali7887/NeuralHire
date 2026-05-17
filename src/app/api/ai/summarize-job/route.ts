/* eslint-disable no-undef */
import { NextResponse } from "next/server";
import { summarizeJobAI } from "@/lib/ai/features/jobSummaryAI";

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    const summary = await summarizeJobAI(text);

    return NextResponse.json({
      success: true,
      summary,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false, error: "Failed to summarize job" },
      { status: 500 }
    );
  }
}
