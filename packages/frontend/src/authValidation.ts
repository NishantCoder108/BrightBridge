// src/validation/authSchemas.ts
import { z } from "zod";

export const AuthSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(3, { message: "Password is required" }),
});

export type AuthFormData = z.infer<typeof AuthSchema>;
