"use client";
import { useAction } from "@/hook/useAction";
import { loginAction } from "@/action/login";
import { toast } from "sonner";
import { useUserStore } from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";
import Link from "next/link";

type LoginResponse = {
  message: string;
  token: string;
  user: {
    id: string;
    username: string;
  };
};

const LoginForm = () => {
  const userLogin = useUserStore((state) => state.userLogin);
  const router = useRouter();

  const { execute, fieldErrors, error, isLoading } = useAction(loginAction, {
    onSuccess: (data: LoginResponse) => {
      toast.success(data.message);
      userLogin(data.user, data.token);
      router.push("/");
    },
    onError: (error) => {
      toast.error(error);
      console.error(error);
    },
  });

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
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4">
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {fieldErrors?.username && (
              <span className="text-red-600 text-sm">
                {fieldErrors.username[0]}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {fieldErrors?.password && (
              <span className="text-red-600 text-sm">
                {fieldErrors.password[0]}
              </span>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full px-4 py-2 bg-blue-500 text-white rounded-md ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
          {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
        </form>
        <div>
          dont have an account? <Link href="/signup">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
