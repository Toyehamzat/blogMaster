import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/useAuthStore";
import { toast } from "sonner";

const LogoutButton = () => {
  const { logout } = useUserStore((state) => state);
  const router = useRouter();

  const handleLogout = async () => {
    logout();
    router.push("/");
    toast.success("Loggged out successfully");
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
