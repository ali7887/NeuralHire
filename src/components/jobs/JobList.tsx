import JobCard from "./JobCard"
import styles from "./job-list.module.css"
import { JobCardDTO } from "@/types/job-card"

interface Props {
  jobs: JobCardDTO[]
}

export default function JobList({ jobs }: Props) {

  if (!jobs || jobs.length === 0) {
    return (
      <p className={styles.empty}>
        No jobs found
      </p>
    )
  }

  return (
    <div className={styles.grid}>
      {jobs.map((job: JobCardDTO) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  )
}
