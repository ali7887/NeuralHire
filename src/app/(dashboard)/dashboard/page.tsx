import Link from "next/link";
import { jobService } from "@/lib/services/job.service";

export default async function Dashboard() {
  const jobs = await jobService.getEmployerJobs("1");

  return (
    <div>
      <h1>Your Jobs</h1>
      {jobs.map((job: any) => (
        <div key={job.id} style={{ marginBottom: "20px" }}>
          <h3>{job.title}</h3>
          <p>Location: {job.location}</p>
          <p>Salary: {job.salary}</p>
          <Link href={`/dashboard/employer/jobs/${job.id}/applications`}>
            View Applications
          </Link>
        </div>
      ))}
    </div>
  );
}
