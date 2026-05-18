/* eslint-disable react/no-unknown-property */
/* eslint-disable no-undef */
"use client"

import { useMemo, useState } from "react"

type Props = {
  jobId: string
  description?: string | null
}

export default function AIJobSummaryCard({ jobId, description }: Props) {

  const [summary, setSummary] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const hasDescription = useMemo(() => {
    return Boolean(description && description.trim().length > 0)
  }, [description])

  async function fetchSummary() {

    if (!hasDescription) {
      setError("Job description is empty.")
      return
    }

    setLoading(true)
    setError("")
    setSummary("")

    try {

      const res = await fetch("/api/ai/summarize-job", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobId,
          description: description!.trim()
        })
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data?.error || "AI summary failed")
      }

      const out = (data?.summary ?? "").trim()
      setSummary(out || "No summary generated.")

    } catch (err: any) {
      console.error("AI summary error:", err)
      setError(err?.message || "Error generating AI summary.")
      setSummary("")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="ai-card">
      <h3>AI Job Summary</h3>

      <button onClick={fetchSummary} disabled={loading || !hasDescription}>
        {loading ? "Generating..." : "Generate Summary"}
      </button>

      {!hasDescription && (
        <p className="ai-hint">Job description is empty.</p>
      )}

      {error && <p className="ai-error">{error}</p>}
      {summary && <p className="ai-text">{summary}</p>}

      <style jsx>{`
        .ai-card {
          border: 1px solid #e5e7eb;
          padding: 20px;
          border-radius: 10px;
          background: #ffffff;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }

        button {
          margin-top: 12px;
          padding: 8px 16px;
          background: #2563eb;
          border: none;
          border-radius: 6px;
          color: white;
          font-weight: 500;
          cursor: pointer;
        }

        button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .ai-text {
          margin-top: 14px;
          line-height: 1.6;
        }

        .ai-error {
          margin-top: 10px;
          color: #dc2626;
        }

        .ai-hint {
          margin-top: 10px;
          color: #6b7280;
        }
      `}</style>
    </div>
  )
}
