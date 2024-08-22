import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/useAuthStore";

const LogoutButton = () => {
  const { logout } = useUserStore((state) => state);
  const router = useRouter();

  // const handleLogout = async () => {
  //   try {
  //     await api.post("/logout");
  //     logout;
  //     router.push("/");
  //   } catch (error: any) {
  //     console.error("Logout failed", error);
  //   }
  // };

  return (
    <button
      onClick={logout}
      className="px-4 py-2 bg-red-500 text-white rounded-md"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
