export const runtime = "nodejs";

import { NextResponse } from "next/server";import { requireUser } from "@/lib/auth/require-user";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema/users";
import { eq } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    const ctx = await requireUser();

    // تضمین اینکه userId یک string UUID است
    if (typeof ctx.userId !== "string") {
      return NextResponse.json(
        { error: "Invalid user identifier" },
        { status: 400 },
      );
    }

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, ctx.userId));

    return NextResponse.json({ data: user });
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
