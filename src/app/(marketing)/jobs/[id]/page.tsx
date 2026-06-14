 
/* eslint-disable react-hooks/set-state-in-effect */
"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { getJob } from "@/lib/mockJobs"
import type { Job } from "@/lib/types/job.types"

import AIJobSummaryCard from "@/components/ai/AIJobSummaryCard"
import AIJobMatchCard from "@/components/ai/AIJobMatchCard"

export default function JobDetailsPage() {
  const params = useParams()
  const id = params?.id as string | undefined

  const [job, setJob] = useState<Job | null>(null)

  useEffect(() => {
    if (!id) return

    const j = getJob(id)

    if (!j) {
      console.error("Job not found:", id)
      return
    }

    setJob(j)
  }, [id])

  if (!job) {
    return <div style={{ padding: 40 }}>Loading job...</div>
  }

  const skills = job.skills ?? []

  return (
    <div style={{ padding: 40, maxWidth: 900, margin: "0 auto" }}>
      <h1>{job.title}</h1>

      <p>
        <b>Company:</b> {job.companyId}
      </p>

      <p>
        <b>Location:</b> {job.location}
      </p>

      {job.salary != null && (
        <p>
          <b>Salary:</b> ${job.salary}
        </p>
      )}

      <p style={{ marginTop: 20 }}>{job.description}</p>

      {skills.length > 0 && (
        <p style={{ marginTop: 10 }}>
          <b>Skills:</b> {skills.join(", ")}
        </p>
      )}

      <div style={{ marginTop: 40 }}>
        <AIJobSummaryCard
          jobId={job.id}
          description={job.description}
        />
      </div>

      <div style={{ marginTop: 40 }}>
        <AIJobMatchCard jobId={job.id} />
      </div>
    </div>
  )
}
