/* eslint-disable no-undef */
// src/lib/mockJobs.ts

export type ApplicationStatus =
  | "pending"
  | "reviewed"
  | "accepted"
  | "rejected";

export type JobStatus =
  | "active"
  | "closed";

export interface Applicant {
  id: string;
  name: string;
  email: string;
  resume: string;
  status: ApplicationStatus;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
  salary?: number;
  skills?: string[];
  status: JobStatus;
  applications: Applicant[];
}

const STORAGE_KEY = "jobs";

/* ============================= */
/* Safe LocalStorage */
/* ============================= */

function readStorage(): Job[] {
  if (typeof window === "undefined") return [];

  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];

  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeStorage(jobs: Job[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
}

/* ============================= */
/* Job CRUD */
/* ============================= */

export function getJobs(): Job[] {
  return readStorage();
}

export function getJob(id: string): Job | undefined {
  const jobs = readStorage();
  return jobs.find((j) => j.id === id);
}

export function createJob(job: Job) {
  const jobs = readStorage();
  jobs.push(job);
  writeStorage(jobs);
}

export function updateJob(id: string, updated: Partial<Job>) {
  const jobs = readStorage();

  const newJobs = jobs.map((job) =>
    job.id === id ? { ...job, ...updated } : job
  );

  writeStorage(newJobs);
}

export function deleteJob(id: string) {
  const jobs = readStorage();

  const newJobs = jobs.filter((j) => j.id !== id);

  writeStorage(newJobs);
}

/* ============================= */
/* Job Status */
/* ============================= */

export function updateJobStatus(id: string, status: JobStatus) {
  const jobs = readStorage();

  const newJobs = jobs.map((job) =>
    job.id === id ? { ...job, status } : job
  );

  writeStorage(newJobs);
}

/* ============================= */
/* Applicant Management */
/* ============================= */

export function updateApplicationStatus(
  jobId: string,
  appId: string,
  status: ApplicationStatus
) {
  const jobs = readStorage();

  const newJobs = jobs.map((job) => {
    if (job.id !== jobId) return job;

    return {
      ...job,
      applications: job.applications.map((app) =>
        app.id === appId ? { ...app, status } : app
      ),
    };
  });

  writeStorage(newJobs);
}

/* ============================= */
/* Demo Seed Data */
/* ============================= */

export function seedMockJobs() {
  const existing = readStorage();
  if (existing.length > 0) return;

  const demo: Job[] = [
    {
      id: "1",
      title: "Frontend Developer",
      description: "Build modern React and Next.js applications.",
      location: "Remote",
      salary: 5000,
      skills: ["React", "Next.js", "TypeScript"],
      status: "active",
      applications: [
        {
          id: "a1",
          name: "Ali Kiani",
          email: "ali@example.com",
          resume: "#",
          status: "pending",
        },
        {
          id: "a2",
          name: "Sara Mohammadi",
          email: "sara@example.com",
          resume: "#",
          status: "reviewed",
        },
      ],
    },
  ];

  writeStorage(demo);
}
