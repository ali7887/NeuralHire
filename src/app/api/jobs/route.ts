import { NextResponse } from "next/server";

const jobs = [
  {
    id: "1",
    title: "Frontend Developer",
    description: "React / Next.js Developer needed",
    location: "Remote",
  },
  {
    id: "2",
    title: "Backend Developer",
    description: "Node.js Developer",
    location: "Berlin",
  },
];

export async function GET() {
  return NextResponse.json(jobs);
}
