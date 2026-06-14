 
/* eslint-disable react/no-unknown-property */
"use client"

import { useState } from "react"

interface Props {
  jobId: string
}

export default function AIJobMatchCard({ jobId }: Props) {
  const [matchScore, setMatchScore] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function fetchMatchScore() {
    if (!jobId) {
      setError("Invalid job ID.")
      return
    }

    setLoading(true)
    setError("")
    setMatchScore(null)

    try {
      const resumeText =
        typeof window !== "undefined"
          ? localStorage.getItem("resumeText") || ""
          : ""

      const res = await fetch("/api/ai/job-match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobId,
          resumeText
        })
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data?.error || "Failed to analyze match.")
      }

      setMatchScore(data?.score ?? null)
    } catch (err: any) {
      console.error("AI match error:", err)
      setError(err?.message || "Match analysis failed.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="ai-card">
      <h3>AI Job Match</h3>

      <button onClick={fetchMatchScore} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze Match"}
      </button>

      {error && <p className="ai-error">{error}</p>}

      {matchScore !== null && (
        <p className="ai-score">
          <b>AI Match Score:</b> {matchScore}%
        </p>
      )}

      <style jsx>{`
        .ai-card {
          border: 1px solid #e5e7eb;
          padding: 20px;
          border-radius: 10px;
          background: #ffffff;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        button {
          margin-top: 12px;
          padding: 8px 16px;
          background: #16a34a;
          border: none;
          border-radius: 6px;
          color: white;
          font-weight: 500;
          cursor: pointer;
        }

        .ai-score {
          margin-top: 12px;
          font-size: 16px;
        }

        .ai-error {
          margin-top: 10px;
          color: #dc2626;
        }
      `}</style>
    </div>
  )
}
