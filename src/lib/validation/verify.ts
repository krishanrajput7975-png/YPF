import { z } from "zod";

export const verifySchema = z.object({
  memberId: z
    .string()
    .min(1, "Please enter a Member ID or Mobile Number")
    .refine((val) => {
      // Allow valid UUID or 10-digit mobile number
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(val);
      const isMobile = /^\d{10}$/.test(val);
      return isUuid || isMobile;
    }, "Please enter a valid Member ID (UUID) or 10-digit mobile number"),
});

export type VerifyValues = z.infer<typeof verifySchema>;
