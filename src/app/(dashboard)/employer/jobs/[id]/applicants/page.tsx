/* eslint-disable no-undef */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ApplicantsTable, {
  Applicant,
} from "@/components/employer/jobs/ApplicantsTable";

import { getJob, updateApplicationStatus } from "@/lib/mockJobs";
import type { Job } from "@/lib/types/job.types";

type Status = "pending" | "reviewed" | "accepted" | "rejected";

export default function ApplicantsPage() {
  const params = useParams<{ id: string }>();
  const jobId = params?.id;

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!jobId) return;

    const found = getJob(jobId);

    if (found) {
      setJob(found);
    }

    setLoading(false);
  }, [jobId]);

  function handleStatusChange(appId: string, status: Status) {
    if (!jobId) return;

    updateApplicationStatus(jobId, appId, status);

    const updated = getJob(jobId);

    if (updated) {
      setJob(updated);
    }
  }

  if (loading) {
    return <p>Loading applicants...</p>;
  }

  if (!job || !jobId) {
    return <p>Job not found.</p>;
  }

  const applicants: Applicant[] = job.applications ?? [];

  return (
    <div style={container}>
      <header style={header}>
        <h1 style={title}>Applicants Management</h1>

        <p style={subtitle}>
          Position: <strong>{job.title}</strong>
        </p>
      </header>

      <ApplicantsTable
        jobId={jobId}
        jobTitle={job.title}
        jobDescription={job.description ?? ""}
        applicants={applicants}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}

const container: React.CSSProperties = {
  padding: 20,
  maxWidth: 900,
};

const header: React.CSSProperties = {
  marginBottom: 30,
};

const title: React.CSSProperties = {
  fontSize: 28,
  fontWeight: 700,
};

const subtitle: React.CSSProperties = {
  color: "#6b7280",
};
