import { NextRequest, NextResponse } from "next/server";
import { applicationService } from "@/lib/services/application.service";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const userId = req.headers.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const data = await applicationService.applyToJob(
      userId,
      id,
      body
    );

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Apply error:", error);

    return NextResponse.json(
      { error: "Application failed" },
      { status: 500 }
    );
  }
}
