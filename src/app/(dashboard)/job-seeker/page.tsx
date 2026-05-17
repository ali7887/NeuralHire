/* eslint-disable no-undef */
/* eslint-disable react-hooks/set-state-in-effect */
"use client"

import Link from "next/link"
import JobSeekerHeader from "@/components/job-seeker/JobSeekerHeader"
import { useEffect, useState } from "react"
import { getJobs } from "@/lib/mockJobs"
import type { Job } from "@/lib/types/job.types"

import styles from "./job-seeker.module.css"

export default function JobSeekerDashboard() {

  const [activeJobs, setActiveJobs] = useState(0)
  const [applications, setApplications] = useState(0)
  const [profileScore, setProfileScore] = useState(0)

  useEffect(() => {

    const jobs: Job[] = getJobs()

    // active jobs
    setActiveJobs(jobs.filter(j => j.status === "open").length)

    // applications count
    const totalApps = jobs.reduce(
      (count, job) => count + (job.applications?.length ?? 0),
      0
    )
    setApplications(totalApps)

    // profile score
    const resume = localStorage.getItem("resumeFile")
    setProfileScore(resume ? 100 : 40)

  }, [])

  return (
    <div>

      <JobSeekerHeader />

      <div className={styles.container}>

        <h1 className={styles.title}>Job Seeker Dashboard</h1>

        {/* Overview Cards */}

        <div className={styles.cards}>

          <div className={styles.card}>
            <h3>Active Jobs</h3>
            <p>{activeJobs}</p>
          </div>

          <div className={styles.card}>
            <h3>Applications Sent</h3>
            <p>{applications}</p>
          </div>

          <div className={styles.card}>
            <h3>Profile Completion</h3>
            <p>{profileScore}%</p>
          </div>

        </div>


        {/* Quick Actions */}

        <div className={styles.actions}>

          <Link href="/job-seeker/jobs" className={styles.button}>
            Browse Jobs
          </Link>

          <Link href="/job-seeker/applications" className={styles.button}>
            My Applications
          </Link>

          <Link href="/job-seeker/resume" className={styles.button}>
            Upload Resume
          </Link>

        </div>


        {/* AI Tools */}

        <h2 className={styles.aiTitle}>AI Career Tools</h2>

        <div className={styles.aiGrid}>

          <Link href="/ai/resume-feedback" className={styles.aiCard}>
            <h3>AI Resume Review</h3>
            <p>Analyze your resume and get improvement suggestions.</p>
          </Link>

          <Link href="/ai/cover-letter" className={styles.aiCard}>
            <h3>AI Cover Letter Generator</h3>
            <p>Create personalized cover letters instantly.</p>
          </Link>

          <Link href="/ai/job-match" className={styles.aiCard}>
            <h3>AI Job Match</h3>
            <p>Find jobs that match your skills using AI.</p>
          </Link>

        </div>

      </div>

    </div>
  )
}
