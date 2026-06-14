 
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getGapGPTClient } from "@/lib/ai/client/gapgpt.client";
import { CAREER_ASSISTANT_SYSTEM } from "@/app/api/ai/prompts";

const schema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(["user", "assistant"]),
      content: z.string().max(2000),
    })
  ).min(1).max(20),
});

export async function POST(req: NextRequest) {

  try {

    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input" },
        { status: 400 }
      );
    }

    const client = getGapGPTClient();

    const response = await client.chat([
      { role: "system", content: CAREER_ASSISTANT_SYSTEM },
      ...parsed.data.messages,
    ]);

    const reply =
      response.choices?.[0]?.message?.content ?? "No response";

    return NextResponse.json({ reply });

  } catch (error) {

    console.error("Chat API error:", error);

    return NextResponse.json(
      { error: "Chat failed" },
      { status: 500 }
    );
  }
}
