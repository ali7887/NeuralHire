import { NextResponse } from "next/server";
import { authService } from "@/lib/services/auth.service";

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    // تمام عملیات ثبت‌نام داخل authService انجام می‌شود
    const result = await authService.register({
      email,
      password,
      name,
    });

    return NextResponse.json(result, { status: 201 });

  } catch (err: any) {
    console.error("REGISTER ERROR:", err);

    return NextResponse.json(
      { message: err.message || "Registration failed" },
      { status: 400 }
    );
  }
}
