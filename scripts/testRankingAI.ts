/* eslint-disable no-undef */
import { rankCandidates } from "@/lib/ai/features/candidateRanking";

async function run() {
  const job = "React Next.js developer";

  const resumes = [
    { id: "1", text: "React developer with Next.js experience" },
    { id: "2", text: "Python backend developer" },
  ];

  const ranked = await rankCandidates(job, resumes);

  console.log(ranked);
}

run();
