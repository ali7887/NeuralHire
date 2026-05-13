"use client"

import { useEffect, useState } from "react"

import JobList from "@/components/jobs/JobList"
import { jobsClient } from "@/lib/api/jobs.client"

import type { JobDTO } from "@/lib/dto/job.dto"
import type { JobCardDTO } from "@/types/job-card"

export default function JobsPage() {

  // ✅ حالا state با خروجی API هماهنگ است
  const [jobs, setJobs] = useState<JobDTO[]>([])

  useEffect(() => {
    jobsClient.getJobs().then(setJobs)
  }, [])

  // ✅ تبدیل DTO → CardDTO
  const jobCards: JobCardDTO[] = jobs.map((job) => ({
    id: job.id,
    title: job.title,
    location: job.location ?? undefined,
    salary: job.salary ?? undefined,
    companyName: "Unknown Company"
  }))

  return (
    <div>

      <h2>Available Jobs</h2>

      <JobList jobs={jobCards} />

    </div>
  )
}
