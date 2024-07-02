import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface UserAuthStore {
  isLoggedIn: boolean;
  user: { id: string; username: string } | null;
  userLogin: (user: { id: string; username: string }, token: string) => void;
  logout: () => void;
}

export const useUserStore = create(
  persist<UserAuthStore>(
    (set) => ({
      isLoggedIn: false,
      user: null,
      userLogin: (user, token) => {
        localStorage.setItem("token", token);
        set({ isLoggedIn: true, user });
      },
      logout: () => {
        localStorage.removeItem("token");
        set({ isLoggedIn: false, user: null });
      },
    }),
    {
      name: "userStore",
    }
  )
);
