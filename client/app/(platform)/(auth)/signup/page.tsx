"use client";
import React from "react";
import { useAction } from "@/hook/useAction";
import { signupAction } from "@/action/signup";
import { toast } from "sonner";
import { InputType } from "@/action/signup/types";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {fieldErrors?.username && (
              <span className="text-sm text-red-600">
                {fieldErrors.username[0]}
              </span>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {fieldErrors?.email && (
              <span className="text-sm text-red-600">
                {fieldErrors.email[0]}
              </span>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {fieldErrors?.password && (
              <span className="text-sm text-red-600">
                {fieldErrors.password[0]}
              </span>
            )}
          </div>
          <div>
            <label
              htmlFor="confirm_password"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              id="confirm_password"
              name="confirm_password"
              type="password"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {fieldErrors?.confirm_password && (
              <span className="text-sm text-red-600">
                {fieldErrors.confirm_password[0]}
              </span>
            )}
          </div>
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                isLoading
                  ? "bg-indigo-400"
                  : "bg-indigo-600 hover:bg-indigo-700"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              {isLoading ? "Signing up..." : "Sign up"}
            </button>
            {/* {error && (
              <div className="mt-2 text-center text-sm text-red-600">
                {error}
              </div>
            )} */}
          </div>
        </form>
        <div>
          have an account already? <Link href="/login">log in </Link>
        </div>
      </div>
    </div>
  );
}
