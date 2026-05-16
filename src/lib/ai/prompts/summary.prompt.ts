export const jobSummaryPrompt = (description: string) => `
You are an AI assistant specialized in summarizing job descriptions.

Summarize the following job description into:
- 2 concise professional sentences
- Focus on main responsibilities and required skills
- Keep tone formal and clear

Job Description:
${description}
`;
