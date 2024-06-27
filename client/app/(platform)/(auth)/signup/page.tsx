import React from "react";
import { useAction } from "@/hook/useAction";
import { signupAction } from "@/action/signup";
import { toast } from "sonner";
import { ElementRef, useRef } from "react";
import { redirect } from "next/navigation";
import { InputType } from "@/action/signup/types";

interface SignUpProps {
  data: InputType;
}
export default async function SignUp({ data }: SignUpProps) {
  const { execute, fieldErrors, error, isLoading } = useAction(signupAction, {
    onSuccess: (data) => {
      toast.success(data.message);
      console.log(data.message);
      redirect("/login");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const handleSubmit = (data: any) => {
    execute(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input type="text" name="username" required />
          {fieldErrors?.username && <span>{fieldErrors.username[0]}</span>}
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="email" required />
          {fieldErrors?.email && <span>{fieldErrors.email[0]}</span>}
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" required />
          {fieldErrors?.password && <span>{fieldErrors.password[0]}</span>}
        </div>
        <div>
          <label>Confirm Password</label>
          <input type="password" name="confirm_password" required />
          {fieldErrors?.confirm_password && (
            <span>{fieldErrors.confirm_password[0]}</span>
          )}
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Signing up..." : "Sign up"}
        </button>
        {error && <div>{error}</div>}
      </form>
    </div>
  );
}
