/* eslint-disable no-useless-assignment */
import { extractSkills } from "@/lib/nlp/extractSkills";
import { getGapGPTClient } from "../client/gapgpt.client";
import { resumeAnalysisPrompt } from "../prompts/resume.prompt";

export async function analyzeResume(text: string) {
  const client = getGapGPTClient();

  const response = await client.chat([
    {
      role: "user",
      content: resumeAnalysisPrompt(text),
    },
  ]);

  let aiData: any = {};

  try {
    aiData = JSON.parse(response.choices?.[0]?.message?.content ?? "{}");
  } catch {
    aiData = {};
  }

  const ruleSkills = extractSkills(text);

  return {
    skills: [...new Set([...(aiData.skills ?? []), ...ruleSkills])],
    seniority: aiData.seniority ?? "unknown",
    techStack: aiData.techStack ?? [],
    experienceSummary: aiData.experienceSummary ?? "",
  };
}
