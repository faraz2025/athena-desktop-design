import { z } from "zod";

export const mobileSchema = z.object({
    mobileNumber: z
        .string()
        .min(10, "Mobile number is required")
        .regex(/^\+?\d{10,15}$/, "Invalid mobile number"),
});

export const otpSchema = z.object({
    otp: z
        .string()
        .length(6, "OTP must be 6 digits"),
});

export type MobileFormValues = z.infer<typeof mobileSchema>;
export type OtpFormValues = z.infer<typeof otpSchema>;
