/* eslint-disable no-undef */

import "dotenv/config";

import { getGapGPTClient } from "../src/lib/ai/client/gapgpt.client";
import { generateEmbedding } from "../src/lib/ai/embeddings/generateEmbedding";
import { summarizeJobAI } from "../src/lib/ai/features/jobSummaryAI";
import { jobMatchAI } from "../src/lib/ai/features/jobMatchAI";
import { rankCandidates } from "../src/lib/ai/features/candidateRanking";
import { recommendJobsForCandidate } from "../src/lib/ai/features/jobRecommendations";

async function run() {
  console.log("\n===== AI SYSTEM TEST =====\n");

  try {
    /*
    --------------------------------
    1️⃣ Test AI Connection
    --------------------------------
    */
    console.log("1️⃣ Testing AI Connection...");

    const client = getGapGPTClient();

    const chat = await client.chat([
      {
        role: "user",
        content: "Say hello in one short sentence.",
      },
    ]);

    console.log("AI Response:", chat.choices?.[0]?.message?.content);

    /*
    --------------------------------
    2️⃣ Test Embedding
    --------------------------------
    */

    console.log("\n2️⃣ Testing Embedding...");

    const embedding = await generateEmbedding("React developer with Next.js experience");

    console.log("Embedding length:", embedding.length);

    /*
    --------------------------------
    3️⃣ Test Job Summary
    --------------------------------
    */

    console.log("\n3️⃣ Testing Job Summary...");

    const jobText = `
    We are looking for a React developer experienced in Next.js and TypeScript.
    The role involves building scalable frontend systems.
    `;

    const summary = await summarizeJobAI(jobText);

    console.log("Summary:", summary);

    /*
    --------------------------------
    4️⃣ Test Job ↔ Resume Match
    --------------------------------
    */

    console.log("\n4️⃣ Testing Job Match...");

    const job = `
    Looking for React and Next.js developer.
    `;

    const resume = `
    Experienced React developer using Next.js and TypeScript.
    `;

    const matchScore = await jobMatchAI(job, resume);

    console.log("Match Score:", matchScore);

    /*
    --------------------------------
    5️⃣ Test Candidate Ranking
    --------------------------------
    */

    console.log("\n5️⃣ Testing Candidate Ranking...");

    const resumes = [
      { id: "1", text: "React developer with Next.js experience" },
      { id: "2", text: "Python backend developer" },
    ];

    const ranked = await rankCandidates("React Next.js developer", resumes);

    console.log("Ranking:", ranked);

    /*
    --------------------------------
    6️⃣ Test Job Recommendation
    --------------------------------
    */

    console.log("\n6️⃣ Testing Job Recommendation...");

    const recommendations = await recommendJobsForCandidate(
      "Senior React developer with Next.js experience",
      []
    );

    console.log("Recommendations:", recommendations);

    console.log("\n✅ ALL AI TESTS COMPLETED\n");

  } catch (error) {
    console.error("\n❌ AI TEST FAILED");
    console.error(error);
  }
}

run();
