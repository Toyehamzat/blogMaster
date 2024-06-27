import { createSafeAction, ActionState } from "@/lib/create-safe-action";
import { SignUpSchema } from "./schema";
import { redirect } from "next/navigation";
import { z } from "zod";
import { InputType, ReturnType } from "./types";

// type SignupInput = z.infer<typeof SignUpSchema>;
type SignupOutput = { message: string }; // Adjust according to your API response

const url = "http://localhost:5000/api";

const handler = async (data: InputType): Promise<ReturnType> => {
  const datas = data;
  try {
    const response = await fetch(`${url}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datas),
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        error: error.message,
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
};

export const signupAction = createSafeAction(SignUpSchema, handler);
