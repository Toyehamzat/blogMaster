"use client";
import React from "react";
import { useAction } from "@/hook/useAction";
import { signupAction } from "@/action/signup";
import { toast } from "sonner";
import { InputType } from "@/action/signup/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormInput } from "@/components/form/form-input";
import { ElementRef, useRef } from "react";
import { useEventListener } from "usehooks-ts";
import { FormErrors } from "@/components/form/form-errors";

interface SignUpProps {
  data: InputType;
}

export default function SignUp({ data }: SignUpProps) {
  const router = useRouter();
  const { execute, fieldErrors, error, isLoading } = useAction(signupAction, {
    onSuccess: (data) => {
      toast.success(data.message);
      console.log(data.message);
      router.push("/login");
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      formRef.current?.requestSubmit();
    }
  };

  useEventListener("keydown", onKeyDown);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      username: formData.get("username") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      confirm_password: formData.get("confirm_password") as string,
    };
    execute(data);
  };

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="bg-white p-16 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <FormInput
              onBlur={onBlur}
              ref={inputRef}
              disabled={isLoading}
              type="username"
              id="username"
              name="username"
              label="Username"
              required
              className="text-sm px-[10px] py-5 h-7 font-medium  hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white"
            />
            <FormErrors id="username" errors={fieldErrors} />
          </div>
          <div>
            <FormInput
              onBlur={onBlur}
              ref={inputRef}
              disabled={isLoading}
              type="email"
              id="email"
              name="email"
              label="Email"
              required
              className="text-sm px-[10px] py-5 h-7 font-medium  hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white"
            />
            <FormErrors id="email" errors={fieldErrors} />
          </div>
          <div>
            <FormInput
              onBlur={onBlur}
              ref={inputRef}
              disabled={isLoading}
              type="password"
              id="password"
              name="password"
              label="Password"
              required
              className="text-sm px-[10px] py-5 h-7 font-medium  hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white"
            />
            <FormErrors id="password" errors={fieldErrors} />
          </div>
          <div>
            <FormInput
              onBlur={onBlur}
              ref={inputRef}
              disabled={isLoading}
              type="password"
              id="confirm_password"
              name="confirm_password"
              label="Confirm password"
              required
              className="text-sm px-[10px] py-5 h-7 font-medium  hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white"
            />
            <FormErrors id="confirm_password" errors={fieldErrors} />
          </div>
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full px-4 py-2 bg-blue-500 text-white rounded-md ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Signing up..." : "Sign up"}
            </button>
          </div>
        </form>
        <div className="mt-1">
          Do you an account already?{" "}
          <Link href="/login" className="text-blue-500">
            Log in{" "}
          </Link>
        </div>
      </div>
    </div>
  );
}
