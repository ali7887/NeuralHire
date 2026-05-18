/* eslint-disable react-hooks/set-state-in-effect */

"use client";

import { useEffect, useState } from "react";
import { getJob, updateJob } from "@/lib/mockJobs";
import type { Job } from "@/lib/types/job.types";
import EditJobForm from "./EditJobForm";

export default function EditJobPage({ params }: { params: { id: string } }) {
  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    const found = getJob(params.id);
    if (found) setJob(found);
  }, [params.id]);

  if (!job) {
    return <p>Loading job...</p>;
  }

  async function handleSave(updated: Partial<Job>) {
    updateJob(params.id, updated);
  }

  return <EditJobForm jobData={job} onSave={handleSave} />;
}
