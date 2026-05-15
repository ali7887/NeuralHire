/* eslint-disable no-undef */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getJobs, deleteJob, Job } from "@/lib/mockJobs";

export default function EmployerJobsPage() {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    setJobs(getJobs());
  }, []);

  function handleDelete(id: string) {
    const ok = confirm("Delete this job?");
    if (!ok) return;

    deleteJob(id);
    setJobs(getJobs());
  }

  return (
    <div style={{ maxWidth: 900 }}>
      <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 20 }}>
        My Jobs
      </h1>

      {jobs.length === 0 && <p>No jobs yet</p>}

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {jobs.map((job) => (
          <div
            key={job.id}
            style={{
              border: "1px solid #e5e7eb",
              padding: 16,
              borderRadius: 10,
            }}
          >
            <h3 style={{ fontSize: 18, fontWeight: 600 }}>{job.title}</h3>
            <p style={{ color: "#6b7280", fontSize: 14 }}>{job.location}</p>

            <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
              <Link href={`/employer/jobs/${job.id}`} style={btn}>
                View
              </Link>

              <Link href={`/employer/jobs/${job.id}/edit`} style={btn}>
                Edit
              </Link>

              <button
                onClick={() => handleDelete(job.id)}
                style={{ ...btn, background: "#dc2626", border: "none" }}
              >
                Delete
              </button>

              <Link href={`/employer/jobs/${job.id}/applicants`} style={btn}>
                Applicants ({job.applications.length})
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const btn: React.CSSProperties = {
  padding: "8px 14px",
  borderRadius: 8,
  background: "#2563eb",
  color: "#fff",
  fontSize: 13,
  display: "inline-block",
};
