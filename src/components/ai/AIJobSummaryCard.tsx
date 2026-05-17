/* eslint-disable no-undef */
/* eslint-disable react/no-unknown-property */
"use client"

import { useState } from "react"

export default function AIJobSummaryCard({ jobId }: { jobId: string }) {

  const [summary, setSummary] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  async function fetchSummary() {

    setLoading(true)

    try {

      const res = await fetch("/api/ai/summarize-job", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ jobId })
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data?.error || "AI summary failed")
      }

      setSummary(data.summary || "No summary generated.")

    } catch (err) {

      console.error("AI summary error:", err)
      setSummary("Error generating AI summary.")

    } finally {

      setLoading(false)

    }
  }

  return (

    <div className="ai-card">

      <h3>AI Job Summary</h3>

      <button onClick={fetchSummary} disabled={loading}>
        {loading ? "Generating..." : "Generate Summary"}
      </button>

      {summary && <p className="ai-text">{summary}</p>}

      <style jsx>{`

        .ai-card {
          border: 1px solid #ccc;
          padding: 16px;
          border-radius: 8px;
          background: #fafafa;
          max-width: 600px;
        }

        button {
          margin-top: 10px;
          padding: 8px 14px;
          background: #0070f3;
          border: none;
          border-radius: 4px;
          color: white;
          cursor: pointer;
        }

        button:disabled {
          opacity: 0.7;
        }

        .ai-text {
          margin-top: 12px;
          white-space: pre-wrap;
        }

      `}</style>

    </div>

  )
}
