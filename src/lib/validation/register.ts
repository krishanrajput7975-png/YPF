import { z } from "zod";

const trimmed = (label: string) =>
  z
    .string()
    .transform((s) => s.trim())
    .refine((s) => s.length >= 2, `${label} is required`);

export const registerSchema = z.object({
  fullName: trimmed("Full name"),
  fatherName: trimmed("Father name"),
  dob: z.string().min(1, "Date of birth is required"),
  designation: trimmed("Designation"),
  area: trimmed("Area/Tehsil"),
  district: trimmed("District"),
  state: trimmed("State"),
  mobile: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
});

export type RegisterValues = z.infer<typeof registerSchema>;
