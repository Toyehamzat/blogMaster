import { createSafeAction, ActionState } from "@/lib/create-safe-action";
import { SignUpSchema } from "./schema";
import { redirect } from "next/navigation";
import { z } from "zod";

type SignupInput = z.infer<typeof SignUpSchema>;
type SignupOutput = { message: string }; // Adjust according to your API response

export const signupAction = createSafeAction<SignupInput, SignupOutput>(
  SignUpSchema,
  async (validatedData) => {
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return {
          error: errorData.message,
        };
      }

      const data: SignupOutput = await response.json();
      return {
        data,
      };
    } catch (error) {
      return {
        error: "An error occurred during signup",
      };
    }
  }
);
