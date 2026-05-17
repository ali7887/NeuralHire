"use client"

import AIJobSummaryCard from "./AIJobSummaryCard"
import AIJobMatchCard from "./AIJobMatchCard"

interface Props {
  jobId: string
}

export default function AIInsightsSection({ jobId }: Props) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <AIJobSummaryCard jobId={jobId} />

      <AIJobMatchCard jobId={jobId} />
    </div>
  )
}
