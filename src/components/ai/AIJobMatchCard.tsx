/* eslint-disable no-undef */
/* eslint-disable react/no-unknown-property */
"use client";

import { useState } from "react";

interface AIJobMatchCardProps {
  jobId: string;
}

export default function AIJobMatchCard({ jobId }: AIJobMatchCardProps) {

  const [matchScore, setMatchScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  async function fetchMatchScore() {

    setLoading(true);

    try {

      const resumeText =
        typeof window !== "undefined"
          ? localStorage.getItem("resumeText") || ""
          : "";

      const res = await fetch("/api/ai/job-match", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobId,
          resumeText,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to analyze job match.");
      }

      setMatchScore(
        typeof data?.score === "number" ? data.score : null
      );

    } catch (err) {

      console.error("AI match error:", err);
      setMatchScore(null);

    } finally {

      setLoading(false);

    }
  }

  return (
    <div className="ai-card">
      <h3>AI Job Match</h3>

      <button onClick={fetchMatchScore} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze Match"}
      </button>

      {matchScore !== null && (
        <p className="ai-text">
          <b>AI Match Score:</b> {matchScore}%
        </p>
      )}

      <style jsx>{`
        .ai-card {
          border: 1px solid #ccc;
          padding: 16px;
          border-radius: 8px;
          background-color: #fafafa;
          max-width: 600px;
        }

        .ai-card h3 {
          margin: 0 0 8px 0;
        }

        .ai-card button {
          margin-bottom: 12px;
          padding: 6px 12px;
          cursor: pointer;
          background: #0080ff;
          color: #fff;
          border: none;
          border-radius: 4px;
        }

        .ai-card button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .ai-text {
          white-space: pre-wrap;
        }
      `}</style>
    </div>
  );
}
