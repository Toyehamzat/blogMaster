import { createSafeAction } from "@/lib/create-safe-action";
import { LoginSchema } from "./schema";
import api from "@/utils/api"; // Import the configured api instance
import { toast } from "sonner";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  try {
    const response = await api.post("/login", data);
    return { data: response.data };
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.errors) {
      error.response.data.errors.forEach((err: any) => {
        toast.error(err.message);
      });
      return {
        error: "Login failed",
        fieldErrors: error.response.data.errors.reduce(
          (acc: any, curr: any) => {
            acc[curr.param] = [curr.message];
            return acc;
          },
          {}
        ),
      };
    } else {
      toast.error("An unexpected error occurred");
      return {
        error: "An unexpected error occurred",
      };
    }
  }
};

export const loginAction = createSafeAction(LoginSchema, handler);
