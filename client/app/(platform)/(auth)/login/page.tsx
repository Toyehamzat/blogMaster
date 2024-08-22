"use client";

import { useAction } from "@/hook/useAction";
import { loginAction } from "@/action/login";
import { toast } from "sonner";
import { useUserStore } from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ElementRef, useRef } from "react";
import { useEventListener } from "usehooks-ts";
import { FormInput } from "@/components/form/form-input";
import { FormErrors } from "@/components/form/form-errors";

type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
};

const LoginForm = () => {
  const userLogin = useUserStore((state) => state.userLogin);
  const router = useRouter();

  const { execute, fieldErrors, error, isLoading } = useAction(loginAction, {
    onSuccess: (data: LoginResponse) => {
      toast.success("Login successful");
      userLogin(data.user, data.accessToken, data.refreshToken);
      router.push("/");
    },
    onError: (error) => {
      toast.error(error);
      console.error(error);
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
    const input = {
      username: formData.get("username") as string,
      password: formData.get("password") as string,
    };
    execute(input);
  };

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="bg-white p-12 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto p-4"
        >
          <div className="mb-4">
            <FormInput
              onBlur={onBlur}
              ref={inputRef}
              disabled={isLoading}
              type="text"
              id="username"
              name="username"
              label="Username"
              required
              className="text-sm px-[10px] py-5 h-7 font-medium hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white"
            />
            <FormErrors id="username" errors={fieldErrors} />
          </div>
          <div className="mb-4">
            <FormInput
              onBlur={onBlur}
              ref={inputRef}
              disabled={isLoading}
              type="password"
              id="password"
              name="password"
              label="Password"
              required
              className="text-sm px-[10px] py-5 h-7 font-medium hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white"
            />
            <FormErrors id="password" errors={fieldErrors} />
          </div>
          {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full px-4 py-2 bg-blue-500 text-white rounded-md ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="mt-1">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-blue-500">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
