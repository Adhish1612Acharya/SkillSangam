import { z } from "zod";

export const familySignupSchema = z.object({
  fullName: z.string().min(1),
  adhaarNumber: z.string().min(1),
  familyCode: z.string().min(1),
  password: z.string().min(6),
  email: z.string().email(),
  username: z.string().min(1),
  relationship: z.string().min(1), // Optional field for relationship
});

export const familyLoginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export const adminLoginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export const officerLoginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export const personnelSignupSchema = z.object({
  fullName: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
  serviceNumber: z.string().min(1),
  rank: z.string().min(1),
  unitOrRegiment: z.string().min(1),
  joinDate: z.string().min(1),
  family: z.object({
    adhaarNumber: z.string().min(1),
    fullName: z.string().min(1),
  }),
});

export const personnelLoginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export const departmentSchema = z.object({
  name: z.string().min(1),
});
