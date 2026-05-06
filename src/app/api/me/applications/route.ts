import { NextResponse, NextRequest } from "next/server";
import { applicationService } from "@/lib/services/application.service";
import { getUserFromRequest } from "@/lib/auth/get-user-from-request";

export async function GET(req: NextRequest) {
  const user = await getUserFromRequest();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const apps = await applicationService.getUserApplications(user.userId);

    return NextResponse.json({
      applications: apps,
    });
  } catch (error) {
    console.error("ME_APPLICATIONS_ERROR:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
