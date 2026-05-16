/* eslint-disable no-undef */
import "dotenv/config";
import { summarizeJobAI } from "@/lib/ai/features/jobSummaryAI";

async function run() {
  const text = `
  We are looking for a React developer experienced in Next.js and TypeScript.
  The role involves building scalable frontend systems.
  `;

  const summary = await summarizeJobAI(text);

  console.log("SUMMARY:");
  console.log(summary);
}

run();
