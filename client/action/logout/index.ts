import api from "@/utils/api";
import { useUserStore } from "@/stores/useAuthStore";

export const logout = async () => {
  try {
    await api.post("/logout");
    useUserStore.getState().logout();
  } catch (error: any) {
    console.error("Logout failed", error);
  }
};
