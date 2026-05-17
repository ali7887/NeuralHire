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

export default function AIRecommendedJobsPanel({
  resumeId,
}: {
  resumeId: string;
}) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchRecommendations() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/ai/recommend-jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeId }),
      });
      const data = await res.json();
      if (Array.isArray(data.recommendations)) {
        setJobs(data.recommendations);
      } else {
        setJobs([]);
        setError("No recommendations found.");
      }
    } catch (err) {
      setError("Error fetching recommendations.");
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

      <ul className="ai-list">
        {jobs.map((job) => (
          <li key={job.id}>
            <strong>{job.title}</strong> ({job.company})
            {job.score && (
              <span className="score"> – Score: {job.score.toFixed(2)}</span>
            )}
          </li>
        ))}
      </ul>

      <style jsx>{`
        .ai-card {
          border: 1px solid #ccc;
          border-radius: 8px;
          background-color: #fafafa;
          padding: 16px;
          max-width: 600px;
        }
        .ai-card h3 {
          margin-bottom: 8px;
        }
        .ai-card button {
          background-color: #0050b3;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
        }
        .ai-list {
          list-style: none;
          padding-left: 0;
          margin-top: 12px;
        }
        .ai-list li {
          margin-bottom: 8px;
          background-color: #fff;
          padding: 10px;
          border-radius: 4px;
          border: 1px solid #e0e0e0;
        }
        .score {
          font-size: 13px;
          color: #555;
        }
        .error {
          color: red;
          margin-top: 8px;
        }
      `}</style>
    </div>
  );
}
