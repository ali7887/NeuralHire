/* eslint-disable no-undef */
export type JobStatus = "active" | "draft" | "closed";

export interface Applicant {
  id: string;
  name: string;
  email: string;
  resume: string;
  appliedAt: string;
  status:"pending" | "reviewed" | "accepted" | "rejected";
}

export interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
  salary?: number;
  skills: string[];
  applicants: number;
  applications: Applicant[];
  status: JobStatus;
  createdAt: string;
}

const STORAGE_KEY = "employer_jobs";

/* ---------------- helpers ---------------- */

function load(): Job[] {
  if (typeof window === "undefined") return [];

  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) return [];

  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function save(jobs: Job[]) {
  if (typeof window === "undefined") return;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
}

/* ---------------- jobs ---------------- */

export function getJobs(): Job[] {
  return load().sort(
    (a, b) =>
      new Date(b.createdAt).getTime() -
      new Date(a.createdAt).getTime()
  );
}

export function getJob(id: string) {
  return load().find((j) => j.id === id);
}

export function createJob(data: {
  title: string;
  description: string;
  location: string;
  salary?: number;
  skills: string[];
}) {
  const jobs = load();

  const fakeApplicants: Applicant[] = [
    {
      id: crypto.randomUUID(),
      name: "John Doe",
      email: "john@example.com",
      resume: "/resume.pdf",
      appliedAt: new Date().toISOString(),
      status: "pending",
    },
  ];

  const newJob: Job = {
    id: crypto.randomUUID(),
    title: data.title,
    description: data.description,
    location: data.location,
    salary: data.salary,
    skills: data.skills,
    applicants: fakeApplicants.length,
    applications: fakeApplicants,
    status: "active",
    createdAt: new Date().toISOString(),
  };

  jobs.unshift(newJob);

  save(jobs);

  return newJob;
}

export function deleteJob(id: string) {
  const jobs = load().filter((j) => j.id !== id);

  save(jobs);
}

export function getDashboardStats() {
  const jobs = load();

  return {
    activeJobs: jobs.filter((j) => j.status === "active")
      .length,

    draftJobs: jobs.filter((j) => j.status === "draft")
      .length,

    applications: jobs.reduce(
      (acc, j) => acc + j.applicants,
      0
    ),
  };
}
export function updateJob(id: string, data: Partial<Job>) {
  const jobs = load();

  const index = jobs.findIndex((j) => j.id === id);

  if (index === -1) return null;

  jobs[index] = {
    ...jobs[index],
    ...data,
  };

  save(jobs);

  return jobs[index];
}

export function updateJobStatus(id: string, status: JobStatus) {
  const jobs = load();

  const index = jobs.findIndex((j) => j.id === id);

  if (index === -1) return;

  jobs[index].status = status;

  save(jobs);
}

export function updateApplicationStatus(
  jobId: string,
  appId: string,
  status: "pending" | "reviewed" | "accepted" | "rejected"
) {
  const jobs = getJobs();
  const job = jobs.find((j) => j.id === jobId);

  if (!job) return;

  const app = job.applications.find((a) => a.id === appId);
  if (!app) return;

  app.status = status;

  localStorage.setItem("jobs", JSON.stringify(jobs));
}
