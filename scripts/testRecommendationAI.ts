/* eslint-disable no-undef */

import "dotenv/config";
import { recommendJobsForCandidate } from "../src/lib/ai/features/jobRecommendations";

async function run() {
  const resume = `
Senior Frontend Developer with 6 years experience.
Expert in React, Next.js, TypeScript.
Experience building scalable SaaS dashboards.
Familiar with Node.js and PostgreSQL.
`;

  const jobs = [
    {
      id: "job1",
      title: "Senior React Developer",
      description: "Looking for React and Next.js expert",
    },
    {
      id: "job2",
      title: "Backend Node Developer",
      description: "Node.js and microservices experience required",
    },
    {
      id: "job3",
      title: "Frontend Engineer",
      description: "TypeScript, React, UI architecture",
    },
  ];

  try {
    const recommendations = await recommendJobsForCandidate(resume, jobs);

    console.log("\nAI Job Recommendations:\n");

    if (!recommendations || recommendations.length === 0) {
      console.log("No recommendations returned.");
      return;
    }

    for (const job of recommendations) {
      console.log(`Job: ${job.title}`);
      console.log(`ID: ${job.id}`);
      console.log(`Match Score: ${job.score}`);
      console.log("-----");
    }
  } catch (error) {
    console.error("Recommendation test failed:");
    console.error(error);
  }
}

run();
