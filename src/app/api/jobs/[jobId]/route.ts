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

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const job = jobs.find((j) => j.id === params.id);

  if (!job) {
    return NextResponse.json(
      { error: "Job not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(job);
}
