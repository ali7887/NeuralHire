 
import { NextResponse } from "next/server";

import { authService } from "@/lib/services/auth.service";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result =
      await authService.register(body);

    return NextResponse.json(result, {
      status: 201,
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    const message =
      error instanceof Error
        ? error.message
        : "Registration failed";

    return NextResponse.json(
      {
        error: message,
      },
      {
        status: 400,
      }
    );
  }
}
