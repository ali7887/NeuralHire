/* eslint-disable no-undef */
/* eslint-disable react/no-unknown-property */
"use client";

import { useState } from "react";

interface Job {
  id: string;
  title: string;
  company: string;
  score?: number;
}

interface AIRecommendedJobsPanelProps {
  resumeId: string;
}

export default function AIRecommendedJobsPanel({
  resumeId,
}: AIRecommendedJobsPanelProps) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchRecommendations() {
    if (!resumeId) {
      setError("Resume ID is missing.");
      setJobs([]);
      return;
    }

    setLoading(true);
    setError("");
    setJobs([]);

    try {
      const res = await fetch("/api/ai/recommend-jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeId }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to fetch recommendations");
      }

      if (Array.isArray(data?.recommendations)) {
        setJobs(data.recommendations);
      } else {
        setJobs([]);
        setError("No recommendations found.");
      }
    } catch (err: any) {
      console.error("AI recommendations error:", err);
      setJobs([]);
      setError(err?.message || "Error fetching recommendations.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="ai-card">
      <h3>AI Recommended Jobs</h3>

      <button onClick={fetchRecommendations} disabled={loading}>
        {loading ? "Loading..." : "Get Recommendations"}
      </button>

      {error && <p className="error">{error}</p>}

      {jobs.length > 0 && (
        <ul className="ai-list">
          {jobs.map((job) => (
            <li key={job.id}>
              <strong>{job.title}</strong> ({job.company})
              {typeof job.score === "number" && (
                <span className="score"> – Score: {job.score.toFixed(2)}</span>
              )}
            </li>
          ))}
        </ul>
      )}

      <style jsx>{`
        .ai-card {
          border: 1px solid #d1d5db;
          border-radius: 10px;
          background-color: #fafafa;
          padding: 16px;
          max-width: 600px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }

        .ai-card h3 {
          margin-bottom: 10px;
          font-size: 18px;
        }

        .ai-card button {
          background-color: #0050b3;
          color: white;
          border: none;
          padding: 8px 14px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
        }

        .ai-card button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .ai-list {
          list-style: none;
          padding-left: 0;
          margin-top: 14px;
        }

        .ai-list li {
          margin-bottom: 10px;
          background-color: #fff;
          padding: 10px 12px;
          border-radius: 6px;
          border: 1px solid #e5e7eb;
        }

        .score {
          font-size: 13px;
          color: #555;
        }

        .error {
          color: #dc2626;
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
}
