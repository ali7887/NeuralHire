import { NextResponse } from "next/server";
import { applicationService } from "@/lib/services/application.service";
import { requireUser } from "@/lib/auth/require-user";

export async function GET(req: Request) {
  try {
    const user = await requireUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);

    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Missing id" },
        { status: 400 }
      );
    }

    const applications =
      await applicationService.getJobApplications(id);

    if (!applications) {
      return NextResponse.json(
        { error: "Not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(applications);

  } catch {

    return NextResponse.json(
      { error: "Failed" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {

    const user = await requireUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const { jobId } = body;

    if (!jobId) {
      return NextResponse.json(
        { error: "jobId required" },
        { status: 400 }
      );
    }

    const application =
      await applicationService.applyToJob(
        user.userId,
        jobId,
        {}
      );

    return NextResponse.json(
      application,
      { status: 201 }
    );

  } catch {

    return NextResponse.json(
      { error: "Apply failed" },
      { status: 500 }
    );
  }
}
