import { getGapGPTClient } from "@/lib/ai/client/gapgpt.client";

export const aiService = {
  generateJobDescription: async ({
    title,
    skills,
    seniority,
  }: {
    title: string;
    skills: string[];
    seniority: string;
  }) => {
    const client = getGapGPTClient();

    const response = await client.chat([
      {
        role: "user",
        content: `
Generate a professional job description.

Title: ${title}
Seniority: ${seniority}
Skills: ${skills.join(", ")}

Sections:
- Overview
- Responsibilities
- Required Skills
- Preferred Skills
- Benefits
`,
      },
    ]);

    return response.choices?.[0]?.message?.content ?? "";
  },
};
