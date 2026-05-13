import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { companies } from "@/lib/db/schema/companies";
import { eq } from "drizzle-orm";
import { requireAdmin } from "@/lib/auth/require-admin";


export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
const admin = await requireAdmin();

if (!admin) {
  return NextResponse.json(
    { error: "Forbidden" },
    { status: 403 }
  );
}
  const { id } = await context.params;

if (!admin) {
  return NextResponse.json(
    { error: "Forbidden" },
    { status: 403 }
  );
}

  const companyId = Number(id);

if (Number.isNaN(companyId)) {
  return NextResponse.json(
    { error: "Invalid id" },
    { status: 400 }
  );
}

if (!admin) {
  return NextResponse.json(
    { error: "Forbidden" },
    { status: 403 }
  );
}

  try {
    const body = await req.json();
    
    await db.update(companies)
      .set({
        name: body.name,
        website: body.website || null,
        logoUrl: body.logoUrl || null,
        description: body.description || null,
      })
      .where(eq(companies.id, id));

    return NextResponse.json({ message: "Company updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Update company error:", error);
    return NextResponse.json({ error: "Failed to update company" }, { status: 500 });
  }
}
