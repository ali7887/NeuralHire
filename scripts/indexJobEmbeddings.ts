/* eslint-disable no-undef */

import "dotenv/config";
import { db } from "../src/lib/db/db";
import { jobs, job_embeddings } from "../src/lib/db/schema";
import { generateEmbedding } from "../src/lib/ai/embeddings/generateEmbedding";

async function run() {
  const allJobs = await db.select().from(jobs);

  console.log("Jobs found:", allJobs.length);

  for (const job of allJobs) {
    const text = `
${job.title}
${job.description}
`;

    const embedding = await generateEmbedding(text);

    await db.insert(job_embeddings).values({
      jobId: job.id,
      embedding: JSON.stringify(embedding),
    });

    console.log("Indexed job:", job.title);
  }

  console.log("\n✅ Job embedding indexing finished");
}

run();
