import { z } from "zod";
import { ActionState } from "@/lib/create-safe-action";
import { SignUpSchema } from "./schema";

export type InputType = z.infer<typeof SignUpSchema>;

export type ReturnType = ActionState<InputType, { message: string }>;
