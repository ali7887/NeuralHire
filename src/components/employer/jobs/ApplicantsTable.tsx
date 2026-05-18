/* eslint-disable no-undef */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useEffect, useState } from "react";

type Status = "pending" | "reviewed" | "accepted" | "rejected";

export type Applicant = {
  id: string;
  name: string;
  email: string;
  resume: string;
  status: Status;
  score?: number;
};

type Props = {
  jobId: string;
  jobTitle: string;
  jobDescription: string;
  applicants: Applicant[];
  onStatusChange: (appId: string, status: Status) => void;
};

export default function ApplicantsTable({
  jobId,
  applicants,
  onStatusChange,
}: Props) {
  const [list, setList] = useState<Applicant[]>(applicants);
  const [loading, setLoading] = useState(false);

  // sync props -> state
  useEffect(() => {
    setList(applicants);
  }, [applicants]);

  async function runAIRanking() {
    setLoading(true);

    const updated: Applicant[] = [];

    for (const a of list) {
      try {
        const res = await fetch("/api/ai/job-match", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            jobId,
            resumeText: a.resume || "",
          }),
        });

        if (!res.ok) {
          throw new Error("AI request failed");
        }

        const data = await res.json();

        updated.push({
          ...a,
          score: data.score ?? 0,
        });
      } catch {
        updated.push({
          ...a,
          score: 0,
        });
      }
    }

    const sorted = [...updated].sort((a, b) => (b.score ?? 0) - (a.score ?? 0));

    setList(sorted);
    setLoading(false);
  }

  function scoreColor(score?: number) {
    if (score === undefined) return "#6b7280";
    if (score >= 80) return "#10b981";
    if (score >= 50) return "#f59e0b";
    return "#ef4444";
  }

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <button
          onClick={runAIRanking}
          disabled={loading}
          style={runAiBtn}
        >
          {loading ? "Running AI..." : "Run AI Ranking"}
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {list.map((a) => (
          <div key={a.id} style={card}>
            <div style={cardHeader}>
              <h3 style={name}>{a.name}</h3>

              {a.score !== undefined && (
                <div
                  style={{
                    ...scoreBadge,
                    color: scoreColor(a.score),
                  }}
                >
                  AI Match: {a.score}%
                </div>
              )}
            </div>

            <p>{a.email}</p>

            <p style={{ ...statusText, color: statusColor(a.status) }}>
              Status: {a.status}
            </p>

            <div style={actions}>
              <a
                href={a.resume}
                target="_blank"
                rel="noopener noreferrer"
                style={resumeBtn}
              >
                Resume
              </a>

              <button
                onClick={() => onStatusChange(a.id, "reviewed")}
                style={actionBtn}
              >
                Review
              </button>

              <button
                onClick={() => onStatusChange(a.id, "accepted")}
                style={{ ...actionBtn, background: "#10b981", color: "#fff" }}
              >
                Accept
              </button>

              <button
                onClick={() => onStatusChange(a.id, "rejected")}
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

/* styles */

const runAiBtn: React.CSSProperties = {
  padding: "8px 14px",
  borderRadius: 6,
  border: "none",
  background: "#111827",
  color: "#fff",
  cursor: "pointer",
  fontSize: 14,
};

const card: React.CSSProperties = {
  border: "1px solid #e5e7eb",
  padding: 16,
  borderRadius: 10,
  background: "#fff",
};

const cardHeader: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
};

const name: React.CSSProperties = {
  fontSize: 18,
  fontWeight: 600,
};

const scoreBadge: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 600,
  padding: "4px 8px",
  borderRadius: 6,
  background: "#f3f4f6",
};

const statusText: React.CSSProperties = {
  fontSize: 13,
  marginTop: 4,
};

function statusColor(status: Status) {
  if (status === "accepted") return "green";
  if (status === "rejected") return "red";
  if (status === "reviewed") return "#2563eb";
  return "#6b7280";
}

const actions: React.CSSProperties = {
  display: "flex",
  gap: 10,
  marginTop: 12,
};

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
