 
/* eslint-disable react-hooks/set-state-in-effect */
"use client"

import JobSeekerHeader from "@/components/job-seeker/JobSeekerHeader"
import { useEffect, useState } from "react"
import { getJobs, seedMockJobs, updateJob } from "@/lib/mockJobs"
import type { Job } from "@/lib/types/job.types"

import AIJobSummaryCard from "@/components/ai/AIJobSummaryCard"
import AIJobMatchCard from "@/components/ai/AIJobMatchCard"

import styles from "./jobs.module.css"

const USER_EMAIL = "user@example.com"

export default function JobsPage() {

  const [jobs, setJobs] = useState<Job[]>([])
  const [search, setSearch] = useState("")

  function loadJobs() {

    const data = getJobs()

    const active = data.filter(
      j =>
        j.status === "open" &&
        j.published !== false &&
        j.isActive !== false
    )

    setJobs(active)
  }

  useEffect(() => {
    seedMockJobs()
    loadJobs()
  }, [])

  function apply(jobId: string) {

    const allJobs = getJobs()
    const job = allJobs.find(j => j.id === jobId)

    if (!job) return

    const alreadyApplied = job.applications?.some(
      a => a.email === USER_EMAIL
    )

    if (alreadyApplied) {
      alert("You already applied")
      return
    }

    const newApplicant = {
      id: crypto.randomUUID(),
      name: "Demo User",
      email: USER_EMAIL,
      resume: "#",
      status: "pending" as const
    }

    updateJob(jobId, {
      applications: [...(job.applications ?? []), newApplicant]
    })

    loadJobs()
  }

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <JobSeekerHeader />

      <div className={styles.container}>

        <h2>Available Jobs</h2>

        <input
          placeholder="Search jobs..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            marginBottom: "20px",
            padding: "10px",
            width: "100%",
            maxWidth: "400px"
          }}
        />

        {filteredJobs.length === 0 && (
          <p>No jobs available</p>
        )}

        {filteredJobs.map(job => {

          const applied = job.applications?.some(
            a => a.email === USER_EMAIL
          )

          return (

            <div key={job.id} className={styles.card}>

              <h3>{job.title}</h3>

              <p>{job.description}</p>

              <p><b>Company:</b> {job.companyId}</p>

              <p><b>Location:</b> {job.location}</p>

              {job.salary && <p><b>Salary:</b> ${job.salary}</p>}

              {job.skills && (
                <p><b>Skills:</b> {job.skills.join(", ")}</p>
              )}

              <button
                onClick={() => apply(job.id)}
                disabled={applied}
              >
                {applied ? "Applied ✅" : "Apply"}
              </button>

              <br /><br />

              {/* AI JOB SUMMARY */}
              <AIJobSummaryCard jobId={job.id} description={job.description} />

              <br />

              {/* AI JOB MATCH */}
              <AIJobMatchCard jobId={job.id} />

            </div>

          )
        })}
      </div>
    </>
  )
}
