/* eslint-disable no-undef */
import { analyzeResume } from "@/lib/ai/features/resumeAnalyzer";

async function run() {
  const resume = `
  Ali is a frontend developer with 4 years experience.
  Skills: React, Next.js, TypeScript, Tailwind.
  `;

  const result = await analyzeResume(resume);

  console.log(result);
}

run();
