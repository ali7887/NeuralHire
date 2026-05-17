"use client"

import { useState } from "react"
import { getJobs } from "@/lib/mockJobs"
import styles from "../ai.module.css"
import Link from "next/link"

export default function JobMatchPage() {

  const [skills, setSkills] = useState("")
  const [matches, setMatches] = useState<any[]>([])

  function findMatches() {

    const jobs = getJobs()

    const skillList = skills
      .toLowerCase()
      .split(",")
      .map(s => s.trim())

    const scored = jobs.map(job => {

      const jobText = (job.title + " " + job.description).toLowerCase()

      let score = 0

      skillList.forEach(skill => {
        if (jobText.includes(skill)) score += 1
      })

      return { ...job, score }
    })

    const best = scored
      .filter(j => j.score > 0)
      .sort((a, b) => b.score - a.score)

    setMatches(best)
  }

  return (
    <div className={styles.container}>

      <h1>AI Job Match</h1>

      <input
        className={styles.input}
        placeholder="Enter your skills (React, Node, TypeScript)"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
      />

      <button
        className={styles.button}
        onClick={findMatches}
      >
        Find Matching Jobs
      </button>

      <div className={styles.result}>

  {matches.map(job => (

    <Link
      key={job.id}
      href={`/jobs/${job.id}`}
      className={styles.jobCard}
    >
      <h3>{job.title}</h3>
      <p>{job.company}</p>
      <p>Match Score: {job.score}</p>
    </Link>

  ))}

      </div>

    </div>
  )
}
