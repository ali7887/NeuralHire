import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/guards";

import { getAdminStats } from "@/lib/admin/getStats";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
const user = await requireAdmin();


  try {
    const stats = await getAdminStats();
    return NextResponse.json(stats);
  } catch (error) {
    console.error("ADMIN_STATS_ERROR:", error);
    return NextResponse.json({ error: "Failed to load stats" }, { status: 500 });
  }
}
