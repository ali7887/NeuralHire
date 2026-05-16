export const resumeAnalysisPrompt = (text: string) => `
Extract structured information from this resume.

Return JSON format:
{
  "skills": string[],
  "seniority": string,
  "techStack": string[],
  "experienceSummary": string
}

Resume:
${text}
`;
