/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getJob, updateApplicationStatus } from "@/lib/mockJobs";

type Status = "pending" | "reviewed" | "accepted" | "rejected";

export default function ApplicantsPage() {
  const params = useParams();
  const jobId = params.id as string;

  const [job, setJob] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const j = getJob(jobId);
    setJob(j);
  }, [jobId]);

  if (!mounted) return null;
  if (!job) return <p>Job not found</p>;

  function changeStatus(appId: string, status: Status) {
    updateApplicationStatus(jobId, appId, status);

    const updated = getJob(jobId);
    setJob(updated);
  }

  return (
    <div style={{ maxWidth: 800 }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>
        Applicants
      </h1>

      <p style={{ fontSize: 16, marginBottom: 24, color: "#6b7280" }}>
        Job: {job.title}
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {job.applications.map((a: any) => (
          <div
            key={a.id}
            style={{
              border: "1px solid #e5e7eb",
              padding: 16,
              borderRadius: 10,
              background: "#fff",
            }}
          >
            <h3 style={{ fontSize: 18, fontWeight: 600 }}>{a.name}</h3>

            <p>{a.email}</p>

            <p
              style={{
                fontSize: 13,
                marginTop: 4,
                color:
                  a.status === "accepted"
                    ? "green"
                    : a.status === "rejected"
                    ? "red"
                    : a.status === "reviewed"
                    ? "#2563eb"
                    : "#6b7280",
              }}
            >
              Status: {a.status}
            </p>

            <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
              <a
                href={a.resume}
                target="_blank"
                rel="noopener noreferrer"
                style={resumeBtn}
              >
                📄 Resume
              </a>

              <button
                onClick={() => changeStatus(a.id, "reviewed")}
                style={actionBtn}
              >
                Review
              </button>

              <button
                onClick={() => changeStatus(a.id, "accepted")}
                style={{ ...actionBtn, background: "#10b981", color: "#fff" }}
              >
                Accept
              </button>

              <button
                onClick={() => changeStatus(a.id, "rejected")}
                style={{ ...actionBtn, background: "#ef4444", color: "#fff" }}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const actionBtn: React.CSSProperties = {
  padding: "6px 12px",
  borderRadius: 6,
  border: "1px solid #d1d5db",
  background: "#fff",
  cursor: "pointer",
  fontSize: 13,
};

const resumeBtn: React.CSSProperties = {
  display: "inline-block",
  color: "#2563eb",
  background: "#eff6ff",
  padding: "6px 12px",
  borderRadius: 6,
  textDecoration: "none",
};
