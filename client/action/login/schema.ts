import { z } from "zod";

export const LoginSchema = z.object({
  username: z
    .string()
    .min(3, "Username must consist of at least 3 characters")
    .trim(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/,
      "Password must include one lowercase character, one uppercase character, a number, and a special character"
    )
    .trim(),
});
