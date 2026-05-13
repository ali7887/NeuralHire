import Link from "next/link"
import styles from "./job-seeker.module.css"

export default function JobSeekerDashboard() {

  return (
    <div className={styles.container}>

      <h1>Job Seeker Dashboard</h1>

      <div className={styles.grid}>

        <Link href="/dashboard/job-seeker/jobs">
          Browse Jobs
        </Link>

        <Link href="/dashboard/job-seeker/applications">
          My Applications
        </Link>

        <Link href="/dashboard/job-seeker/resume">
          Upload Resume
        </Link>

      </div>

    </div>
  )
}
