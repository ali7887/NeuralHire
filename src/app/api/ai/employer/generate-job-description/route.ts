/* eslint-disable no-undef */
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const bodyText = await req.text();
    if (!bodyText) return NextResponse.json({ error: "Body required" }, { status: 400 });

    const { title, companyName, location, type } = JSON.parse(bodyText);

    if (!title) {
      return NextResponse.json({ error: "Job title is required" }, { status: 400 });
    }

    const response = {
      summary: `${companyName || "Our company"} is seeking a talented and motivated ${title} to join our team in ${location || "a remote capacity"}. You will play a key role in delivering high-quality solutions.`,
      responsibilities: [
        `Lead the development and maintenance of core features as a ${title}.`,
        "Collaborate with cross-functional teams to define and design new functionalities.",
        "Write clean, maintainable, and efficient code following industry best practices.",
        "Troubleshoot, debug and upgrade existing systems.",
        "Participate in code reviews and contribute to team knowledge sharing."
      ],
      requirements: [
        `Proven experience as a ${title} or similar role.`,
        "Strong understanding of modern software development life cycle.",
        "Excellent problem-solving skills and attention to detail.",
        "Strong communication and teamwork abilities.",
        "Degree in Computer Science, Engineering or a related field is a plus."
      ],
      benefits: [
        "Competitive salary and performance bonuses.",
        "Flexible working hours and remote work options.",
        "Health and wellness insurance coverage.",
        "Opportunities for professional growth and learning.",
        "Collaborative and inclusive work environment."
      ]
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("[AI_GEN_ERROR]", error);
    return NextResponse.json({ error: "AI Generation failed" }, { status: 500 });
  }
}
