import { getGapGPTClient } from "../client/gapgpt.client";
import { jobSummaryPrompt } from "../prompts/summary.prompt";

export async function summarizeJobAI(description: string) {
  const client = getGapGPTClient();

  const response = await client.chat([
    {
      role: "user",
      content: jobSummaryPrompt(description),
    },
  ]);

  return response.choices?.[0]?.message?.content ?? "";
}
