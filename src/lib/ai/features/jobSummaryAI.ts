 
import { getGapGPTClient } from "../client/gapgpt.client";
import { jobSummaryPrompt } from "../prompts/summary.prompt";

export async function summarizeJobAI(description: string) {

  const text = (description ?? "").trim()
  if (!text) return ""

  try {

    const client = getGapGPTClient();

    const response = await client.chat([
      {
        role: "user",
        content: jobSummaryPrompt(text),
      },
    ]);

    return response.choices?.[0]?.message?.content ?? "";

  } catch (err) {

    console.error("summarizeJobAI error:", err)
    return ""

  }
}
