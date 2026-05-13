import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { companies, users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { requireAdmin } from "@/lib/auth/require-admin";

export async function POST(req: NextRequest) {

  const admin = await requireAdmin();

  if (!admin) {
    return NextResponse.json(
      { error: "Forbidden" },
      { status: 403 }
    );
  }

  try {

    const {
      name,
      website,
      logoUrl,
      description,
      ownerId,
    } = await req.json();

    if (!name || !ownerId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const owner = await db.query.users.findFirst({
      where: eq(users.id, ownerId),
    });

    if (!owner || owner.role !== "employer") {
      return NextResponse.json(
        { error: "Invalid ownerId" },
        { status: 400 }
      );
    }

    const [company] = await db
      .insert(companies)
      .values({
        name,
        website: website || null,
        logoUrl: logoUrl || null,
        description: description || null,
        ownerId,
      })
      .returning();

    return NextResponse.json(company);

  } catch (error) {

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
