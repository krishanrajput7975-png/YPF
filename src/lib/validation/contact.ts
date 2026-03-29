import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z
    .string()
    .trim()
    .refine((v) => v === "" || /^[6-9]\d{9}$/.test(v), {
      message: "Enter a valid 10-digit Indian mobile number",
    }),
  email: z
    .string()
    .trim()
    .refine((v) => v === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), {
      message: "Enter a valid email",
    }),
  message: z.string().min(10, "Message should be at least 10 characters"),
});

export type ContactValues = z.infer<typeof contactSchema>;
