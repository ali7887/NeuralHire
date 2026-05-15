/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-undef */
"use client"

import JobSeekerHeader from "@/components/job-seeker/JobSeekerHeader"
import { useEffect, useState } from "react"
import { getJobs, seedMockJobs, updateJob, type Job } from "@/lib/mockJobs"
import styles from "./jobs.module.css"

const USER_EMAIL = "user@example.com"

export default function JobsPage() {

  const [jobs, setJobs] = useState<Job[]>([])

  function loadJobs() {
    const data = getJobs()
    const active = data.filter(j => j.status === "active")
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

    const alreadyApplied = job.applications.some(
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
      applications: [...job.applications, newApplicant]
    })

    loadJobs()
  }

  return (
    <>
      <JobSeekerHeader />

      <div className={styles.container}>
        <h2>Available Jobs</h2>

        {jobs.map(job => {
          const applied = job.applications.some(
            a => a.email === USER_EMAIL
          )

          return (
            <div key={job.id} className={styles.card}>
              <h3>{job.title}</h3>

              <p>{job.description}</p>

              <p><b>Location:</b> {job.location}</p>

              {job.salary && (
                <p><b>Salary:</b> ${job.salary}</p>
              )}

              {job.skills && (
                <p>
                  <b>Skills:</b> {job.skills.join(", ")}
                </p>
              )}

              <button
                onClick={() => apply(job.id)}
                disabled={applied}
              >
                {applied ? "Applied ✅" : "Apply"}
              </button>
            </div>
          )
        })}
      </div>
    </>
  )
}
