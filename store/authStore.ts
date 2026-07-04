import type { SafeAdmin } from "@/types";
import { create } from "zustand";

interface AuthState {
  admin: SafeAdmin | null;
  accessToken: string | null;
  isHydrating: boolean;
  setSession: (admin: SafeAdmin | null, accessToken: string | null) => void;
  setHydrating: (value: boolean) => void;
  clearSession: () => void;
}

// Access token lives only in memory — never localStorage (XSS surface).
// The refresh token is an httpOnly cookie the browser manages automatically.
export const useAuthStore = create<AuthState>((set) => ({
  admin: null,
  accessToken: null,
  isHydrating: true,
  setSession: (admin, accessToken) => set({ admin, accessToken }),
  setHydrating: (value) => set({ isHydrating: value }),
  clearSession: () => set({ admin: null, accessToken: null }),
}));
