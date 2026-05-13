import { z } from 'zod';

export const userRegisterSchema = z.object({
  name: z.string().min(2).max(100),

  email: z.string().email(),

  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Must contain at least one number'),

  role: z
    .enum(['job-seeker', 'employer'])
    .default('job-seeker'),
});

export const userUpdateSchema = z.object({
  name: z.string().min(2).max(100).optional(),

  email: z.string().email().optional(),

  password: z
    .string()
    .min(8)
    .regex(/[A-Z]/)
    .regex(/[0-9]/)
    .optional(),
});

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});
