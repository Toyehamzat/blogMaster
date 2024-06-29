import { z } from "zod";

export const LoginSchema = z.object({
  username: z
    .string()
    .min(3, "Username must consist of at least 3 characters")
    .trim(),
  password: z
    .string()
    .min(6, "Password must consist of at least 6 characters")
    .trim(),
});
