import { z } from "zod";

export const SignUpSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username must consist of at least 3 characters")
      .nonempty("Username cannot be empty!")
      .trim(),
    email: z
      .string()
      .email("Please provide a valid email")
      .nonempty("Email cannot be empty!")
      .trim(),
    password: z
      .string()
      .min(6, "Password must consist of at least 6 characters")
      .nonempty("Password cannot be empty!")
      .regex(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/,
        "Password must include one lowercase character, one uppercase character, a number, and a special character"
      )
      .trim(),
    confirm_password: z
      .string()
      .nonempty("Confirm Password cannot be empty!")
      .regex(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/,
        "Password must include one lowercase character, one uppercase character, a number, and a special character"
      )
      .trim(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords must be the same",
    path: ["confirm_password"],
  });
