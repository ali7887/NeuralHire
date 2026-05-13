// src/lib/types/company.types.ts

import type { Company } from "../db/schema";

export type CompanyCreate = Omit<
  Company,
  "id" | "createdAt" | "updatedAt"
>;

export type CompanyUpdate = Partial<
  Omit<Company, "id" | "createdBy" | "createdAt">
>;

export type CompanyWithJobCount = Company & {
  jobCount: number;
};

export type { Company };
