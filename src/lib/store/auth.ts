import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/lib/types";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (data: Partial<User>) => void;
  signOut: () => void;
  updateUser: (data: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      signIn: (data) =>
        set({
          user: {
            id: data.id ?? crypto.randomUUID(),
            username: data.username,
            email: data.email,
            phone: data.phone,
            zone: data.zone,
            area: data.area,
          },
          isAuthenticated: true,
        }),
      signOut: () => set({ user: null, isAuthenticated: false }),
      updateUser: (data) => {
        const cur = get().user;
        if (!cur) return;
        set({ user: { ...cur, ...data } });
      },
    }),
    { name: "nectar-auth" },
  ),
);
