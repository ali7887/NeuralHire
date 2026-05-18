/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { getJob } from "@/lib/mockJobs";
import type { Job } from "@/lib/types/job.types";

export default function JobDetailsPage() {
  const params = useParams<{ id: string }>();
  const jobId = params?.id;

  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    if (!jobId) return;

    const found = getJob(jobId);
    if (found) {
      setJob(found);
    }
  }, [jobId]);

  if (!jobId || !job) {
    return <p>Job not found.</p>;
  }

  const skills = job.skills ?? [];
  const applicantsCount = job.applications?.length ?? 0;

  return (
    <div style={{ maxWidth: 800 }}>
      <div style={header}>
        <div>
          <h1 style={title}>{job.title}</h1>
          <p style={location}>{job.location}</p>
        </div>

        <span style={badge}>
          {job.status === "open" ? "Open" : "Closed"}
        </span>
      </div>

      <div style={stats}>
        <div style={statCard}>
          <strong>{applicantsCount}</strong>
          <span>Total Applicants</span>
        </div>

        <div style={statCard}>
          <strong>{skills.length}</strong>
          <span>Required Skills</span>
        </div>
      </div>

      <section style={section}>
        <h2>Description</h2>
        <p style={paragraph}>{job.description}</p>
      </section>

      <section style={section}>
        <h2>Required Skills</h2>
        <div style={skillsStyle}>
          {skills.map((skill) => (
            <span key={skill} style={skillBadge}>
              {skill}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const header = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: 30,
};

const title = {
  fontSize: 32,
  fontWeight: 700,
};

const location = {
  color: "#6b7280",
  marginTop: 6,
};

const badge = {
  background: "#dcfce7",
  color: "#166534",
  padding: "8px 14px",
  borderRadius: 999,
};

const section = {
  marginBottom: 30,
};

const paragraph = {
  lineHeight: 1.8,
  color: "#374151",
};

const skillsStyle = {
  display: "flex",
  gap: 10,
  flexWrap: "wrap" as const,
};

const skillBadge = {
  background: "#eff6ff",
  color: "#1d4ed8",
  padding: "8px 12px",
  borderRadius: 999,
};

const stats = {
  display: "flex",
  gap: 20,
  marginBottom: 30,
};

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
