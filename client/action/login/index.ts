import { createSafeAction, ActionState } from "@/lib/create-safe-action";
import { LoginSchema } from "./schema"; // Adjust the import according to your file structure
import { z } from "zod";
import { InputType, ReturnType } from "./types";

type LoginOutput = { token: string; message: string }; // Adjust according to your API response

const url = "http://localhost:5000/api";

const handler = async (data: InputType): Promise<ReturnType> => {
  const validatedData = data;
  try {
    const response = await fetch(`${url}/login`, {
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

    const data: LoginOutput = await response.json();
    return {
      data,
    };
  } catch (error) {
    return {
      error: "An error occurred during login",
    };
  }
};
export const loginAction = createSafeAction(LoginSchema, handler);
