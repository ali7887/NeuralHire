 
import { NextResponse } from "next/server";
import { testGemini, testGroq, testDeepSeek } from "@/lib/aiConnectivity";

export async function GET() {
  const GEMINI_KEY = process.env.GEMINI_API_KEY;
  const GROQ_KEY = process.env.GROQ_API_KEY;
  const DEEPSEEK_KEY = process.env.DEEPSEEK_API_KEY;

  const results = await Promise.all([
    testGemini(GEMINI_KEY),
    testGroq(GROQ_KEY),
    testDeepSeek(DEEPSEEK_KEY),
  ]);

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    results,
  });
}
