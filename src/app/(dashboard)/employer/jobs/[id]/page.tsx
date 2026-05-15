/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import type { Job } from "@/lib/types/job.types";
import { getJob } from "@/lib/mockJobs";

export default function JobDetailsPage() {
  const params = useParams<{ id: string }>();

  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    if (!params?.id) return;

    const found = getJob(params.id);

    if (found) {
      setJob(found as unknown as Job);
    }
  }, [params?.id]);

  if (!job) {
    return <p>Job not found.</p>;
  }

  const skills = (job as any).skills ?? [];
  const applicants = (job as any).applicants ?? 0;

  return (
    <div style={{ maxWidth: 900 }}>
      <div style={header}>
        <div>
          <h1 style={title}>{job.title}</h1>
          <p style={location}>{job.location}</p>
        </div>

        {job.status && (
          <div style={badge}>{job.status}</div>
        )}
      </div>

      <div style={section}>
        <h3>Description</h3>
        <p style={paragraph}>{job.description}</p>
      </div>

      <div style={section}>
        <h3>Skills</h3>

        <div style={skillsStyle}>
          {skills.map((skill: string) => (
            <span key={skill} style={skillBadge}>
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div style={stats}>
        <div style={statCard}>
          <strong>{applicants}</strong>
          <span>Applicants</span>
        </div>

        <div style={statCard}>
          <strong>
            {job.salary
              ? `$${job.salary.toLocaleString()}`
              : "-"}
          </strong>
          <span>Salary</span>
        </div>
      </div>
    </div>
  );
}

/* styles (دست نخورده) */
const header = { display: "flex", justifyContent: "space-between", marginBottom: 30 };
const title = { fontSize: 32, fontWeight: 700 };
const location = { color: "#6b7280", marginTop: 6 };
const badge = { background: "#dcfce7", color: "#166534", padding: "8px 14px", borderRadius: 999 };
const section = { marginBottom: 30 };
const paragraph = { lineHeight: 1.8, color: "#374151" };
const skillsStyle = { display: "flex", gap: 10, flexWrap: "wrap" as const };
const skillBadge = { background: "#eff6ff", color: "#1d4ed8", padding: "8px 12px", borderRadius: 999 };
const stats = { display: "flex", gap: 20 };
const statCard = {
  background: "#fff",
  border: "1px solid #e5e7eb",
  borderRadius: 12,
  padding: 20,
  minWidth: 160,
  display: "flex",
  flexDirection: "column" as const,
  gap: 8,
};
