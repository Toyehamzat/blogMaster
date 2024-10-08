import { createSafeAction } from "@/lib/create-safe-action";
import { SignUpSchema } from "./schema";
import api from "@/utils/api";
import { toast } from "sonner";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  try {
    const response = await api.post("/signup", data);
    return { data: response.data };
  } catch (error: any) {
    if (error.response?.data?.errors) {
      const fieldErrors = error.response.data.errors.reduce(
        (acc: Record<string, string[]>, curr: any) => {
          if (curr.param) {
            acc[curr.param] = acc[curr.param] || [];
            acc[curr.param].push(curr.message);
          }
          return acc;
        },
        {}
      );

      error.response.data.errors.forEach((err: any) => {
        toast.error(err.message);
      });

      return {
        error: "Registration failed",
        fieldErrors: fieldErrors,
      };
    } else {
      const errorMessage =
        error.response?.data?.error || "An unexpected error occurred";
      toast.error(errorMessage);
      return {
        error: errorMessage,
      };
    }
  }
};

export const signupAction = createSafeAction(SignUpSchema, handler);
