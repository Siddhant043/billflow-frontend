import type { User } from "@/types";
import { create } from "zustand";

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  login: (token: string) => void;
  logout: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  login: (token) => window.localStorage.setItem("token", token),
  logout: () => {
    window.location.href = "/auth";
    window.localStorage.removeItem("token");
    set({ user: null });
  },
}));
