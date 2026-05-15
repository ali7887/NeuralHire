import type { InferSelectModel } from "drizzle-orm";

import { jobs } from "../db/schema";

/*
|--------------------------------------------------------------------------
| Base Job Model
|--------------------------------------------------------------------------
| استخراج مستقیم type از drizzle schema
|--------------------------------------------------------------------------
*/

export type Job = InferSelectModel<typeof jobs>;

/*
|--------------------------------------------------------------------------
| Job Query Params
|--------------------------------------------------------------------------
*/

export type JobType =
  | "FULL_TIME"
  | "PART_TIME"
  | "CONTRACT"
  | "REMOTE";

export type JobQuery = {
  page?: number;

  limit?: number;

  search?: string;

  location?: string;

  type?: JobType;

  category?: string;

  categoryId?: string;

  companyId?: string;
};

/*
|--------------------------------------------------------------------------
| Create Types
|--------------------------------------------------------------------------
*/

export type JobCreate = Omit<
  Job,
  "id" | "createdAt" | "updatedAt"
>;

/*
|--------------------------------------------------------------------------
| Pagination
|--------------------------------------------------------------------------
*/

export type PaginatedResponse<T> = {
  data: T[];

  total: number;

  page: number;

  limit: number;

  totalPages: number;
};

/*
|--------------------------------------------------------------------------
| Extended Job Types
|--------------------------------------------------------------------------
*/

export type CompanyPreview = {
  id?: string;

  name: string;

  logo?: string | null;
};

export type JobListItem = Job & {
  company?: CompanyPreview;
};

export type JobWithCompany = Job & {
  company: Required<
    Pick<CompanyPreview, "name">
  > & {
    id: string;
    logo?: string | null;
  };
};

/*
|--------------------------------------------------------------------------
| Create Input
|--------------------------------------------------------------------------
| مناسب فرم create/edit
|--------------------------------------------------------------------------
*/

export interface JobCreateInput {
  companyId: string | null;

  type: JobType | null;

  isRemote: boolean;

  title: string;

  description: string;

  location: string;

  salary?: number | null;

  /*
   |--------------------------------------------------------------------------
   | هنوز داخل schema drizzle نیست
   |--------------------------------------------------------------------------
   | اگر خواستی persist شود:
   |
   | skills: json("skills").$type<string[]>()
   |--------------------------------------------------------------------------
   */

  skills?: string[];
}

/*
|--------------------------------------------------------------------------
| DTO
|--------------------------------------------------------------------------
| مناسب API response
|--------------------------------------------------------------------------
*/

export type JobDTO = {
  id: string;

  title: string;

  description: string;

  location: string;

  salary?: number | null;

  type?: JobType | null;

  createdAt?: Date | null;

  company?: {
    name: string;

    logo?: string | null;
  };
};
