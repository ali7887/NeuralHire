/* eslint-disable no-undef */
/* eslint-disable react-hooks/set-state-in-effect */
"use client"

import Link from "next/link"
import JobSeekerHeader from "@/components/job-seeker/JobSeekerHeader"
import { useEffect, useState } from "react"
import { getJobs } from "@/lib/mockJobs"

export default function JobSeekerDashboard() {

  const [activeJobs, setActiveJobs] = useState(0)
  const [applications, setApplications] = useState(0)
  const [profileScore, setProfileScore] = useState(0)

  useEffect(() => {
    // Jobs
    const jobs = getJobs()
    setActiveJobs(jobs.filter(j => j.status === "active").length)

    // Applications
    const totalApps = jobs.reduce((count, job) => count + job.applications.length, 0)
    setApplications(totalApps)

    // Profile Score (simple)
    const resume = localStorage.getItem("resumeFile")
    setProfileScore(resume ? 100 : 40)

  }, [])

  return (
    <div>
      <JobSeekerHeader />

      <div style={{ padding: "40px" }}>

        <h1 style={{ marginBottom: "20px" }}>Job Seeker Dashboard</h1>

        {/* Overview Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "25px",
            marginBottom: "40px"
          }}
        >
          <div style={cardStyle}>
            <h3 style={cardTitle}>Active Jobs</h3>
            <p style={cardNumber}>{activeJobs}</p>
          </div>

          <div style={cardStyle}>
            <h3 style={cardTitle}>Applications Sent</h3>
            <p style={cardNumber}>{applications}</p>
          </div>

          <div style={cardStyle}>
            <h3 style={cardTitle}>Profile Completion</h3>
            <p style={cardNumber}>{profileScore}%</p>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: "20px" }}>
          <Link href="/job-seeker/jobs">
            <button style={buttonStyle}>Browse Jobs</button>
          </Link>

          <Link href="/job-seeker/applications">
            <button style={buttonStyle}>My Applications</button>
          </Link>

          <Link href="/job-seeker/resume">
            <button style={buttonStyle}>Upload Resume</button>
          </Link>
        </div>

      </div>
    </div>
  )
}


/* ---- UI Styles ---- */

const cardStyle: React.CSSProperties = {
  padding: "25px",
  borderRadius: "12px",
  background: "#fff",
  border: "1px solid #eee",
  boxShadow: "0px 4px 12px rgba(0,0,0,0.05)"
}

const cardTitle: React.CSSProperties = {
  margin: 0,
  fontSize: "18px",
  color: "#555",
  marginBottom: "10px"
}

const cardNumber: React.CSSProperties = {
  margin: 0,
  fontSize: "32px",
  fontWeight: "bold",
  color: "#111"
}

const buttonStyle: React.CSSProperties = {
  padding: "12px 22px",
  borderRadius: "8px",
  background: "#1f74ff",
  color: "#fff",
  border: "none",
  fontSize: "16px",
  cursor: "pointer",
  transition: "0.15s",
}
