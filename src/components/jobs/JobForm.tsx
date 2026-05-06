"use client";

import Button from "../ui/Button/Button"
import styles from "./job-form.module.css"
import { useJobForm } from "@/hooks/useJobForm"
import { jobsClient } from "@/lib/api/jobs.client"
import { JobCreateDTO } from "@/lib/dto/job.dto"

interface JobFormProps {
  onSuccess?: () => void
  initialData?: any
}

export default function JobForm({ onSuccess, initialData }: JobFormProps) {

  const { form, handleChange, loading, setLoading, setForm } = useJobForm(initialData)

  async function handleSubmit(e: any) {
    e.preventDefault()
    setLoading(true)

    try {
      const payload: JobCreateDTO = {
        title: form.title,
        description: form.description,
        location: form.location,
        companyId: form.companyId,
        type: form.type,
        salary: form.salary ? Number(form.salary) : undefined,
      }

      await jobsClient.createJob(payload)

      setForm({})
      onSuccess?.()

    } finally {
      setLoading(false)
    }
  }

  return (
    <form autoComplete="off" onSubmit={handleSubmit} className={styles.form}>

      <input name="title" value={form.title ?? ""} onChange={handleChange} placeholder="Job Title" className={styles.input} />

      <input name="location" value={form.location ?? ""} onChange={handleChange} placeholder="Location" className={styles.input} />

      <input name="salary" value={form.salary ?? ""} onChange={handleChange} placeholder="Salary" className={styles.input} />

      <input name="companyId" value={form.companyId ?? ""} onChange={handleChange} placeholder="Company ID" className={styles.input} />

      <textarea name="description" value={form.description ?? ""} onChange={handleChange} placeholder="Description" className={styles.textarea} />

      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Post Job"}
      </Button>

    </form>
  )
}
