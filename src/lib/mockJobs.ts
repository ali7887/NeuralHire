/* eslint-disable no-undef */

import type {
  Job,
  JobApplication,
  JobApplicationStatus
} from "@/lib/types/job.types"

const STORAGE_KEY = "jobs"

/* =====================================================
   Safe LocalStorage
===================================================== */

function readStorage(): Job[] {

  if (typeof window === "undefined") return []

  const raw = localStorage.getItem(STORAGE_KEY)

  if (!raw) return []

  try {
    return JSON.parse(raw)
  } catch {
    return []
  }
}

function writeStorage(jobs: Job[]) {

  if (typeof window === "undefined") return

  localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs))
}

/* =====================================================
   Job CRUD
===================================================== */

export function getJobs(): Job[] {
  return readStorage()
}

export function getJob(id: string): Job | undefined {

  const jobs = readStorage()

  return jobs.find((j) => j.id === id)
}

export function createJob(
  data: Omit<
    Job,
    "id" | "createdAt" | "updatedAt" | "applications" | "applicants" | "embedding"
  >
): Job {

  const jobs = readStorage()

  const newJob: Job = {

    ...data,

    id: crypto.randomUUID(),

    embedding: null,

    createdAt: new Date(),
    updatedAt: new Date(),

    applications: [],
    applicants: 0,

    skills: data.skills ?? []
  }

  const updated = [newJob, ...jobs]

  writeStorage(updated)

  return newJob
}

export function updateJob(id: string, updated: Partial<Job>) {

  const jobs = readStorage()

  const newJobs = jobs.map((job) => {

    if (job.id !== id) return job

    return {
      ...job,
      ...updated,
      updatedAt: new Date()
    }

  })

  writeStorage(newJobs)
}

export function deleteJob(id: string) {

  const jobs = readStorage()

  const newJobs = jobs.filter((j) => j.id !== id)

  writeStorage(newJobs)
}

/* =====================================================
   Job Status
===================================================== */

export function updateJobStatus(
  id: string,
  status: Job["status"]
) {

  const jobs = readStorage()

  const newJobs = jobs.map((job) =>
    job.id === id
      ? { ...job, status, updatedAt: new Date() }
      : job
  )

  writeStorage(newJobs)
}

/* =====================================================
   Applicant Management
===================================================== */

export function applyToJob(
  jobId: string,
  applicant: JobApplication
) {

  const jobs = readStorage()

  const newJobs = jobs.map((job) => {

    if (job.id !== jobId) return job

    const updatedApps = [...(job.applications ?? []), applicant]

    return {
      ...job,
      applications: updatedApps,
      applicants: updatedApps.length
    }

  })

  writeStorage(newJobs)
}

export function updateApplicationStatus(
  jobId: string,
  appId: string,
  status: JobApplicationStatus
) {

  const jobs = readStorage()

  const newJobs = jobs.map((job) => {

    if (job.id !== jobId) return job

    return {
      ...job,
      applications: job.applications?.map((app) =>
        app.id === appId
          ? { ...app, status }
          : app
      ) ?? []
    }

  })

  writeStorage(newJobs)
}

/* =====================================================
   Demo Seed Data
===================================================== */

export function seedMockJobs() {

  const existing = readStorage()

  if (existing.length > 0) return

  const demo: Job[] = [

    {
      id: "1",

      title: "Frontend Developer",
      description: "Build modern React and Next.js applications.",

      location: "Remote",
      salary: 5000,

      type: "FULL_TIME",
      level: "mid",

      companyId: "demo-company",
      employerId: "demo-employer",

      isActive: true,
      published: true,

      isRemote: true,

      embedding: null,

      status: "open",

      createdAt: new Date(),
      updatedAt: new Date(),

      skills: ["React", "Next.js", "TypeScript"],

      applicants: 2,

      applications: []
    }

  ]

  writeStorage(demo)
}

/* =====================================================
   Dashboard Stats
===================================================== */

export function getDashboardStats() {

  if (typeof window === "undefined") return null

  const jobs = readStorage()

  const activeJobs = jobs.filter(
    (j) => j.status === "open"
  ).length

  const draftJobs = jobs.filter(
    (j) => j.status === "draft"
  ).length

  const applications = jobs.reduce(
    (acc, job) => acc + (job.applications?.length ?? 0),
    0
  )

  return {
    activeJobs,
    draftJobs,
    applications
  }
}
