import type { InferSelectModel } from "drizzle-orm"
import { jobs } from "../db/schema"

/*
|--------------------------------------------------------------------------
| Base Job Model (From Drizzle Schema)
|--------------------------------------------------------------------------
*/

export type JobBase = InferSelectModel<typeof jobs>

/*
|--------------------------------------------------------------------------
| Extended Job Model
|--------------------------------------------------------------------------
| برای UI / AI features فیلدهای اضافی اضافه می‌کنیم
|--------------------------------------------------------------------------
*/

export type Job = JobBase & {

  /**
   * Skills required for job (AI matching)
   */
  skills?: string[]

  /**
   * total applicants counter (UI optimization)
   */
  applicants?: number

  /**
   * applications list (dashboard usage)
   */
  applications?: JobApplication[]
}

/*
|--------------------------------------------------------------------------
| Job Application
|--------------------------------------------------------------------------
*/

export type JobApplicationStatus =
  | "pending"
  | "reviewed"
  | "accepted"
  | "rejected"

export type JobApplication = {
  id: string
  name: string
  email: string
  resume: string
  status: JobApplicationStatus
}

/*
|--------------------------------------------------------------------------
| Job Query Params
|--------------------------------------------------------------------------
*/

export type JobType =
  | "FULL_TIME"
  | "PART_TIME"
  | "CONTRACT"
  | "REMOTE"

export type JobQuery = {
  page?: number
  limit?: number
  search?: string
  location?: string
  type?: JobType
  category?: string
  categoryId?: string
  companyId?: string
}

/*
|--------------------------------------------------------------------------
| Job Creation Types
|--------------------------------------------------------------------------
*/

export type JobCreate = Omit<
  JobBase,
  "id" | "createdAt" | "updatedAt"
>

export interface JobCreateInput {
  companyId: string | null

  type: JobType | null

  isRemote: boolean

  title: string

  description: string

  location: string

  salary?: number | null

  /**
   * skills for AI matching
   */
  skills?: string[]
}

/*
|--------------------------------------------------------------------------
| Pagination
|--------------------------------------------------------------------------
*/

export type PaginatedResponse<T> = {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

/*
|--------------------------------------------------------------------------
| Company Types
|--------------------------------------------------------------------------
*/

export type CompanyPreview = {
  id?: string
  name: string
  logo?: string | null
}

export type JobListItem = Job & {
  company?: CompanyPreview
}

export type JobWithCompany = Job & {
  company: Required<
    Pick<CompanyPreview, "name">
  > & {
    id: string
    logo?: string | null
  }
}

/*
|--------------------------------------------------------------------------
| API DTO
|--------------------------------------------------------------------------
*/

export type JobDTO = {
  id: string
  title: string
  description: string
  location: string
  salary?: number | null
  type?: JobType | null
  createdAt?: Date | null

  company?: {
    name: string
    logo?: string | null
  }

  skills?: string[]
}
