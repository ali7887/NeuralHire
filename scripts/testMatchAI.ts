/* eslint-disable no-undef */
import { jobMatchAI } from "@/lib/ai/features/jobMatchAI";

async function run() {
  const job = `
  Looking for React and Next.js developer.
  `;

  const resume = `
  Experienced React developer using Next.js and TypeScript.
  `;

  const score = await jobMatchAI(job, resume);

  console.log(score);
}

run();
