/* eslint-disable react/no-unknown-property */
"use client"

import AIJobSummaryCard from "./AIJobSummaryCard"
import AIJobMatchCard from "./AIJobMatchCard"

interface Props {
  jobId: string
}

export default function AIInsightsSection({ jobId }: Props) {
  return (
    <div className="ai-insights">
      <AIJobSummaryCard jobId={jobId} />
      <AIJobMatchCard jobId={jobId} />

      <style jsx>{`
        .ai-insights {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 24px;
          margin-top: 40px;
        }
      `}</style>
    </div>
  )
}
