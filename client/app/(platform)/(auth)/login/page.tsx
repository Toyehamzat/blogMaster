"use client";
import { useAction } from "@/hook/useAction";
import { loginAction } from "@/action/login";
import { toast } from "sonner";
import Link from "next/link";

const LoginForm = () => {
  const { execute, fieldErrors, error, data, isLoading } = useAction(
    loginAction,
    {
      onSuccess: (data) => {
        // Handle success, e.g., store token and redirect
        toast.success(data.message);
        console.log(data.message);
        localStorage.setItem("token", data.token);
        window.location.href = "/";
      },
      onError: (error) => {
        // Handle error
        console.error(error);
      },
    }
  );

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
    <div className=" flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
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
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              isLoading ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
          {error && (
            <div className="mt-2 text-center text-sm text-red-600">{error}</div>
          )}
        </form>
        <div>
          You dont have an account? <Link href="/signup">Sign Up </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
