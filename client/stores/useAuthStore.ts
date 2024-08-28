import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  username: string;
  email: string;
}

export interface UserAuthStore {
  isLoggedIn: boolean;
  user: User | null;
  token: string | null;
  userLogin: (user: User, token: string) => void;
  logout: () => void;
}

export const useUserStore = create(
  persist<UserAuthStore>(
    (set) => ({
      isLoggedIn: false,
      user: null,
      token: null,
      userLogin: (user, token) => {
        const userlocalstorage = localStorage.getItem("token");

        if (userlocalstorage) {
          set({ isLoggedIn: true, user, token });
        }
      },
      logout: () => {
        localStorage.clear();
        set({
          isLoggedIn: false,
          user: null,
          token: null,
        });
      },
    }),
    {
      name: "userStore",
    }
  )
);
