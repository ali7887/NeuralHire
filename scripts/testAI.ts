/* eslint-disable no-undef */
import "dotenv/config";

async function testResumeMatch() {

  const res = await fetch("http://localhost:3000/api/ai/resume-match", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      resumeText:
        "Frontend developer with React Next.js TypeScript Tailwind experience",
      jobTitle: "Senior Frontend Developer",
      jobDescription:
        "Looking for React and TypeScript developer with modern frontend stack",
      jobSkills: ["React", "Next.js", "TypeScript", "GraphQL"],
    }),
  });

  const data = await res.json();

  console.log("Resume Match Result:");
  console.log(data);
}

testResumeMatch();
