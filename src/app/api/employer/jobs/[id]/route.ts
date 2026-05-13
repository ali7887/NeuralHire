import { NextRequest, NextResponse } from "next/server";
import { jobService } from "@/lib/services/job.service";
import { requireUser } from "@/lib/auth/require-user";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return NextResponse.json(await jobService.getById(id));
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await requireUser();

  const { id } = await params;
  const userId = req.headers.get("userId")!;
  const body = await req.json();
  return NextResponse.json(
    await jobService.updateJob(id, userId, body)
  );
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const userId = req.headers.get("userId")!;
  return NextResponse.json(await jobService.deleteJob(id, userId));
}