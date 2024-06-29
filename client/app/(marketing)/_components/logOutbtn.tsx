import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/useAuthStore";

const LogoutButton = () => {
  const logout = useUserStore((state) => state.logout);
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-500 text-white rounded-md"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
