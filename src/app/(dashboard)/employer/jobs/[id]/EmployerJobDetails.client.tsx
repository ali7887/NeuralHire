/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button/Button";
import styles from "./EmployerJobDetails.module.css";
import { getJob, updateJobStatus, deleteJob, Job } from "@/lib/mockJobs";

export default function EmployerJobDetails({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    const data = getJob(params.id);
    if (!data) return;
    setJob(data);
  }, [params.id]);

  if (!job) return <p>Job not found</p>;

  return (
    <div className={styles.container}>
      <h1>{job.title}</h1>
      <p>{job.location}</p>

      <Button onClick={() => updateJobStatus(job.id, "closed")}>
        Close Job
      </Button>

      <Button onClick={() => updateJobStatus(job.id, "active")}>
        Reopen Job
      </Button>

      <Button
        variant="danger"
        onClick={() => {
          deleteJob(job.id);
          router.push("/dashboard/employer/jobs");
        }}
      >
        Delete
      </Button>
    </div>
  );
}
