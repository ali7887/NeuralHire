import { NextResponse } from "next/server";

export function authErrorResponse(error: "Unauthorized" | "Forbidden", status: 401 | 403) {
  return NextResponse.json(
    { error },
    { status }
  );
}
