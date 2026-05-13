import { NextResponse } from "next/server";
import { userService } from "@/lib/services/user.service";
import { requireUser } from "@/lib/auth/require-user";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // UUID → string، پس Number(id) ممنوع
const user = await requireUser()

if (user.userId !== id && user.role !== "admin") {
  return 403
}


    return NextResponse.json(user);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
