export type JobDTO = {
  id: string
  title: string
  description: string
  location?: string
  salary?: number
  type?: string
  companyId: string
  createdAt?: string
}

export type JobCreateDTO = Omit<JobDTO, "id" | "createdAt">

export function toJobDTO(job: any): JobDTO {
  return {
    id: job.id,
    title: job.title,
    description: job.description,
    location: job.location ?? undefined,
    salary: job.salary ?? undefined,
    type: job.type ?? undefined,
    companyId: job.companyId,
    createdAt: job.createdAt ?? undefined
  }
}
