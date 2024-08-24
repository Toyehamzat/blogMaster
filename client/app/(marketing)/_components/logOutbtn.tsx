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
    <button onClick={handleLogout} className=" rounded-md">
      Logout
    </button>
  );
};

export default LogoutButton;
